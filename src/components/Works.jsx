import {Tilt} from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { textVariant } from '../utils/motion';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';


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

const ProjectCard = ({index, name, description, tags, image, source_code_link}) => {

  return (
    <motion.div variants={cardVariant(index)}>

      <Tilt
        options={{
          max: 10,
          scale: 1.02,
          speed: 400,
          glare: false,
        }}
        className="bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:border-[#1cb9d7]/30 hover:shadow-[0_0_30px_rgba(28,185,215,0.1)] transition-all duration-300 p-5 rounded-2xl sm:w-[360px] w-full"
      >

        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
            onClick={() => window.open(source_code_link,"_blank")}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-archivo font-bold text-[18px] leading-tight">{name}</h3>
          <p className="mt-2 text-secondary text-[13px] leading-relaxed">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[12px] font-medium tracking-wide ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>

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
