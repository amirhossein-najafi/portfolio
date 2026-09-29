"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, playWhenVisible, prefersReducedMotion } from "@/lib/motion";
import { useLanguage } from "@/i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className = "", delay = 0, y = 48 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      gsap.set(node, { clearProps: "all", opacity: 1 });
      return;
    }

    let stopFallback = () => {};
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        node,
        { opacity: 0, y, clipPath: "inset(0% 0% 100% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: motion.duration.reveal,
          delay,
          ease: "power4.out",
          clearProps: "clipPath",
          scrollTrigger: {
            trigger: node,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
      stopFallback = playWhenVisible(node, tween);
    }, node);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      stopFallback();
      ctx.revert();
    };
  }, [delay, y, locale]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
