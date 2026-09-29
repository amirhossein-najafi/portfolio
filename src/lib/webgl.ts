import { prefersReducedMotion } from "@/lib/motion";

export function supportsWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function isLowPowerDevice() {
  if (typeof navigator === "undefined") return true;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return cores <= 4 || (memory !== undefined && memory <= 4);
}

export function canRenderHeroScene() {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  if (window.innerWidth < 1024) return false;
  if (isLowPowerDevice()) return false;
  return supportsWebGL();
}
