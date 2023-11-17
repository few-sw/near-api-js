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
exports.recoverPublicKey = exports.publicKeyCredentialToJSON = exports.preformatGetAssertReq = exports.validateUsername = exports.get64BytePublicKeyFromPEM = exports.preformatMakeCredReq = void 0;
const base64_1 = __importDefault(require("@hexagon/base64"));
const elliptic_1 = require("elliptic");
const sha256_js_1 = require("@aws-crypto/sha256-js");
const preformatMakeCredReq = (makeCredReq) => {
    const challenge = base64_1.default.toArrayBuffer(makeCredReq.challenge, true);
    const userId = base64_1.default.toArrayBuffer(makeCredReq.user.id, true);
    return Object.assign(Object.assign(Object.assign({}, makeCredReq), { challenge, user: Object.assign(Object.assign({}, makeCredReq.user), { id: userId }) }), (makeCredReq.excludeCredentials ? {
        excludeCredentials: makeCredReq.excludeCredentials.map((e) => {
            return { id: base64_1.default.toArrayBuffer(e.id, true), type: e.type };
        })
    } : {}));
};
exports.preformatMakeCredReq = preformatMakeCredReq;
const get64BytePublicKeyFromPEM = (publicKey) => {
    const prefix = '\n';
    const publicKeyBase64 = publicKey.toString().split(prefix);
    return base64_1.default.toArrayBuffer(`${publicKeyBase64[1]}${publicKeyBase64[2]}`).slice(27);
};
exports.get64BytePublicKeyFromPEM = get64BytePublicKeyFromPEM;
const validateUsername = (name) => {
    if (!name) {
        throw new Error('username is required');
    }
    return name;
};
exports.validateUsername = validateUsername;
const preformatGetAssertReq = (getAssert) => {
    getAssert.challenge = base64_1.default.toArrayBuffer(getAssert.challenge, true);
    // Allow any credential, this will be handled later
    for (const allowCred of getAssert.allowCredentials) {
        allowCred.id = base64_1.default.toArrayBuffer(allowCred.id, true);
    }
    return getAssert;
};
exports.preformatGetAssertReq = preformatGetAssertReq;
const publicKeyCredentialToJSON = (pubKeyCred) => {
    if (pubKeyCred instanceof Array) {
        const arr = [];
        for (const i of pubKeyCred)
            arr.push((0, exports.publicKeyCredentialToJSON)(i));
        return arr;
    }
    if (pubKeyCred instanceof ArrayBuffer) {
        return base64_1.default.fromArrayBuffer(pubKeyCred, true);
    }
    if (pubKeyCred instanceof Object) {
        const obj = {};
        for (const key in pubKeyCred) {
            obj[key] = (0, exports.publicKeyCredentialToJSON)(pubKeyCred[key]);
        }
        return obj;
    }
    return pubKeyCred;
};
exports.publicKeyCredentialToJSON = publicKeyCredentialToJSON;
const recoverPublicKey = (r, s, message, recovery) => __awaiter(void 0, void 0, void 0, function* () {
    const ec = new elliptic_1.ec('p256');
    const sigObj = { r, s };
    if (recovery !== 0 && recovery !== 1) {
        throw new Error('Invalid recovery parameter');
    }
    const hash = new sha256_js_1.Sha256();
    hash.update(message);
    const h = yield hash.digest();
    const Q = ec.recoverPubKey(h, sigObj, 0);
    const P = ec.recoverPubKey(h, sigObj, 1);
    return [
        Buffer.from(new Uint8Array(Buffer.from(Q.encode(true, false))).subarray(1, 65)),
        Buffer.from(new Uint8Array(Buffer.from(P.encode(true, false))).subarray(1, 65))
    ];
});
exports.recoverPublicKey = recoverPublicKey;
