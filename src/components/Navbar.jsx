import { useEffect, useState } from "react";
import { SECTIONS } from "../data/sections";
import { scrollToId } from "../lib/lenis";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = SECTIONS.filter((s) => s.id !== "hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full px-6 py-5 backdrop-blur-md transition-colors duration-300 sm:px-10 lg:px-16 2xl:px-24 ${
        scrolled ? "bg-bg/85" : "bg-bg/35"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavigate("hero")}
          className="text-lg font-semibold tracking-tight text-ink"
        >
          Farhan Ramadhan
        </button>

        <div className="hidden items-center gap-8 text-sm text-ink/80 md:flex">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNavigate(id)}
              className={`group relative pb-1 transition-all duration-200 hover:scale-105 hover:text-ink active:scale-90 ${
                activeSection === id ? "text-ink" : ""
              }`}
            >
              {label}
              {activeSection === id ? (
                <span className="absolute -bottom-0 left-0 h-px w-full bg-accent" />
              ) : (
                <span className="absolute -bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent/70 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 text-ink/85 transition-transform duration-200 hover:scale-110 active:scale-90 md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-4 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`w-full overflow-hidden transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "mt-4 max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-bg/95 p-2 backdrop-blur">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNavigate(id)}
              className={`rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 hover:scale-[1.02] hover:bg-ink/5 hover:text-ink active:scale-95 ${
                activeSection === id ? "text-ink" : "text-ink/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
