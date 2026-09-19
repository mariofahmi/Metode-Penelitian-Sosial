import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Scale, 
  GraduationCap, 
  FileCheck, 
  Lock, 
  ArrowRight,
  Sparkles,
  Award,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
  canCloseWithoutAccept?: boolean;
  onClose?: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onAccept,
  canCloseWithoutAccept = false,
  onClose
}) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Periksa apakah konten sudah sampai bawah atau tidak perlu scroll jika layar sangat besar
  useEffect(() => {
    if (!isOpen) return;
    
    // Reset state saat modal dibuka
    setIsChecked(false);
    setHasScrolledToBottom(false);
    setScrollProgress(0);

    const timer = setTimeout(() => {
      const el = contentRef.current;
      if (el) {
        if (el.scrollHeight <= el.clientHeight + 20) {
          setHasScrolledToBottom(true);
          setScrollProgress(100);
        } else {
          const initialProgress = Math.min(100, Math.round(((el.scrollTop + el.clientHeight) / el.scrollHeight) * 100));
          setScrollProgress(initialProgress);
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  // Deteksi scroll ke bagian paling bawah
  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const progress = Math.min(100, Math.round(((scrollTop + clientHeight) / scrollHeight) * 100));
    setScrollProgress(progress);

    // Jika sudah mencapai 25px dari batas bawah, tandai telah selesai dibaca
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      if (!hasScrolledToBottom) {
        setHasScrolledToBottom(true);
        sounds.playChime();
      }
    }
  };

  // Tombol pintasan untuk langsung gulir ke bagian bawah
  const handleScrollToBottom = () => {
    sounds.playClick();
    const el = contentRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleConfirm = () => {
    if (!hasScrolledToBottom || !isChecked) return;
    sounds.playChime();
    onAccept();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-teal-100 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Deep Ocean & Emerald Mint) */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#072f4a] via-[#0c4a6e] to-[#0e7490] p-4 sm:p-7 text-white border-b border-teal-400/30 shrink-0">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-8 -left-8 w-48 h-24 rounded-full bg-teal-300/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center text-teal-900 shadow-lg shadow-teal-950/20 shrink-0 p-1 overflow-hidden ring-2 ring-teal-200/50">
                <img src="/logo-mf.png" alt="Logo Mario Fahmi" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-300/30 text-emerald-200 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3 text-emerald-300 shrink-0" />
                  <span>Persetujuan &amp; Integritas</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black font-heading tracking-tight text-white leading-tight">
                  Disclaimer &amp; Etika Metodologi
                </h2>
              </div>
            </div>

            {canCloseWithoutAccept && onClose && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <p className="text-xs text-teal-100/90 mt-2 sm:mt-2.5 leading-relaxed font-normal relative z-10">
            Sebelum mengeksplorasi modul dan laboratorium penelitian sosial ini, Anda diwajibkan membaca, memahami, dan mematuhi prinsip-prinsip metodologis berikut.
          </p>

          <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] text-teal-200 font-semibold relative z-10">
            <div className="flex items-center gap-1.5">
              <img src="/logo-mf.png" alt="MF" className="w-4 h-4 object-contain rounded shrink-0 bg-white/20 p-0.5" />
              <span>Hak Cipta &amp; Rancang Bangun: <strong>MARIO FAHMI SYARIAL</strong></span>
            </div>

            {/* Indikator Status Membaca di Header */}
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1 ${
              hasScrolledToBottom 
                ? 'bg-emerald-400/20 text-emerald-200 border-emerald-300/40' 
                : 'bg-white/15 text-white/90 border-white/20'
            }`}>
              {hasScrolledToBottom ? '✓ Selesai Dibaca' : `${scrollProgress}% Terbaca`}
            </span>
          </div>
        </div>

        {/* Scrollable Content Body with Scroll Tracker */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="p-5 sm:p-6 space-y-4 overflow-y-auto text-xs leading-relaxed text-slate-700 flex-1"
        >
          {/* Petunjuk Membaca Awal */}
          {!hasScrolledToBottom && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2 text-[11px] font-semibold animate-pulse">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Silakan gulir (scroll) ke bawah sampai akhir untuk membaca seluruh 4 poin disclaimer.</span>
            </div>
          )}

          {/* Point 1 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 shadow-2xs font-bold mt-0.5">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-0.5">
                1. Tujuan Edukasi &amp; Pembelajaran Interaktif
              </h3>
              <p className="text-slate-600">
                Platform ini dikembangkan secara murni sebagai media edukasi, simulasi konseptual, dan panduan praktis untuk membantu mahasiswa, akademisi, serta peneliti pemula memahami metodologi penelitian sosial.
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs font-bold mt-0.5">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-0.5">
                2. Batasan Tanggung Jawab Akademik
              </h3>
              <p className="text-slate-600">
                Kalkulator rumus sampel (Slovin), draf Bab 3 skripsi, serta simulasi pengujian merupakan rekomendasi konseptual terstandar. Peneliti tetap berkewajiban melakukan konsultasi bersama dosen pembimbing skripsi/tesis masing-masing sesuai pedoman fakultas.
              </p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 shadow-2xs font-bold mt-0.5">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-0.5">
                3. Integritas Data &amp; Anti-Manipulasi
              </h3>
              <p className="text-slate-600">
                Pengguna dilarang memanipulasi data riil lapangan (seperti <em>cherry-picking</em>, fabrikasi angka, atau pemalsuan sampel) atas nama kemudahan teknis. Segala bentuk pelanggaran etika riset di dunia nyata menjadi tanggung jawab penuh masing-masing individu peneliti.
              </p>
            </div>
          </div>

          {/* Point 4 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs font-bold mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-0.5">
                4. Hak Cipta &amp; Hak Kekayaan Intelektual
              </h3>
              <p className="text-slate-600">
                Desain sistem, komponen visual, algoritma rekomendasi, serta modul edukasi pada platform ini merupakan hak cipta yang dirancang oleh <strong>MARIO FAHMI SYARIAL</strong> untuk pemanfaatan studi akademik yang bermartabat.
              </p>
            </div>
          </div>

          {/* Kartu Konfirmasi Akhir Bacaan */}
          <div className={`p-4 rounded-2xl border transition-all text-center space-y-1 ${
            hasScrolledToBottom
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-slate-100 border-slate-200 text-slate-500'
          }`}>
            <div className="flex items-center justify-center gap-1.5 font-bold text-xs">
              <CheckCircle2 className={`w-4 h-4 ${hasScrolledToBottom ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>
                {hasScrolledToBottom
                  ? '✓ Anda Telah Selesai Membaca Seluruh Ketentuan Disclaimer'
                  : 'Batas Akhir Ketentuan Disclaimer'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {hasScrolledToBottom
                ? 'Kotak centang persetujuan di bawah kini telah aktif. Silakan centang untuk melanjutkan.'
                : 'Gulir sedikit lagi ke bawah untuk membuka akses tombol centang persetujuan.'}
            </p>
          </div>
        </div>

        {/* Footer Confirmation Gate */}
        <div className="p-3.5 sm:p-6 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2.5 sm:space-y-3">
          {/* Tombol Cepat Gulir ke Bawah jika belum selesai */}
          {!hasScrolledToBottom && (
            <button
              type="button"
              onClick={handleScrollToBottom}
              className="w-full py-2.5 px-3 sm:px-4 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs group active:scale-[0.98]"
            >
              <ChevronDown className="w-4 h-4 text-teal-600 group-hover:translate-y-0.5 transition-transform shrink-0" />
              <span className="truncate">Gulir Cepat ke Bawah untuk Membaca ({scrollProgress}%)</span>
            </button>
          )}

          {/* Checkbox agreement (Terkunci jika belum dibaca semua) */}
          <label 
            onClick={() => {
              if (!hasScrolledToBottom) {
                sounds.playWarning();
              }
            }}
            className={`flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl border-2 transition-all select-none ${
              !hasScrolledToBottom 
                ? 'opacity-60 bg-slate-100 border-slate-200 cursor-not-allowed text-slate-400' 
                : isChecked 
                  ? 'bg-teal-50/90 border-teal-500 text-teal-950 ring-2 ring-teal-200 cursor-pointer shadow-xs' 
                  : 'bg-white border-slate-300 text-slate-700 hover:border-teal-400 cursor-pointer'
            }`}
          >
            <input
              type="checkbox"
              disabled={!hasScrolledToBottom}
              checked={isChecked}
              onChange={(e) => {
                if (hasScrolledToBottom) {
                  setIsChecked(e.target.checked);
                  sounds.playClick();
                }
              }}
              className="mt-0.5 w-4 h-4 rounded-md text-teal-600 border-slate-300 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
            />
            <div className="space-y-0.5 min-w-0">
              <span className="text-[11px] sm:text-xs font-bold leading-relaxed block">
                Saya telah membaca seluruh ketentuan dari awal hingga akhir, memahami etika metodologi, dan berkomitmen menjaga integritas ilmiah.
              </span>
              {!hasScrolledToBottom && (
                <span className="text-[10px] sm:text-[10.5px] text-amber-700 font-semibold block">
                  (Kotak ini terkunci hingga Anda membaca seluruh disclaimer sampai baris terakhir)
                </span>
              )}
            </div>
          </label>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!hasScrolledToBottom || !isChecked}
            className={`w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-center ${
              hasScrolledToBottom && isChecked
                ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700 hover:from-emerald-600 hover:to-teal-700 text-white shadow-teal-600/25 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="truncate sm:whitespace-normal">
              {!hasScrolledToBottom 
                ? 'BACA SEMUA DISCLAIMER DULU' 
                : !isChecked 
                  ? 'CENTANG KOTAK DI ATAS UNTUK LANJUT' 
                  : 'SAYA SETUJU, MASUK KE APLIKASI'}
            </span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

