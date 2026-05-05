/* ═══════════════════════════════════════
   DigiLitera — Modul 2: Etika di Media Sosial
   modules/mod-etika.js
═══════════════════════════════════════ */

const MOD_ETIKA = {
  id: 1,
  title: "Etika di Media Sosial",
  short: "Etika",
  desc: "Jejak digital, cyberbullying, hak privasi orang lain, dan cara berinteraksi yang bertanggung jawab.",
  icon: "💬",
  ic: "rgba(110,95,239,.16)",
  tags: [["tv","Penting"], ["tg","±9 menit"]],

  pages: [
    {
      h: "Jejak Digital: Lebih Permanen dari yang Kamu Kira",
      p: `Setiap aktivitas online meninggalkan <strong>jejak digital</strong> — mulai dari postingan, komentar, like, pencarian, hingga waktu kamu aktif. Jejak ini bisa tersimpan di server selamanya, di-screenshot orang lain dalam hitungan detik, diindeks mesin pencari, dan ditemukan bertahun-tahun kemudian.\n\nIni bukan untuk menakut-nakutimu. Ini agar kamu lebih <strong>sadar dan bijak</strong> dalam setiap tindakan online — karena dampaknya bisa sangat nyata di masa depan.`,
      facts: [
        { n: "70%", l: "Rekruter memeriksa profil medsos kandidat sebelum melakukan interview kerja" },
        { n: "54%", l: "Pernah menolak kandidat karena konten negatif yang ditemukan di media sosial" },
        { n: "10+", l: "Tahun rata-rata postingan SMA masih bisa ditemukan saat kamu melamar kerja" },
        { n: "∞",   l: "Server Meta dan Google menyimpan data pengguna secara praktis tanpa batas waktu" }
      ],
      callout: { t: "i", v: "💡 Coba sekarang: Ketik namamu di Google. Apa yang muncul? Itulah kesan pertama yang didapat rekruter, universitas, dan orang baru yang mencarimu. Apakah hasilnya sudah merepresentasikan dirimu dengan baik?" }
    },
    {
      h: "Cyberbullying: Lebih Serius dari Sekadar 'Bercanda'",
      p: `<strong>Cyberbullying</strong> adalah tindakan intimidasi, pelecehan, atau penghinaan yang dilakukan secara berulang melalui platform digital. Tiga hal yang membedakannya dari konflik biasa: ada <strong>ketidakseimbangan kekuatan</strong>, dilakukan secara <strong>berulang</strong>, dan pelaku sering merasa aman di balik <strong>anonimitas</strong>.\n\nBentuknya sangat beragam: komentar menyakitkan di postingan, menyebarkan rumor lewat DM, membuat akun palsu untuk mengejek, membagikan foto/video tanpa izin, hingga mengucilkan seseorang dari grup secara sengaja.`,
      steps: [
        {
          n: "1", t: "Dampak pada Korban",
          d: "Korban cyberbullying berisiko 2–9× lebih tinggi mengalami depresi dan kecemasan. Dampak lainnya: penurunan prestasi akademik, keinginan mengisolasi diri, dan dalam kasus berat dapat memicu krisis kesehatan mental yang serius."
        },
        {
          n: "2", t: "Kamu Punya Peran sebagai Bystander",
          d: "Mayoritas cyberbullying disaksikan banyak orang yang memilih diam. Padahal satu komentar positif, satu laporan, atau satu pesan empati dari kamu bisa benar-benar mengubah situasi bagi korban. Diam bukan netral — diam berarti membiarkan."
        },
        {
          n: "3", t: "Tanggung Jawab Hukum",
          d: "Cyberbullying di Indonesia dapat dijerat pasal pencemaran nama baik (UU ITE) dan perlindungan anak. Jika pelaku di bawah 18 tahun, orang tua bisa ikut bertanggung jawab secara hukum dan perdata."
        }
      ],
      callout: { t: "d", v: "🆘 Jika kamu jadi korban: (1) Simpan bukti dengan screenshot, (2) Jangan balas provokasi, (3) Blokir dan laporkan pelaku di platform, (4) Ceritakan kepada orang dewasa terpercaya — guru BK, orang tua, atau konselor. Kamu tidak perlu menghadapi ini sendiri." }
    },
    {
      h: "Prinsip THINK & Netiquette untuk Interaksi Sehat",
      p: `<strong>Netiquette</strong> (network etiquette) adalah sekumpulan norma tidak tertulis untuk berinteraksi sopan secara online. Prinsip dasarnya sederhana: perlakukan orang online sama seperti kamu ingin diperlakukan di dunia nyata.\n\nSebelum memposting atau mengirim apapun, terapkan filter <strong>THINK</strong> — lima pertanyaan yang butuh waktu kurang dari 10 detik namun bisa mencegah penyesalan jangka panjang:`,
      steps: [
        { n: "T", t: "True — Apakah ini benar?",          d: "Sudahkah informasi ini diverifikasi kebenarannya? Jangan bagikan sesuatu yang kamu sendiri belum yakin kebenarannya." },
        { n: "H", t: "Helpful — Apakah ini bermanfaat?",  d: "Apakah konten ini membantu orang lain, atau hanya memuaskan keinginan untuk berkomentar saat sedang emosi?" },
        { n: "I", t: "Inspiring — Apakah ini membangun?", d: "Apakah konten ini memberikan nilai positif, atau justru merendahkan dan merusak reputasi seseorang?" },
        { n: "N", t: "Necessary — Apakah perlu?",          d: "Apakah informasi ini benar-benar perlu dibagikan ke publik, atau bisa cukup disimpan sendiri?" },
        { n: "K", t: "Kind — Apakah ini baik hati?",      d: "Apakah konten ini akan menyakiti, mempermalukan, atau merugikan siapapun yang mungkin membacanya?" }
      ],
      tip: [
        "Minta izin sebelum menandai atau memposting foto orang lain — ini hak privasinya",
        "Jangan screenshot percakapan privat untuk disebarkan — itu adalah pelanggaran kepercayaan",
        "Gunakan fitur 'Report' di platform — fitur itu memang ada untuk dipakai, bukan diabaikan",
        "Beri jarak waktu sebelum membalas pesan ketika kamu sedang sangat emosi",
        "Bedakan fakta dan opini dalam diskusi: 'menurutku' berbeda dari 'faktanya adalah'"
      ]
    }
  ],

  quiz: [
    {
      tp: "mcq",
      q: "Apa yang membedakan cyberbullying dari konflik atau perdebatan biasa di internet?",
      opts: [
        "Cyberbullying hanya terjadi di platform media sosial besar",
        "Cyberbullying dilakukan berulang, ada ketidakseimbangan kekuatan, dan pelaku terlindungi anonimitas",
        "Cyberbullying tidak ada konsekuensi hukumnya karena terjadi di dunia maya",
        "Cyberbullying hanya berdampak sementara dan tidak serius"
      ],
      ans: 1,
      ex: "Tiga komponen yang mendefinisikan cyberbullying: tindakan berulang, ketidakseimbangan kekuatan, dan anonimitas yang membuat pelaku merasa aman tanpa konsekuensi."
    },
    {
      tp: "scenario",
      q: "Kamu melihat seorang teman sekelasmu diejek habis-habisan di kolom komentar foto Instagram-nya. Puluhan orang berkomentar jahat tentang penampilannya. Apa tindakan paling tepat?",
      scenario: "Kamu bukan pelaku, tapi kamu adalah saksi (bystander). Penelitian menunjukkan bahwa tindakan kecil dari bystander dapat secara signifikan mengubah situasi bagi korban bullying.",
      opts: [
        "Like komentar yang paling lucu supaya tidak dianggap tidak gaul",
        "Scroll lewat saja — itu bukan urusanmu dan bisa membahayakanmu",
        "Tinggalkan komentar positif di fotonya, laporkan komentar jahat, lalu DM dia untuk mengecek kondisinya",
        "Screenshot semua komentarnya dan kirim ke grup kelas sebagai bahan pembicaraan"
      ],
      ans: 2,
      ex: "Menjadi 'upstander' (yang berani bertindak positif) jauh lebih berdampak dari sekadar diam. Kombinasi: komentar positif + laporan + pesan empati = tindakan nyata yang bisa mengubah situasi korban."
    },
    {
      tp: "tf",
      q: "Menghapus postingan yang sudah terlanjur tersebar bisa sepenuhnya menghilangkan jejak digital tersebut dari internet.",
      ans: false,
      ex: "SALAH. Dalam detik pertama posting, puluhan orang bisa sudah men-screenshot. Search engine mungkin sudah mengindeksnya. Server platform menyimpan salinannya. Jejak digital bersifat praktis permanen."
    },
    {
      tp: "drag",
      q: "Pasangkan huruf THINK ke maknanya:",
      pairs: [
        { l: "T — True",       m: "Sudah diverifikasi kebenarannya" },
        { l: "H — Helpful",    m: "Bermanfaat bagi yang membaca" },
        { l: "N — Necessary",  m: "Benar-benar perlu dibagikan" },
        { l: "K — Kind",       m: "Tidak akan menyakiti siapapun" }
      ]
    },
    {
      tp: "stf",
      q: "Pilih SEMUA yang merupakan bentuk cyberbullying:",
      items: [
        { head: "SITUASI A", body: "Memberikan kritik membangun dan sopan terhadap presentasi teman di forum belajar online", src: "Interaksi konstruktif ✓", fake: false },
        { head: "SITUASI B", body: "Membuat polling anonim 'Siapa yang paling tidak layak ada di kelas kita?' lalu menyebarkan hasilnya", src: "", fake: true },
        { head: "SITUASI C", body: "Tag foto wisuda teman di Instagram dengan caption pujian, setelah meminta izin terlebih dahulu", src: "Etika digital ✓", fake: false },
        { head: "SITUASI D", body: "Membuat grup WhatsApp baru untuk seluruh kelas dan sengaja tidak mengundang satu orang tertentu", src: "", fake: true }
      ],
      correctFake: [1, 3],
      ex: "B dan D adalah cyberbullying karena ada niat jelas untuk menyakiti atau mengucilkan. Kritik sopan dengan izin (A dan C) adalah interaksi yang sehat dan tidak termasuk bullying."
    }
  ]
};
