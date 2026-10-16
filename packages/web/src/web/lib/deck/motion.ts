import type { Variants } from "motion/react";

export const EASE = "easeOut";

export const stagger = (each = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});

export const rise: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(7px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.72, ease: "easeOut" } },
};

export const riseFast: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export const slideVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 90,
    scale: 0.975,
    filter: "blur(10px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -70,
    scale: 0.975,
    filter: "blur(10px)",
    transition: { duration: 0.38, ease: "easeIn" },
  }),
};
