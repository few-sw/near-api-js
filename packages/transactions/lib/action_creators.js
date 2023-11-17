"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = exports.stringifyJsonOrBytes = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const actions_1 = require("./actions");
function fullAccessKey() {
    return new actions_1.AccessKey({
        nonce: 0,
        permission: new actions_1.AccessKeyPermission({
            fullAccess: new actions_1.FullAccessPermission({}),
        })
    });
}
function functionCallAccessKey(receiverId, methodNames, allowance) {
    return new actions_1.AccessKey({
        nonce: 0,
        permission: new actions_1.AccessKeyPermission({
            functionCall: new actions_1.FunctionCallPermission({ receiverId, allowance, methodNames }),
        })
    });
}
function createAccount() {
    return new actions_1.Action({ createAccount: new actions_1.CreateAccount({}) });
}
function deployContract(code) {
    return new actions_1.Action({ deployContract: new actions_1.DeployContract({ code }) });
}
function stringifyJsonOrBytes(args) {
    const isUint8Array = args.byteLength !== undefined && args.byteLength === args.length;
    return isUint8Array ? args : Buffer.from(JSON.stringify(args));
}
exports.stringifyJsonOrBytes = stringifyJsonOrBytes;
/**
 * Constructs {@link Action} instance representing contract method call.
 *
 * @param methodName the name of the method to call
 * @param args arguments to pass to method. Can be either plain JS object which gets serialized as JSON automatically
 *  or `Uint8Array` instance which represents bytes passed as is.
 * @param gas max amount of gas that method call can use
 * @param deposit amount of NEAR (in yoctoNEAR) to send together with the call
 * @param stringify Convert input arguments into bytes array.
 * @param jsContract  Is contract from JS SDK, skips stringification of arguments.
 */
function functionCall(methodName, args, gas = new bn_js_1.default(0), deposit = new bn_js_1.default(0), stringify = stringifyJsonOrBytes, jsContract = false) {
    if (jsContract) {
        return new actions_1.Action({ functionCall: new actions_1.FunctionCall({ methodName, args, gas, deposit }) });
    }
    return new actions_1.Action({
        functionCall: new actions_1.FunctionCall({
            methodName,
            args: stringify(args),
            gas,
            deposit,
        }),
    });
}
function transfer(deposit = new bn_js_1.default(0)) {
    return new actions_1.Action({ transfer: new actions_1.Transfer({ deposit }) });
}
function stake(stake = new bn_js_1.default(0), publicKey) {
    return new actions_1.Action({ stake: new actions_1.Stake({ stake, publicKey }) });
}
function addKey(publicKey, accessKey) {
    return new actions_1.Action({ addKey: new actions_1.AddKey({ publicKey, accessKey }) });
}
function deleteKey(publicKey) {
    return new actions_1.Action({ deleteKey: new actions_1.DeleteKey({ publicKey }) });
}
function deleteAccount(beneficiaryId) {
    return new actions_1.Action({ deleteAccount: new actions_1.DeleteAccount({ beneficiaryId }) });
}
function signedDelegate({ delegateAction, signature }) {
    return new actions_1.Action({ signedDelegate: new actions_1.SignedDelegate({ delegateAction, signature }) });
}
exports.actionCreators = {
    addKey,
    createAccount,
    deleteAccount,
    deleteKey,
    deployContract,
    fullAccessKey,
    functionCall,
    functionCallAccessKey,
    signedDelegate,
    stake,
    transfer,
};
