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

    // ---------- entrance choreography ----------
    // Nodes pop in first in scattered spurts, then the edges draw
    // themselves between already-born nodes. After ~2.3s everything is at
    // steady state and these factors all clamp to 1.
    const birth = new Float32Array(N); // ms after mount each node pops
    for (let i = 0; i < N; i++) birth[i] = 80 + rand() * 550;
    const edgeBirth = new Float32Array(PAIRC); // ms each edge starts drawing
    for (let p = 0; p < PAIRC; p++) edgeBirth[p] = 550 + rand() * 650;
    const nu = new Float32Array(N); // per-frame node "born" factor 0..1
    const t0 = performance.now();
    const easeOutBack = (u: number) => {
      const k = 1.70158;
      const v = u - 1;
      return 1 + (k + 1) * v * v * v + k * v * v;
    };

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

    // ---------- palette: blue -> purple -> silver, mapped left-to-right,
    // echoing the page's own progression (blue headline, purple accents,
    // silver subtext) ----------
    const PAL_STEPS = 32;
    // Slightly darkened variants of the brand stops so the cloud holds its
    // own against the pastel background instead of fading into it.
    const STOPS: [number, number, number][] = [
      [70, 148, 208], // brand blue, deepened
      [122, 99, 164], // brand purple, deepened
      [118, 131, 146], // silver, deepened
    ];
    const pal: string[] = new Array(PAL_STEPS);
    for (let i = 0; i < PAL_STEPS; i++) {
      const t = (i / (PAL_STEPS - 1)) * (STOPS.length - 1);
      const s = Math.min(Math.floor(t), STOPS.length - 2);
      const f = t - s;
      const r = Math.round(STOPS[s][0] + (STOPS[s + 1][0] - STOPS[s][0]) * f);
      const g = Math.round(STOPS[s][1] + (STOPS[s + 1][1] - STOPS[s][1]) * f);
      const b = Math.round(STOPS[s][2] + (STOPS[s + 1][2] - STOPS[s][2]) * f);
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
      R = 0,
      SCL = 1;

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
      // Modest radius so the whole cloud (incl. wander + cursor repel
      // excursions) stays inside the canvas instead of clipping at edges.
      R = Math.min(W, H) * 0.38;
      // Mark weight scales with the cloud so dots/lines keep the same
      // visual density on the big desktop canvas as on the small mobile
      // one (~170 is the mobile-baseline radius).
      SCL = Math.max(1, R / 170);
    }
    resize();
    window.addEventListener("resize", resize);
    // The entrance animation scales the wrapper (0.97 -> 1), so the rect
    // measured at mount is ~3% smaller than the settled layout. Re-measure
    // whenever the element's size changes, not just on window resize.
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let mx = -1e4;
    let my = -1e4;
    const onPointerMove = (e: PointerEvent) => {
      // Map cursor from CSS pixels into the canvas drawing space. When the
      // two diverge (e.g. mid-entrance-animation transform), a raw offset
      // lands the hotspot below-right of the cursor.
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mx = (e.clientX - rect.left) * (W / rect.width);
      my = (e.clientY - rect.top) * (H / rect.height);
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
      const elapsed = now - t0;
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

        // entrance: how "born" this node is (0 = not yet, 1 = settled)
        nu[i] = prefersReducedMotion
          ? 1
          : Math.min(1, Math.max(0, (elapsed - birth[i]) / 320));
      }

      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = SCL;

      const invW = 1 / (2 * R);
      const LB2 = IR2;
      for (let p = 0; p < PAIRC; p++) {
        const a = pairs[p * 2],
          b = pairs[p * 2 + 1];

        // entrance: edges draw themselves in after both endpoints are born
        const g = prefersReducedMotion
          ? 1
          : Math.min(1, Math.max(0, (elapsed - edgeBirth[p]) / 380));
        if (g <= 0) continue;
        const born = Math.min(nu[a], nu[b]);
        if (born <= 0) continue;

        const ax = sx[a],
          ay = sy[a],
          bx2 = sx[b],
          by2 = sy[b];

        const dep = (pt[a] + pt[b]) * 0.5;
        let alpha = (0.05 + 0.2 * dep * dep) * g * born;

        const mpx = (ax + bx2) * 0.5,
          mpy = (ay + by2) * 0.5;
        const mdx = mpx - mx,
          mdy = mpy - my;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < LB2) {
          const f = 1 - Math.sqrt(md2) / IR;
          alpha += f * f * 0.35 * g;
        }
        if (alpha < 0.03) continue;

        let ci = ((mpx - (CX - R)) * invW * (PAL_STEPS - 1)) | 0;
        if (ci < 0) ci = 0;
        else if (ci >= PAL_STEPS) ci = PAL_STEPS - 1;

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = pal[ci];
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        // grow the line from endpoint A toward B while entering
        ctx.lineTo(ax + (bx2 - ax) * g, ay + (by2 - ay) * g);
        ctx.stroke();
      }

      const TAU = Math.PI * 2;
      for (let i = 0; i < N; i++) {
        const u = nu[i];
        if (u <= 0) continue;
        const depth = pt[i];
        let al = (0.4 + 0.55 * depth + gb[i] * 0.25) * u;
        if (al > 1) al = 1;
        // pop in with a slight overshoot, then settle
        const rad =
          (1.6 + 2.2 * depth) * (1 + gb[i] * 0.4) * easeOutBack(u) * SCL;

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
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onLeaveOrBlur);
      document.documentElement.removeEventListener("mouseleave", onLeaveOrBlur);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // w-full/h-full are load-bearing: a canvas is a replaced element, so
      // inset-0 alone does NOT stretch it — without explicit CSS size it
      // renders at its backing-store size (CSS size × devicePixelRatio) and
      // overflows its box on HiDPI screens.
      className={`pointer-events-none w-full h-full ${className}`}
    />
  );
}
