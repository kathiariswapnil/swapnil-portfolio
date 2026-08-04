import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let initialized = false;

export function initSmoothScroll() {
  if (initialized) return lenisInstance;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || window.innerWidth < 768) {
    initialized = true;
    return null;
  }

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  initialized = true;

  return lenisInstance;
}
