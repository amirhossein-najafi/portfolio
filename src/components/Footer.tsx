"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();
  const name = locale === "fa" ? profile.nameFa : profile.name;

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-deep)] py-8 text-[var(--ink-muted)]">
      <div className="container flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {name}
        </p>
        <p>{t.ui.footerNote}</p>
      </div>
    </footer>
  );
}
