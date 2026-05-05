/* ═══════════════════════════════════════
   DigiLitera — Modul 1: Hoaks & Misinformasi
   modules/mod-hoaks.js
═══════════════════════════════════════ */

const MOD_HOAKS = {
  id: 0,
  title: "Hoaks & Misinformasi",
  short: "Hoaks",
  desc: "Kenali jenis informasi palsu, cara kerjanya, dan teknik verifikasi yang efektif.",
  icon: "📰",
  ic: "rgba(241,96,96,.15)",
  tags: [["tb","Pemula"], ["ta","±8 menit"]],

  pages: [
    {
      h: "Apa Itu Hoaks dan Mengapa Berbahaya?",
      p: `<strong>Hoaks</strong> adalah informasi yang sengaja dibuat atau disebarluaskan untuk menipu, mempengaruhi opini, atau menimbulkan kepanikan. Berbeda dari kesalahan biasa — hoaks dibuat dengan <strong>niat yang disengaja</strong>.\n\nDi era media sosial, satu hoaks bisa menjangkau jutaan orang dalam hitungan jam. Algoritma platform justru mempercepat penyebarannya, karena konten yang memancing emosi (marah, takut, kaget) lebih sering dibagikan tanpa dicek terlebih dahulu.`,
      facts: [
        { n: "6 jam", l: "Rata-rata waktu hoaks menyebar sebelum sanggahan resmi keluar" },
        { n: "10×",   l: "Disinformasi menyebar 10× lebih cepat dari berita benar (MIT, 2018)" },
        { n: "70%",   l: "Pengguna medsos pernah membagikan konten tanpa memverifikasinya dulu" },
        { n: "6 thn", l: "Ancaman hukuman penjara bagi penyebar hoaks di Indonesia (UU ITE)" }
      ],
      callout: { t: "w", v: "⚠️ Hukum: Menyebarkan hoaks di Indonesia dapat dijerat UU ITE Pasal 28 ayat 1 dengan ancaman pidana penjara hingga 6 tahun dan denda Rp1 miliar — bahkan jika kamu hanya meneruskan (forward) tanpa membuatnya." }
    },
    {
      h: "Tiga Jenis Informasi yang Perlu Kamu Bedakan",
      p: `Tidak semua informasi salah itu sama. Para peneliti membedakannya berdasarkan <strong>niat pembuatnya</strong> — dan ini penting untuk menentukan respons yang tepat.`,
      steps: [
        {
          n: "1", t: "Misinformasi",
          d: "Informasi yang salah, tetapi disebarkan TANPA niat menipu. Penyebarnya sendiri percaya informasi itu benar. Contoh: membagikan ulang artikel lama yang sudah tidak relevan atau sudah dibantah, karena tidak tahu tanggalnya."
        },
        {
          n: "2", t: "Disinformasi",
          d: "Informasi salah yang SENGAJA dibuat untuk menipu, memanipulasi, atau merugikan. Ini adalah bentuk paling berbahaya. Contoh: berita palsu tentang bencana yang belum terjadi, dibuat untuk menciptakan kepanikan atau keuntungan tertentu."
        },
        {
          n: "3", t: "Malinformasi",
          d: "Informasi yang BENAR, tetapi digunakan untuk merugikan seseorang. Contoh: foto asli seseorang yang disebarkan dengan konteks yang dimanipulasi untuk mempermalukannya, atau data valid yang dipotong agar terlihat mendukung narasi yang salah."
        }
      ],
      callout: { t: "i", v: "💡 Ciri-ciri cepat hoaks: judul menggunakan HURUF KAPITAL SEMUA, meminta kamu 'forward ke semua kontak', mengklaim 'fakta yang disembunyikan pemerintah/media', tidak ada nama penulis atau sumber yang jelas, atau disebarkan hanya melalui grup WhatsApp." }
    },
    {
      h: "Cara Verifikasi: Metode SIFT",
      p: `SIFT adalah metode verifikasi yang dikembangkan peneliti literasi digital Mike Caulfield. Metode ini terbukti efektif dan bisa dilakukan dalam <strong>kurang dari dua menit</strong> sebelum kamu memutuskan untuk membagikan sebuah informasi.`,
      steps: [
        { n: "S", t: "Stop — Berhenti Sejenak",         d: "Jangan langsung bereaksi atau membagikan. Tanyakan pada dirimu: apakah judul ini memancing emosiku? Perasaan kaget, marah, atau takut yang kuat adalah tanda peringatan untuk lebih berhati-hati." },
        { n: "I", t: "Investigate the Source",          d: "Siapa yang membuat konten ini? Apakah situsnya dikenal dan kredibel? Apakah ada nama penulis yang bisa dicari? Domain seperti '.com.co' atau nama yang meniru media besar adalah tanda bahaya." },
        { n: "F", t: "Find Better Coverage",            d: "Cari berita yang sama di sumber lain yang terpercaya. Jika hanya satu sumber yang memberitakan peristiwa besar, itu sangat mencurigakan. Berita nyata selalu diliput oleh banyak media." },
        { n: "T", t: "Trace Claims to the Origin",     d: "Lacak klaim hingga ke sumbernya yang paling asli. Seringkali foto atau data diambil dari konteks yang berbeda. Gunakan Google Reverse Image Search untuk mengecek asal usul sebuah foto." }
      ],
      tip: [
        "<strong>Cekfakta.com</strong> — kolaborasi resmi media-media besar Indonesia untuk cek fakta",
        "<strong>Turnbackhoax.id</strong> — database hoaks yang sudah terverifikasi oleh Mafindo",
        "<strong>Google Reverse Image Search</strong> — klik kanan foto, pilih 'Telusuri gambar' untuk cek keasliannya",
        "<strong>Snopes.com</strong> — untuk klaim dan berita dari luar negeri"
      ],
      callout: { t: "g", v: "✅ Ingat: Kamu tidak wajib membagikan setiap informasi yang kamu terima. Tidak berbagi sesuatu yang belum terverifikasi adalah tindakan bertanggung jawab, bukan ketidakpedulian." }
    }
  ],

  quiz: [
    {
      tp: "mcq",
      q: "Kamu menerima broadcast WhatsApp: 'PENTING!! Domino's Pizza terbukti pakai daging manusia — ini sudah diakui dokter!! Sebar ke semua!!' Tindakan pertama yang paling tepat adalah…",
      opts: [
        "Forward ke semua kontakmu sebagai peringatan",
        "Balas dengan marah ke pengirimnya",
        "Stop — terapkan SIFT, cek di Cekfakta.com sebelum menyebarkan",
        "Percaya saja karena dikirim oleh keluarga"
      ],
      ans: 2,
      ex: "Klaim bombastis tanpa sumber jelas adalah tanda utama hoaks. Selalu terapkan SIFT — Stop dulu, jangan langsung forward."
    },
    {
      tp: "tf",
      q: "Hanya membuat hoaks yang bisa kena hukum di Indonesia — yang sekadar meneruskan (forward) tidak bisa dipidana.",
      ans: false,
      ex: "SALAH. UU ITE menjerat siapa saja yang 'dengan sengaja menyebarkan' — termasuk yang meneruskan konten tanpa verifikasi. Ignorance is not a legal defense."
    },
    {
      tp: "stf",
      q: "Pilih SEMUA yang menunjukkan ciri-ciri hoaks:",
      items: [
        { head: "ARTIKEL A", body: "KPU: Jadwal pencoblosan Pilkada 2024 resmi ditetapkan 27 November", src: "kpu.go.id", fake: false },
        { head: "VIRAL!!!", body: "TERBUKTI!! Air rebusan daun sirih campur kunyit SEMBUHKAN diabetes stadium akhir dalam 3 hari!!!", src: "grupwasehat-indonesia.blogspot.net", fake: true },
        { head: "RISET", body: "WHO: Kualitas udara Jakarta masuk 10 terburuk di Asia Tenggara berdasarkan data IQAir 2024", src: "who.int & iqair.com", fake: false },
        { head: "URGENT!!!", body: "RAHASIA DIBONGKAR! Pemerintah sembunyikan vaksin yang menyebabkan chip 5G — sebar sebelum dihapus!", src: "[tidak ada sumber]", fake: true }
      ],
      correctFake: [1, 3],
      ex: "Ciri hoaks: klaim berlebihan & tanpa bukti ilmiah, sumber tidak kredibel atau tidak ada, bahasa panik dan memaksa untuk share, tidak mencantumkan penulis."
    },
    {
      tp: "drag",
      q: "Pasangkan jenis informasi palsu ke definisinya:",
      pairs: [
        { l: "Misinformasi",  m: "Salah tapi tidak ada niat menipu" },
        { l: "Disinformasi",  m: "Sengaja dibuat untuk menipu" },
        { l: "Malinformasi",  m: "Fakta benar yang dipakai untuk menyakiti" },
        { l: "Metode SIFT",   m: "Stop, Investigate, Find, Trace" }
      ]
    },
    {
      tp: "scenario",
      q: "Ibumu mengirim pesan: 'Nak, ada berita besok jam 3 sore ada gempa besar di Jakarta — sebar ke semua biar selamat!' Apa yang paling tepat kamu lakukan?",
      scenario: "Gempa bumi tidak bisa diprediksi jam pastinya oleh ilmu pengetahuan manapun di dunia — termasuk BMKG. Pesan seperti ini 100% adalah hoaks, dan sudah sering beredar dalam berbagai versi.",
      opts: [
        "Forward ke semua teman demi keselamatan bersama",
        "Cek di BMKG.go.id dan Cekfakta.com, lalu jelaskan dengan baik kepada ibumu mengapa pesan itu hoaks",
        "Abaikan saja tanpa memberi tahu ibumu",
        "Percaya saja, ibumu pasti sudah memverifikasi"
      ],
      ans: 1,
      ex: "Gempa TIDAK bisa diprediksi dengan jam spesifik. Selalu cek BMKG untuk informasi kebencanaan resmi. Mengedukasi keluarga dengan sopan adalah bagian penting dari literasi digital."
    }
  ]
};
