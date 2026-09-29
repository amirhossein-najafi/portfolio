"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, playWhenVisible, prefersReducedMotion, splitWords } from "@/lib/motion";
import { useLanguage } from "@/i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  mode?: "words" | "lines";
  delay?: number;
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
      gsap.set(targets, { clearProps: "all", opacity: 1 });
      return;
    }

    let stopFallback = () => {};
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        targets,
        { opacity: 0, yPercent: 110, rotate: mode === "lines" ? 0 : 4 },
        {
          opacity: 1,
          yPercent: 0,
          rotate: 0,
          duration: motion.duration.slow,
          delay,
          stagger: mode === "lines" ? motion.stagger.base : 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
      stopFallback = playWhenVisible(node, tween);
    }, node);

    return () => {
      stopFallback();
      ctx.revert();
    };
  }, [text, locale, delay, mode]);

  return (
    <Tag ref={ref as never} className={className}>
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          <span key={`s-${i}`}>{part}</span>
        ) : (
          <span key={`w-${i}`} className="inline-block overflow-hidden align-bottom py-[0.08em]">
            <span
              className="split-unit inline-block origin-bottom-left will-change-transform rtl:origin-bottom-right"
              style={{ opacity: 0 }}
            >
              {part}
            </span>
          </span>
        ),
      )}
    </Tag>
  );
}
