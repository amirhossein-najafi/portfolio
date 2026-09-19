"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const { t, locale } = useLanguage();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const chips = list.querySelectorAll<HTMLElement>(".skill-chip");
    if (!chips.length) return;

    if (prefersReducedMotion()) {
      gsap.set(chips, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    gsap.set(chips, { opacity: 0, y: 16 });

    const ctx = gsap.context(() => {
      gsap.to(chips, {
        opacity: 1,
        y: 0,
        duration: motion.duration.fast,
        stagger: 0.03,
        ease: motion.ease,
        scrollTrigger: {
          trigger: list,
          start: "top 90%",
          once: true,
          invalidateOnRefresh: true,
        },
      });
    }, list);

    // Safari + Lenis: ensure triggers recalculate after layout
    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    // Fallback if ScrollTrigger never fires (common on iOS Safari)
    const fallbackId = window.setTimeout(() => {
      chips.forEach((chip) => {
        if (getComputedStyle(chip).opacity === "0") {
          gsap.to(chips, { opacity: 1, y: 0, duration: 0.35, stagger: 0.02, ease: motion.easeSoft });
        }
      });
    }, 1200);

    return () => {
      window.cancelAnimationFrame(refreshId);
      window.clearTimeout(fallbackId);
      ctx.revert();
    };
  }, [locale, t.skills.groups]);

  return (
    <section id="skills" className="section section-band">
      <div className="container">
        <Reveal>
          <p className="section-label">{t.skills.label}</p>
          <SplitReveal text={t.skills.title} as="h2" className="section-title" />
          <p className="section-lead">{t.skills.lead}</p>
        </Reveal>

        <div ref={listRef} className="mt-12 grid gap-10 md:grid-cols-3">
          {t.skills.groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-bold tracking-[0.12em] text-[var(--gold)] uppercase">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="skill-chip rounded-md border border-[var(--line)] bg-white/[0.03] px-3 py-1.5 text-sm text-[var(--ink)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
