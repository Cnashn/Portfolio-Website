import { motion } from 'framer-motion';
import { styles } from '../styles';
import { github, bluesky } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { textVariant } from '../utils/motion';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';
import SpotlightCard from './SpotlightCard';
import { BackgroundGradient } from './ui/background-gradient';


const cardVariant = (index) => ({
  hidden: { y: 32, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: [0.22, 1, 0.36, 1],
      duration: 0.5,
      delay: index * 0.1,
    },
  },
});

const ProjectCard = ({index, name, description, tags, image, source_code_link, bluesky_link}) => {

  return (
    <motion.div
      variants={cardVariant(index)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="sm:w-[360px] w-full h-full"
    >

      <BackgroundGradient containerClassName="rounded-2xl p-[2px] h-full" className="h-full">
      <SpotlightCard
        className="group bg-tertiary/90 backdrop-blur-sm border border-white/10 hover:border-[#1cb9d7]/40 hover:shadow-[0_8px_40px_rgba(28,185,215,0.12)] transition-[border-color,box-shadow] duration-500 p-5 rounded-2xl h-full flex flex-col">

          <div className="relative z-[2] w-full h-[230px] overflow-hidden rounded-xl">
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#010c2a]/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute inset-0 flex justify-end items-start gap-2 m-3">
              {bluesky_link && (
                <button
                  onClick={() => window.open(bluesky_link, "_blank")}
                  aria-label={`${name} on Bluesky`}
                  className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-[#010c2a]/70 backdrop-blur-md border border-white/20 hover:border-[#1cb9d7]/70 hover:bg-[#010c2a]/90 hover:scale-110 transition-all duration-300"
                >
                  <img src={bluesky} alt="bluesky" className="w-1/2 h-1/2 object-contain" />
                </button>
              )}
              <button
                onClick={() => window.open(source_code_link, "_blank")}
                aria-label={`${name} source code`}
                className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-[#010c2a]/70 backdrop-blur-md border border-white/20 hover:border-[#1cb9d7]/70 hover:bg-[#010c2a]/90 hover:scale-110 transition-all duration-300"
              >
                <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
              </button>
            </div>
          </div>

          <div className="relative z-[2] mt-5">
            <h3 className="text-white font-archivo font-bold text-[18px] leading-tight group-hover:text-[#1cb9d7] transition-colors duration-300">{name}</h3>
            <p className="mt-2 text-secondary text-[13px] leading-relaxed">{description}</p>
          </div>

          <div className="relative z-[2] mt-auto pt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-white/20 transition-colors duration-300 ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </BackgroundGradient>

    </motion.div>
  )
}



const Works = () => {
  const { lang } = useLang();
  const tr = t[lang].works;
  const translatedProjects = projects.map((p, i) => ({
    ...p,
    name: t[lang].projects[i].name,
    description: t[lang].projects[i].description,
  }));

  return (
    <>
    <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{tr.sub}</p>
          <h2 className={styles.sectionHeadText}>{tr.head}</h2>
        </motion.div>
    <div className="mt-20 flex flex-wrap gap-7">
      {translatedProjects.map((project, index) => (
        <ProjectCard
          key={`project-${index}`}
          index={index}
          {...project}
        />
      ))}
    </div>
    </>
  )
}

export default SectionWrapper(Works, "projects");
