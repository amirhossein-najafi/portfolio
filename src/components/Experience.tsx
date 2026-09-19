"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const { t, locale } = useLanguage();
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: line.parentElement,
            start: "top 75%",
            end: "bottom 40%",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [locale]);

  return (
    <section id="experience" className="section section-band">
      <div className="container">
        <Reveal>
          <p className="section-label">{t.experience.label}</p>
          <SplitReveal
            text={t.experience.title}
            as="h2"
            className="section-title"
            mode="words"
          />
          <p className="section-lead">{t.experience.lead}</p>
        </Reveal>

        <div className="relative mt-14">
          <div
            ref={lineRef}
            className="absolute start-[0.35rem] top-2 bottom-2 w-px origin-top bg-[var(--gold)] md:start-[0.4rem]"
            style={{ transform: "scaleY(0)" }}
            aria-hidden
          />

          <div className="space-y-10">
            {t.experience.jobs.map((job, index) => (
              <Reveal key={`${job.company}-${job.role}`} delay={index * 0.06}>
                <article className="relative grid gap-6 ps-8 md:grid-cols-[0.95fr_1.05fr] md:ps-10">
                  <span
                    className="absolute start-0 top-2 h-2.5 w-2.5 rounded-full bg-[var(--gold)] ring-4 ring-[var(--gold-soft)] shadow-[0_0_16px_rgba(228,192,120,0.45)]"
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-[var(--gold)]">
                      {job.period}
                    </p>
                    <h3 className="display mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                      {job.role}
                    </h3>
                    <p className="mt-2 text-base font-medium text-[var(--gold)]">{job.company}</p>
                    <p className="mt-1 text-sm text-[var(--ink-muted)]">{job.location}</p>
                  </div>
                  <ul className="space-y-3.5 text-[var(--ink-muted)]">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="relative ps-5 leading-relaxed">
                        <span
                          className="absolute start-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
