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
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            cursor: 'pointer',
            padding: '6px 16px',
            fontSize: 13,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          ↺ Reset
        </button>
      </div>

      <div className="mt-6 grid grid-cols-8 gap-6 justify-items-center">
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
