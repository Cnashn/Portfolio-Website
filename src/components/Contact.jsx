import React from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const Contact = () => {
  const [state, handleSubmit] = useForm('mzdldpwn');

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Get in Touch</p>
        <h2 className={styles.sectionHeadText}>Contact</h2>
      </motion.div>

      <motion.div variants={fadeIn("", "", 0.1, 1)} className="mt-4">
        <p className="text-[#1cb9d7] text-[20px] font-medium">cansahin2001@gmail.com</p>
        <p className="text-secondary text-[14px] mt-1">Feel free to reach out with any inquiries or questions!</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-10 flex flex-col gap-8"
      >
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-1 flex flex-col">
            <label className="text-secondary text-[14px] mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              className="bg-transparent border-b border-secondary text-white text-[16px] pb-2 outline-none focus:border-[#1cb9d7] transition-colors"
            />
            <ValidationError field="name" errors={state.errors} className="text-red-400 text-[12px] mt-1" />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-secondary text-[14px] mb-2">Email Address</label>
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
          <label className="text-secondary text-[14px] mb-2">Message</label>
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
            <p className="text-[#1cb9d7] text-[14px]">Message sent!</p>
          )}
          <button
            type="submit"
            disabled={state.submitting || state.succeeded}
            className="border border-[#1cb9d7] text-[#1cb9d7] px-8 py-3 rounded-full text-[16px] font-medium hover:bg-[#1cb9d7] hover:text-primary transition-colors disabled:opacity-50 cursor-pointer"
          >
            {state.submitting ? 'Sending...' : state.succeeded ? 'Sent!' : 'Submit'}
          </button>
        </div>
      </motion.form>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
