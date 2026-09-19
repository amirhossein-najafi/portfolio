"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  const { t, locale } = useLanguage();

  return (
    <a
      href="#top"
      aria-label={`${t.firstName} ${t.lastName} — home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#12161a_0%,#1f4d40_125%)] shadow-[0_10px_28px_rgba(18,22,26,0.2)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_32px_rgba(18,22,26,0.28)]">
        <svg viewBox="0 0 40 40" className="h-[22px] w-[22px]" aria-hidden>
          {/* A */}
          <path
            d="M7 32 16.2 8h2.6L28 32h-3.1l-1.55-4.2h-9.7L12.1 32H7Zm6.35-6.9h7.3L17.5 14.6 13.35 25.1Z"
            fill="#f7f2e8"
          />
          {/* N accent */}
          <path
            d="M21.2 8h3.05v9.6L32.4 32h-3.35L21.2 18.4V8Z"
            fill="#e8c47a"
          />
          <path d="M29.4 8H32.5v24H29.4V8Z" fill="#e8c47a" />
        </svg>
        <span
          className="pointer-events-none absolute inset-[1px] rounded-[0.9rem] ring-1 ring-inset ring-white/12"
          aria-hidden
        />
      </span>

      <span className="hidden min-w-0 flex-col leading-none sm:flex">
        <span
          className={`font-semibold tracking-tight text-[var(--ink)] ${
            locale === "fa" ? "text-[1.05rem]" : "display text-[1.08rem]"
          }`}
        >
          {t.firstName}
        </span>
        <span
          className={`mt-1 font-bold text-[var(--gold)] ${
            locale === "fa"
              ? "text-[0.75rem] tracking-[0.08em]"
              : "text-[0.7rem] tracking-[0.2em] uppercase"
          }`}
        >
          {t.lastName}
        </span>
      </span>
    </a>
  );
}
