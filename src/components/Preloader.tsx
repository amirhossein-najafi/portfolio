"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "@/data/profile";
import { markPreloaderDone, prefersReducedMotion } from "@/lib/motion";

type LenisLike = { stop: () => void; start: () => void };

const getLenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => {
        setVisible(false);
        markPreloaderDone();
      });
      return () => cancelAnimationFrame(id);
    }

    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("is-loading");

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          getLenis()?.start();
          document.documentElement.classList.remove("is-loading");
          setVisible(false);
        },
      });

      // Inside the timeline so it always runs before onComplete's start(), even if the
      // first tick jumps straight to the end on a slow frame.
      tl.call(() => getLenis()?.stop(), [], 0).from(".preloader-letter", {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.025,
        ease: "power4.out",
      })
        .from(".preloader-mark", { scale: 0.6, opacity: 0, duration: 0.7, ease: "back.out(1.6)" }, 0)
        .to(
          counter,
          {
            value: 100,
            duration: 1.4,
            ease: "power2.inOut",
            onUpdate: () => {
              const v = Math.round(counter.value);
              if (countRef.current) countRef.current.textContent = String(v).padStart(3, "0");
              root.style.setProperty("--load", `${v}%`);
            },
          },
          0.1,
        )
        .to(".preloader-inner", { yPercent: -30, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.15")
        .add(() => markPreloaderDone(), "-=0.2")
        .to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "power4.inOut" }, "-=0.25");
    }, root);

    return () => {
      ctx.revert();
      getLenis()?.start();
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070a]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(58,122,100,0.22), transparent 50%), radial-gradient(circle at 50% 70%, rgba(228,192,120,0.1), transparent 45%)",
        }}
      />

      <div className="preloader-inner relative flex flex-col items-center gap-8">
        <div className="preloader-mark flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#10151c_0%,#1a3d32_125%)] shadow-[0_16px_48px_rgba(0,0,0,0.55),0_0_60px_rgba(228,192,120,0.18)] ring-1 ring-white/10">
          <svg viewBox="0 0 40 40" className="h-8 w-8">
            <path
              d="M7 32 16.2 8h2.6L28 32h-3.1l-1.55-4.2h-9.7L12.1 32H7Zm6.35-6.9h7.3L17.5 14.6 13.35 25.1Z"
              fill="#f5f1e8"
            />
            <path d="M21.2 8h3.05v9.6L32.4 32h-3.35L21.2 18.4V8Z" fill="#e4c078" />
            <path d="M29.4 8H32.5v24H29.4V8Z" fill="#e4c078" />
          </svg>
        </div>

        <p className="display flex overflow-hidden text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl" dir="ltr">
          {Array.from(profile.name).map((char, i) => (
            <span key={`${char}-${i}`} className="preloader-letter inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </p>

        <div className="flex w-56 items-center gap-4" dir="ltr">
          <div className="relative h-px flex-1 overflow-hidden bg-white/10">
            <div className="preloader-bar absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-bright)]" />
          </div>
          <span
            ref={countRef}
            className="w-10 text-end font-mono text-xs tabular-nums tracking-widest text-[var(--gold)]"
          >
            000
          </span>
        </div>
      </div>
    </div>
  );
}
