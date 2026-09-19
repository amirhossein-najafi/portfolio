import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { absoluteUrl, localeUrl, siteConfig } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const photo = absoluteUrl(profile.photo);

  return [
    {
      url: localeUrl("en"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [photo],
      alternates: {
        languages: {
          en: localeUrl("en"),
          fa: localeUrl("fa"),
          "x-default": localeUrl("en"),
        },
      },
    },
    {
      url: localeUrl("fa"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [photo],
      alternates: {
        languages: {
          en: localeUrl("en"),
          fa: localeUrl("fa"),
          "x-default": localeUrl("en"),
        },
      },
    },
    {
      url: `${siteConfig.url}/Amirhossein_Najafi_Resume.pdf`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
