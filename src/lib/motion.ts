import gsap from "gsap";

export const motion = {
  ease: "power3.out",
  easeSoft: "power2.out",
  duration: {
    fast: 0.45,
    base: 0.85,
    slow: 1.15,
    reveal: 1.05,
  },
  stagger: {
    tight: 0.04,
    base: 0.08,
    loose: 0.12,
  },
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function revealFrom(y = 40) {
  return {
    opacity: 0,
    y,
    filter: "blur(6px)",
  };
}

export function revealTo(delay = 0) {
  return {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: motion.duration.reveal,
    delay,
    ease: motion.ease,
  };
}

/**
 * Safety net for iOS Safari + Lenis, where ScrollTrigger occasionally misses:
 * once `el` is actually on screen, play `tween` if it still has not started.
 */
export function playWhenVisible(el: Element, tween: gsap.core.Animation, delay = 900) {
  if (typeof IntersectionObserver === "undefined") {
    tween.play();
    return () => {};
  }
  let timer = 0;
  const io = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return;
    io.disconnect();
    timer = window.setTimeout(() => {
      if (tween.progress() === 0) tween.play();
    }, delay);
  });
  io.observe(el);
  return () => {
    io.disconnect();
    window.clearTimeout(timer);
  };
}

export const PRELOADER_DONE = "preloader:done";

export function markPreloaderDone() {
  if (typeof window === "undefined") return;
  (window as unknown as { __preloaderDone?: boolean }).__preloaderDone = true;
  window.dispatchEvent(new Event(PRELOADER_DONE));
}

export function onPreloaderDone(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  if ((window as unknown as { __preloaderDone?: boolean }).__preloaderDone) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(PRELOADER_DONE, handler, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE, handler);
}

export function splitWords(text: string) {
  return text.split(/(\s+)/).filter((part) => part.length > 0);
}

export { gsap };
