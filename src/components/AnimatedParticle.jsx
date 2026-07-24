import { useEffect, useRef } from "react";
import ParticleWorker from "./particleWorker.js?worker";
import { ParticleScene, dispatchSceneMessage } from "./particleScene";

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

    const canvas = document.createElement("canvas");
    canvas.className = "block w-full h-full cursor-crosshair";
    host.appendChild(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applySize = () => {
      const size = squareSize();
      host.style.width = `${size}px`;
      host.style.height = `${size}px`;
      return { width: size, height: size };
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
      const x = ((event.clientX - rect.left) / rect.width) * aspect - aspect / 2;
      const y = -((event.clientY - rect.top) / rect.height) * 1.25 + 0.625;
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

    if (!reduced) {
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
      if (worker) worker.terminate();
      if (scene) scene.destroy();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="block max-w-full" />;
};

export default AnimatedParticle;
