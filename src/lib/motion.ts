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

export function splitWords(text: string) {
  return text.split(/(\s+)/).filter((part) => part.length > 0);
}

export { gsap };
