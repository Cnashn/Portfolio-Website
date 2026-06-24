import { styles } from "../styles";
import AnimatedParticle from "./AnimatedParticle";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const Hero = () => {
  const { lang } = useLang();
  const tr = t[lang].hero;

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[60px] max-w-7xl mx-auto flex flex-col items-center gap-6 sm:gap-8 lg:gap-12 lg:flex-row`}
      >
        <div className="flex flex-row items-stretch gap-5 flex-1">
          <div className="flex flex-col items-center mt-5 self-stretch">
            <div className="w-5 h-5 rounded-full bg-[#1cb9d7] flex-shrink-0" />
            <div className="w-1 flex-1 bg-[#1cb9d7]" />
          </div>
          <div className="flex-1 text-left">
            <h1 className={`${styles.heroHeadText} text-white`}>
              {tr.greeting} <span className="text-[#1cb9d7]">Can</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-secondary max-w-3xl leading-[30px]`}>
              {tr.bio}
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
