import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const config: Config = {
  title: "Polyhedra Network Documentation",
  tagline: "Polyhedra Network Documentation",
  favicon: "img/group.svg",

  url: "https://polyhedrazk.github.io",
  baseUrl: "/",

  organizationName: "facebook",
  projectName: "docusaurus",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          path: "docs",
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          sidebarCollapsible: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap",
      type: "text/css",
    },
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: "",
      logo: {
        alt: "Polyhedra Network",
        src: "img/group.svg",
        href: "/",
      },
      style: 'primary',
      hideOnScroll: false,
      items: [
        {
          type: "doc",
          docId: "litepaper/index",
          position: "left",
          label: "Litepaper",
        },
        {
          type: "docSidebar",
          sidebarId: "expchainSidebar",
          position: "left",
          label: "EXPchain",
        },
        {
          type: "docSidebar",
          sidebarId: "expanderSidebar",
          position: "left",
          label: "Expander",
        },
        {
          href: 'https://twitter.com/PolyhedraZK',
          position: 'right',
          className: 'header-twitter-link',
          'aria-label': 'Twitter',
        },
        {
          href: 'https://t.me/PolyhedraGroup',
          position: 'right',
          className: 'header-discord-link',
          'aria-label': 'Discord',
        },
        {
          href: 'https://t.me/PolyhedraZK',
          position: 'right',
          className: 'header-telegram-link',
          'aria-label': 'Telegram',
        }
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          items: [
            {
              label: 'Bridge',
              to: 'https://bridge.expchain.ai/bridge',
            },
          ],
        },
        {
          items: [
            {
              label: 'Faucet',
              to: 'https://faucet.expchain.ai/',
            },
          ],
        },
        {
          items: [
            {
              label: 'Explorer',
              to: 'https://blockscout-testnet.expchain.ai/',
            },
          ],
        },
        {
          items: [
            {
              label: 'Developers',
              to: 'https://github.com/PolyhedraZK',
            },
          ],
        },
      ],
      copyright: `<div>&#169; ${new Date().getFullYear()} Polyhedra Network<a href="https://drive.google.com/drive/folders/1ZXE__EVRMeeIHX0FpIWG3va1d_xmse7n">Press Kit</a></div>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
