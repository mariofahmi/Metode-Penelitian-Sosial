import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/socialResearchData';
import { 
  X, 
  Search, 
  BookMarked, 
  Tag, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  if (!isOpen) return null;

  const categories = ['Semua', 'Kualitatif', 'Kuantitatif', 'Etika & Validitas'];

  const filteredTerms = GLOSSARY_TERMS.filter((item) => {
    const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-2.5 bg-slate-50">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs shadow-sky-500/25 shrink-0">
              <BookMarked className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading truncate sm:whitespace-normal">
                Glosarium Metodologi Penelitian Sosial
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate sm:whitespace-normal">
                Kamus ringkas istilah kunci riset ilmiah &amp; etika data
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors shrink-0 cursor-pointer"
            aria-label="Tutup Glosarium"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari istilah metodologi (contoh: triangulasi, kausalitas, bias konfirmasi)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-400 focus:border-sky-300 text-slate-800"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              Tidak ditemukan istilah yang cocok dengan pencarian Anda.
            </div>
          ) : (
            filteredTerms.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-200 bg-slate-50/50 space-y-1.5 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{item.term}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.definition}
                </p>
                <div className="pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-start gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Contoh:</strong> {item.example}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center text-[11px] text-slate-400">
          Tekan tombol ESC atau klik silang untuk kembali ke modul pembelajaran
        </div>
      </div>
    </div>
  );
};
