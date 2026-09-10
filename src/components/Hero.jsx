import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "../hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

// Wraps each character in its own overflow-hidden mask so it can be
// animated sliding up into view, word-wrapping still works normally.
function MaskedChars({ text, className = "" }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="inline-block">
            &nbsp;
          </span>
        ) : (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span className="char inline-block">
              {ch}
            </span>
          </span>
        )
      )}
    </span>
  );
}

// Same idea, one mask per word — used for the softer subheading line.
function MaskedWords({ text, className = "" }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split(" ").map((word, i, arr) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="word inline-block">
            {word}
            {i < arr.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const eyebrowWrapRef = useRef(null);
  const dotRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctasRef = useRef(null);
  const photoWrapRef = useRef(null);
  const photoRef = useRef(null);
  const blobsRef = useRef(null);

  const magnetic1 = useMagnetic(0.4);
  const magnetic2 = useMagnetic(0.4);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const chars = headingRef.current.querySelectorAll(".char");
    const words = subheadingRef.current.querySelectorAll(".word");
    const blobs = blobsRef.current ? blobsRef.current.children : [];

    if (prefersReducedMotion) {
      gsap.set(
        [
          eyebrowWrapRef.current,
          chars,
          words,
          paragraphRef.current,
          ...ctasRef.current.children,
          photoWrapRef.current,
        ],
        { opacity: 1, y: 0, x: 0, scale: 1, clearProps: "clipPath" }
      );
      return undefined;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom top",
        toggleActions: "restart reverse restart reverse",
      },
    });

    tl.fromTo(
      eyebrowWrapRef.current,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(
        dotRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.4, ease: "back.out(3)" },
        "<"
      )
      .fromTo(
        chars,
        { yPercent: 120, rotate: 6 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
        },
        "-=0.25"
      )
      .fromTo(
        words,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.6, stagger: 0.08 },
        "-=0.5"
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35"
      )
      .fromTo(
        ctasRef.current.children,
        { opacity: 0, y: 14, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: "back.out(2)",
        },
        "-=0.3"
      )
      .fromTo(
        photoWrapRef.current,
        {
          clipPath: "polygon(8% 0%, 8% 0%, 8% 100%, 0% 100%)",
          opacity: 1,
        },
        {
          clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.1,
          ease: "power4.inOut",
        },
        "-=0.9"
      )
      .fromTo(
        blobs,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(2.2)",
        },
        "-=0.5"
      );

    // Idle float on the photo, and on the decorative blobs — keeps the
    // hero feeling alive even once the intro settles.
    const floats = [];
    floats.push(
      gsap.to(photoRef.current, {
        y: 14,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    );
    Array.from(blobs).forEach((blob, i) => {
      floats.push(
        gsap.to(blob, {
          y: i % 2 === 0 ? -18 : 16,
          x: i % 2 === 0 ? 10 : -8,
          duration: 4 + i,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );
    });

    // Cursor parallax: the photo tilts and drifts very slightly toward
    // the pointer, like it's reacting to the visitor.
    const quickX = gsap.quickTo(photoWrapRef.current, "x", {
      duration: 0.7,
      ease: "power3.out",
    });
    const quickRotate = gsap.quickTo(photoWrapRef.current, "rotateY", {
      duration: 0.7,
      ease: "power3.out",
    });

    const handlePointerMove = (e) => {
      const relX = e.clientX / window.innerWidth - 0.5;
      quickX(relX * -18);
      quickRotate(relX * -6);
    };
    window.addEventListener("pointermove", handlePointerMove);

    // Scroll parallax: photo drifts up a touch slower than the page as
    // you scroll past the hero, text drifts up a touch faster.
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
    scrollTl
      .to(photoWrapRef.current, { y: -60, ease: "none" }, 0)
      .to(
        [headingRef.current, subheadingRef.current, paragraphRef.current],
        { y: -30, opacity: 0.4, ease: "none" },
        0
      );

    return () => {
      tl.kill();
      floats.forEach((f) => f.kill());
      scrollTl.kill();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-bg px-6 sm:px-10 lg:px-16 2xl:px-24"
      style={{ perspective: "1200px" }}
    >
      {/* Decorative floating accents — purely visual "liveliness" */}
      <div
        ref={blobsRef}
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <span className="absolute left-[46%] top-[18%] h-3 w-3 rounded-full bg-accent/60" />
        <span className="absolute left-[40%] top-[62%] h-2 w-2 rounded-full bg-ink/30" />
        <span className="absolute left-[58%] top-[80%] h-4 w-4 rounded-full border border-accent/50" />
        <span className="absolute left-[64%] top-[12%] h-2.5 w-2.5 rounded-full bg-accent/40" />
      </div>

      {/* Photo — fills the right side of the hero, cut on a soft diagonal
          and faded so it reads as part of the (now dark) Hero background.
          Desktop/tablet only; mobile gets a simple card below the text
          instead. */}
      <div
        ref={photoWrapRef}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block"
        style={{
          clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
          transformStyle: "preserve-3d",
        }}
      >
        <div ref={photoRef} className="h-full w-full">
          <img
            src="/images/hero-photo.jpg"
            alt="Farhan Ramadhan"
            className="h-full w-full object-cover object-top opacity-55"
            style={{ filter: "saturate(0.85) contrast(0.95)" }}
          />
          {/* Dark tint so the photo's tone sits with the dark page background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "color-mix(in srgb, var(--color-bg) 20%, transparent)",
              mixBlendMode: "multiply",
            }}
          />
          {/* Blend the photo's inner (left) edge into the dark background */}
          <div
            className="absolute inset-y-0 left-0 w-3/5"
            style={{
              background:
                "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)",
            }}
          />
          {/* Soften the top edge toward the dark background — kept light so
              the face (image is top-aligned) stays clearly visible */}
          <div
            className="absolute inset-x-0 top-0 h-1/5"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in srgb, var(--color-bg) 30%, transparent) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--color-bg) 55%, transparent) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[100rem]">
        <div className="w-full md:max-w-[46%] lg:max-w-[44%]">
          <div className="mb-5 flex items-center gap-2">
            <span
              ref={dotRef}
              className="inline-block h-2 w-2 rounded-full bg-accent"
            />
            <span
              ref={eyebrowWrapRef}
              className="overflow-hidden text-sm font-medium uppercase tracking-[0.25em] text-ink/75"
            >
              Hello, I'm
            </span>
          </div>

          <h1
            ref={headingRef}
            className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl md:text-6xl lg:text-7xl"
          >
            <MaskedChars text="Farhan Ramadhan" />
          </h1>

          <h2
            ref={subheadingRef}
            className="mt-6 text-2xl font-medium leading-tight text-ink sm:text-3xl"
          >
            <MaskedWords text="Digital Marketing" />
            <br />
            <MaskedWords
              text="with a tech background"
              className="text-ink/80"
            />
          </h2>

          <p
            ref={paragraphRef}
            className="mt-6 text-base leading-7 text-ink/85"
          >
            Lulusan S1 Teknik Informatika yang fokus di digital marketing
            strategy, content marketing, dan digital advertising — dibekali
            pemahaman teknis terhadap data dan tools yang jarang dimiliki
            marketer kebanyakan.
          </p>

          <div ref={ctasRef} className="mt-8 flex flex-wrap gap-4">
            <a
              ref={magnetic1}
              href="#projects"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-105"
            >
              View My Work
            </a>

            <a
              ref={magnetic2}
              href="#contact"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:border-ink/50 hover:bg-ink/5"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Mobile fallback: simple rounded photo card below the text */}
        <div className="mt-10 flex justify-center md:hidden">
          <div className="aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[2rem] border border-ink/10 bg-surface">
            <img
              src="/images/hero-photo.jpg"
              alt="Farhan Ramadhan"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
