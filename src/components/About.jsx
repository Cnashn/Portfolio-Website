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
      I’m interested in how software systems behave in practice, especially as they grow in complexity and scale. 
      Through academic and industry projects, I’ve worked on backend services, API-driven web applications, and data-intensive workflows, with an emphasis on writing maintainable code and understanding systems end to end.
      
        <br />
        <br />
      I recently graduated from the {" "}<span className="text-[#1cb9d7] font-bold">
              <a href="https://www.uottawa.ca/en" target="_blank">University of Ottawa</a></span> and I’m looking for a software engineering role where I can contribute to production systems, collaborate with other engineers, and continue developing strong backend and infrastructure fundamentals, with applied machine learning as a supporting skill.
    </motion.p>

    </>
  )
}
export default SectionWrapper(About, "about")