import { useMotionValue, useTransform, useScroll } from "motion/react";
import { RefObject, useEffect } from "react";

export const useProjectPageAnimation = (
  ref: RefObject<HTMLElement | null>,
  config: {
    imageOpacity?: [number, number];
    textOpacity?: [number, number];
    textY?: [number, number];
    overlayOpacity?: [number, number];
  } = {},
) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"],
  });

  // Text animations - fade and move up
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Image fade out animation
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Overlay gradient animation
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return {
    textOpacity,
    textY,
    imageOpacity,
    overlayOpacity,
  };
};

// Generic section scroll animation hook
export const useSectionScrollAnimation = (
  ref: RefObject<HTMLElement | null>,
  config: {
    opacityRange?: [number, number];
    yRange?: [number, number];
    scaleRange?: [number, number];
  } = {},
) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(
    scrollYProgress,
    config.opacityRange || [0, 1],
    config.opacityRange ? [0, 1] : [0, 1],
  );

  const y = useTransform(scrollYProgress, [0, 1], config.yRange || [100, 0]);

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    config.scaleRange || [0.8, 1],
  );

  return { opacity, y, scale };
};

// Initial load animation variants for container
export const containerLoadAnimation: any = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
};

// Initial load animation variants for subtitle
export const subtitleLoadAnimation: any = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
};

// Initial load animation variants for main text
export const mainTextLoadAnimation: any = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.4, ease: "easeOut" },
};

// Image load animation
export const imageLoadAnimation: any = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1, delay: 0, ease: "easeOut" },
};

// Section fade in animations for scroll-triggered sections
export const sectionFadeInAnimation: any = {
 
};

export const useProjectPageLoadAnimation = () => {
  // Initial load animations
  const titleInitialY = -50;
  const titleInitialOpacity = 0;

  const subtitleInitialY = -30;
  const subtitleInitialOpacity = 0;

  const descInitialY = -20;
  const descInitialOpacity = 0;

  return {
    titleInitialY,
    titleInitialOpacity,
    subtitleInitialY,
    subtitleInitialOpacity,
    descInitialY,
    descInitialOpacity,
  };
};
