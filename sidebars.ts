import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  // Expander documentation sidebar
  expanderSidebar: [
    {
      type: "autogenerated",
      dirName: "expander",
    },
  ],
  // ExpChain documentation sidebar
  expchainSidebar: [
    {
      type: "autogenerated",
      dirName: "expchain",
    },
  ],
  litepaperSidebar: [
    {
      type: "doc",
      id: "litepaper/index",
      className: "hidden-sidebar-item",
    },
  ],
  roadmapSidebar: [
    {
          type: "doc",
          id: "roadmap/interactive-tech-tree",
          label: "Interactive Tech Tree" // Custom label here
    }
  ],
};

export default sidebars;
