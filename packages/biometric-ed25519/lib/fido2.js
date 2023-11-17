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
exports.Fido2 = void 0;
const base64_1 = __importDefault(require("@hexagon/base64"));
const fido2_lib_1 = require("fido2-lib");
class Fido2 {
    init({ rpId, rpName, timeout }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.f2l = new fido2_lib_1.Fido2Lib({
                timeout,
                rpId,
                rpName,
                challengeSize: 128,
                attestation: 'none',
                cryptoParams: [-8, -7, -257],
                authenticatorAttachment: 'platform',
                authenticatorRequireResidentKey: true,
                authenticatorUserVerification: 'preferred'
            });
        });
    }
    registration({ username, displayName, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const registrationOptions = yield this.f2l.attestationOptions();
            const user = {
                id: id,
                name: username,
                displayName: displayName
            };
            const challenge = base64_1.default.fromArrayBuffer(registrationOptions.challenge, true);
            return Object.assign(Object.assign({}, registrationOptions), { user, status: 'ok', challenge });
        });
    }
    attestation({ clientAttestationResponse, origin, challenge }) {
        return __awaiter(this, void 0, void 0, function* () {
            const attestationExpectations = {
                challenge: challenge,
                origin: origin,
                factor: 'either'
            };
            // @ts-expect-error `factor` is defined as a union of strings for which "either" is valid...
            const regResult = yield this.f2l.attestationResult(clientAttestationResponse, attestationExpectations);
            return regResult;
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const assertionOptions = yield this.f2l.assertionOptions();
            const challenge = base64_1.default.fromArrayBuffer(assertionOptions.challenge, true);
            return Object.assign(Object.assign({}, assertionOptions), { attestation: 'direct', challenge, status: 'ok' });
        });
    }
}
exports.Fido2 = Fido2;
