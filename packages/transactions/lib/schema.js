"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA = exports.SignedTransaction = exports.Transaction = exports.decodeSignedTransaction = exports.decodeTransaction = exports.encodeTransaction = exports.encodeSignedDelegate = exports.encodeDelegateAction = void 0;
const types_1 = require("@near-js/types");
const borsh_1 = require("borsh");
const prefix_1 = require("./prefix");
/**
 * Borsh-encode a delegate action for inclusion as an action within a meta transaction
 * NB per NEP-461 this requires a Borsh-serialized prefix specific to delegate actions, ensuring
 *  signed delegate actions may never be identical to signed transactions with the same fields
 * @param delegateAction Delegate action to be signed by the meta transaction sender
 */
function encodeDelegateAction(delegateAction) {
    return new Uint8Array([
        ...(0, borsh_1.serialize)(exports.SCHEMA.DelegateActionPrefix, new prefix_1.DelegateActionPrefix()),
        ...(0, borsh_1.serialize)(exports.SCHEMA.DelegateAction, delegateAction),
    ]);
}
exports.encodeDelegateAction = encodeDelegateAction;
/**
 * Borsh-encode a signed delegate for validation and execution by a relayer
 * @param signedDelegate Signed delegate to be executed in a meta transaction
 */
function encodeSignedDelegate(signedDelegate) {
    return (0, borsh_1.serialize)(exports.SCHEMA.SignedDelegate, signedDelegate);
}
exports.encodeSignedDelegate = encodeSignedDelegate;
function encodeTransaction(transaction) {
    const schema = transaction instanceof SignedTransaction ? exports.SCHEMA.SignedTransaction : exports.SCHEMA.Transaction;
    return (0, borsh_1.serialize)(schema, transaction);
}
exports.encodeTransaction = encodeTransaction;
/**
 * Borsh-decode a Transaction instance from a buffer
 * @param bytes Uint8Array data to be decoded
 */
function decodeTransaction(bytes) {
    return new Transaction((0, borsh_1.deserialize)(exports.SCHEMA.Transaction, bytes));
}
exports.decodeTransaction = decodeTransaction;
/**
 * Borsh-decode a SignedTransaction instance from a buffer
 * @param bytes Uint8Array data to be decoded
 */
function decodeSignedTransaction(bytes) {
    return new SignedTransaction((0, borsh_1.deserialize)(exports.SCHEMA.SignedTransaction, bytes));
}
exports.decodeSignedTransaction = decodeSignedTransaction;
class Transaction extends types_1.Assignable {
    encode() {
        return encodeTransaction(this);
    }
    static decode(bytes) {
        return decodeTransaction(bytes);
    }
}
exports.Transaction = Transaction;
class SignedTransaction extends types_1.Assignable {
    encode() {
        return encodeTransaction(this);
    }
    static decode(bytes) {
        return decodeSignedTransaction(bytes);
    }
}
exports.SignedTransaction = SignedTransaction;
exports.SCHEMA = new class BorshSchema {
    constructor() {
        this.Signature = {
            struct: {
                keyType: 'u8',
                data: { array: { type: 'u8', len: 64 } },
            }
        };
        this.PublicKey = {
            struct: {
                keyType: 'u8',
                data: { array: { type: 'u8', len: 32 } },
            }
        };
        this.FunctionCallPermission = {
            struct: {
                allowance: { option: 'u128' },
                receiverId: 'string',
                methodNames: { array: { type: 'string' } },
            }
        };
        this.FullAccessPermission = {
            struct: {}
        };
        this.AccessKeyPermission = {
            enum: [
                { struct: { functionCall: this.FunctionCallPermission } },
                { struct: { fullAccess: this.FullAccessPermission } },
            ]
        };
        this.AccessKey = {
            struct: {
                nonce: 'u64',
                permission: this.AccessKeyPermission,
            }
        };
        this.CreateAccount = {
            struct: {}
        };
        this.DeployContract = {
            struct: {
                code: { array: { type: 'u8' } },
            }
        };
        this.FunctionCall = {
            struct: {
                methodName: 'string',
                args: { array: { type: 'u8' } },
                gas: 'u64',
                deposit: 'u128',
            }
        };
        this.Transfer = {
            struct: {
                deposit: 'u128',
            }
        };
        this.Stake = {
            struct: {
                stake: 'u128',
                publicKey: this.PublicKey,
            }
        };
        this.AddKey = {
            struct: {
                publicKey: this.PublicKey,
                accessKey: this.AccessKey,
            }
        };
        this.DeleteKey = {
            struct: {
                publicKey: this.PublicKey,
            }
        };
        this.DeleteAccount = {
            struct: {
                beneficiaryId: 'string',
            }
        };
        this.DelegateActionPrefix = {
            struct: {
                prefix: 'u32',
            }
        };
        this.ClassicActions = {
            enum: [
                { struct: { createAccount: this.CreateAccount } },
                { struct: { deployContract: this.DeployContract } },
                { struct: { functionCall: this.FunctionCall } },
                { struct: { transfer: this.Transfer } },
                { struct: { stake: this.Stake } },
                { struct: { addKey: this.AddKey } },
                { struct: { deleteKey: this.DeleteKey } },
                { struct: { deleteAccount: this.DeleteAccount } },
            ]
        };
        this.DelegateAction = {
            struct: {
                senderId: 'string',
                receiverId: 'string',
                nonce: 'u64',
                actions: { array: { type: this.ClassicActions } },
                maxBlockHeight: 'u64',
                publicKey: this.PublicKey,
            }
        };
        this.SignedDelegate = {
            struct: {
                delegateAction: this.DelegateAction,
                signature: this.Signature,
            }
        };
        this.Action = {
            enum: [
                { struct: { createAccount: this.CreateAccount } },
                { struct: { deployContract: this.DeployContract } },
                { struct: { functionCall: this.FunctionCall } },
                { struct: { transfer: this.Transfer } },
                { struct: { stake: this.Stake } },
                { struct: { addKey: this.AddKey } },
                { struct: { deleteKey: this.DeleteKey } },
                { struct: { deleteAccount: this.DeleteAccount } },
                { struct: { signedDelegate: this.SignedDelegate } },
            ]
        };
        this.Transaction = {
            struct: {
                signerId: 'string',
                publicKey: this.PublicKey,
                nonce: 'u64',
                receiverId: 'string',
                blockHash: { array: { type: 'u8', len: 32 } },
                actions: { array: { type: this.Action } },
            }
        };
        this.SignedTransaction = {
            struct: {
                transaction: this.Transaction,
                signature: this.Signature,
            }
        };
    }
};
