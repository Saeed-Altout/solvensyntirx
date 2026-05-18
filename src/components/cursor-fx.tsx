"use client";
import { useEffect, useRef, useState } from "react";

export function CursorFX() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [expanded, setExpanded] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number }[]>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement;
      setExpanded(
        !!(target.closest("[data-magnetic]") || target.closest("a") || target.closest("button"))
      );
      particles.current.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        life: 50,
      });
      if (particles.current.length > 120) particles.current.shift();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#4A90E2";

    const loop = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.x + "px";
        cursorRef.current.style.top = pos.current.y + "px";
      }
      particles.current = particles.current.filter((p) => p.life > 0);
      for (const p of particles.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, (p.life / 50) * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${accentColor}${Math.floor((p.life / 50) * 180).toString(16).padStart(2, "0")}`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`ss-cursor${expanded ? " expanded" : ""}`} />
      <canvas ref={canvasRef} className="ss-particle-canvas" />
    </>
  );
}
