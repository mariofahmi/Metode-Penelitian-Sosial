import React, { useState } from 'react';
import { QUALITATIVE_METHODS } from '../data/socialResearchData';
import { 
  InterviewGraphic, 
  ObservationGraphic, 
  CaseStudyGraphic 
} from './CssIllustrations';
import { 
  MessageSquare, 
  Eye, 
  FolderArchive, 
  ClipboardCheck, 
  Phone, 
  Users, 
  FileText,
  Sparkles,
  Info,
  Volume2,
  Copy,
  Plus,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Smile,
  UserCheck,
  Building2,
  TreePine,
  Check,
  Lightbulb
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Module1Qualitative: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<'wawancara' | 'observasi' | 'studi_kasus'>('wawancara');
  const [interviewMode, setInterviewMode] = useState<'tatap_muka' | 'telepon'>('tatap_muka');
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customQualTopic, setCustomQualTopic] = useState<string>('Memahami Solidaritas & Ketahanan Ekonomi Pedagang Kaki Lima');
  const [customQuestionInput, setCustomQuestionInput] = useState<string>('Bagaimana Anda memaknai perubahan kebijakan zonasi dan apa yang membuat paguyuban tetap bertahan?');
  const [copyToast, setCopyToast] = useState<boolean>(false);

  // Observasi states
  const [selectedObsLocation, setSelectedObsLocation] = useState<'taman' | 'ruang_belajar'>('taman');
  const [obsTimeSlot, setObsTimeSlot] = useState<'pagi' | 'siang' | 'sore' | 'malam'>('sore');
  const [customFieldnoteInput, setCustomFieldnoteInput] = useState<string>('');
  const [userFieldnotes, setUserFieldnotes] = useState<{ time: string; note: string; category: string }[]>([]);

  // Studi Kasus states
  const [collectedEvidence, setCollectedEvidence] = useState<string[]>(['doc1', 'doc2', 'doc3']);

  const currentMethodData = QUALITATIVE_METHODS.find(m => m.id === selectedMethod)!;

  const toggleEvidence = (id: string) => {
    sounds.playClick();
    if (collectedEvidence.includes(id)) {
      if (collectedEvidence.length > 1) {
        setCollectedEvidence(collectedEvidence.filter(item => item !== id));
      }
    } else {
      setCollectedEvidence([...collectedEvidence, id]);
      sounds.playSuccess();
    }
  };

  const handleCopyQuote = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      sounds.playChime();
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleAddUserFieldnote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFieldnoteInput.trim()) return;

    sounds.playSuccess();
    const newNote = {
      time: obsTimeSlot === 'pagi' ? '08:15' : obsTimeSlot === 'siang' ? '12:45' : obsTimeSlot === 'sore' ? '16:50' : '19:40',
      note: customFieldnoteInput.trim(),
      category: 'Catatan Peneliti Mandiri'
    };
    setUserFieldnotes([newNote, ...userFieldnotes]);
    setCustomFieldnoteInput('');
  };

  // Dinamika catatan observasi berdasarkan waktu
  const getDynamicObsItems = () => {
    const defaultItems = QUALITATIVE_METHODS[1].simulationLocations?.find(loc => loc.id === selectedObsLocation)?.items || [];
    
    // Penyesuaian catatan berdasarkan slot waktu yang dipilih
    if (obsTimeSlot === 'pagi') {
      return [
        { time: '08:10', note: selectedObsLocation === 'taman' ? 'Lansia berjalan santai mengelilingi lintasan taman, bertegur sapa hangat dengan tukang kebersihan.' : 'Petugas balai membuka pintu, beberapa warga lansia mengantre informasi pemeriksaan tensi gratis.', category: 'Aktivitas Pagi & Relasi Sosial' },
        { time: '08:35', note: selectedObsLocation === 'taman' ? 'Pedagang bubur ayam mulai melayani sarapan warga sambil bercakap tentang kenaikan harga telur.' : 'Suasana tenang, petugas mencatat absensi kunjungan harian balai warga.', category: 'Interaksi Ekonomi Informal' }
      ];
    }
    if (obsTimeSlot === 'siang') {
      return [
        { time: '12:20', note: selectedObsLocation === 'taman' ? 'Taman cenderung sepi karena terik matahari, hanya pekerja ojek daring berteduh di bawah pohon rindang.' : 'Balai warga dimanfaatkan anak sekolah untuk beristirahat dan menumpang pendingin ruangan.', category: 'Pemanfaatan Ruang Publik' },
        { time: '13:00', note: selectedObsLocation === 'taman' ? 'Terjadi tawar-menawar santai antara pengemudi ojek dan penjual es keliling.' : 'Ibu-ibu kader PKK berkumpul membawa berkas formulir bantuan pangan.', category: 'Jejaring Komunitas' }
      ];
    }
    if (obsTimeSlot === 'malam') {
      return [
        { time: '19:15', note: selectedObsLocation === 'taman' ? 'Lampu taman menyala temaram, kelompok muda berkumpul bermain gitar di gazebo sudut timur.' : 'Remaja mendominasi meja dengan laptop dan gawai memanfaatkan Wi-Fi gratis kelurahan.', category: 'Budaya Nongkrong Remaja' },
        { time: '20:00', note: selectedObsLocation === 'taman' ? 'Pedagang sate dan angkringan ramai pengunjung, terjadi transaksi tanpa interupsi formal.' : 'Tokoh masyarakat masuk, seluruh remaja serentak memberi salam tanda norma kesantunan.', category: 'Norma & Kohesi Sosial' }
      ];
    }
    return defaultItems;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notifikasi Salin Kutipan */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-indigo-500/50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold">Kutipan Berhasil Disalin ke Clipboard!</span>
        </div>
      )}

      {/* Visual Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#072f4a] via-[#0c4a6e] to-[#0e7490] border border-teal-400/30 p-6 sm:p-8 text-white shadow-xl shadow-teal-950/20">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-40 rounded-full bg-teal-300/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/15 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider mb-3.5 border border-emerald-300/30 text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Laboratorium Metodologi Kualitatif
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-heading leading-tight mb-2.5 drop-shadow-xs">
            Wawancara, Observasi, &amp; Studi Kasus
          </h1>
          <p className="text-xs sm:text-sm text-teal-50/95 font-medium leading-relaxed max-w-2xl mx-auto">
            Tiga pilar utama penelitian sosial kualitatif untuk memahami makna mendalam, perilaku spontan lapangan, dan keterhubungan multi-bukti secara objektif.
          </p>
        </div>
      </div>

      {/* Interactive Selection Guide Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2.5 bg-sky-50/70 rounded-2xl border border-sky-200 text-xs font-semibold text-slate-600">
        <span className="flex items-center gap-2 text-slate-800">
          <Compass className="w-4 h-4 text-sky-600" />
          <span><strong>Pilih salah satu metode di bawah</strong> untuk melihat visualisasinya dan membuka simulator interaktif:</span>
        </span>
        <span className="text-[11px] text-sky-800 bg-white px-2.5 py-0.5 rounded-full border border-sky-200 font-bold shadow-2xs">
          Metode Terpilih: {selectedMethod === 'wawancara' ? '1. Wawancara' : selectedMethod === 'observasi' ? '2. Observasi' : '3. Studi Kasus'}
        </span>
      </div>

      {/* 3 Modern Pillars Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Card 1: WAWANCARA */}
        <div 
          id="card-wawancara"
          onClick={() => {
            sounds.playClick();
            setSelectedMethod('wawancara');
          }}
          className={`group cursor-pointer rounded-2xl bg-white border transition-all duration-300 p-5 flex flex-col justify-between relative overflow-hidden ${
            selectedMethod === 'wawancara' 
              ? 'ring-2 ring-sky-400 border-sky-300 bg-gradient-to-b from-sky-50/40 via-white to-white shadow-md' 
              : 'border-slate-200/90 hover:border-sky-300 hover:shadow-lg hover:-translate-y-1'
          }`}
        >
          {/* Top colored accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500"></div>

          <div>
            {/* Header Ribbon */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-extrabold text-xs tracking-wide shadow-xs flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>1. WAWANCARA</span>
              </div>
              
              {selectedMethod === 'wawancara' ? (
                <span className="text-[11px] font-extrabold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-300 flex items-center gap-1">
                  <Check className="w-3 h-3 text-sky-700" /> Aktif
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-400 group-hover:text-sky-600 transition-colors">
                  Pilih Metode →
                </span>
              )}
            </div>

            {/* Illustration */}
            <div className="mb-3.5">
              <InterviewGraphic mode={interviewMode} />
            </div>

            {/* Interactive Mode Toggle Pill on Card */}
            <div className="mb-3">
              <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1 text-[11px] font-bold border border-slate-200">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playClick();
                    setInterviewMode('tatap_muka');
                  }}
                  className={`flex-1 py-1 px-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                    interviewMode === 'tatap_muka'
                      ? 'bg-white text-sky-900 shadow-2xs font-extrabold border border-sky-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Users className="w-3 h-3 text-sky-600" /> Tatap Muka
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playClick();
                    setInterviewMode('telepon');
                  }}
                  className={`flex-1 py-1 px-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                    interviewMode === 'telepon'
                      ? 'bg-white text-sky-900 shadow-2xs font-extrabold border border-sky-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Phone className="w-3 h-3 text-sky-600" /> Daring / Audio
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Menggali informasi mendalam, alasan personal, serta dinamika emosional informan melalui dialog langsung dua arah.
            </p>
          </div>

          {/* Friendly Pro-Tip footer */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-[11px] text-sky-900 bg-sky-50/80 p-2 rounded-xl border border-sky-200/80 flex items-start gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
              <span><strong>Tips Peneliti:</strong> Gunakan pertanyaan terbuka (open-ended) agar informan bebas bercerita.</span>
            </div>
          </div>
        </div>

        {/* Card 2: OBSERVASI */}
        <div 
          id="card-observasi"
          onClick={() => {
            sounds.playClick();
            setSelectedMethod('observasi');
          }}
          className={`group cursor-pointer rounded-2xl bg-white border transition-all duration-300 p-5 flex flex-col justify-between relative overflow-hidden ${
            selectedMethod === 'observasi' 
              ? 'ring-2 ring-emerald-400 border-emerald-300 bg-gradient-to-b from-emerald-50/40 via-white to-white shadow-md' 
              : 'border-slate-200/90 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1'
          }`}
        >
          {/* Top colored accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>

          <div>
            {/* Header Ribbon */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs tracking-wide shadow-xs flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>2. OBSERVASI</span>
              </div>

              {selectedMethod === 'observasi' ? (
                <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-700" /> Aktif
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
                  Pilih Metode →
                </span>
              )}
            </div>

            {/* Illustration */}
            <div className="mb-3.5">
              <ObservationGraphic />
            </div>

            {/* Sub-Characteristics Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                Terstruktur
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                Partisipan
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                Alami
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Merekam tindakan spontan, gestur, dan pola interaksi kelompok dalam latar alamiah tanpa rekayasa buatan.
            </p>
          </div>

          {/* Friendly Pro-Tip footer */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-[11px] text-emerald-900 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/80 flex items-start gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Tips Peneliti:</strong> Amati tanpa membuat warga merasa canggung atau dihakimi (*Hawthorne Effect*).</span>
            </div>
          </div>
        </div>

        {/* Card 3: STUDI KASUS */}
        <div 
          id="card-studi-kasus"
          onClick={() => {
            sounds.playClick();
            setSelectedMethod('studi_kasus');
          }}
          className={`group cursor-pointer rounded-2xl bg-white border transition-all duration-300 p-5 flex flex-col justify-between relative overflow-hidden ${
            selectedMethod === 'studi_kasus' 
              ? 'ring-2 ring-cyan-400 border-cyan-300 bg-gradient-to-b from-cyan-50/40 via-white to-white shadow-md' 
              : 'border-slate-200/90 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1'
          }`}
        >
          {/* Top colored accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-600"></div>

          <div>
            {/* Header Ribbon */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="px-3 py-1.5 rounded-xl bg-cyan-600 text-white font-extrabold text-xs tracking-wide shadow-xs flex items-center gap-1.5">
                <FolderArchive className="w-3.5 h-3.5" />
                <span>3. STUDI KASUS</span>
              </div>

              {selectedMethod === 'studi_kasus' ? (
                <span className="text-[11px] font-extrabold text-cyan-800 bg-cyan-100 px-2.5 py-0.5 rounded-full border border-cyan-300 flex items-center gap-1">
                  <Check className="w-3 h-3 text-cyan-700" /> Aktif
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-400 group-hover:text-cyan-600 transition-colors">
                  Pilih Metode →
                </span>
              )}
            </div>

            {/* Illustration */}
            <div className="mb-3.5">
              <CaseStudyGraphic />
            </div>

            {/* Sub-Characteristics Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-900 border border-cyan-200">
                Multi-Sumber
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-900 border border-cyan-200">
                Triangulasi
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-900 border border-cyan-200">
                Holistik
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Mengeksplorasi suatu unit kasus secara utuh dan terperinci melalui triangulasi penggabungan beragam sumber bukti.
            </p>
          </div>

          {/* Friendly Pro-Tip footer */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-[11px] text-cyan-900 bg-cyan-50/80 p-2 rounded-xl border border-cyan-200/80 flex items-start gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
              <span><strong>Tips Peneliti:</strong> Cocokkan cerita lisan dengan arsip dokumen resmi agar temuan teruji kokoh.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alur Rantai Metodologi Ribbon */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="text-center mb-3.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Alur Rantai Metodologi Kualitatif yang Saling Melengkapi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          {/* Step 1 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-amber-900 uppercase">1. Kumpul Informasi</p>
              <p className="text-[11px] text-slate-600">Wawancara terbuka & pencatatan narasi lisan informan.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-emerald-900 uppercase">2. Analisis Perilaku</p>
              <p className="text-[11px] text-slate-600">Pengamatan interaksi nyata, koding tematik, & pola sosial.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-cyan-50/70 border border-cyan-200/80">
            <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-cyan-900 uppercase">3. Lapor Kasus</p>
              <p className="text-[11px] text-slate-600">Sintesis multi-sumber dokumen menjadi laporan naratif utuh.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BAGIAN SIMULASI INTERAKTIF                                                */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
        {/* Simulator Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Laboratorium Praktik Lapangan
            </span>
            <h2 className="text-xl font-black text-slate-900 font-heading">
              Simulasi Interaktif: {currentMethodData.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Uji langsung teknik penggalian data kualitatif dan amati bagaimana cara peneliti menganalisis fenomena.
            </p>
          </div>

          {/* Method switcher pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => { sounds.playClick(); setSelectedMethod('wawancara'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedMethod === 'wawancara' 
                  ? 'bg-amber-500 text-white shadow-xs font-black' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Wawancara
            </button>
            <button
              onClick={() => { sounds.playClick(); setSelectedMethod('observasi'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedMethod === 'observasi' 
                  ? 'bg-emerald-600 text-white shadow-xs font-black' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Observasi
            </button>
            <button
              onClick={() => { sounds.playClick(); setSelectedMethod('studi_kasus'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedMethod === 'studi_kasus' 
                  ? 'bg-cyan-600 text-white shadow-xs font-black' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Studi Kasus
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. SIMULASI WAWANCARA (CHAT DIALOGUE & PROBING DEPTH)         */}
        {/* ------------------------------------------------------------- */}
        {selectedMethod === 'wawancara' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Control Bar: Mode & Custom Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-950">Mode Skenario:</span>
                <button
                  onClick={() => { sounds.playClick(); setIsCustomMode(!isCustomMode); }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    isCustomMode 
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
                      : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  {isCustomMode ? '✓ Input Pertanyaan Sendiri' : '✎ Coba Input Judul & Pertanyaan Mandiri'}
                </button>
              </div>

              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-amber-200">
                <button
                  onClick={() => { sounds.playClick(); setInterviewMode('tatap_muka'); }}
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    interviewMode === 'tatap_muka'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> Tatap Muka
                </button>
                <button
                  onClick={() => { sounds.playClick(); setInterviewMode('telepon'); }}
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    interviewMode === 'telepon'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> Daring / Audio
                </button>
              </div>
            </div>

            {/* If Custom Input Mode */}
            {isCustomMode ? (
              <div className="p-5 bg-white rounded-2xl border-2 border-amber-300 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Perancangan Wawancara Mendalam Mandiri
                  </span>
                  <span className="text-[10px] text-amber-800 font-extrabold bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Live Testing
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 block mb-1">
                      1. Topik / Judul Riset Kualitatif:
                    </label>
                    <input
                      type="text"
                      value={customQualTopic}
                      onChange={(e) => setCustomQualTopic(e.target.value)}
                      placeholder="Contoh: Studi Fenomenologi Makna Kesejahteraan..."
                      className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 block mb-1">
                      2. Pertanyaan Wawancara Mendalam (Open-Ended):
                    </label>
                    <input
                      type="text"
                      value={customQuestionInput}
                      onChange={(e) => setCustomQuestionInput(e.target.value)}
                      placeholder="Contoh: Bagaimana Anda memaknai peristiwa tersebut...?"
                      className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-800"
                    />
                  </div>
                </div>

                {/* Simulated Response Chat Box */}
                <div className="p-4 bg-gradient-to-b from-amber-50/80 to-white rounded-2xl border border-amber-200 text-xs space-y-3">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-amber-600" /> Simulasi Respon Narasi Informan Lapangan:
                    </span>
                    <span className="text-[10px] text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-200 font-bold">
                      {interviewMode === 'tatap_muka' ? 'Terekam: Bahasa Tubuh + Ucapan' : 'Terekam: Nada Suara Daring'}
                    </span>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5 max-w-xl">
                      <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        P
                      </div>
                      <div className="bg-amber-100/90 text-amber-950 p-3 rounded-2xl rounded-tl-xs shadow-2xs">
                        <span className="text-[10px] font-extrabold text-amber-800 block mb-0.5">Peneliti Sosial:</span>
                        <p className="font-medium text-xs">"{customQuestionInput || '...'}"</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 max-w-xl ml-auto flex-row-reverse">
                      <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        N
                      </div>
                      <div className="bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tr-xs shadow-xs">
                        <span className="text-[10px] font-extrabold text-rose-700 block mb-0.5">Narasumber Kunci:</span>
                        <p className="italic text-xs font-medium leading-relaxed">
                          "{customQuestionInput ? `Mengenai hal tersebut, bagi saya dan warga di sini, persoalan ini bukan sekadar urusan uang atau materi semata. Ada rasa kebersamaan dan harga diri yang tidak bisa dinilai rupiah. Ketika aturan baru diterapkan tanpa musyawarah, kami merasa tidak lagi dianggap sebagai bagian dari komunitas ini...` : 'Ketikkan pertanyaan terbuka Anda di atas untuk melihat respon narasi informan.'}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-[11px] text-amber-900 bg-amber-100/50 p-2.5 rounded-xl border border-amber-200">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Evaluasi Metodologis:</strong> Pertanyaan Anda berhasil membuka pintu refleksi nilai. Dalam riset kualitatif, jawaban panjang penuh emosi seperti ini merupakan <em>"thick description"</em> yang menjadi bahan baku utama pengodean tematik.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Preset Questions with Probing Levels */
              <div className="space-y-4">
                {/* Question selector tabs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Pilih Pertanyaan Wawancara untuk Disimulasikan:
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Pilih salah satu nomor di bawah:
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {QUALITATIVE_METHODS[0].simulationQuestions?.map((q, idx) => (
                      <button
                        key={q.id}
                        onClick={() => {
                          sounds.playClick();
                          setActiveQuestionId(q.id);
                        }}
                        className={`text-left p-3 rounded-2xl border transition-all ${
                          activeQuestionId === q.id
                            ? 'border-amber-500 bg-amber-50/90 shadow-xs font-bold text-amber-950 ring-2 ring-amber-300'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">
                            Pertanyaan #{idx + 1}
                          </span>
                          {activeQuestionId === q.id && (
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          )}
                        </div>
                        <p className="text-xs leading-snug line-clamp-2">{q.question}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Dialogue Chat Box */}
                {(() => {
                  const currentQ = QUALITATIVE_METHODS[0].simulationQuestions?.find(q => q.id === activeQuestionId);
                  if (!currentQ) return null;
                  const activeAnswer = interviewMode === 'tatap_muka' ? currentQ.answerTatapMuka : currentQ.answerTelepon;

                  return (
                    <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-amber-50/30 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-xs font-black text-slate-800">
                            Transkrip Dialog Lapangan
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              sounds.playChime();
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                            title="Dengarkan simulasi audio"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                            <span>Audio Intonasi</span>
                          </button>

                          <button
                            onClick={() => handleCopyQuote(activeAnswer)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                            title="Salin kutipan narasumber"
                          >
                            <Copy className="w-3.5 h-3.5 text-amber-600" />
                            <span>Salin Kutipan</span>
                          </button>
                        </div>
                      </div>

                      {/* Chat Bubbles */}
                      <div className="space-y-3">
                        {/* Bubble Peneliti */}
                        <div className="flex items-start gap-3 max-w-xl">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                            <UserCheck className="w-4 h-4" />
                          </div>
                          <div className="bg-amber-100 text-amber-950 p-3 rounded-2xl rounded-tl-xs shadow-2xs border border-amber-200/80">
                            <span className="text-[10px] font-black text-amber-800 block mb-0.5">Peneliti Sosial (Pewawancara):</span>
                            <p className="text-xs font-bold leading-relaxed">{currentQ.question}</p>
                          </div>
                        </div>

                        {/* Bubble Informan */}
                        <div className="flex items-start gap-3 max-w-xl ml-auto flex-row-reverse">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                            <Smile className="w-4 h-4" />
                          </div>
                          <div className="bg-white border border-slate-200/90 text-slate-800 p-3.5 rounded-2xl rounded-tr-xs shadow-xs">
                            <div className="flex items-center justify-between gap-3 mb-1">
                              <span className="text-[10px] font-black text-rose-700">Narasumber Kunci (Informan):</span>
                              <span className="text-[9px] font-extrabold px-2 py-0.2 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                {interviewMode === 'tatap_muka' ? 'Tatap Muka' : 'Telepon'}
                              </span>
                            </div>
                            <p className="text-xs italic font-medium leading-relaxed text-slate-800">
                              "{activeAnswer}"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Metodologis Insight */}
                      <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-2xs">
                        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-900 block mb-0.5">Refleksi Pembelajaran Metodologis:</strong>
                          <span>{currentQ.insight}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. SIMULASI OBSERVASI (FIELDWORK, TIMELINE, ADD FIELDNOTES)   */}
        {/* ------------------------------------------------------------- */}
        {selectedMethod === 'observasi' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Setting & Time Selector Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
              {/* Lokasi */}
              <div>
                <span className="text-xs font-bold text-emerald-950 block mb-1.5">
                  1. Pilih Setting Lokasi Lapangan:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { sounds.playClick(); setSelectedObsLocation('taman'); }}
                    className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      selectedObsLocation === 'taman'
                        ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                        : 'bg-white text-slate-700 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <TreePine className="w-3.5 h-3.5" /> Taman Komunitas
                  </button>
                  <button
                    onClick={() => { sounds.playClick(); setSelectedObsLocation('ruang_belajar'); }}
                    className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      selectedObsLocation === 'ruang_belajar'
                        ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                        : 'bg-white text-slate-700 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" /> Balai Warga / RT
                  </button>
                </div>
              </div>

              {/* Waktu Pengamatan */}
              <div>
                <span className="text-xs font-bold text-emerald-950 block mb-1.5">
                  2. Pilih Waktu Pengamatan (Dinamika Sosial Berubah):
                </span>
                <div className="grid grid-cols-4 gap-1 bg-white p-1 rounded-xl border border-emerald-200 text-center">
                  {[
                    { id: 'pagi', label: 'Pagi', time: '08:00' },
                    { id: 'siang', label: 'Siang', time: '12:30' },
                    { id: 'sore', label: 'Sore', time: '16:45' },
                    { id: 'malam', label: 'Malam', time: '19:30' }
                  ].map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => { sounds.playClick(); setObsTimeSlot(slot.id as any); }}
                      className={`py-1 rounded-lg text-xs font-bold transition-all ${
                        obsTimeSlot === slot.id
                          ? 'bg-emerald-600 text-white shadow-2xs font-extrabold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{slot.label}</span>
                      <span className="text-[9px] block font-normal opacity-80">{slot.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Checklist items observed in real time */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4 text-emerald-600" /> Lembar Catatan Observasi Terstruktur (Fieldnotes)
                </span>
                <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Waktu Sesi: {obsTimeSlot.toUpperCase()}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {getDynamicObsItems().map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 bg-white rounded-2xl border border-emerald-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-600" /> {item.time} WIB
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-500">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        "{item.note}"
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Terverifikasi Lapangan
                      </span>
                      <button 
                        onClick={() => handleCopyQuote(item.note)}
                        className="text-slate-400 hover:text-emerald-700 p-1"
                        title="Salin temuan"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* User added custom fieldnotes */}
                {userFieldnotes.map((uItem, uIdx) => (
                  <div 
                    key={`u-${uIdx}`} 
                    className="p-4 bg-amber-50/60 rounded-2xl border-2 border-dashed border-amber-300 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600" /> {uItem.time} WIB (Input Anda)
                        </span>
                        <span className="text-[10px] font-bold text-amber-700">
                          {uItem.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                        "{uItem.note}"
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-amber-200/80 flex items-center justify-between text-[11px] text-amber-800 font-bold">
                      <span>✓ Catatan Pengguna Tersimpan</span>
                      <button 
                        onClick={() => handleCopyQuote(uItem.note)}
                        className="text-amber-600 hover:text-amber-900 p-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Tambah Catatan Lapangan Saya */}
              <form onSubmit={handleAddUserFieldnote} className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="text-xs font-black text-slate-800 block">
                  ✍️ Tambahkan Catatan Lapangan Mandiri Anda ke Checklist:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customFieldnoteInput}
                    onChange={(e) => setCustomFieldnoteInput(e.target.value)}
                    placeholder="Contoh: Terlihat 2 pedagang bersepakat membagi jam operasional lapak di depan gerbang..."
                    className="flex-1 px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1 shrink-0 shadow-xs"
                  >
                    <Plus className="w-4 h-4" /> Simpan Catatan
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Simulasikan bagaimana seorang peneliti langsung menuliskan pengamatan spontan ke dalam jurnal observasi.
                </span>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. SIMULASI STUDI KASUS (TRIANGULASI METER & MATRIX MULTI-BUKTI)*/}
        {/* ------------------------------------------------------------- */}
        {selectedMethod === 'studi_kasus' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Triangulation Explanation & Confidence Meter */}
            <div className="p-4 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 rounded-2xl border border-cyan-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-black text-cyan-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" /> Meter Validitas Triangulasi Ilmiah
                  </span>
                  <p className="text-xs text-slate-600">
                    Klik kartu sumber bukti di bawah untuk menghubungkan atau memutus data triangulasi kasus:
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-indigo-700 bg-white px-2.5 py-1 rounded-xl border border-indigo-200">
                    Kekuatan Data: {Math.round((collectedEvidence.length / 3) * 100)}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/80 h-3 rounded-full overflow-hidden p-0.5 border border-cyan-200">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    collectedEvidence.length === 3 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                      : collectedEvidence.length === 2 
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500' 
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${(collectedEvidence.length / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 3 Documents Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {QUALITATIVE_METHODS[2].evidenceDocs?.map((doc) => {
                const isSelected = collectedEvidence.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleEvidence(doc.id)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-50/60 shadow-md ring-2 ring-cyan-200'
                        : 'border-slate-200 bg-white opacity-60 hover:opacity-100 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200">
                          {doc.type}
                        </span>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
                          isSelected ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-300'
                        }`}>
                          {isSelected ? '✓' : '+'}
                        </div>
                      </div>
                      <h4 className="text-xs font-black text-slate-800 mb-1.5">{doc.title}</h4>
                      <p className="text-[11px] text-slate-600 italic bg-white p-2.5 rounded-xl border border-cyan-100/80 leading-relaxed">
                        "{doc.excerpt}"
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-cyan-200/50 flex items-center justify-between text-[11px] font-bold">
                      <span className={isSelected ? 'text-cyan-800' : 'text-slate-400'}>
                        {isSelected ? '✓ Terhubung ke Triangulasi' : '+ Klik untuk Hubungkan'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Synthesis Outcome */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Simpulan Triangulasi Studi Kasus ({collectedEvidence.length}/3 Dokumen Terkumpul)
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black ${
                  collectedEvidence.length === 3 
                    ? 'bg-emerald-500 text-white' 
                    : collectedEvidence.length === 2 
                    ? 'bg-amber-400 text-slate-950' 
                    : 'bg-rose-500 text-white'
                }`}>
                  {collectedEvidence.length === 3 ? '★ Triangulasi Sempurna' : collectedEvidence.length === 2 ? '⚠️ Data Cukup (Parsial)' : '❌ Rentan Bias Sepihak'}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {collectedEvidence.length === 3
                  ? 'Kesimpulan Valid & Kokoh: Keberhasilan penurunan angka kriminalitas (Data Statistik) terbukti bukan sekadar klaim sepihak aparat, melainkan didukung oleh komitmen kesepakatan ronda swadaya (Arsip Notulensi) yang dipadukan dengan kesediaan pemuda lokal untuk dialihkan ke aktivitas kreasi seni (Wawancara Tokoh).'
                  : collectedEvidence.length === 2
                  ? 'Kesimpulan Masih Rawan: Anda telah mengaitkan 2 sumber, namun masih terdapat celah pembuktian. Tanpa melengkapi ketiga sumber (arsip, kesaksian lisan, dan angka statistik), ada risiko klaim Anda ditolak dalam seminar akademik karena bias sudut pandang.'
                  : 'Peringatan Metodologis Fatal: Hanya mengandalkan 1 sumber bukti berisiko tinggi terjebak dalam bias subjektif. Klik minimal dua dokumen lainnya di atas untuk membangun argumentasi riset yang kokoh.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
