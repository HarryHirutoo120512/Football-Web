"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform vec3 uAccentColor;
  uniform float uTime;

  vec3 uvToSphere(vec2 uv) {
    float phi = uv.y * 3.14159;
    float theta = uv.x * 6.28318;
    return vec3(
      sin(phi) * cos(theta),
      cos(phi),
      sin(phi) * sin(theta)
    );
  }

  float soccerPanel(vec3 p) {
    vec3 np = normalize(p);
    float a = abs(dot(np, vec3(1.0, 0.0, 0.0)));
    float b = abs(dot(np, vec3(0.0, 1.0, 0.0)));
    float c = abs(dot(np, vec3(0.0, 0.0, 1.0)));
    float d = abs(dot(np, normalize(vec3(1.0, 1.0, 0.0))));
    float e = abs(dot(np, normalize(vec3(1.0, 0.0, 1.0))));
    float f = abs(dot(np, normalize(vec3(0.0, 1.0, 1.0))));
    float g = abs(dot(np, normalize(vec3(1.0, 1.0, 1.0))));

    float seam = min(min(min(a, b), min(c, d)), min(min(e, f), g));
    return smoothstep(0.018, 0.088, seam);
  }

  void main() {
    vec3 light1 = normalize(vec3(2.0, 3.0, 4.0));
    vec3 light2 = normalize(vec3(-1.0, -1.0, 2.0));

    float diff1 = max(dot(vNormal, light1), 0.0);
    float diff2 = max(dot(vNormal, light2), 0.0) * 0.3;
    float amb = 0.12;

    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    vec3 reflectDir = reflect(-light1, vNormal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 48.0) * 0.5;

    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0) * 0.2;

    vec3 spherePos = uvToSphere(vUv);
    float panel = soccerPanel(spherePos);

    vec3 whitePanel = vec3(0.92, 0.92, 0.90);
    vec3 blackPanel = vec3(0.04, 0.04, 0.04);
    vec3 ballColor = mix(blackPanel, whitePanel, panel);

    float noise = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);
    ballColor += (noise - 0.5) * 0.008;

    vec3 seamGlow = uAccentColor * (1.0 - panel) * 0.18;

    float lighting = diff1 + diff2 + amb;
    vec3 finalColor = ballColor * lighting + spec + fresnel + seamGlow;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

type Props = {
  accent: string;
  isAnimating: boolean;
  animationTrigger: number;
  size?: "normal" | "large";
  continuousSpin?: boolean;
  initialRotationX?: number;
  initialRotationY?: number;
};

export default function BallMesh({
  accent,
  isAnimating,
  animationTrigger,
  size = "normal",
  continuousSpin = false,
  initialRotationX = 0,
  initialRotationY = 0,
}: Props) {
  const meshRef = useRef<Mesh>(null);

  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);

  const uniforms = useMemo(
    () => ({
      uAccentColor: { value: accentColor },
      uTime: { value: 0 },
    }),
    [accentColor],
  );

  const ballRadius = size === "large" ? 2.2 : 1.4;
  const idleSpeedY = size === "large" ? 0.6 : 0.3;
  const idleSpeedX = size === "large" ? 0.15 : 0.1;

  const spinSpeedY = useRef(idleSpeedY);
  const spinSpeedX = useRef(idleSpeedX);
  const shouldSlowDown = useRef(false);
  const initializedRotation = useRef(false);

  useEffect(() => {
    initializedRotation.current = false;
  }, [initialRotationX, initialRotationY, animationTrigger]);

  useEffect(() => {
    if (continuousSpin) return;

    if (isAnimating) {
      spinSpeedY.current = 4.2;
      spinSpeedX.current = 1.2;
      shouldSlowDown.current = false;

      const timer = setTimeout(() => {
        shouldSlowDown.current = true;
      }, 1000);

      return () => clearTimeout(timer);
    }

    spinSpeedY.current = idleSpeedY;
    spinSpeedX.current = idleSpeedX;
    shouldSlowDown.current = true;
  }, [isAnimating, animationTrigger, continuousSpin, idleSpeedX, idleSpeedY]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (!initializedRotation.current) {
      meshRef.current.rotation.x = initialRotationX;
      meshRef.current.rotation.y = initialRotationY;
      initializedRotation.current = true;
    }

    uniforms.uTime.value += delta;
    uniforms.uAccentColor.value.set(accent);

    if (continuousSpin) {
      meshRef.current.rotation.x = initialRotationX;
      meshRef.current.rotation.y += delta * 0.4;
    } else {
      if (shouldSlowDown.current) {
        spinSpeedY.current += (idleSpeedY - spinSpeedY.current) * 0.04;
        // spinSpeedX.current += (idleSpeedX - spinSpeedX.current) * 0.04;
      }

      meshRef.current.rotation.x = initialRotationX;
      meshRef.current.rotation.y += delta * spinSpeedY.current;
    }

    // meshRef.current.position.y = Math.sin(uniforms.uTime.value * 0.8) * 0.08;
    meshRef.current.position.y = 0;
    meshRef.current.position.x = -0.1;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[ballRadius, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
