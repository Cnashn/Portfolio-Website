import React from 'react'

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {motion} from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';

import {styles} from '../styles';
import {experiences} from '../constants';
import {SectionWrapper} from '../hoc';
import {textVariant} from '../utils/motion';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

const ExperienceCard = ({experience}) => (
  <VerticalTimelineElement
  contentStyle={{background:'#001836',color:'#fff'}}
  contentArrowStyle={{borderRight: '7px solid #0169af'}}
  date={experience.date}
  iconStyle={{background: experience.iconBg}}
  icon={
    <div className="flex justify-center items-center w-full h-full">
      <img
      src={experience.icon}
      alt={experience.company_name}
      className="w-[60%] h-[60%] object-contain"
      />
    </div>
  }

  >
    <div>
      <h3 className="text-white text-[24px] font-bold">
        {experience.title}
      </h3>
      <p className="text-secondary text-[16px] font-semibold" style={{margin: 0}}>
        {experience.company_name}
      </p>
    </div>

    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((point, index) => (
        <li key={`experience-point-${index}`} className="text-white text-[14px] pl-1 tracking-wider">
          {point}
        </li>
      ))}
    </ul>

  </VerticalTimelineElement>
)

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
    <div className ="mt-20 flex flex-col">
      <VerticalTimeline>
        {translatedExperiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience}/>
        ))}
      </VerticalTimeline>
    </div>
    </>
  )
}

export default SectionWrapper(Experience, "work")
