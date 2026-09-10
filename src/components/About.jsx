import { useScrollReveal } from "../hooks/useScrollReveal";
import RevealHeading from "./RevealHeading";

const facts = [
  { label: "Pendidikan", value: "S1 Teknik Informatika" },
  { label: "Kampus", value: 'Universitas Putra Indonesia "YPTK" Padang' },
  { label: "IPK", value: "3.50 / 4.00" },
  { label: "Konsentrasi", value: "Artificial Intelligence" },
];

const skillGroups = [
  {
    title: "Digital Marketing",
    skills: [
      "Digital Marketing Strategy",
      "Content Marketing",
      "Social Media Marketing",
      "Email Marketing",
      "Content Planning",
      "Digital Advertising",
      "Marketing Analytics",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Canva",
      "CapCut",
      "Microsoft Excel",
      "Microsoft Word",
      "Microsoft PowerPoint",
      "Google Docs",
      "Google Sheets",
      "Looker Studio",
    ],
  },
  {
    title: "Teknis Pendukung",
    skills: ["HTML & CSS", "PHP", "Laravel", "Database"],
  },
];

function About() {
  const sectionRef = useScrollReveal("[data-reveal]");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-bg-soft px-6 py-24 sm:px-10 lg:px-16 2xl:px-24"
    >
      <div className="mx-auto grid w-full max-w-[100rem] gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* LEFT: About */}
        <div>
          <RevealHeading
            text="About"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          />

          <p data-reveal className="mt-6 text-base leading-7 text-ink/60">
            Saya lulusan S1 Teknik Informatika yang memilih fokus karier di
            digital marketing — khususnya digital marketing strategy, content
            marketing, email marketing, dan digital advertising. Pengalaman
            saya mencakup perencanaan strategi, eksekusi campaign, pengembangan
            konten, sampai analisis performa hasilnya.
          </p>

          <p data-reveal className="mt-4 text-base leading-7 text-ink/60">
            Background teknis dari kuliah jadi nilai tambah: saya paham cara
            kerja data, cara sebuah sistem dibangun, dan terbiasa mengoperasikan
            berbagai digital tools — jadi lebih mudah menerjemahkan strategi
            marketing menjadi eksekusi yang terukur.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
            {facts.map((fact) => (
              <div key={fact.label} data-reveal className="bg-surface p-6">
                <p className="text-xs uppercase tracking-[0.15em] text-ink/40">
                  {fact.label}
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-ink/85">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Skills */}
        <div>
          <RevealHeading
            text="Skills"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          />

          <div className="mt-6 flex flex-col gap-7">
            {skillGroups.map((group) => (
              <div key={group.title} data-reveal>
                <h3 className="text-sm font-medium text-ink/45">
                  {group.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-ink/10 px-3.5 py-1.5 text-sm text-ink/75 transition-colors duration-300 hover:border-ink/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
