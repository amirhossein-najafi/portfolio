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
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(228,192,120,0.45)] to-transparent"
        aria-hidden
      />

      <div className="container relative z-10 py-[clamp(5rem,12vw,8.5rem)] text-[var(--ink)]">
        <Reveal>
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[var(--gold)] uppercase">
            {t.contact.label}
          </p>
          <SplitReveal
            text={t.contact.title}
            as="h2"
            className="display max-w-[16ch] text-[clamp(2.6rem,7vw,5rem)] font-semibold"
          />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">
            {t.contact.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic strength={36}>
              <a href={mailto} className="btn btn-accent">
                {t.ui.emailMe}
              </a>
            </Magnetic>
            <Magnetic strength={36}>
              <a
                href={`tel:${profile.phone}`}
                className="btn btn-secondary"
              >
                {profile.phone}
              </a>
            </Magnetic>
            <Magnetic strength={36}>
              <a href={profile.cvPath} download className="btn btn-primary">
                {t.ui.downloadCv}
              </a>
            </Magnetic>
          </div>

          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-xs font-bold tracking-[0.16em] text-[var(--ink-muted)] uppercase">
                {t.ui.email}
              </dt>
              <dd className="mt-2">
                <a
                  href={mailto}
                  className="magnetic text-lg font-medium underline-offset-4 hover:underline"
                >
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
                        className="magnetic underline-offset-4 hover:underline"
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
