import { styles } from "../styles";
import AnimatedParticle from "./AnimatedParticle";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[60px] max-w-7xl mx-auto flex flex-col items-center gap-12 lg:flex-row`}
      >
        <div className="flex flex-row items-start gap-5 flex-1">
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#1cb9d7]" />
            <div className="w-1 sm:h-60 h-40 bg-[#1cb9d7]" />
          </div>
          <div className="flex-1">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm <span className="text-[#1cb9d7]">Can</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-secondary text-[18px] max-w-3xl leading-[30px] `}>
              I’m a software engineer based in Canada, focused on building backend systems and data-driven applications, with a growing interest in machine learning. 
              I turn requirements into reliable software and improve existing systems over time.
            </p>
          </div>
        </div>
        <div className="flex justify-center flex-1 w-full">
          <AnimatedParticle />
        </div>
      </div>
    </section>
  );
};

export default Hero;
