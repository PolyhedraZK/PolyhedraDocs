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
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          exclude: ["README.md"],
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
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
        content: "https://ionicframework.com/docs/img/meta/open-graph.png",
      },
      {
        name: "twitter:image",
        content: "https://ionicframework.com/docs/img/meta/open-graph.png",
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
        content: "1`11",
      },
    ],
    colorMode: {
      defaultMode: "light",
    },
    navbar: {
      hideOnScroll: true,
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
          label: "Community",
          position: "right",
          items: [
            {
              href: "https://ionicframework.com/community",
              label: "Community Hub",
              target: "_blank",
              rel: null,
            },
            {
              href: "https://forum.ionicframework.com/",
              label: "Forum",
              target: "_blank",
              rel: null,
            },
            {
              href: "https://www.meetup.com/topics/ionic-framework/",
              label: "Meetups",
              target: "_blank",
              rel: null,
            },
            {
              href: "https://blog.ionicframework.com/",
              label: "Blog",
              target: "_blank",
              rel: null,
            },
            {
              href: "https://twitter.com/ionicframework",
              label: "Twitter",
              target: "_blank",
              rel: null,
            },
          ],
          className: "navbar__link--community",
        },
        {
          label: "Support",
          position: "right",
          items: [
            {
              href: "https://ionicframework.com/support",
              label: "Help Center",
              target: "_blank",
              rel: null,
            },
            {
              href: "https://ionic.zendesk.com/",
              label: "Customer Support",
              target: "_blank",
              rel: null,
            },
            {
              href: "https://ionicframework.com/advisory",
              label: "Enterprise Advisory",
              target: "_blank",
              rel: null,
            },
          ],
          className: "navbar__link--support",
        },
        {
          type: "html",
          position: "right",
          value: '<div class="separator" aria-hidden></div>',
        },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsBefore: [],
          dropdownItemsAfter: [
            {
              href: "https://ionicframework.com/translate",
              label: "Translate",
              target: "_blank",
              rel: null,
            },
          ],
          className: "icon-link language navbar__item",
        },
        {
          href: "https://twitter.com/Ionicframework",
          position: "right",
          className: "icon-link icon-link-mask icon-link-twitter",
          "aria-label": "Twitter",
          target: "_blank",
        },
        {
          href: "https://ionic.link/discord",
          position: "right",
          className: "icon-link icon-link-mask icon-link-discord",
          "aria-label": "Discord",
          target: "_blank",
        },
        {
          href: "https://github.com/ionic-team/ionic-framework",
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
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
  } satisfies Preset.ThemeConfig,
  plugins: ["docusaurus-plugin-sass"],
  customFields: {},
  themes: [],
};

export default config;
