import Lenis from "lenis";

let lenis = null;

// Single shared Lenis instance for the whole app. Everything that needs to
// scroll the page programmatically (nav links, the scroll-to-top button,
// hero CTAs) should go through `scrollToId` below instead of the browser's
// native `scrollIntoView`/anchor jump — running both at once is what made
// navigating between sections feel abrupt and heavy.
export function initLenis(options = {}) {
  if (lenis) return lenis;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return null;

  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    touchMultiplier: 1.1,
    ...options,
  });

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

// Smoothly scrolls to an element by id, accounting for the fixed navbar.
// Falls back to native smooth scroll if Lenis isn't running (e.g. reduced
// motion).
export function scrollToId(id, options = {}) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: -88, duration: 1.2, ...options });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
