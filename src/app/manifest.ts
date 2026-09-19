import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Frontend Developer`,
    short_name: siteConfig.shortName,
    description: siteConfig.description.en,
    start_url: "/",
    display: "standalone",
    background_color: "#05070a",
    theme_color: "#080b0f",
    lang: "en",
    dir: "ltr",
    categories: ["portfolio", "personalization", "business"],
    icons: [
      {
        src: "/icon/48",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
