"use client";

import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { useLanguage } from "@/i18n/LanguageProvider";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section">
      <div className="container grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <Reveal>
          <p className="section-label">{t.about.label}</p>
          <SplitReveal text={t.about.title} as="h2" className="section-title" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-[var(--ink-muted)] md:pt-10">
            {t.summary}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {t.interests.map((interest) => (
              <li
                key={interest}
                className="rounded-full border border-[var(--line)] bg-white/[0.025] px-3.5 py-1.5 text-sm text-[var(--ink-muted)] transition hover:border-[var(--gold-soft)] hover:text-[var(--ink)]"
              >
                {interest}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
