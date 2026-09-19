import React, { useState } from 'react';
import { 
  BrokenFunnelGraphic, 
  SubjectivityGlassesGraphic, 
  SamplingGeneralizationGraphic 
} from './CssIllustrations';
import { InteractivePitfallsLab } from './InteractivePitfallsLab';
import { sounds } from '../utils/soundEffects';
import { 
  AlertTriangle, 
  FilterX, 
  Glasses, 
  Globe, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  RotateCcw,
  Sliders, 
  Scale, 
  Heart, 
  Coins, 
  ChevronRight, 
  ShieldCheck,
  Copy,
  Check,
  BookOpen,
  Lightbulb,
  Trash2,
  Eye,
  Users,
  Target,
  Award,
  FileText,
  CheckSquare,
  Square
} from 'lucide-react';

interface Module3PitfallsProps {
  onXpGained?: (amount: number, reason: string) => void;
}

export const Module3Pitfalls: React.FC<Module3PitfallsProps> = ({ onXpGained }) => {
  // Main selected pitfall
  const [selectedPitfall, setSelectedPitfall] = useState<'bias' | 'subjektivitas' | 'generalisasi'>('bias');

  // 1. Bias Lab State (Cherry-Picking)
  const [cherryPickActive, setCherryPickActive] = useState<boolean>(true);

  // 2. Subjectivity Lab State (Bias & Emotions slider)
  const [subjectivityLevel, setSubjectivityLevel] = useState<number>(75); // 0 (netral) to 100 (sangat emosional)

  // 3. Generalization Lab State (Sampling design)
  const [sampleDesign, setSampleDesign] = useState<'cafe' | 'sosmed' | 'stratified'>('cafe');

  // 4. Interactive Research Audit Checklist State
  const [auditAnswers, setAuditAnswers] = useState<{
    includeNegativeData: boolean;
    declareConflict: boolean;
    useRandomSampling: boolean;
    shareOpenData: boolean;
  }>({
    includeNegativeData: false,
    declareConflict: true,
    useRandomSampling: false,
    shareOpenData: true
  });

  const [copiedAudit, setCopiedAudit] = useState<boolean>(false);
  const [hasInteractedXp, setHasInteractedXp] = useState<boolean>(false);

  // Trigger XP helper
  const handleTriggerXp = (reason: string) => {
    sounds.playClick();
    if (!hasInteractedXp && onXpGained) {
      setHasInteractedXp(true);
      onXpGained(40, reason);
      sounds.playSuccess();
    }
  };

  // Switch active pitfall tab
  const handleSelectPitfall = (pitfall: 'bias' | 'subjektivitas' | 'generalisasi') => {
    setSelectedPitfall(pitfall);
    sounds.playCardFlip();
  };

  // Audit score calculation
  const auditScore = (
    (auditAnswers.includeNegativeData ? 25 : 0) +
    (auditAnswers.declareConflict ? 25 : 0) +
    (auditAnswers.useRandomSampling ? 25 : 0) +
    (auditAnswers.shareOpenData ? 25 : 0)
  );

  // Copy audit certificate / statement
  const handleCopyAudit = () => {
    const auditText = `
=== LEMBAR AUDIT INTEGRITAS & BEBAS BIAS METODOLOGIS ===
Standar Penjaminan Mutu Riset Sosial Ilmiah

1. Transparansi Data Kontradiktif: ${auditAnswers.includeNegativeData ? 'TERPENUHI (Data yang menolak hipotesis tetap dilaporkan secara jujur)' : 'PERHATIAN: Wajib menyertakan seluruh data temuan, bukan hanya yang disukai'}
2. Deklarasi Bebas Konflik Kepentingan: ${auditAnswers.declareConflict ? 'TERPENUHI (Bebas dari pengaruh komersial/afiliasi politik tertutup)' : 'PERHATIAN: Deklarasikan sumber dana dan batasan independensi riset'}
3. Desain Sampling Representatif: ${auditAnswers.useRandomSampling ? 'TERPENUHI (Menggunakan kaidah Probability / Stratified Sampling)' : 'PERHATIAN: Hindari klaim generalisasi luas jika sampel hanya convenience sampling'}
4. Keterbukaan Data Mentah (Open Science): ${auditAnswers.shareOpenData ? 'TERPENUHI (Buku kode dan instrumen dapat diverifikasi oleh rekan sejawat)' : 'PERHATIAN: Buka instrumen dan rekap data mentah demi transparansi'}

SKOR INTEGRITAS RISET: ${auditScore}/100 (${auditScore >= 80 ? 'Predikat: Sangat Kredibel & Layak Terbit' : auditScore >= 50 ? 'Predikat: Butuh Penyempurnaan Metodologi' : 'Predikat: Rawan Bias Fatal'})

Prinsip Etika: Riset sosial bukan bertujuan membuktikan peneliti selalu benar, melainkan menyajikan kebenaran fakta apa adanya demi perbaikan masyarakat.
`.trim();

    navigator.clipboard.writeText(auditText);
    setCopiedAudit(true);
    sounds.playChime();
    setTimeout(() => setCopiedAudit(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      {/* 1. Header Hero Banner: Edukatif & Bersahabat */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#072f4a] via-[#0c4a6e] to-[#0e7490] border border-teal-400/30 p-6 sm:p-8 text-white shadow-xl shadow-teal-950/20">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-40 rounded-full bg-teal-300/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300/30 text-emerald-200">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-300" />
            Penjaga Kredibilitas &amp; Etika Riset
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight mb-2 text-white drop-shadow-xs">
            Tiga Jeratan Metodologi yang Harus Dihindari
          </h1>
          <p className="text-sm sm:text-base text-teal-50/95 leading-relaxed">
            Penelitian sosial dapat menghasilkan kesimpulan yang salah fatal jika terjerumus ke dalam <strong>Bias Seleksi</strong>, <strong>Subjektivitas Emosional</strong>, atau <strong>Generalisasi Terburu-buru</strong>. Pelajari cara mendeteksi dan mencegahnya di bawah ini!
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-amber-500/30 border border-amber-300/40 flex items-center gap-1.5">
              <FilterX className="w-3.5 h-3.5" /> 1. Bias (Cherry-Picking Data)
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/40 border border-emerald-300/40 flex items-center gap-1.5">
              <Glasses className="w-3.5 h-3.5" /> 2. Subjektivitas (Kacamata Emosi)
            </span>
            <span className="px-3 py-1 rounded-lg bg-indigo-500/40 border border-indigo-300/40 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> 3. Generalisasi Keliru (Klaim Berlebih)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Kartu Interaktif Tiga Masalah dengan Analogi Membumi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Masalah 1: Bias */}
        <div 
          onClick={() => handleSelectPitfall('bias')}
          className={`cursor-pointer rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
            selectedPitfall === 'bias' 
              ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-300' 
              : 'border-amber-200 bg-white hover:border-amber-300 hover:shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-extrabold text-xs tracking-wide shadow-xs flex items-center gap-1.5">
                <FilterX className="w-4 h-4" />
                <span>1. BIAS SELEKSI</span>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                {selectedPitfall === 'bias' ? '✓ Sedang Diselidiki' : 'Pilih Masalah →'}
              </span>
            </div>

            {/* Visual Mini Corong */}
            <div className="mb-3">
              <BrokenFunnelGraphic cherryPickActive={cherryPickActive} />
            </div>

            <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs mb-3 space-y-1.5">
              <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>Analogi Sederhana:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &quot;Seperti memilih buah stroberi di toko: hanya mengambil yang manis untuk difoto, dan menyembunyikan stroberi busuk di bawah meja.&quot;
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-2">
              <strong>Bahaya Utama:</strong> Peneliti hanya mengumpulkan atau melaporkan data yang mendukung keyakinan pribadinya (<em>Cherry-Picking</em>), dan sengaja membuang fakta yang berlawanan.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between text-xs font-bold text-amber-800">
            <span>Uji Lab Deteksi Bias Seleksi</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Masalah 2: Subjektivitas */}
        <div 
          onClick={() => handleSelectPitfall('subjektivitas')}
          className={`cursor-pointer rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
            selectedPitfall === 'subjektivitas' 
              ? 'border-emerald-500 bg-emerald-50/70 shadow-md ring-2 ring-emerald-300' 
              : 'border-emerald-200 bg-white hover:border-emerald-300 hover:shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-extrabold text-xs tracking-wide shadow-xs flex items-center gap-1.5">
                <Glasses className="w-4 h-4" />
                <span>2. SUBJEKTIVITAS EMOSI</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                {selectedPitfall === 'subjektivitas' ? '✓ Sedang Diselidiki' : 'Pilih Masalah →'}
              </span>
            </div>

            {/* Visual Kacamata Emosi */}
            <div className="mb-3">
              <SubjectivityGlassesGraphic isSubjective={subjectivityLevel > 40} />
            </div>

            <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-2xs mb-3 space-y-1.5">
              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Analogi Sederhana:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &quot;Seperti suporter sepak bola yang menilai pelanggaran: selalu merasa wasit curang karena rasa cinta buta pada tim kesayangannya.&quot;
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-2">
              <strong>Bahaya Utama:</strong> Membiarkan sentimen suka/tidak suka, afiliasi politik, atau kepentingan komersial pribadi mendikte analisis data empiris.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-800">
            <span>Uji Lab Kacamata Peneliti</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Masalah 3: Generalisasi Keliru */}
        <div 
          onClick={() => handleSelectPitfall('generalisasi')}
          className={`cursor-pointer rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
            selectedPitfall === 'generalisasi' 
              ? 'border-indigo-500 bg-indigo-50/70 shadow-md ring-2 ring-indigo-300' 
              : 'border-indigo-200 bg-white hover:border-indigo-300 hover:shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-extrabold text-xs tracking-wide shadow-xs flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>3. GENERALISASI KELIRU</span>
              </div>
              <span className="text-[11px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">
                {selectedPitfall === 'generalisasi' ? '✓ Sedang Diselidiki' : 'Pilih Masalah →'}
              </span>
            </div>

            {/* Visual Peta Fragmentasi */}
            <div className="mb-3">
              <SamplingGeneralizationGraphic sampleRatio={sampleDesign === 'stratified' ? 'representative' : 'tiny'} />
            </div>

            <div className="p-3 bg-white rounded-xl border border-indigo-200 shadow-2xs mb-3 space-y-1.5">
              <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Analogi Sederhana:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &quot;Seperti makan mi ayam di satu warung lalu mengumumkan ke seluruh negeri bahwa semua mi ayam di kota tersebut rasanya asin.&quot;
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-2">
              <strong>Bahaya Utama:</strong> Menarik kesimpulan universal tentang seluruh jutaan rakyat hanya dari segelintir orang di kelompok teman sendiri (<em>Hasty Generalization</em>).
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-200 flex items-center justify-between text-xs font-bold text-indigo-800">
            <span>Uji Lab Jebakan Generalisasi</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. The Domino Effect of Bad Research (Rantai Kerusakan Ilmiah) */}
      <div className="p-5 bg-gradient-to-r from-amber-50 via-teal-50 to-indigo-50 rounded-2xl border border-slate-200 shadow-xs">
        <div className="text-center mb-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-600 flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            Efek Domino Riset Cacat (The Domino Effect of Bad Research)
          </span>
          <p className="text-xs text-slate-500 mt-0.5">
            Satu kesalahan di awal penelitian akan merusak seluruh tahapan hingga ke pengambilan kebijakan publik!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center pt-1">
          {/* Node 1 */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-amber-300 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
              <FilterX className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-amber-950">1. Data Mentah Cacat</p>
              <p className="text-[11px] text-slate-600">Bias seleksi menyaring data secara sepihak.</p>
            </div>
          </div>

          {/* Node 2 */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-emerald-300 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
              <Glasses className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-emerald-950">2. Analisis Terdistorsi</p>
              <p className="text-[11px] text-slate-600">Kacamata emosional memelintir arti fakta.</p>
            </div>
          </div>

          {/* Node 3 */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-indigo-300 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-indigo-950">3. Kebijakan Publik Sesat</p>
              <p className="text-[11px] text-slate-600">Generalisasi keliru merugikan masyarakat luas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Simulasi Interaktif 3 Masalah (Titik Data, Kacamata Analisis & Sampel Populasi) */}
      <InteractivePitfallsLab
        activeTab={selectedPitfall}
        onTabChange={(tab) => setSelectedPitfall(tab)}
        onXpGained={onXpGained}
      />

      {/* 5. Laboratorium Investigasi & Pemecahan Masalah */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-rose-600">
              <ShieldCheck className="w-4 h-4" />
              <span>Laboratorium Investigasi &amp; Vaksinasi Masalah</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 font-heading mt-1">
              {selectedPitfall === 'bias' && 'Investigasi 1: Eksperimen Deteksi Cherry-Picking (Bias Konfirmasi)'}
              {selectedPitfall === 'subjektivitas' && 'Investigasi 2: Kalibrasi Lensa Peneliti (Refleksivitas vs Emosional)'}
              {selectedPitfall === 'generalisasi' && 'Investigasi 3: Uji Skala Generalisasi & Representasi Populasi'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Coba ganti kontrol di bawah untuk membandingkan dampak antara riset yang keliru vs solusi ilmiah yang sahih.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => handleSelectPitfall('bias')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedPitfall === 'bias' 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bias
            </button>
            <button
              onClick={() => handleSelectPitfall('subjektivitas')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedPitfall === 'subjektivitas' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Subjektivitas
            </button>
            <button
              onClick={() => handleSelectPitfall('generalisasi')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedPitfall === 'generalisasi' 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Generalisasi
            </button>
          </div>
        </div>

        {/* 4.1 LAB SIMULASI 1: BIAS SELEKSI & CHERRY-PICKING */}
        {selectedPitfall === 'bias' && (
          <div className="space-y-6">
            {/* Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <div>
                <span className="text-xs font-bold text-amber-950 block">
                  Pilih Sikap Peneliti Terhadap Data Lapangan:
                </span>
                <p className="text-[11px] text-amber-800">
                  Studi Kasus: Evaluasi Efektivitas Pelatihan Kerja Gratis Pemerintah
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCherryPickActive(true);
                    sounds.playClick();
                  }}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    cherryPickActive 
                      ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400' 
                      : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Mode Cherry-Picking (Curang)</span>
                </button>

                <button
                  onClick={() => {
                    setCherryPickActive(false);
                    handleTriggerXp('Mencoba Mode Peneliti Objektif Tanpa Bias');
                  }}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    !cherryPickActive 
                      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mode Transparan &amp; Objektif (Sahih)</span>
                </button>
              </div>
            </div>

            {/* Visual comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left: Raw Data in Field */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Fakta Lapangan Nyata (10 Testimoni Warga)
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                    Data Mentah
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-950">✅ 3 Warga Puas &amp; Dapat Kerja</span>
                    <span className="font-mono font-bold text-emerald-700">30% Realitas</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    cherryPickActive 
                      ? 'bg-red-50/50 border-red-300 opacity-60 line-through' 
                      : 'bg-rose-50 border-rose-200'
                  }`}>
                    <span className="font-semibold text-rose-950">❌ 7 Warga Kecewa (Alat Rusak &amp; Materi Usang)</span>
                    <span className="font-mono font-bold text-rose-700">70% Realitas</span>
                  </div>
                </div>

                {cherryPickActive && (
                  <div className="p-3 bg-red-100/70 border border-red-300 rounded-xl text-xs text-red-950 flex items-start gap-2">
                    <Trash2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Aksi Peneliti Nakal:</strong> 7 lembar kritik warga sengaja dibuang ke tempat sampah karena tidak sejalan dengan hipotesis keberhasilan program!
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Published Research Result */}
              <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
                cherryPickActive 
                  ? 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-300' 
                  : 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Laporan yang Diterbitkan ke Publik:
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    cherryPickActive ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                  }`}>
                    {cherryPickActive ? '⚠️ Terdistorsi (Cacat Ilmiah)' : '✅ Kredibel & Jujur'}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs italic text-slate-800 leading-relaxed">
                  {cherryPickActive
                    ? '“Hasil riset kami membuktikan bahwa 100% peserta pelatihan (dari 3 orang yang kami pilih) menyatakan program ini sangat sempurna dan bebas kendala!”'
                    : '“Riset menunjukkan 30% peserta berhasil terserap kerja, sementara 70% menyampaikan kendala pada alat praktik. Program butuh perbaikan modul agar efektif.”'}
                </div>

                {/* Status alert */}
                {cherryPickActive ? (
                  <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-[11px] text-amber-950 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span><strong>Dampak Bahaya:</strong> Pemerintah mengira program sudah sukses dan membuang anggaran miliaran tanpa perbaikan.</span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-[11px] text-emerald-950 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>Manfaat Ilmiah:</strong> Data jujur menyelamatkan uang rakyat dan memberikan evaluasi kebijakan yang berharga.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Vaksin Ilmiah Card */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-amber-950">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-extrabold block">Vaksin Penawar Bias Seleksi:</span>
                  <span className="text-slate-600">Gunakan protokol pra-registrasi (*Pre-registration*), catat seluruh sampel yang menolak, dan buka akses data mentah (*Open Data*).</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4.2 LAB SIMULASI 2: SUBJEKTIVITAS & KACAMATA EMOSIONAL */}
        {selectedPitfall === 'subjektivitas' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">
                    Kalibrasi Lensa Peneliti: Geser Kadar Prasangka Pribadi
                  </span>
                  <span className="text-[11px] text-emerald-800">
                    Fakta BPS: &quot;Angka pengangguran terdidik kota X naik 3,2% dalam dua tahun terakhir.&quot;
                  </span>
                </div>
                <span className={`text-xs font-mono font-black px-3 py-1 rounded-lg border shadow-2xs ${
                  subjectivityLevel > 60 
                    ? 'bg-rose-100 text-rose-800 border-rose-300' 
                    : subjectivityLevel > 30 
                    ? 'bg-amber-100 text-amber-800 border-amber-300' 
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {subjectivityLevel}% {subjectivityLevel > 60 ? 'Prasangka Tinggi' : subjectivityLevel > 30 ? 'Mulai Terpengaruh' : 'Netralitas Tinggi'}
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={subjectivityLevel}
                onChange={(e) => {
                  setSubjectivityLevel(Number(e.target.value));
                  handleTriggerXp('Menggeser Kadar Subjektivitas Peneliti');
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                <span>0% (Objektivitas Ilmiah / Bebas Nilai)</span>
                <span>50% (Mulai Terbawa Opini Pribadi)</span>
                <span>100% (Amarah, Politik &amp; Emosional)</span>
              </div>
            </div>

            {/* Dynamic narrative based on slider */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-5 flex flex-col justify-center items-center p-5 bg-slate-900 rounded-2xl text-white space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Visualisasi Kacamata Analisis
                </span>

                <div className={`w-32 h-20 rounded-3xl border-4 transition-all duration-300 flex flex-col items-center justify-center p-2 shadow-inner ${
                  subjectivityLevel > 60 
                    ? 'border-rose-500 bg-rose-950/80 text-rose-300 animate-pulse' 
                    : subjectivityLevel > 30 
                    ? 'border-amber-500 bg-amber-950/70 text-amber-200' 
                    : 'border-emerald-400 bg-emerald-950/60 text-emerald-300'
                }`}>
                  {subjectivityLevel > 60 ? (
                    <>
                      <Heart className="w-6 h-6 text-rose-400 fill-rose-500" />
                      <span className="text-[10px] font-bold mt-1 uppercase">Lensa Emosi</span>
                    </>
                  ) : subjectivityLevel > 30 ? (
                    <>
                      <Coins className="w-6 h-6 text-amber-400" />
                      <span className="text-[10px] font-bold mt-1 uppercase">Lensa Opini</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-6 h-6 text-emerald-400" />
                      <span className="text-[10px] font-bold mt-1 uppercase">Lensa Fakta</span>
                    </>
                  )}
                </div>

                <span className="text-xs text-center text-slate-300 font-medium">
                  {subjectivityLevel > 60 
                    ? 'Data ditafsirkan sebagai alat melampiaskan kebencian / kepentingan afiliasi.' 
                    : subjectivityLevel > 30 
                    ? 'Data mulai dicampuradukkan dengan asumsi moral tanpa bukti.' 
                    : 'Data dianalisis dingin secara struktural berdasarkan bukti kausal empiris.'}
                </span>
              </div>

              <div className="md:col-span-7 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                      Narasi Kesimpulan Skripsi / Laporan:
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      subjectivityLevel > 60 ? 'bg-rose-100 text-rose-800' : subjectivityLevel > 30 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {subjectivityLevel > 60 ? 'Bahasa Baper' : subjectivityLevel > 30 ? 'Bahasa Opini' : 'Bahasa Akademik Netral'}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs italic text-slate-800 leading-relaxed font-serif">
                    {subjectivityLevel > 60 && (
                      <span className="text-rose-950 font-sans not-italic font-medium">
                        &quot;Kenaikan 3,2% ini membuktikan betapa bobroknya moral generasi muda yang pemalas dan tidak mau berjuang, serta mencerminkan konspirasi rezim penguasa yang sengaja memiskinkan rakyat terdidik!&quot;
                      </span>
                    )}
                    {subjectivityLevel > 30 && subjectivityLevel <= 60 && (
                      <span className="text-amber-950 font-sans not-italic font-medium">
                        &quot;Kenaikan 3,2% ini sepertinya terjadi karena anak-anak lulusan baru terlalu banyak menuntut gaji tinggi dan kurang memiliki etos kerja keras seperti generasi pendahulu.&quot;
                      </span>
                    )}
                    {subjectivityLevel <= 30 && (
                      <span className="text-emerald-950 font-sans not-italic font-medium">
                        &quot;Kenaikan 3,2% berkorelasi dengan transformasi industri menuju otomasi teknologi dan adanya kesenjangan kompetensi kurikulum vokasi, sehingga direkomendasikan program magang berbasis industri.&quot;
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Solusi Refleksivitas:</strong> Lakukan <em>Peer-Debriefing</em> (minta rekan yang beda pandangan memeriksa draf) dan deklarasikan posisi diri peneliti (*positionality statement*).</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4.3 LAB SIMULASI 3: JEBAKAN GENERALISASI */}
        {selectedPitfall === 'generalisasi' && (
          <div className="space-y-6">
            <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-3">
              <span className="text-xs font-bold text-indigo-950 block">
                Pilih Desain Penarikan Sampel (Populasi Kota: 800.000 Jiwa):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'cafe',
                    title: '1. Kafe Elit (15 Orang)',
                    desc: 'Wawancara 15 mahasiswa di satu kafe mall pada jam 2 siang',
                    risk: 'Rawan Overgeneralisasi'
                  },
                  {
                    id: 'sosmed',
                    title: '2. Polling Medsos (120 Orang)',
                    desc: 'Menyebar kuesioner ke teman Instagram peneliti',
                    risk: 'Bias Echo-Chamber'
                  },
                  {
                    id: 'stratified',
                    title: '3. Acak Berstrata (400 Orang)',
                    desc: 'Sampel acak proporsional di 5 kecamatan (pekerja, pelajar, pedagang)',
                    risk: 'Sah Digeneralisasikan'
                  }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSampleDesign(item.id as any);
                      handleTriggerXp('Menguji Desain Generalisasi Sampel');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      sampleDesign === item.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{item.title}</div>
                    <div className={`text-[10px] mt-1 ${sampleDesign === item.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {item.desc}
                    </div>
                    <span className={`inline-block mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      sampleDesign === item.id 
                        ? 'bg-white/20 text-white' 
                        : item.id === 'stratified' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.risk}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                  Cakupan Spektrum Warga Kota (800.000 Jiwa)
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span>Buruh &amp; Sektor Informal (45%)</span>
                    <span className="font-bold">{sampleDesign === 'stratified' ? '✅ Terwakili 180 orang' : '❌ 0% (Terabaikan)'}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span>Pedagang Pasar &amp; UMKM (25%)</span>
                    <span className="font-bold">{sampleDesign === 'stratified' ? '✅ Terwakili 100 orang' : '❌ 0% (Terabaikan)'}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span>Karyawan &amp; Mahasiswa Kafe (30%)</span>
                    <span className="font-bold">{sampleDesign === 'cafe' ? '⚠️ 100% dari kelompok ini saja' : '✅ Terwakili 120 orang'}</span>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
                sampleDesign === 'stratified' 
                  ? 'bg-emerald-50/70 border-emerald-300' 
                  : 'bg-red-50/70 border-red-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Klaim Kesimpulan yang Dibuat:
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    sampleDesign === 'stratified' ? 'bg-emerald-200 text-emerald-900' : 'bg-red-200 text-red-900'
                  }`}>
                    {sampleDesign === 'stratified' ? 'Klaim Sah' : 'Klaim Sesat (Fallacy)'}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs italic text-slate-800 leading-relaxed font-serif">
                  {sampleDesign === 'cafe' && (
                    <span className="font-sans not-italic text-red-950 font-medium">
                      &quot;100% warga kota menghabiskan uang Rp80.000 per hari untuk nongkrong di kafe kopi estetik!&quot; (Padahal hanya meneliti 15 orang di kafe mewah).
                    </span>
                  )}
                  {sampleDesign === 'sosmed' && (
                    <span className="font-sans not-italic text-amber-950 font-medium">
                      &quot;Mayoritas masyarakat kota lebih suka belanja online dibanding pasar tradisional.&quot; (Bias algoritma pengikut media sosial pribadi peneliti).
                    </span>
                  )}
                  {sampleDesign === 'stratified' && (
                    <span className="font-sans not-italic text-emerald-950 font-medium">
                      &quot;Rata-rata pengeluaran waktu luang warga kota bervariasi: segmen pemuda di kafe (22%), pedagang (15%), dan pekerja informal mayoritas beristirahat di rumah (Margin of error ±4,9%).&quot;
                    </span>
                  )}
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600">
                  <strong>Pelajaran Penting:</strong> {sampleDesign === 'stratified' ? 'Generalisasi sah karena memenuhi prinsip peluang acak (Probability Sampling).' : 'Jangan pernah menggeneralisasi ke seluruh kota jika sampel hanya dari satu kelompok sempit!'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. FITUR INTERAKTIF BARU: AUDIT & VAKSIN BEBAS BIAS RISET ANDA */}
      <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl border-2 border-emerald-200 p-5 sm:p-7 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Self-Audit Mandiri: Bebas Bias &amp; Terpercaya</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-1.5">
              Cek Imunitas Metodologi Penelitian Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Jawab 4 pertanyaan verifikasi berikut untuk mengetahui apakah rancangan skripsi atau riset Anda aman dari tiga jeratan fatal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Skor Integritas Ilmiah
              </span>
              <div className="text-2xl font-black text-emerald-700 font-heading">
                {auditScore}%
              </div>
            </div>

            <button
              onClick={handleCopyAudit}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all ${
                copiedAudit
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-200'
              }`}
            >
              {copiedAudit ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAudit ? 'Tersalin!' : 'Salin Lembar Audit Bebas Bias'}</span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Checkbox Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Question 1 */}
          <div 
            onClick={() => {
              setAuditAnswers(prev => ({ ...prev, includeNegativeData: !prev.includeNegativeData }));
              sounds.playClick();
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
              auditAnswers.includeNegativeData 
                ? 'bg-emerald-50/80 border-emerald-400' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="mt-0.5 text-emerald-600">
              {auditAnswers.includeNegativeData ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">
                1. Tidak Menyembunyikan Data Kontradiktif
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Jika ada data atau responden yang menolak hipotesis Anda, Anda tetap melaporkannya secara jujur (Bebas Cherry-Picking).
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div 
            onClick={() => {
              setAuditAnswers(prev => ({ ...prev, declareConflict: !prev.declareConflict }));
              sounds.playClick();
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
              auditAnswers.declareConflict 
                ? 'bg-emerald-50/80 border-emerald-400' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="mt-0.5 text-emerald-600">
              {auditAnswers.declareConflict ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">
                2. Deklarasi Bebas Konflik Kepentingan
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Peneliti tidak memiliki hubungan finansial atau afiliasi politik yang mengharuskan hasil riset harus menguntungkan pihak tertentu.
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div 
            onClick={() => {
              setAuditAnswers(prev => ({ ...prev, useRandomSampling: !prev.useRandomSampling }));
              sounds.playClick();
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
              auditAnswers.useRandomSampling 
                ? 'bg-emerald-50/80 border-emerald-400' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="mt-0.5 text-emerald-600">
              {auditAnswers.useRandomSampling ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">
                3. Sampling Representatif Berkaidah Ilmiah
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Sampel ditarik secara acak (Random/Stratified Sampling), dan peneliti tidak mengklaim kesimpulan satu kota jika sampelnya hanya teman sendiri.
              </p>
            </div>
          </div>

          {/* Question 4 */}
          <div 
            onClick={() => {
              setAuditAnswers(prev => ({ ...prev, shareOpenData: !prev.shareOpenData }));
              sounds.playClick();
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
              auditAnswers.shareOpenData 
                ? 'bg-emerald-50/80 border-emerald-400' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="mt-0.5 text-emerald-600">
              {auditAnswers.shareOpenData ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">
                4. Keterbukaan Data Mentah &amp; Instrumen
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Kuesioner, transkrip wawancara, dan kode analisis bersedia diperiksa oleh dosen penguji atau rekan sejawat (*Peer-Audit*).
              </p>
            </div>
          </div>
        </div>

        {/* Diagnosis & Action */}
        <div className="p-4 rounded-2xl bg-emerald-100/60 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-emerald-950 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {auditScore === 100 && 'Hebat! Rancangan riset Anda memiliki integritas ilmiah sempurna dan siap dipertanggungjawabkan.'}
              {auditScore >= 50 && auditScore < 100 && 'Bagus, namun ada aspek yang rawan diserang penguji skripsi jika tidak disempurnakan.'}
              {auditScore < 50 && 'Waspada! Riset Anda memiliki risiko tinggi mengalami bias fatal. Terapkan solusi metodologi di atas.'}
            </span>
          </div>

          <button
            onClick={handleCopyAudit}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            {copiedAudit ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAudit ? 'Tersalin!' : 'Salin untuk Subbab Etika Bab 3'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
