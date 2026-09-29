"use client";

import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { SplitReveal } from "@/components/SplitReveal";
import { activeSocials, profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Contact() {
  const { t } = useLanguage();
  const socials = activeSocials();
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`;

  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--line)]">
      <div className="absolute inset-0 bg-[linear-gradient(155deg,#05070a_0%,#0c1a16_38%,#1a3d32_72%,#1f1810_120%)]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 18%, rgba(228,192,120,0.28), transparent 36%), radial-gradient(circle at 88% 78%, rgba(58,122,100,0.35), transparent 42%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.5), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="hero-grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(228,192,120,0.45)] to-transparent"
        aria-hidden
      />

      <div className="container relative z-10 py-[clamp(6rem,14vw,10rem)] text-[var(--ink)]">
        <Reveal>
          <p className="section-label">{t.contact.label}</p>
          <SplitReveal
            text={t.contact.title}
            as="h2"
            className="display max-w-[14ch] text-[clamp(3rem,9vw,7.5rem)] leading-[0.98] font-semibold"
          />
          <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">
            {t.contact.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Magnetic strength={44}>
              <a href={mailto} className="btn btn-accent btn-xl">
                <span className="btn-label">{t.ui.emailMe}</span>
                <span className="inline-block rtl:-scale-x-100" aria-hidden>
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={36}>
              <a href={`tel:${profile.phone}`} className="btn btn-secondary">
                <span className="btn-label" dir="ltr">
                  {profile.phone}
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={36}>
              <a href={profile.cvPath} download className="btn btn-primary">
                <span className="btn-label">{t.ui.downloadCv}</span>
              </a>
            </Magnetic>
          </div>

          <span className="draw-line mt-16 opacity-60" aria-hidden />

          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-xs font-bold tracking-[0.16em] text-[var(--ink-muted)] uppercase">
                {t.ui.email}
              </dt>
              <dd className="mt-2">
                <a href={mailto} className="magnetic link-underline text-lg font-medium">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold tracking-[0.16em] text-[var(--ink-muted)] uppercase">
                {t.ui.locationLabel}
              </dt>
              <dd className="mt-2 text-lg font-medium">{t.location}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold tracking-[0.16em] text-[var(--ink-muted)] uppercase">
                {t.ui.social}
              </dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-5 text-lg font-medium">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic link-underline"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
