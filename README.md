# DigiLitera — Platform Edukasi Literasi Digital

> **Status: Prototype** — Proyek ini merupakan prototype yang dikembangkan sebagai bagian dari tugas UAS. Belum ditujukan untuk penggunaan produksi.

Platform pembelajaran literasi digital berbasis gamifikasi untuk siswa dari berbagai tingkat. Belajar materi, selesaikan tantangan interaktif, dan bersaing di papan skor.

---

## Tentang

DigiLitera hadir sebagai respons atas rendahnya literasi digital pelajar Indonesia di tengah tingginya penetrasi internet. Berbeda dari platform kuis seperti Kahoot atau Quizizz yang hanya menyediakan alat evaluasi kosong, DigiLitera mengintegrasikan materi dan kuis dalam satu paket yang siap pakai.

---

## Modul yang Tersedia

- **Hoaks & Misinformasi** — Jenis informasi palsu dan teknik verifikasi SIFT
- **Etika di Media Sosial** — Jejak digital, cyberbullying, dan prinsip THINK
- **Privasi & Keamanan Online** — Ancaman siber dan tiga pilar keamanan digital

---

## Fitur

- 5 tipe soal interaktif — Pilihan Ganda, Benar/Salah, Susun-Pasangkan, Temukan yang Salah, Simulasi Kasus
- Timer per soal dengan bonus poin kecepatan
- Sistem XP dan papan skor per modul
- Dark mode & Light mode
- Responsif di HP dan desktop
- Tidak perlu instalasi, akun, atau koneksi internet

---

## Struktur File

```
DigiLitera/
├── index.html
├── css/
│   ├── style.css
│   └── screens.css
├── js/
│   ├── app.js
│   └── quiz.js
└── modules/
    ├── mod-hoaks.js
    ├── mod-etika.js
    └── mod-privasi.js
```

---

## Cara Menjalankan

Clone repository lalu buka `index.html` langsung di browser. Atau akses versi online di GitHub Pages:

```
https://dheeznut.github.io/DigiLitera/
```

---

## Teknologi

HTML5 · CSS3 · Vanilla JavaScript · localStorage · Google Fonts

---

## Keterbatasan Prototype

- Skor tersimpan lokal di browser masing-masing, belum bisa dikompilasi lintas perangkat
- Belum ada dashboard guru untuk memantau progres siswa
- Efektivitas belum divalidasi melalui penelitian empiris
- Penambahan modul masih dilakukan secara manual via kode

---

## Contributors

- Dheznaia KT
- A1
- A2
