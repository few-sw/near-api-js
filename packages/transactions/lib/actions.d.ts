import { PublicKey } from '@near-js/crypto';
import { Assignable } from '@near-js/types';
import BN from 'bn.js';
import { DelegateAction } from './delegate';
import { Signature } from './signature';
declare abstract class Enum {
    enum: string;
    constructor(properties: any);
}
export declare class FunctionCallPermission extends Assignable {
    allowance?: BN;
    receiverId: string;
    methodNames: string[];
}
export declare class FullAccessPermission extends Assignable {
}
export declare class AccessKeyPermission extends Enum {
    functionCall?: FunctionCallPermission;
    fullAccess?: FullAccessPermission;
}
export declare class AccessKey extends Assignable {
    nonce: BN;
    permission: AccessKeyPermission;
}
export declare class IAction extends Assignable {
}
export declare class CreateAccount extends IAction {
}
export declare class DeployContract extends IAction {
    code: Uint8Array;
}
export declare class FunctionCall extends IAction {
    methodName: string;
    args: Uint8Array;
    gas: BN;
    deposit: BN;
}
export declare class Transfer extends IAction {
    deposit: BN;
}
export declare class Stake extends IAction {
    stake: BN;
    publicKey: PublicKey;
}
export declare class AddKey extends IAction {
    publicKey: PublicKey;
    accessKey: AccessKey;
}
export declare class DeleteKey extends IAction {
    publicKey: PublicKey;
}
export declare class DeleteAccount extends IAction {
    beneficiaryId: string;
}
export declare class SignedDelegate extends IAction {
    delegateAction: DelegateAction;
    signature: Signature;
}
/**
 * Contains a list of the valid transaction Actions available with this API
 * @see {@link https://nomicon.io/RuntimeSpec/Actions.html | Actions Spec}
 */
export declare class Action extends Enum {
    createAccount?: CreateAccount;
    deployContract?: DeployContract;
    functionCall?: FunctionCall;
    transfer?: Transfer;
    stake?: Stake;
    addKey?: AddKey;
    deleteKey?: DeleteKey;
    deleteAccount?: DeleteAccount;
    signedDelegate?: SignedDelegate;
}
export {};
