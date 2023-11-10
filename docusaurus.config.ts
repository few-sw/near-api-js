// Minimal [Docusaurus](https://docusaurus.io) configuration to allow us
// to generate docusaurus-compatible markdown from typedoc output.

const config = {
    title: 'Web3.Storage Documentation',
    tagline: 'The simple file storage service for IPFS and Filecoin',
    url: 'https://docs.web3.storage',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    // favicon: 'img/favicon.ico',
  
    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },
  
    plugins: [
      [
        'docusaurus-plugin-typedoc',
        {
          tsconfig: './tsconfig.json',
          out: 'typedoc-docs',
          entryPoints: [
            "packages/near-api-js",
            "packages/accounts",
            "packages/biometric-ed25519",
            // "packages/cookbook",
            "packages/crypto",
            "packages/iframe-rpc",
            "packages/keystores",
            "packages/keystores-browser",
            "packages/keystores-node",
            "packages/providers",
            "packages/signers",
            "packages/transactions",
            "packages/types",
            "packages/utils",
            "packages/wallet-account"
        ],
        entryPointStrategy: "packages",
          sidebar: {
            categoryLabel: 'w3protocol',
          },
        },
      ],
    ],
  }
  
  export default config