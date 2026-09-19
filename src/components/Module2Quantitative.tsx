import React, { useState } from 'react';
import { SamplingCalculator } from './SamplingCalculator';
import { sounds } from '../utils/soundEffects';
import { 
  FileCheck, 
  FlaskConical, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Sliders, 
  Sparkles, 
  ChevronRight, 
  Info, 
  CheckCircle2,
  Calculator,
  Copy,
  Check,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Scale,
  Target,
  Award
} from 'lucide-react';

interface Module2QuantitativeProps {
  onXpGained?: (amount: number, reason: string) => void;
}

export const Module2Quantitative: React.FC<Module2QuantitativeProps> = ({ onXpGained }) => {
  // Method selection state
  const [selectedMethod, setSelectedMethod] = useState<'survei' | 'eksperimen' | 'statistik'>('survei');

  // Scenario presets for realistic contextual learning
  const [selectedScenario, setSelectedScenario] = useState<'transport' | 'bansos' | 'gadget' | 'kustom'>('transport');
  const [customTitle, setCustomTitle] = useState<string>('Pengaruh Insentif Belajar terhadap Kepatuhan Siswa');

  // 1. Survey Simulator State
  const [surveyPopulation, setSurveyPopulation] = useState<number>(3500);
  const [surveyMarginError, setSurveyMarginError] = useState<number>(0.05); // 5%
  const [surveyLikertAgreement, setSurveyLikertAgreement] = useState<number>(68); // 68% setuju
  const [surveyItemCount, setSurveyItemCount] = useState<number>(16);

  // 2. Experiment Simulator State
  const [treatmentType, setTreatmentType] = useState<'gamifikasi' | 'insentif' | 'sosialisasi'>('gamifikasi');
  const [treatmentIntensity, setTreatmentIntensity] = useState<number>(7);
  const [experimentWeeks, setExperimentWeeks] = useState<number>(6);
  const [isRandomAssignment, setIsRandomAssignment] = useState<boolean>(true);

  // 3. Statistics Simulator State
  const [correlationR, setCorrelationR] = useState<number>(0.72); // -1.0 to +1.0
  const [varXLabel, setVarXLabel] = useState<string>('Waktu Belajar (Jam/Minggu)');
  const [varYLabel, setVarYLabel] = useState<string>('Nilai Evaluasi Akademik');

  // Copy state & XP reward tracking
  const [copied, setCopied] = useState<boolean>(false);
  const [hasInteractedXp, setHasInteractedXp] = useState<boolean>(false);

  // Calculations
  // Slovin formula
  const calculatedSampleSize = Math.ceil(surveyPopulation / (1 + surveyPopulation * (surveyMarginError * surveyMarginError)));
  const calculatedMoE = (100 / Math.sqrt(calculatedSampleSize)).toFixed(1);

  // Cronbach alpha estimation based on item count & sample size
  const estimatedAlpha = Math.min(0.94, (0.65 + (surveyItemCount * 0.012) + (calculatedSampleSize > 100 ? 0.08 : 0.02))).toFixed(2);

  // Experiment calculations
  const baselineControlScore = 58;
  const rawTreatmentBonus = treatmentIntensity * 3.8 + (experimentWeeks * 0.9);
  const selectionBiasPenalty = isRandomAssignment ? 0 : -8; // Non-random assignment harms validity!
  const finalTreatmentScore = Math.min(99, Math.round(baselineControlScore + rawTreatmentBonus + selectionBiasPenalty));
  const effectDifference = finalTreatmentScore - baselineControlScore;
  const cohenD = ((effectDifference) / 14).toFixed(2); // estimated standard dev of 14

  // Statistics calculations
  const rSquared = (correlationR * correlationR * 100).toFixed(1);
  const isStatisticallySignificant = Math.abs(correlationR) >= 0.25;

  // Trigger XP for exploring quantitative methodology
  const handleTriggerXp = (reason: string) => {
    sounds.playClick();
    if (!hasInteractedXp && onXpGained) {
      setHasInteractedXp(true);
      onXpGained(45, reason);
      sounds.playSuccess();
    }
  };

  // Switch active method with sound
  const handleSelectMethod = (method: 'survei' | 'eksperimen' | 'statistik') => {
    setSelectedMethod(method);
    sounds.playCardFlip();
  };

  // Copy recommendation summary to clipboard
  const handleCopyRecommendation = () => {
    const scenarioName = selectedScenario === 'transport' 
      ? 'Evaluasi Kepuasan Transportasi Publik' 
      : selectedScenario === 'bansos' 
      ? 'Efektivitas Bantuan Usaha Terhadap Kesejahteraan Warga'
      : selectedScenario === 'gadget'
      ? 'Pengaruh Screen-Time Gadget terhadap Prestasi Siswa'
      : customTitle;

    const summaryText = `
=== REKOMENDASI METODOLOGI KUANTITATIF & EMPIRIS ===
Topik Riset: ${scenarioName}
Pendekatan Terpilih: ${selectedMethod.toUpperCase()}

1. DESAIN SAMPLING & UKURAN SAMPEL:
- Ukuran Populasi (N): ${surveyPopulation.toLocaleString('id-ID')} orang
- Toleransi Kesalahan (Margin of Error): ${(surveyMarginError * 100)}%
- Sampel Minimal Representatif (Rumus Slovin): ${calculatedSampleSize} responden
- Rekomendasi Teknik Sampling: ${surveyPopulation > 2000 ? 'Stratified Random Sampling (berstrata wilayah/demografi)' : 'Simple Random Sampling murni'}

2. STANDAR INSTRUMEN & PENGUJIAN:
- Jumlah Butir Pertanyaan Direkomendasikan: ${surveyItemCount} butir skala Likert (1-5)
- Uji Reliabilitas Ditargetkan: Cronbach's Alpha ≥ 0.70 (Estimasi saat ini: α = ${estimatedAlpha})
- Tahap Uji Coba (Pilot Test): Wajib diberikan ke 30 responden awal sebelum survei massal untuk eliminasi butir gugur.

3. DESAIN KAUSALITAS & EKSPERIMEN:
- Model Eksperimen: Pre-test & Post-test Control Group Design
- Prinsip Random Assignment: ${isRandomAssignment ? 'Wajib dipertahankan (Mencegah Selection Bias)' : 'PERINGATAN: Alokasi non-acak menciptakan bias pembanding!'}
- Estimasi Effect Size (Cohen\'s d): ${cohenD} (${Number(cohenD) > 0.8 ? 'Efek Sangat Kuat' : Number(cohenD) > 0.5 ? 'Efek Moderat' : 'Efek Ringan'})

4. PENGUJIAN HIPOTESIS & STATISTIK:
- Koefisien Korelasi Target (r): ${correlationR > 0 ? `+${correlationR.toFixed(2)}` : correlationR.toFixed(2)}
- Koefisien Determinasi (R²): ${rSquared}% variansi variabel terikat dijelaskan oleh variabel bebas.
- Rumus Uji Hipotesis Utama: ${selectedMethod === 'eksperimen' ? 'Independent Sample T-Test (Uji Beda Dua Kelompok)' : selectedMethod === 'statistik' ? 'Uji Regresi Linier Sederhana & Korelasi Pearson (r)' : 'Analisis Deskriptif Persentase & Uji Proporsi'}
- Catatan Etis Ilmiah: Korelasi numerik tinggi tidak membuktikan kausalitas tanpa kontrol variabel luar (confounding factor).
`.trim();

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    sounds.playChime();
    setTimeout(() => setCopied(false), 3000);
  };

  // Readiness calculation score (0 - 100)
  const methodologyScore = Math.min(100, Math.round(
    (calculatedSampleSize >= 200 ? 30 : 20) +
    (isRandomAssignment ? 35 : 15) +
    (Math.abs(correlationR) >= 0.5 ? 20 : 10) +
    (surveyItemCount >= 12 ? 15 : 10)
  ));

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      {/* 1. Header Banner: Pendekatan Ramah & Bersahabat */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#072f4a] via-[#0c4a6e] to-[#0e7490] border border-teal-400/30 p-6 sm:p-8 text-white shadow-xl shadow-teal-950/20">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-40 rounded-full bg-teal-300/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300/30 text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Metodologi Kuantitatif &amp; Empiris Interaktif
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight mb-2 text-white drop-shadow-xs">
            Membuktikan Gejala Sosial dengan Angka &amp; Bukti Nyata
          </h1>
          <p className="text-sm sm:text-base text-teal-50/95 leading-relaxed">
            Metode kuantitatif menjawab pertanyaan <em>&quot;Berapa banyak?&quot;</em>, <em>&quot;Apakah program berhasil?&quot;</em>, dan <em>&quot;Seberapa kuat hubungannya?&quot;</em>. 
            Gunakan simulator di bawah ini untuk menguji parameter riset Anda dan menghasilkan rekomendasi metodologi yang siap diterapkan.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-teal-500/30 border border-teal-300/40 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" /> 1. Survei (Pemetaan Responden)
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/30 border border-emerald-300/40 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" /> 2. Eksperimen (Uji Coba Kausal)
            </span>
            <span className="px-3 py-1 rounded-lg bg-cyan-500/30 border border-cyan-300/40 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" /> 3. Statistik (Korelasi &amp; Regresi)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Pilihan Skenario Kasus Nyata (Contextual Learning) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-sky-600" /> Langkah 1: Tentukan Topik / Studi Kasus Penelitian
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
              Pilih Skenario Nyata untuk Mensimulasikan Data Kuantitatif
            </h3>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 self-start sm:self-auto">
            {selectedScenario === 'kustom' ? 'Mode Kustom' : 'Skenario Terpilih'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            onClick={() => { setSelectedScenario('transport'); sounds.playClick(); }}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedScenario === 'transport'
                ? 'bg-rose-50 border-rose-500 shadow-xs ring-1 ring-rose-400 text-rose-950'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
              <span>🚌 Transportasi Publik</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Survei kepuasan 3.500 komuter harian bus kota.
            </p>
          </button>

          <button
            onClick={() => { setSelectedScenario('bansos'); sounds.playClick(); }}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedScenario === 'bansos'
                ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-400 text-emerald-950'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
              <span>💼 Bantuan Modal Warga</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Eksperimen kontrol bantuan modal & mentoring UMKM.
            </p>
          </button>

          <button
            onClick={() => { setSelectedScenario('gadget'); sounds.playClick(); }}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedScenario === 'gadget'
                ? 'bg-blue-50 border-blue-500 shadow-xs ring-1 ring-blue-400 text-blue-950'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
              <span>📱 Screen Time & Nilai</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Analisis korelasi jam gadget harian vs IPK mahasiswa.
            </p>
          </button>

          <button
            onClick={() => { setSelectedScenario('kustom'); sounds.playClick(); }}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedScenario === 'kustom'
                ? 'bg-indigo-50 border-indigo-500 shadow-xs ring-1 ring-indigo-400 text-indigo-950'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
              <span>✍️ Topik Sendiri (Kustom)</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Ketik judul riset kuantitatif Anda secara bebas.
            </p>
          </button>
        </div>

        {selectedScenario === 'kustom' && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">
              Masukkan Judul / Rumusan Masalah Kuantitatif:
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Contoh: Pengaruh Pelatihan Kerja terhadap Produktivitas Karyawan..."
              className="w-full px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[10px] text-slate-500">
              *Riset kuantitatif wajib memiliki variabel bebas (X) dan variabel terikat (Y) yang dapat diukur dengan angka.
            </p>
          </div>
        )}
      </div>

      {/* 3. Tiga Pilar Metode Kuantitatif (Kartu Penjelasan + Pemilih Metode) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Pilar 1: Survei Kuesioner */}
        <div
          onClick={() => handleSelectMethod('survei')}
          className={`cursor-pointer rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
            selectedMethod === 'survei'
              ? 'border-rose-500 bg-rose-50/70 shadow-md ring-2 ring-rose-300'
              : 'border-rose-200 bg-white hover:border-rose-300 hover:shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-extrabold text-xs tracking-wide shadow-xs flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" />
                <span>1. METODE SURVEI</span>
              </div>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                {selectedMethod === 'survei' ? '✓ Sedang Disimulasi' : 'Pilih Metode →'}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-2xs mb-3 space-y-1.5">
              <div className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                <span>Analogi Sederhana:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &quot;Seperti mencicipi satu sendok kuah sup untuk mengetahui rasa seluruh panci besar sup.&quot;
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Mengumpulkan jawaban terstandar dari sampel warga lewat kuesioner tertutup untuk memetakan sikap, tren opini publik, dan karakteristik demografi.
            </p>

            <div className="p-2.5 rounded-xl bg-rose-100/60 border border-rose-200 text-[11px] text-rose-950 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                <span>Kapan Menggunakan Survei?</span>
              </div>
              <p className="text-slate-700">
                Saat Anda ingin mengukur proporsi (persentase) masyarakat luas dan menguji kuesioner dengan skala Likert 1–5.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-200 flex items-center justify-between text-xs font-bold text-rose-800">
            <span>Buka Simulasi Survei & Slovin</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Pilar 2: Eksperimen Sosial */}
        <div
          onClick={() => handleSelectMethod('eksperimen')}
          className={`cursor-pointer rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
            selectedMethod === 'eksperimen'
              ? 'border-emerald-500 bg-emerald-50/70 shadow-md ring-2 ring-emerald-300'
              : 'border-emerald-200 bg-white hover:border-emerald-300 hover:shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-extrabold text-xs tracking-wide shadow-xs flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4" />
                <span>2. EKSPERIMEN SOSIAL</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {selectedMethod === 'eksperimen' ? '✓ Sedang Disimulasi' : 'Pilih Metode →'}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs mb-3 space-y-1.5">
              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Analogi Sederhana:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &quot;Seperti uji coba obat: kelompok satu diberi obat baru, kelompok lain tidak, lalu diperiksa apakah ada kesembuhan murni.&quot;
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Membagi subjek ke Kelompok Kontrol (tanpa perlakuan) dan Kelompok Eksperimen (diberi intervensi) untuk membuktikan hubungan sebab-akibat (kausalitas murni).
            </p>

            <div className="p-2.5 rounded-xl bg-emerald-100/60 border border-emerald-200 text-[11px] text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Kapan Menggunakan Eksperimen?</span>
              </div>
              <p className="text-slate-700">
                Saat ingin mengevaluasi efektivitas program kebijakan baru, aplikasi belajar, atau intervensi sosial terencana.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-800">
            <span>Buka Simulasi Eksperimen A/B</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Pilar 3: Analisis Statistik */}
        <div
          onClick={() => handleSelectMethod('statistik')}
          className={`cursor-pointer rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
            selectedMethod === 'statistik'
              ? 'border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-300'
              : 'border-blue-200 bg-white hover:border-blue-300 hover:shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-extrabold text-xs tracking-wide shadow-xs flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                <span>3. ANALISIS STATISTIK</span>
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                {selectedMethod === 'statistik' ? '✓ Sedang Disimulasi' : 'Pilih Metode →'}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs mb-3 space-y-1.5">
              <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Analogi Sederhana:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &quot;Seperti kompas cuaca: membaca kumpulan angka tekanan udara untuk memastikan apakah hujan benar-benar akan turun.&quot;
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Menguji apakah pola angka terjadi secara kebetulan atau memiliki korelasi kuat (r), serta merumuskan persamaan regresi linier untuk memprediksi tren.
            </p>

            <div className="p-2.5 rounded-xl bg-blue-100/60 border border-blue-200 text-[11px] text-blue-950 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>Kapan Menggunakan Statistik?</span>
              </div>
              <p className="text-slate-700">
                Saat ingin menguji hipotesis signifikansi (p &lt; 0.05), regresi linier, dan koefisien determinasi (R&sup2;).
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-200 flex items-center justify-between text-xs font-bold text-blue-800">
            <span>Buka Simulasi Korelasi & Regresi</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 4. Interactive Simulation Sandbox */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-600">
              <Sliders className="w-4 h-4" />
              <span>Langkah 2: Laboratorium Simulasi Interaktif</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 font-heading mt-1">
              {selectedMethod === 'survei' && 'Simulasi 1: Pengambilan Sampel Survei (Rumus Slovin) & Distribusi Respon'}
              {selectedMethod === 'eksperimen' && 'Simulasi 2: Uji Eksperimen Kontrol A/B & Pengukuran Effect Size'}
              {selectedMethod === 'statistik' && 'Simulasi 3: Uji Korelasi Pearson (r), Scatter Plot, & Regresi Linier'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ubah parameter slider di bawah untuk melihat dampak langsung terhadap keabsahan data dan hasil riset Anda.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => handleSelectMethod('survei')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedMethod === 'survei' 
                  ? 'bg-rose-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Survei
            </button>
            <button
              onClick={() => handleSelectMethod('eksperimen')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedMethod === 'eksperimen' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Eksperimen
            </button>
            <button
              onClick={() => handleSelectMethod('statistik')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedMethod === 'statistik' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Statistik
            </button>
          </div>
        </div>

        {/* 4.1 SIMULASI SURVEI */}
        {selectedMethod === 'survei' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Slider Controls */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-rose-600" />
                      Jumlah Populasi Total (N):
                    </label>
                    <span className="text-xs font-extrabold text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs font-mono">
                      {surveyPopulation.toLocaleString('id-ID')} orang
                    </span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={20000}
                    step={200}
                    value={surveyPopulation}
                    onChange={(e) => {
                      setSurveyPopulation(Number(e.target.value));
                      handleTriggerXp('Menyesuaikan Populasi Survei Kuantitatif');
                    }}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                    <span>200 (Komunitas Kecil)</span>
                    <span>10.000 (Satu Kecamatan)</span>
                    <span>20.000 (Kota/Kabupaten)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-600" />
                    Pilih Batas Toleransi Galat (Margin of Error - e):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 0.01, label: '1% (Ketat Sekali)', desc: 'Riset Medis / Kebijakan Kritis' },
                      { val: 0.05, label: '5% (Standar Sosial)', desc: 'Standar Skripsi & Sosiologi' },
                      { val: 0.10, label: '10% (Toleransi Lebar)', desc: 'Survei Cepat / Pendahuluan' }
                    ].map(item => (
                      <button
                        key={item.val}
                        onClick={() => {
                          setSurveyMarginError(item.val);
                          handleTriggerXp('Mengubah Margin of Error Survei');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          surveyMarginError === item.val
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-black">{item.label}</div>
                        <div className={`text-[10px] mt-0.5 ${surveyMarginError === item.val ? 'text-rose-100' : 'text-slate-500'}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-indigo-600" />
                      Jumlah Butir Pertanyaan Kuesioner (Indikator):
                    </label>
                    <span className="text-xs font-extrabold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-mono">
                      {surveyItemCount} butir
                    </span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={30}
                    step={2}
                    value={surveyItemCount}
                    onChange={(e) => setSurveyItemCount(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500">
                    *Makin banyak butir pertanyaan yang valid, estimasi konsistensi internal instrumen (Cronbach&apos;s Alpha) makin tinggi.
                  </p>
                </div>
              </div>

              {/* Dynamic Live Visualization Card */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 text-white shadow-xs">
                    <span className="text-[11px] font-bold text-rose-200 uppercase tracking-wider block">
                      Ukuran Sampel Slovin (n):
                    </span>
                    <div className="text-3xl sm:text-4xl font-black font-heading mt-1">
                      {calculatedSampleSize.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[11px] text-rose-100 font-medium mt-1 block">
                      Responden minimal yang wajib diisi
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Presisi Margin of Error Nyata:
                    </span>
                    <div className="text-3xl sm:text-4xl font-black font-heading text-slate-900 mt-1">
                      ±{calculatedMoE}%
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium mt-1 block">
                      Tingkat kepercayaan 95%
                    </span>
                  </div>
                </div>

                {/* Simulated Response Distribution Graph */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-rose-950 uppercase block">
                        Simulasi Distribusi Jawaban Skala Likert ({calculatedSampleSize} Responden)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Berdasarkan rasio respon positif vs netral vs kontra
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                      Likert 1–5
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between font-bold text-slate-700 mb-1">
                        <span>Sangat Setuju & Setuju (Positif)</span>
                        <span className="text-rose-700">{surveyLikertAgreement}% ({Math.round(calculatedSampleSize * (surveyLikertAgreement / 100))} orang)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-600 rounded-full transition-all duration-300" style={{ width: `${surveyLikertAgreement}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-700 mb-1">
                        <span>Kurang Setuju / Netral</span>
                        <span className="text-amber-700">{Math.round((100 - surveyLikertAgreement) * 0.6)}% ({Math.round(calculatedSampleSize * ((100 - surveyLikertAgreement) * 0.6 / 100))} orang)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${(100 - surveyLikertAgreement) * 0.6}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-700 mb-1">
                        <span>Sangat Tidak Setuju (Kontra)</span>
                        <span className="text-slate-600">{Math.round((100 - surveyLikertAgreement) * 0.4)}% ({Math.round(calculatedSampleSize * ((100 - surveyLikertAgreement) * 0.4 / 100))} orang)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 rounded-full transition-all duration-300" style={{ width: `${(100 - surveyLikertAgreement) * 0.4}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-rose-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-900 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-rose-600" />
                      Estimasi Uji Reliabilitas Cronbach&apos;s Alpha:
                    </span>
                    <span className="font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      α = {estimatedAlpha} ({Number(estimatedAlpha) >= 0.8 ? 'Sangat Andal' : 'Cukup Andal'})
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Pelajaran Kritis Survei:</strong> Ukuran sampel {calculatedSampleSize} orang hanya sah jika ditarik menggunakan metode <em>Probability Sampling</em> (seperti Simple Random atau Stratified Random Sampling), bukan sekadar menyebar tautan ke teman terdekat (*Convenience Sampling*).
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Visual Dot Sampling Calculator */}
            <div className="pt-2">
              <SamplingCalculator onXpGained={onXpGained} />
            </div>
          </div>
        )}

        {/* 4.2 SIMULASI EKSPERIMEN */}
        {selectedMethod === 'eksperimen' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <label className="text-xs font-bold text-emerald-950 block">
                    Pilih Jenis Intervensi Sosial (Variabel Bebas):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'gamifikasi', title: 'Modul Gamifikasi', desc: 'Aplikasi belajar interaktif' },
                      { id: 'insentif', title: 'Bantuan Finansial', desc: 'Subsidi modal & mentoring' },
                      { id: 'sosialisasi', title: 'Kampanye Tatap Muka', desc: 'Sosialisasi duta warga' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTreatmentType(t.id as any);
                          handleTriggerXp('Menguji Intervensi Eksperimen');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          treatmentType === t.id
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{t.title}</div>
                        <div className={`text-[10px] ${treatmentType === t.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                          {t.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-emerald-600" />
                      Intensitas Intervensi / Pelatihan:
                    </label>
                    <span className="text-xs font-extrabold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-mono">
                      Level {treatmentIntensity} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={treatmentIntensity}
                    onChange={(e) => setTreatmentIntensity(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                    <span>1 (1x Seminar Ringan)</span>
                    <span>5 (Moderat / 3x Seminggu)</span>
                    <span>10 (Intensif Penuh / Mentoring)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4 text-blue-600" />
                      Durasi Eksperimen Berjalan:
                    </label>
                    <span className="text-xs font-extrabold text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-mono">
                      {experimentWeeks} Pekan
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={1}
                    value={experimentWeeks}
                    onChange={(e) => setExperimentWeeks(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Random Assignment Toggle - Critical Methodology Lesson */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  isRandomAssignment 
                    ? 'bg-emerald-50/70 border-emerald-300' 
                    : 'bg-rose-50/70 border-rose-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className={`w-5 h-5 ${isRandomAssignment ? 'text-emerald-600' : 'text-rose-600'}`} />
                      <div>
                        <span className="text-xs font-extrabold text-slate-900 block">
                          Metode Pembagian Kelompok (Random Assignment)
                        </span>
                        <span className="text-[11px] text-slate-600">
                          {isRandomAssignment ? 'Acak Murni (True Experiment)' : 'Non-Acak / Penunjukan Langsung (Quasi Experiment)'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsRandomAssignment(!isRandomAssignment);
                        sounds.playClick();
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-lg border transition-colors ${
                        isRandomAssignment 
                          ? 'bg-emerald-600 text-white border-emerald-600' 
                          : 'bg-rose-600 text-white border-rose-600'
                      }`}
                    >
                      {isRandomAssignment ? 'Acak (Aktif)' : 'Non-Acak (Bias)'}
                    </button>
                  </div>
                  {!isRandomAssignment && (
                    <p className="text-[11px] text-rose-700 mt-2 font-medium">
                      ⚠️ <strong>Peringatan Validitas Internal:</strong> Karena kelompok tidak diacak, perbedaan hasil bisa disebabkan oleh <em>Selection Bias</em> (misal siswa pintar yang sengaja memilih kelompok eksperimen), bukan murni efek intervensi!
                    </p>
                  )}
                </div>
              </div>

              {/* Comparison Results Card */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Hasil Komparasi Post-Test Kelompok
                    </span>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      p &lt; 0.001 (Signifikan)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Control Group */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                      <span className="text-xs font-bold text-slate-600 mb-1">
                        Kelompok Kontrol A
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-semibold mb-2">
                        Kondisi Alami (Tanpa Intervensi)
                      </span>
                      <div className="text-4xl font-black text-slate-700 font-heading my-1">
                        {baselineControlScore}
                      </div>
                      <span className="text-[11px] text-slate-500">Skor Rata-rata Baseline</span>
                    </div>

                    {/* Treatment Group */}
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 ring-2 ring-emerald-400 flex flex-col items-center text-center">
                      <span className="text-xs font-bold text-emerald-900 mb-1">
                        Kelompok Eksperimen B
                      </span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-semibold mb-2">
                        Diberi Intervensi {experimentWeeks} Pekan
                      </span>
                      <div className="text-4xl font-black text-emerald-700 font-heading my-1">
                        {finalTreatmentScore}
                      </div>
                      <span className="text-[11px] text-emerald-800 font-bold">
                        +{effectDifference} Poin Peningkatan
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar Comparison */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Kelompok Kontrol A ({baselineControlScore}%)</span>
                      <span>Kelompok Eksperimen B ({finalTreatmentScore}%)</span>
                    </div>
                    <div className="h-6 w-full bg-slate-100 rounded-xl overflow-hidden p-1 flex gap-1">
                      <div className="bg-slate-400 h-full rounded-lg transition-all duration-500" style={{ width: `${baselineControlScore}%` }}></div>
                      <div className="bg-emerald-500 h-full rounded-lg transition-all duration-500" style={{ width: `${effectDifference}%` }}></div>
                    </div>
                  </div>

                  {/* Effect Size & Statistical Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 text-[10px] block uppercase font-bold">Effect Size (Cohen&apos;s d):</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono">d = {cohenD}</span>
                      <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                        {Number(cohenD) >= 0.8 ? 'Efek Sangat Kuat' : Number(cohenD) >= 0.5 ? 'Efek Moderat' : 'Efek Lemah'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 text-[10px] block uppercase font-bold">Uji Hipotesis Kausalitas:</span>
                      <span className="text-xs font-bold text-emerald-700 block mt-1">H₀ Ditolak, H₁ Diterima</span>
                      <span className="text-[10px] text-slate-500 block">Intervensi terbukti efektif</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Prinsip Golden Standard:</strong> Eksperimen adalah satu-satunya metode kuantitatif yang dapat membuktikan <em>kausalitas murni</em> (sebab-akibat), karena peneliti memegang kendali penuh atas variabel bebas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4.3 SIMULASI STATISTIK */}
        {selectedMethod === 'statistik' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      Atur Koefisien Korelasi Pearson (r):
                    </label>
                    <span className="text-xs font-mono font-extrabold text-blue-800 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                      {correlationR > 0 ? `+${correlationR.toFixed(2)}` : correlationR.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-1}
                    max={1}
                    step={0.05}
                    value={correlationR}
                    onChange={(e) => {
                      setCorrelationR(Number(e.target.value));
                      handleTriggerXp('Menggeser Koefisien Korelasi Pearson');
                    }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>-1.0 (Korelasi Negatif Kuat)</span>
                    <span>0.0 (Acak / Nol)</span>
                    <span>+1.0 (Korelasi Positif Kuat)</span>
                  </div>
                </div>

                {/* Variable labels */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Variabel Bebas (X):</label>
                    <input
                      type="text"
                      value={varXLabel}
                      onChange={(e) => setVarXLabel(e.target.value)}
                      className="w-full px-2 py-1 text-xs font-semibold rounded bg-white border border-slate-200 text-slate-800"
                    />
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Variabel Terikat (Y):</label>
                    <input
                      type="text"
                      value={varYLabel}
                      onChange={(e) => setVarYLabel(e.target.value)}
                      className="w-full px-2 py-1 text-xs font-semibold rounded bg-white border border-slate-200 text-slate-800"
                    />
                  </div>
                </div>

                {/* Statistical interpretation card */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-blue-600" />
                    Interpretasi Hasil Uji Statistik
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-600 font-medium">Koefisien Determinasi (R²):</span>
                      <span className="font-mono font-bold text-blue-700">{rSquared}%</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Sebesar <strong>{rSquared}%</strong> perubahan pada <em>{varYLabel}</em> dapat dijelaskan secara linier oleh variabel <em>{varXLabel}</em>, sisanya dipengaruhi faktor lain.
                    </p>

                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-600 font-medium">Kekuatan Hubungan Linier:</span>
                      <span className="font-bold text-slate-900">
                        {Math.abs(correlationR) >= 0.7 
                          ? 'Sangat Kuat' 
                          : Math.abs(correlationR) >= 0.4 
                          ? 'Moderat / Sedang' 
                          : Math.abs(correlationR) >= 0.2 
                          ? 'Lemah' 
                          : 'Sangat Lemah / Tidak Berpola'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-600 font-medium">Signifikansi (p-value):</span>
                      <span className={`font-mono font-bold ${isStatisticallySignificant ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {isStatisticallySignificant ? 'p < 0.05 (Signifikan)' : 'p > 0.05 (Tidak Signifikan)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Dynamic Scatter Plot SVG */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                      Scatter Plot Interaktif & Garis Tren Regresi
                    </span>
                    <span className="text-[11px] font-mono text-amber-400">
                      Y = a + bX
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="relative w-full h-56 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-2">
                    {/* Y-axis label */}
                    <span className="absolute left-2 top-2 text-[10px] text-slate-400 font-semibold truncate max-w-[120px]">
                      ↑ {varYLabel}
                    </span>
                    {/* X-axis label */}
                    <span className="absolute right-3 bottom-2 text-[10px] text-slate-400 font-semibold truncate max-w-[120px]">
                      {varXLabel} →
                    </span>

                    <svg className="w-full h-full" viewBox="0 0 300 200">
                      {/* Axes */}
                      <line x1="35" y1="20" x2="35" y2="175" stroke="#475569" strokeWidth="1.5" />
                      <line x1="35" y1="175" x2="285" y2="175" stroke="#475569" strokeWidth="1.5" />

                      {/* Grid lines */}
                      <line x1="35" y1="100" x2="285" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="160" y1="20" x2="160" y2="175" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Data Points */}
                      {Array.from({ length: 22 }).map((_, i) => {
                        const norm = (i - 10.5) / 10.5; // -1 to 1
                        const noise = Math.sin(i * 4.3 + 1.2) * (1 - Math.abs(correlationR)) * 40;
                        const cx = 55 + i * 10;
                        const baseY = 100 - (norm * correlationR * 65);
                        const cy = Math.max(25, Math.min(165, baseY + noise));

                        return (
                          <circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r="4"
                            fill="#38bdf8"
                            opacity="0.85"
                            className="transition-all duration-300"
                          />
                        );
                      })}

                      {/* Linear Regression Trend Line */}
                      <line
                        x1="45"
                        y1={100 + correlationR * 60}
                        x2="275"
                        y2={100 - correlationR * 60}
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeDasharray="5 3"
                        className="transition-all duration-300"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span>
                      Titik Data Observasi
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-0.5 bg-amber-400 inline-block"></span>
                      Garis Regresi Linier Terpilih
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Hukum Emas Statistik Sosial:</strong> <em>&quot;Correlation does not imply causation&quot;</em> (Korelasi tidak selalu berarti sebab-akibat). Angka korelasi tinggi bisa saja merupakan korelasi semu (*spurious correlation*) yang dipicu variabel ketiga.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. FITUR UTAMA: GENERATOR REKOMENDASI METODOLOGI KUANTITATIF OTOMATIS */}
      <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl border-2 border-blue-200 p-5 sm:p-7 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Generator Rekomendasi Metodologi Otomatis</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-1.5">
              Rekomendasi Metodologi Kuantitatif Riset Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Disusun secara otomatis berdasarkan parameter simulasi yang Anda operasikan untuk draf Bab 3 &amp; proposal penelitian.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Score meter */}
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Skor Kelayakan Metodologis
              </span>
              <div className="text-2xl font-black text-blue-700 font-heading">
                {methodologyScore} / 100
              </div>
            </div>

            <button
              onClick={handleCopyRecommendation}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Ringkasan Rekomendasi'}</span>
            </button>
          </div>
        </div>

        {/* 4 Cards of Tailored Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Rekomendasi Sampling */}
          <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
              <Users className="w-4 h-4 text-rose-600" />
              <span>1. Rekomendasi Ukuran &amp; Teknik Sampling</span>
            </div>
            <div className="text-xs text-slate-700 space-y-1.5">
              <p>
                • <strong>Ukuran Sampel Minimum:</strong> Rekomendasi Slovin adalah minimal <strong>{calculatedSampleSize} orang</strong> dengan Margin of Error {surveyMarginError * 100}% dari populasi {surveyPopulation.toLocaleString('id-ID')} orang.
              </p>
              <p>
                • <strong>Teknik Sampling yang Tepat:</strong> Gunakan <em>{surveyPopulation > 2000 ? 'Stratified Random Sampling' : 'Simple Random Sampling'}</em> agar seluruh sub-kelompok demografi (usia, gender, wilayah) terwakili tanpa bias pemilihan subyektif.
              </p>
            </div>
          </div>

          {/* Card 2: Rekomendasi Uji Instrumen */}
          <div className="p-4 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>2. Standar Validitas &amp; Reliabilitas Instrumen</span>
            </div>
            <div className="text-xs text-slate-700 space-y-1.5">
              <p>
                • <strong>Uji Coba Awal (Pilot Testing):</strong> Wajib menguji kuesioner ke minimal <strong>30 responden</strong> di luar sampel utama untuk menghitung korelasi Pearson tiap butir (r-hitung &gt; r-tabel).
              </p>
              <p>
                • <strong>Reliabilitas:</strong> Nilai ambang batas <em>Cronbach&apos;s Alpha</em> wajib &ge; 0.70. Pada simulasi Anda, dengan {surveyItemCount} butir pertanyaan terstruktur, estimasi konsistensi internal mencapai &alpha; = {estimatedAlpha}.
              </p>
            </div>
          </div>

          {/* Card 3: Rekomendasi Desain Kausalitas */}
          <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>3. Desain Kausalitas &amp; Pengendalian Bias</span>
            </div>
            <div className="text-xs text-slate-700 space-y-1.5">
              <p>
                • <strong>Desain Kelompok:</strong> Disarankan menggunakan <em>Pre-test &amp; Post-test Control Group Design</em>. Kelompok Kontrol memastikan perubahan bukan sekadar efek berjalannya waktu (*maturation effect*).
              </p>
              <p>
                • <strong>Pengacakan:</strong> {isRandomAssignment ? 'Pertahankan Random Assignment agar kelompok sebanding.' : 'Lakukan penyesuaian kovariat (ANCOVA) untuk mengontrol Selection Bias akibat penunjukan non-acak.'}
              </p>
            </div>
          </div>

          {/* Card 4: Rekomendasi Analisis Statistik */}
          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-xs">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>4. Pemilihan Rumus Uji Hipotesis Statistik</span>
            </div>
            <div className="text-xs text-slate-700 space-y-1.5">
              <p>
                • <strong>Uji Beda (Eksperimen):</strong> Gunakan <em>Independent Sample t-test</em> jika data terdistribusi normal, atau <em>Mann-Whitney U test</em> jika skala data ordinal.
              </p>
              <p>
                • <strong>Uji Hubungan / Pengaruh:</strong> Gunakan <em>Analisis Regresi Linier Berganda</em> dengan taraf signifikansi &alpha; = 0.05. Nilai R&sup2; = {rSquared}% membuktikan kontribusi empiris variabel bebas terhadap variabel terikat.
              </p>
            </div>
          </div>
        </div>

        {/* Action button row */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-blue-900 font-medium">
            <Lightbulb className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Rekomendasi di atas dapat langsung disalin ke subbab Metode Penelitian (Bab 3) proposal Anda.</span>
          </div>

          <button
            onClick={handleCopyRecommendation}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Salin untuk Proposal Bab 3'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple Clock Icon helper for Experiment Weeks
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
