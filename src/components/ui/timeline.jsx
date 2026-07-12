import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const measure = () =>
      setHeight(ref.current.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-10">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-24">
            <div className="sticky z-40 top-40 self-start">
              <div
                className="h-12 w-12 absolute left-2 rounded-full bg-tertiary border-2 border-[#1cb9d7]/30 shadow-[0_0_16px_rgba(28,185,215,0.2)] flex items-center justify-center"
                style={item.iconBg ? { background: item.iconBg } : undefined}
              >
                {item.icon ? (
                  <img
                    src={item.icon}
                    alt={item.iconAlt || ""}
                    className="w-[60%] h-[60%] object-contain"
                  />
                ) : (
                  <div className="h-4 w-4 rounded-full bg-[#1cb9d7]/40 border border-[#1cb9d7]/60" />
                )}
              </div>
            </div>

            <div className="relative pl-20 md:pl-24 pr-4 w-full">
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/10 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#1cb9d7] via-[#56d4f1] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
