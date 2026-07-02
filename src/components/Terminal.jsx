import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { technologies, projects } from "../constants";

const PROMPT = "guest@can.sh:~$";

const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    console.log(
      "%c CS %c can.sh %c\n\nBuilt with React, Tailwind and framer-motion.\nThere's a terminal in the bottom-right corner. Try 'help'.",
      "background:#1cb9d7;color:#010c2a;font-weight:bold;padding:2px 6px;border-radius:3px",
      "background:#010c2a;color:#1cb9d7;padding:2px 6px;border-radius:3px",
      "color:#a6afc3"
    );
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      if (lines.length === 0) {
        setLines([{ type: "out", text: "can.sh terminal. type 'help' to get started." }]);
      }
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const echo = { type: "in", text: raw };

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "exit") {
      setOpen(false);
      return;
    }

    let out;
    switch (cmd) {
      case "":
        setLines((l) => [...l, echo]);
        return;
      case "help":
        out = [
          "available commands:",
          "  whoami        who are you (and who am I)",
          "  stack         technologies I work with",
          "  projects      list shipped projects",
          "  contact       how to reach me",
          "  sudo hire-me  you know what to do",
          "  clear         clear the terminal",
          "  exit          close the terminal (or press Esc)",
        ];
        break;
      case "whoami":
        out = [
          "guest",
          "you're browsing the portfolio of Can Sahin: software engineer,",
          "backend lean, based in Ottawa.",
        ];
        break;
      case "stack":
        out = [technologies.map((t) => t.name).join(", ")];
        break;
      case "projects":
        out = projects.map((p) => `  * ${p.name}`);
        break;
      case "contact":
        out = ["cansahin2001@gmail.com", "or use the form in the contact section."];
        break;
      case "sudo hire-me":
      case "sudo hire me":
        out = [
          "[sudo] password for guest: ********",
          "access granted. redirecting to contact...",
        ];
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 900);
        break;
      case "rm -rf /":
      case "rm -rf /*":
        out = ["nice try."];
        break;
      case "ls":
        out = ["about  work  tech  projects  contact"];
        break;
      case "pwd":
        out = ["/home/guest/portfolio"];
        break;
      default:
        out = [`zsh: command not found: ${cmd}. try 'help'.`];
    }

    setLines((l) => [...l, echo, ...out.map((text) => ({ type: "out", text }))]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open terminal"
        className="fixed bottom-5 right-5 z-40 font-mono text-[14px] text-[#1cb9d7] bg-[#010c2a]/80 backdrop-blur-md border border-[#1cb9d7]/30 rounded-lg px-3 py-2 hover:border-[#1cb9d7]/70 hover:shadow-[0_0_20px_rgba(28,185,215,0.25)] transition-all duration-300 cursor-pointer"
      >
        &gt;_<span className="animate-pulse">▌</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[70px] right-5 z-40 w-[400px] max-w-[calc(100vw-2.5rem)] rounded-xl overflow-hidden border border-[#1cb9d7]/25 bg-[#010c2a]/95 backdrop-blur-xl shadow-[0_16px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(28,185,215,0.08)]"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-secondary">guest@can.sh: ~</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
                className="ml-auto text-secondary hover:text-white text-[13px] leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div
              ref={scrollRef}
              className="h-[260px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-[1.7] cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) =>
                line.type === "in" ? (
                  <p key={i} className="text-white">
                    <span className="text-[#1cb9d7]">{PROMPT}</span> {line.text}
                  </p>
                ) : (
                  <p key={i} className="text-secondary whitespace-pre-wrap">{line.text}</p>
                )
              )}

              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <span className="text-[#1cb9d7] flex-shrink-0">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white caret-[#1cb9d7] font-mono text-[12.5px]"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
