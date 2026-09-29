"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { MathUtils, type Group, type Mesh } from "three";

type HeroSceneProps = {
  progress: RefObject<number>;
  side: 1 | -1;
};

type Ring = {
  radius: number;
  tube: number;
  color: string;
  opacity: number;
  tilt: [number, number, number];
  speed: number;
};

const RINGS: Ring[] = [
  { radius: 2.15, tube: 0.005, color: "#e4c078", opacity: 0.5, tilt: [Math.PI / 2.3, 0.2, 0], speed: 0.1 },
  { radius: 1.8, tube: 0.004, color: "#e4c078", opacity: 0.28, tilt: [Math.PI / 1.8, -0.35, 0], speed: -0.07 },
  { radius: 2.5, tube: 0.003, color: "#3a7a64", opacity: 0.35, tilt: [Math.PI / 2.1, 0.55, 0.2], speed: 0.05 },
];

export function HeroScene({ progress, side }: HeroSceneProps) {
  const rig = useRef<Group>(null);
  const rings = useRef<(Mesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    const { x, y } = pointer.current;
    const g = rig.current;

    if (g) {
      g.rotation.y = MathUtils.damp(g.rotation.y, x * 0.35, 3, delta);
      g.rotation.x = MathUtils.damp(g.rotation.x, y * 0.25, 3, delta);
      g.scale.setScalar(MathUtils.damp(g.scale.x, 1 - p * 0.3, 4, delta));
      g.position.y = MathUtils.damp(g.position.y, p * 1.2, 4, delta);
    }

    rings.current.forEach((ring, i) => {
      if (ring) ring.rotation.z += delta * RINGS[i].speed;
    });

    state.camera.position.x = MathUtils.damp(state.camera.position.x, x * 0.25, 2, delta);
    state.camera.position.y = MathUtils.damp(state.camera.position.y, -y * 0.18, 2, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <group ref={rig} position={[side * 1.9, 0, 0]}>
        {RINGS.map((ring, i) => (
          <mesh
            key={i}
            ref={(el) => {
              rings.current[i] = el;
            }}
            rotation={ring.tilt}
          >
            <torusGeometry args={[ring.radius, ring.tube, 16, 256]} />
            <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
          </mesh>
        ))}
      </group>

      <Sparkles count={60} scale={[12, 7, 4]} size={1.8} speed={0.2} opacity={0.4} color="#e4c078" />
    </>
  );
}
