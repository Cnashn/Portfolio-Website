import { useEffect, useRef, useState } from "react";

const ParticlePortrait = ({ imageSrc = "/profile.png", color = "#1cb9d7" }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const linesRef = useRef([]);
  const burstRef = useRef({ id: 0, start: 0, active: false });
  const imageLoadedRef = useRef(false);
  const startTimeRef = useRef(null);
  const [size, setSize] = useState(500);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setSize(Math.min(320, width - 24));
      } else if (width <= 768) {
        setSize(Math.min(420, width - 48));
      } else {
        setSize(600);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const burst = () => {
      burstRef.current = {
        id: burstRef.current.id + 1,
        start: performance.now(),
        active: true,
        preset: burstRef.current.id % 3,
      };
    };
    document.addEventListener("hero-burst", burst);
    return () => document.removeEventListener("hero-burst", burst);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");
    // Particles always live in the 600px desktop coordinate space; the canvas
    // is scaled down as a whole so every screen shows the same composition.
    const canvasWidth = 600;
    const canvasHeight = 600;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const renderScale = (size / canvasWidth) * dpr;
    ctx.scale(renderScale, renderScale);

    let animationId;
    // Guards against a stale image load from a previous effect run (e.g. the
    // initial 500px pass on mobile) overwriting particles computed for the
    // current canvas size.
    let stale = false;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    imageLoadedRef.current = false;
    linesRef.current = [];

    // Load the image into an offscreen canvas and extract pixel data so we can inspect which pixels are visible.
    img.onload = () => {
      if (stale) return;
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      offscreen.width = canvasWidth;
      offscreen.height = canvasHeight;

      const scale = 0.9;
      const imgAspect = img.width / img.height;

      let drawHeight = canvasHeight * scale;
      let drawWidth = drawHeight * imgAspect;

      if (drawWidth > canvasWidth * scale) {
        drawWidth = canvasWidth * scale;
        drawHeight = drawWidth / imgAspect;
      }

      const offsetX = (canvasWidth - drawWidth) / 2;
      const offsetY = (canvasHeight - drawHeight) / 2;

      offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const imageData = offCtx.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixels = imageData.data;

      const lines = [];
      const rowGap = 5;

      for (let y = 0; y < canvasHeight; y += rowGap) {
        let x = 0;
        while (x < canvasWidth) {
          const i = (y * canvasWidth + x) * 4;
          const a = pixels[i + 3];

          if (a > 128) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const brightness = (r + g + b) / (3 * 255);

            const lineLength = Math.floor(3 + brightness * 11);

            const scatterRange = 10;
            const scatterX = (Math.random() - 0.5) * scatterRange;
            const scatterY = (Math.random() - 0.5) * scatterRange;

            const clampedX = Math.max(0, Math.min(canvasWidth - lineLength, x + scatterX));
            const clampedY = Math.max(0, Math.min(canvasHeight - 1, y + scatterY));
            
            // For each visible pixel, create a particle object that stores position, velocity, and visual properties.
            lines.push({
              x: clampedX,
              y: clampedY,
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              length: lineLength,
              baseAlpha: 0.5 + brightness * 0.5,
              currentAlpha: 0,
              delay: Math.random() * 0.3,
            });

            x += lineLength + 3;
          } else {
            x += 4;
          }
        }
      }

      linesRef.current = lines;
      imageLoadedRef.current = true;
      startTimeRef.current = performance.now();
    };
    // Constantly update and redraw particles every frame for smooth animation.
    const draw = () => {
      animationId = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (!imageLoadedRef.current) return;

      const lines = linesRef.current;
      const mouse = mouseRef.current;
      const now = performance.now();
      const elapsed = (now - startTimeRef.current) / 1000;

      // Burst presets, rotating per click: 0 shockwave ring, 1 vortex swirl,
      // 2 wind sweep left to right.
      const burst = burstRef.current;
      const waveCx = canvasWidth / 2;
      const waveCy = canvasHeight / 2;
      const maxWaveR = canvasWidth * 0.78;
      let waveR = -1;
      let sweepX = -1;
      let burstT = 0;
      if (burst.active) {
        burstT = (now - burst.start) / 1000;
        if (burst.preset === 0 || burst.preset === 1) {
          waveR = burstT * canvasWidth * 1.5;
          if (waveR > maxWaveR) {
            burst.active = false;
          } else if (burst.preset === 0) {
            ctx.strokeStyle = `rgba(28,185,215,${0.45 * (1 - waveR / maxWaveR)})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(waveCx, waveCy, waveR, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else if (burst.preset === 2) {
          sweepX = burstT * canvasWidth * 1.6;
          if (sweepX > canvasWidth) {
            burst.active = false;
          }
        }
      }

      lines.forEach((p) => {
        const particleTime = elapsed - p.delay;

        if (particleTime < 0) return;

        const fadeProgress = Math.min(particleTime / 1.5, 1);
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2);
        p.currentAlpha = p.baseAlpha * easedFade;

        const moveProgress = Math.min(particleTime / 2.5, 1);
        const easedMove = 1 - Math.pow(1 - moveProgress, 3);
        

        // Push particles away from the cursor to create interaction.
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 60;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        if (burst.active && p.burstId !== burst.id) {
          const bdx = p.x - waveCx;
          const bdy = p.y - waveCy;
          const bdist = Math.sqrt(bdx * bdx + bdy * bdy) || 1;
          const kick = (fx, fy) => {
            p.burstId = burst.id;
            p.hitTime = now;
            p.flash = 1;
            p.vx += fx;
            p.vy += fy;
          };
          if (burst.preset === 0 && bdist <= waveR) {
            const force = 10 + Math.random() * 8;
            kick((bdx / bdist) * force, (bdy / bdist) * force);
          } else if (burst.preset === 1 && bdist <= waveR) {
            const force = 9 + Math.random() * 6;
            kick(
              (-bdy / bdist) * force + (bdx / bdist) * force * 0.25,
              (bdx / bdist) * force + (bdy / bdist) * force * 0.25
            );
          } else if (burst.preset === 2 && p.x <= sweepX) {
            kick(8 + Math.random() * 7, (Math.random() - 0.5) * 4);
          }
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;

        // Recently kicked particles return on a springier setting so they
        // overshoot and wobble before settling.
        const sprung = p.hitTime && now - p.hitTime < 1600;
        const pullStrength = sprung ? 0.035 : 0.01 + easedMove * 0.07;
        const damping = sprung ? 0.96 : 0.92;
        p.vx += dx * pullStrength;
        p.vy += dy * pullStrength;

        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx;
        p.y += p.vy;

        if (p.flash > 0.01) {
          p.flash *= 0.94;
          const f = p.flash;
          const r = Math.round(28 + 227 * f);
          const g = Math.round(185 + 70 * f);
          const b = Math.round(215 + 40 * f);
          const a = Math.min(1, p.currentAlpha + f * 0.5);
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        } else {
          ctx.strokeStyle = `${color}${Math.round(p.currentAlpha * 255)
            .toString(16)
            .padStart(2, "0")}`;
        }
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y);
        ctx.stroke();
      });
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvasWidth / rect.width;
      const scaleY = canvasHeight / rect.height;
      mouseRef.current.x = (e.clientX - rect.left) * scaleX;
      mouseRef.current.y = (e.clientY - rect.top) * scaleY;
      mouseRef.current.active = true;
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);

    draw();

    return () => {
      stale = true;
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [imageSrc, size]);

  return (
    <canvas
      ref={canvasRef}
      className="block max-w-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "crosshair",
        background: "transparent",
      }}
    />
  );
};

export default ParticlePortrait;
