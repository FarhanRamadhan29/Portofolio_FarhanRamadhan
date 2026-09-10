const projects = [
  {
    id: "sikripsi",
    title: "Sistem Pakar Diagnosa Aritmia",
    tagline: "Web PHP & MySQL — Skripsi S1 Teknik Informatika",
    description:
      "Sistem pakar berbasis web untuk membantu mendiagnosa potensi gangguan irama jantung (aritmia) secara dini, dengan mengombinasikan dua metode penalaran: Certainty Factor dan Dempster-Shafer. Pengguna memilih gejala yang dialami, dan sistem menampilkan proses perhitungan kedua metode secara transparan sebelum menyimpulkan kemungkinan penyakit beserta tingkat keyakinannya.",
    tech: ["PHP", "MySQL", "Certainty Factor", "Dempster-Shafer"],
    features: [
      "Diagnosa mandiri berdasarkan gejala, dengan hasil dan persentase keyakinan",
      "Visualisasi proses perhitungan Certainty Factor & Dempster-Shafer step-by-step",
      "Riwayat diagnosa per pengguna, bisa dicetak sebagai laporan",
      "Panel admin lengkap: kelola data gejala, penyakit, bobot, rule CF, hingga data pengguna",
    ],
    gallery: [
      { src: "/projects/sikripsi/1-login.jpg", alt: "Halaman login" },
      { src: "/projects/sikripsi/2-dashboard.jpg", alt: "Dashboard pengguna" },
      { src: "/projects/sikripsi/3-form-diagnosa.jpg", alt: "Form pilih gejala" },
      { src: "/projects/sikripsi/4-hasil-diagnosa.jpg", alt: "Proses perhitungan CF & Dempster-Shafer" },
      { src: "/projects/sikripsi/5-riwayat.jpg", alt: "Riwayat diagnosa" },
      { src: "/projects/sikripsi/6-dashboard-admin.jpg", alt: "Dashboard admin" },
      { src: "/projects/sikripsi/7-kelola-gejala.jpg", alt: "Kelola data gejala" },
    ],
    demoUrl: "",
    githubUrl: "",
  },
  {
    id: "konten-video",
    title: "Anak Paus Minum Susu?",
    tagline: "YouTube Shorts — @DYK_Verse",
    description:
      "Konten edukasi singkat bergaya animasi yang dirancang dan diproduksi dari nol: riset topik, penulisan naskah, penyusunan visual per-scene, hingga proses editing dan publikasi sebagai Shorts.",
    tech: ["CapCut", "Content Planning", "Video Editing"],
    features: [
      "Riset & penulisan naskah konten edukasi ringan",
      "Penyusunan timeline multi-layer: visual, teks, musik, dan voice over",
      "Publikasi & optimasi format untuk YouTube Shorts",
    ],
    gallery: [
      { src: "/projects/konten-video/1-hasil-tayang.jpg", alt: "Hasil tayang di YouTube Shorts" },
      { src: "/projects/konten-video/2-proses-editing.jpg", alt: "Proses editing di CapCut" },
    ],
    demoUrl: "",
    githubUrl: "",
  },
];

export default projects;
