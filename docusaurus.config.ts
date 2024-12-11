import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import path from "path";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const BASE_URL = "";

const config: Config = {
  title: "Polyhedra Network Documentation",
  tagline: "Polyhedra Network Documentation",
  url: "https://polyhedra.network",
  baseUrl: `${BASE_URL}/`,
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/meta/favicon.ico",
  organizationName: "Polyhedra-Network",
  projectName: "polyhedra-docs",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "",
          sidebarPath: require.resolve("./sidebars.js"),
          exclude: ["README.md"],
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          editUrl: "https://github.com/PolyhedraZK/PolyhedraDocs/edit/main/",
        },
        theme: {
          customCss: [
            require.resolve(
              "./node_modules/modern-normalize/modern-normalize.css"
            ),
            require.resolve("./src/styles/tokens.css"),
            require.resolve("./src/styles/custom.scss"),
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    metadata: [
      {
        name: "og:image",
        content: "/img/meta/seo.png",
      },
      {
        name: "twitter:image",
        content: "/img/meta/seo.png",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "og:type",
        content: "website",
      },
      {
        name: "og:site_name",
        content: "Polyhedra Network Documentation",
      },
    ],
    colorMode: {
      defaultMode: "light",
    },
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: "Site Logo",
        src: `/logos/ionic-text-docs-dark.svg`,
        srcDark: `/logos/ionic-text-docs-light.svg`,
        href: "/",
        target: "_self",
        width: 139,
        height: 28,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "litepaperSidebar",
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
        // {
        //   type: "html",
        //   position: "right",
        //   value: '<div class="separator" aria-hidden></div>',
        // },
        {
          href: "https://x.com/PolyhedraZK",
          position: "right",
          className: "icon-link icon-link-mask icon-link-x",
          "aria-label": "X",
          target: "_blank",
        },
        {
          href: "https://discord.com/invite/polyhedra-network",
          position: "right",
          className: "icon-link icon-link-mask icon-link-discord",
          "aria-label": "Discord",
          target: "_blank",
        },
        {
          href: "https://github.com/PolyhedraZK",
          position: "right",
          className: "icon-link icon-link-mask icon-link-github",
          "aria-label": "GitHub repository",
          target: "_blank",
        },
      ],
    },
    prism: {
      theme: { plain: {}, styles: [] },
      additionalLanguages: ["shell-session", "http"],
    },
  } satisfies Preset.ThemeConfig,
  plugins: ["docusaurus-plugin-sass"],
  customFields: {},
  themes: [],
};

export default config;
