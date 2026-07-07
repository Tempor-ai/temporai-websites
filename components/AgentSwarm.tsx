"use client";

import { useEffect, useRef } from "react";

interface AgentSwarmProps {
  className?: string;
}

/**
 * Lightweight, dependency-free canvas visualization: a loose volumetric
 * cloud of floating nodes (not a sphere shell) that connect to nearby
 * neighbors, each drifting independently — reads as a swarm of AI agents
 * rather than a rotating globe. Cursor gently disturbs nearby nodes.
 * Plain canvas 2D, no WebGL/three.js, so it stays cheap to run continuously.
 */
export default function AgentSwarm({ className = "" }: AgentSwarmProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---------- geometry: nodes scattered through a volume (not a shell) ----------
    const N = 110;
    const bx = new Float32Array(N);
    const by = new Float32Array(N);
    const bz = new Float32Array(N);
    // deterministic pseudo-random sequence so layout is stable across renders
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    for (let i = 0; i < N; i++) {
      // uniform-in-sphere-volume via random direction * cbrt(random radius)
      const u = rand() * 2 - 1;
      const theta = rand() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const rad = Math.cbrt(rand());
      bx[i] = rad * r * Math.cos(theta);
      by[i] = rad * u;
      bz[i] = rad * r * Math.sin(theta);
    }

    // Precompute neighbor pairs ONCE (3D distance among home positions).
    const pairList: number[] = [];
    const MAXCHORD = 0.5;
    const MC2 = MAXCHORD * MAXCHORD;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = bx[i] - bx[j];
        const dy = by[i] - by[j];
        const dz = bz[i] - bz[j];
        if (dx * dx + dy * dy + dz * dz < MC2) pairList.push(i, j);
      }
    }
    const pairs = new Int16Array(pairList);
    const PAIRC = pairs.length / 2;

    // per-node wander phase/frequency (cheap organic drift, no noise lib)
    const wf1 = new Float32Array(N);
    const wf2 = new Float32Array(N);
    const wf3 = new Float32Array(N);
    const wp1 = new Float32Array(N);
    const wp2 = new Float32Array(N);
    const wp3 = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      wf1[i] = 0.15 + rand() * 0.25;
      wf2[i] = 0.15 + rand() * 0.25;
      wf3[i] = 0.15 + rand() * 0.25;
      wp1[i] = rand() * Math.PI * 2;
      wp2[i] = rand() * Math.PI * 2;
      wp3[i] = rand() * Math.PI * 2;
    }
    const WANDER = 0.16; // amplitude, in sphere-radius units

    // ---------- palette: brand blue -> purple, mapped left-to-right ----------
    const PAL_STEPS = 32;
    const pal: string[] = new Array(PAL_STEPS);
    for (let i = 0; i < PAL_STEPS; i++) {
      const t = i / (PAL_STEPS - 1);
      const r = Math.round(65 + (148 - 65) * t);
      const g = Math.round(200 + (131 - 200) * t);
      const b = Math.round(245 + (182 - 245) * t);
      pal[i] = `rgb(${r},${g},${b})`;
    }

    // ---------- per-point state (preallocated, reused every frame) ----------
    const sx = new Float32Array(N);
    const sy = new Float32Array(N);
    const pt = new Float32Array(N);
    const ox = new Float32Array(N);
    const oy = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);
    const gb = new Float32Array(N);

    let W = 0,
      H = 0,
      CX = 0,
      CY = 0,
      R = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      W = rect ? rect.width : window.innerWidth;
      H = rect ? rect.height : window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W * 0.5;
      CY = H * 0.5;
      R = Math.min(W, H) * 0.42;
    }
    resize();
    window.addEventListener("resize", resize);

    let mx = -1e4;
    let my = -1e4;
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeaveOrBlur = () => {
      mx = -1e4;
      my = -1e4;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onLeaveOrBlur);
    document.documentElement.addEventListener("mouseleave", onLeaveOrBlur);

    const FOV = 3.0;
    let rotY = 0;
    let tPrev = performance.now();
    let rafId = 0;

    function frame(now: number) {
      if (!ctx) return;
      let dt = (now - tPrev) / 16.667;
      if (dt > 3) dt = 3;
      if (dt < 0) dt = 0;
      tPrev = now;

      const t = now * 0.001;
      rotY += (prefersReducedMotion ? 0.0002 : 0.0012) * dt;

      const cY = Math.cos(rotY),
        sY = Math.sin(rotY);

      const IR = Math.max(90, R * 0.5);
      const IR2 = IR * IR;

      for (let i = 0; i < N; i++) {
        // organic per-node wander around home position
        const wx = prefersReducedMotion
          ? 0
          : WANDER * Math.sin(t * wf1[i] + wp1[i]);
        const wy = prefersReducedMotion
          ? 0
          : WANDER * Math.sin(t * wf2[i] + wp2[i]);
        const wz = prefersReducedMotion
          ? 0
          : WANDER * Math.cos(t * wf3[i] + wp3[i]);

        const hx = bx[i] + wx;
        const hy = by[i] + wy;
        const hz = bz[i] + wz;

        // slow whole-cluster rotation around Y for parallax depth
        const x1 = hx * cY + hz * sY;
        const z2 = -hx * sY + hz * cY;

        const s = FOV / (FOV + z2);
        const px = CX + x1 * R * s;
        const py = CY + hy * R * s;
        pt[i] = (1 - z2) * 0.5;

        const wpx = px + ox[i],
          wpy = py + oy[i];
        const ddx = wpx - mx,
          ddy = wpy - my;
        const d2 = ddx * ddx + ddy * ddy;
        let prox = 0;
        if (d2 < IR2 && !prefersReducedMotion) {
          const d = Math.sqrt(d2) || 1;
          prox = 1 - d / IR;
          const push = prox * prox * 1.6 * dt;
          vx[i] += (ddx / d) * push;
          vy[i] += (ddy / d) * push;
        }
        gb[i] = prox;

        vx[i] += -0.05 * ox[i] * dt;
        vy[i] += -0.05 * oy[i] * dt;
        let damp = 1 - 0.1 * dt;
        if (damp < 0) damp = 0;
        vx[i] *= damp;
        vy[i] *= damp;
        ox[i] += vx[i] * dt;
        oy[i] += vy[i] * dt;

        sx[i] = px + ox[i];
        sy[i] = py + oy[i];
      }

      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;

      const invW = 1 / (2 * R);
      const LB2 = IR2;
      for (let p = 0; p < PAIRC; p++) {
        const a = pairs[p * 2],
          b = pairs[p * 2 + 1];
        const ax = sx[a],
          ay = sy[a],
          bx2 = sx[b],
          by2 = sy[b];

        const dep = (pt[a] + pt[b]) * 0.5;
        let alpha = 0.05 + 0.2 * dep * dep;

        const mpx = (ax + bx2) * 0.5,
          mpy = (ay + by2) * 0.5;
        const mdx = mpx - mx,
          mdy = mpy - my;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < LB2) {
          const f = 1 - Math.sqrt(md2) / IR;
          alpha += f * f * 0.35;
        }
        if (alpha < 0.03) continue;

        let ci = ((mpx - (CX - R)) * invW * (PAL_STEPS - 1)) | 0;
        if (ci < 0) ci = 0;
        else if (ci >= PAL_STEPS) ci = PAL_STEPS - 1;

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = pal[ci];
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx2, by2);
        ctx.stroke();
      }

      const TAU = Math.PI * 2;
      for (let i = 0; i < N; i++) {
        const depth = pt[i];
        let al = 0.4 + 0.55 * depth + gb[i] * 0.25;
        if (al > 1) al = 1;
        const rad = (1.6 + 2.2 * depth) * (1 + gb[i] * 0.4);

        let k = ((sx[i] - (CX - R)) * invW * (PAL_STEPS - 1)) | 0;
        if (k < 0) k = 0;
        else if (k >= PAL_STEPS) k = PAL_STEPS - 1;

        ctx.globalAlpha = al;
        ctx.fillStyle = pal[k];
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], rad, 0, TAU);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onLeaveOrBlur);
      document.documentElement.removeEventListener("mouseleave", onLeaveOrBlur);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
