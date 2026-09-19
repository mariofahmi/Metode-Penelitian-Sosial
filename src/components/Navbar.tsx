import React from 'react';
import { ActiveTab } from '../types';
import logoMf from '../assets/logo-mf.png';
import { 
  BookOpen, 
  Layers, 
  FlaskConical, 
  AlertTriangle, 
  Sparkles, 
  BookMarked, 
  ArrowRightLeft, 
  Volume2, 
  VolumeX,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openGlossary: () => void;
  openDisclaimer?: () => void;
  userXp?: number;
  userLevelName?: string;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openGlossary,
  openDisclaimer,
  isAudioMuted,
  onToggleAudio
}) => {
  const handleTabClick = (tab: ActiveTab) => {
    sounds.playClick();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-teal-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-3">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white flex items-center justify-center shadow-md shadow-teal-950/15 ring-2 ring-teal-200/80 shrink-0 p-1 overflow-hidden">
              <img 
                src={logoMf} 
                alt="Logo Mario Fahmi" 
                className="w-full h-full object-contain transform hover:scale-105 transition-transform" 
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-xs sm:text-base md:text-lg tracking-tight text-slate-900 font-heading truncate">
                  Metode Penelitian Sosial
                </span>
                <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                  <Sparkles className="w-3 h-3 text-emerald-500" /> Edukasi Interaktif
                </span>
              </div>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="inline-flex items-center gap-1.5 font-medium text-teal-900 bg-teal-50/90 px-1.5 sm:px-2.5 py-0.5 rounded-lg border border-teal-200/80 text-[9.5px] sm:text-[11px] shadow-2xs truncate">
                  <img src={logoMf} alt="MF" className="w-3.5 h-3.5 object-contain shrink-0" />
                  <span className="text-slate-500 hidden xs:inline">Perancang:</span>
                  <strong className="font-extrabold text-teal-950 uppercase tracking-wide truncate">MARIO FAHMI SYARIAL</strong>
                </span>
              </div>
            </div>
          </div>

          {/* User Progress, Audio & Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio Mute/Unmute Toggle */}
            <button
              onClick={onToggleAudio}
              className="p-2 min-w-[34px] min-h-[34px] flex items-center justify-center text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-teal-50 rounded-xl transition-colors border border-slate-200 hover:border-teal-200"
              title={isAudioMuted ? 'Nyalakan Efek Suara' : 'Matikan Suara'}
              aria-label="Toggle Audio"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-teal-600" />}
            </button>

            {/* Glossary Button */}
            <button
              onClick={openGlossary}
              id="open-glossary-btn"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[34px] text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-xl transition-colors border border-slate-200 hover:border-teal-200"
              title="Kamus Istilah Metodologi Penelitian"
            >
              <BookMarked className="w-4 h-4 text-teal-600" />
              <span className="hidden md:inline">Glosarium</span>
            </button>

            {/* Disclaimer Button */}
            {openDisclaimer && (
              <button
                onClick={openDisclaimer}
                id="open-disclaimer-btn"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[34px] text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100/80 rounded-xl transition-colors border border-rose-200 shadow-2xs"
                title="Baca Ketentuan & Etika Disclaimer"
              >
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span className="hidden md:inline">Disclaimer</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs Bar with Touch-Friendly Horizontal Scroll */}
        <nav className="flex space-x-1 sm:space-x-2 py-2 overflow-x-auto border-t border-teal-100/70 scroll-smooth touch-pan-x no-scrollbar">
          <button
            id="tab-dashboard"
            onClick={() => handleTabClick('dashboard')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-1.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all touch-manipulation ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300'
                : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/80'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            id="tab-kualitatif"
            onClick={() => handleTabClick('kualitatif')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-1.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all touch-manipulation ${
              activeTab === 'kualitatif'
                ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300'
                : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Kualitatif</span>
          </button>

          <button
            id="tab-kuantitatif"
            onClick={() => handleTabClick('kuantitatif')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-1.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all touch-manipulation ${
              activeTab === 'kuantitatif'
                ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300'
                : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/80'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>2. Kuantitatif</span>
          </button>

          <button
            id="tab-masalah"
            onClick={() => handleTabClick('masalah')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-1.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all touch-manipulation ${
              activeTab === 'masalah'
                ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300'
                : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/80'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>3. Tiga Masalah</span>
          </button>

          <button
            id="tab-komparasi"
            onClick={() => handleTabClick('komparasi')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-1.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all touch-manipulation ${
              activeTab === 'komparasi'
                ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300'
                : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/80'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Komparasi</span>
          </button>

          <button
            id="tab-lab"
            onClick={() => handleTabClick('lab')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-1.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all touch-manipulation ${
              activeTab === 'lab'
                ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300'
                : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/80'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Lab Riset</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

