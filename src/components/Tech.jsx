import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { Tooltip } from "react-tooltip";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Technologies I use</p>
        <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      </motion.div>

      <div className="mt-10 flex flex-wrap justify-center gap-10">
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
