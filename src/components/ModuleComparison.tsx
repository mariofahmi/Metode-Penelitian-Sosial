import React, { useState } from 'react';
import { 
  COMPARISON_POINTS_QUANTITATIVE, 
  COMPARISON_POINTS_QUALITATIVE, 
  TABLE_5_COMPARISONS, 
  COMPARISON_SUMMARY_QUOTE 
} from '../data/socialResearchData';
import { 
  TrendingUp, 
  Users, 
  FlaskConical, 
  BarChart3, 
  BookOpen, 
  UserCheck, 
  MessageSquare, 
  Heart,
  Scale,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Table as TableIcon,
  Layers,
  Search,
  ArrowRightLeft,
  ChevronDown,
  Info
} from 'lucide-react';

export const ModuleComparison: React.FC = () => {
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null);
  const [selectedDimension, setSelectedDimension] = useState<string | null>('Pertanyaan Kunci');
  const [interactiveQuestion, setInteractiveQuestion] = useState<'persentase' | 'trauma' | 'evaluasi'>('persentase');

  // Vector Icon Helper for Image 1 Cards
  const renderPointIcon = (iconName: string, isQuantitative: boolean) => {
    const baseClass = "w-6 h-6 sm:w-7 sm:h-7";
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className={baseClass} />;
      case 'Users': return <Users className={baseClass} />;
      case 'FlaskConical': return <FlaskConical className={baseClass} />;
      case 'BarChart3': return <BarChart3 className={baseClass} />;
      case 'BookOpen': return <BookOpen className={baseClass} />;
      case 'UserCheck': return <UserCheck className={baseClass} />;
      case 'MessageSquare': return <MessageSquare className={baseClass} />;
      case 'Heart': return <Heart className={baseClass} />;
      default: return <Sparkles className={baseClass} />;
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Top Section Intro Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#072f4a] via-[#0c4a6e] to-[#0e7490] border border-teal-400/30 p-6 sm:p-8 text-white shadow-xl shadow-teal-950/20">
        <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-72 h-36 rounded-full bg-teal-300/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300/30 text-emerald-200">
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-300" />
            Matriks Perbandingan Komparatif
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight mb-2 text-white drop-shadow-xs">
            Perbandingan Penelitian Kuantitatif vs Kualitatif
          </h1>
          <p className="text-sm sm:text-base text-teal-50/95 font-medium leading-relaxed">
            Menyelami perbedaan mendasar paradigma, instrumen, jenis data, serta kekuatan dan batas epistemologis kedua pendekatan riset sosial.
          </p>
        </div>
      </div>

      {/* SECTION 1: Exact Replication of Image 1 Infographic */}
      <div className="bg-white rounded-3xl border-2 border-slate-300/80 shadow-md p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Visualisasi Perbandingan 4 Titik Kunci
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 font-heading">
              Karakteristik Pokok Dua Paradigma
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
            Klik nomor poin untuk menelaah relasi komplementer
          </span>
        </div>

        {/* 2-Column Split: Navy (Kuantitatif) vs Orange (Kualitatif) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column: PENELITIAN KUANTITATIF (Navy Blue) */}
          <div className="flex flex-col rounded-2xl border-2 border-[#0e2a54] bg-[#fafcff] overflow-hidden shadow-xs">
            {/* Header Header Bar */}
            <div className="bg-[#0f2d59] text-white py-3.5 px-5 text-center shadow-xs">
              <h3 className="text-lg sm:text-xl font-extrabold tracking-wider uppercase font-heading">
                PENELITIAN KUANTITATIF
              </h3>
            </div>

            {/* List of 4 Points */}
            <div className="p-4 sm:p-5 flex-1 space-y-3 sm:space-y-4">
              {COMPARISON_POINTS_QUANTITATIVE.map((item, idx) => {
                const isSelected = selectedPointIndex === idx;
                return (
                  <div
                    key={item.num}
                    onClick={() => setSelectedPointIndex(isSelected ? null : idx)}
                    className={`cursor-pointer p-3 sm:p-3.5 rounded-xl border-2 transition-all flex items-center gap-3.5 ${
                      isSelected
                        ? 'border-[#0f2d59] bg-blue-50/80 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
                  >
                    {/* Circle Icon Badge matching image 1 */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0f2d59] text-white flex items-center justify-center shrink-0 shadow-xs border-2 border-white ring-2 ring-blue-100">
                      {renderPointIcon(item.icon, true)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-extrabold text-[#0f2d59] font-heading">
                          {item.num}. {item.title}
                        </span>
                      </div>
                      {isSelected && (
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-white p-2 rounded-lg border border-blue-100 animate-fadeIn">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: PENELITIAN KUALITATIF (Orange) */}
          <div className="flex flex-col rounded-2xl border-2 border-[#ff6600] bg-[#fffaf5] overflow-hidden shadow-xs">
            {/* Header Header Bar */}
            <div className="bg-[#ff6600] text-white py-3.5 px-5 text-center shadow-xs">
              <h3 className="text-lg sm:text-xl font-extrabold tracking-wider uppercase font-heading">
                PENELITIAN KUALITATIF
              </h3>
            </div>

            {/* List of 4 Points */}
            <div className="p-4 sm:p-5 flex-1 space-y-3 sm:space-y-4">
              {COMPARISON_POINTS_QUALITATIVE.map((item, idx) => {
                const isSelected = selectedPointIndex === idx;
                return (
                  <div
                    key={item.num}
                    onClick={() => setSelectedPointIndex(isSelected ? null : idx)}
                    className={`cursor-pointer p-3 sm:p-3.5 rounded-xl border-2 transition-all flex items-center gap-3.5 ${
                      isSelected
                        ? 'border-[#ff6600] bg-orange-50/80 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/30'
                    }`}
                  >
                    {/* Circle Icon Badge matching image 1 */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#ff6600] text-white flex items-center justify-center shrink-0 shadow-xs border-2 border-white ring-2 ring-orange-100">
                      {renderPointIcon(item.icon, false)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-extrabold text-[#d95700] font-heading">
                          {item.num}. {item.title}
                        </span>
                      </div>
                      {isSelected && (
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-white p-2 rounded-lg border border-orange-100 animate-fadeIn">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Banner from Image 1: Core Insight Quote */}
        <div className="p-4 sm:p-5 rounded-2xl border-2 border-slate-800 bg-slate-900 text-white text-center shadow-xs">
          <p className="text-base sm:text-xl font-extrabold font-heading tracking-tight leading-snug">
            "{COMPARISON_SUMMARY_QUOTE.quote}"
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-400/50 text-blue-200">
              <BarChart3 className="w-3.5 h-3.5" /> <strong>Kuantitatif:</strong> {COMPARISON_SUMMARY_QUOTE.quantitativeKeyword}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-400/50 text-orange-200">
              <Heart className="w-3.5 h-3.5" /> <strong>Kualitatif:</strong> {COMPARISON_SUMMARY_QUOTE.qualitativeKeyword}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Exact Recreation of Image 2 (Tabel 5) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
            <TableIcon className="w-4 h-4" /> Rujukan Akademik Metodologi
          </span>
          <h2 className="text-lg sm:text-2xl font-bold italic text-slate-900 font-heading mt-1">
            Tabel 5. Perbandingan Pendekatan Kuantitatif dan Kualitatif
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tabel komprehensif menguraikan 6 dimensi esensial mulai dari fokus ontologis hingga kekuatan dan batasan riset.
          </p>
        </div>

        {/* Mobile Swipe Hint Badge */}
        <div className="md:hidden flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-indigo-50/90 border border-indigo-200 text-[11px] font-bold text-indigo-900">
          <span className="flex items-center gap-1.5">
            <span className="animate-pulse">👉</span>
            <span>Geser ke samping (swipe) untuk membaca tabel lengkap</span>
          </span>
          <span className="text-[10px] bg-indigo-200/70 px-2 py-0.5 rounded text-indigo-800">
            6 Dimensi
          </span>
        </div>

        {/* Clean Responsive Table matching Image 2 formatting */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-700 shadow-xs touch-pan-x">
          <table className="w-full min-w-[620px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-300 text-slate-900 border-b-2 border-slate-700">
                <th className="p-3 sm:p-4 text-xs sm:text-sm font-extrabold uppercase tracking-wide border-r border-slate-500 w-1/4">
                  Dimensi
                </th>
                <th className="p-3 sm:p-4 text-xs sm:text-sm font-extrabold uppercase tracking-wide border-r border-slate-500 w-[38%] text-[#0e2a54]">
                  Pendekatan Kuantitatif
                </th>
                <th className="p-3 sm:p-4 text-xs sm:text-sm font-extrabold uppercase tracking-wide w-[38%] text-[#c44900]">
                  Pendekatan Kualitatif
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 text-xs sm:text-sm">
              {TABLE_5_COMPARISONS.map((row) => {
                const isSelected = selectedDimension === row.dimensi;
                return (
                  <tr 
                    key={row.dimensi}
                    onClick={() => setSelectedDimension(isSelected ? null : row.dimensi)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-indigo-50/80 font-medium' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-3 sm:p-4 font-bold text-slate-900 border-r border-slate-300 align-top bg-slate-100/60">
                      <div className="flex items-center justify-between">
                        <span>{row.dimensi}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? 'rotate-180 text-indigo-600' : ''}`} />
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 text-slate-800 border-r border-slate-300 align-top leading-relaxed">
                      {row.dimensi === 'Pertanyaan Kunci' ? (
                        <>Berapa <span className="underline decoration-blue-600 font-semibold text-blue-700">banyak?</span>, Apa hubungannya?</>
                      ) : (
                        row.kuantitatif
                      )}
                    </td>
                    <td className="p-3 sm:p-4 text-slate-800 align-top leading-relaxed">
                      {row.dimensi === 'Pertanyaan Kunci' ? (
                        <><span className="underline decoration-orange-600 font-semibold text-orange-700">Mengapa?</span>, Bagaimana?</>
                      ) : (
                        row.kualitatif
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Dimension Deep-Dive Insight Box */}
        {selectedDimension && (
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-950">
                  Ulasan Dimensi: {selectedDimension}
                </h4>
                <p className="text-xs text-indigo-900 mt-1 leading-relaxed">
                  {TABLE_5_COMPARISONS.find(r => r.dimensi === selectedDimension)?.penjelasan}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: Interactive Decision Matrix ("Kapan Menggunakan Mana?") */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              Simulator Keputusan Metodologi: Mana yang Harus Dipilih?
            </h3>
            <p className="text-xs text-slate-500">
              Pilih pertanyaan penelitian di bawah ini untuk melihat rekomendasi strategi pendekatan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setInteractiveQuestion('persentase')}
            className={`p-3.5 text-left rounded-2xl border-2 transition-all ${
              interactiveQuestion === 'persentase'
                ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold ring-2 ring-blue-200'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="text-[11px] uppercase tracking-wider text-blue-600 block mb-1">Kasus 1</span>
            <p className="text-xs font-semibold">"Berapa persen remaja kota yang mengalami kecanduan game online dan bagaimana hubungannya dengan prestasi sekolah?"</p>
          </button>

          <button
            onClick={() => setInteractiveQuestion('trauma')}
            className={`p-3.5 text-left rounded-2xl border-2 transition-all ${
              interactiveQuestion === 'trauma'
                ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold ring-2 ring-orange-200'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="text-[11px] uppercase tracking-wider text-orange-600 block mb-1">Kasus 2</span>
            <p className="text-xs font-semibold">"Mengapa masyarakat adat di lereng gunung menolak relokasi pasca-erupsi, dan bagaimana mereka memaknai tanah leluhur?"</p>
          </button>

          <button
            onClick={() => setInteractiveQuestion('evaluasi')}
            className={`p-3.5 text-left rounded-2xl border-2 transition-all ${
              interactiveQuestion === 'evaluasi'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="text-[11px] uppercase tracking-wider text-emerald-600 block mb-1">Kasus 3</span>
            <p className="text-xs font-semibold">"Seberapa efektif program makan siang bergizi gratis di 500 sekolah, dan bagaimana kendala nyata distribusinya di pelosok?"</p>
          </button>
        </div>

        {/* Strategy Outcome Box */}
        <div className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-3">
          {interactiveQuestion === 'persentase' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#0e2a54]">
                <BarChart3 className="w-5 h-5 text-blue-700" />
                <span>Rekomendasi Mutlak: Pendekatan Kuantitatif (Survei Angket & Regresi)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Karena pertanyaan kunci berfokus pada <strong>"Berapa banyak?"</strong> dan <strong>"Apa hubungannya?"</strong>, Anda membutuhkan sampel besar representatif (misalnya 600 siswa acak) dan instrumen skala Likert baku untuk mengukur koefisien korelasi ($r$).
              </p>
            </div>
          )}

          {interactiveQuestion === 'trauma' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#d95700]">
                <Heart className="w-5 h-5 text-orange-600" />
                <span>Rekomendasi Mutlak: Pendekatan Kualitatif (Wawancara Mendalam & Etnografi)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Karena pertanyaan kunci berfokus pada <strong>"Mengapa?"</strong> dan <strong>"Bagaimana mereka memaknai?"</strong>, angka statistik kuesioner tidak akan mampu menangkap ikatan batin spiritual warga. Peneliti harus hadir langsung di tenda pengungsian, mendengarkan narasi lisan, dan mengamati interaksi sosial warga secara mendalam.
              </p>
            </div>
          )}

          {interactiveQuestion === 'evaluasi' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-800">
                <Layers className="w-5 h-5 text-emerald-700" />
                <span>Rekomendasi Sempurna: Metode Campuran (Mixed Methods - Kuantitatif & Kualitatif)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Pertanyaan ini menggabungkan <strong>"Seberapa besar capaian"</strong> (kuantitatif: persentase indeks gizi & kehadiran siswa di 500 sekolah) dengan <strong>"Alasan dan proses kendala lapangan"</strong> (kualitatif: wawancara mendalam dengan kepala sekolah dan dapur umum). Keduanya saling melengkapi untuk menghasilkan kebijakan publik yang kokoh!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
