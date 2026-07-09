import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';
import { Button as MovingBorderButton } from './ui/moving-border';

const fieldClasses =
  "bg-white/[0.03] border border-white/10 rounded-xl text-white text-[15px] px-4 py-3 outline-none placeholder-transparent focus:border-[#1cb9d7]/60 focus:bg-white/[0.05] focus:shadow-[0_0_24px_rgba(28,185,215,0.08)] transition-all duration-300";

const labelClasses =
  "text-secondary text-[12px] uppercase tracking-[0.15em] font-medium mb-2";

const Contact = () => {
  const [state, handleSubmit, resetForm] = useForm('mzdldpwn');
  const { lang } = useLang();
  const tr = t[lang].contact;
  const formRef = useRef(null);

  useEffect(() => {
    if (state.succeeded) {
      formRef.current?.reset();
      const timer = setTimeout(() => resetForm(), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, resetForm]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{tr.sub}</p>
        <h2 className={styles.sectionHeadText}>{tr.head}</h2>
      </motion.div>

      <motion.div variants={fadeIn("", "", 0.1, 1)} className="mt-4">
        <a
          href={`mailto:${tr.email_label}`}
          className="link-underline inline-block text-[#1cb9d7] text-[20px] font-medium"
        >
          {tr.email_label}
        </a>
        <p className="text-secondary text-[14px] mt-1">{tr.tagline}</p>
      </motion.div>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-10 flex flex-col gap-7 max-w-3xl"
      >
        <div className="flex flex-col sm:flex-row gap-7">
          <div className="flex-1 flex flex-col">
            <label htmlFor="contact-name" className={labelClasses}>{tr.name}</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              className={fieldClasses}
            />
            <ValidationError field="name" errors={state.errors} className="text-red-400 text-[12px] mt-1" />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="contact-email" className={labelClasses}>{tr.email}</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              className={fieldClasses}
            />
            <ValidationError field="email" errors={state.errors} className="text-red-400 text-[12px] mt-1" />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="contact-message" className={labelClasses}>{tr.message}</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            className={`${fieldClasses} resize-none`}
          />
          <ValidationError field="message" errors={state.errors} className="text-red-400 text-[12px] mt-1" />
        </div>

        <div className="flex justify-end items-center gap-4">
          <AnimatePresence>
            {state.succeeded && (
              <motion.p
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-[#1cb9d7] text-[14px] flex items-center gap-1.5"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                >
                  ✓
                </motion.span>
                {tr.sent_msg}
              </motion.p>
            )}
          </AnimatePresence>
          <MovingBorderButton
            type="submit"
            disabled={state.submitting || state.succeeded}
            borderRadius="9999px"
            duration={3500}
            containerClassName="group h-auto w-auto disabled:opacity-50 cursor-pointer"
            className="overflow-hidden text-[#1cb9d7] px-8 py-3 text-[15px] font-medium transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-[#1cb9d7] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-[1] group-hover:text-primary transition-colors duration-300">
              {state.submitting ? tr.sending : state.succeeded ? tr.sent_btn : tr.submit}
            </span>
          </MovingBorderButton>
        </div>
      </motion.form>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
