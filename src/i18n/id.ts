export const id = {
  language: {
    flag: "🇮🇩",
    name: "Bahasa Indonesia",
    id: "Indonesian",
  },
  errors: {
    needMoreParticipants: "Anda membutuhkan minimal 2 peserta",
    invalidPairs: "Tidak dapat menghasilkan pasangan yang valid dengan aturan saat ini. Silakan periksa aturan dan coba lagi.",
    multipleMustRules: "Ditemukan beberapa aturan HARUS",
    conflictingRules: "Konflik antara aturan HARUS dan TIDAK BOLEH",
    emptyName: "Nama kosong",
    duplicateName: "Nama duplikat: {{name}}",
    invalidRuleFormat: "Format aturan tidak valid: {{rule}}",
    unknownParticipant: "Peserta tidak dikenal dalam aturan: {{name}}",
    noValidReceivers: "Tidak ada penerima valid tersisa untuk peserta ini",
    line: "Baris {{number}}"
  },
  home: {
    vanity: "Project dimulai pada musim dingin 2015 oleh Maël",
    sponsor: "Dukung saya di GitHub",
    title: "Perencana Secret Santa",
    explanation: [
      "Selamat datang! Alat ini akan membantu Anda mengatur pertukaran hadiah liburan dengan mudah.",
      "Tambahkan peserta secara manual atau unggah CSV dengan semua detail peserta (Nama, Alamat, Telepon, Petunjuk Hadiah, Catatan).",
      "Atur aturan pasangan untuk peserta (paksa pasangan tertentu atau hindari pasangan tertentu).",
      "Hasilkan pasangan Secret Santa secara otomatis.",
      "Setiap peserta menerima link unik yang menampilkan siapa yang harus mereka beri hadiah, lengkap dengan Petunjuk Hadiah, Alamat, Telepon, Catatan, dan instruksi opsional.",
      "Tidak perlu akun, email, atau backend — semuanya berjalan di browser Anda dan di-host di GitHub Pages.",
      "Nikmati pengalaman Secret Santa yang menyenangkan dan tanpa stres! 🎄",
      "Anda akan menerima link unik untuk setiap peserta, yang harus dibagikan sendiri (via email, Slack, dll). [Contoh link]"
    ]
  },
  pairing: {
    title: "Tugas Secret Santa Anda",
    assignment: "Selamat, <name/>! Anda telah dipilih untuk memberi hadiah kepada:",
    error: "Gagal mendekripsi pesan. Link mungkin tidak valid.",
    startYourOwn: "Mulai Secret Santa sendiri!",
    address: "Alamat",
    phone: "Telepon",
    notes: "Catatan",
    rulesReminder: "{{instructions}}"
  },
  participants: {
    title: "Peserta",
    generationWarning: "Penting: Setiap perubahan pada daftar peserta atau pengaturan akan membutuhkan pembuatan pasangan baru. Link lama tidak akan diperbarui.",
    addPerson: "Tambahkan Peserta",
    generatePairs: "Hasilkan Pasangan",
    enterName: "Masukkan nama peserta",
    editRules: "Edit aturan",
    removeParticipant: "Hapus peserta",
    rulesCount_one: "{{count}} aturan",
    rulesCount_other: "{{count}} aturan",
    switchToFormView: "Ubah ke tampilan formulir",
    switchToTextView: "Ubah ke tampilan teks"
  },
  rules: {
    title: "Aturan untuk {{name}}",
    hintLabel: "Petunjuk Hadiah",
    hintPlaceholder: "Masukkan petunjuk hadiah (opsional)",
    addressLabel: "Alamat",
    addressPlaceholder: "Masukkan alamat (opsional)",
    phoneLabel: "Telepon",
    phonePlaceholder: "Masukkan telepon (opsional)",
    notesLabel: "Catatan",
    notesPlaceholder: "Masukkan catatan tambahan (opsional)",
    addMustRule: "Paksa pasangan",
    addMustNotRule: "Hindari pasangan",
    mustBePairedWith: "Harus dipasangkan dengan",
    mustNotBePairedWith: "Tidak boleh dipasangkan dengan",
    selectParticipant: "Pilih peserta",
    removeRule: "Hapus aturan",
    cancel: "Batal",
    saveRules: "Simpan aturan"
  },
  links: {
    title: "Link untuk Dibagikan",
    warningParticipantsChanged: "Peringatan: Peserta atau aturan telah berubah sejak link ini dibuat.",
    resetAssignments: "Hasilkan ulang pasangan",
    shareInstructions: "Bagikan link ini hanya kepada pemberi hadiah yang bersangkutan",
    exportCSV: "Ekspor CSV",
    copySecretLink: "Salin link",
    linkCopied: "Berhasil disalin ke clipboard!",
    for: "untuk"
  },
  settings: {
    title: "Pengaturan",
    instructions: "Instruksi Tambahan",
    instructionsPlaceholder: "misal: anggaran, tanggal, lokasi...",
    instructionsHelp: "Instruksi ini akan ditampilkan kepada semua peserta di halaman tugas mereka. Singkat saja agar link tidak terlalu panjang."
  },
};
