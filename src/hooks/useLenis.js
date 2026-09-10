import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initLenis, destroyLenis } from "../lib/lenis";

gsap.registerPlugin(ScrollTrigger);

// Drives the whole page with Lenis' momentum/easing scroll instead of the
// browser's native scroll, keeps GSAP's ScrollTrigger in sync every frame,
// and intercepts in-page `#hash` link clicks so they animate through Lenis
// too (instead of the browser's own instant/CSS-smooth jump, which would
// otherwise run at the same time and make navigation feel jerky).
export function useLenis() {
  useEffect(() => {
    const lenis = initLenis();
    if (!lenis) return undefined;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -88, duration: 1.2 });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      gsap.ticker.remove(update);
      document.removeEventListener("click", handleAnchorClick);
      destroyLenis();
    };
  }, []);
}
