/// <reference types="node" />
export declare const preformatMakeCredReq: (makeCredReq: any) => any;
export declare const get64BytePublicKeyFromPEM: (publicKey: PublicKey) => ArrayBuffer;
export declare const validateUsername: (name: string) => string;
export declare const preformatGetAssertReq: (getAssert: any) => any;
export declare const publicKeyCredentialToJSON: (pubKeyCred: any) => any;
export declare const recoverPublicKey: (r: any, s: any, message: any, recovery: any) => Promise<Buffer[]>;
