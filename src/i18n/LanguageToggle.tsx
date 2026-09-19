"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={`lang-toggle inline-flex items-center rounded-full border border-[var(--line)] bg-white/5 p-0.5 text-xs font-bold tracking-wide text-[var(--ink)] ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        className={`magnetic rounded-full px-2.5 py-1.5 transition ${
          locale === "en"
            ? "bg-[var(--gold)] text-[#1a1408]"
            : "opacity-65 hover:opacity-100"
        }`}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        {t.ui.switchToEn}
      </button>
      <button
        type="button"
        className={`magnetic rounded-full px-2.5 py-1.5 transition ${
          locale === "fa"
            ? "bg-[var(--gold)] text-[#1a1408]"
            : "opacity-65 hover:opacity-100"
        }`}
        aria-pressed={locale === "fa"}
        onClick={() => setLocale("fa")}
      >
        {t.ui.switchToFa}
      </button>
    </div>
  );
}
