/// <reference types="node" />
import { PublicKey } from '@near-js/crypto';
import BN from 'bn.js';
import { AccessKey, Action } from './actions';
import { DelegateAction } from './delegate';
import { Signature } from './signature';
declare function fullAccessKey(): AccessKey;
declare function functionCallAccessKey(receiverId: string, methodNames: string[], allowance?: BN): AccessKey;
declare function createAccount(): Action;
declare function deployContract(code: Uint8Array): Action;
export declare function stringifyJsonOrBytes(args: any): Buffer;
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
declare function functionCall(methodName: string, args: Uint8Array | object, gas?: BN, deposit?: BN, stringify?: typeof stringifyJsonOrBytes, jsContract?: boolean): Action;
declare function transfer(deposit?: BN): Action;
declare function stake(stake: BN, publicKey: PublicKey): Action;
declare function addKey(publicKey: PublicKey, accessKey: AccessKey): Action;
declare function deleteKey(publicKey: PublicKey): Action;
declare function deleteAccount(beneficiaryId: string): Action;
declare function signedDelegate({ delegateAction, signature }: {
    delegateAction: DelegateAction;
    signature: Signature;
}): Action;
export declare const actionCreators: {
    addKey: typeof addKey;
    createAccount: typeof createAccount;
    deleteAccount: typeof deleteAccount;
    deleteKey: typeof deleteKey;
    deployContract: typeof deployContract;
    fullAccessKey: typeof fullAccessKey;
    functionCall: typeof functionCall;
    functionCallAccessKey: typeof functionCallAccessKey;
    signedDelegate: typeof signedDelegate;
    stake: typeof stake;
    transfer: typeof transfer;
};
export {};
