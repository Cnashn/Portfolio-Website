import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
  };

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
        ref={formRef}
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
              value={form.name}
              onChange={handleChange}
              required
              className="bg-transparent border-b border-secondary text-white text-[16px] pb-2 outline-none focus:border-[#1cb9d7] transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-secondary text-[14px] mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-transparent border-b border-secondary text-white text-[16px] pb-2 outline-none focus:border-[#1cb9d7] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-secondary text-[14px] mb-2">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
            className="bg-transparent border-b border-secondary text-white text-[16px] pb-2 outline-none resize-none focus:border-[#1cb9d7] transition-colors"
          />
        </div>

        <div className="flex justify-end items-center gap-4">
          {error && (
            <p className="text-red-400 text-[14px]">Something went wrong. Please try again.</p>
          )}
          {sent && (
            <p className="text-[#1cb9d7] text-[14px]">Message sent!</p>
          )}
          <button
            type="submit"
            disabled={loading || sent}
            className="border border-[#1cb9d7] text-[#1cb9d7] px-8 py-3 rounded-full text-[16px] font-medium hover:bg-[#1cb9d7] hover:text-primary transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Sending...' : sent ? 'Sent!' : 'Submit'}
          </button>
        </div>
      </motion.form>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
