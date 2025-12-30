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
      <h2 className={styles.sectionHeadText}>Overview</h2>

    </motion.div>

    <motion.p variants={fadeIn("", "", 0.1, 1)}
    className="mt-4 text-secondary text-[18px] max-w-3xl leading-[30px]">
      
      From early on, I’ve been interested in how software systems behave in practice.
      I’ve built backend services and data-driven applications using Python, REST APIs, SQL, and React, with a focus on writing clear, maintainable code and understanding system behavior end to end.
      I recently graduated from the {" "}<span className="text-[#1cb9d7] font-bold">
              <a href="https://www.uottawa.ca/en" target="_blank">
                University of Ottawa
              </a>
            </span> and am looking for a software engineering role where I can contribute to real production systems, work closely with other engineers, and continue growing technically. My projects also include work with machine learning and data-intensive workflows, which has strengthened my approach to building and reasoning about complex systems.
    </motion.p>

    </>
  )
}
export default SectionWrapper(About, "about")