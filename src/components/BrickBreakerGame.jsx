import { useEffect, useRef } from "react";

const CYAN = "#1cb9d7";
const CH = 14;
const FONT = "13px ui-monospace, Menlo, monospace";
const ROW_COLORS = ["#ff4d4d", "#ff9f1c", "#ffd60a", "#22e55c", "#1cb9d7"];
const BRICK_ROWS = 5;
const BRICK_PITCH = 5; // 4 block chars + 1 gap
const PADDLE_W = 9;

const BrickBreakerGame = ({ onExit }) => {
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
    let CW = 8;
    let cols = 0;
    let rows = 0;
    let bricks, brickCols, brickX0, ball, paddle, score, lives, over, won, speed, serveIn;
    const keys = { left: false, right: false };

    // rebuild the brick field for the current width, keeping the alive state
    // of columns that survive the resize so maximizing mid-game works
    const layout = () => {
      const newCols = Math.floor((cols - 1) / BRICK_PITCH);
      const old = bricks;
      bricks = Array.from({ length: BRICK_ROWS }, (_, r) =>
        Array.from({ length: newCols }, (_, c) => (old && c < brickCols ? old[r][c] : true))
      );
      brickCols = newCols;
      brickX0 = Math.floor((cols - (brickCols * BRICK_PITCH - 1)) / 2);
    };

    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FONT;
      CW = ctx.measureText("█").width;
      cols = Math.floor(W / CW) - 2;
      rows = Math.floor((H - 24) / CH); // leave a strip for the score line
      if (bricks) {
        layout();
        paddle.x = Math.max(0, Math.min(cols - PADDLE_W, paddle.x));
        ball.x = Math.max(0, Math.min(cols, ball.x));
        ball.y = Math.min(ball.y, rows - 2);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const serve = () => {
      ball = { x: paddle.x + PADDLE_W / 2, y: rows - 2, vx: 0, vy: 0 };
      serveIn = 45;
    };

    const launch = () => {
      const a = (Math.random() * 60 - 30) * (Math.PI / 180);
      // velocity is set in pixels then divided by the char cell size, so the
      // trajectory angle looks right despite cells being taller than wide
      ball.vx = (speed * Math.sin(a)) / CW;
      ball.vy = (-speed * Math.cos(a)) / CH;
    };

    const reset = () => {
      bricks = null;
      layout();
      paddle = { x: (cols - PADDLE_W) / 2 };
      score = 0;
      lives = 3;
      over = false;
      won = false;
      speed = 2.6;
      serve();
    };
    reset();

    const onKeyDown = (e) => {
      const k = e.key.toLowerCase();
      if (e.key === "ArrowLeft" || k === "a") keys.left = true;
      else if (e.key === "ArrowRight" || k === "d") keys.right = true;
      else if (e.key === " ") {
        if (over) reset();
        else serveIn = 0;
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
    const onKeyUp = (e) => {
      const k = e.key.toLowerCase();
      if (e.key === "ArrowLeft" || k === "a") keys.left = false;
      else if (e.key === "ArrowRight" || k === "d") keys.right = false;
    };
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("keyup", onKeyUp, true);

    const brickAt = (x, y) => {
      const r = Math.floor(y) - 1;
      if (r < 0 || r >= BRICK_ROWS) return null;
      // the whole pitch (blocks + gap) is solid so the ball can't slip
      // through the 1-char channels between brick columns
      const rel = Math.floor(x) - brickX0;
      if (rel < 0) return null;
      const c = Math.floor(rel / BRICK_PITCH);
      if (c >= brickCols || !bricks[r][c]) return null;
      return { r, c };
    };

    const step = () => {
      if (keys.left) paddle.x -= 0.6;
      if (keys.right) paddle.x += 0.6;
      paddle.x = Math.max(0, Math.min(cols - PADDLE_W, paddle.x));

      if (serveIn > 0) {
        serveIn--;
        ball.x = paddle.x + PADDLE_W / 2;
        if (serveIn === 0) launch();
        return;
      }

      const px = ball.x;
      const py = ball.y;
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < 0) {
        ball.x = -ball.x;
        ball.vx = Math.abs(ball.vx);
      } else if (ball.x > cols) {
        ball.x = 2 * cols - ball.x;
        ball.vx = -Math.abs(ball.vx);
      }
      if (ball.y < 0) {
        ball.y = -ball.y;
        ball.vy = Math.abs(ball.vy);
      }

      const hit = brickAt(ball.x, ball.y);
      if (hit) {
        bricks[hit.r][hit.c] = false;
        score += 10;
        speed = Math.min(4, speed + 0.04);
        if (Math.floor(py) !== Math.floor(ball.y)) ball.vy = -ball.vy;
        else if (Math.floor(px) !== Math.floor(ball.x)) ball.vx = -ball.vx;
        else ball.vy = -ball.vy;
        if (bricks.every((row) => row.every((b) => !b))) {
          won = true;
          over = true;
        }
        return;
      }

      if (
        ball.vy > 0 &&
        ball.y >= rows - 1.5 &&
        ball.y <= rows &&
        ball.x >= paddle.x - 0.5 &&
        ball.x <= paddle.x + PADDLE_W + 0.5
      ) {
        const rel = Math.max(-1, Math.min(1, (ball.x - (paddle.x + PADDLE_W / 2)) / (PADDLE_W / 2)));
        const a = rel * (65 * (Math.PI / 180));
        ball.vx = (speed * Math.sin(a)) / CW;
        ball.vy = (-speed * Math.cos(a)) / CH;
        ball.y = rows - 1.5;
        return;
      }

      if (ball.y > rows + 1) {
        lives--;
        if (lives <= 0) over = true;
        else serve();
      }
    };

    let animationId;
    const draw = () => {
      animationId = requestAnimationFrame(draw);
      if (!over) step();

      ctx.clearRect(0, 0, W, H);

      const ox = Math.floor((W - cols * CW) / 2);
      const oy = 22;

      ctx.strokeStyle = "rgba(28,185,215,0.25)";
      ctx.lineWidth = 1;
      ctx.strokeRect(ox - 0.5, oy - 0.5, cols * CW + 1, rows * CH + 1);

      ctx.font = FONT;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      for (let r = 0; r < BRICK_ROWS; r++) {
        ctx.fillStyle = ROW_COLORS[r];
        for (let c = 0; c < brickCols; c++) {
          if (bricks[r][c]) {
            ctx.fillText("████", ox + (brickX0 + c * BRICK_PITCH) * CW, oy + (r + 1) * CH);
          }
        }
      }

      ctx.fillStyle = CYAN;
      ctx.fillText("▄".repeat(PADDLE_W), ox + paddle.x * CW, oy + (rows - 1) * CH);

      if (ball.y <= rows) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(ox, oy, cols * CW, rows * CH);
        ctx.clip();
        ctx.fillStyle = "#ffffff";
        ctx.fillText("●", ox + ball.x * CW - CW / 2, oy + ball.y * CH - CH / 2);
        ctx.restore();
      }

      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(166,175,195,0.9)";
      ctx.font = "12px ui-monospace, Menlo, monospace";
      ctx.fillText("arrows/ad: move   q: quit", 10, 14);
      ctx.textAlign = "right";
      ctx.fillText(`score ${score}   lives ${"●".repeat(Math.max(0, lives))}`, W - 10, 14);
      ctx.textAlign = "left";

      if (!over && serveIn > 0) {
        ctx.fillStyle = `rgba(166,175,195,${0.5 + 0.4 * Math.sin(Date.now() / 250)})`;
        ctx.textAlign = "center";
        ctx.fillText("space to serve", W / 2, oy + (rows - 4) * CH);
        ctx.textAlign = "left";
      }

      if (over) {
        ctx.fillStyle = "rgba(1,12,42,0.75)";
        ctx.fillRect(ox, oy, cols * CW, rows * CH);
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
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("keyup", onKeyUp, true);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default BrickBreakerGame;
