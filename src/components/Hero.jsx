import { motion } from "framer-motion";
import { styles } from "../styles";
import AnimatedParticle from "./AnimatedParticle";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const Hero = () => {
  const { lang } = useLang();
  const tr = t[lang].hero;

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(28,185,215,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        className={`${styles.paddingX} absolute inset-0 top-[60px] max-w-7xl mx-auto flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-12 lg:flex-row lg:justify-start`}
      >
        <div className="flex-none lg:flex-1 text-left">
          <motion.h1
            className={styles.heroHeadText}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {tr.greeting}{" "}
            <motion.span
              className="text-[#1cb9d7]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block" }}
            >
              Can
            </motion.span>
          </motion.h1>

          <motion.p
            className={`${styles.heroSubText} mt-4 text-secondary max-w-xl leading-[30px]`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
          >
            {tr.bio}
          </motion.p>
        </div>

        <div className="flex justify-center flex-1 w-full">
          <AnimatedParticle />
        </div>
      </div>
    </section>
  );
};

export default Hero;
