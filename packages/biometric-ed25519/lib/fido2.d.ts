import { Fido2Lib } from 'fido2-lib';
export declare class Fido2 {
    f2l: Fido2Lib;
    init({ rpId, rpName, timeout }: {
        rpId: any;
        rpName: any;
        timeout: any;
    }): Promise<void>;
    registration({ username, displayName, id }: {
        username: any;
        displayName: any;
        id: any;
    }): Promise<{
        user: {
            id: any;
            name: any;
            displayName: any;
        };
        status: string;
        challenge: string;
        rp: {
            name: string;
            id: string;
            icon?: string;
        };
        pubKeyCredParams: {
            type: "public-key";
            alg: number;
        }[];
        timeout?: number;
        attestation?: import("fido2-lib").Attestation;
        authenticatorSelection?: import("fido2-lib").AuthenticatorSelectionCriteria;
        rawChallenge?: ArrayBuffer;
        extensions?: any;
    }>;
    attestation({ clientAttestationResponse, origin, challenge }: {
        clientAttestationResponse: any;
        origin: any;
        challenge: any;
    }): Promise<import("fido2-lib").Fido2AttestationResult>;
    login(): Promise<{
        attestation: string;
        challenge: string;
        status: string;
        timeout?: number;
        rpId?: string;
        userVerification?: import("fido2-lib").UserVerification;
        rawChallenge?: ArrayBuffer;
        extensions?: any;
        allowCredentials?: import("fido2-lib").PublicKeyCredentialDescriptor[];
    }>;
}
