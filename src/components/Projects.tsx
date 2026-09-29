"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

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
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const prevActiveRef = useRef(0);
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
    const stage = stageRef.current;
    const forward = active >= prevActiveRef.current;
    prevActiveRef.current = active;
    if (!stage || prefersReducedMotion()) return;

    const card = stage.querySelector(".project-card");
    if (!card) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        card,
        { clipPath: forward ? "inset(100% 0% 0% 0% round 1.75rem)" : "inset(0% 0% 100% 0% round 1.75rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", duration: 0.9, ease: "power4.inOut" },
      )
        .fromTo(
          card.querySelectorAll(".pc-anim"),
          { opacity: 0, y: forward ? 30 : -30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
          0.3,
        )
        .fromTo(
          ".project-index-digit",
          { yPercent: forward ? 100 : -100 },
          { yPercent: 0, duration: 0.8 },
          0.1,
        );
    }, stage);

    return () => ctx.revert();
  }, [active]);

  const onStageMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const card = stageRef.current?.querySelector<HTMLElement>(".project-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    card.style.setProperty("--gx", `${x * 100}%`);
    card.style.setProperty("--gy", `${y * 100}%`);
    gsap.to(card, {
      rotateY: (x - 0.5) * 10,
      rotateX: -(y - 0.5) * 8,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const onStageLeave = () => {
    const card = stageRef.current?.querySelector<HTMLElement>(".project-card");
    if (!card) return;
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "power3.out" });
  };

  const current = items[active];

  return (
    <section id="projects" className="relative">
      {isDesktop ? (
        <div
          ref={pinRef}
          className="container relative z-[1] flex min-h-[100svh] flex-col justify-center gap-10 py-20 lg:flex"
        >
          <div className="flex items-end justify-between gap-10">
            <div>
              <p className="section-label">{t.projects.label}</p>
              <SplitReveal text={t.projects.title} as="h2" className="section-title !mb-3" />
              <p className="section-lead">{t.projects.lead}</p>
            </div>
            <div className="project-index-big flex shrink-0 items-start text-[clamp(5rem,9vw,8rem)] text-[var(--gold)]" dir="ltr">
              <span className="inline-block overflow-hidden">
                <span className="project-index-digit inline-block">
                  {String(active + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="ms-2 mt-3 text-lg tracking-normal text-[var(--ink-muted)]">
                / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="grid w-full grid-cols-[0.9fr_1.1fr] items-center gap-10 xl:gap-16">
            <div className="flex gap-6">
              <div className="relative w-px shrink-0 self-stretch bg-[var(--line-strong)]" aria-hidden>
                <span
                  className="absolute inset-x-0 top-0 bg-[var(--gold)] shadow-[0_0_12px_rgba(228,192,120,0.6)] transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ height: `${((active + 1) / items.length) * 100}%` }}
                />
              </div>
              <ol className="flex-1">
                {items.map((project, i) => (
                  <li key={project.title}>
                    <button
                      type="button"
                      className={`group flex w-full items-baseline gap-4 border-b border-[var(--line)] py-4 text-start transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:py-5 ${
                        i === active ? "ps-3 opacity-100" : "opacity-35 hover:ps-1.5 hover:opacity-70"
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
                        className={`display text-xl font-semibold tracking-tight transition-colors xl:text-[1.7rem] ${
                          i === active ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"
                        }`}
                      >
                        {project.title}
                      </span>
                      {project.badge ? (
                        <span className="ms-auto rounded-full border border-[var(--gold-soft)] px-2 py-0.5 text-[0.6rem] font-bold tracking-wide text-[var(--gold)] uppercase">
                          {project.badge}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div
              ref={stageRef}
              className="project-stage relative"
              onMouseMove={onStageMove}
              onMouseLeave={onStageLeave}
            >
              <div
                key={current?.title}
                className="project-card relative overflow-hidden rounded-[1.75rem] border border-[var(--line-strong)] shadow-[0_50px_120px_rgba(0,0,0,0.6),0_0_80px_rgba(228,192,120,0.08)]"
              >
                <div
                  className="project-card-bg"
                  style={{ backgroundImage: GRADIENTS[active % GRADIENTS.length] }}
                  aria-hidden
                />
                <div className="project-card-noise" aria-hidden />
                <div className="project-card-glare" aria-hidden />

                <div className="relative flex min-h-[22rem] flex-col justify-between p-8 xl:min-h-[25rem] xl:p-10">
                  <div>
                    <div className="pc-anim flex flex-wrap items-center gap-3">
                      <p className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">{current?.year}</p>
                      {current?.badge ? (
                        <span className="rounded-full bg-[var(--gold)] px-2.5 py-0.5 text-[0.65rem] font-bold tracking-wide text-[#14100a] uppercase shadow-[0_0_20px_rgba(228,192,120,0.35)]">
                          {current.badge}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="pc-anim display mt-4 max-w-[16ch] text-4xl font-semibold text-white xl:text-5xl">
                      {current?.title}
                    </h3>
                  </div>
                  <div>
                    <p className="pc-anim max-w-md text-sm leading-relaxed text-white/80 xl:text-base">
                      {current?.description}
                    </p>
                    <ul className="pc-anim mt-5 flex flex-wrap gap-2">
                      {current?.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <div className="pc-anim mt-7 flex flex-wrap gap-5">
                      {current?.demoUrl ? (
                        <a
                          href={current.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-sm font-bold text-[var(--gold-bright)]"
                        >
                          {t.ui.visitLive} <span className="inline-block rtl:-scale-x-100">→</span>
                        </a>
                      ) : null}
                      {current?.repoUrl ? (
                        <a
                          href={current.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-sm font-bold text-white"
                        >
                          {t.ui.code}
                        </a>
                      ) : null}
                      {!current?.demoUrl && !current?.repoUrl ? (
                        <span className="text-sm text-white/50">{t.ui.privateUpcoming}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
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
              <article className="overflow-hidden rounded-[1.5rem] border border-[var(--line-strong)] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-[16/10] overflow-hidden p-6">
                  <div
                    className="project-card-bg"
                    style={{ backgroundImage: GRADIENTS[i % GRADIENTS.length] }}
                    aria-hidden
                  />
                  <div className="project-card-noise" aria-hidden />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-bold tracking-[0.16em] text-white/60">{project.year}</p>
                      {project.badge ? (
                        <span className="rounded-full bg-[var(--gold)] px-2 py-0.5 text-[0.65rem] font-bold text-[#14100a]">
                          {project.badge}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="display text-3xl font-semibold text-white">{project.title}</h3>
                      <span className="project-index-big text-5xl text-white/25" dir="ltr">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
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
                        className="link-underline text-sm font-semibold text-[var(--gold)]"
                      >
                        {t.ui.visitLive} <span className="inline-block rtl:-scale-x-100">→</span>
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-sm font-semibold text-[var(--ink)]"
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
