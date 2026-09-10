import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHeading from "./RevealHeading";
import { useMagnetic } from "../hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const cardRef = useRef(null);
  const ctaRef = useRef(null);
  const magnetic1 = useMagnetic(0.35);
  const magnetic2 = useMagnetic(0.35);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(cardRef.current, { opacity: 1, y: 0, scale: 1 });
      if (ctaRef.current) {
        gsap.set(ctaRef.current.children, { opacity: 1, y: 0, scale: 1 });
      }
      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 82%",
          end: "bottom top",
          toggleActions: "restart reverse restart reverse",
        },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.6)" }
      ).fromTo(
        ctaRef.current ? ctaRef.current.children : [],
        { opacity: 0, y: 14, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(2)",
        },
        "-=0.4"
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      className="w-full bg-bg px-6 py-24 sm:px-10 lg:px-16 2xl:px-24"
    >
      <div className="w-full">
        <div
          ref={cardRef}
          className="mx-auto max-w-3xl rounded-[2rem] border border-ink/10 bg-surface px-8 py-16 text-center sm:px-16"
        >
          <RevealHeading
            text="Mari berkolaborasi"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          />
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ink/50">
            Terbuka untuk peluang digital marketing maupun diskusi project.
            Kabari saja lewat email atau telepon.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              ref={magnetic1}
              href="mailto:farhanramadhan2929@gmail.com"
              className="break-all rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-105"
            >
              farhanramadhan2929@gmail.com
            </a>

            <a
              ref={magnetic2}
              href="https://wa.me/6281386559882"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:border-ink/50 hover:bg-ink/5"
            >
              +62 813-8655-9882
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
