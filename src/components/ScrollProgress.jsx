import { useScroll, motion } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-[#1cb9d7]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
