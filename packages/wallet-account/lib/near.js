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
exports.Near = void 0;
/**
 * This module contains the main class developers will use to interact with NEAR.
 * The {@link Near} class is used to interact with {@link account!Account | Account} through the {@link providers/json-rpc-provider!JsonRpcProvider | JsonRpcProvider}.
 * It is configured via the {@link NearConfig}.
 *
 * @see [https://docs.near.org/tools/near-api-js/quick-reference#account](https://docs.near.org/tools/near-api-js/quick-reference#account)
 *
 * @module near
 */
const accounts_1 = require("@near-js/accounts");
const bn_js_1 = __importDefault(require("bn.js"));
/**
 * This is the main class developers should use to interact with NEAR.
 * @example
 * ```js
 * const near = new Near(config);
 * ```
 */
class Near {
    constructor(config) {
        var _a;
        this.config = config;
        this.connection = accounts_1.Connection.fromConfig({
            networkId: config.networkId,
            provider: { type: 'JsonRpcProvider', args: { url: config.nodeUrl, headers: config.headers } },
            signer: config.signer || { type: 'InMemorySigner', keyStore: config.keyStore || ((_a = config.deps) === null || _a === void 0 ? void 0 : _a.keyStore) },
            jsvmAccountId: config.jsvmAccountId || `jsvm.${config.networkId}`
        });
        if (config.masterAccount) {
            // TODO: figure out better way of specifiying initial balance.
            // Hardcoded number below must be enough to pay the gas cost to dev-deploy with near-shell for multiple times
            const initialBalance = config.initialBalance ? new bn_js_1.default(config.initialBalance) : new bn_js_1.default('500000000000000000000000000');
            this.accountCreator = new accounts_1.LocalAccountCreator(new accounts_1.Account(this.connection, config.masterAccount), initialBalance);
        }
        else if (config.helperUrl) {
            this.accountCreator = new accounts_1.UrlAccountCreator(this.connection, config.helperUrl);
        }
        else {
            this.accountCreator = null;
        }
    }
    /**
     * @param accountId near accountId used to interact with the network.
     */
    account(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = new accounts_1.Account(this.connection, accountId);
            return account;
        });
    }
    /**
     * Create an account using the {@link account_creator!AccountCreator | AccountCreator}. Either:
     * * using a masterAccount with {@link account_creator!LocalAccountCreator | LocalAccountCreator}
     * * using the helperUrl with {@link account_creator!UrlAccountCreator | UrlAccountCreator}
     * @see {@link NearConfig.masterAccount} and {@link NearConfig.helperUrl}
     *
     * @param accountId
     * @param publicKey
     */
    createAccount(accountId, publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accountCreator) {
                throw new Error('Must specify account creator, either via masterAccount or helperUrl configuration settings.');
            }
            yield this.accountCreator.createAccount(accountId, publicKey);
            return new accounts_1.Account(this.connection, accountId);
        });
    }
}
exports.Near = Near;
