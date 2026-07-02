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

    <div className="relative mt-6 max-w-3xl">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-1 bottom-1 w-[2px] origin-top rounded-full bg-gradient-to-b from-[#1cb9d7]/70 via-[#1cb9d7]/25 to-transparent"
      />

      <motion.p variants={fadeIn("", "", 0.1, 1)}
      className="pl-6 sm:pl-8 text-secondary text-[18px] leading-[32px]">
        {tr.body1}

          <br />
          <br />
        {tr.body2}{" "}<span className="text-[#1cb9d7] font-bold">
                <a className="link-underline" href={lang === 'fr' ? "https://www.uottawa.ca/fr" : "https://www.uottawa.ca/en"} target="_blank">{tr.body3}</a></span>{" "}{tr.body4}
      </motion.p>
    </div>

    </>
  )
}
export default SectionWrapper(About, "about")
