"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uRes;
  varying vec2  vUv;

  // Ashima 2D simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // 2-octave fractal noise
  float fbm(vec2 p) {
    float v = snoise(p);
    v += snoise(p * 2.13 + 7.21) * 0.5;
    return v / 1.5;
  }

  // White base with soft blue shades
  const vec3 cWhite    = vec3(0.992, 0.992, 0.988); // near pure white
  const vec3 cBlueSoft = vec3(0.780, 0.860, 0.930); // pale powder blue
  const vec3 cBlueDeep = vec3(0.450, 0.620, 0.760); // mid blue (subtle)

  void main() {
    // Aspect-correct uv so the noise field doesn't stretch on wide screens
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 uv = vec2(vUv.x * aspect, vUv.y);

    float t = uTime * 0.04;

    // Two slowly drifting noise fields → soft, painterly flow
    float n1 = fbm(uv * 1.5 + vec2(t, t * 0.45));
    float n2 = fbm(uv * 1.0 + vec2(-t * 0.7, t * 0.9) + 11.0);

    float blue1 = smoothstep(0.15, 0.95, n1);
    float blue2 = smoothstep(0.30, 0.95, n2);
    float bloom = smoothstep(0.55, 0.98, n1 * 0.5 + n2 * 0.5);

    // White base, only a faint wash of blue
    vec3 col = cWhite;
    col = mix(col, cBlueSoft, blue1 * 0.18);
    col = mix(col, cBlueDeep, blue2 * 0.05);
    col += cBlueSoft * bloom * 0.08;

    // Mouse-led cool bloom (very subtle)
    float md = distance(vUv, uMouse);
    col += cBlueSoft * smoothstep(0.40, 0.0, md) * 0.10;

    // Soft vignette to keep focus on the headline
    vec2 center = vUv - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.30;
    col *= vignette;

    // Subtle film grain so gradients don't band on cheap displays
    float grain = fract(sin(dot(vUv * uRes, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.010;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Aurora() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const smoothMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    const targetX = state.mouse.x * 0.5 + 0.5;
    const targetY = state.mouse.y * 0.5 + 0.5;
    smoothMouse.current.x += (targetX - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (targetY - smoothMouse.current.y) * 0.05;
    matRef.current.uniforms.uMouse.value.copy(smoothMouse.current);

    matRef.current.uniforms.uRes.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      <Aurora />
    </Canvas>
  );
}
