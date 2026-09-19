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
    if (!list || prefersReducedMotion()) return;

    const chips = list.querySelectorAll(".skill-chip");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chips,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.fast,
          stagger: 0.03,
          ease: motion.ease,
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
          },
        },
      );
    }, list);

    return () => ctx.revert();
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
                    style={{ opacity: 0 }}
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
