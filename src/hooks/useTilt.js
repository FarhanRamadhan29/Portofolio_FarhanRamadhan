import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Subtle 3D tilt that follows the cursor within a card, plus a gentle lift
// — the playful hover treatment used on the project cards.
export function useTilt(strength = 10) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return undefined;

    const rotateX = gsap.quickTo(el, "rotateX", {
      duration: 0.4,
      ease: "power3.out",
    });
    const rotateY = gsap.quickTo(el, "rotateY", {
      duration: 0.4,
      ease: "power3.out",
    });
    const lift = gsap.quickTo(el, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX(py * -strength);
      rotateY(px * strength);
    };

    const handleEnter = () => lift(-6);

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
      lift(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}
