import { profile } from "@/data/profile";

export const siteConfig = {
  name: profile.name,
  nameFa: profile.nameFa,
  shortName: "AN Portfolio",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  localeDefault: "en" as const,
  locales: ["en", "fa"] as const,
  email: profile.email,
  phone: `+98${profile.phone.replace(/^0/, "")}`,
  location: {
    en: "Mazandaran, Iran",
    fa: "مازندران، ایران",
  },
  jobTitle: {
    en: "Frontend Developer",
    fa: "توسعه‌دهنده فرانت‌اند",
  },
  title: {
    en: `${profile.name} — Frontend Developer`,
    fa: `${profile.nameFa} — توسعه‌دهنده فرانت‌اند`,
  },
  description: {
    en: "Frontend developer specializing in React, Next.js, and TypeScript. Portfolio of production UI work including Daraei 360 — based in Mazandaran, Iran.",
    fa: "توسعه‌دهنده فرانت‌اند متخصص React، Next.js و TypeScript. نمونه‌کارها شامل فرانت‌اند محصول دارایی ۳۶۰ — مقیم مازندران، ایران.",
  },
  keywords: [
    "Amirhossein Najafi",
    "امیرحسین نجفی",
    "Frontend Developer",
    "توسعه‌دهنده فرانت‌اند",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Redux",
    "Portfolio",
    "Daraei 360",
    "دارایی ۳۶۰",
    "Mazandaran",
    "Iran",
  ],
  sameAs: profile.socials.map((s) => s.href),
  ogImageAlt: {
    en: `${profile.name} — Frontend Developer portfolio`,
    fa: `${profile.nameFa} — پورتفولیو توسعه‌دهنده فرانت‌اند`,
  },
} as const;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}

export function localeUrl(locale: "en" | "fa") {
  return locale === "en" ? siteConfig.url : `${siteConfig.url}/?lang=fa`;
}
