import React from 'react'
import {motion}from 'framer-motion';

import {styles} from '../styles';
import {fadeIn, textVariant} from '../utils/motion';
import { SectionWrapper } from '../hoc';

const About = () => {
  return (
    <>
    <motion.div variants = {textVariant()}>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>

    </motion.div>

    <motion.p variants={fadeIn("", "", 0.1, 1)}
    className="mt-4 text-secondary text-[18px] max-w-3xl leading-[30px]">
      
      From early on, I was drawn to computers not just as tools, but as systems to understand.
      That curiosity led me to spend time working across backend development and machine learning, focusing on how software behaves in practice rather than in theory.
      I recently graduated from the {" "}<span className="font-bold">
              <a href="https://www.uottawa.ca/en" target="_blank">
                University of Ottawa
              </a>
            </span> and am actively seeking a role where I can work on real software, learn from experienced engineers, and continue improving my technical skills.
    </motion.p>

    </>
  )
}
export default SectionWrapper(About, "about")