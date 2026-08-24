import { createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "../translations";

const LanguageContext = createContext();

const SITE = "https://cansahin.dev";

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const lang = location.pathname.startsWith("/fr") ? "fr" : "en";
  const toggle = () => navigate(lang === "en" ? "/fr/" : "/");

  useEffect(() => {
    const url = lang === "fr" ? `${SITE}/fr/` : `${SITE}/`;
    const meta = t[lang].meta;

    document.documentElement.lang = lang;
    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
