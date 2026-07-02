import { useRef } from "react";
import { motion } from "framer-motion";

const SpotlightCard = ({ className = "", children, ...props }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SpotlightCard;
