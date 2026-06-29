import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { experiences } from "../constants";

const cardVariants = (side) => ({
  hidden: {
    x: side === "left" ? -60 : 60,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
});

const ExperienceCard = ({ experience, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-start w-full mb-16 last:mb-0">
      {/* Desktop: alternating layout */}
      <div className="hidden md:flex w-full items-start gap-0">
        {/* Left slot */}
        <div className="flex-1 flex justify-end pr-10">
          {isLeft && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants("left")}
              className="w-full max-w-sm"
            >
              <Card experience={experience} />
            </motion.div>
          )}
        </div>

        {/* Center line + icon */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#1cb9d7]/30 shadow-[0_0_16px_rgba(28,185,215,0.2)]"
            style={{ background: experience.iconBg }}
          >
            <img
              src={experience.icon}
              alt={experience.company_name}
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
          <div className="w-[1px] flex-1 bg-gradient-to-b from-[#1cb9d7]/40 to-transparent mt-2" style={{ minHeight: 60 }} />
        </div>

        {/* Right slot */}
        <div className="flex-1 flex justify-start pl-10">
          {!isLeft && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants("right")}
              className="w-full max-w-sm"
            >
              <Card experience={experience} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile: left-aligned single column */}
      <div className="flex md:hidden w-full items-start gap-4">
        <div className="flex flex-col items-center">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border border-[#1cb9d7]/30"
            style={{ background: experience.iconBg }}
          >
            <img
              src={experience.icon}
              alt={experience.company_name}
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
          <div className="w-[1px] flex-1 bg-gradient-to-b from-[#1cb9d7]/40 to-transparent mt-2" style={{ minHeight: 40 }} />
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants("right")}
          className="flex-1"
        >
          <Card experience={experience} />
        </motion.div>
      </div>
    </div>
  );
};

const Card = ({ experience }) => (
  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-[#1cb9d7]/20 transition-colors duration-300">
    <p className="text-[#1cb9d7] text-[12px] font-medium tracking-wider uppercase mb-3">
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
);

const Experience = () => {
  const { lang } = useLang();
  const tr = t[lang].experience;
  const translatedExperiences = t[lang].experiences.map((te, i) => ({
    ...experiences[i],
    title: te.title,
    company_name: te.company_name,
    date: te.date,
    points: te.points,
  }));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{tr.sub}</p>
        <h2 className={styles.sectionHeadText}>{tr.head}</h2>
      </motion.div>

      <div className="mt-16">
        {translatedExperiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
