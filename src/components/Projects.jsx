import { useState } from "react";
import projects from "../data/projects";
import BrowserFrame from "./BrowserFrame";
import ProjectLightbox from "./ProjectLightbox";
import RevealHeading from "./RevealHeading";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTilt } from "../hooks/useTilt";

function ProjectCard({ project, onClick }) {
  const tiltRef = useTilt(8);

  return (
    <button
      ref={tiltRef}
      type="button"
      data-project-card
      onClick={onClick}
      className="group text-left"
      style={{ transformStyle: "preserve-3d" }}
    >
      <BrowserFrame
        label={project.gallery[0].alt}
        className="transition-colors duration-300 group-hover:border-ink/25"
      >
        <img
          src={project.gallery[0].src}
          alt={project.gallery[0].alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </BrowserFrame>

      <div className="mt-4">
        <h3 className="text-base font-medium text-ink">{project.title}</h3>
        <p className="mt-1 text-sm text-ink/45">{project.tagline}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-full border border-ink/10 px-2.5 py-0.5 text-xs text-ink/40"
          >
            {t}
          </span>
        ))}
      </div>
    </button>
  );
}

function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useScrollReveal("[data-reveal], [data-project-card]");

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full bg-bg px-6 py-24 sm:px-10 lg:px-16 2xl:px-24"
      style={{ perspective: "1200px" }}
    >
      <div className="mx-auto w-full max-w-[100rem]">
        <RevealHeading
          text="Projects"
          className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        />
        <p data-reveal className="mt-3 max-w-lg text-sm leading-6 text-ink/45">
          Klik salah satu untuk lihat tampilan lengkapnya.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectLightbox
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}

export default Projects;
