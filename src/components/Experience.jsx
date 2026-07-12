import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { experiences } from "../constants";
import SpotlightCard from "./SpotlightCard";
import { BackgroundGradient } from "./ui/background-gradient";
import { Timeline } from "./ui/timeline";

const Card = ({ experience }) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
  >
  <BackgroundGradient containerClassName="rounded-2xl p-[2px]">
    <SpotlightCard
      className="bg-tertiary/90 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-[#1cb9d7]/30 hover:shadow-[0_8px_40px_rgba(28,185,215,0.08)] transition-[border-color,box-shadow] duration-300"
    >
      <div className="relative z-[2]">
        <p className="inline-block text-[#1cb9d7] text-[11px] font-medium tracking-wider uppercase mb-3 px-2.5 py-1 rounded-full border border-[#1cb9d7]/25 bg-[#1cb9d7]/[0.06]">
          {experience.date}
        </p>
        <h3 className="text-white font-archivo font-bold text-[20px] leading-tight">
          {experience.title}
        </h3>
        <p className="text-secondary text-[14px] font-medium mt-1">
          {experience.company_name}
        </p>
        <ul className="mt-4 space-y-2">
          {experience.points.map((point, i) => (
            <li key={i} className="flex gap-2 text-[13px] text-secondary leading-relaxed">
              <span className="text-[#1cb9d7] mt-1 flex-shrink-0">▸</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  </BackgroundGradient>
  </motion.div>
);

const Experience = () => {
  const { lang } = useLang();
  const tr = t[lang].experience;
  const translatedExperiences = t[lang].experiences.map((te, i) => ({
    ...experiences[i],
    ...te,
  }));

  const timelineData = translatedExperiences.map((experience) => ({
    icon: experience.icon,
    iconAlt: experience.company_name,
    iconBg: experience.iconBg,
    content: (
      <div className="max-w-2xl">
        <Card experience={experience} />
      </div>
    ),
  }));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{tr.sub}</p>
        <h2 className={styles.sectionHeadText}>{tr.head}</h2>
      </motion.div>

      <div className="mt-4">
        <Timeline data={timelineData} />
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
