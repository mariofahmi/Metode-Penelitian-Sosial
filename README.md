# 🎓 Metode Penelitian Sosial — Laboratorium & Platform Edukasi Interaktif

> **Karya Rancang Bangun & Kurasi Edukasi:** **MARIO FAHMI SYARIAL**  
> Platform edukasi interaktif berbasis web untuk memandu mahasiswa, dosen, dan peneliti memahami metodologi penelitian sosial secara mendalam, menyenangkan, dan bebas dari bias metodologis.

---

## 🌟 Ikhtisar Aplikasi

Aplikasi **Metode Penelitian Sosial** dirancang khusus untuk memecahkan kebingungan umum dalam metodologi riset ilmu sosial. Melalui pendekatan visual interaktif, simulasi parameter lapangan, dan generator draf skripsi otomatis, pengguna dapat menguasai paradigma kuantitatif dan kualitatif secara aplikatif.

---

## ✨ Fitur-Fitur Utama

### 1. 🛡️ Gerbang Integritas Akademik & Disclaimer Metodologi
- Penguncian persetujuan berbasis penelusuran baca tuntas (*mandatory scroll-to-bottom*).
- Komitmen etika riset, anti-*cherry-picking*, dan perlindungan kerahasiaan subjek manusia (*human subjects*).

### 2. 📝 Modul 1: Metodologi Kualitatif
- **Tiga Pilar Kunci**: Wawancara Mendalam (*In-Depth Interview*), Observasi Partisipan Alami, dan Studi Kasus Holistik.
- **Simulasi Interaktif**: Pengalihan mode tatap muka vs daring, pencatatan lapangan (*fieldnotes*) berbasis waktu (pagi/siang/sore/malam), dan matriks triangulasi multi-sumber data.

### 3. 📊 Modul 2: Metodologi Kuantitatif & Empiris
- **Tiga Pilar Kunci**: Survei Kuesioner (Skala Likert), Eksperimen Sosial Terkontrol A/B, dan Analisis Statistik Regresi.
- **Kalkulator Slovin Real-Time**: Penentuan ukuran sampel minimal representatif dengan visualisasi kanvas sebaran titik populasi acak.
- **Simulasi Parameter**: Uji reliabilitas instrumen (*Cronbach's Alpha*), perhitungan *Cohen's d effect size*, dan diagram pencar (*scatterplot*) dengan garis regresi interaktif.

### 4. ⚠️ Modul 3: Tiga Jeratan Metodologi (Pitfalls)
- **Deteksi Bias Seleksi (*Cherry-Picking*)**: Simulasi 60 titik data untuk membuktikan bahaya membuang data yang berlawanan.
- **Subjektivitas Emosional**: Pengalihan kacamata emosional vs netral dengan transformasi teks laporan hasil penelitian secara dinamis.
- **Generalisasi Keliru**: Visualisasi perbedaan antara sampel kelompok terpusat (*convenience sampling*) dengan populasi majemuk.
- **Lembar Audit Integritas**: Evaluasi mandiri kepatuhan kaidah sains sosial dengan skor /100 dan tombol salin sertifikat audit.

### 5. ⚖️ Modul Komparasi: Kuantitatif vs Kualitatif (Tabel 5)
- **4 Karakteristik Pokok**: Menelaah relasi komplementer kedua paradigma.
- **Tabel 5 Komparatif (6 Dimensi)**: Analisis mendalam meliputi Pertanyaan Kunci, Fokus Ontologis, Instrumen, Desain Sampel, Pengolahan Data, dan Batasan/Kekuatan. Dilengkapi fitur *swipe horizontal* ramah smartphone & tablet.
- **Simulator Keputusan**: Rekomendasi strategi pendekatan berdasarkan kasus studi nyata.

### 6. 🧪 Laboratorium Desain Riset & Generator Bab 3
- **Wizard 3 Langkah**:
  1. *Pilih Ide / Topik Riset* (Preset populer atau input kustom)
  2. *Simulator Parameter Metodologi* (Pendekatan, instrumen, ukuran sampel, pengendalian bias)
  3. *Hasil Audit Mutu & Rekomendasi Ilmiah* (Skor kelayakan proposal dan saran aksi konkret)
- **Ekspor Naskah Bab 3**: Generator naskah proposal terstandar skripsi/tugas akhir bidang ilmu sosial yang siap dicetak langsung via tombol **Cetak / PDF** (`window.print()`).

### 7. 📖 Glosarium Metodologi
- Kamus ringkas istilah ilmiah (triangulasi, kausalitas, saturasi data, bias konfirmasi, *random assignment*, dll.) dengan pencarian instan dan filter kategori.

---

## 🎨 Desain & Responsivitas
- **Palet Warna**: *Deep Ocean & Emerald Mint* (`#072f4a` ke `#0e7490` dengan aksen zamrud mint `#10b981 / #14b8a6`).
- **Logo Resmi**: Monogram MF (Mario Fahmi) marun-emas terintegrasi di navbar, favicon tab browser, modal, dan footer.
- **Mobile & Tablet Friendly**: Dioptimalkan untuk navigasi sentuhan jempol (*touch-friendly*), tata letak kartu fleksibel, dan tombol aksi ergonomis.
- **Sintesis Audio Haptik**: Efek suara interaktif berbasis Web Audio API murni (tanpa file audio eksternal, dengan tombol bisukan/unmute).

---

## 🚀 Panduan Menjalankan Aplikasi

### Prasyarat
- **Node.js** (versi 18 ke atas disarankan)
- **npm** atau **yarn / pnpm**

### Langkah Pemasangan & Menjalankan

1. **Kloning Repositori:**
   ```bash
   git clone https://github.com/mariofahmi/Metode-Penelitian-Sosial.git
   cd Metode-Penelitian-Sosial
   ```

2. **Pasang Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan (Local Dev):**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:3000`.

4. **Kompilasi Bundel Produksi:**
   ```bash
   npm run build
   ```

5. **Pemeriksaan Tipe Data (Linting):**
   ```bash
   npm run lint
   ```

---

## 🛠️ Tumpukan Teknologi (Tech Stack)
- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engine**: Web Audio API (Synthesizer Oscillator & Gain Nodes)

---

## 👤 Hak Cipta & Rancang Bangun
- **Perancang & Pengembang:** **MARIO FAHMI SYARIAL**
- **Lisensi:** Edukasi & Akademik Bebas Terbuka (Open Educational Resource)
