import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { Tooltip } from "react-tooltip";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const Tech = () => {
  const { lang } = useLang();
  const tr = t[lang].tech;

  const resetAll = () => document.dispatchEvent(new CustomEvent('reset-balls'));

  return (
    <div className="relative">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{tr.sub}</p>
        <h2 className={styles.sectionHeadText}>{tr.head}</h2>
      </motion.div>

      <div className="mt-4">
        <button
          onClick={resetAll}
          className="bg-white/5 border border-white/20 rounded-lg px-4 py-1.5 text-[13px] text-white/60 hover:text-white hover:border-white/40 transition-colors duration-200 cursor-pointer"
        >
          ↺ Reset
        </button>
      </div>

      <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-6 justify-items-center">
        {technologies.map((tech) => (
          <div className="w-28 h-28" key={tech.name}>
            <a data-tooltip-id={`tech-${tech.name}`}>
              <BallCanvas icon={tech.icon} />
            </a>

            <Tooltip
              id={`tech-${tech.name}`}
              content={tech.name}
              offset={-15}
              place="top"
              style={{ backgroundColor: "rgb(0, 0, 28)", color: "white" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
