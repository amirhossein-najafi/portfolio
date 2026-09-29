"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageToggle } from "@/i18n/LanguageToggle";

export function Header() {
  const { t, locale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, visible: false });
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > lastY.current + 2);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = t.nav
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [t.nav]);

  const measure = useCallback(() => {
    const nav = navRef.current;
    if (!nav || !active) {
      setIndicator((s) => ({ ...s, visible: false }));
      return;
    }
    const link = nav.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
    if (!link) return;
    setIndicator({ x: link.offsetLeft, w: link.offsetWidth, visible: true });
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure, locale]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:pt-4 ${
        hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
      }`}
    >
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold-bright)] to-[var(--green)] rtl:origin-right"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <div className="container">
        <div
          className={`header-pill flex h-[3.9rem] items-center justify-between gap-4 rounded-full ps-2 pe-2 md:ps-3 ${
            scrolled || open ? "is-scrolled" : ""
          }`}
        >
          <Logo />

          <nav ref={navRef} className="relative hidden items-center gap-1 md:flex" aria-label="Primary">
            <span
              className="nav-indicator"
              style={{
                width: indicator.w,
                transform: `translateX(${indicator.x}px)`,
                opacity: indicator.visible ? 1 : 0,
              }}
              aria-hidden
            />
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={`nav-link text-sm font-medium ${
                  active === link.href
                    ? "text-[var(--ink)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageToggle />
            <a href={profile.cvPath} download className="btn btn-primary magnetic !min-h-10 !px-4 !text-sm">
              <span className="btn-label">{t.ui.downloadCv}</span>
            </a>
          </div>

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
          <div className="mt-2 overflow-hidden rounded-3xl border border-[var(--line-strong)] bg-[rgba(8,11,15,0.92)] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1 p-3" aria-label="Mobile">
              {t.nav.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-baseline gap-3 rounded-2xl px-3 py-3 text-lg font-medium text-[var(--ink)] transition hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xs font-bold text-[var(--gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
      </div>
    </header>
  );
}
