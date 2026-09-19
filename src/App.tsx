/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Module1Qualitative } from './components/Module1Qualitative';
import { Module2Quantitative } from './components/Module2Quantitative';
import { Module3Pitfalls } from './components/Module3Pitfalls';
import { ModuleComparison } from './components/ModuleComparison';
import { ResearchLabSimulator } from './components/ResearchLabSimulator';
import { GlossaryModal } from './components/GlossaryModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { getUserLevelInfo } from './data/socialResearchData';
import { sounds } from './utils/soundEffects';
import { 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import logoMf from './assets/logo-mf.png';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  // Disclaimer Onboarding Gate: Selalu muncul di awal saat membuka aplikasi sebelum masuk ke menu
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState<boolean>(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(true);

  // Bersihkan token lama jika ada agar selalu muncul setiap sesi baru dibuka
  useEffect(() => {
    try {
      localStorage.removeItem('mps_disclaimer_accepted');
    } catch {
      // ignore
    }
  }, []);

  // Gamification states initialized from localStorage
  const [xp, setXp] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('mps_user_xp');
      return stored ? Number(stored) : 45; // Starting with starter XP
    } catch {
      return 45;
    }
  });

  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => sounds.getIsMuted());

  // Toast / XP Notification popup
  const [xpToast, setXpToast] = useState<{ amount: number; reason: string } | null>(null);

  const levelInfo = getUserLevelInfo(xp);

  // Sync XP to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mps_user_xp', String(xp));
    } catch {
      // ignore
    }
  }, [xp]);

  const handleXpGained = (amount: number, reason: string) => {
    setXp(prev => prev + amount);
    setXpToast({ amount, reason });
    setTimeout(() => {
      setXpToast(null);
    }, 3500);
  };

  const handleAcceptDisclaimer = () => {
    setHasAcceptedDisclaimer(true);
    setIsDisclaimerOpen(false);
    handleXpGained(25, 'Membaca dan Menyetujui Disclaimer & Etika Riset');
  };

  const handleToggleAudio = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    sounds.setMuted(nextMuted);
    if (!nextMuted) {
      sounds.playSuccess();
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50/40 via-slate-50 to-sky-50/30 text-slate-800 selection:bg-teal-200 selection:text-teal-900">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openGlossary={() => setIsGlossaryOpen(true)}
        openDisclaimer={() => setIsDisclaimerOpen(true)}
        userXp={xp}
        userLevelName={levelInfo.name}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7">
        {/* Quick Module Switcher Hero Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 sm:p-3.5 bg-white/95 backdrop-blur-xs rounded-2xl border border-teal-100/80 shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="text-xs font-bold text-slate-700 shrink-0">
              Modul:
            </span>
            <span className="text-xs font-extrabold text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200/80 shadow-2xs truncate">
              {activeTab === 'dashboard' && 'Beranda: Peta Jalan & Pusat Navigasi Riset'}
              {activeTab === 'kualitatif' && 'Modul 1: Wawancara, Observasi & Studi Kasus (Kualitatif)'}
              {activeTab === 'kuantitatif' && 'Modul 2: Survei, Eksperimen & Statistik (Kuantitatif)'}
              {activeTab === 'masalah' && 'Modul 3: Tiga Masalah (Bias, Subjektivitas & Generalisasi)'}
              {activeTab === 'komparasi' && 'Modul Komparasi: Kuantitatif vs Kualitatif (Tabel 5 & 4 Poin Kunci)'}
              {activeTab === 'lab' && 'Laboratorium & Desain Riset Sosial'}
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-semibold text-slate-500 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Status: <strong className="text-teal-950">{levelInfo.name}</strong></span>
            </div>
            <span>•</span>
            <span className="font-mono text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">{xp} XP</span>
          </div>
        </div>

        {/* Tab Modules Routing */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab}
            userXp={xp}
            userLevelName={levelInfo.name}
            openGlossary={() => setIsGlossaryOpen(true)}
            onXpGained={handleXpGained}
          />
        )}
        {activeTab === 'kualitatif' && <Module1Qualitative />}
        {activeTab === 'kuantitatif' && <Module2Quantitative onXpGained={handleXpGained} />}
        {activeTab === 'masalah' && <Module3Pitfalls onXpGained={handleXpGained} />}
        {activeTab === 'komparasi' && <ModuleComparison />}
        {activeTab === 'lab' && (
          <ResearchLabSimulator
            onXpGained={handleXpGained}
          />
        )}
      </main>

      {/* Floating XP Reward Notification Toast */}
      {xpToast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-xl border border-emerald-400/50 animate-bounce">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-300 text-teal-950 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
            ★
          </div>
          <div>
            <span className="text-xs font-black text-emerald-300 block font-mono">
              +{xpToast.amount} XP RISTEK!
            </span>
            <span className="text-[11px] text-slate-200">
              {xpToast.reason}
            </span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-teal-100/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-teal-200/80 shadow-xs flex items-center justify-center p-1 overflow-hidden shrink-0">
                <img src={logoMf} alt="Logo Mario Fahmi" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Aplikasi Edukasi Interaktif: Metode Penelitian Sosial
                </p>
                <p className="text-[11px] text-slate-500">
                  Perancang: <strong className="font-extrabold text-teal-950">MARIO FAHMI SYARIAL</strong> • Hak Cipta &amp; Desain Terlindungi
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600">
              <button 
                onClick={() => { sounds.playClick(); setActiveTab('dashboard'); }}
                className="hover:text-sky-600 transition-colors font-bold text-sky-700"
              >
                Dashboard
              </button>
              <button 
                onClick={() => { sounds.playClick(); setActiveTab('kualitatif'); }}
                className="hover:text-sky-600 transition-colors"
              >
                Kualitatif
              </button>
              <button 
                onClick={() => { sounds.playClick(); setActiveTab('kuantitatif'); }}
                className="hover:text-sky-600 transition-colors"
              >
                Kuantitatif
              </button>
              <button 
                onClick={() => { sounds.playClick(); setActiveTab('masalah'); }}
                className="hover:text-sky-600 transition-colors"
              >
                3 Masalah
              </button>
              <button 
                onClick={() => { sounds.playClick(); setActiveTab('komparasi'); }}
                className="hover:text-sky-600 transition-colors"
              >
                Komparasi
              </button>
              <button 
                onClick={() => { sounds.playClick(); setActiveTab('lab'); }}
                className="hover:text-sky-600 transition-colors text-sky-700 font-bold"
              >
                Lab Riset
              </button>
              <button 
                onClick={() => { sounds.playClick(); setIsDisclaimerOpen(true); }}
                className="hover:text-rose-600 text-rose-700 font-bold transition-colors"
              >
                Disclaimer
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GlossaryModal 
        isOpen={isGlossaryOpen} 
        onClose={() => setIsGlossaryOpen(false)} 
      />

      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onAccept={handleAcceptDisclaimer}
        canCloseWithoutAccept={hasAcceptedDisclaimer}
        onClose={() => setIsDisclaimerOpen(false)}
      />
    </div>
  );
}


