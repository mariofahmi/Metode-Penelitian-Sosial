import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { sounds } from '../utils/soundEffects';
import logoMf from '../assets/logo-mf.png';
import { 
  Compass, 
  BookOpen, 
  FlaskConical, 
  AlertTriangle, 
  ArrowRightLeft, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Target, 
  Award, 
  FileText, 
  Layers, 
  BookMarked, 
  ChevronRight,
  Sliders,
  Users,
  BarChart3,
  Lightbulb,
  Zap,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  userXp: number;
  userLevelName: string;
  openGlossary: () => void;
  onXpGained?: (amount: number, reason: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  setActiveTab,
  userXp,
  userLevelName,
  openGlossary,
  onXpGained
}) => {
  // State Diagnostik Cepat (Methodology Quick Finder)
  const [goal, setGoal] = useState<'makna' | 'angka' | 'uji_coba' | null>(null);
  const [dataType, setDataType] = useState<'kata' | 'skor' | null>(null);
  const [sampleTarget, setSampleTarget] = useState<'kecil' | 'luas' | null>(null);
  const [hasDiagnosed, setHasDiagnosed] = useState<boolean>(false);

  const handleNavigate = (tab: ActiveTab, reason?: string) => {
    sounds.playClick();
    if (reason && onXpGained) {
      onXpGained(20, reason);
    }
    setActiveTab(tab);
  };

  // Hitung rekomendasi diagnostik
  const getRecommendation = () => {
    if (goal === 'makna' || dataType === 'kata' || sampleTarget === 'kecil') {
      return {
        tab: 'kualitatif' as ActiveTab,
        title: 'Pendekatan Kualitatif (Wawancara, Observasi & Studi Kasus)',
        reason: 'Riset Anda membutuhkan eksplorasi mendalam atas makna, motif emosional, dan perilaku alamiah warga.',
        action: 'Mulai Pelajari Kualitatif',
        color: 'from-sky-500 to-blue-600'
      };
    }
    if (goal === 'uji_coba') {
      return {
        tab: 'kuantitatif' as ActiveTab,
        title: 'Metode Eksperimen Sosial Terkontrol (Kuantitatif)',
        reason: 'Riset Anda bertujuan menguji keefektifan suatu program/intervensi dengan membandingkan Kelompok Kontrol vs Perlakuan.',
        action: 'Mulai Eksperimen Sosial',
        color: 'from-sky-500 to-teal-600'
      };
    }
    return {
      tab: 'kuantitatif' as ActiveTab,
      title: 'Pendekatan Kuantitatif (Survei Kuesioner & Statistik)',
      reason: 'Riset Anda berorientasi pada pengukuran numerik, pengujian korelasi/regresi, dan generalisasi populasi luas.',
      action: 'Mulai Pelajari Kuantitatif',
      color: 'from-sky-500 to-indigo-600'
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      {/* 1. Hero Welcome Banner (Deep Ocean & Emerald Mint) */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#072f4a] via-[#0c4a6e] to-[#0e7490] border border-teal-400/30 p-5 sm:p-8 md:p-10 text-white shadow-xl shadow-teal-950/20">
        {/* Ambient atmospheric glow elements */}
        <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-40 rounded-full bg-teal-300/20 blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/15 backdrop-blur-md text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-emerald-300/30 text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              Pusat Navigasi &amp; Peta Jalan Riset
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] sm:text-xs font-medium text-white border border-white/25 shadow-2xs">
              <img src={logoMf} alt="MF" className="w-4 h-4 object-contain rounded shrink-0 bg-white/20 p-0.5" />
              <span className="text-teal-200">Perancang:</span>
              <strong className="font-black text-white tracking-wide uppercase">MARIO FAHMI SYARIAL</strong>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight leading-tight text-white drop-shadow-xs">
            Selamat Datang di Laboratorium Metode Penelitian Sosial
          </h1>

          <p className="text-xs sm:text-base text-teal-50/95 leading-relaxed font-normal max-w-2xl">
            Platform interaktif untuk memandu mahasiswa dan peneliti memahami paradigma riset sosial, mencegah bias metodologis, dan menyusun draf Bab 3 skripsi dengan mudah.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={() => handleNavigate('lab', 'Membuka Lab Desain Riset dari Dashboard')}
              className="w-full sm:w-auto justify-center px-5 py-3 sm:py-2.5 bg-gradient-to-r from-emerald-400 to-teal-300 text-teal-950 hover:from-emerald-300 hover:to-teal-200 rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-teal-950/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 touch-manipulation"
            >
              <FlaskConical className="w-4 h-4 text-teal-950" />
              <span>Rancang Draf Bab 3 di Lab Riset</span>
              <ArrowRight className="w-4 h-4 text-teal-950" />
            </button>

            <button
              onClick={() => {
                const diagEl = document.getElementById('method-finder');
                diagEl?.scrollIntoView({ behavior: 'smooth' });
                sounds.playClick();
              }}
              className="w-full sm:w-auto justify-center px-4 py-3 sm:py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/25 rounded-xl font-bold text-xs sm:text-sm backdrop-blur-xs transition-all flex items-center gap-2 touch-manipulation"
            >
              <HelpCircle className="w-4 h-4 text-emerald-200" />
              <span>Kuis: Tentukan Metode Anda (1 Menit)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Peta Jalan Riset Sosial (Research Roadmap: 4 Langkah Pasti) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-teal-100/80 p-4 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-teal-600" /> Peta Jalan Alur Riset Sosial
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
              Empat Tahapan Membangun Penelitian Sosial yang Kredibel
            </h2>
          </div>
          <span className="text-xs text-teal-800 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200/80 self-start sm:self-auto">
            Terstandar Metodologi Ilmiah
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          {/* Step 1 */}
          <div 
            onClick={() => handleNavigate('komparasi')}
            className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/80 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-2xs">1</span>
                <span className="text-[10px] font-bold text-teal-800 uppercase">Paradigma</span>
              </div>
              <h3 className="text-xs font-black text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                Tentukan Pendekatan
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Pilih antara Kualitatif (kedalaman makna) atau Kuantitatif (pengukuran angka).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-teal-100 text-[11px] font-bold text-teal-700 flex items-center gap-1">
              <span>Bandingkan Metode</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => handleNavigate('kuantitatif')}
            className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/80 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-2xs">2</span>
                <span className="text-[10px] font-bold text-teal-800 uppercase">Instrumen</span>
              </div>
              <h3 className="text-xs font-black text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                Rancang Sampling &amp; Alat
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Kuesioner skala Likert, kalkulator Slovin, panduan wawancara, atau matriks observasi.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-teal-100 text-[11px] font-bold text-teal-700 flex items-center gap-1">
              <span>Buka Simulasi Sampel</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => handleNavigate('masalah')}
            className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/80 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-2xs">3</span>
                <span className="text-[10px] font-bold text-teal-800 uppercase">Audit Etika</span>
              </div>
              <h3 className="text-xs font-black text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                Cegah Tiga Bias Fatal
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Hindari cherry-picking data, kacamata emosional, dan klaim generalisasi berlebihan.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-teal-100 text-[11px] font-bold text-teal-700 flex items-center gap-1">
              <span>Uji Imunitas Bias</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 4 */}
          <div 
            onClick={() => handleNavigate('lab')}
            className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/80 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-2xs">4</span>
                <span className="text-[10px] font-bold text-teal-800 uppercase">Ekspor Bab 3</span>
              </div>
              <h3 className="text-xs font-black text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                Draf Proposal Ilmiah
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Simulator interaktif otomatis menyusun draf Bab 3 siap salin ke skripsi Anda.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-teal-100 text-[11px] font-bold text-teal-700 flex items-center gap-1">
              <span>Buka Lab Bab 3</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pusat Modul Interaktif (Interactive Hub: 5 Pintu Masuk) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-teal-600" /> Modul Pembelajaran Utama
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
              Pilih Modul yang Ingin Anda Pelajari
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:block">
            Klik kartu untuk langsung menuju modul
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Kualitatif */}
          <div
            onClick={() => handleNavigate('kualitatif')}
            className="p-5 rounded-3xl bg-white border-2 border-teal-100/80 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal-500"></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Modul 1
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors font-heading">
                  Pendekatan Kualitatif
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Menggali makna mendalam lewat <strong>Wawancara Terbuka</strong>, <strong>Observasi Lapangan</strong>, dan <strong>Studi Kasus Triangulasi</strong>.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-600">
                <span className="px-2 py-0.5 bg-slate-100 rounded-md">Dialog Informan</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md">Timeline Observasi</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md">Triangulasi Data</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-800">
              <span>Buka Modul Kualitatif</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Kuantitatif */}
          <div
            onClick={() => handleNavigate('kuantitatif')}
            className="p-5 rounded-3xl bg-white border-2 border-teal-100/80 hover:border-cyan-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-600"></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                  Modul 2
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-cyan-700 transition-colors font-heading">
                  Pendekatan Kuantitatif
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Membuktikan data angka dengan <strong>Kalkulator Slovin</strong>, <strong>Eksperimen Kontrol A/B</strong>, dan <strong>Scatter Plot Korelasi Pearson</strong>.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-600">
                <span className="px-2 py-0.5 bg-slate-100 rounded-md">Rumus Slovin</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md">Effect Size d</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md">R² Determinasi</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-700 group-hover:text-cyan-800">
              <span>Buka Modul Kuantitatif</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Tiga Masalah */}
          <div
            onClick={() => handleNavigate('masalah')}
            className="p-5 rounded-3xl bg-white border-2 border-teal-100/80 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500"></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Modul 3
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors font-heading">
                  Tiga Masalah &amp; Bias
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Menghindari jebakan <strong>Cherry-Picking</strong>, <strong>Kacamata Emosional</strong>, dan <strong>Generalisasi Keliru</strong> pada skripsi Anda.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-600">
                <span className="px-2 py-0.5 bg-slate-100 rounded-md">Detektor Bias</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md">Slider Refleksivitas</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md">Checklist Audit Bebas Bias</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
              <span>Buka Modul Tiga Masalah</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* 2 Bottom Wide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
          {/* Card 4: Komparasi */}
          <div
            onClick={() => handleNavigate('komparasi')}
            className="p-5 rounded-3xl bg-white border-2 border-teal-100/80 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors font-heading">
                  Modul Komparasi: Kuantitatif vs Kualitatif
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tabel perbandingan 5 dimensi epistemologis dan 4 poin kunci karakteristik metodologi.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
          </div>

          {/* Card 5: Lab Riset Bab 3 */}
          <div
            onClick={() => handleNavigate('lab')}
            className="p-5 rounded-3xl bg-gradient-to-r from-teal-700 via-cyan-800 to-blue-900 text-white hover:shadow-lg transition-all cursor-pointer flex items-center justify-between group shadow-sm shadow-teal-900/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold shrink-0 backdrop-blur-xs">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200 block">
                  Alat Praktis Skripsi
                </span>
                <h3 className="text-sm sm:text-base font-black text-white font-heading">
                  Laboratorium Desain Riset &amp; Generator Bab 3
                </h3>
                <p className="text-xs text-teal-100 mt-0.5">
                  Uji instrumen otomatis dan dapatkan rekomendasi metodologis ilmiah siap salin.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1.5 transition-all shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* 4. Fitur Diagnostik Pintar: "Pencari Arah Metodologi" (1-Minute Quick Finder) */}
      <div 
        id="method-finder"
        className="bg-white rounded-3xl border-2 border-teal-200/90 p-5 sm:p-7 shadow-xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              <HelpCircle className="w-4 h-4 text-teal-600" />
              <span>Fitur Diagnostik Cepat (1 Menit)</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 font-heading mt-1">
              Bingung Memilih Metode? Temukan Pendekatan Riset Anda!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Jawab 3 pertanyaan simpel di bawah ini untuk mengetahui apakah riset Anda masuk kategori Kualitatif, Kuantitatif, atau Eksperimen.
            </p>
          </div>

          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200/80 self-start sm:self-auto">
            Interactive Method Finder
          </span>
        </div>

        {/* 3 Interactive Questions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Question 1: Goal */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-teal-600" /> 1. Apa Tujuan Utama Riset Anda?
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => { setGoal('makna'); sounds.playClick(); }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                  goal === 'makna' 
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-600 font-bold shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Menyelami makna, motif, atau pengalaman hidup narasumber
              </button>

              <button
                type="button"
                onClick={() => { setGoal('angka'); sounds.playClick(); }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                  goal === 'angka' 
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-600 font-bold shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Menguji seberapa besar pengaruh X terhadap Y secara numerik
              </button>

              <button
                type="button"
                onClick={() => { setGoal('uji_coba'); sounds.playClick(); }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                  goal === 'uji_coba' 
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-600 font-bold shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Menguji coba program baru (membandingkan kontrol vs perlakuan)
              </button>
            </div>
          </div>

          {/* Question 2: Data Type */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-600" /> 2. Bentuk Data yang Dikumpulkan?
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => { setDataType('kata'); sounds.playClick(); }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                  dataType === 'kata' 
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-600 font-bold shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Transkrip dialog, kutipan cerita warga, dan catatan pengamatan
              </button>

              <button
                type="button"
                onClick={() => { setDataType('skor'); sounds.playClick(); }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                  dataType === 'skor' 
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-600 font-bold shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Skor skala Likert kuesioner, persentase, dan angka statistik
              </button>
            </div>
          </div>

          {/* Question 3: Target Sample */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-600" /> 3. Berapa Target Responden/Informan?
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => { setSampleTarget('kecil'); sounds.playClick(); }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                  sampleTarget === 'kecil' 
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-600 font-bold shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Sedikit namun mendalam (5 – 30 informan kunci / spesifik)
              </button>

              <button
                type="button"
                onClick={() => { setSampleTarget('luas'); sounds.playClick(); }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                  sampleTarget === 'luas' 
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-600 font-bold shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Banyak responden agar representatif (100 – 1.000+ orang)
              </button>
            </div>
          </div>
        </div>

        {/* Diagnosis Result Box */}
        {(goal || dataType || sampleTarget) && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50/40 to-cyan-50 border-2 border-teal-300 space-y-3 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                  Hasil Rekomendasi Diagnostik Otomatis:
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                  {recommendation.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {recommendation.reason}
                </p>
              </div>

              <button
                onClick={() => handleNavigate(recommendation.tab, `Menemukan Metode ${recommendation.tab.toUpperCase()} lewat Quick Finder`)}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-teal-600/25 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>{recommendation.action}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. Researcher Status & Quick Glossary Banner */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-xl font-black shadow-xs shrink-0">
            🎓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Status Riset Anda:</span>
              <span className="text-xs font-black text-emerald-300 font-mono">{userLevelName}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">{userXp} XP</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Jelajahi seluruh simulasi untuk menambah wawasan metodologi dan membuka rekomendasi otomatis.
            </p>
          </div>
        </div>

        <button
          onClick={() => { sounds.playClick(); openGlossary(); }}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white rounded-xl text-xs font-bold border border-slate-700 hover:border-teal-500 transition-all flex items-center gap-2 shrink-0"
        >
          <BookMarked className="w-4 h-4 text-teal-400" />
          <span>Kamus Glosarium Istilah</span>
        </button>
      </div>
    </div>
  );
};
