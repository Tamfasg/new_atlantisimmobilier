"use client";

import { useScroll, useSpring, useTransform } from "motion/react";
import { RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { refAnimationWrapper, yValueType } from "@/types";

// Ensure plugins are registered only on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.9,
      anchors: true,
      autoResize: true,
    });

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
export const usePageScroll = (ref: RefObject<refAnimationWrapper>) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return { scrollYProgress };
};

export const useFillScreenAnimation = (scrollY: yValueType) => {
  const rawTextY = useTransform(scrollY, [0, 0.75], [0, 90]);
  const scaleBg = useTransform(scrollY, [0, 0.65], [1, 0]);
  const rawBuildingY = useTransform(scrollY, [0, 0.5], ["-10vh", "5vh"]);
  
  const textY = useSpring(rawTextY, {
    stiffness: 70,
    damping: 25,
    mass: 1,
  });

  const buildingY = useSpring(rawBuildingY, {
    stiffness: 60,
    damping: 24,
    mass: 1,
  });

  

  const opacity = useTransform(scrollY, [0, 0.65], [1, 0]);

  return {
    opacity,
    textY,
    buildingY,
    scaleBg,
  };
};

export const useFadeInAnimation = (scrollY: yValueType) => {
  const rawY = useTransform(scrollY, [0, 0.5, 1], ["-45vh", "80vh", "145vh"]);
  const y = useSpring(rawY, {
    stiffness: 80,
    damping: 15,
     mass: 1
  })
  const rawOpacity = useTransform(scrollY, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const opacity =useSpring(rawOpacity, {
    stiffness: 100,
    damping: 12,
     mass: 0.8
  })
  return { y, opacity };
};

export const useShowUpSideAnimation = (scrollY: yValueType) => {
  const rawX = useTransform(scrollY, [0, 0.3], ["-50vw", "2vw"]);
  const rawRX = useTransform(scrollY, [0, 0.3], ["100vw", "60vw"]);

  const x = useSpring(rawX, {
    stiffness: 60,
    damping: 25,
    mass: 1.2,
  });

  const rx = useSpring(rawRX, {
    stiffness: 60,
    damping: 25,
    mass: 1.2,
  });

  const smoothProgress = useSpring(scrollY, {
    stiffness: 60,
    damping: 25,
    mass: 1.2,
  });

  const lineWidth = useTransform(smoothProgress, [0.1, 0.55], ["0%", "90%"]);

  return {
    x,
    rx,
    lineWidth,
  };
};

export const useFadeInSideAnimation = (scrollY: yValueType) => {
  const rawX = useTransform(scrollY, [0, 0.3], ["100vw", "0vw"]);
  const rawOpacity = useTransform(scrollY, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollY, [0, 0.45], [0.85, 1]);

  const x = useSpring(rawX, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });

  const opacity = useSpring(rawOpacity, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });

  const scale = useSpring(rawScale, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });

  return {
    x,
    opacity,
    scale,
  };
};

export const sectionFiveAnimation = (scrollY: yValueType) => {
  const rawY = useTransform(scrollY, [0, 0.1], ["0vh", "80vh"]);
  const rawOpacity = useTransform(scrollY, [0, 0.1], [0, 1]);
  const y = useSpring(rawY, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });
  const opacity = useSpring(rawOpacity, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });

  const rawy2 =  useTransform(scrollY, [0.5, 1] , ["0", "-10vh"])
  const y2 = useSpring(rawy2, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });

  return { y2,y, opacity };
};
export const sectionSixAnimation = (scrollY: yValueType) => {
  const rawY1 = useTransform(scrollY, [0, 0.5], ["-200px" , "100px"])
  const y = useSpring(rawY1, {
    stiffness: 80,
    damping: 10,
    mass: 1,
  })

  return {y}
}
