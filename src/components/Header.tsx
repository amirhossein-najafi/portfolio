"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageToggle } from "@/i18n/LanguageToggle";

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-[rgba(5,7,10,0.82)] backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold-bright)] to-[var(--green)]"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <div className="container flex h-[4.4rem] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-5 lg:gap-7 md:flex" aria-label="Primary">
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
          <LanguageToggle />
          <a
            href={profile.cvPath}
            download
            className="btn btn-primary magnetic !min-h-10 !px-4 !text-sm"
          >
            {t.ui.downloadCv}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)]"
            aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full bg-current transition ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-full bg-current transition ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--line)] bg-[var(--bg-elevated)]/95 backdrop-blur-xl md:hidden">
          <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile">
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-[var(--ink)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.cvPath}
              download
              className="btn btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              {t.ui.downloadCv}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
