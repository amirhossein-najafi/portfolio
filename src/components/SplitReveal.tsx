"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, prefersReducedMotion, splitWords } from "@/lib/motion";
import { useLanguage } from "@/i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  mode?: "words" | "lines";
  delay?: number;
  once?: boolean;
};

export function SplitReveal({
  text,
  as: Tag = "p",
  className = "",
  mode = "words",
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { locale } = useLanguage();
  const parts = useMemo(() => splitWords(text), [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll(".split-unit");
    if (prefersReducedMotion()) {
      gsap.set(targets, { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: mode === "lines" ? 48 : 28 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.base,
          delay,
          stagger: motion.stagger.tight,
          ease: motion.ease,
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    }, node);

    return () => ctx.revert();
  }, [text, locale, delay, mode]);

  return (
    <Tag ref={ref as never} className={className}>
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          <span key={`s-${i}`}>{part}</span>
        ) : (
          <span key={`w-${i}`} className="inline-block overflow-hidden align-bottom py-[0.08em]">
            <span className="split-unit inline-block will-change-transform" style={{ opacity: 0 }}>
              {part}
            </span>
          </span>
        ),
      )}
    </Tag>
  );
}
