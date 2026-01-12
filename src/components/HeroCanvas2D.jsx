"use client";
import { useEffect, useMemo, useRef } from "react";

export default function HeroCanvas2D({ mood = "cool" }) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5, active: false });
  const particles = useRef([]);

  const palette = useMemo(() => {
    if (mood === "hot")
      return { a: "#ff4fd8", b: "#ff8a3d", glow: "rgba(255,79,216,0.20)" };
    if (mood === "mid")
      return { a: "#ffe24a", b: "#20e3ff", glow: "rgba(255,226,74,0.18)" };
    return { a: "#20e3ff", b: "#b9ff37", glow: "rgba(32,227,255,0.18)" };
  }, [mood]);

  useEffect(() => {
    if (particles.current.length) return;
    const count = 900;
    const ps = [];
    for (let i = 0; i < count; i++) {
      ps.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.0022,
        vy: (Math.random() - 0.5) * 0.0022,
      });
    }
    particles.current = ps;
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
      mouse.current.active = true;
    };
    const onLeave = () => (mouse.current.active = false);

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const draw = (now) => {
      const t = now / 1000;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fffdf6";
      ctx.fillRect(0, 0, w, h);

      // subtle stripes like editorial print
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = i % 2 ? "#000" : palette.a;
        ctx.fillRect(0, i * (h / 40), w, h / 80);
      }
      ctx.globalAlpha = 1;

      const mx = mouse.current.active ? mouse.current.x : 0.5;
      const my = mouse.current.active ? mouse.current.y : 0.5;

      const g = ctx.createRadialGradient(
        w * (0.35 + mx * 0.2),
        h * (0.45 + my * 0.2),
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.7
      );
      g.addColorStop(0, palette.glow);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // particles
      ctx.save();
      ctx.translate(w / 2, h / 2);
      const ps = particles.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > 1.2) p.x = -1.2;
        if (p.x < -1.2) p.x = 1.2;
        if (p.y > 1.2) p.y = -1.2;
        if (p.y < -1.2) p.y = 1.2;

        const px = (p.x + (mx - 0.5) * p.z * 0.8) * (w * 0.33);
        const py = (p.y + (my - 0.5) * p.z * 0.8) * (h * 0.33);
        const size = 1 + p.z * 2.1;

        ctx.fillStyle = `rgba(10,10,10,${0.08 + p.z * 0.22})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // rings
      const cx = w / 2,
        cy = h / 2;
      for (let i = 0; i < 7; i++) {
        const r = 80 + i * 40;
        const spin = t * (0.35 + i * 0.03);
        const tilt = 0.62 + Math.sin(t * 0.7) * 0.06 + (my - 0.5) * 0.1;
        const wobble = Math.sin(t * 0.9 + i) * 2 + (mx - 0.5) * 8;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(spin);
        ctx.scale(1, tilt);

        const grad = ctx.createLinearGradient(-r, 0, r, 0);
        grad.addColorStop(0, palette.a);
        grad.addColorStop(0.5, palette.b);
        grad.addColorStop(1, palette.a);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.ellipse(wobble, 0, r, r * 0.52, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      // core
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.8);
      const coreR = Math.min(w, h) * 0.11;
      ctx.fillStyle = palette.b;
      ctx.strokeStyle = "#0a0a0a";
      ctx.lineWidth = 3;

      ctx.beginPath();
      const spikes = 12;
      for (let i = 0; i <= spikes; i++) {
        const a = (i / spikes) * Math.PI * 2;
        const rr = coreR * (0.75 + 0.25 * Math.sin(a * 3 + t * 1.5));
        const x = Math.cos(a) * rr;
        const y = Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [palette]);

  return <canvas ref={ref} className="w-full h-full block" />;
}
