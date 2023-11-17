"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPassKeyAvailable = exports.getKeys = exports.createKey = exports.PasskeyProcessCanceled = void 0;
const base64_1 = __importDefault(require("@hexagon/base64"));
const elliptic_1 = require("elliptic");
const sha256_js_1 = require("@aws-crypto/sha256-js");
const buffer_1 = require("buffer");
const asn1_parser_1 = __importDefault(require("asn1-parser"));
const crypto_1 = require("@near-js/crypto");
const utils_1 = require("@near-js/utils");
const utils_2 = require("./utils");
const fido2_1 = require("./fido2");
const CHALLENGE_TIMEOUT_MS = 90 * 1000;
const RP_NAME = 'NEAR_API_JS_WEBAUTHN';
const f2l = new fido2_1.Fido2();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield f2l.init({
        rpId: location.hostname,
        rpName: RP_NAME,
        timeout: CHALLENGE_TIMEOUT_MS,
    });
});
function setBufferIfUndefined() {
    if (window && !window.Buffer) {
        window.Buffer = buffer_1.Buffer;
    }
}
class PasskeyProcessCanceled extends Error {
    constructor(message) {
        super(message);
        this.name = 'PasskeyProcessCanceled';
    }
}
exports.PasskeyProcessCanceled = PasskeyProcessCanceled;
const createKey = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const cleanUserName = (0, utils_2.validateUsername)(username);
    if (!f2l.f2l) {
        yield init();
    }
    const id = base64_1.default.fromString(cleanUserName, true);
    const challengeMakeCred = yield f2l.registration({
        username: cleanUserName,
        displayName: cleanUserName,
        id,
    });
    const publicKey = (0, utils_2.preformatMakeCredReq)(challengeMakeCred);
    setBufferIfUndefined();
    return navigator.credentials.create({ publicKey })
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!res) {
            throw new PasskeyProcessCanceled('Failed to retrieve response from navigator.credentials.create');
        }
        const result = yield f2l.attestation({
            clientAttestationResponse: res,
            origin,
            challenge: challengeMakeCred.challenge
        });
        const publicKey = result.authnrData.get('credentialPublicKeyPem');
        const publicKeyBytes = (0, utils_2.get64BytePublicKeyFromPEM)(publicKey);
        const ed = new elliptic_1.eddsa('ed25519');
        const edSha256 = new sha256_js_1.Sha256();
        edSha256.update(buffer_1.Buffer.from(publicKeyBytes));
        const key = ed.keyFromSecret(yield edSha256.digest());
        return crypto_1.KeyPair.fromString((0, utils_1.baseEncode)(new Uint8Array(buffer_1.Buffer.concat([key.getSecret(), buffer_1.Buffer.from(key.getPublic())]))));
    }));
});
exports.createKey = createKey;
// Ecrecover returns two possible public keys for a given signature
const getKeys = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const cleanUserName = (0, utils_2.validateUsername)(username);
    if (!f2l.f2l) {
        yield init();
    }
    const assertionOptions = yield f2l.login();
    const options = Object.assign(Object.assign({}, assertionOptions), { username: cleanUserName, allowCredentials: [] });
    const publicKey = (0, utils_2.preformatGetAssertReq)(options);
    setBufferIfUndefined();
    return navigator.credentials.get({ publicKey })
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const getAssertionResponse = (0, utils_2.publicKeyCredentialToJSON)(response);
        const signature = base64_1.default.toArrayBuffer(getAssertionResponse.response.signature, true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const parser = ((_a = asn1_parser_1.default === null || asn1_parser_1.default === void 0 ? void 0 : asn1_parser_1.default.ASN1) === null || _a === void 0 ? void 0 : _a.parse) || ((_b = window === null || window === void 0 ? void 0 : window.ASN1) === null || _b === void 0 ? void 0 : _b.parse);
        const rAndS = parser(new Uint8Array(signature));
        const clientDataSha256 = new sha256_js_1.Sha256();
        clientDataSha256.update(buffer_1.Buffer.from(new Uint8Array(base64_1.default.toArrayBuffer(getAssertionResponse.response.clientDataJSON, true))));
        const clientDataJSONHash = yield clientDataSha256.digest();
        const AuthenticatiorDataJSONHash = buffer_1.Buffer.from(new Uint8Array(base64_1.default.toArrayBuffer(getAssertionResponse.response.authenticatorData, true)));
        const authenticatorAndClientDataJSONHash = buffer_1.Buffer.concat([AuthenticatiorDataJSONHash, clientDataJSONHash]);
        const correctPKs = yield (0, utils_2.recoverPublicKey)(rAndS.children[0].value, rAndS.children[1].value, authenticatorAndClientDataJSONHash, 0);
        const ed = new elliptic_1.eddsa('ed25519');
        const firstEdSha256 = new sha256_js_1.Sha256();
        firstEdSha256.update(buffer_1.Buffer.from(correctPKs[0]));
        const secondEdSha256 = new sha256_js_1.Sha256();
        secondEdSha256.update(buffer_1.Buffer.from(correctPKs[1]));
        const firstED = ed.keyFromSecret(yield firstEdSha256.digest());
        const secondED = ed.keyFromSecret(yield secondEdSha256.digest());
        const firstKeyPair = crypto_1.KeyPair.fromString((0, utils_1.baseEncode)(new Uint8Array(buffer_1.Buffer.concat([firstED.getSecret(), buffer_1.Buffer.from(firstED.getPublic())]))));
        const secondKeyPair = crypto_1.KeyPair.fromString((0, utils_1.baseEncode)(new Uint8Array(buffer_1.Buffer.concat([secondED.getSecret(), buffer_1.Buffer.from(secondED.getPublic())]))));
        return [firstKeyPair, secondKeyPair];
    }));
});
exports.getKeys = getKeys;
// To check if current browser supports WebAuthn
const isPassKeyAvailable = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    return ((_d = (_c = window.PublicKeyCredential) === null || _c === void 0 ? void 0 : _c.isUserVerifyingPlatformAuthenticatorAvailable) === null || _d === void 0 ? void 0 : _d.call(_c)) || false;
});
exports.isPassKeyAvailable = isPassKeyAvailable;
