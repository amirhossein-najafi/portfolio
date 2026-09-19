"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/Magnetic";
import { activeSocials, profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { isFinePointer, motion, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const socials = activeSocials();
  const { t, locale } = useLanguage();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: motion.ease } });
      tl.from(".hero-line", { yPercent: 110, duration: 1.15, stagger: 0.1 }, 0.15)
        .from(
          ".hero-fade",
          { opacity: 0, y: 28, duration: 0.9, stagger: 0.07 },
          0.4,
        )
        .from(
          ".hero-portrait",
          { opacity: 0, y: 52, scale: 0.94, duration: 1.25 },
          0.25,
        )
        .from(".hero-portrait-glow", { opacity: 0, scale: 0.85, duration: 1.3 }, 0.4);

      gsap.to(".hero-portrait", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const lines = root.querySelectorAll(".hero-line");
    gsap.fromTo(
      lines,
      { yPercent: 30, opacity: 0.45 },
      { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: motion.easeSoft },
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
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(780px 480px at 92% 12%, rgba(58,122,100,0.32), transparent 58%), radial-gradient(520px 400px at 5% 85%, rgba(228,192,120,0.14), transparent 52%), radial-gradient(900px 500px at 40% 100%, rgba(0,0,0,0.45), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10 grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <p className="hero-fade section-label !mb-5">
            {t.title} · {t.location}
          </p>

          <h1
            className={`display text-[clamp(3rem,9vw,6.2rem)] font-semibold leading-[1.02] text-[var(--ink)] ${
              locale === "fa" ? "max-w-[12ch]" : "max-w-[10ch]"
            }`}
          >
            <span className="block overflow-hidden py-[0.1em]">
              <span className="hero-line inline-block will-change-transform">{t.firstName}</span>
            </span>
            <span className="block overflow-hidden py-[0.1em]">
              <span className="hero-line inline-block text-[var(--gold)] will-change-transform">
                {t.lastName}
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-4 text-sm font-semibold tracking-[0.14em] text-[var(--gold)] uppercase md:text-base md:tracking-[0.18em]">
            {t.signature}
          </p>

          <p className="hero-fade mt-6 max-w-lg text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">
            {t.tagline}
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <Magnetic strength={36}>
              <a href="#projects" className="btn btn-accent">
                {t.ui.viewWork}
              </a>
            </Magnetic>
            <Magnetic strength={36}>
              <a href={profile.cvPath} download className="btn btn-primary">
                {t.ui.downloadCv}
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
                  className="magnetic underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
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
          </div>
        </div>
      </div>
    </section>
  );
}
