"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, playWhenVisible, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function MarqueeRow({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <span className="flex items-center py-2">
      {items.map((item) => (
        <Fragment key={item}>
          <span
            className={`display text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold whitespace-nowrap ${
              outline ? "marquee-outline" : "text-[var(--ink)]"
            }`}
          >
            {item}
          </span>
          <span className="marquee-sep" aria-hidden />
        </Fragment>
      ))}
    </span>
  );
}

export function Skills() {
  const { t, locale } = useLanguage();
  const listRef = useRef<HTMLDivElement>(null);

  const allSkills = useMemo(() => t.skills.groups.flatMap((g) => g.items), [t.skills.groups]);
  const half = Math.ceil(allSkills.length / 2);
  const rowA = allSkills.slice(0, half);
  const rowB = allSkills.slice(half);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const chips = list.querySelectorAll<HTMLElement>(".skill-chip");
    if (!chips.length) return;

    if (prefersReducedMotion()) {
      gsap.set(chips, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    let stopFallback = () => {};
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
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
            start: "top 90%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
      stopFallback = playWhenVisible(list, tween);
    }, list);

    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshId);
      stopFallback();
      ctx.revert();
    };
  }, [locale, t.skills.groups]);

  return (
    <section id="skills" className="section section-band overflow-hidden">
      <div className="container">
        <Reveal>
          <p className="section-label">{t.skills.label}</p>
          <SplitReveal text={t.skills.title} as="h2" className="section-title" />
          <p className="section-lead">{t.skills.lead}</p>
        </Reveal>
      </div>

      <div className="relative z-[1] mt-14 space-y-2" aria-hidden>
        <Marquee duration={38}>
          <MarqueeRow items={rowA} />
        </Marquee>
        <Marquee duration={44} reverse>
          <MarqueeRow items={rowB} outline />
        </Marquee>
      </div>

      <div className="container">
        <div ref={listRef} className="mt-16 grid gap-10 md:grid-cols-3">
          {t.skills.groups.map((group) => (
            <div key={group.label} className="border-t border-[var(--line)] pt-6">
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
