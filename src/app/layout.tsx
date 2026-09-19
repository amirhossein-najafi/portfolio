import type { Metadata, Viewport } from "next";
import { Syne, Source_Sans_3, Vazirmatn } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { profile } from "@/data/profile";
import { absoluteUrl, localeUrl, siteConfig } from "@/data/seo";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const persian = Vazirmatn({
  variable: "--font-fa",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b0f" },
    { media: "(prefers-color-scheme: light)", color: "#080b0f" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title.en,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description.en,
  applicationName: siteConfig.shortName,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "portfolio",
  classification: "Personal Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: localeUrl("en"),
      fa: localeUrl("fa"),
      "x-default": localeUrl("en"),
    },
    types: {
      "application/pdf": absoluteUrl(profile.cvPath),
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Amirhossein",
    lastName: "Najafi",
    username: "amirhossein-najafi",
    locale: "en_US",
    alternateLocale: ["fa_IR"],
    url: siteConfig.url,
    title: siteConfig.title.en,
    description: siteConfig.description.en,
    siteName: `${siteConfig.name} Portfolio`,
    emails: [siteConfig.email],
    phoneNumbers: [siteConfig.phone],
    countryName: "Iran",
    images: [
      {
        url: absoluteUrl(profile.photo),
        width: 960,
        height: 1280,
        alt: profile.photoAlt.en,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title.en,
    description: siteConfig.description.en,
    images: [absoluteUrl(profile.photo)],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "IR-02",
    "geo.placename": "Mazandaran",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${persian.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
        <link rel="author" href={siteConfig.url} />
        <link rel="me" href={profile.socials[0].href} />
        <link rel="me" href={profile.socials[1].href} />
      </head>
      <body className="min-h-full font-sans text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
