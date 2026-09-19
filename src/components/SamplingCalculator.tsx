import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Users, AlertCircle, CheckCircle2, Sparkles, RefreshCw, Info, PieChart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SamplingCalculatorProps {
  onXpGained?: (amount: number, reason: string) => void;
}

export const SamplingCalculator: React.FC<SamplingCalculatorProps> = ({ onXpGained }) => {
  const [population, setPopulation] = useState<number>(2500);
  const [marginError, setMarginError] = useState<number>(0.05); // 5%
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Slovin formula: n = N / (1 + N * e^2)
  const sampleSize = Math.ceil(population / (1 + population * (marginError * marginError)));
  const samplingRatio = ((sampleSize / population) * 100).toFixed(1);

  // Trigger XP once when student explores the calculator
  const handleSliderChange = (newPop: number, newErr: number) => {
    setPopulation(newPop);
    setMarginError(newErr);
    sounds.playClick();

    if (!hasInteracted) {
      setHasInteracted(true);
      if (onXpGained) {
        onXpGained(35, 'Menghitung Sampel Representatif Rumus Slovin');
      }
    }
  };

  // Draw population canvas with sample highlighting
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Number of visual dots to render (fixed for visual clarity, e.g. 360 dots)
    const totalDots = 360;
    const selectedDotsCount = Math.max(4, Math.round(totalDots * (sampleSize / population)));

    // Deterministic pseudo-random positions for stable dots
    const dots: { x: number; y: number; isSelected: boolean }[] = [];
    const cols = 24;
    const rows = 15;
    const cellW = width / cols;
    const cellH = height / rows;

    let dotIdx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (dotIdx >= totalDots) break;
        // Jitter within cell for organic crowd look
        const seed = (r * 31 + c * 17) % 100 / 100;
        const seed2 = (r * 13 + c * 47) % 100 / 100;
        const x = c * cellW + cellW * 0.2 + seed * cellW * 0.6;
        const y = r * cellH + cellH * 0.2 + seed2 * cellH * 0.6;
        dots.push({
          x,
          y,
          isSelected: dotIdx < selectedDotsCount
        });
        dotIdx++;
      }
    }

    // Render unselected dots first (slate)
    dots.filter(d => !d.isSelected).forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#cbd5e1'; // slate-300
      ctx.fill();
    });

    // Render selected sample dots (sky blue)
    dots.filter(d => d.isSelected).forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7'; // sky-600
      ctx.shadowColor = 'rgba(2, 132, 199, 0.4)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

  }, [population, marginError, sampleSize]);

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Kalkulator Metodologis Ilmiah</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 font-heading mt-1">
            Penentuan Ukuran Sampel Representatif (Rumus Slovin)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Menghitung batas minimal responden kuesioner agar kesimpulan survei dapat digeneralisasi secara sah.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-sky-500" />
          <span>Rumus: n = N / (1 + N·e²)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders & Parameter Control */}
        <div className="lg:col-span-6 space-y-5">
          {/* Population Slider */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-600" />
                Jumlah Populasi Total (N):
              </label>
              <span className="text-sm font-extrabold text-sky-700 font-mono bg-white px-3 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
                {population.toLocaleString('id-ID')} orang
              </span>
            </div>

            <input
              type="range"
              min={100}
              max={50000}
              step={100}
              value={population}
              onChange={(e) => handleSliderChange(Number(e.target.value), marginError)}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2 pt-1 items-center">
              <span className="text-[11px] text-slate-500 font-semibold self-center mr-1">Preset Cepat:</span>
              {[500, 1000, 2500, 10000, 50000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSliderChange(val, marginError)}
                  className={`text-xs font-bold px-3 py-1.5 min-h-[32px] rounded-lg border transition-all active:scale-95 cursor-pointer ${
                    population === val
                      ? 'bg-sky-500 text-white border-sky-500 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {val >= 1000 ? `${val / 1000}k` : val}
                </button>
              ))}
            </div>
          </div>

          {/* Margin of Error Radio / Buttons */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Toleransi Kesalahan / Margin of Error (e):
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { val: 0.01, label: '1% (0.01)', desc: 'Presisi Sangat Tinggi (Riset Medis/Ketat)' },
                { val: 0.05, label: '5% (0.05)', desc: 'Standar Emas Ilmu Sosial' },
                { val: 0.10, label: '10% (0.10)', desc: 'Toleransi Luas (Survei Awal)' }
              ].map(opt => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => handleSliderChange(population, opt.val)}
                  className={`p-3 rounded-xl border text-left transition-all active:scale-[0.98] cursor-pointer ${
                    marginError === opt.val
                      ? 'bg-sky-500 text-white border-sky-500 shadow-xs ring-2 ring-sky-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="block text-xs font-extrabold">{opt.label}</span>
                  <span className={`block text-[10.5px] mt-0.5 leading-tight ${marginError === opt.val ? 'text-sky-100' : 'text-slate-500'}`}>
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Math calculation breakdown */}
          <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-950 font-mono leading-relaxed">
            <div className="font-bold text-sky-900 mb-1 font-sans">Langkah Kalkulasi:</div>
            n = {population} / [1 + {population} · ({marginError})²] <br />
            n = {population} / [1 + {population} · {(marginError * marginError).toFixed(4)}] <br />
            n = <strong>{sampleSize} responden</strong>
          </div>
        </div>

        {/* Right Column: Visual Simulation & Results Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {/* Result Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xs">
              <span className="text-[11px] font-bold text-sky-100 uppercase tracking-wider block">
                Sampel Minimal (n):
              </span>
              <div className="text-3xl sm:text-4xl font-black font-heading mt-1">
                {sampleSize.toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-sky-100 font-medium mt-1 block">
                Orang responden terpilih
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Rasio Sampel vs Populasi:
              </span>
              <div className="text-3xl sm:text-4xl font-black font-heading text-slate-900 mt-1">
                {samplingRatio}%
              </div>
              <span className="text-[11px] text-slate-600 font-medium mt-1 block">
                Dari seluruh populasi
              </span>
            </div>
          </div>

          {/* Canvas Simulation */}
          <div className="p-3.5 bg-slate-900 rounded-2xl text-white space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Visualisasi Sebaran Titik Populasi (Titik Biru = Sampel Terambil)
              </span>
              <span className="text-[11px] text-slate-400">
                Random Sampling Simulation
              </span>
            </div>

            <div className="relative w-full h-36 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={144}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500 inline-block shadow-xs"></span>
                Titik Biru: Sampel Terpilih ({sampleSize})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-600 inline-block"></span>
                Titik Abu-abu: Populasi Tak Terambil
              </span>
            </div>
          </div>

          {/* Educational Insight Alert */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Prinsip Kritis:</strong> Jumlah sampel yang besar tidak menjamin kebenaran jika metode penarikannya tidak dilakukan secara <em>Probability / Random Sampling</em>. Survei 1.000 orang yang hanya berasal dari 1 kelas tetaplah bias!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
