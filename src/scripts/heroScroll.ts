import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScroll } from "./lenis";

gsap.registerPlugin(ScrollTrigger);

export function initHeroScroll() {
  const section = document.querySelector<HTMLElement>(".hero-scroll-section");
  const pinned = document.querySelector<HTMLElement>(".hero-pinned");
  const beats = document.querySelectorAll<HTMLElement>(".hero-beat");
  const counters = document.querySelectorAll<HTMLElement>(".hero-counter");

  if (!section || !pinned || beats.length === 0) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || window.innerWidth < 768) {
    gsap.set(beats, { opacity: 1, y: 0 });
    counters.forEach((counter) => {
      counter.textContent = `${counter.dataset.target ?? 0}${counter.dataset.suffix ?? ""}`;
    });
    return;
  }

  initSmoothScroll();

  gsap.set(beats, { opacity: 0, y: 32 });
  gsap.set(beats[0], { opacity: 1, y: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: pinned,
      scrub: 0.8,
      anticipatePin: 1,
    },
  });

  tl.to(beats[0], { opacity: 0, y: -24, duration: 0.3 }, 0.25)
    .to(beats[1], { opacity: 1, y: 0, duration: 0.35 }, 0.35)
    .to(beats[1], { opacity: 0, y: -24, duration: 0.3 }, 0.65)
    .to(beats[2], { opacity: 1, y: 0, duration: 0.35 }, 0.75);

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target ?? 0);
    const suffix = counter.dataset.suffix ?? "";
    const counterObj = { value: 0 };

    tl.to(
      counterObj,
      {
        value: target,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = `${Math.round(counterObj.value)}${suffix}`;
        },
      },
      0.78,
    );
  });
}
