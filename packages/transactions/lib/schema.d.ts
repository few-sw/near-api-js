import { PublicKey } from '@near-js/crypto';
import { Assignable } from '@near-js/types';
import { Schema } from 'borsh';
import BN from 'bn.js';
import { Action, SignedDelegate } from './actions';
import { DelegateAction } from './delegate';
import { Signature } from './signature';
/**
 * Borsh-encode a delegate action for inclusion as an action within a meta transaction
 * NB per NEP-461 this requires a Borsh-serialized prefix specific to delegate actions, ensuring
 *  signed delegate actions may never be identical to signed transactions with the same fields
 * @param delegateAction Delegate action to be signed by the meta transaction sender
 */
export declare function encodeDelegateAction(delegateAction: DelegateAction): Uint8Array;
/**
 * Borsh-encode a signed delegate for validation and execution by a relayer
 * @param signedDelegate Signed delegate to be executed in a meta transaction
 */
export declare function encodeSignedDelegate(signedDelegate: SignedDelegate): Uint8Array;
export declare function encodeTransaction(transaction: Transaction | SignedTransaction): Uint8Array;
/**
 * Borsh-decode a Transaction instance from a buffer
 * @param bytes Uint8Array data to be decoded
 */
export declare function decodeTransaction(bytes: Uint8Array): Transaction;
/**
 * Borsh-decode a SignedTransaction instance from a buffer
 * @param bytes Uint8Array data to be decoded
 */
export declare function decodeSignedTransaction(bytes: Uint8Array): SignedTransaction;
export declare class Transaction extends Assignable {
    signerId: string;
    publicKey: PublicKey;
    nonce: BN;
    receiverId: string;
    actions: Action[];
    blockHash: Uint8Array;
    encode(): Uint8Array;
    static decode(bytes: Uint8Array): Transaction;
}
export declare class SignedTransaction extends Assignable {
    transaction: Transaction;
    signature: Signature;
    encode(): Uint8Array;
    static decode(bytes: Uint8Array): SignedTransaction;
}
export declare const SCHEMA: {
    Signature: Schema;
    PublicKey: Schema;
    FunctionCallPermission: Schema;
    FullAccessPermission: Schema;
    AccessKeyPermission: Schema;
    AccessKey: Schema;
    CreateAccount: Schema;
    DeployContract: Schema;
    FunctionCall: Schema;
    Transfer: Schema;
    Stake: Schema;
    AddKey: Schema;
    DeleteKey: Schema;
    DeleteAccount: Schema;
    DelegateActionPrefix: Schema;
    ClassicActions: Schema;
    DelegateAction: Schema;
    SignedDelegate: Schema;
    Action: Schema;
    Transaction: Schema;
    SignedTransaction: Schema;
};
