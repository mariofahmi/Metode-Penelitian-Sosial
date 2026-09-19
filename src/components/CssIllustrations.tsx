import React from 'react';
import { 
  Filter, 
  Glasses, 
  Globe, 
  Heart, 
  Coins, 
  Scale, 
  Search, 
  Users, 
  CheckCircle2, 
  FileText, 
  CheckSquare, 
  Building2, 
  TreePine, 
  Sparkles,
  Phone,
  MessageCircle,
  HelpCircle,
  FlaskConical,
  BarChart2,
  FolderKanban,
  ClipboardList,
  UserCheck,
  Smile
} from 'lucide-react';

/**
 * 100% Pure CSS and Vector (Lucide Icons + Tailwind) Visual Components
 * Replicating the infographic metaphors without any external raster image files.
 */

// 1. CORONG PENYARING RUSAK (BIAS METAFOR DARI INFOGRAFIS 3)
export const BrokenFunnelGraphic: React.FC<{ cherryPickActive: boolean }> = ({ cherryPickActive }) => {
  return (
    <div id="broken-funnel-graphic" className="relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-orange-50 to-amber-50/50 rounded-2xl border border-orange-200 shadow-sm overflow-hidden">
      {/* Top Tag */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700 uppercase tracking-wide mb-3">
        <Filter className="w-4 h-4 text-orange-600" />
        <span>Corong Penyaring Data {cherryPickActive ? '(Terdistorsi / Bias)' : '(Netral & Lengkap)'}</span>
      </div>

      {/* Input Data: Various shapes/colors representing diverse real-world facts */}
      <div className="w-full max-w-[260px] flex flex-wrap justify-center gap-1.5 p-2.5 bg-white/90 rounded-xl border border-orange-200/80 mb-2 shadow-inner">
        <span className="text-[11px] font-semibold text-slate-500 w-full text-center block mb-1">
          Fakta Lapangan Nyata (Beragam Bentuk & Sudut Pandang)
        </span>
        <div className="flex items-center justify-center gap-2">
          <span className="w-6 h-6 rounded-md bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">■</span>
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">●</span>
          <span className="w-6 h-6 rotate-45 bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">◆</span>
          <span className="w-6 h-6 rounded-sm bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">▲</span>
          <span className="w-6 h-6 rounded-md bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">★</span>
        </div>
      </div>

      {/* The Funnel CSS Representation */}
      <div className="relative w-44 h-24 flex flex-col items-center">
        {/* Upper Funnel cone */}
        <div 
          className={`w-40 h-16 border-t-8 border-x-[36px] border-b-0 border-transparent transition-all duration-500 ${
            cherryPickActive 
              ? 'border-t-orange-500 rotate-3 scale-105' 
              : 'border-t-emerald-600'
          }`}
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 65% 100%, 35% 100%)', background: cherryPickActive ? 'linear-gradient(to bottom, #f97316, #ea580c)' : 'linear-gradient(to bottom, #059669, #047857)' }}
        >
          <div className="w-full h-full flex items-center justify-center text-white/90 text-xs font-bold">
            {cherryPickActive ? 'Saringan Bias Konfirmasi' : 'Penyaringan Objektif'}
          </div>
        </div>
        {/* Spout */}
        <div className={`w-8 h-8 rounded-b-md ${cherryPickActive ? 'bg-orange-600 animate-pulse' : 'bg-emerald-700'}`}></div>
      </div>

      {/* Filtered Output */}
      <div className="w-full max-w-[260px] p-2.5 rounded-xl border mt-2 flex flex-col items-center transition-all duration-300 bg-white shadow-xs">
        <span className="text-[11px] font-bold text-slate-600 mb-1">
          {cherryPickActive ? '❌ Hasil: Hanya Data Tertentu (Cherry-Picking)' : '✅ Hasil: Representasi Seimbang'}
        </span>
        <div className="flex items-center justify-center gap-2">
          {cherryPickActive ? (
            <>
              <span className="w-6 h-6 rounded-md bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-orange-300">■</span>
              <span className="w-6 h-6 rounded-md bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-orange-300">■</span>
              <span className="text-[10px] text-red-500 font-bold ml-1">(Data lain dibuang)</span>
            </>
          ) : (
            <>
              <span className="w-5 h-5 rounded-md bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">■</span>
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center">●</span>
              <span className="w-5 h-5 rotate-45 bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">◆</span>
              <span className="w-5 h-5 rounded-sm bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">▲</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. KACAMATA EMOSIONAL & TIMBANGAN KEPENTINGAN (SUBJEKTIVITAS DARI INFOGRAFIS 3)
export const SubjectivityGlassesGraphic: React.FC<{ isSubjective: boolean }> = ({ isSubjective }) => {
  return (
    <div id="subjectivity-graphic" className="relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-teal-50 to-emerald-50/50 rounded-2xl border border-teal-200 shadow-sm">
      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wide mb-3">
        <Glasses className="w-4 h-4 text-teal-600" />
        <span>Lensa Peneliti: {isSubjective ? 'Kacamata Emosional & Kepentingan' : 'Lensa Bebas Nilai (Netral)'}</span>
      </div>

      {/* CSS Glasses Visual */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {/* Left Lens */}
        <div className={`w-20 h-16 rounded-3xl border-4 transition-all duration-500 flex flex-col items-center justify-center p-1 relative shadow-inner ${
          isSubjective 
            ? 'border-rose-500 bg-gradient-to-br from-rose-200/90 via-amber-200/90 to-purple-200/90 text-rose-800' 
            : 'border-slate-600 bg-sky-100/40 text-slate-700'
        }`}>
          {isSubjective ? (
            <>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-300 animate-bounce" />
              <span className="text-[9px] font-black uppercase tracking-tighter mt-0.5">Perasaan</span>
            </>
          ) : (
            <span className="text-[10px] font-bold text-slate-600">Netralitas</span>
          )}
        </div>

        {/* Bridge */}
        <div className={`w-5 h-1.5 rounded-full transition-colors ${isSubjective ? 'bg-rose-500' : 'bg-slate-700'}`}></div>

        {/* Right Lens */}
        <div className={`w-20 h-16 rounded-3xl border-4 transition-all duration-500 flex flex-col items-center justify-center p-1 relative shadow-inner ${
          isSubjective 
            ? 'border-amber-500 bg-gradient-to-br from-amber-200/90 via-orange-200/90 to-rose-200/90 text-amber-900' 
            : 'border-slate-600 bg-sky-100/40 text-slate-700'
        }`}>
          {isSubjective ? (
            <>
              <Coins className="w-5 h-5 text-amber-600 fill-amber-300 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-tighter mt-0.5">Kepentingan</span>
            </>
          ) : (
            <span className="text-[10px] font-bold text-slate-600">Data Murni</span>
          )}
        </div>
      </div>

      {/* Scale Metaphor */}
      <div className="w-full max-w-[260px] p-2 bg-white rounded-xl border border-teal-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-600 font-semibold">
          <Scale className="w-4 h-4 text-teal-600" />
          <span>Timbangan Analisis:</span>
        </div>
        <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
          isSubjective 
            ? 'bg-rose-100 text-rose-700' 
            : 'bg-emerald-100 text-emerald-800'
        }`}>
          {isSubjective ? 'Condong Kepentingan Pribadi' : 'Seimbang Sesuai Fakta'}
        </span>
      </div>
    </div>
  );
};

// 3. PETA POPULASI & KESALAHAN GENERALISASI (GENERALISASI DARI INFOGRAFIS 3)
export const SamplingGeneralizationGraphic: React.FC<{ sampleRatio: 'tiny' | 'representative' }> = ({ sampleRatio }) => {
  const isTiny = sampleRatio === 'tiny';

  return (
    <div id="generalization-graphic" className="relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-50 to-blue-50/50 rounded-2xl border border-blue-200 shadow-sm">
      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 uppercase tracking-wide mb-3">
        <Globe className="w-4 h-4 text-blue-600" />
        <span>Generalisasi: {isTiny ? 'Klaim Sampel Sempit (Salah)' : 'Sampel Representatif (Valid)'}</span>
      </div>

      {/* Simulated Map / Population Grid */}
      <div className="relative w-full max-w-[260px] h-28 bg-slate-900 rounded-xl p-2.5 overflow-hidden flex flex-col justify-between">
        {/* World contour simulation using CSS circles */}
        <div className="absolute inset-0 opacity-15 flex flex-wrap gap-2 p-2 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-4 h-4 rounded-full bg-blue-300"></span>
          ))}
        </div>

        <div className="flex justify-between items-center z-10">
          <span className="text-[10px] font-bold text-blue-300 flex items-center gap-1">
            <Users className="w-3 h-3" /> Total Populasi: 1.000.000 Warga
          </span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${isTiny ? 'bg-red-500/80 text-white' : 'bg-emerald-500/80 text-white'}`}>
            {isTiny ? 'Sampel: 10 Orang' : 'Sampel: 1.200 Orang Acak'}
          </span>
        </div>

        {/* Visual dots representing sampled respondents */}
        <div className="flex items-center justify-center gap-1 z-10 my-auto">
          {isTiny ? (
            <div className="flex flex-col items-center p-1.5 bg-red-950/80 border border-red-500 rounded-lg">
              <div className="flex gap-1 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              </div>
              <span className="text-[9px] text-red-200 font-bold">1 klaster homogen</span>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-1 max-w-[200px]">
              {['bg-blue-400', 'bg-emerald-400', 'bg-amber-400', 'bg-rose-400', 'bg-purple-400', 'bg-teal-400', 'bg-sky-400', 'bg-indigo-400'].map((color, idx) => (
                <span key={idx} className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
              ))}
            </div>
          )}
        </div>

        <div className="z-10 text-[10px] text-center font-semibold text-slate-300 bg-slate-800/80 rounded py-0.5">
          {isTiny ? '⚠️ Klaim "Semua orang setuju" adalah keliru!' : '✅ Error margin terukur secara presisi (±2.5%)'}
        </div>
      </div>

      <div className="w-full max-w-[260px] mt-2 text-center text-xs font-semibold text-slate-600">
        {isTiny ? (
          <span className="text-rose-600 flex items-center justify-center gap-1">
            <Search className="w-3.5 h-3.5" /> Kesalahan: Sampel tidak representatif
          </span>
        ) : (
          <span className="text-emerald-700 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Menjangkau representasi ragam demografi
          </span>
        )}
      </div>
    </div>
  );
};

// 4. METAFORA VISUAL WAWANCARA (INFOGRAFIS 1)
export const InterviewGraphic: React.FC<{ mode: 'tatap_muka' | 'telepon' }> = ({ mode }) => {
  return (
    <div className="p-3.5 bg-gradient-to-b from-amber-50/70 to-orange-50/30 rounded-2xl border border-amber-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
          {mode === 'tatap_muka' ? (
            <Users className="w-4 h-4 text-amber-600 shrink-0" />
          ) : (
            <Phone className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span className="truncate">{mode === 'tatap_muka' ? 'Tatap Muka Langsung' : 'Wawancara Daring / Audio'}</span>
        </div>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-800 border border-amber-300/80 shrink-0">
          {mode === 'tatap_muka' ? 'Ekspresi & Bahasa Tubuh' : 'Suara & Jangkauan Cepat'}
        </span>
      </div>

      {/* Dialog visual cards */}
      <div className="grid grid-cols-2 gap-2.5 items-stretch">
        {/* Pewawancara / Peneliti */}
        <div className="flex flex-col items-center p-2.5 bg-white rounded-xl border border-amber-200/80 shadow-2xs text-center transition-all hover:border-amber-400">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs mb-1.5 ring-2 ring-amber-200">
            <UserCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold text-slate-800">Peneliti Sosial</span>
          <span className="text-[10px] text-slate-500 leading-tight">Membawa Panduan</span>
          <div className="mt-2 w-full text-[10px] bg-amber-50 text-amber-800 py-1 px-1.5 rounded-md border border-amber-200 flex items-center justify-center gap-1 font-medium">
            <ClipboardList className="w-3 h-3 text-amber-600 shrink-0" /> 
            <span className="truncate">Catatan Lapangan</span>
          </div>
        </div>

        {/* Informan / Narasumber */}
        <div className="flex flex-col items-center p-2.5 bg-white rounded-xl border border-rose-200/80 shadow-2xs text-center transition-all hover:border-rose-400">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xs mb-1.5 ring-2 ring-rose-200">
            <Smile className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold text-slate-800">Narasumber Kunci</span>
          <span className="text-[10px] text-slate-500 leading-tight">Warga / Informan</span>
          <div className="mt-2 w-full text-[10px] bg-rose-50 text-rose-800 py-1 px-1.5 rounded-md border border-rose-200 flex items-center justify-center gap-1 font-medium">
            <MessageCircle className="w-3 h-3 text-rose-600 shrink-0" /> 
            <span className="truncate">Narasi Pengalaman</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. METAFORA VISUAL OBSERVASI (INFOGRAFIS 1)
export const ObservationGraphic: React.FC = () => {
  return (
    <div className="p-3.5 bg-gradient-to-b from-emerald-50/70 to-teal-50/30 rounded-2xl border border-emerald-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
          <TreePine className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Setting Lapangan Alami</span>
        </span>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-300/80 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Pengamatan Aktif
        </span>
      </div>

      {/* Field layout cards */}
      <div className="p-2.5 bg-white rounded-xl border border-emerald-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <TreePine className="w-4 h-4" />
            </div>
            <div>
              <p className="font-extrabold text-slate-800 text-[11px]">Zona Taman Komunitas</p>
              <p className="text-[10px] text-slate-500">Interaksi spontan warga</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
            Teramati: 14 Subjek
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-extrabold text-slate-800 text-[11px]">Batas Gerbang & PKL</p>
              <p className="text-[10px] text-slate-500">Pola transaksi informal</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 shrink-0">
            Checklist Lapangan
          </span>
        </div>
      </div>
    </div>
  );
};

// 6. METAFORA VISUAL STUDI KASUS (INFOGRAFIS 1)
export const CaseStudyGraphic: React.FC = () => {
  return (
    <div className="p-3.5 bg-gradient-to-b from-cyan-50/70 to-blue-50/30 rounded-2xl border border-cyan-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
          <FolderKanban className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>Triangulasi Multi-Sumber</span>
        </span>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-100/80 text-cyan-800 border border-cyan-300/80">
          3 Bukti Terhubung
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-white rounded-xl border border-cyan-200/80 shadow-2xs hover:border-cyan-400 transition-colors">
          <FileText className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
          <p className="text-[10px] font-extrabold text-slate-700 leading-tight">Arsip Notulen</p>
          <span className="text-[9px] text-slate-400">Dokumen</span>
        </div>
        <div className="p-2 bg-white rounded-xl border border-cyan-200/80 shadow-2xs hover:border-cyan-400 transition-colors">
          <MessageCircle className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
          <p className="text-[10px] font-extrabold text-slate-700 leading-tight">Wawancara</p>
          <span className="text-[9px] text-slate-400">Kesaksian</span>
        </div>
        <div className="p-2 bg-white rounded-xl border border-cyan-200/80 shadow-2xs hover:border-cyan-400 transition-colors">
          <BarChart2 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-[10px] font-extrabold text-slate-700 leading-tight">Statistik</p>
          <span className="text-[9px] text-slate-400">Data Wilayah</span>
        </div>
      </div>
    </div>
  );
};


// 7. LAB EKSPERIMEN KELOMPOK A vs B (INFOGRAFIS 2)
export const ExperimentLabGraphic: React.FC<{ 
  treatmentName: string;
  treatmentPower: number;
  resultScoreA: number;
  resultScoreB: number;
}> = ({ treatmentName, treatmentPower, resultScoreA, resultScoreB }) => {
  return (
    <div className="p-4 bg-gradient-to-b from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wide">
          <FlaskConical className="w-4 h-4 text-emerald-600" />
          <span>Uji Coba: Kelompok A (Kontrol) vs Kelompok B (Perlakuan)</span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
          Variabel Bebas: {treatmentName} (Intensitas: {treatmentPower}/10)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Group A (Control) */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
            <span>Kelompok A (Kontrol)</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">Alami (0 Treatment)</span>
          </div>
          {/* Visual bar score */}
          <div className="w-full h-16 bg-slate-50 rounded-lg flex items-end justify-center p-2 border border-slate-100 my-1">
            <div 
              className="w-12 bg-slate-400 rounded-t-md transition-all duration-500 flex items-center justify-center text-white text-[11px] font-bold"
              style={{ height: `${resultScoreA}%` }}
            >
              {resultScoreA}%
            </div>
          </div>
          <span className="text-[10px] text-slate-500 mt-1">Skor Rata-rata Pemahaman</span>
        </div>

        {/* Group B (Treatment) */}
        <div className="p-3 bg-white rounded-xl border border-emerald-300 shadow-xs flex flex-col items-center ring-1 ring-emerald-400">
          <div className="w-full flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
            <span>Kelompok B (Eksperimen)</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800">Diberi Intervensi</span>
          </div>
          {/* Visual bar score */}
          <div className="w-full h-16 bg-emerald-50/50 rounded-lg flex items-end justify-center p-2 border border-emerald-100 my-1">
            <div 
              className="w-12 bg-emerald-600 rounded-t-md transition-all duration-500 flex items-center justify-center text-white text-[11px] font-bold shadow-xs"
              style={{ height: `${resultScoreB}%` }}
            >
              {resultScoreB}%
            </div>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold mt-1">
            Selisih Efek: +{resultScoreB - resultScoreA}%
          </span>
        </div>
      </div>

      <div className="text-[11px] text-center text-slate-600 bg-white p-2 rounded-lg border border-emerald-100">
        💡 <strong>Kesimpulan Kausalitas:</strong> Pemberian intervensi <em>{treatmentName}</em> memberikan peningkatan terukur secara empiris dibandingkan kelompok kontrol.
      </div>
    </div>
  );
};
