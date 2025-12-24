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
            Passionate about the intersection of software engineering<br className="sm:block hidden" />  and machine learning. Focused on delivering meaningful<br className="sm:block hidden" />  results through intuitive digital experiences.
          </p>
        </div>
      </div>
      <AnnCanvas />
    </section>
  )
}

export default Hero
