import { useScrollReveal } from "../hooks/useScrollReveal";
import RevealHeading from "./RevealHeading";

const roles = [
  {
    title: "Dewan Pengawas Organisasi (DPO)",
    period: "2024 – 2025",
    description:
      "Mengawasi dan mengevaluasi pelaksanaan kegiatan serta kepengurusan organisasi.",
    photo: {
      src: "/organisasi/cert-1.jpg",
      alt: "Dokumentasi sebagai Dewan Pengawas Organisasi",
    },
  },
  {
    title: "Staff Konsumsi",
    period: "2023 – 2024",
    description:
      "Mendukung persiapan dan pelaksanaan kegiatan, termasuk membantu koordinasi anggota dan pembagian tugas untuk memenuhi kebutuhan konsumsi. Membantu mengarahkan anggota yang lebih muda serta berkoordinasi dengan anggota lain untuk memastikan kegiatan berjalan sesuai kebutuhan. Berkolaborasi dalam menangani permasalahan selama kegiatan, berdiskusi dengan ketua dan pihak terkait untuk menentukan solusi, serta membantu menerapkan hasil keputusan.",
    photo: {
      src: "/organisasi/cert-1.jpg",
      alt: "Dokumentasi sebagai Staff Konsumsi",
    },
  },
  {
    title: "Anggota Divisi Perlengkapan",
    period: "2022 – 2023",
    description:
      "Mendukung persiapan dan ketersediaan perlengkapan yang dibutuhkan untuk menunjang pelaksanaan kegiatan.",
    photo: {
      src: "/organisasi/cert-1.jpg",
      alt: "Dokumentasi sebagai Anggota Divisi Perlengkapan",
    },
  },
];

function Organisasi() {
  const sectionRef = useScrollReveal("[data-reveal]");

  return (
    <section
      id="organisasi"
      ref={sectionRef}
      className="w-full bg-bg px-6 py-24 sm:px-10 lg:px-16 2xl:px-24"
    >
      <div className="mx-auto w-full max-w-[100rem]">
        <RevealHeading
          text="Organisasi"
          className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        />
        <p data-reveal className="mt-4 max-w-2xl text-sm leading-6 text-ink/45">
          UKM Kesenian Xpressi — Universitas Putra Indonesia "YPTK" Padang ·
          2021 – 2025
        </p>

        <div className="mt-16 flex flex-col gap-16 lg:gap-20">
          {roles.map((role, index) => {
            const reversed = index % 2 === 1;

            return (
              <div
                key={role.title}
                data-reveal
                className={`flex flex-col items-center gap-8 lg:gap-16 ${
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* Description */}
                <div className="w-full lg:w-1/2">
                  <span className="text-sm font-medium tracking-[0.2em] text-accent">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/40">{role.period}</p>
                  <p className="mt-4 text-base leading-7 text-ink/65">
                    {role.description}
                  </p>
                </div>

                {/* Photo card */}
                <div className="w-full lg:w-1/2">
                  <div className="group aspect-4/3 overflow-hidden rounded-2xl border border-ink/15 bg-surface transition-colors duration-300 hover:border-accent/40">
                    <img
                      src={role.photo.src}
                      alt={role.photo.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Organisasi;
