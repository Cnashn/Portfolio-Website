import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-[inherit] z-[1] opacity-25 group-hover:opacity-60 blur-xl  transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#1cb9d7,transparent),radial-gradient(circle_farthest-side_at_100%_0,#6366f1,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#0891b2,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#010c2a)]"
        )} />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-[inherit] z-[1] opacity-55 group-hover:opacity-90 transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#1cb9d7,transparent),radial-gradient(circle_farthest-side_at_100%_0,#6366f1,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#0891b2,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#010c2a)]"
        )} />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
