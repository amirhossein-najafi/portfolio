"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@/data/seo";
import { dictionaries, type Content, type Locale } from "@/i18n/dictionaries";

const STORAGE_KEY = "portfolio-locale";

type LanguageContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Content;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "fa";
}

function readQueryLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const lang = new URLSearchParams(window.location.search).get("lang");
  return isLocale(lang) ? lang : null;
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : "en";
}

function syncLocaleUrl(locale: Locale) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (locale === "fa") url.searchParams.set("lang", "fa");
  else url.searchParams.delete("lang");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function syncDocumentSeo(locale: Locale) {
  const title = siteConfig.title[locale];
  const description = siteConfig.description[locale];
  const ogLocale = locale === "fa" ? "fa_IR" : "en_US";

  document.title = title;
  upsertMeta("name", "description", description);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:locale", ogLocale);
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = readQueryLocale() ?? readStoredLocale();
    setLocaleState(initial);
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    syncLocaleUrl(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "fa" : "en");
  }, [locale, setLocale]);

  const dir: "ltr" | "rtl" = locale === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.dataset.locale = locale;
    syncLocaleUrl(locale);
    syncDocumentSeo(locale);
  }, [locale, dir, ready]);

  const value = useMemo(
    () => ({
      locale,
      dir,
      t: dictionaries[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, dir, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
