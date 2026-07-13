import { useRef } from "react";
import { motion, useAnimationControls, useScroll, useTransform } from "framer-motion";
import { styles } from "../styles";
import AnimatedParticle from "./AnimatedParticle";
import Aurora from "./Aurora";
import GradientText from "./GradientText/GradientText";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { LinkPreview } from "./ui/link-preview";
import uottawaPreviewEn from "../assets/uottawa-preview-en.jpg";
import uottawaPreviewFr from "../assets/uottawa-preview-fr.jpg";

const wordVariant = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      delay: 0.15 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Hero = () => {
  const { lang } = useLang();
  const tr = t[lang].hero;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const greetingWords = tr.greeting.split(" ");

  const canControls = useAnimationControls();

  const burstParticles = () => {
    document.dispatchEvent(new CustomEvent("hero-burst"));
    canControls.start({
      scale: [1, 0.9, 1],
      transition: { duration: 0.35, ease: "easeOut" },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen mx-auto overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(28,185,215,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
      <div className="aurora-blob absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#1cb9d7]/[0.06] blur-3xl pointer-events-none" />
      <div
        className="aurora-blob absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-[#804dee]/[0.05] blur-3xl pointer-events-none"
        style={{ animationDelay: "-9s" }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <Aurora
          colorStops={["#1cb9d7", "#7b95f4", "#804dee"]}
          amplitude={1.0}
          blend={0.9}
          speed={1.2}
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={`${styles.paddingX} absolute inset-0 top-[60px] max-w-7xl mx-auto flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-12 lg:flex-row lg:justify-start`}
      >
        <div className="flex-none lg:flex-1 text-left">
          <h1 className={styles.heroHeadText}>
            {greetingWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                custom={i}
                variants={wordVariant}
                initial="hidden"
                animate="show"
                className="inline-block mr-[0.28em]"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              custom={greetingWords.length}
              variants={wordVariant}
              initial="hidden"
              animate="show"
              title=""
              className="inline-block"
            >
              <motion.span
                animate={canControls}
                onClick={burstParticles}
                className="inline-block cursor-pointer select-none"
              >
              <GradientText
                colors={["#1cb9d7", "#6ee7ff","#4c68d5" ,"#804dee"]}
                animationSpeed={3}
                yoyo = {false}
                direction = "horizontal"
                className="!inline-flex !m-0 !font-black !rounded-none ![backdrop-filter:none]"
              >
                Can
              </GradientText>
              </motion.span>
            </motion.span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="origin-left mt-4 h-[2px] w-24 bg-gradient-to-r from-[#1cb9d7] to-transparent rounded-full"
          />

          <motion.p
            className={`${styles.heroSubText} mt-5 text-secondary max-w-xl leading-[30px] text-balance`}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
          >
            {tr.bio1}
            <span className="text-[#1cb9d7] font-bold whitespace-nowrap">
              <LinkPreview
                url={lang === "fr" ? "https://www.uottawa.ca/fr" : "https://www.uottawa.ca/en"}
                isStatic
                imageSrc={lang === "fr" ? uottawaPreviewFr : uottawaPreviewEn}
                className="link-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tr.bioUni}
              </LinkPreview>
            </span>
            {tr.bio2}
          </motion.p>
        </div>

        <motion.div
          className="flex justify-center flex-1 w-full"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedParticle />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 w-full flex justify-center items-center"
      >
        <a href="#work" aria-label="Scroll down">
          <div className="w-[30px] h-[52px] rounded-full border border-secondary/40 flex justify-center items-start pt-2 hover:border-[#1cb9d7]/60 transition-colors duration-300">
            <div className="scroll-dot w-1.5 h-1.5 rounded-full bg-[#1cb9d7]" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
