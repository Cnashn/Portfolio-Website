import {motion} from 'framer-motion';
import { styles } from '../styles';
import { AnnCanvas} from './canvas';





const Hero = () => {
  return (
        
    <section className ="relative w-full h-screen mx-auto ">
      <div  className ={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className ="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#1cb9d7]"/>
          <div className="w-1 sm:h-60 h-40 bg-[#1cb9d7]"/>
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>Hi, I'm <span className = "text-[#1cb9d7]">Can</span></h1>
          <p className = {`${styles.heroSubText} mt-2 text-white-100`}>
            Software Engineer building backend systems and APIs in Python,<br className="sm:block hidden" />  with experience across data processing and machine learning projects.<br className="sm:block hidden" /> I enjoy turning requirements into working software and improving existing systems over time.
          </p>
        </div>
      </div>
      <AnnCanvas />
    </section>
  )
}

export default Hero
