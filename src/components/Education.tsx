"use client";

import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Education() {
  const { t } = useLanguage();
  const edu = t.education;

  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal>
          <p className="section-label">{edu.label}</p>
          <SplitReveal text={edu.title} as="h2" className="section-title" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <article className="border-t border-[var(--line)] pt-8">
              <p className="text-sm font-semibold tracking-wide text-[var(--gold)]">
                {edu.period}
              </p>
              <h3 className="display mt-2 text-3xl font-semibold tracking-tight">
                {edu.degree}
              </h3>
              <p className="mt-2 text-[var(--gold)]">{edu.school}</p>
              <p className="mt-3 text-[var(--ink-muted)]">{edu.note}</p>
              <div className="mt-6">
                <p className="text-sm font-bold tracking-[0.14em] text-[var(--ink)] uppercase">
                  {t.ui.languages}
                </p>
                <ul className="mt-3 space-y-1 text-[var(--ink-muted)]">
                  {edu.spokenLanguages.map((lang) => (
                    <li key={lang.name}>
                      {lang.name} — {lang.level}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="border-t border-[var(--line)] pt-8">
              <p className="text-sm font-semibold tracking-wide text-[var(--gold)]">
                {t.ui.academicExperience}
              </p>
              <h3 className="display mt-2 text-3xl font-semibold tracking-tight">
                {edu.teachingRole}
              </h3>
              <p className="mt-2 text-[var(--gold)]">{edu.teachingSchool}</p>
              <ul className="mt-5 space-y-3 text-[var(--ink-muted)]">
                {edu.courses.map((course) => (
                  <li key={course} className="relative ps-5 leading-relaxed">
                    <span
                      className="absolute start-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
                      aria-hidden
                    />
                    {course}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
