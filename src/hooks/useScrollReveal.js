import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Reveals `selector` children (or the container itself, if no selector is
// given) with a bolder rise + subtle scale/rotate and a springy ease, every
// time the section scrolls into view — and reverses it out again when you
// scroll away, so the animation replays each time you come back (not just
// once on first load). Reduced motion still gets an instant, static show.
export function useScrollReveal(selector) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;

    const targets = selector
      ? ref.current.querySelectorAll(selector)
      : ref.current;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1, rotate: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 36, scale: 0.96, rotate: -1.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.6)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [selector]);

  return ref;
}
