import { useScrollReveal } from "../hooks/useScrollReveal";
import RevealHeading from "./RevealHeading";

const items = [
  {
    year: "2026",
    title: "Uji Kompetensi Digital Marketing",
    org: "BNSP",
    detail: "Lulus Asesmen",
  },
  {
    year: "2026",
    title: "Digital Marketing Bootcamp",
    org: "Haltev",
    detail: "Telah menyelesaikan program pelatihan",
  },
  {
    year: "2021 – 2025",
    title: "S1 Teknik Informatika",
    org: 'Universitas Putra Indonesia "YPTK" Padang',
    detail: "IPK 3.50 · Konsentrasi Artificial Intelligence",
  },
];

const certificatePhotos = [
  { src: "/certifications/cert-1.jpg", alt: "Sertifikat Digital Marketing BNSP" },
  { src: "/certifications/cert-1.jpg", alt: "Sertifikat Digital Marketing Bootcamp Haltev" },
];

function Certifications() {
  const sectionRef = useScrollReveal("[data-reveal]");

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="w-full bg-bg-soft px-6 py-24 sm:px-10 lg:px-16 2xl:px-24"
    >
      <div className="mx-auto grid w-full max-w-[100rem] gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
        <div>
          <RevealHeading
            text="Certifications & Education"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          />

          <div className="mt-10 divide-y divide-ink/10 border-t border-ink/10">
            {items.map((item) => (
              <div
                key={`${item.title}-${item.year}`}
                data-reveal
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-base font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/45">
                    {item.org} — {item.detail}
                  </p>
                </div>
                <span className="text-sm text-ink/35">{item.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-ink/45">
            Sertifikat
          </h3>

          <div className="mt-5 grid grid-cols-2 gap-4">
            {certificatePhotos.map((cert) => (
              <div
                key={cert.src}
                data-reveal
                className="aspect-3/4 overflow-hidden rounded-2xl border border-ink/15 bg-surface"
              >
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certifications;
