import { useEffect, useRef } from "react";

const CYAN = "#1cb9d7";
const CELL = 14;
const FOOD_COLORS = ["#ffd60a", "#22e55c", "#ff4d4d", "#ff9f1c", "#ff5fa2"];

const SnakeGame = ({ onExit }) => {
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
    let cols = 0;
    let rows = 0;
    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      cols = Math.floor(W / CELL);
      rows = Math.floor((H - 24) / CELL); // leave a strip for the score line
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let snake, dir, nextDir, food, foodColor, score, over, won, tickMs;

    const placeFood = () => {
      do {
        food = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
      } while (snake.some((s) => s.x === food.x && s.y === food.y));
      let c;
      do {
        c = FOOD_COLORS[Math.floor(Math.random() * FOOD_COLORS.length)];
      } while (c === foodColor);
      foodColor = c;
    };

    const reset = () => {
      const cx = Math.floor(cols / 2);
      const cy = Math.floor(rows / 2);
      snake = [
        { x: cx, y: cy },
        { x: cx - 1, y: cy },
        { x: cx - 2, y: cy },
      ];
      dir = { x: 1, y: 0 };
      nextDir = dir;
      score = 0;
      over = false;
      won = false;
      tickMs = 110;
      placeFood();
    };
    reset();

    const setDir = (x, y) => {
      if (over) return;
      if (x === -dir.x && y === -dir.y) return; // no 180s
      nextDir = { x, y };
    };

    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (e.key === "ArrowUp" || k === "w") setDir(0, -1);
      else if (e.key === "ArrowDown" || k === "s") setDir(0, 1);
      else if (e.key === "ArrowLeft" || k === "a") setDir(-1, 0);
      else if (e.key === "ArrowRight" || k === "d") setDir(1, 0);
      else if (e.key === " ") {
        if (over) reset();
      } else if (k === "q" || e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onExitRef.current(score);
        return;
      } else {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("keydown", onKey, true);

    const step = () => {
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= cols ||
        head.y >= rows ||
        snake.some((s) => s.x === head.x && s.y === head.y)
      ) {
        over = true;
        return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 1;
        if (snake.length >= cols * rows) {
          won = true;
          over = true;
          return;
        }
        tickMs = Math.max(60, tickMs - 2);
        placeFood();
      } else {
        snake.pop();
      }
    };

    let animationId;
    let lastTick = 0;
    const draw = (t) => {
      animationId = requestAnimationFrame(draw);
      if (!over && t - lastTick >= tickMs) {
        lastTick = t;
        step();
      }

      ctx.clearRect(0, 0, W, H);

      const ox = Math.floor((W - cols * CELL) / 2);
      const oy = 22;

      ctx.strokeStyle = "rgba(28,185,215,0.25)";
      ctx.lineWidth = 1;
      ctx.strokeRect(ox - 0.5, oy - 0.5, cols * CELL + 1, rows * CELL + 1);

      ctx.fillStyle = CYAN;
      snake.forEach((s, i) => {
        const pad = i === 0 ? 1 : 2;
        ctx.globalAlpha = i === 0 ? 1 : Math.max(0.35, 1 - i * 0.04);
        ctx.fillRect(ox + s.x * CELL + pad, oy + s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
      });
      ctx.globalAlpha = 1;

      ctx.fillStyle = foodColor;
      ctx.beginPath();
      ctx.arc(ox + food.x * CELL + CELL / 2, oy + food.y * CELL + CELL / 2, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(166,175,195,0.9)";
      ctx.font = "12px ui-monospace, Menlo, monospace";
      ctx.textAlign = "left";
      ctx.fillText("arrows/wasd: steer   q: quit", 10, 14);
      ctx.textAlign = "right";
      ctx.fillText(`score ${score}`, W - 10, 14);
      ctx.textAlign = "left";

      if (over) {
        ctx.fillStyle = "rgba(1,12,42,0.75)";
        ctx.fillRect(ox, oy, cols * CELL, rows * CELL);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "14px ui-monospace, Menlo, monospace";
        ctx.fillText(won ? `you win. score ${score}` : `game over. score ${score}`, W / 2, H / 2 - 10);
        ctx.fillStyle = "rgba(166,175,195,0.9)";
        ctx.font = "12px ui-monospace, Menlo, monospace";
        ctx.fillText("space to restart, q to quit", W / 2, H / 2 + 12);
        ctx.textAlign = "left";
      }
    };
    animationId = requestAnimationFrame(draw);

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

export default SnakeGame;
