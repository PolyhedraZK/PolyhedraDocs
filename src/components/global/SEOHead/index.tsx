import React from "react";
import Head from "@docusaurus/Head";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function SEOHead({ title, description, image, url, siteName }) {
  const imageUrl = useBaseUrl(image, { absolute: true }); // 这会自动添加 siteConfig.url
  console.log(`imageUrl = ${imageUrl}`);
  return (
    <Head
      prioritizeSeoTags={false}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:url",
          content: url,
        },
        {
          property: "og:site_name",
          content: siteName,
        },
        {
          property: "og:image",
          content: imageUrl,
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          property: "og:image:type",
          content: "image/png",
        },
        {
          name: "twitter:image",
          content: imageUrl,
        },
      ]}
    >
      <title key="title">{title}</title>
    </Head>
  );
}
