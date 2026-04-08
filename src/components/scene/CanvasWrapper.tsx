"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import BallMesh from "./BallMesh";
import SceneLights from "./SceneLights";
import { OrbitControls } from "@react-three/drei";

type Props = {
  accent: string;
  size?: "normal" | "large";
  animationTrigger?: number;
  continuousSpin?: boolean;
  initialRotationX?: number;
  initialRotationY?: number;
};

export default function CanvasWrapper({
  accent,
  size = "normal",
  animationTrigger = 0,
  continuousSpin = false,
  initialRotationX = 0,
  initialRotationY = 0,
}: Props) {
  const cameraZ = size === "large" ? 2.5 : 4;

  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov: 45 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      shadows
    >
      <Suspense fallback={null}>
        <SceneLights />

        <BallMesh
          accent={accent}
          isAnimating={true}
          animationTrigger={animationTrigger}
          size={size}
          continuousSpin={continuousSpin}
          initialRotationX={initialRotationX}
          initialRotationY={initialRotationY}
        />

        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.65}
          minDistance={cameraZ}
          maxDistance={cameraZ}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
}