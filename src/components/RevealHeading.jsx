import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// A section heading whose words slide up out of a mask, staggered, the
// first time it scrolls into view — the same "bold" reveal language as the
// Hero heading, reused across About / Projects / Certifications / Contact
// so the whole site feels consistent.
function RevealHeading({ text, as: Tag = "h2", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const words = ref.current.querySelectorAll(".rh-word");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(words, { yPercent: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [text]);

  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word, i, arr) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="rh-word inline-block">
            {word}
            {i < arr.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export default RevealHeading;
