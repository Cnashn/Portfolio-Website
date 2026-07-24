import { useEffect, useRef } from "react";
import ParticleWorker from "./particleWorker.js?worker";
import { ParticleScene, dispatchSceneMessage } from "./particleScene";

const RENDER_PAD = 1.8;

const squareSize = () => {
  const width = window.innerWidth;
  if (width <= 480) return Math.min(320, width - 24);
  if (width <= 768) return Math.min(420, width - 48);
  return 600;
};

const AnimatedParticle = () => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.style.position = "relative";
    host.style.overflow = "visible";

    const canvas = document.createElement("canvas");
    canvas.className = "block";
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.top = "50%";
    canvas.style.transform = "translate(-50%, -50%)";
    canvas.style.pointerEvents = "none";
    host.appendChild(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    const applySize = () => {
      const size = squareSize();
      host.style.width = `${size}px`;
      host.style.height = `${size}px`;
      const padded = size * RENDER_PAD;
      canvas.style.width = `${padded}px`;
      canvas.style.height = `${padded}px`;
      return { width: padded, height: padded, pad: RENDER_PAD };
    };

    let worker = null;
    let scene = null;
    const send = (message, transfer) => {
      if (worker) worker.postMessage(message, transfer);
      else if (scene) dispatchSceneMessage(scene, message);
    };

    const containerInfo = applySize();
    const initMessage = {
      type: "init",
      containerInfo,
      scroll: window.scrollY,
      devicePixelRatio: window.devicePixelRatio,
      reduced,
    };

    const forceMainThread = new URLSearchParams(window.location.search).has("mainthread");
    if (!forceMainThread && typeof canvas.transferControlToOffscreen === "function" && typeof Worker === "function") {
      worker = new ParticleWorker();
      const offscreen = canvas.transferControlToOffscreen();
      send({ ...initMessage, canvas: offscreen }, [offscreen]);
    } else {
      scene = new ParticleScene();
      send({ ...initMessage, canvas });
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const aspect = rect.width / rect.height;
      const x = (((event.clientX - rect.left) / rect.width) * aspect - aspect / 2) * RENDER_PAD;
      const y = (-((event.clientY - rect.top) / rect.height) * 1.25 + 0.625) * RENDER_PAD;
      send({ type: "mouse", position: [x, y] });
    };
    const onPointerEnd = () => {
      send({ type: "mouse", position: [-1000, -1000] });
    };
    const onScroll = () => {
      send({ type: "scroll", scroll: window.scrollY });
    };
    const onResize = () => {
      send({ type: "resize", containerInfo: applySize() });
    };
    const onVisibility = () => {
      send({ type: "visibility", visible: !document.hidden });
    };
    const onBurst = () => {
      send({ type: "burst" });
    };

    document.addEventListener("hero-burst", onBurst);

    if (!reduced && !isTouch) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerEnd);
      window.addEventListener("pointercancel", onPointerEnd);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("hero-burst", onBurst);
      if (worker) worker.terminate();
      if (scene) scene.destroy();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="block max-w-full" />;
};

export default AnimatedParticle;
