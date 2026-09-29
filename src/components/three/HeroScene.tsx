"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
import { MathUtils, type Group, type Mesh } from "three";

type HeroSceneProps = {
  progress: RefObject<number>;
  side: 1 | -1;
};

export function HeroScene({ progress, side }: HeroSceneProps) {
  const rig = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  const ringInner = useRef<Mesh>(null);
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
      g.rotation.y = MathUtils.damp(g.rotation.y, x * 0.45, 3, delta);
      g.rotation.x = MathUtils.damp(g.rotation.x, y * 0.3, 3, delta);
      const s = MathUtils.damp(g.scale.x, 1 - p * 0.4, 4, delta);
      g.scale.setScalar(s);
      g.position.y = MathUtils.damp(g.position.y, p * 1.6, 4, delta);
    }

    if (ring.current) ring.current.rotation.z += delta * 0.12;
    if (ringInner.current) ringInner.current.rotation.z -= delta * 0.08;

    state.camera.position.x = MathUtils.damp(state.camera.position.x, x * 0.35, 2, delta);
    state.camera.position.y = MathUtils.damp(state.camera.position.y, -y * 0.25, 2, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} color="#f5e0b0" />
      <directionalLight position={[4, 5, 5]} intensity={1.4} color="#f5e0b0" />
      <pointLight position={[-4, -2, 3]} intensity={6} color="#3a7a64" distance={12} />

      <group ref={rig} position={[side * 1.6, 0.05, 0]}>
        <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.7}>
          <mesh>
            <icosahedronGeometry args={[1.15, 64]} />
            <MeshDistortMaterial
              color="#e4c078"
              metalness={0.95}
              roughness={0.22}
              distort={0.36}
              speed={1.5}
              envMapIntensity={1.6}
            />
          </mesh>
        </Float>

        <mesh ref={ring} rotation={[Math.PI / 2.3, 0.2, 0]}>
          <torusGeometry args={[2.1, 0.006, 16, 256]} />
          <meshBasicMaterial color="#e4c078" transparent opacity={0.45} />
        </mesh>
        <mesh ref={ringInner} rotation={[Math.PI / 1.8, -0.35, 0]}>
          <torusGeometry args={[1.7, 0.004, 16, 256]} />
          <meshBasicMaterial color="#3a7a64" transparent opacity={0.4} />
        </mesh>
      </group>

      <Sparkles
        count={80}
        scale={[12, 7, 5]}
        size={2.2}
        speed={0.25}
        opacity={0.55}
        color="#e4c078"
      />

      {/* Warm studio: the metal reflects these, so they define its colour */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={4}
          color="#f5e0b0"
          position={[0, 5, -2]}
          rotation-x={Math.PI / 2}
          scale={[12, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          color="#e4c078"
          position={[-5, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[4, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#c9a45e"
          position={[5, -1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[4, 8, 1]}
        />
        <Lightformer form="ring" intensity={3} color="#fff6e0" position={[3, 2, 4]} scale={2.2} />
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#3a7a64"
          position={[0, -4, 2]}
          rotation-x={-Math.PI / 2}
          scale={[10, 2, 1]}
        />
      </Environment>
    </>
  );
}
