"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { playWhenVisible, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const { t, locale, dir } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const cards = timeline.querySelectorAll<HTMLElement>(".exp-card");
    if (prefersReducedMotion()) {
      gsap.set([cards, timeline.querySelectorAll(".exp-bullet")], { clearProps: "all", opacity: 1 });
      return;
    }

    const stops: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const scrub = {
        trigger: timeline,
        start: "top 75%",
        end: "bottom 45%",
        scrub: 0.6,
      };
      gsap.fromTo(".exp-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: scrub });
      gsap.fromTo(".exp-tip", { top: "0%" }, { top: "100%", ease: "none", scrollTrigger: { ...scrub } });

      cards.forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
        });
        tl.fromTo(
          card,
          { opacity: 0, x: dir === "rtl" ? 60 : -60 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power4.out" },
        ).fromTo(
          card.querySelectorAll(".exp-bullet"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          0.25,
        );
        stops.push(playWhenVisible(card, tl));
      });
    }, timeline);

    return () => {
      stops.forEach((stop) => stop());
      ctx.revert();
    };
  }, [locale, dir]);

  return (
    <section id="experience" className="section section-band">
      <div className="container">
        <Reveal>
          <p className="section-label">{t.experience.label}</p>
          <SplitReveal text={t.experience.title} as="h2" className="section-title" mode="words" />
          <p className="section-lead">{t.experience.lead}</p>
        </Reveal>

        <div ref={timelineRef} className="relative mt-14">
          <div className="absolute start-[0.35rem] top-2 bottom-2 w-px bg-[var(--line-strong)] md:start-[0.4rem]" aria-hidden />
          <div
            className="exp-fill absolute start-[0.35rem] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[var(--gold)] to-[var(--green)] md:start-[0.4rem]"
            style={{ transform: "scaleY(0)" }}
            aria-hidden
          />
          <div className="absolute start-[0.35rem] top-2 bottom-2 w-px md:start-[0.4rem]" aria-hidden>
            <span className="exp-tip absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold-bright)] shadow-[0_0_24px_6px_rgba(228,192,120,0.55)]" />
          </div>

          <div className="space-y-10">
            {t.experience.jobs.map((job) => (
              <article
                key={`${job.company}-${job.role}`}
                className="exp-card relative ps-8 md:ps-12"
                style={{ opacity: 0 }}
              >
                <span
                  className="absolute start-0 top-8 h-2.5 w-2.5 rounded-full bg-[var(--gold)] ring-4 ring-[var(--gold-soft)] shadow-[0_0_16px_rgba(228,192,120,0.45)]"
                  aria-hidden
                />
                <div className="grid gap-8 rounded-[1.75rem] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm md:grid-cols-[0.95fr_1.05fr] md:p-10">
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-[var(--gold)]">{job.period}</p>
                    <h3 className="display mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                      {job.role}
                    </h3>
                    <p className="mt-3 text-base font-medium text-[var(--gold)]">{job.company}</p>
                    <p className="mt-1 text-sm text-[var(--ink-muted)]">{job.location}</p>
                  </div>
                  <ul className="space-y-4 text-[var(--ink-muted)]">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="exp-bullet relative ps-5 leading-relaxed">
                        <span
                          className="absolute start-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
