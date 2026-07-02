import { useEffect, useRef } from "react";

const CYAN = "#1cb9d7";
const NAVY = "#010c2a";

const DinoGame = ({ onExit }) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    let W = 0;
    let H = 0;
    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const dino = { x: 26, y: 0, vy: 0, w: 22, h: 24 };
    let obstacles = [];
    let score = 0;
    let speed = 4.2;
    let spawnIn = 60;
    let frame = 0;
    let over = false;
    let animationId;

    const groundY = () => H - 26;

    const reset = () => {
      obstacles = [];
      score = 0;
      speed = 4.2;
      spawnIn = 60;
      dino.y = 0;
      dino.vy = 0;
      over = false;
    };

    const jump = () => {
      if (over) {
        reset();
        return;
      }
      if (dino.y === 0) dino.vy = -9.4;
    };

    const onKey = (e) => {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        jump();
      } else if (e.key === "q" || e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onExitRef.current(Math.floor(score));
      }
    };
    window.addEventListener("keydown", onKey, true);

    const drawDino = (gy) => {
      const x = dino.x;
      const y = gy - dino.h + dino.y;
      ctx.fillStyle = CYAN;
      ctx.fillRect(x + 10, y, 12, 9); // head
      ctx.fillRect(x + 2, y + 7, 16, 11); // body
      ctx.fillRect(x - 3, y + 9, 6, 5); // tail
      const legPhase = Math.floor(frame / 6) % 2;
      if (dino.y === 0 && !over) {
        ctx.fillRect(x + 4 + (legPhase ? 0 : 8), y + 18, 4, 6);
        ctx.fillRect(x + 4 + (legPhase ? 8 : 0), y + 18, 4, 4);
      } else {
        ctx.fillRect(x + 4, y + 18, 4, 6);
        ctx.fillRect(x + 12, y + 18, 4, 6);
      }
      ctx.fillStyle = NAVY;
      ctx.fillRect(x + 14, y + 2, 3, 3); // eye
    };

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      frame++;
      const gy = groundY();

      if (!over) {
        dino.vy += 0.52;
        dino.y = Math.min(0, dino.y + dino.vy);
        if (dino.y === 0) dino.vy = 0;

        if (--spawnIn <= 0) {
          const h = 16 + Math.random() * 18;
          obstacles.push({ x: W + 20, w: 8 + Math.random() * 10, h });
          spawnIn = 45 + Math.random() * 70 - Math.min(30, speed * 3);
        }
        obstacles.forEach((o) => (o.x -= speed));
        obstacles = obstacles.filter((o) => o.x + o.w > -10);

        const dx = dino.x + 3;
        const dy = gy - dino.h + dino.y + 3;
        const dw = dino.w - 6;
        const dh = dino.h - 5;
        for (const o of obstacles) {
          const oy = gy - o.h;
          if (dx < o.x + o.w && dx + dw > o.x && dy + dh > oy) {
            over = true;
            break;
          }
        }

        score += speed * 0.018;
        speed = Math.min(9, 4.2 + score * 0.012);
      }

      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(28,185,215,0.5)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(0, gy + 0.5);
      ctx.lineTo(W, gy + 0.5);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = CYAN;
      obstacles.forEach((o) => {
        ctx.fillRect(o.x, gy - o.h, o.w, o.h);
        ctx.fillRect(o.x - 4, gy - o.h * 0.6, 4, 4); // arm
      });

      drawDino(gy);

      ctx.fillStyle = "rgba(166,175,195,0.9)";
      ctx.font = "12px ui-monospace, Menlo, monospace";
      ctx.textAlign = "right";
      ctx.fillText(`score ${String(Math.floor(score)).padStart(5, "0")}`, W - 10, 18);
      ctx.textAlign = "left";
      ctx.fillText("space: jump   q: quit", 10, 18);

      if (over) {
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "14px ui-monospace, Menlo, monospace";
        ctx.fillText(`game over. score ${Math.floor(score)}`, W / 2, H / 2 - 10);
        ctx.fillStyle = "rgba(166,175,195,0.9)";
        ctx.font = "12px ui-monospace, Menlo, monospace";
        ctx.fillText("space to restart, q to quit", W / 2, H / 2 + 12);
        ctx.textAlign = "left";
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", onKey, true);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default DinoGame;
