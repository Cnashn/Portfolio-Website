import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  useMotionValue,
  animate,
} from "framer-motion";
import { technologies, projects } from "../constants";
import DinoGame from "./DinoGame";
import SnakeGame from "./SnakeGame";

const PROMPT = "guest@can.sh:~$";

const VIM_HINTS = [
  "You are trapped. Don't panic.",
  "Seriously, Ctrl+C won't save you here.",
  "Try typing a colon (:) followed by the magic letters...",
  "Fine. Type exactly this: :q!",
];

const HELLO_REPLIES = [
  "hi there.",
  "hello again.",
  "hey. still me.",
  "yes... hello.",
  "we need to talk about your social skills.",
];

const TRAIN = String.raw`      ====        ________
  _D _|  |_______/        \__I_I_____===__|________
   |(_)---  |   H\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|
__/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|
 |/-=|___|=    ||    ||    ||    |_____/~\___/
  \_/      \O=====O=====O=====O_/      \_/`;

const MATRIX_CHARS = "アイウエオカキクケコ01<>[]{}#$%&*+=?";

const MatrixRain = ({ onDone }) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const W = wrap.clientWidth;
    const H = wrap.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const colW = 14;
    const cols = Math.ceil(W / colW);
    const drops = Array.from({ length: cols }, () => -Math.random() * 30);

    let animationId;
    const draw = () => {
      animationId = requestAnimationFrame(draw);
      ctx.fillStyle = "rgba(1,12,42,0.16)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "13px ui-monospace, Menlo, monospace";
      for (let i = 0; i < cols; i++) {
        const ch = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const y = drops[i] * 16;
        ctx.fillStyle = "#bdf3ff";
        ctx.fillText(ch, i * colW, y);
        ctx.fillStyle = "rgba(28,185,215,0.75)";
        ctx.fillText(ch, i * colW, y - 16);
        drops[i]++;
        if (y > H && Math.random() > 0.975) drops[i] = -Math.random() * 10;
      }

      ctx.fillStyle = "rgba(1,12,42,0.7)";
      ctx.fillRect(W / 2 - 118, H - 27, 236, 20);
      ctx.fillStyle = `rgba(255,255,255,${0.55 + 0.3 * Math.sin(Date.now() / 350)})`;
      ctx.font = "11px ui-monospace, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillText("press any key to disconnect", W / 2, H - 13);
      ctx.textAlign = "left";
    };
    draw();

    const finish = () => onDoneRef.current();
    const timer = setTimeout(finish, 6000);
    const onKey = (e) => {
      e.preventDefault();
      e.stopPropagation();
      finish();
    };
    window.addEventListener("keydown", onKey, true);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey, true);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [mode, setMode] = useState("shell"); // shell | vim | dino | snake | matrix | sl
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [vimMsg, setVimMsg] = useState(null);
  const helloStreak = useRef(0);
  const vimAttempts = useRef(0);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const dragControls = useDragControls();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const closeRef = useRef(() => {});

  const snapHome = () => {
    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 28 });
    animate(dragY, 0, { type: "spring", stiffness: 300, damping: 28 });
  };

  const isGame = mode === "dino" || mode === "snake";
  const panelW = maximized ? 720 : isGame ? 560 : 400;
  const contentH = maximized ? 440 : isGame ? 340 : 260;

  // Ref-based dragConstraints go stale when the panel resizes, so bounds
  // are computed from the panel's home position (bottom-right, 20px/70px
  // insets) against a 12px viewport margin instead.
  const realW = Math.min(panelW, window.innerWidth - 40);
  const realH = 40 + (minimized ? 0 : contentH);
  const dragBounds = {
    left: 12 - (window.innerWidth - 20 - realW),
    right: 8,
    top: 12 - (window.innerHeight - 70 - realH),
    bottom: 58,
  };

  // Snap home when the panel grows so it never expands past the viewport.
  useEffect(() => {
    snapHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximized]);

  useEffect(() => {
    console.log(
      "%c CS %c can.sh %c\n\nBuilt with React, Tailwind and framer-motion.\nThere's a terminal in the bottom-right corner. Try 'help'.",
      "background:#1cb9d7;color:#010c2a;font-weight:bold;padding:2px 6px;border-radius:3px",
      "background:#010c2a;color:#1cb9d7;padding:2px 6px;border-radius:3px",
      "color:#a6afc3"
    );
  }, []);

  useEffect(() => {
    if (open && mode === "shell") {
      inputRef.current?.focus();
      setLines((l) =>
        l.length === 0
          ? [{ type: "out", text: "can.sh terminal. type 'help' to get started." }]
          : l
      );
    }
    if (open && mode === "vim") inputRef.current?.focus();
  }, [open, mode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, mode]);

  // Esc closes the terminal only from the plain shell; every other mode
  // owns its keys (games and matrix capture them, vim traps them).
  useEffect(() => {
    if (!open || mode !== "shell") return;
    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mode]);

  // Vim trap: escalating hints every 15s while stuck
  useEffect(() => {
    if (mode !== "vim") return;
    let hint = 0;
    const timer = setInterval(() => {
      if (hint < VIM_HINTS.length) {
        setVimMsg({ text: VIM_HINTS[hint], color: "hint" });
        hint++;
      }
    }, 15000);
    const onKey = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setVimMsg({ text: "Ctrl+C won't help you here. Type :q! to exit", color: "hint" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [mode]);

  const print = (texts, color) =>
    setLines((l) => [...l, ...texts.map((text) => ({ type: "out", text, color }))]);

  const startGame = (game, launchMsg) => {
    setMinimized(false);
    print([launchMsg]);
    setMode(game);
  };

  const endGame = (game, score) => {
    setMode("shell");
    print([`${game}: exited. score ${score}.`]);
  };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    setLines((l) => [...l, { type: "in", text: raw }]);

    if (cmd !== "hello" && cmd !== "hi") helloStreak.current = 0;

    switch (cmd) {
      case "":
        return;
      case "help":
        print([
          "UTILITIES:",
          "  whoami        who are you (and who am I)",
          "  stack         technologies I work with",
          "  projects      list shipped projects",
          "  contact       how to reach me",
          "  sudo hire-me  you know what to do",
          "  clear         clear the terminal",
          "  exit          close the terminal (or Esc)",
          "",
          "ARCADE:",
          "  dino          space to jump, q to quit",
          "  snake         arrows/wasd to steer, q to quit",
        ]);
        return;
      case "whoami":
        print([
          "guest",
          "you're browsing the portfolio of Can Sahin: a software engineer with a backend lean, based in Ottawa.",
        ]);
        return;
      case "stack":
        print([technologies.map((t) => t.name).join(", ")]);
        return;
      case "projects":
        print(projects.map((p) => `  * ${p.name}`));
        return;
      case "contact":
        print(["cansahin2001@gmail.com", "or use the form in the contact section."]);
        return;
      case "sudo hire-me":
      case "sudo hire me":
        print([
          "[sudo] password for guest: ********",
          "access granted. redirecting to contact...",
        ]);
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 900);
        return;
      case "rm -rf /":
      case "rm -rf /*":
        print(["nice try."]);
        return;
      case "ls":
        print(["about  work  tech  projects  contact"]);
        return;
      case "ls -la":
      case "ls -al":
      case "ls -a":
      case "la":
        print([
          "total 6",
          "drwxr-xr-x  guest  staff  about",
          "drwxr-xr-x  guest  staff  work",
          "drwxr-xr-x  guest  staff  tech",
          "drwxr-xr-x  guest  staff  projects",
          "drwxr-xr-x  guest  staff  contact",
          "-rw-------  can    staff  .secrets",
        ]);
        return;
      case "cat .secrets":
        print([
          "you found the hidden file.",
          "curiosity like this is how good engineers are made.",
          "mention '.secrets' when you reach out and I'll know you explored.",
          "- Can",
        ], "accent");
        return;
      case "pwd":
        print(["/home/guest/portfolio"]);
        return;
      case "hello":
      case "hi": {
        helloStreak.current = Math.min(helloStreak.current + 1, HELLO_REPLIES.length);
        print([HELLO_REPLIES[helloStreak.current - 1]]);
        return;
      }
      case "dino":
        startGame("dino", "launching dino... space to jump, q to quit.");
        return;
      case "snake":
        startGame("snake", "launching snake... arrows/wasd to steer, q to quit.");
        return;
      case "vim":
      case "vi":
        setVimMsg(null);
        vimAttempts.current = 0;
        setMode("vim");
        return;
      case "matrix":
        print(["entering the matrix..."]);
        setMode("matrix");
        return;
      case "sl":
        setMode("sl");
        return;
      case "clear":
        setLines([]);
        return;
      case "exit":
        closeRef.current();
        return;
      default:
        if (cmd.startsWith("cat ")) {
          print([`cat: ${raw.trim().slice(4)}: No such file or directory`]);
        } else if (cmd.startsWith("cat")) {
          print(["usage: cat <file>"]);
        } else {
          print([`zsh: command not found: ${cmd}. try 'help'.`]);
        }
    }
  };

  const vimSubmit = (raw) => {
    const cmd = raw.trim();
    if (cmd === ":q!") {
      setMode("shell");
      setVimMsg(null);
      print(["Welcome back to safety."], "accent");
    } else if (cmd === ":q" || cmd === ":wq" || cmd === ":x") {
      setVimMsg({
        text: "E37: No write since last change (add ! to override)\n(vim speak for: type :q! instead)",
        color: "error",
      });
    } else {
      vimAttempts.current++;
      const msg =
        vimAttempts.current === 1
          ? "Type :q! to exit"
          : vimAttempts.current === 2
          ? "Almost. It's :q! (colon, q, exclamation mark)"
          : "Type exactly this: :q! then press Enter";
      setVimMsg({ text: msg, color: "hint" });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (mode === "vim") {
      vimSubmit(input);
    } else {
      run(input);
      if (input.trim()) {
        setHistory((h) => [...h, input]);
      }
    }
    setHistIdx(-1);
    setInput("");
  };

  const onInputKeyDown = (e) => {
    if (mode !== "shell" || history.length === 0) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  const close = () => {
    setOpen(false);
    setMode("shell");
    setMinimized(false);
    setVimMsg(null);
    dragX.set(0);
    dragY.set(0);
  };
  closeRef.current = close;

  const lineColor = (line) =>
    line.color === "error"
      ? "text-red-400"
      : line.color === "accent"
      ? "text-[#1cb9d7]"
      : "text-secondary";

  const stopDrag = (e) => e.stopPropagation();

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
            drag
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={dragBounds}
            dragMomentum={false}
            dragElastic={0}
            style={{ x: dragX, y: dragY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, width: panelW }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="terminal-mono fixed bottom-[70px] right-5 z-40 max-w-[calc(100vw-2.5rem)] rounded-xl overflow-hidden border border-[#1cb9d7]/25 bg-[#010c2a]/95 backdrop-blur-xl shadow-[0_16px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(28,185,215,0.08)]"
          >
            <div
              onPointerDown={(e) => dragControls.start(e)}
              onDoubleClick={() => setMaximized((m) => !m)}
              title="drag to move, double-click to maximize"
              className="flex items-center px-4 py-2.5 bg-white/[0.04] border-b border-white/10 cursor-grab active:cursor-grabbing select-none touch-none"
            >
              <div className="group/lights flex items-center gap-2">
                <button
                  onPointerDown={stopDrag}
                  onClick={close}
                  aria-label="Close terminal"
                  className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center cursor-pointer"
                >
                  <svg
                    viewBox="0 0 8 8"
                    className="w-[7px] h-[7px] opacity-0 group-hover/lights:opacity-100 transition-opacity duration-150"
                  >
                    <path d="M1.5 1.5 L6.5 6.5 M6.5 1.5 L1.5 6.5" stroke="rgba(77,0,0,0.75)" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onPointerDown={stopDrag}
                  onClick={() => setMinimized((m) => !m)}
                  aria-label="Minimize terminal"
                  className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center cursor-pointer"
                >
                  <svg
                    viewBox="0 0 8 8"
                    className="w-[7px] h-[7px] opacity-0 group-hover/lights:opacity-100 transition-opacity duration-150"
                  >
                    <path d="M1.2 4 L6.8 4" stroke="rgba(90,60,0,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onPointerDown={stopDrag}
                  onClick={() => setMaximized((m) => !m)}
                  aria-label="Maximize terminal"
                  className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center cursor-pointer"
                >
                  <svg
                    viewBox="0 0 8 8"
                    className="w-[7px] h-[7px] opacity-0 group-hover/lights:opacity-100 transition-opacity duration-150"
                  >
                    <path d="M3.1 1.4 H6.6 V4.9 Z M4.9 6.6 H1.4 V3.1 Z" fill="rgba(0,70,0,0.75)" />
                  </svg>
                </button>
              </div>
              <span className="ml-3 text-[11px] text-secondary">
                {mode === "vim" ? "vim: trapped" : "guest@can.sh: ~"}
              </span>
            </div>

            <motion.div
              animate={{ height: minimized ? 0 : contentH }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {mode === "dino" && <DinoGame onExit={(s) => endGame("dino", s)} />}
              {mode === "snake" && <SnakeGame onExit={(s) => endGame("snake", s)} />}
              {mode === "matrix" && (
                <MatrixRain
                  onDone={() => {
                    setMode("shell");
                    print(["matrix: connection closed."]);
                  }}
                />
              )}
              {mode === "sl" && (
                <div className="relative w-full h-full overflow-hidden">
                  <motion.pre
                    initial={{ x: panelW }}
                    animate={{ x: -480 }}
                    transition={{ duration: 3.6, ease: "linear" }}
                    onAnimationComplete={() => {
                      setMode("shell");
                      print(["sl: you meant 'ls', didn't you?"]);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 text-[10px] leading-[1.3] text-[#1cb9d7] whitespace-pre"
                  >
                    {TRAIN}
                  </motion.pre>
                </div>
              )}
              {mode === "vim" && (
                <div className="flex flex-col h-full px-4 py-3 text-[12.5px] leading-[1.7]">
                  <div className="flex-1 overflow-hidden text-[#1cb9d7]/40">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <p key={i}>~</p>
                    ))}
                  </div>
                  <div className="flex justify-between text-secondary text-[11px] pb-1">
                    <span>"[No Name]"</span>
                    <span>0,0-1{"  "}All</span>
                  </div>
                  {vimMsg && (
                    <p
                      className={`whitespace-pre-line ${
                        vimMsg.color === "error" ? "text-red-400" : "text-[#febc2e]"
                      }`}
                    >
                      {vimMsg.text}
                    </p>
                  )}
                  <form onSubmit={onSubmit} className="flex items-center">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-white caret-[#1cb9d7] text-[12.5px]"
                      spellCheck={false}
                      autoComplete="off"
                      aria-label="Vim command input"
                    />
                  </form>
                </div>
              )}
              {mode === "shell" && (
                <div
                  ref={scrollRef}
                  className="h-full overflow-y-auto px-4 py-3 text-[12.5px] leading-[1.7] cursor-text"
                  onClick={() => inputRef.current?.focus()}
                >
                  {lines.map((line, i) =>
                    line.type === "in" ? (
                      <p key={i} className="text-white">
                        <span className="text-[#1cb9d7]">{PROMPT}</span> {line.text}
                      </p>
                    ) : (
                      <p key={i} className={`${lineColor(line)} whitespace-pre-wrap`}>
                        {line.text}
                      </p>
                    )
                  )}

                  <form onSubmit={onSubmit} className="flex items-center gap-2">
                    <span className="text-[#1cb9d7] flex-shrink-0">{PROMPT}</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onInputKeyDown}
                      className="flex-1 bg-transparent outline-none text-white caret-[#1cb9d7] text-[12.5px]"
                      spellCheck={false}
                      autoComplete="off"
                      aria-label="Terminal input"
                    />
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// The terminal needs a physical keyboard; skip it entirely on touch devices.
const TerminalGate = () => {
  if (window.matchMedia("(hover: none)").matches) return null;
  return <Terminal />;
};

export default TerminalGate;
