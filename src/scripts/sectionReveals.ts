import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScroll } from "./lenis";

gsap.registerPlugin(ScrollTrigger);

export function initSectionReveals() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(".reveal-item", { opacity: 1, y: 0 });
    gsap.set(".timeline-line", { scaleY: 1 });
    return;
  }

  initSmoothScroll();

  const sections = document.querySelectorAll<HTMLElement>(".reveal-section");

  sections.forEach((section) => {
    const items = section.querySelectorAll<HTMLElement>(".reveal-item");

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const timelineLine = document.querySelector<HTMLElement>(".timeline-line");
  const timeline = document.querySelector<HTMLElement>(".timeline");

  if (timelineLine && timeline) {
    gsap.to(timelineLine, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top 70%",
        end: "bottom 60%",
        scrub: true,
      },
    });
  }
}
