"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = exports.stake = exports.functionCallAccessKey = exports.functionCall = exports.fullAccessKey = exports.deployContract = exports.deleteKey = exports.deleteAccount = exports.createAccount = exports.addKey = exports.encodeDelegateAction = exports.encodeSignedDelegate = exports.Transaction = exports.SignedTransaction = exports.Signature = exports.signTransaction = exports.createTransaction = exports.SCHEMA = exports.Transfer = exports.Stake = exports.FunctionCallPermission = exports.FunctionCall = exports.FullAccessPermission = exports.DeployContract = exports.DeleteKey = exports.DeleteAccount = exports.CreateAccount = exports.AddKey = exports.AccessKeyPermission = exports.AccessKey = exports.Action = exports.stringifyJsonOrBytes = void 0;
var transactions_1 = require("@near-js/transactions");
Object.defineProperty(exports, "stringifyJsonOrBytes", { enumerable: true, get: function () { return transactions_1.stringifyJsonOrBytes; } });
Object.defineProperty(exports, "Action", { enumerable: true, get: function () { return transactions_1.Action; } });
Object.defineProperty(exports, "AccessKey", { enumerable: true, get: function () { return transactions_1.AccessKey; } });
Object.defineProperty(exports, "AccessKeyPermission", { enumerable: true, get: function () { return transactions_1.AccessKeyPermission; } });
Object.defineProperty(exports, "AddKey", { enumerable: true, get: function () { return transactions_1.AddKey; } });
Object.defineProperty(exports, "CreateAccount", { enumerable: true, get: function () { return transactions_1.CreateAccount; } });
Object.defineProperty(exports, "DeleteAccount", { enumerable: true, get: function () { return transactions_1.DeleteAccount; } });
Object.defineProperty(exports, "DeleteKey", { enumerable: true, get: function () { return transactions_1.DeleteKey; } });
Object.defineProperty(exports, "DeployContract", { enumerable: true, get: function () { return transactions_1.DeployContract; } });
Object.defineProperty(exports, "FullAccessPermission", { enumerable: true, get: function () { return transactions_1.FullAccessPermission; } });
Object.defineProperty(exports, "FunctionCall", { enumerable: true, get: function () { return transactions_1.FunctionCall; } });
Object.defineProperty(exports, "FunctionCallPermission", { enumerable: true, get: function () { return transactions_1.FunctionCallPermission; } });
Object.defineProperty(exports, "Stake", { enumerable: true, get: function () { return transactions_1.Stake; } });
Object.defineProperty(exports, "Transfer", { enumerable: true, get: function () { return transactions_1.Transfer; } });
Object.defineProperty(exports, "SCHEMA", { enumerable: true, get: function () { return transactions_1.SCHEMA; } });
Object.defineProperty(exports, "createTransaction", { enumerable: true, get: function () { return transactions_1.createTransaction; } });
Object.defineProperty(exports, "signTransaction", { enumerable: true, get: function () { return transactions_1.signTransaction; } });
Object.defineProperty(exports, "Signature", { enumerable: true, get: function () { return transactions_1.Signature; } });
Object.defineProperty(exports, "SignedTransaction", { enumerable: true, get: function () { return transactions_1.SignedTransaction; } });
Object.defineProperty(exports, "Transaction", { enumerable: true, get: function () { return transactions_1.Transaction; } });
Object.defineProperty(exports, "encodeSignedDelegate", { enumerable: true, get: function () { return transactions_1.encodeSignedDelegate; } });
Object.defineProperty(exports, "encodeDelegateAction", { enumerable: true, get: function () { return transactions_1.encodeDelegateAction; } });
const transactions_2 = require("@near-js/transactions");
const addKey = (publicKey, accessKey) => transactions_2.actionCreators.addKey(publicKey, accessKey);
exports.addKey = addKey;
const createAccount = () => transactions_2.actionCreators.createAccount();
exports.createAccount = createAccount;
const deleteAccount = (beneficiaryId) => transactions_2.actionCreators.deleteAccount(beneficiaryId);
exports.deleteAccount = deleteAccount;
const deleteKey = (publicKey) => transactions_2.actionCreators.deleteKey(publicKey);
exports.deleteKey = deleteKey;
const deployContract = (code) => transactions_2.actionCreators.deployContract(code);
exports.deployContract = deployContract;
const fullAccessKey = () => transactions_2.actionCreators.fullAccessKey();
exports.fullAccessKey = fullAccessKey;
const functionCall = (methodName, args, gas, deposit, stringify, jsContract) => transactions_2.actionCreators.functionCall(methodName, args, gas, deposit, stringify, jsContract);
exports.functionCall = functionCall;
const functionCallAccessKey = (receiverId, methodNames, allowance) => transactions_2.actionCreators.functionCallAccessKey(receiverId, methodNames, allowance);
exports.functionCallAccessKey = functionCallAccessKey;
const stake = (stake, publicKey) => transactions_2.actionCreators.stake(stake, publicKey);
exports.stake = stake;
const transfer = (deposit) => transactions_2.actionCreators.transfer(deposit);
exports.transfer = transfer;
