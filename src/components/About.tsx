"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { prefersReducedMotion, splitWords } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const { t, locale } = useLanguage();
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const words = useMemo(() => splitWords(t.summary), [t.summary]);

  useEffect(() => {
    const summary = summaryRef.current;
    const line = lineRef.current;
    if (!summary || !line) return;

    const targets = summary.querySelectorAll(".highlight-word");
    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: summary,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });

      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: line, start: "top 92%", end: "top 55%", scrub: 0.6 },
        },
      );
    });

    return () => ctx.revert();
  }, [locale, words]);

  return (
    <section id="about" className="section">
      <div className="container grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <p className="section-label">{t.about.label}</p>
          <SplitReveal text={t.about.title} as="h2" className="section-title" />
        </Reveal>

        <div>
          <p
            ref={summaryRef}
            className="summary-text md:pt-8"
          >
            {words.map((word, i) =>
              /^\s+$/.test(word) ? (
                <span key={`s-${i}`}>{word}</span>
              ) : (
                <span key={`w-${i}`} className="highlight-word">
                  {word}
                </span>
              ),
            )}
          </p>

          <span ref={lineRef} className="draw-line mt-10" aria-hidden />

          <Reveal delay={0.05}>
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
      </div>
    </section>
  );
}
