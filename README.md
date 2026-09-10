# Farhan Ramadhan — Portfolio

Portfolio pribadi Farhan Ramadhan: Digital Marketing dengan background Teknik
Informatika. Dibangun dengan React + Vite, ditenagai GSAP untuk animasi dan
Lenis untuk smooth scroll.

## Tech Stack

- **React 19** + **Vite** — foundation & build tool
- **Tailwind CSS v4** — styling
- **GSAP** (+ ScrollTrigger) — semua animasi entrance & reveal
- **Lenis** — smooth scroll

## Struktur Project

```
src/
├── components/       Semua section (Hero, About, Skills, Projects, dst)
├── data/
│   └── projects.js   Data project — edit di sini untuk update/tambah project
├── hooks/
│   ├── useSmoothScroll.js   wiring Lenis + GSAP ScrollTrigger
│   └── useScrollReveal.js   reveal animation on scroll, dipakai berulang
└── App.jsx
```

## Menjalankan di Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Mengedit Konten

- **Data & teks project** → `src/data/projects.js`
- **Foto profil** → ganti `public/images/profile.jpg`
- **Screenshot project** → ganti file di `public/projects/{nama-project}/`
  (pertahankan nama file, atau update path-nya di `data/projects.js`)
- **Skills** → `src/components/Skills.jsx`
- **Sertifikasi & pendidikan** → `src/components/Certifications.jsx`
- **Kontak** → `src/components/Contact.jsx`

## Testing Checklist Sebelum Deploy

- [ ] `npm run build` berhasil tanpa error
- [ ] Cek tampilan di lebar layar: mobile (375px), tablet (768px), desktop (1280px+)
- [ ] Semua link di Navbar & tombol CTA mengarah ke section yang benar
- [ ] Lightbox project bisa dibuka/ditutup, navigasi gambar (panah & keyboard ←/→/Esc) berfungsi
- [ ] Link email & WhatsApp di section Contact benar-benar terhubung
- [ ] Tidak ada horizontal scroll yang tidak diinginkan di layar kecil

## Upload ke GitHub

```bash
cd portofolio
git init
git add .
git commit -m "Initial commit: portfolio Farhan Ramadhan"
```

Buat repository baru di [github.com/new](https://github.com/new) (jangan
centang "Add README", karena sudah ada), lalu:

```bash
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git branch -M main
git push -u origin main
```

Ganti `USERNAME` dan `NAMA-REPO` sesuai punya kamu.

## Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) → sign up/login (bisa langsung pakai akun GitHub)
2. Klik **Add New → Project**
3. Pilih repository GitHub yang barusan di-push
4. Vercel otomatis mendeteksi ini project Vite — biarkan setting default
   (Build Command: `vite build`, Output Directory: `dist`)
5. Klik **Deploy**, tunggu 1-2 menit
6. Selesai — kamu dapat URL publik (`nama-project.vercel.app`) yang bisa
   dicantumkan di CV/LinkedIn

Setiap kali kamu `git push` ke branch `main` setelah ini, Vercel otomatis
build & deploy ulang versi terbarunya.
