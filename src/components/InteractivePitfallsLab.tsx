import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Eye, 
  Users, 
  RefreshCw, 
  AlertTriangle, 
  EyeOff, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface InteractivePitfallsLabProps {
  activeTab?: 'bias' | 'subjektivitas' | 'generalisasi';
  onTabChange?: (tab: 'bias' | 'subjektivitas' | 'generalisasi') => void;
  onXpGained?: (amount: number, reason: string) => void;
}

export const InteractivePitfallsLab: React.FC<InteractivePitfallsLabProps> = ({
  activeTab: externalTab,
  onTabChange,
  onXpGained
}) => {
  const [internalTab, setInternalTab] = useState<'bias' | 'subjektivitas' | 'generalisasi'>('bias');
  const activeTab = externalTab ?? internalTab;

  const setActiveTab = (tab: 'bias' | 'subjektivitas' | 'generalisasi') => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  // States for interactions
  const [isBiased, setIsBiased] = useState(false);
  const [isSubjective, setIsSubjective] = useState(false);
  const [isSampled, setIsSampled] = useState(false);

  // Data for Bias Interaction
  const targetBiasColor = 'bg-orange-500';
  const otherColors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-yellow-400'];
  
  // Generate random data points for Bias only once
  const biasData = useMemo(() => {
    return Array.from({ length: 60 }).map(() => {
      const isTarget = Math.random() > 0.7; // ~30% are target color
      return isTarget ? targetBiasColor : otherColors[Math.floor(Math.random() * otherColors.length)];
    });
  }, []);

  // Data for Generalization Interaction
  const populationSize = 50;
  const sampleIndices = [0, 1, 2, 10, 11, 12]; // A clustered group in top left

  const handleToggleBias = () => {
    sounds.playClick();
    const next = !isBiased;
    setIsBiased(next);
    if (next && onXpGained) {
      onXpGained(25, 'Menemukan Efek Cherry-Picking pada Titik Data');
    }
  };

  const handleToggleSubjectivity = () => {
    sounds.playClick();
    const next = !isSubjective;
    setIsSubjective(next);
    if (next && onXpGained) {
      onXpGained(25, 'Menguji Kacamata Emosional vs Netralitas');
    }
  };

  const handleToggleSampling = () => {
    sounds.playClick();
    const next = !isSampled;
    setIsSampled(next);
    if (next && onXpGained) {
      onXpGained(25, 'Mendeteksi Jebakan Sampel Generalisasi Keliru');
    }
  };

  const renderTabs = () => (
    <div className="grid grid-cols-3 sm:flex sm:flex-row gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
      <button
        onClick={() => { sounds.playCardFlip(); setActiveTab('bias'); setIsBiased(false); }}
        className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-xs text-xs sm:text-base ${
          activeTab === 'bias'
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105 ring-2 ring-orange-300'
            : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
        }`}
      >
        <Filter className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" /> 
        <span>Bias</span>
      </button>
      <button
        onClick={() => { sounds.playCardFlip(); setActiveTab('subjektivitas'); setIsSubjective(false); }}
        className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-xs text-xs sm:text-base ${
          activeTab === 'subjektivitas'
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105 ring-2 ring-emerald-300'
            : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
        }`}
      >
        <Eye className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" /> 
        <span className="truncate">Subjektivitas</span>
      </button>
      <button
        onClick={() => { sounds.playCardFlip(); setActiveTab('generalisasi'); setIsSampled(false); }}
        className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-xs text-xs sm:text-base ${
          activeTab === 'generalisasi'
            ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 scale-105 ring-2 ring-sky-300'
            : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
        }`}
      >
        <Users className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" /> 
        <span className="truncate">Generalisasi</span>
      </button>
    </div>
  );

  const renderBiasContent = () => (
    <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl border-t-4 border-orange-500 animate-fadeIn">
      <div className="mb-6">
        <h3 className="text-lg sm:text-2xl font-black text-slate-900 mb-2 flex items-center gap-2 font-heading">
          <Filter className="text-orange-500 shrink-0" /> Bias dalam Penelitian
        </h3>
        <p className="text-slate-600 text-sm sm:text-lg leading-relaxed">
          <strong className="text-orange-600">Pemilihan data yang tidak adil (Bias Konfirmasi).</strong> Peneliti hanya mengumpulkan atau memperhatikan data yang mendukung hipotesis awalnya dan membuang fakta lain.
        </p>
      </div>

      <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl mb-6 min-h-[260px] sm:min-h-[300px] flex flex-col justify-center relative overflow-hidden border border-slate-200">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 z-10 relative max-w-2xl mx-auto">
          {biasData.map((color, idx) => (
            <div
              key={idx}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-700 ease-in-out shadow-xs ${
                isBiased 
                  ? (color === targetBiasColor ? `${color} scale-125 ring-2 ring-orange-400` : 'bg-slate-300 scale-50 opacity-30') 
                  : `${color} scale-100 hover:scale-110 cursor-pointer`
              }`}
            />
          ))}
        </div>
        
        {isBiased && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
             <Filter size={200} className="text-orange-500/10" />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-600 flex items-center gap-2">
           {isBiased ? <XCircle size={20} className="text-red-500 shrink-0"/> : <CheckCircle2 size={20} className="text-emerald-500 shrink-0"/>}
           <span>{isBiased ? "Data lain dibuang atau diabaikan!" : "Kumpulan data yang beragam dan representatif."}</span>
        </div>
        <button
          onClick={handleToggleBias}
          className="w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
        >
          {isBiased ? <RefreshCw size={18} /> : <Filter size={18} />}
          <span>{isBiased ? 'Reset Data' : 'Terapkan Bias'}</span>
        </button>
      </div>
    </div>
  );

  const renderSubjectivityContent = () => (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500 animate-fadeIn">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 flex items-center gap-2 font-heading">
          <Eye className="text-emerald-500" /> Subjektivitas
        </h3>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          <strong className="text-emerald-600">Membiarkan perasaan atau kepentingan memengaruhi analisis.</strong> Interpretasi data dikaburkan oleh kacamata emosional atau opini pribadi peneliti.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl mb-6 relative overflow-hidden border border-slate-200">
        <div className="flex justify-center mb-8 relative z-10">
            <button 
                onClick={handleToggleSubjectivity}
                className={`flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-500 cursor-pointer ${
                  isSubjective 
                    ? 'bg-emerald-100 text-emerald-900 shadow-inner border border-emerald-300 font-black' 
                    : 'bg-white text-slate-700 shadow-md hover:bg-slate-100 border border-slate-200 font-bold'
                }`}
            >
                {isSubjective ? <Eye size={28} className="text-emerald-600 animate-pulse" /> : <EyeOff size={28} />}
                <span className="text-base sm:text-lg">{isSubjective ? 'Kacamata Emosional Aktif' : 'Kacamata Netral Aktif'}</span>
            </button>
        </div>

        <div className={`p-6 rounded-2xl transition-all duration-700 relative z-10 transform ${isSubjective ? 'bg-red-50 border-l-4 border-red-500 scale-[1.02] shadow-sm' : 'bg-white border border-slate-200 scale-100 shadow-xs'}`}>
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-400 mb-2 font-heading">
            Teks Laporan Penelitian:
          </h4>
          <p className={`text-lg sm:text-xl transition-all duration-500 leading-relaxed font-serif ${isSubjective ? 'text-red-700 italic font-medium' : 'text-slate-700 font-sans'}`}>
            {isSubjective 
              ? '“Kebijakan ini adalah sebuah BENCANA MUTLAK yang dirancang secara kejam untuk MENGHANCURKAN masa depan dan harapan kita semua tanpa sisa!”' 
              : '“Data menunjukkan bahwa Kebijakan X berkolerasi dengan penurunan alokasi anggaran sebesar 10% pada kuartal ini.”'}
          </p>
        </div>

        {/* Decorative background elements */}
        {isSubjective && (
            <div className="absolute -right-10 -top-10 text-red-500/10 transform rotate-12 transition-opacity duration-1000 z-0 pointer-events-none">
                <AlertTriangle size={240} />
            </div>
        )}
      </div>
      
      <div className="text-center text-sm font-semibold text-slate-500">
        Klik tombol di atas untuk mengubah kacamata analisis.
      </div>
    </div>
  );

  const renderGeneralizationContent = () => (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-sky-500 animate-fadeIn">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 flex items-center gap-2 font-heading">
          <Users className="text-sky-600" /> Generalisasi (Salah)
        </h3>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          <strong className="text-sky-600">Menganggap sampel kecil mewakili seluruh populasi secara salah.</strong> Menarik kesimpulan besar tentang dunia dari kelompok yang sangat terbatas dan tidak mewakili keberagaman.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl mb-6 relative border border-slate-200">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4 justify-items-center">
          {Array.from({ length: populationSize }).map((_, idx) => {
            const isSampledTarget = sampleIndices.includes(idx);
            return (
              <div 
                key={idx} 
                className={`transition-all duration-700 ease-in-out p-1.5 rounded-xl ${
                  isSampled 
                    ? (isSampledTarget ? 'bg-sky-100 scale-125 shadow-xs ring-1 ring-sky-300' : 'opacity-20 scale-75 blur-[1px]') 
                    : 'hover:bg-slate-200'
                }`}
              >
                <Users 
                    size={22} 
                    className={`transition-colors duration-700 ${
                        isSampled 
                        ? (isSampledTarget ? 'text-sky-600' : 'text-slate-400') 
                        : 'text-slate-500'
                    }`} 
                />
              </div>
            );
          })}
        </div>

        <div className={`mt-6 p-4 rounded-xl border-2 border-dashed transition-all duration-500 flex items-start sm:items-center gap-3 ${
            isSampled ? 'border-red-400 bg-red-50 text-red-800 opacity-100 translate-y-0' : 'border-transparent opacity-0 translate-y-4 pointer-events-none'
        }`}>
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 mt-0.5 sm:mt-0" />
            <p className="font-semibold text-sm sm:text-base">
                Kesimpulan Keliru: &quot;Dunia persis seperti 6 orang di pojok kiri atas ini!&quot; 
                <span className="block text-xs sm:text-sm font-normal text-red-600 mt-1">
                  Mengabaikan 44 orang lain yang memiliki karakteristik berbeda.
                </span>
            </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm font-medium text-slate-600">
           Populasi: <strong>{populationSize} orang</strong> (Sampel Terpilih: <strong>{isSampled ? sampleIndices.length : 0} orang</strong>)
        </div>
        <button
          onClick={handleToggleSampling}
          className={`w-full sm:w-auto px-6 py-2.5 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 ${
              isSampled ? 'bg-slate-700 hover:bg-slate-800 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'
          }`}
        >
          {isSampled ? <RefreshCw size={18} /> : <AlertTriangle size={18} />}
          <span>{isSampled ? 'Reset Populasi' : 'Ambil Sampel Buruk'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="rounded-3xl bg-slate-100/80 border border-slate-200 text-slate-800 p-4 sm:p-8 shadow-xs">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3 font-heading">
            3 Masalah Utama dalam <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">Ilmu Sosial</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Jelajahi bagaimana bias, subjektivitas, dan generalisasi yang keliru dapat merusak integritas sebuah penelitian melalui simulasi interaktif di bawah ini.
          </p>
        </header>

        {renderTabs()}

        <main className="transition-all duration-300">
          {activeTab === 'bias' && renderBiasContent()}
          {activeTab === 'subjektivitas' && renderSubjectivityContent()}
          {activeTab === 'generalisasi' && renderGeneralizationContent()}
        </main>
        
        <footer className="text-center mt-8 text-slate-400 text-xs font-semibold">
            <p>Edukasi Interaktif Penelitian Ilmiah • 100% Bebas Gambar</p>
        </footer>
      </div>
    </div>
  );
};
