"use client";

import { Suspense, useState, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "@/components/three/HeroScene";

type HeroCanvasProps = {
  progress: RefObject<number>;
  side: 1 | -1;
  active: boolean;
};

export default function HeroCanvas({ progress, side, active }: HeroCanvasProps) {
  const [ready, setReady] = useState(false);
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
        onCreated={() => setReady(true)}
      >
        <Suspense fallback={null}>
          <HeroScene progress={progress} side={side} />
        </Suspense>
      </Canvas>
    </div>
  );
}
