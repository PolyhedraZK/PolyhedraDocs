import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Home() {
  if (typeof window !== "undefined") {
    const url = useBaseUrl("/expander");
    console.log(`url = ${url}`);
    window.location.replace(url);
  }
  return null;
}
