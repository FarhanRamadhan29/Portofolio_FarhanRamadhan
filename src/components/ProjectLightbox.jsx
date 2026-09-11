import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import BrowserFrame from "./BrowserFrame";

function ProjectLightbox({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const imgRef = useRef(null);

  const gallery = project.gallery;
  const total = gallery.length;

  const goTo = (next) => {
    const clamped = (next + total) % total;
    if (clamped === index) return;

    gsap.to(imgRef.current, {
      opacity: 0,
      duration: 0.14,
      onComplete: () => {
        setIndex(clamped);
      },
    });
  };

  useEffect(() => {
    gsap.fromTo(
      imgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.22, ease: "power1.out" }
    );
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power1.out" }
    );
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.96, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const requestClose = () => {
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.97,
      y: 8,
      duration: 0.2,
      ease: "power1.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.22,
      onComplete: onClose,
    });
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) requestClose();
      }}
    >
      <div
        ref={panelRef}
        className="grid max-h-[90vh] w-full max-w-5xl gap-6 overflow-y-auto rounded-2xl bg-bg-soft p-4 sm:p-6 md:grid-cols-[1.4fr_1fr] md:gap-8"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Gallery */}
        <div>
          <BrowserFrame label={gallery[index].alt}>
            <img
              ref={imgRef}
              src={gallery[index].src}
              alt={gallery[index].alt}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Screenshot sebelumnya"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition-colors hover:bg-black/70 hover:text-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Screenshot berikutnya"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition-colors hover:bg-black/70 hover:text-white"
                >
                  ›
                </button>
              </>
            )}
          </BrowserFrame>

          {total > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {gallery.map((shot, i) => (
                <button
                  key={shot.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Lihat screenshot ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-ink/25"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-ink">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-ink/45">{project.tagline}</p>
            </div>

            <button
              type="button"
              onClick={requestClose}
              aria-label="Tutup"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:border-ink/30 hover:text-ink"
            >
              ✕
            </button>
          </div>

          <p className="mt-5 text-sm leading-6 text-ink/60">
            {project.description}
          </p>

          {project.features?.length > 0 && (
            <ul className="mt-5 space-y-2 text-sm text-ink/55">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                  {f}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/50"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform duration-300 hover:scale-105"
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-all duration-300 hover:border-ink/50 hover:bg-ink/5"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectLightbox;
