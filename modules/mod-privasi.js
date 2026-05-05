/* ═══════════════════════════════════════
   DigiLitera — Modul 3: Privasi & Keamanan Online
   modules/mod-privasi.js
═══════════════════════════════════════ */

const MOD_PRIVASI = {
  id: 2,
  title: "Privasi & Keamanan Online",
  short: "Privasi",
  desc: "Nilai data pribadi, ancaman siber nyata, dan tiga pilar kebiasaan yang melindungimu online.",
  icon: "🔒",
  ic: "rgba(31,212,160,.12)",
  tags: [["tg","Kritis"], ["tp","±9 menit"]],

  pages: [
    {
      h: "Data Pribadi: Asetmu yang Paling Berharga",
      p: `Di era digital, <strong>data adalah mata uang baru</strong>. Setiap klik, like, pencarian, lokasi, dan waktu aktifmu memiliki nilai ekonomi yang nyata. Perusahaan teknologi membangun bisnis bernilai miliaran dolar dari data penggunanya — dan ini legal karena kamu sudah mencentang "Setuju" di Terms of Service yang tidak pernah dibaca.\n\nData pribadi meliputi: nama lengkap, NIK, nomor HP, tanggal lahir, alamat, foto wajah, sidik jari, lokasi real-time, nomor rekening, dan kata sandi. Kombinasi beberapa data ini bisa digunakan untuk <strong>mencuri identitasmu</strong> (identity theft).`,
      facts: [
        { n: "4,5 jt", l: "Akun data warga Indonesia bocor dalam satu insiden breach di 2023" },
        { n: "$162",   l: "Nilai rata-rata satu set data lengkap seseorang di dark web" },
        { n: "100+",   l: "Data poin yang secara tidak sadar kamu bagikan setiap hari via medsos" },
        { n: "3 mnt",  l: "Waktu yang dibutuhkan peretas untuk masuk akun dengan password lemah" }
      ],
      callout: { t: "w", v: "💰 'Jika produknya gratis, kemungkinan besar kamulah produknya.' — prinsip ini berlaku untuk hampir semua aplikasi media sosial, quiz online, dan layanan gratis. Kamu membayar dengan datamu, bukan uangmu." }
    },
    {
      h: "Empat Ancaman Siber yang Paling Umum Menyerang Remaja",
      p: `Ancaman digital tidak hanya datang dari peretas bersenjata kode rumit. Mayoritas serangan siber justru memanfaatkan <strong>kelengahan manusia</strong>, bukan kelemahan teknologi. Kenali empat ancaman yang paling sering menyerang pengguna muda:`,
      steps: [
        {
          n: "1", t: "Phishing",
          d: "Email, SMS, atau pesan palsu yang menyamar sebagai entitas terpercaya (bank, marketplace, pemerintah) untuk mencuri data sensitif. Ciri utamanya: domain mencurigakan, bahasa yang mendesak dan menakutkan, meminta password atau OTP."
        },
        {
          n: "2", t: "Social Engineering",
          d: "Manipulasi psikologi untuk membuat korban secara sukarela memberikan informasi rahasia. Contoh klasik: 'Ini CS Tokopedia, akun kamu diretas, tolong berikan kode OTP untuk kami amankan.' Bank dan platform resmi TIDAK PERNAH meminta OTP."
        },
        {
          n: "3", t: "Password Spraying",
          d: "Peretas mencoba ribuan kombinasi password umum (123456, namakamu+tahun lahir, password123) secara otomatis ke banyak akun sekaligus menggunakan program komputer. Proses ini hanya butuh beberapa menit."
        },
        {
          n: "4", t: "Data Breach & Credential Stuffing",
          d: "Ketika database perusahaan bocor, data loginmu bisa dijual di dark web. Peretas lalu mencoba kombinasi email+password yang sama di platform lain — inilah mengapa satu password untuk semua akun sangat berbahaya."
        }
      ],
      callout: { t: "d", v: "🚨 Ingat baik-baik: Bank, pemerintah, marketplace, dan perusahaan RESMI manapun TIDAK PERNAH meminta PIN, OTP, atau password melalui telepon, SMS, atau email. Tidak pernah, dalam kondisi atau alasan apapun." }
    },
    {
      h: "Tiga Pilar Keamanan Digital yang Wajib Kamu Terapkan",
      p: `Keamanan digital bukan tentang menjadi paranoid. Ini tentang membangun <strong>tiga kebiasaan cerdas</strong> yang jika dilakukan konsisten akan meningkatkan keamananmu secara drastis — dan semuanya bisa dimulai hari ini.`,
      steps: [
        {
          n: "1", t: "Password Kuat & Unik untuk Setiap Akun",
          d: "Minimal 12 karakter dengan kombinasi huruf besar, huruf kecil, angka, dan simbol. Gunakan password BERBEDA untuk setiap akun — terutama email dan perbankan. Gunakan password manager seperti Bitwarden (gratis & open source) agar tidak perlu mengingat semuanya."
        },
        {
          n: "2", t: "Autentikasi Dua Faktor (2FA) di Semua Akun Penting",
          d: "2FA berarti meski passwordmu bocor, peretas tetap tidak bisa masuk tanpa kode OTP dari HP-mu atau persetujuan dari aplikasi authenticator. Aktifkan di: email, media sosial, perbankan, dan akun game yang berharga."
        },
        {
          n: "3", t: "Audit dan Batasi Izin Aplikasi Secara Rutin",
          d: "Buka Pengaturan HP → pilih setiap aplikasi → tinjau izin yang diberikan. Kalkulator tidak perlu akses kontak. Senter tidak perlu akses lokasi. Aplikasi yang meminta izin berlebihan kemungkinan besar sedang mengumpulkan datamu."
        }
      ],
      tip: [
        "<strong>Bitwarden</strong> (bitwarden.com) — password manager gratis & open source, terbaik untuk pemula",
        "<strong>Have I Been Pwned</strong> (haveibeenpwned.com) — cek apakah emailmu pernah bocor dalam data breach",
        "Jangan pakai WiFi publik untuk transaksi perbankan atau memasukkan password penting tanpa VPN",
        "Gunakan mode penyamaran (incognito) di komputer umum, dan selalu log out setelahnya",
        "Perbarui sistem operasi dan aplikasi secara rutin — pembaruan sering berisi patch keamanan kritis"
      ],
      callout: { t: "g", v: "✅ Langkah pertama yang bisa kamu lakukan sekarang juga: buka haveibeenpwned.com dan masukkan alamat emailmu. Situs ini akan memberitahumu apakah datamu pernah bocor dalam insiden breach manapun." }
    }
  ],

  quiz: [
    {
      tp: "mcq",
      q: "Kamu menerima SMS: 'Ini CS BRI. Akun Anda terindikasi penipuan. Untuk keamanan, segera kirimkan kode OTP yang baru kami kirim.' Apa yang sebenarnya sedang terjadi?",
      opts: [
        "CS Bank memang perlu OTP untuk memverifikasi identitasmu",
        "Ini adalah social engineering — bank TIDAK PERNAH meminta OTP melalui telepon atau SMS",
        "OTP aman untuk diberikan ke CS resmi karena mereka sudah terverifikasi",
        "Ini prosedur keamanan standar yang normal dilakukan bank"
      ],
      ans: 1,
      ex: "Bank TIDAK PERNAH meminta OTP dalam kondisi apapun. Jika kamu memberikan OTP, pelaku langsung bisa masuk ke akun bankmu dan menguras saldonya dalam hitungan detik."
    },
    {
      tp: "tf",
      q: "Password 'Budi@Jakarta2005' termasuk password yang kuat karena mengandung simbol, angka, dan huruf besar.",
      ans: false,
      ex: "SALAH. Password ini mengandung nama (mudah ditebak), kota asal, dan tahun lahir — kombinasi yang paling pertama dicoba peretas. Password kuat tidak boleh mengandung informasi personal yang bisa ditebak."
    },
    {
      tp: "drag",
      q: "Pasangkan ancaman ke penjelasan singkatnya:",
      pairs: [
        { l: "Phishing",         m: "Pesan palsu yang menyamar sebagai pihak terpercaya" },
        { l: "Social Eng.",      m: "Manipulasi psikologi untuk mencuri informasi" },
        { l: "Password Spraying",m: "Mencoba ribuan password umum secara otomatis" },
        { l: "2FA",              m: "Lapisan keamanan kedua selain password" }
      ]
    },
    {
      tp: "stf",
      q: "Pilih SEMUA tanda yang menunjukkan bahwa pesan berikut adalah penipuan (phishing):",
      items: [
        { head: "EMAIL A", body: "'Halo, ini konfirmasi pesanan #TKP-8472 kamu dari Tokopedia. Estimasi tiba 2–3 hari kerja.'", src: "noreply@tokopedia.com", fake: false },
        { head: "EMAIL B", body: "'PENTING! Akunmu akan DIBLOKIR 24 jam! Klik link ini dan masukkan passwordmu sekarang untuk verifikasi!'", src: "security-tokopedia@gmail.com", fake: true },
        { head: "SMS C",   body: "'Kode OTP kamu adalah 847291. Jangan bagikan ke siapapun termasuk pihak yang mengaku dari kami.'", src: "BRI", fake: false },
        { head: "SMS D",   body: "'Selamat! Kamu memenangkan hadiah Rp50 juta! Transfer Rp500.000 sebagai biaya administrasi untuk klaim hadiahmu.'", src: "0812-XXXX-XXXX", fake: true }
      ],
      correctFake: [1, 3],
      ex: "B adalah phishing: domain @gmail.com bukan domain resmi Tokopedia, dan menggunakan bahasa urgent yang memaksa. D adalah penipuan klasik 'advance fee fraud' — tidak ada hadiah yang mengharuskan biaya administrasi."
    },
    {
      tp: "scenario",
      q: "Saat meminjam HP temanmu sebentar, kamu tidak sengaja melihat dia menggunakan password '12345' untuk akun emailnya. Apa yang sebaiknya kamu lakukan?",
      scenario: "Password lemah adalah penyebab lebih dari 80% pembobolan akun. Email adalah 'kunci master' karena digunakan untuk reset password hampir semua akun lain.",
      opts: [
        "Biarkan saja — itu akun dia, bukan urusanmu",
        "Langsung ubah passwordnya tanpa sepengetahuan dia, demi kebaikannya",
        "Dengan sopan beritahu dia bahwa password itu sangat rentan, jelaskan risikonya, dan sarankan menggantinya serta mengaktifkan 2FA",
        "Catat passwordnya untuk berjaga-jaga jika dia perlu bantuan"
      ],
      ans: 2,
      ex: "Mengedukasi dengan sopan adalah pilihan terbaik. Mengubah password orang lain tanpa izin — meskipun niatnya baik — tetap merupakan pelanggaran privasi. Mencatat password orang lain jelas tidak etis."
    }
  ]
};
