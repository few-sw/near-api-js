import { KeyPair } from '@near-js/crypto';
export declare class PasskeyProcessCanceled extends Error {
    constructor(message: any);
}
export declare const createKey: (username: string) => Promise<KeyPair>;
export declare const getKeys: (username: string) => Promise<[KeyPair, KeyPair]>;
export declare const isPassKeyAvailable: () => Promise<boolean>;
