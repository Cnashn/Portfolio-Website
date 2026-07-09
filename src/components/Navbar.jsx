import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { linkedin, github, logo, menu, close } from "../assets";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { LinkPreview } from "./ui/link-preview";
import githubPreview from "../assets/github-preview.jpg";
import linkedinPreview from "../assets/linkedin-preview.jpg";

const SECTION_IDS = ["about", "work", "tech", "projects", "contact"];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle: toggleLang } = useLang();
  const tr = t[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the section currently in the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.sectionId);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const target = el.parentElement || el;
        target.dataset.sectionId = id;
        observer.observe(target);
      }
    });

    const onTop = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", onTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  const rightLinks = [
    { id: "", title: tr.home },
    { id: "about", title: tr.about },
    { id: "work", title: tr.work },
    { id: "tech", title: tr.tech },
    { id: "projects", title: tr.projects },
    { id: "contact", title: tr.contact },
  ];

  return (
    <nav
      className={`sm:px-16 px-6 w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-[#010c2a]/85 backdrop-blur-md shadow-[0_1px_0_rgba(28,185,215,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center mx-auto">
        <div className={`${toggle ? "hidden" : "flex"} items-center gap-5`}>
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
            <p className="text-white text-[18px] font-archivo font-bold cursor-pointer tracking-tight group-hover:text-[#1cb9d7] transition-colors duration-200">
              Can Sahin
            </p>
          </Link>

          <LinkPreview
            url="https://github.com/cnashn"
            isStatic
            imageSrc={githubPreview}
            side="bottom"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="opacity-70 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-200"
          >
            <img src={github} alt="GitHub" className="w-7 h-7 object-contain" />
          </LinkPreview>

          <LinkPreview
            url={lang === "fr" ? "https://www.linkedin.com/in/cansahin1/?locale=fr-FR" : "https://www.linkedin.com/in/cansahin1"}
            isStatic
            imageSrc={linkedinPreview}
            side="bottom"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="opacity-70 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-200"
          >
            <img src={linkedin} alt="LinkedIn" className="w-7 h-7 object-contain" />
          </LinkPreview>
        </div>

        <ul className="list-none hidden sm:flex flex-row gap-8 items-center">
          {rightLinks.map((link) => (
            <li
              key={link.id}
              className="relative cursor-pointer"
              onClick={() => setActive(link.id)}
            >
              <a
                href={`#${link.id}`}
                className={`font-medium text-[14px] tracking-wide transition-colors duration-200 ${
                  active === link.id ? "text-white" : "text-secondary hover:text-white"
                }`}
              >
                {link.title}
              </a>
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#1cb9d7] rounded-full shadow-[0_0_8px_rgba(28,185,215,0.6)]"
                />
              )}
            </li>
          ))}

          <li>
            <button
              onClick={toggleLang}
              className="font-medium text-[13px] border border-[#1cb9d7]/50 text-[#1cb9d7] px-3 py-1 rounded-full hover:bg-[#1cb9d7] hover:text-primary hover:border-[#1cb9d7] transition-all duration-200 cursor-pointer tracking-wider"
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
          </li>
        </ul>

        {/* Mobile */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[22px] h-[22px] object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => setToggle(!toggle)}
          />

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="w-full absolute top-full right-0 bg-[#010c2a]/95 backdrop-blur-md border-b border-white/5"
              >
                <ul className="list-none flex flex-col gap-1 px-6 py-6">
                  {rightLinks.map((link, i) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                      className={`font-medium cursor-pointer text-[16px] py-2 transition-colors duration-200 ${
                        active === link.id ? "text-[#1cb9d7]" : "text-secondary hover:text-white"
                      }`}
                      onClick={() => {
                        setToggle(false);
                        setActive(link.id);
                      }}
                    >
                      <a href={`#${link.id}`}>{link.title}</a>
                    </motion.li>
                  ))}

                  <li className="mt-2">
                    <button
                      onClick={() => { toggleLang(); setToggle(false); }}
                      className="font-medium text-[14px] border border-[#1cb9d7]/50 text-[#1cb9d7] px-4 py-1.5 rounded-full hover:bg-[#1cb9d7] hover:text-primary transition-all duration-200 cursor-pointer"
                    >
                      {lang === "en" ? "FR" : "EN"}
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
