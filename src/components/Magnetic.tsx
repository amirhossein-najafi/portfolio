"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

function canHover() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function setFillOrigin(node: HTMLDivElement, e: MouseEvent<HTMLDivElement>) {
  const target = node.firstElementChild as HTMLElement | null;
  if (!target) return;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--fx", `${e.clientX - rect.left}px`);
  target.style.setProperty("--fy", `${e.clientY - rect.top}px`);
}

export function Magnetic({ children, className = "", strength = 28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !canHover()) return;

    const onLeave = () => {
      node.style.transform = "translate3d(0,0,0)";
    };

    node.addEventListener("mouseleave", onLeave);
    return () => node.removeEventListener("mouseleave", onLeave);
  }, []);

  const onEnter = (e: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || !canHover()) return;
    setFillOrigin(node, e);
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || !canHover()) return;

    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate3d(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px, 0)`;
  };

  const onLeave = (e: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || !canHover()) return;
    setFillOrigin(node, e);
  };

  return (
    <div
      ref={ref}
      className={`magnetic inline-flex transition-transform duration-300 ease-out will-change-transform ${className}`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
