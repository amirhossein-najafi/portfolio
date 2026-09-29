"use client";

import { Marquee } from "@/components/Marquee";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();
  const name = locale === "fa" ? profile.nameFa : profile.name;

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--bg-deep)] text-[var(--ink-muted)]">
      <div className="pt-10" aria-hidden>
        <Marquee duration={50}>
          <span className="flex items-center">
            {[0, 1].map((i) => (
              <span key={i} className="flex items-center">
                <span className="footer-name text-[clamp(4rem,14vw,12rem)] whitespace-nowrap">{name}</span>
                <span className="marquee-sep !mx-[0.35em] !h-[0.1em] !w-[0.1em] text-[clamp(4rem,14vw,12rem)]" />
              </span>
            ))}
          </span>
        </Marquee>
      </div>

      <div className="container flex flex-col gap-2 border-t border-[var(--line)] py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {name}
        </p>
        <p>{t.ui.footerNote}</p>
      </div>
    </footer>
  );
}
