import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { DECK, slides } from "../../lib/deck/content";
import { slideVariants } from "../../lib/deck/motion";
import { SlideBody } from "./SlideBody";
import { SlideCover } from "./SlideCover";

const STAGE_W = 1600;
const STAGE_H = 900;

function Ambient() {
  return (
    <>
      <motion.div
        className="bloom"
        style={{
          width: 980,
          height: 980,
          left: -260,
          top: -380,
          background: "radial-gradient(circle, rgba(201,242,77,0.09), rgba(201,242,77,0) 68%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bloom"
        style={{
          width: 860,
          height: 860,
          right: -220,
          bottom: -320,
          background: "radial-gradient(circle, rgba(127,168,184,0.11), rgba(127,168,184,0) 70%)",
        }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

export function Deck() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [scale, setScale] = useState(1);
  const wheelLock = useRef(0);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, next));
      setDir(clamped >= index ? 1 : -1);
      setIndex(clamped);
    },
    [index],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") {
        go(0);
      } else if (e.key === "End") {
        go(slides.length - 1);
      } else if (/^[1-9]$/.test(e.key)) {
        go(Number(e.key) - 1);
      } else if (e.key === "0") {
        go(9);
      } else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const onWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - wheelLock.current < 850) return;
    if (Math.abs(e.deltaY) < 24 && Math.abs(e.deltaX) < 24) return;
    wheelLock.current = now;
    go(index + ((e.deltaY || e.deltaX) > 0 ? 1 : -1));
  };

  const slide = slides[index];

  return (
    <div
      className="deck-root"
      onWheel={onWheel}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 55) go(index + (delta < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div
        className="deck-stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})`, boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}
      >
        <Ambient />
        <div className="grid-lines" />

        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={slide.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {slide.kind === "cover" ? <SlideCover slide={slide} /> : <SlideBody slide={slide} />}
          </motion.div>
        </AnimatePresence>

        <div className="grain" />

        {/* chrome */}
        <div className="absolute left-[72px] right-[72px] bottom-[76px]">
          <div style={{ height: 1, background: "var(--line)", position: "relative" }}>
            <motion.div
              animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ height: 1, background: "var(--lime)" }}
            />
          </div>
        </div>

        <div className="absolute left-[72px] right-[72px] bottom-[34px] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="mono text-[10px]" style={{ color: "var(--text-dim)" }}>
              {String(index + 1).padStart(2, "0")} / {slides.length}
            </span>
            <div className="flex items-center gap-2">
              <button className="ctl" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">
                <ChevronLeft size={16} strokeWidth={1.6} />
              </button>
              <button
                className="ctl"
                onClick={() => go(index + 1)}
                disabled={index === slides.length - 1}
                aria-label="Next slide"
              >
                <ChevronRight size={16} strokeWidth={1.6} />
              </button>
              <button
                className="ctl"
                onClick={() => {
                  if (document.fullscreenElement) void document.exitFullscreen();
                  else void document.documentElement.requestFullscreen?.();
                }}
                aria-label="Toggle fullscreen"
              >
                <Maximize2 size={15} strokeWidth={1.6} />
              </button>
            </div>
            <AnimatePresence>
              {index === 0 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="mono text-[10px]"
                  style={{ color: "var(--text-faint)" }}
                >
                  ← → to navigate · F for fullscreen
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-[7px]">
            {slides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${i + 1}`}
                className="dot"
                data-active={i === index}
                onClick={() => go(i)}
              />
            ))}
          </div>

          <span className="mono text-[10px]" style={{ color: "var(--text-faint)" }}>
            {DECK.deckNo}
          </span>
        </div>
      </div>
    </div>
  );
}
