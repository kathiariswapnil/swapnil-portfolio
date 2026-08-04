import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initBackgroundAnimation() {
  const root = document.querySelector<HTMLElement>(".page-background");
  const art = document.querySelector<HTMLElement>(".page-background__art");
  const orbs = document.querySelectorAll<HTMLElement>(".page-background__orb");
  const flows = document.querySelectorAll<SVGPathElement>(
    ".page-background__flow",
  );
  const particles = document.querySelectorAll<HTMLElement>(
    ".page-background__particle",
  );

  if (!root || !art) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(art, { yPercent: 0, scale: 1.05 });
    return;
  }

  gsap.to(art, {
    yPercent: 12,
    scale: 1.12,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
    },
  });

  orbs.forEach((orb, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    gsap.to(orb, {
      x: direction * (40 + index * 18),
      y: 30 + index * 22,
      opacity: 0.55 + (index % 3) * 0.1,
      duration: 10 + index * 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.4,
    });
  });

  flows.forEach((flow, index) => {
    const length = flow.getTotalLength?.() ?? 1400;
    flow.style.strokeDasharray = `${length}`;
    flow.style.strokeDashoffset = `${length}`;

    gsap.to(flow, {
      strokeDashoffset: 0,
      duration: 8 + index * 2,
      ease: "power1.inOut",
      delay: 0.3 + index * 0.45,
    });

    gsap.to(flow, {
      opacity: 0.25 + (index % 2) * 0.15,
      duration: 5 + index,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.6,
    });
  });

  particles.forEach((particle, index) => {
    gsap.to(particle, {
      y: -24 - (index % 5) * 6,
      x: ((index % 3) - 1) * 14,
      opacity: 0.15 + (index % 4) * 0.12,
      duration: 4.5 + (index % 6) * 0.7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.2,
    });
  });

  gsap.to(".page-background__shimmer", {
    backgroundPosition: "200% 0%",
    duration: 14,
    repeat: -1,
    ease: "none",
  });
}
