import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Home() {
  if (typeof window !== "undefined") {
    window.location.replace(useBaseUrl("/expander"));
  }
  return null;
}
