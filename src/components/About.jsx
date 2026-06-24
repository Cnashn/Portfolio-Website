import React from 'react'
import {motion}from 'framer-motion';

import {styles} from '../styles';
import {fadeIn, textVariant} from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

const About = () => {
  const { lang } = useLang();
  const tr = t[lang].about;

  return (
    <>
    <motion.div variants = {textVariant()}>
      <p className={styles.sectionSubText}>{tr.sub}</p>
      <h2 className={styles.sectionHeadText}>{tr.head}</h2>
    </motion.div>

    <motion.p variants={fadeIn("", "", 0.1, 1)}
    className="mt-4 text-secondary text-[18px] max-w-3xl leading-[30px]">
      {tr.body1}

        <br />
        <br />
      {tr.body2}{" "}<span className="text-[#1cb9d7] font-bold">
              <a href="https://www.uottawa.ca/en" target="_blank">{tr.body3}</a></span>{" "}{tr.body4}
    </motion.p>

    </>
  )
}
export default SectionWrapper(About, "about")
