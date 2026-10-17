"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  type: "star" | "petal" | "dust";
  color: string;
}

function GoldenStarlightPetals({
  containerRef,
}: {
  containerRef?: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  // Resize canvas with high-DPI retina support
  // Resize canvas with capped DPR (1.5 max as required)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // Animation Loop — single RAF loop, pauses when hidden, skips heavy frames
  const lastFrameTimeRef = useRef(0);
  const startLoop = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (now: number) => {
      // Pause if document hidden
      if (typeof document !== "undefined" && document.hidden) {
        isRunningRef.current = false;
        animFrameRef.current = null;
        return;
      }

      // Frame pacing: skip processing if frame time delta was too long
      const frameDelta = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035; // gentle downward gravity
        p.vx *= 0.985;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > height + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.type === "star") {
          // Delicate 8-point Khatam star
          ctx.beginPath();
          for (let s = 0; s < 8; s++) {
            const rot = (Math.PI / 4) * s;
            const r = s % 2 === 0 ? p.size : p.size * 0.42;
            const sx = Math.cos(rot) * r;
            const sy = Math.sin(rot) * r;
            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.fill();
        } else if (p.type === "petal") {
          // Delicate jasmine / floral fragment
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.48, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Shimmering starlight mote
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;
          ctx.fill();
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        isRunningRef.current = false;
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  const spawnBurst = useCallback(
    (clientX?: number, clientY?: number) => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      // Cut count by half on mobile (<768px)
      const count = isMobile ? 12 : 24;
      const colors = ["#C6A15B", "#F5EBD5", "#E8D3A2", "#DFC082", "#A98A50"];
      const types: ("star" | "petal" | "dust")[] = ["star", "petal", "dust"];

      const originX = clientX ?? window.innerWidth / 2;
      const originY = clientY ?? window.innerHeight / 2;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (isMobile ? 2.4 : 3.4) + 1.2;
        particlesRef.current.push({
          x: originX + (Math.random() - 0.5) * 20,
          y: originY + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.5,
          vy: Math.sin(angle) * speed - (isMobile ? 1.8 : 2.4),
          size: Math.random() * (isMobile ? 4 : 5.5) + 2.2,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.012,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.09,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      startLoop();
    },
    [startLoop]
  );

  // Set up resize and visibility listeners
  useEffect(() => {
    resizeCanvas();
    const handleVisChange = () => {
      if (!document.hidden && particlesRef.current.length > 0) {
        startLoop();
      }
    };
    window.addEventListener("resize", resizeCanvas, { passive: true });
    document.addEventListener("visibilitychange", handleVisChange);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisChange);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [resizeCanvas, startLoop]);

  // Listen to tap anywhere in the parent section
  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button:not([data-scatter-trigger]), a, input")) return;

      let clientX = 0;
      let clientY = 0;

      if ("clientX" in e && typeof e.clientX === "number") {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = window.innerWidth / 2;
        clientY = window.innerHeight / 2;
      }

      spawnBurst(clientX, clientY);
    };

    el.addEventListener("click", handlePointerDown as EventListener);
    return () => {
      el.removeEventListener("click", handlePointerDown as EventListener);
    };
  }, [containerRef, spawnBurst]);

  return (
    <>
      {/* ── Fixed Fullscreen High-DPI Particle Canvas (Never cropped by containers) ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        aria-hidden="true"
      />

      {/* ── Responsive Closing Trigger Button ── */}
      <div className="flex justify-center mt-5 sm:mt-6 z-20 w-full px-4">
        <button
          data-scatter-trigger
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }}
          className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-gold-antique/35 bg-[#02271F]/95 hover:bg-emerald-primary/70 transition-all duration-300 hover:border-gold-antique hover:scale-105 active:scale-95 text-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-pointer max-w-full"
          aria-label="Tap to scatter golden blessings and starlight"
        >
          <span className="text-gold-antique text-xs group-hover:rotate-45 transition-transform duration-300 shrink-0">
            ✦
          </span>
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.24em] text-ivory-warm/95 font-light truncate">
            Tap anywhere to scatter golden blessings
          </span>
          <span className="text-gold-antique text-xs group-hover:rotate-45 transition-transform duration-300 shrink-0">
            ✦
          </span>
        </button>
      </div>
    </>
  );
}

export default memo(GoldenStarlightPetals);
