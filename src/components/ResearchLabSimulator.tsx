import React, { useState } from 'react';
import { 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  BarChart, 
  Users, 
  Search, 
  Sliders, 
  ShieldAlert, 
  Info, 
  Edit3, 
  Copy, 
  Check, 
  FileText, 
  Lightbulb, 
  ArrowRight, 
  Printer, 
  X,
  Compass,
  ChevronRight,
  ShieldCheck,
  Target,
  Zap,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  BookmarkCheck,
  Eye,
  MessageSquare,
  FolderArchive
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ResearchLabSimulatorProps {
  onXpGained?: (amount: number, reason: string) => void;
}

// Preset Topik yang Populer & Mudah Dipahami
interface PresetTopic {
  id: string;
  name: string;
  badge: string;
  category: 'Kuantitatif' | 'Kualitatif';
  suggestedApproach: 'kuantitatif' | 'kualitatif';
  defaultMethod: string;
  defaultSample: number;
  title: string;
  question: string;
  population: string;
  variableX?: string;
  variableY?: string;
  contextDesc: string;
  keteranganContoh: string;
  fokusKajian: string;
}

const PRESET_TOPICS: PresetTopic[] = [
  {
    id: 'medsos_remaja',
    name: 'Media Sosial & Kecemasan Remaja',
    badge: '📱 Kuantitatif Populer',
    category: 'Kuantitatif',
    suggestedApproach: 'kuantitatif',
    defaultMethod: 'survei',
    defaultSample: 350,
    title: 'Pengaruh Durasi Penggunaan Media Sosial terhadap Tingkat Kecemasan Sosial Siswa SMA',
    question: 'Apakah durasi harian mengakses media sosial berpengaruh signifikan terhadap skor kecemasan sosial remaja?',
    population: '5.000 Siswa SMA di Wilayah Perkotaan',
    variableX: 'Durasi Akses Media Sosial (jam/hari)',
    variableY: 'Skor Kecemasan Sosial (Skala Psikometrik)',
    contextDesc: 'Menguji hubungan sebab-akibat numerik antara dua variabel yang dapat diukur secara statistik.',
    keteranganContoh: 'Contoh riset kuantitatif asosiatif (survei). Menguji hipotesis apakah makin tinggi durasi main media sosial berbanding lurus dengan peningkatan rasa cemas dan insecure di lingkungan sosial nyata.',
    fokusKajian: 'Durasi Akses (Variabel Bebas X) → Skor Kecemasan Sosial (Variabel Terikat Y)'
  },
  {
    id: 'umkm_modal',
    name: 'Efektivitas Bantuan Dana UMKM',
    badge: '💼 Kuantitatif Eksperimen',
    category: 'Kuantitatif',
    suggestedApproach: 'kuantitatif',
    defaultMethod: 'eksperimen',
    defaultSample: 200,
    title: 'Eksperimen Lapangan: Efektivitas Pelatihan Digital terhadap Omset Penjualan Pedagang Pasar',
    question: 'Seberapa besar peningkatan omset pedagang yang diberi pelatihan digital dibandingkan pedagang tanpa pelatihan?',
    population: '1.200 Pedagang Pasar Tradisional',
    variableX: 'Pemberian Pelatihan Pemasaran Digital (Intervensi)',
    variableY: 'Persentase Kenaikan Omset Bulanan (Rupiah)',
    contextDesc: 'Membandingkan Kelompok Perlakuan (diberi pelatihan) dengan Kelompok Kontrol (tanpa pelatihan).',
    keteranganContoh: 'Contoh riset kuantitatif eksperimen semu (quasi-experiment). Menguji hubungan sebab-akibat program dengan membandingkan omset kelompok pedagang terlatih (perlakuan) vs kelompok tanpa pelatihan (kontrol).',
    fokusKajian: 'Pelatihan Digital (Intervensi X) → Persentase Kenaikan Omset (Variabel Y)'
  },
  {
    id: 'solidaritas_ojol',
    name: 'Makna Solidaritas Komunitas Ojol',
    badge: '🛵 Kualitatif Fenomenologi',
    category: 'Kualitatif',
    suggestedApproach: 'kualitatif',
    defaultMethod: 'wawancara',
    defaultSample: 20,
    title: 'Memahami Makna Solidaritas dan Strategi Bertahan Komunitas Pengemudi Ojek Daring',
    question: 'Bagaimana pengemudi ojek daring memaknai kebersamaan dan membangun jejaring tolong-menolong informal saat pesanan sepi?',
    population: 'Komunitas Paguyuban Pengemudi Ojek Daring',
    variableX: 'Pemaknaan gotong royong dan relasi intersubjektif',
    contextDesc: 'Menggali kedalaman emosi, motif, dan pengalaman hidup subjektif yang tidak bisa dijelaskan sekadar angka.',
    keteranganContoh: 'Contoh riset kualitatif fenomenologi (wawancara mendalam). Bertujuan menggali pemaknaan batiniah, rasa senasib sepenanggungan, dan strategi bertahan hidup para pengemudi yang tidak dapat terwakili angka statistik.',
    fokusKajian: 'Pengalaman hidup subjektif, empati rekan seprofesi, dan norma tolong-menolong informal'
  },
  {
    id: 'ruang_publik',
    name: 'Pola Interaksi di Taman Kota',
    badge: '🌳 Kualitatif Etnografi',
    category: 'Kualitatif',
    suggestedApproach: 'kualitatif',
    defaultMethod: 'observasi',
    defaultSample: 25,
    title: 'Studi Observasi: Pola Interaksi Warga Lintas Generasi di Ruang Terbuka Hijau',
    question: 'Bagaimana warga berbagai kelompok usia memanfaatkan fasilitas taman kota untuk berinteraksi sosial secara spontan?',
    population: 'Pengunjung Harian Taman Kota',
    variableX: 'Pola perilaku spasial dan norma interaksi spontan',
    contextDesc: 'Mengamati tindakan alami manusia di lingkungan nyata tanpa manipulasi eksperimen.',
    keteranganContoh: 'Contoh riset kualitatif etnografi/observasi lapangan alami. Peneliti terjun langsung mencatat dinamika perilaku spontan dan pola interaksi warga antar-generasi di ruang publik tanpa merekayasa kondisi subjek.',
    fokusKajian: 'Perilaku spasial alami, relasi sosial lintas kelompok usia, dan pemanfaatan fasilitas taman'
  }
];

export const ResearchLabSimulator: React.FC<ResearchLabSimulatorProps> = ({ onXpGained }) => {
  // Navigasi Tahap Wizard
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // State Parameter Riset
  const [approach, setApproach] = useState<'kuantitatif' | 'kualitatif'>('kuantitatif');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('medsos_remaja');
  const [isCustomTitle, setIsCustomTitle] = useState<boolean>(false);
  
  // Custom Input Fields
  const [title, setTitle] = useState<string>(PRESET_TOPICS[0].title);
  const [question, setQuestion] = useState<string>(PRESET_TOPICS[0].question);
  const [population, setPopulation] = useState<string>(PRESET_TOPICS[0].population);
  const [method, setMethod] = useState<string>('survei');
  const [sampleSize, setSampleSize] = useState<number>(350);

  // Kontrol Mutu & Etika
  const [useTriangulationOrRandom, setUseTriangulationOrRandom] = useState<boolean>(true);
  const [reportAllData, setReportAllData] = useState<boolean>(true);
  const [declareReflexivity, setDeclareReflexivity] = useState<boolean>(true);

  // Modal Draf Bab 3
  const [isDraftModalOpen, setIsDraftModalOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Handle Pilih Topik Cepat
  const handleSelectPreset = (preset: PresetTopic) => {
    sounds.playClick();
    setSelectedPresetId(preset.id);
    setIsCustomTitle(false);
    setApproach(preset.suggestedApproach);
    setTitle(preset.title);
    setQuestion(preset.question);
    setPopulation(preset.population);
    setMethod(preset.defaultMethod);
    setSampleSize(preset.defaultSample);
  };

  // -------------------------------------------------------------
  // MESIN SIMULASI & REKOMENDASI OTOMATIS (RECOMMENDATION ENGINE)
  // -------------------------------------------------------------
  const generateSimulationAudit = () => {
    let score = 70;
    const recommendations: {
      type: 'success' | 'warning' | 'tip';
      title: string;
      detail: string;
      actionableAdvice: string;
    }[] = [];

    const lowerTitle = title.toLowerCase();
    const quantKeywords = ['pengaruh', 'korelasi', 'efektivitas', 'hubungan', 'tingkat', 'faktor'];
    const qualKeywords = ['makna', 'pemaknaan', 'eksplorasi', 'studi kasus', 'pengalaman', 'narasi', 'proses'];

    const hasQuantWords = quantKeywords.some(kw => lowerTitle.includes(kw));
    const hasQualWords = qualKeywords.some(kw => lowerTitle.includes(kw));

    // 1. Rekomendasi Pendekatan vs Judul
    if (approach === 'kualitatif') {
      if (hasQuantWords && !hasQualWords) {
        score -= 15;
        recommendations.push({
          type: 'warning',
          title: 'Ketidakselarasan Frasa Judul dengan Paradigma Kualitatif',
          detail: 'Judul Anda memuat kata bernuansa kausalitas numerik (seperti "pengaruh" atau "efektivitas"), padahal pendekatan yang dipilih adalah Kualitatif.',
          actionableAdvice: 'Gantilah kata depan menjadi: "Memahami Makna...", "Studi Fenomenologi...", atau "Eksplorasi Pengalaman Informan dalam..." agar selaras.'
        });
      } else {
        score += 10;
        recommendations.push({
          type: 'success',
          title: 'Harmoni Judul & Paradigma Kualitatif',
          detail: 'Formulasi masalah berfokus pada kedalaman makna subjektif dan konteks sosial budaya informan.',
          actionableAdvice: 'Pertahankan kata kunci eksploratif untuk menggali perspektif emosional narasumber.'
        });
      }

      // Rekomendasi Sampel Kualitatif
      if (sampleSize > 60) {
        score -= 10;
        recommendations.push({
          type: 'warning',
          title: 'Ukuran Sampel Terlalu Besar untuk Riset Kualitatif',
          detail: `Jumlah ${sampleSize} informan terlalu banyak untuk wawancara mendalam. Kualitatif mengejar kedalaman narasi, bukan kuantitas angka.`,
          actionableAdvice: 'Rekomendasi ideal: Gunakan 10–30 informan kunci terpilih (Purposive Sampling) hingga data mencapai titik jenuh (saturation).'
        });
      } else if (sampleSize >= 10 && sampleSize <= 35) {
        score += 10;
        recommendations.push({
          type: 'success',
          title: 'Ukuran Informan Sangat Proporsional',
          detail: `Jumlah ${sampleSize} orang merupakan rentang standar keilmuan yang ideal untuk mencapai saturasi data kualitatif.`,
          actionableAdvice: 'Fokuskan energi pada teknik probing mendalam dan transkripsi verbatim yang teliti.'
        });
      }

      // Rekomendasi Triangulasi
      if (useTriangulationOrRandom) {
        score += 10;
        recommendations.push({
          type: 'success',
          title: 'Penerapan Triangulasi Multi-Sumber Terpenuhi',
          detail: 'Anda menyilangkan data wawancara dengan observasi dan telaah arsip dokumen.',
          actionableAdvice: 'Cantumkan matriks triangulasi pada laporan akhir untuk membuktikan keabsahan temuan Anda.'
        });
      } else {
        score -= 20;
        recommendations.push({
          type: 'warning',
          title: 'Rentan Bias Pernyataan Sepihak',
          detail: 'Riset kualitatif tanpa triangulasi sangat rentan ditolak penguji karena dianggap hanya memuat opini satu pihak.',
          actionableAdvice: 'Aktifkan Triangulasi Sumber untuk menghubungkan minimal 3 jenis bukti berbeda.'
        });
      }

    } else {
      // Kuantitatif
      if (hasQualWords && !hasQuantWords) {
        score -= 15;
        recommendations.push({
          type: 'warning',
          title: 'Judul Kurang Menggambarkan Variabel Terukur',
          detail: 'Judul Anda memuat kata kualitatif ("makna/pengalaman"), padahal riset kuantitatif membutuhkan variabel numerik terstandar.',
          actionableAdvice: 'Rumuskan variabel menjadi: "Pengaruh X (Variabel Bebas) terhadap Y (Variabel Terikat)" yang dapat diuji dengan skala angka.'
        });
      } else {
        score += 10;
        recommendations.push({
          type: 'success',
          title: 'Formulasi Judul Kuantitatif Tepat Sasaran',
          detail: 'Judul secara jelas mendefinisikan hubungan korelasional atau kausalitas antar-variabel.',
          actionableAdvice: 'Pastikan setiap variabel memiliki definisi operasional dan skala pengukuran (misal: Skala Likert 1–5).'
        });
      }

      // Rekomendasi Sampel Kuantitatif
      if (sampleSize < 100) {
        score -= 20;
        recommendations.push({
          type: 'warning',
          title: 'Sampel Terlalu Sedikit (Margin of Error Tinggi)',
          detail: `Jumlah ${sampleSize} responden terlalu berisiko menghasilkan kesalahan generalisasi dan tidak representatif.`,
          actionableAdvice: 'Gunakan minimal 100–300 responden (mengacu pada rumus Slovin dengan batas toleransi galat 5%).'
        });
      } else {
        score += 10;
        recommendations.push({
          type: 'success',
          title: 'Daya Representasi Sampel Kuat',
          detail: `Ukuran sampel ${sampleSize} responden cukup tangguh untuk uji signifikansi statistik (p-value < 0.05).`,
          actionableAdvice: 'Terapkan teknik Probability Random Sampling agar setiap anggota populasi memiliki peluang yang sama.'
        });
      }

      // Rekomendasi Eksperimen
      if (method === 'eksperimen') {
        if (useTriangulationOrRandom) {
          score += 10;
          recommendations.push({
            type: 'success',
            title: 'Desain Eksperimen Terkontrol (Random Assignment)',
            detail: 'Pengacakan peserta ke dalam Kelompok Kontrol dan Kelompok Perlakuan mencegah variabel perancu.',
            actionableAdvice: 'Lakukan uji homogenitas sebelum memberikan intervensi untuk memastikan kondisi awal kedua kelompok setara.'
          });
        } else {
          score -= 20;
          recommendations.push({
            type: 'warning',
            title: 'Kelemahan Kausalitas Eksperimen',
            detail: 'Tanpa pengacakan (non-random), perbedaan hasil akhir bisa dipicu oleh karakteristik bawaan peserta, bukan murni intervensi.',
            actionableAdvice: 'Terapkan prosedur Random Assignment untuk menjamin validitas internal riset.'
          });
        }
      }
    }

    // Rekomendasi Etika & Bias Data
    if (!reportAllData) {
      score -= 25;
      recommendations.push({
        type: 'warning',
        title: 'Bahaya Bias Konfirmasi (Cherry-Picking)',
        detail: 'Hanya melaporkan data yang sesuai keinginan merusak integritas kejujuran ilmiah sains sosial.',
        actionableAdvice: 'Laporkan seluruh temuan termasuk data anomali yang membantah hipotesis awal.'
      });
    } else {
      score += 10;
    }

    const finalScore = Math.max(25, Math.min(100, score));

    return {
      finalScore,
      recommendations,
      gradeLabel: finalScore >= 85 ? 'Sangat Layak & Memenuhi Kaidah Ilmiah' : finalScore >= 65 ? 'Cukup Layak dengan Catatan Penting' : 'Memerlukan Perbaikan Rancangan',
      gradeColor: finalScore >= 85 ? 'text-emerald-400' : finalScore >= 65 ? 'text-amber-400' : 'text-rose-400'
    };
  };

  const auditResult = generateSimulationAudit();

  const handleCopyProposalBrief = () => {
    const briefText = `=== RINGKASAN DESAIN RISET SOSIAL ===
Judul Penelitian: ${title}
Pendekatan: ${approach.toUpperCase()}
Metode Utama: ${method.toUpperCase()}
Rumusan Masalah: ${question}
Target Populasi: ${population}
Ukuran Sampel: ${sampleSize} Orang
Skor Kesiapan Metodologis: ${auditResult.finalScore}/100 (${auditResult.gradeLabel})
Triangulasi / Random Assignment: ${useTriangulationOrRandom ? 'Diterapkan' : 'Tidak Diterapkan'}
Transparansi Fakta (Anti Cherry-Picking): ${reportAllData ? 'Terpenuhi (100% Data)' : 'Belum Terpenuhi'}
====================================`;

    navigator.clipboard.writeText(briefText);
    sounds.playSuccess();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#072f4a] via-[#0c4a6e] to-[#0e7490] border border-teal-400/30 p-6 sm:p-8 text-white shadow-xl shadow-teal-950/20">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-40 rounded-full bg-teal-300/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/15 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-3 border border-emerald-300/30 text-emerald-200">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-300" />
            Simulator Laboratorium Riset
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading leading-tight mb-2 text-white drop-shadow-xs">
            Laboratorium Desain Riset &amp; Generator Rekomendasi
          </h1>
          <p className="text-xs sm:text-sm text-teal-50/95 leading-relaxed font-medium">
            Rancang proposal metodologi penelitian sosial Anda secara terpandu dalam 3 langkah mudah. Uji kelayakan instrumen Anda dan dapatkan <strong>Rekomendasi Metodologi Ilmiah Otomatis</strong> siap ekspor ke Bab 3.
          </p>
        </div>
      </div>

      {/* 3 Steps Progress Tracker Header */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 p-2 bg-white rounded-2xl border border-teal-100/80 shadow-xs">
        <button
          onClick={() => { sounds.playClick(); setCurrentStep(1); }}
          className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
            currentStep === 1 
              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300 font-black' 
              : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">1</span>
          <span className="hidden sm:inline">Pilih Ide / Topik</span>
          <span className="sm:hidden">Topik</span>
        </button>

        <button
          onClick={() => { sounds.playClick(); setCurrentStep(2); }}
          className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
            currentStep === 2 
              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300 font-black' 
              : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">2</span>
          <span className="hidden sm:inline">Simulator Desain</span>
          <span className="sm:hidden">Simulasi</span>
        </button>

        <button
          onClick={() => { sounds.playClick(); setCurrentStep(3); }}
          className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
            currentStep === 3 
              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300 font-black' 
              : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">3</span>
          <span className="hidden sm:inline">Hasil &amp; Rekomendasi</span>
          <span className="sm:hidden">Hasil</span>
        </button>
      </div>

      {/* ================================================================= */}
      {/* LANGKAH 1: PILIH TOPIK / MASUKKAN JUDUL SENDIRI                    */}
      {/* ================================================================= */}
      {currentStep === 1 && (
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-black text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-600" /> Tahap 1 dari 3
            </span>
            <h2 className="text-xl font-black text-slate-900 font-heading mt-0.5">
              Tentukan Ide atau Topik Penelitian Sosial Anda
            </h2>
            <p className="text-xs text-slate-500">
              Pilih salah satu topik populer di bawah untuk langsung mencoba simulasi, atau gunakan opsi input mandiri.
            </p>
          </div>

          {/* Quick Preset Topics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRESET_TOPICS.map((preset) => {
              const isSelected = !isCustomTitle && selectedPresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`cursor-pointer p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between group ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/70 shadow-md ring-2 ring-sky-200'
                      : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/30 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                        {preset.badge}
                      </span>
                      {isSelected ? (
                        <span className="px-2 py-0.5 rounded-full bg-sky-600 text-white text-[10.5px] font-extrabold flex items-center gap-1 shadow-2xs">
                          ✓ Aktif Terpilih
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-semibold group-hover:text-sky-600">
                          Klik untuk Pakai
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug font-heading">
                        {preset.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1 italic">
                        &quot;{preset.title}&quot;
                      </p>
                    </div>

                    {/* Keterangan Contoh Box */}
                    <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-2 text-left">
                      <div className="flex items-start gap-1.5 text-xs text-slate-700">
                        <Info className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-extrabold text-slate-900 block text-[11px] uppercase tracking-wider text-sky-800">
                            Keterangan Contoh:
                          </span>
                          <p className="text-[11.5px] text-slate-600 leading-relaxed font-normal mt-0.5">
                            {preset.keteranganContoh}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/70 flex flex-wrap gap-1.5 text-[10.5px]">
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-sky-700">
                          🔍 Metode: {preset.defaultMethod === 'survei' ? 'Survei Angket' : preset.defaultMethod === 'eksperimen' ? 'Eksperimen Lapangan' : preset.defaultMethod === 'wawancara' ? 'Wawancara Mendalam' : 'Observasi Lapangan'}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-600">
                          👥 Sasaran: {preset.population}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-600">
                          📊 Sampel: ~{preset.defaultSample} Subjek
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-sky-700 group-hover:text-sky-800 flex items-center gap-1 font-extrabold">
                      Gunakan Topik Contoh Ini →
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Tahap 1 &gt; 2
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Atau Opsi Input Mandiri */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-indigo-600" /> Ingin Mengetik Judul / Masalah Sendiri?
              </label>
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setIsCustomTitle(!isCustomTitle);
                }}
                className={`text-xs font-extrabold px-3 py-1 rounded-xl border transition-all ${
                  isCustomTitle
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                {isCustomTitle ? '✓ Mode Input Sendiri Aktif' : 'Aktifkan Input Mandiri'}
              </button>
            </div>

            {isCustomTitle && (
              <div className="space-y-3 pt-2">
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-1">
                    Judul Penelitian Anda:
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Pengaruh Pola Asuh terhadap Kemandirian Belajar Siswa..."
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900"
                  />
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-1">
                    Rumusan Pertanyaan Penelitian:
                  </span>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Contoh: Seberapa besar pengaruh X terhadap Y...?"
                    className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900"
                  />
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-1">
                    Target Populasi / Lokasi Subjek:
                  </span>
                  <input
                    type="text"
                    value={population}
                    onChange={(e) => setPopulation(e.target.value)}
                    placeholder="Contoh: Siswa SMA di Kota Surabaya"
                    className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tombol Lanjut ke Tahap 2 */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                sounds.playSuccess();
                setCurrentStep(2);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <span>Lanjut ke Simulator Desain (Tahap 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* LANGKAH 2: SIMULATOR PARAMETER METODOLOGI (INTERAKTIF & MUDAH)     */}
      {/* ================================================================= */}
      {currentStep === 2 && (
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-600" /> Tahap 2 dari 3
            </span>
            <h2 className="text-xl font-black text-slate-900 font-heading mt-0.5">
              Uji & Simulasikan Parameter Desain Metodologi
            </h2>
            <p className="text-xs text-slate-500">
              Sesuaikan pendekatan, metode lapangan, ukuran sampel, dan kontrol bias untuk melihat dampaknya secara langsung.
            </p>
          </div>

          {/* 1. Paradigma Pendekatan (Kuantitatif vs Kualitatif) */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-800 block">
              1. Pilih Paradigma Pendekatan:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setApproach('kuantitatif');
                  if (method === 'wawancara' || method === 'observasi' || method === 'studi_kasus') {
                    setMethod('survei');
                    setSampleSize(350);
                  }
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  approach === 'kuantitatif'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-200 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                    <BarChart className="w-4 h-4 text-blue-600" /> Pendekatan Kuantitatif
                  </span>
                  {approach === 'kuantitatif' && <span className="text-blue-600 font-bold">● Aktif</span>}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Mengukur angka numerik, kuesioner skala, uji statistik, serta pembuktian kausalitas antar-variabel.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setApproach('kualitatif');
                  if (method === 'survei' || method === 'eksperimen' || method === 'statistik') {
                    setMethod('wawancara');
                    setSampleSize(20);
                  }
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  approach === 'kualitatif'
                    ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-200 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-amber-600" /> Pendekatan Kualitatif
                  </span>
                  {approach === 'kualitatif' && <span className="text-amber-600 font-bold">● Aktif</span>}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Memahami makna mendalam, narasi lisan wawancara, observasi perilaku nyata, dan studi kasus holistik.
                </p>
              </button>
            </div>
          </div>

          {/* 2. Pemilihan Metode Lapangan */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-800 block">
              2. Instrumen Metode Utama yang Digunakan:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {approach === 'kuantitatif' ? (
                <>
                  <button
                    type="button"
                    onClick={() => { sounds.playClick(); setMethod('survei'); }}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      method === 'survei'
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    📝 Survei Kuesioner (Skala Likert)
                  </button>
                  <button
                    type="button"
                    onClick={() => { sounds.playClick(); setMethod('eksperimen'); }}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      method === 'eksperimen'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🧪 Eksperimen Sosial A/B Terkontrol
                  </button>
                  <button
                    type="button"
                    onClick={() => { sounds.playClick(); setMethod('statistik'); }}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      method === 'statistik'
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    📊 Analisis Regresi & Statistik
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => { sounds.playClick(); setMethod('wawancara'); }}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      method === 'wawancara'
                        ? 'border-amber-500 bg-amber-500 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🎤 Wawancara Mendalam (In-Depth)
                  </button>
                  <button
                    type="button"
                    onClick={() => { sounds.playClick(); setMethod('observasi'); }}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      method === 'observasi'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    👀 Observasi Partisipan Lapangan
                  </button>
                  <button
                    type="button"
                    onClick={() => { sounds.playClick(); setMethod('studi_kasus'); }}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      method === 'studi_kasus'
                        ? 'border-cyan-600 bg-cyan-600 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    📁 Studi Kasus Multi-Dokumen
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 3. Slider Ukuran Sampel dengan Live Indicator */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800">
                3. Ukuran Sampel ({approach === 'kuantitatif' ? 'Responden Warga' : 'Informan Kunci'}):
              </span>
              <span className="text-sm font-black font-mono text-indigo-700 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                {sampleSize} Orang
              </span>
            </div>

            <input
              type="range"
              min={approach === 'kuantitatif' ? 20 : 5}
              max={approach === 'kuantitatif' ? 1000 : 80}
              step={approach === 'kuantitatif' ? 20 : 5}
              value={sampleSize}
              onChange={(e) => setSampleSize(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
              <span>{approach === 'kuantitatif' ? '20 Orang' : '5 Informan'}</span>
              <span className={approach === 'kuantitatif' ? (sampleSize >= 200 ? 'text-emerald-700 font-extrabold' : 'text-amber-700 font-extrabold') : (sampleSize <= 35 ? 'text-emerald-700 font-extrabold' : 'text-amber-700 font-extrabold')}>
                {approach === 'kuantitatif' 
                  ? (sampleSize >= 200 ? '✓ Representatif (Margin Error < 5%)' : '⚠️ Sampel Kecil (Margin Error Besar)')
                  : (sampleSize <= 35 ? '✓ Ideal untuk Titik Jenuh (Data Saturation)' : '⚠️ Cenderung Terlalu Luas untuk Kualitatif')}
              </span>
              <span>{approach === 'kuantitatif' ? '1.000 Orang' : '80 Informan'}</span>
            </div>
          </div>

          {/* 4. Pengendalian Bias & Integritas Ilmiah */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
            <span className="text-xs font-black text-slate-800 block">
              4. Uji Pengendalian Bias & Etika Sains Sosial:
            </span>

            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer p-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-colors">
              <input
                type="checkbox"
                checked={useTriangulationOrRandom}
                onChange={(e) => setUseTriangulationOrRandom(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>
                {approach === 'kuantitatif'
                  ? 'Terapkan Pengacakan Murni (Random Assignment) pada Sampel / Kelompok'
                  : 'Terapkan Triangulasi Sumber (Silangkan Wawancara + Observasi + Dokumen)'}
              </span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer p-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-colors">
              <input
                type="checkbox"
                checked={reportAllData}
                onChange={(e) => setReportAllData(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>
                Laporkan 100% Fakta Lapangan (Bebas dari Bias Konfirmasi & Cherry-Picking)
              </span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer p-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-colors">
              <input
                type="checkbox"
                checked={declareReflexivity}
                onChange={(e) => setDeclareReflexivity(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>
                Deklarasikan Batasan Peran Peneliti & Jaga Netralitas Subjektivitas
              </span>
            </label>
          </div>

          {/* Tombol Navigasi */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <button
              onClick={() => { sounds.playClick(); setCurrentStep(1); }}
              className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors text-center"
            >
              ← Kembali ke Tahap 1
            </button>

            <button
              onClick={() => {
                sounds.playLevelUp();
                setCurrentStep(3);
                if (onXpGained) {
                  onXpGained(25, 'Menyelesaikan Simulasi Desain Metodologi di Lab Riset');
                }
              }}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Lihat Hasil Simulasi &amp; Rekomendasi (Tahap 3)</span>
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* LANGKAH 3: HASIL SIMULASI & GENERATOR REKOMENDASI OTOMATIS         */}
      {/* ================================================================= */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Score Banner */}
          <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Hasil Audit Mutu Metodologis
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading">
                Status Kelayakan: <span className={auditResult.gradeColor}>{auditResult.gradeLabel}</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Proposal Anda untuk topik: <em>"{title}"</em> telah diuji oleh sistem evaluator ilmiah. Berikut adalah rekomendasi perbaikan dan penguatannya.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/80 px-5 py-3.5 rounded-2xl border border-slate-700 shrink-0 text-center">
              <div>
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white block">
                  {auditResult.finalScore}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Skor Kelayakan / 100</span>
              </div>
            </div>
          </div>

          {/* Grid Rekomendasi Spesifik */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditResult.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
                  rec.type === 'warning'
                    ? 'bg-amber-50/60 border-amber-200'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {rec.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <h3 className={`text-xs font-black ${rec.type === 'warning' ? 'text-amber-900' : 'text-emerald-900'}`}>
                      {rec.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mb-3">
                    {rec.detail}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-200/70 text-[11px] font-bold">
                  <span className="text-slate-500 block mb-0.5">Saran Aksi Konkret:</span>
                  <p className={`${rec.type === 'warning' ? 'text-amber-950 font-extrabold' : 'text-emerald-950 font-extrabold'}`}>
                    👉 {rec.actionableAdvice}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ringkasan Parameter Proposal */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-indigo-600" /> Lembar Spesifikasi Rancangan Metodologi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Pendekatan & Metode:</span>
                <strong className="text-slate-900 capitalize">{approach} - {method}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Ukuran Sampel / Partisipan:</span>
                <strong className="text-indigo-700">{sampleSize} Orang</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Target Populasi:</span>
                <strong className="text-slate-900 truncate block">{population}</strong>
              </div>
            </div>
          </div>

          {/* Action Bar: Salin & Ekspor Bab 3 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => { sounds.playClick(); setCurrentStep(2); }}
              className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors text-center w-full sm:w-auto"
            >
              ← Ubah Parameter Simulasi
            </button>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyProposalBrief}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200 active:scale-[0.98]"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                <span>{isCopied ? 'Tersalin!' : 'Salin Ringkasan'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playSuccess();
                  setIsDraftModalOpen(true);
                  if (onXpGained) {
                    onXpGained(35, 'Membuka & Mengekspor Draf Naskah Bab 3 Metodologi');
                  }
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                <span>📄 Ekspor Draf Bab 3 Siap Cetak</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL EKSPOR DRAF BAB 3 METODOLOGI PENELITIAN                     */}
      {/* ================================================================= */}
      {isDraftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div 
            className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-slate-300 overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 print:hidden">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading truncate sm:whitespace-normal">
                    Draf Naskah: BAB III METODOLOGI PENELITIAN
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate sm:whitespace-normal">
                    Format Standar Tugas Akhir / Skripsi Bidang Ilmu Sosial Terapan
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 shrink-0">
                <button
                  onClick={() => {
                    sounds.playClick();
                    window.print();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-2xs cursor-pointer active:scale-95"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / PDF</span>
                </button>
                <button
                  onClick={() => setIsDraftModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Tutup Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className="p-4 sm:p-10 overflow-y-auto flex-1 bg-white text-slate-900 text-xs sm:text-sm font-serif leading-relaxed space-y-6 print:p-0">
              <div className="text-center space-y-1 pb-4 border-b border-slate-300">
                <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider font-sans">
                  BAB III
                </h2>
                <h3 className="text-lg sm:text-xl font-black uppercase font-sans">
                  METODOLOGI PENELITIAN
                </h3>
                <p className="italic text-xs text-slate-600 font-sans pt-1">
                  Judul: "{title}"
                </p>
              </div>

              {/* 3.1 Pendekatan Penelitian */}
              <div className="space-y-2">
                <h4 className="font-bold font-sans text-sm text-slate-900">
                  3.1 Pendekatan dan Desain Penelitian
                </h4>
                <p className="text-justify indent-8">
                  Penelitian ini menggunakan pendekatan <strong>{approach.toUpperCase()}</strong> dengan instrumen metode utama <strong>{method.toUpperCase()}</strong>. Pendekatan ini dirancang secara sistematis guna menjawab rumusan masalah: <em>"{question}"</em>.
                </p>
                <p className="text-justify indent-8">
                  {approach === 'kualitatif'
                    ? 'Penelitian berakar pada paradigma interpretatif-naturalistik, di mana peneliti berperan sebagai instrumen utama (human instrument) untuk mendalami nuansa makna, pengalaman subjektif informan, dan dinamika kontekstual yang melingkupinya.'
                    : 'Penelitian berakar pada paradigma positivistik, di mana peneliti menekankan pengujian hipotesis secara objektif, keterulangan instrumen ukur, dan penarikan kesimpulan berbasis kekuatan signifikansi data kuantitatif.'}
                </p>
              </div>

              {/* 3.2 Tempat, Populasi, dan Sampel */}
              <div className="space-y-2">
                <h4 className="font-bold font-sans text-sm text-slate-900">
                  3.2 Populasi dan Penentuan Sampel
                </h4>
                <p className="text-justify indent-8">
                  Populasi dalam penelitian ini ditetapkan pada <strong>{population}</strong>. Dari populasi tersebut, ditentukan ukuran sampel sebesar <strong>{sampleSize} partisipan/responden</strong>.
                </p>
                <p className="text-justify indent-8">
                  {approach === 'kualitatif'
                    ? 'Penarikan informan menerapkan teknik Purposive Sampling dengan kriteria informan kunci yang memiliki pengalaman langsung, keterlibatan intensif, dan wawasan mendalam mengenai topik yang diteliti hingga mencapai titik jenuh (data saturation).'
                    : 'Penarikan sampel menerapkan teknik Probability Sampling secara acak guna meminimalkan margin of error dan menjamin representasi karakteristik populasi yang seimbang.'}
                </p>
              </div>

              {/* 3.3 Uji Keabsahan & Pengendalian Bias */}
              <div className="space-y-2">
                <h4 className="font-bold font-sans text-sm text-slate-900">
                  3.3 Prosedur Pengendalian Bias dan Keabsahan Data
                </h4>
                <p className="text-justify indent-8">
                  Guna menjamin mutu keilmuan dan reliabilitas temuan, penelitian ini menetapkan langkah pengendalian metodologis:
                </p>
                <div className="pl-4 space-y-1 text-slate-800">
                  {approach === 'kualitatif' ? (
                    <>
                      <p>• <strong>Triangulasi Multi-Sumber:</strong> {useTriangulationOrRandom ? 'Memverifikasi kesaksian wawancara dengan catatan observasi lapangan dan dokumen arsip resmi.' : 'Pemeriksaan silang data wawancara.'}</p>
                      <p>• <strong>Refleksivitas Peneliti:</strong> {declareReflexivity ? 'Mendeklarasikan latar belakang dan posisi peneliti secara transparan guna mencegah bias subjektif personal.' : 'Menjaga netralitas wawancara.'}</p>
                    </>
                  ) : (
                    <>
                      <p>• <strong>Uji Validitas & Reliabilitas:</strong> Uji instrumen ukur kuesioner menggunakan korelasi Product Moment dan Cronbach Alpha.</p>
                      <p>• <strong>Pengendalian Confounding:</strong> {useTriangulationOrRandom ? 'Penerapan Random Assignment untuk memastikan kesetaraan karakteristik subjek antar-kelompok.' : 'Pengawasan variabel lingkungan terkontrol.'}</p>
                    </>
                  )}
                  <p>• <strong>Integritas Fakta (Anti Cherry-Picking):</strong> {reportAllData ? 'Berkomitmen melaporkan 100% fakta lapangan baik yang mendukung maupun bertolak belakang dengan dugaan awal peneliti.' : 'Pelaporan data terverifikasi.'}</p>
                </div>
              </div>

              {/* Skor Audit Metodologi */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 font-sans text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Indeks Kelayakan Metodologis Proposal:</span>
                  <span className="text-slate-600">Predikat: {auditResult.gradeLabel}</span>
                </div>
                <div className="text-2xl font-black font-mono text-indigo-700">
                  {auditResult.finalScore}/100
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
