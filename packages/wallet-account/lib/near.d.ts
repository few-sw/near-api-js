/**
 * This module contains the main class developers will use to interact with NEAR.
 * The {@link Near} class is used to interact with {@link account!Account | Account} through the {@link providers/json-rpc-provider!JsonRpcProvider | JsonRpcProvider}.
 * It is configured via the {@link NearConfig}.
 *
 * @see [https://docs.near.org/tools/near-api-js/quick-reference#account](https://docs.near.org/tools/near-api-js/quick-reference#account)
 *
 * @module near
 */
import { Account, AccountCreator, Connection } from '@near-js/accounts';
import { PublicKey } from '@near-js/crypto';
import { KeyStore } from '@near-js/keystores';
import { Signer } from '@near-js/signers';
export interface NearConfig {
    /** Holds {@link utils/key_pair!KeyPair | KeyPair} for signing transactions */
    keyStore?: KeyStore;
    /** @hidden */
    signer?: Signer;
    /**
     * [NEAR Contract Helper](https://github.com/near/near-contract-helper) url used to create accounts if no master account is provided
     * @see {@link account_creator!UrlAccountCreator | UrlAccountCreator}
     */
    helperUrl?: string;
    /**
     * The balance transferred from the {@link masterAccount} to a created account
     * @see {@link account_creator!LocalAccountCreator | LocalAccountCreator}
     */
    initialBalance?: string;
    /**
     * The account to use when creating new accounts
     * @see {@link account_creator!LocalAccountCreator | LocalAccountCreator}
     */
    masterAccount?: string;
    /**
     * {@link utils/key_pair!KeyPair | KeyPair} are stored in a {@link key_stores/keystore!KeyStore} under the `networkId` namespace.
     */
    networkId: string;
    /**
     * NEAR RPC API url. used to make JSON RPC calls to interact with NEAR.
     * @see {@link providers/json-rpc-provider!JsonRpcProvider | JsonRpcProvider}
     */
    nodeUrl: string;
    /**
     * NEAR RPC API headers. Can be used to pass API KEY and other parameters.
     * @see {@link providers/json-rpc-provider!JsonRpcProvider | JsonRpcProvider}
     */
    headers?: {
        [key: string]: string | number;
    };
    /**
     * NEAR wallet url used to redirect users to their wallet in browser applications.
     * @see [https://wallet.near.org/](https://wallet.near.org/)
     */
    walletUrl?: string;
    /**
     * JVSM account ID for NEAR JS SDK
     */
    jsvmAccountId?: string;
    /**
     * Backward-compatibility for older versions
     */
    deps?: {
        keyStore: KeyStore;
    };
}
/**
 * This is the main class developers should use to interact with NEAR.
 * @example
 * ```js
 * const near = new Near(config);
 * ```
 */
export declare class Near {
    readonly config: any;
    readonly connection: Connection;
    readonly accountCreator: AccountCreator;
    constructor(config: NearConfig);
    /**
     * @param accountId near accountId used to interact with the network.
     */
    account(accountId: string): Promise<Account>;
    /**
     * Create an account using the {@link account_creator!AccountCreator | AccountCreator}. Either:
     * * using a masterAccount with {@link account_creator!LocalAccountCreator | LocalAccountCreator}
     * * using the helperUrl with {@link account_creator!UrlAccountCreator | UrlAccountCreator}
     * @see {@link NearConfig.masterAccount} and {@link NearConfig.helperUrl}
     *
     * @param accountId
     * @param publicKey
     */
    createAccount(accountId: string, publicKey: PublicKey): Promise<Account>;
}
