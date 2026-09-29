"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/Magnetic";
import { activeSocials, profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { isFinePointer, motion, onPreloaderDone, prefersReducedMotion } from "@/lib/motion";
import { canRenderHeroScene } from "@/lib/webgl";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

type SceneMode = "pending" | "webgl" | "orb";

function NameLine({ text, split, className = "" }: { text: string; split: boolean; className?: string }) {
  return (
    <span className={`block overflow-hidden py-[0.1em] ${className}`}>
      {split ? (
        <span className="inline-block" aria-label={text}>
          {Array.from(text).map((char, i) => (
            <span key={`${char}-${i}`} className="hero-char inline-block will-change-transform" aria-hidden>
              {char}
            </span>
          ))}
        </span>
      ) : (
        <span className="hero-char inline-block will-change-transform">{text}</span>
      )}
    </span>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [sceneMode, setSceneMode] = useState<SceneMode>("pending");
  const [inView, setInView] = useState(true);
  const socials = activeSocials();
  const { t, locale, dir } = useLanguage();
  const splitName = locale !== "fa";

  useEffect(
    () => onPreloaderDone(() => setSceneMode(canRenderHeroScene() ? "webgl" : "orb")),
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    let fallbackId = 0;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: motion.ease } });
      tl.from(".hero-char", { yPercent: 115, rotate: 6, duration: 1.1, stagger: 0.035 }, 0)
        .from(".hero-underline", { scaleX: 0, duration: 1.1, ease: "power4.inOut" }, 0.45)
        .from(".hero-fade", { opacity: 0, y: 28, duration: 0.9, stagger: 0.07 }, 0.35)
        .from(".hero-portrait", { opacity: 0, y: 60, scale: 0.92, duration: 1.3 }, 0.2)
        .from(".hero-portrait-glow", { opacity: 0, scale: 0.8, duration: 1.4 }, 0.35)
        .from(".scroll-cue", { opacity: 0, y: 16, duration: 0.8 }, 0.9);

      const play = () => {
        window.clearTimeout(fallbackId);
        tl.play();
      };
      const offDone = onPreloaderDone(play);
      fallbackId = window.setTimeout(play, 4500);

      gsap.to(".hero-portrait", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(".hero-copy", {
        yPercent: -14,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      return () => offDone();
    }, root);

    return () => {
      window.clearTimeout(fallbackId);
      ctx.revert();
    };
  }, []);

  const firstLocaleRun = useRef(true);
  useEffect(() => {
    if (firstLocaleRun.current) {
      firstLocaleRun.current = false;
      return;
    }
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const chars = root.querySelectorAll(".hero-char");
    gsap.fromTo(
      chars,
      { yPercent: 40, opacity: 0.4 },
      { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.02, ease: motion.easeSoft },
    );
  }, [locale]);

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait || !isFinePointer() || prefersReducedMotion()) return;

    const onMove = (e: MouseEvent) => {
      const rect = portrait.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(portrait, {
        rotateY: x * 8,
        rotateX: -y * 8,
        transformPerspective: 900,
        duration: 0.55,
        ease: motion.easeSoft,
      });
    };

    const onLeave = () => {
      gsap.to(portrait, { rotateX: 0, rotateY: 0, duration: 0.7, ease: motion.ease });
    };

    portrait.addEventListener("mousemove", onMove);
    portrait.addEventListener("mouseleave", onLeave);
    return () => {
      portrait.removeEventListener("mousemove", onMove);
      portrait.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 md:pt-32 md:pb-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(780px 480px at 92% 12%, rgba(58,122,100,0.32), transparent 58%), radial-gradient(520px 400px at 5% 85%, rgba(228,192,120,0.14), transparent 52%), radial-gradient(900px 500px at 40% 100%, rgba(0,0,0,0.45), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {sceneMode === "webgl" ? (
          <HeroCanvas progress={progressRef} side={dir === "rtl" ? -1 : 1} active={inView} />
        ) : null}
        {sceneMode === "orb" ? (
          <div className="hero-orb-wrap">
            <div className="hero-orb" />
            <div className="hero-orb hero-orb--green" />
          </div>
        ) : null}
      </div>

      <div className="hero-grid-lines pointer-events-none absolute inset-0 z-0" aria-hidden />

      <div className="container relative z-10 grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div className="hero-copy">
          <p className="hero-fade section-label !mb-5">
            {t.title} · {t.location}
          </p>

          <h1
            className={`display text-[clamp(3.1rem,9.5vw,6.8rem)] font-semibold leading-[1.02] text-[var(--ink)] ${
              locale === "fa" ? "max-w-[12ch]" : "max-w-[10ch]"
            }`}
          >
            <NameLine text={t.firstName} split={splitName} />
            <NameLine text={t.lastName} split={splitName} className="hero-name-accent" />
          </h1>

          <span
            className="hero-underline mt-3 block h-px w-28 origin-left bg-gradient-to-r from-[var(--gold)] to-transparent rtl:origin-right rtl:bg-gradient-to-l"
            aria-hidden
          />

          <p className="hero-fade mt-5 text-sm font-semibold tracking-[0.14em] text-[var(--gold)] uppercase md:text-base md:tracking-[0.18em]">
            {t.signature}
          </p>

          <p className="hero-fade mt-6 max-w-lg text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">
            {t.tagline}
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <Magnetic strength={36}>
              <a href="#projects" className="btn btn-accent">
                <span className="btn-label">{t.ui.viewWork}</span>
              </a>
            </Magnetic>
            <Magnetic strength={36}>
              <a href={profile.cvPath} download className="btn btn-primary">
                <span className="btn-label">{t.ui.downloadCv}</span>
              </a>
            </Magnetic>
          </div>

          {socials.length > 0 ? (
            <div className="hero-fade mt-8 flex flex-wrap gap-5 text-sm font-medium text-[var(--ink-muted)]">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic link-underline transition hover:text-[var(--ink)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:mx-0 lg:max-w-[380px] lg:justify-self-end">
          <div
            className="hero-portrait-glow absolute -inset-12 -z-10 rounded-[2rem] blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 35% 25%, rgba(228,192,120,0.38), transparent 55%), radial-gradient(circle at 75% 85%, rgba(58,122,100,0.5), transparent 52%)",
            }}
            aria-hidden
          />
          <div
            ref={portraitRef}
            className="hero-portrait portrait-frame will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={profile.photo}
                alt={locale === "fa" ? profile.photoAlt.fa : profile.photoAlt.en}
                title={locale === "fa" ? profile.photoAlt.fa : profile.photoAlt.en}
                fill
                priority
                className="object-cover object-center contrast-[1.05] saturate-[0.92]"
                sizes="(max-width: 1024px) 340px, 380px"
              />
            </div>
            <span className="portrait-corner portrait-corner--tl" aria-hidden />
            <span className="portrait-corner portrait-corner--br" aria-hidden />
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="scroll-cue absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:flex"
        aria-label={t.nav[0]?.label ?? "About"}
      >
        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
      </a>
    </section>
  );
}
