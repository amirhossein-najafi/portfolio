"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const GRADIENTS = [
  "linear-gradient(145deg,#0a1210 0%,#1a3d32 42%,#3a7a64 78%,#c9a45e 130%)",
  "linear-gradient(160deg,#080b0f 0%,#121c24 45%,#2a4a55 85%,#e4c078 140%)",
  "linear-gradient(150deg,#060a08 0%,#0e1a16 40%,#1a3d32 70%,#8b6b3a 125%)",
  "linear-gradient(155deg,#0a0806 0%,#1a1510 48%,#2a2114 75%,#3a7a64 130%)",
];

export function Projects() {
  const { t, locale } = useLanguage();
  const items = t.projects.items;
  const pinRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion()) return;
    const pin = pinRef.current;
    if (!pin) return;

    const total = items.length;
    let busy = false;
    const getLenis = () =>
      (window as unknown as { __lenis?: { stop: () => void; start: () => void; scrollTo: (v: number) => void } })
        .__lenis;

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * 0.5)}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        getLenis()?.stop();
        activeRef.current = 0;
        setActive(0);
      },
      onEnterBack: () => {
        getLenis()?.stop();
        activeRef.current = total - 1;
        setActive(total - 1);
      },
      onLeave: () => {
        getLenis()?.start();
      },
      onLeaveBack: () => {
        getLenis()?.start();
      },
    });

    const goTo = (next: number) => {
      if (busy) return;
      if (next < 0 || next >= total) return;
      busy = true;
      activeRef.current = next;
      setActive(next);
      window.setTimeout(() => {
        busy = false;
      }, 420);
    };

    const onWheel = (e: WheelEvent) => {
      if (!st.isActive) return;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;
      const atFirst = activeRef.current === 0;
      const atLast = activeRef.current === total - 1;

      if (goingDown && atLast) {
        getLenis()?.start();
        return;
      }
      if (goingUp && atFirst) {
        getLenis()?.start();
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (Math.abs(e.deltaY) < 10 || busy) return;

      if (goingDown) goTo(activeRef.current + 1);
      else if (goingUp) goTo(activeRef.current - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      getLenis()?.start();
      st.kill();
    };
  }, [isDesktop, items.length, locale]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const panel = pinRef.current?.querySelector(".project-visual-active");
    if (!panel) return;
    gsap.fromTo(
      panel,
      { opacity: 0.35, y: 18 },
      { opacity: 1, y: 0, duration: motion.duration.fast, ease: motion.easeSoft },
    );
  }, [active]);

  return (
    <section id="projects" className="relative">
      {isDesktop ? (
        <div
          ref={pinRef}
          className="container flex min-h-[100svh] flex-col justify-center gap-8 py-20 lg:flex"
        >
          <div>
            <p className="section-label">{t.projects.label}</p>
            <h2 className="section-title !mb-3">{t.projects.title}</h2>
            <p className="section-lead">{t.projects.lead}</p>
          </div>

          <div className="grid w-full grid-cols-[0.95fr_1.05fr] items-center gap-10 xl:gap-14">
            <ol className="space-y-0">
              {items.map((project, i) => (
                <li key={project.title}>
                  <button
                    type="button"
                    className={`group flex w-full items-baseline gap-4 border-b border-[var(--line)] py-3.5 text-start transition xl:py-4 ${
                      i === active ? "opacity-100" : "opacity-35 hover:opacity-65"
                    }`}
                    onClick={() => {
                      activeRef.current = i;
                      setActive(i);
                    }}
                  >
                    <span className="shrink-0 text-xs font-bold tracking-[0.16em] text-[var(--gold)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`display text-xl font-semibold tracking-tight transition xl:text-2xl ${
                        i === active ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"
                      }`}
                    >
                      {project.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="relative">
              <div
                key={items[active]?.title}
                className="project-visual-active relative overflow-hidden rounded-[1.5rem] border border-[var(--line-strong)] shadow-[0_40px_100px_rgba(0,0,0,0.55),0_0_60px_rgba(228,192,120,0.06)]"
              >
                <div
                  className="flex min-h-[20rem] flex-col justify-between p-7 xl:min-h-[22rem] xl:p-8"
                  style={{ background: GRADIENTS[active % GRADIENTS.length] }}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">
                        {items[active]?.year}
                      </p>
                      {items[active]?.badge ? (
                        <span className="rounded-full bg-[var(--gold)] px-2.5 py-0.5 text-[0.65rem] font-bold tracking-wide text-[#14100a] uppercase shadow-[0_0_20px_rgba(228,192,120,0.35)]">
                          {items[active].badge}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="display mt-3 max-w-[16ch] text-3xl font-semibold text-white xl:text-4xl">
                      {items[active]?.title}
                    </h3>
                  </div>
                  <div>
                    <p className="max-w-md text-sm leading-relaxed text-white/80">
                      {items[active]?.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {items[active]?.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-4">
                      {items[active]?.demoUrl ? (
                        <a
                          href={items[active].demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-[var(--gold-bright)] underline-offset-4 hover:underline"
                        >
                          {t.ui.visitLive} →
                        </a>
                      ) : null}
                      {items[active]?.repoUrl ? (
                        <a
                          href={items[active].repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-white underline-offset-4 hover:underline"
                        >
                          {t.ui.code}
                        </a>
                      ) : null}
                      {!items[active]?.demoUrl && !items[active]?.repoUrl ? (
                        <span className="text-sm text-white/50">{t.ui.privateUpcoming}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs font-medium tracking-wide text-[var(--ink-muted)]">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="section container lg:hidden">
        <Reveal>
          <p className="section-label">{t.projects.label}</p>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-lead">{t.projects.lead}</p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {items.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.05}>
              <article className="overflow-hidden rounded-[1.25rem] border border-[var(--line)]">
                <div
                  className="aspect-[16/10] p-6"
                  style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-bold tracking-[0.16em] text-white/60">{project.year}</p>
                    {project.badge ? (
                      <span className="rounded-full bg-[#e8c47a] px-2 py-0.5 text-[0.65rem] font-bold text-[#1a1408]">
                        {project.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="display mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                </div>
                <div className="bg-[var(--panel)] p-6">
                  <p className="leading-relaxed text-[var(--ink-muted)]">{project.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--gold)]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-4">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[var(--gold)] underline-offset-4 hover:underline"
                      >
                        {t.ui.visitLive} →
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
                      >
                        {t.ui.code}
                      </a>
                    ) : null}
                    {!project.demoUrl && !project.repoUrl ? (
                      <span className="text-sm text-[var(--ink-muted)]">{t.ui.privateUpcoming}</span>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
