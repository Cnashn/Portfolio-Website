import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // dot follows mouse instantly (no spring)
  const dotX = mouseX;
  const dotY = mouseY;

  // ring lags behind with spring
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 22 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsTouch(true);
      return;
    }

    document.documentElement.style.cursor = "none";

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnter = (e) => {
      const el = e.target;
      if (
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a") ||
        el.closest("button") ||
        el.style.cursor === "pointer" ||
        window.getComputedStyle(el).cursor === "pointer"
      ) {
        setIsHovering(true);
      }
    };

    const onLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-[#1cb9d7]"
        style={{
          x: dotX,
          y: dotY,
          width: isHovering ? 6 : 5,
          height: isHovering ? 6 : 5,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full border border-[#1cb9d7]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
          opacity: isHovering ? 0.6 : 0.35,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
