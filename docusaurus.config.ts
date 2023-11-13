// import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config = {
    presets: [
        [
          "classic",
          {
            "docs": {
              "sidebarPath": "./sidebars.ts",
              "editUrl": "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/"
            }
          }
        ]
      ],
    plugins: [
      [
        'docusaurus-plugin-typedoc',
        // Plugin / TypeDoc options
        {
          entryPoints: [
                   //"packages/near-api-js",
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
          ], //process.env.DOCS_ENTRY_POINT.split(','),
          tsconfig: "./tsconfig.base.json", //process.env.DOCS_TS_CONFIG,
          name: "near-api-js", //process.env.DOCS_NAME,
          includeVersion: true,
          entryPointStrategy: 'packages',
        //   excludeNotDocumented: false,
          out: 'docusaurus-docs',
        //   basePath: "near-api-js/", //process.env.DOCS_BASE_PATH,
          readme: "docs/README_TYPEDOC.md", //process.env.DOCS_README,
        //   hideGenerator: false,
        //   commentStyle: 'jsdoc',
          entryDocument: 'index.html',
        //   hideMembersSymbol: true,
        sidebar: {
            fullNames: true,
          },
        //   trailingSlash: false,
        },
      ],
    ],
    trailingSlash: false,
    title: 'Generated',
    url: 'https://docs.near.org/',
    baseUrl: 'docs-test',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    // favicon: 'img/favicon.ico',
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },
  };
  
  export default config;