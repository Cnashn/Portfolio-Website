import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const COLORS = ["#1cb9d7", "#6ee7ff", "#804dee", "#ffffff"];

const EasterEggs = () => {
  const [bursting, setBursting] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log(
      "%c CS %c can.sh %c\n\nBuilt with React, Tailwind and framer-motion.\nTry the Konami code. ↑↑↓↓←→←→BA",
      "background:#1cb9d7;color:#010c2a;font-weight:bold;padding:2px 6px;border-radius:3px",
      "background:#010c2a;color:#1cb9d7;padding:2px 6px;border-radius:3px",
      "color:#a6afc3"
    );
  }, []);

  useEffect(() => {
    let progress = 0;
    const onKey = (e) => {
      progress = e.key === KONAMI[progress] ? progress + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        setBursting(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!bursting) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const particles = Array.from({ length: 160 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9;
      return {
        x: w / 2,
        y: h / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 1.5 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
        decay: 0.008 + Math.random() * 0.012,
      };
    });

    let animationId;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      let alive = false;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.vx *= 0.99;
        p.life -= p.decay;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (alive) {
        animationId = requestAnimationFrame(draw);
      } else {
        setBursting(false);
      }
    };
    draw();

    return () => cancelAnimationFrame(animationId);
  }, [bursting]);

  if (!bursting) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default EasterEggs;
