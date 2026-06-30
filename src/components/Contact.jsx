import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

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
        <p className="text-[#1cb9d7] text-[20px] font-medium">{tr.email_label}</p>
        <p className="text-secondary text-[14px] mt-1">{tr.tagline}</p>
      </motion.div>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-10 flex flex-col gap-8"
      >
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-1 flex flex-col">
            <label className="text-secondary text-[14px] mb-2">{tr.name}</label>
            <input
              type="text"
              name="name"
              required
              className="bg-transparent border-b border-secondary text-white text-[16px] pb-2 outline-none focus:border-[#1cb9d7] transition-colors"
            />
            <ValidationError field="name" errors={state.errors} className="text-red-400 text-[12px] mt-1" />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-secondary text-[14px] mb-2">{tr.email}</label>
            <input
              type="email"
              name="email"
              required
              className="bg-transparent border-b border-secondary text-white text-[16px] pb-2 outline-none focus:border-[#1cb9d7] transition-colors"
            />
            <ValidationError field="email" errors={state.errors} className="text-red-400 text-[12px] mt-1" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-secondary text-[14px] mb-2">{tr.message}</label>
          <textarea
            name="message"
            rows={5}
            required
            className="bg-transparent border-b border-secondary text-white text-[16px] pb-2 outline-none resize-none focus:border-[#1cb9d7] transition-colors"
          />
          <ValidationError field="message" errors={state.errors} className="text-red-400 text-[12px] mt-1" />
        </div>

        <div className="flex justify-end items-center gap-4">
          {state.succeeded && (
            <p className="text-[#1cb9d7] text-[14px]">{tr.sent_msg}</p>
          )}
          <button
            type="submit"
            disabled={state.submitting || state.succeeded}
            className="border border-[#1cb9d7] text-[#1cb9d7] px-8 py-3 rounded-full text-[16px] font-medium hover:bg-[#1cb9d7] hover:text-primary transition-colors disabled:opacity-50 cursor-pointer"
          >
            {state.submitting ? tr.sending : state.succeeded ? tr.sent_btn : tr.submit}
          </button>
        </div>
      </motion.form>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
