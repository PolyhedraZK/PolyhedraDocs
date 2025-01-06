import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import path from "path";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "dotenv/config";

const SITE_URL = process.env.SITE_URL || "https://docs.polyhedra.network";

const config: Config = {
  title: "Polyhedra Network Documentation",
  tagline: "Polyhedra Network Documentation",
  url: SITE_URL,
  baseUrl: "/",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "/img/meta/favicon.ico",
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
          // editUrl: "https://github.com/PolyhedraZK/PolyhedraDocs/edit/main/",
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
    // Custom CSS variables for specific pages
    customCss: {
      vars: {
        "--doc-item-container-width": "100%",
        "--ifm-container-width-xl": "100%",
      },
    },
    metadata: [
      {
        name: "og:site_name",
        content: "Polyhedra Network Documentation",
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: "@PolyhedraZK",
      },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
    ],
    colorMode: {
      disableSwitch: true,
      defaultMode: "light",
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: "Site Logo",
        src: `/logos/polyhedra-docs-light.svg`,
        srcDark: "none",
        href: "/",
        target: "_self",
        width: 179,
        height: 30,
        className: "navbar-logo-single",
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
        {
          type: "docSidebar",
          sidebarId: "roadmapSidebar",
          position: "left",
          label: "Roadmap",
        },
        // 分割线
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
          href: "https://t.me/PolyhedraGroup",
          position: "right",
          className: "icon-link icon-link-mask icon-link-telegram",
          "aria-label": "telegram",
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
