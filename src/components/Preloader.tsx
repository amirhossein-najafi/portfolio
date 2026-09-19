"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

type PreloaderProps = {
  onDone?: () => void;
};

export function Preloader({ onDone }: PreloaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(false);
      onDone?.();
      return;
    }

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    lenis?.stop();
    document.documentElement.classList.add("is-loading");

    const progress = { value: 0 };
    const bar = document.querySelector(".preloader-bar") as HTMLElement | null;
    const mark = document.querySelector(".preloader-mark") as HTMLElement | null;
    const root = document.querySelector(".preloader") as HTMLElement | null;

    const tl = gsap.timeline({
      onComplete: () => {
        lenis?.start();
        document.documentElement.classList.remove("is-loading");
        setVisible(false);
        onDone?.();
      },
    });

    tl.fromTo(
      mark,
      { opacity: 0, y: 16, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
      0,
    )
      .to(
        progress,
        {
          value: 100,
          duration: 1.05,
          ease: "power2.inOut",
          onUpdate: () => {
            if (bar) bar.style.width = `${progress.value}%`;
          },
        },
        0.15,
      )
      .to(root, { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, "+=0.12");

    return () => {
      tl.kill();
      lenis?.start();
      document.documentElement.classList.remove("is-loading");
    };
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070a]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(58,122,100,0.22), transparent 50%), radial-gradient(circle at 50% 70%, rgba(228,192,120,0.1), transparent 45%)",
        }}
        aria-hidden
      />
      <div className="preloader-mark relative mb-10 flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#10151c_0%,#1a3d32_125%)] shadow-[0_16px_48px_rgba(0,0,0,0.55),0_0_40px_rgba(228,192,120,0.12)] ring-1 ring-white/10">
          <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden>
            <path
              d="M7 32 16.2 8h2.6L28 32h-3.1l-1.55-4.2h-9.7L12.1 32H7Zm6.35-6.9h7.3L17.5 14.6 13.35 25.1Z"
              fill="#f5f1e8"
            />
            <path d="M21.2 8h3.05v9.6L32.4 32h-3.35L21.2 18.4V8Z" fill="#e4c078" />
            <path d="M29.4 8H32.5v24H29.4V8Z" fill="#e4c078" />
          </svg>
        </div>
        <p className="text-xs font-bold tracking-[0.28em] text-[var(--ink-muted)] uppercase">
          Amirhossein Najafi
        </p>
      </div>
      <div className="relative h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
        <div className="preloader-bar h-full w-0 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-bright)]" />
      </div>
    </div>
  );
}
