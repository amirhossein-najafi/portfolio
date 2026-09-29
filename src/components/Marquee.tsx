"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useLanguage } from "@/i18n/LanguageProvider";
import { prefersReducedMotion } from "@/lib/motion";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
};

export function Marquee({
  children,
  duration = 30,
  reverse = false,
  className = "",
  trackClassName = "",
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { dir } = useLanguage();

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || prefersReducedMotion()) return;

    // In RTL the duplicate copy sits to the left, so the seamless loop runs rightwards.
    const end = dir === "rtl" ? 50 : -50;
    const [from, to] = reverse ? [end, 0] : [0, end];
    const loop = gsap.fromTo(
      track,
      { xPercent: from },
      { xPercent: to, duration, ease: "none", repeat: -1 },
    );

    const slow = () => gsap.to(loop, { timeScale: 0.25, duration: 0.6, ease: "power2.out" });
    const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.6, ease: "power2.out" });
    root.addEventListener("mouseenter", slow);
    root.addEventListener("mouseleave", resume);

    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) loop.play();
      else loop.pause();
    });
    io.observe(root);

    return () => {
      io.disconnect();
      root.removeEventListener("mouseenter", slow);
      root.removeEventListener("mouseleave", resume);
      loop.kill();
      gsap.set(track, { clearProps: "transform" });
    };
  }, [dir, duration, reverse]);

  return (
    <div ref={rootRef} className={`marquee ${className}`}>
      <div ref={trackRef} className={`marquee-track ${trackClassName}`}>
        <div className="marquee-item">{children}</div>
        <div className="marquee-item" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
