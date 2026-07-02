import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import SpotlightCard from "./SpotlightCard";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const tileVariant = (index) => ({
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: index * 0.04,
    },
  },
});

const TechTile = ({ tech, index }) => (
  <motion.div variants={tileVariant(index)} className="w-full">
    <SpotlightCard
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="group aspect-square rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#1cb9d7]/40 hover:shadow-[0_8px_32px_rgba(28,185,215,0.12)] transition-[border-color,box-shadow] duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 p-3"
    >
      <img
        src={tech.icon}
        alt={tech.name}
        loading="lazy"
        className="relative z-[2] w-9 h-9 sm:w-11 sm:h-11 object-contain grayscale-[30%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(28,185,215,0.35)] transition-all duration-300"
      />
      <span className="relative z-[2] text-[10px] sm:text-[11px] font-medium tracking-wide text-secondary group-hover:text-white transition-colors duration-300 text-center leading-tight">
        {tech.name}
      </span>
    </SpotlightCard>
  </motion.div>
);

const Tech = () => {
  const { lang } = useLang();
  const tr = t[lang].tech;

  return (
    <div className="relative">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{tr.sub}</p>
        <h2 className={styles.sectionHeadText}>{tr.head}</h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-3 xs:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
        {technologies.map((tech, index) => (
          <TechTile key={tech.name} tech={tech} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
