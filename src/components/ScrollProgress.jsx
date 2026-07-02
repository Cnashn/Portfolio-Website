import { useScroll, useSpring, motion } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] origin-left bg-gradient-to-r from-[#1cb9d7] via-[#6ee7ff] to-[#804dee] shadow-[0_0_10px_rgba(28,185,215,0.5)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
