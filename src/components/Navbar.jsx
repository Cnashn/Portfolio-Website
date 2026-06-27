import React, { useState } from "react";
import { Link } from "react-router-dom";
import { linkedin, github, logo, menu, close } from "../assets";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const { lang, toggle: toggleLang } = useLang();
  const tr = t[lang].nav;

  const rightLinks = [
    { id: "", title: tr.home },
    { id: "about", title: tr.about },
    { id: "work", title: tr.work },
    { id: "tech", title: tr.tech },
    { id: "projects", title: tr.projects },
    { id: "contact", title: tr.contact },
  ];

  return (
    <nav className="sm:px-16 px-6 w-full flex items-center py-4 fixed top-0 z-20 bg-[#001836]">
      <div className="w-full flex justify-between items-center mx-auto">

        <div className={`${toggle ? "hidden" : "flex"} items-center gap-6`}>

          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            <p className="text-white text-[22px] font-bold cursor-pointer">
              Can Sahin
            </p>
          </Link>

          <a
            href="https://github.com/cnashn"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <img src={github} alt="GitHub" className="w-9 h-9 object-contain" />
          </a>

          <a
            href="https://www.linkedin.com/in/cansahin1"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img src={linkedin} alt="LinkedIn" className="w-9 h-9 object-contain" />
          </a>

        </div>


        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {rightLinks.map((link) => (
            <li
              key={link.id}
              className={`font-poppins font-medium cursor-pointer text-[22px] transition-all ${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}

          <li>
            <button
              onClick={toggleLang}
              className="font-poppins font-medium text-[18px] border border-[#1cb9d7] text-[#1cb9d7] px-3 py-1 rounded-full hover:bg-[#1cb9d7] hover:text-primary transition-colors cursor-pointer"
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
            className="w-[26px] h-[26px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } w-full absolute top-full right-0 justify-center items-start pt-10 pb-10 bg-[#001836]`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {rightLinks.map((link) => (
                <li
                  key={link.id}
                  className={`font-poppins font-medium cursor-pointer text-[24px] ${
                    active === link.title ? "text-white" : "text-secondary"
                  } hover:text-white`}
                  onClick={() => {
                    setToggle(false);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}

              <li>
                <button
                  onClick={() => { toggleLang(); setToggle(false); }}
                  className="font-poppins font-medium text-[24px] border border-[#1cb9d7] text-[#1cb9d7] px-4 py-1 rounded-full hover:bg-[#1cb9d7] hover:text-primary transition-colors cursor-pointer"
                >
                  {lang === "en" ? "FR" : "EN"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
