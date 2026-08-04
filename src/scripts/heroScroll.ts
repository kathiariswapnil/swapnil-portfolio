import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScroll, refreshScroll } from "./lenis";

gsap.registerPlugin(ScrollTrigger);

export function initHeroScroll() {
  const section = document.querySelector<HTMLElement>(".hero-scroll-section");
  const sticky = document.querySelector<HTMLElement>(".hero-sticky");
  const beats = document.querySelectorAll<HTMLElement>(".hero-beat");
  const counters = document.querySelectorAll<HTMLElement>(".hero-counter");

  if (!section || !sticky || beats.length === 0) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || window.innerWidth < 768) {
    gsap.set(beats, { autoAlpha: 1, y: 0, clearProps: "transform" });
    counters.forEach((counter) => {
      counter.textContent = `${counter.dataset.target ?? 0}${counter.dataset.suffix ?? ""}`;
    });
    return;
  }

  initSmoothScroll();

  gsap.set(beats, { autoAlpha: 0, y: 28 });
  gsap.set(beats[0], { autoAlpha: 1, y: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: sticky,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Beat 1 → name
  tl.to(beats[0], { autoAlpha: 1, y: 0, duration: 0.08 }, 0)
    .to(beats[0], { autoAlpha: 0, y: -24, duration: 0.12 }, 0.22)

    // Beat 2 → thesis
    .to(beats[1], { autoAlpha: 1, y: 0, duration: 0.14 }, 0.28)
    .to(beats[1], { autoAlpha: 1, y: 0, duration: 0.2 }, 0.42)
    .to(beats[1], { autoAlpha: 0, y: -24, duration: 0.12 }, 0.58)

    // Beat 3 → metrics
    .to(beats[2], { autoAlpha: 1, y: 0, duration: 0.14 }, 0.64)
    .to(beats[2], { autoAlpha: 1, y: 0, duration: 0.28 }, 0.72);

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target ?? 0);
    const suffix = counter.dataset.suffix ?? "";
    const counterObj = { value: 0 };

    tl.to(
      counterObj,
      {
        value: target,
        duration: 0.2,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = `${Math.round(counterObj.value)}${suffix}`;
        },
      },
      0.66,
    );
  });

  refreshScroll();
}
