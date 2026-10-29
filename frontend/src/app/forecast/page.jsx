"use client";

import { useState } from 'react';

const historicalData = [
  { month: 'Jan 26', actual: '1.02 M', x: 90, y: 260 },
  { month: 'Feb 26', actual: '1.08 M', x: 170, y: 248 },
  { month: 'Mar 26', actual: '1.24 M', x: 250, y: 220 },
  { month: 'Apr 26', actual: '1.32 M', x: 330, y: 206 },
  { month: 'Mei 26', actual: '1.38 M', x: 415, y: 195 },
  { month: 'Jun 26', actual: '1.48 M', x: 495, y: 178 },
  { month: 'Jul 26', actual: '1.41 M', x: 575, y: 190 },
  { month: 'Agu 26', actual: '1.50 M', x: 655, y: 174 },
  { month: 'Sep 26', actual: '1.57 M', x: 735, y: 163, isTransition: true },
];

const predictions = [
  {
    month: 'Okt 26',
    label: 'Oktober 2026',
    subTag: 'Bulan +1',
    isPeak: false,
    predVal: 'Rp 1.540.000.000',
    shortVal: '1.54 M',
    range: 'Rp 1.480.000.000 – Rp 1.610.000.000',
    mom: '+3.9%',
    x: 820,
    y: 154,
  },
  {
    month: 'Nov 26',
    label: 'November 2026',
    subTag: 'Bulan +2',
    isPeak: false,
    predVal: 'Rp 1.685.000.000',
    shortVal: '1.68 M',
    range: 'Rp 1.590.000.000 – Rp 1.790.000.000',
    mom: '+9.4%',
    x: 910,
    y: 129,
  },
  {
    month: 'Des 26*',
    label: 'Desember 2026',
    subTag: 'Peak Season',
    isPeak: true,
    predVal: 'Rp 1.920.000.000',
    shortVal: '1.92 M',
    range: 'Rp 1.810.000.000 – Rp 2.050.000.000',
    mom: '+13.9%',
    x: 1000,
    y: 89,
  },
];

export default function Forecast() {
  const [forecastTarget, setForecastTarget] = useState('revenue');
  const [forecastHorizon, setForecastHorizon] = useState('3m');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Proyeksi penjualan Q4 berhasil diekspor (CSV Format).');
    }, 700);
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 py-8 flex flex-col gap-6 pb-16">

      {/* ── 1. Page Header & Action Buttons ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[#D67811] dark:text-[#F59E0B] text-xs font-semibold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">auto_graph</span>
            Predictive Analytics
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1622] dark:text-white tracking-tight font-['Manrope',sans-serif]">
            Sales &amp; Demand Forecast
          </h1>
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            Proyeksi tren penjualan dengan model prediktif time-series dan estimasi selang kepercayaan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-[#111827] hover:bg-gray-50 dark:hover:bg-[#161F30] text-[#0A1622] dark:text-white text-sm font-medium rounded-lg border border-[#E3E7ED] dark:border-[#1E293B] shadow-sm transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#35618E] dark:text-[#38BDF8]">tune</span>
            <span>Konfigurasi Parameter</span>
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0A1622] hover:bg-[#1F2A37] dark:bg-[#38BDF8] dark:hover:bg-[#0284C7] text-white dark:text-[#0A1622] text-sm font-medium rounded-lg shadow-sm transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isExporting ? 'hourglass_top' : 'download'}
            </span>
            <span>{isExporting ? 'Mengekspor...' : 'Ekspor Proyeksi'}</span>
          </button>
        </div>
      </div>

      {/* Config Drawer / Modal Toggle (if opened) */}
      {showConfig && (
        <div className="bg-white dark:bg-[#111827] rounded-xl p-5 border border-blue-200 dark:border-blue-900 shadow-sm animate-in fade-in transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-border-soft dark:border-[#1E293B]">
            <span className="text-sm font-semibold text-primary dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-tableau-blue text-[18px]">settings</span>
              Parameter Model Forecasting
            </span>
            <button
              onClick={() => setShowConfig(false)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              ✕ Tutup
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Confidence Level</span>
              <span className="font-semibold text-primary dark:text-white bg-slate-100 dark:bg-[#161F30] px-3 py-1.5 rounded block">
                95% (Two-sided CI)
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Seasonality Prior</span>
              <span className="font-semibold text-primary dark:text-white bg-slate-100 dark:bg-[#161F30] px-3 py-1.5 rounded block">
                Additive Multiplicative Hybrid
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Cross-Validation Folds</span>
              <span className="font-semibold text-primary dark:text-white bg-slate-100 dark:bg-[#161F30] px-3 py-1.5 rounded block">
                5-Fold Rolling Window
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Forecast Control Bar ── */}
      <div className="bg-white dark:bg-[#111827] rounded-xl p-5 border border-[#E3E7ED] dark:border-[#1E293B] shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 transition-colors">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          {/* Target Forecast */}
          <div className="flex flex-col gap-1 min-w-[220px]">
            <label className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]" htmlFor="forecastTarget">
              Target Forecast
            </label>
            <div className="relative">
              <select
                id="forecastTarget"
                value={forecastTarget}
                onChange={(e) => setForecastTarget(e.target.value)}
                className="w-full h-10 appearance-none bg-white dark:bg-[#161F30] text-[#0A1622] dark:text-white text-sm font-medium px-3 pr-9 rounded-lg border border-[#E3E7ED] dark:border-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#35618E] cursor-pointer"
              >
                <option value="revenue">Total Revenue (Penjualan)</option>
                <option value="customer">Customer Count (Pengunjung)</option>
                <option value="volume">Volume Produk (Units Sold)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[20px] text-[#94A3B8]">
                expand_more
              </span>
            </div>
          </div>

          {/* Horizon Waktu */}
          <div className="flex flex-col gap-1 min-w-[200px]">
            <label className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]" htmlFor="forecastHorizon">
              Horizon Waktu
            </label>
            <div className="relative">
              <select
                id="forecastHorizon"
                value={forecastHorizon}
                onChange={(e) => setForecastHorizon(e.target.value)}
                className="w-full h-10 appearance-none bg-white dark:bg-[#161F30] text-[#0A1622] dark:text-white text-sm font-medium px-3 pr-9 rounded-lg border border-[#E3E7ED] dark:border-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#35618E] cursor-pointer"
              >
                <option value="1m">1 Bulan ke Depan</option>
                <option value="3m">3 Bulan ke Depan</option>
                <option value="6m">6 Bulan ke Depan</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[20px] text-[#94A3B8]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Meta Status */}
        <div className="flex flex-col sm:flex-row sm:items-center lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#E3E7ED] dark:border-[#1E293B]">
          <div className="text-left lg:text-right">
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8] block">Terakhir diperbarui:</span>
            <span className="text-xs font-semibold text-[#0A1622] dark:text-white">12 September 2026, 09:30 WIB</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D1E4FF] dark:bg-sky-950/60 text-[#001D35] dark:text-[#38BDF8] text-xs font-medium self-start sm:self-auto border border-blue-200 dark:border-sky-800">
            <span className="w-2 h-2 rounded-full bg-[#35618E] dark:bg-[#38BDF8] animate-pulse"></span>
            <span>Model: Prophet + ARIMA ensemble</span>
          </div>
        </div>
      </div>

      {/* ── 2. Accuracy Metrics Cards (MAE, RMSE, MAPE) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: MAE */}
        <div className="bg-white dark:bg-[#111827] rounded-xl p-5 border border-[#E3E7ED] dark:border-[#1E293B] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">MAE (Mean Absolute Error)</span>
              <span className="material-symbols-outlined text-[18px] text-[#94A3B8]" title="Rata-rata kesalahan absolut">
                help
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-[#0A1622] dark:text-white font-['Manrope',sans-serif]">
                Rp 24,5 Jt
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] dark:border-[#1E293B] flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8]">
            <span>Toleransi deviasi nominal</span>
            <span className="font-medium text-[#35618E] dark:text-[#38BDF8]">±1.8% median</span>
          </div>
        </div>

        {/* Card 2: RMSE */}
        <div className="bg-white dark:bg-[#111827] rounded-xl p-5 border border-[#E3E7ED] dark:border-[#1E293B] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">RMSE (Root Mean Squared Error)</span>
              <span className="material-symbols-outlined text-[18px] text-[#94A3B8]" title="Deviasi standar residual">
                help
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-[#0A1622] dark:text-white font-['Manrope',sans-serif]">
                Rp 31,8 Jt
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] dark:border-[#1E293B] flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8]">
            <span>Stabilitas varians error</span>
            <span className="font-medium text-[#0A1622] dark:text-white">Residual normal</span>
          </div>
        </div>

        {/* Card 3: MAPE */}
        <div className="bg-white dark:bg-[#111827] rounded-xl p-5 border border-[#E3E7ED] dark:border-[#1E293B] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">MAPE (Mean Absolute % Error)</span>
              <span className="material-symbols-outlined text-[18px] text-[#94A3B8]" title="Rata-rata persen kesalahan">
                help
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2.5">
              <span className="text-2xl font-bold text-[#0A1622] dark:text-white font-['Manrope',sans-serif]">
                4.2%
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EBF5E9] dark:bg-emerald-950/50 text-[#59A14F] text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Akurat (&lt; 5%)
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] dark:border-[#1E293B] flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8]">
            <span>Taraf keyakinan model</span>
            <span className="font-medium text-[#59A14F]">95.8% fit</span>
          </div>
        </div>
      </div>

      {/* ── 3. Actual vs Predicted Chart ── */}
      <div className="bg-white dark:bg-[#111827] rounded-xl p-6 border border-[#E3E7ED] dark:border-[#1E293B] shadow-sm flex flex-col gap-5 transition-colors">
        {/* Chart Header with Legends */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#F1F5F9] dark:border-[#1E293B]">
          <div>
            <h2 className="text-lg font-bold text-[#0A1622] dark:text-white font-['Manrope',sans-serif]">
              Actual vs Predicted Trend Line
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              Rentang 12 Bulan: 9 Bulan Historis Aktual vs 3 Bulan Proyeksi Q4
            </p>
          </div>

          {/* Legends */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[3px] bg-[#1F2A37] dark:bg-slate-300 rounded-full inline-block"></span>
              <span className="text-[#0A1622] dark:text-white font-medium">Data Aktual (Historis)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 border-t-2 border-dashed border-[#F28E2B] inline-block"></span>
              <span className="text-[#0A1622] dark:text-white font-medium">Prediksi Model</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-3 bg-[#F28E2B]/20 border border-[#F28E2B]/40 rounded-sm inline-block"></span>
              <span className="text-[#0A1622] dark:text-white font-medium">Confidence Interval (Rentang 95%)</span>
            </div>
          </div>
        </div>

        {/* SVG Chart Container */}
        <div className="w-full relative bg-[#F9F9FF] dark:bg-[#0B0F17] rounded-lg p-4 border border-[#E3E7ED] dark:border-[#1E293B] overflow-x-auto">
          <svg aria-label="Grafik Actual vs Predicted Sales Forecast" className="w-full min-w-[760px] h-[340px] select-none" viewBox="0 0 1060 380">
            <defs>
              {/* Gradient for Confidence Interval Band */}
              <linearGradient id="confidenceFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#F28E2B" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#F28E2B" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#F28E2B" stopOpacity="0.06" />
              </linearGradient>

              {/* Subtle Area Gradient under Historical Line */}
              <linearGradient id="actualAreaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1F2A37" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#1F2A37" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines & Values */}
            <g className="text-[#94A3B8] text-[11px]" fill="currentColor">
              <line stroke="#E3E7ED" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="1020" y1="40" y2="40" className="dark:stroke-slate-800" />
              <text textAnchor="end" x="52" y="44">2.2 M</text>
              <line stroke="#E3E7ED" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="1020" y1="110" y2="110" className="dark:stroke-slate-800" />
              <text textAnchor="end" x="52" y="114">1.8 M</text>
              <line stroke="#E3E7ED" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="1020" y1="180" y2="180" className="dark:stroke-slate-800" />
              <text textAnchor="end" x="52" y="184">1.4 M</text>
              <line stroke="#E3E7ED" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="1020" y1="250" y2="250" className="dark:stroke-slate-800" />
              <text textAnchor="end" x="52" y="254">1.0 M</text>
              <line stroke="#E3E7ED" strokeWidth="1" x1="60" x2="1020" y1="320" y2="320" className="dark:stroke-slate-800" />
              <text textAnchor="end" x="52" y="324">0.6 M</text>
            </g>

            {/* Forecast Zone Backdrop Highlight */}
            <rect fill="#FDF3E9" className="dark:fill-amber-950/20" fillOpacity="0.5" height="290" rx="4" width="285" x="735" y="30" />

            {/* Confidence Interval Ribbon (Upper Bound down to Lower Bound) */}
            <path
              d="M 735 163
                 L 820 143
                 L 910 112
                 L 1000 67
                 L 1000 108
                 L 910 147
                 L 820 166
                 Z"
              fill="url(#confidenceFill)"
            />

            {/* Confidence Interval Outline Dashed */}
            <path d="M 735 163 L 820 143 L 910 112 L 1000 67" fill="none" stroke="#F28E2B" strokeDasharray="3 3" strokeOpacity="0.6" strokeWidth="1.2" />
            <path d="M 735 163 L 820 166 L 910 147 L 1000 108" fill="none" stroke="#F28E2B" strokeDasharray="3 3" strokeOpacity="0.6" strokeWidth="1.2" />

            {/* Historical Fill */}
            <path
              d="M 90 260
                 L 170 248
                 L 250 220
                 L 330 206
                 L 415 195
                 L 495 178
                 L 575 190
                 L 655 174
                 L 735 163
                 L 735 320
                 L 90 320
                 Z"
              fill="url(#actualAreaGradient)"
            />

            {/* Historical Actual Line (#1F2A37 Solid) */}
            <polyline
              fill="none"
              points="90,260 170,248 250,220 330,206 415,195 495,178 575,190 655,174 735,163"
              stroke="#1F2A37"
              className="dark:stroke-slate-200"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />

            {/* Forecast Line (#F28E2B Dashed) */}
            <polyline
              fill="none"
              points="735,163 820,154 910,129 1000,89"
              stroke="#F28E2B"
              strokeDasharray="6 5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />

            {/* Historical Actual Points */}
            {historicalData.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                fill={pt.isTransition ? "#1F2A37" : "#FFFFFF"}
                r={pt.isTransition ? "5" : "4.5"}
                stroke="#1F2A37"
                strokeWidth={pt.isTransition ? "2" : "2.5"}
                className="cursor-pointer transition-transform hover:scale-125 dark:stroke-slate-300 dark:fill-[#111827]"
                onMouseEnter={() => setHoveredPoint({ ...pt, isHistorical: true })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}

            {/* Prediction Points & Badges */}
            <g>
              {/* Okt 2026 */}
              <circle
                cx="820"
                cy="154"
                fill="#F28E2B"
                r="5.5"
                stroke="#FFFFFF"
                strokeWidth="2"
                className="cursor-pointer hover:scale-125 transition-transform"
                onMouseEnter={() => setHoveredPoint({ month: 'Okt 26', actual: '1.54 M (Prediksi)', x: 820, y: 154 })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <rect fill="#1F2A37" height="22" rx="4" width="70" x="785" y="124" />
              <text fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" x="820" y="139">1.54 M</text>

              {/* Nov 2026 */}
              <circle
                cx="910"
                cy="129"
                fill="#F28E2B"
                r="5.5"
                stroke="#FFFFFF"
                strokeWidth="2"
                className="cursor-pointer hover:scale-125 transition-transform"
                onMouseEnter={() => setHoveredPoint({ month: 'Nov 26', actual: '1.68 M (Prediksi)', x: 910, y: 129 })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <rect fill="#1F2A37" height="22" rx="4" width="70" x="875" y="99" />
              <text fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" x="910" y="114">1.68 M</text>

              {/* Des 2026 (Peak) */}
              <circle
                cx="1000"
                cy="89"
                fill="#F28E2B"
                r="6"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                className="cursor-pointer hover:scale-125 transition-transform"
                onMouseEnter={() => setHoveredPoint({ month: 'Des 26', actual: '1.92 M (Puncak)', x: 1000, y: 89 })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <rect fill="#D67811" height="22" rx="4" width="70" x="965" y="59" />
              <text fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle" x="1000" y="74">1.92 M</text>
            </g>

            {/* Vertical Separator Line: Mulai Prediksi */}
            <line stroke="#75777C" strokeDasharray="4 4" strokeWidth="1.5" x1="735" x2="735" y1="35" y2="320" />

            {/* Vertical Marker Pill Badge */}
            <g transform="translate(735, 20)">
              <rect fill="#1F2A37" className="dark:fill-slate-800" height="24" rx="12" width="160" x="-80" y="0" />
              <text fill="#FFFFFF" fontSize="10.5" fontWeight="600" textAnchor="middle" x="0" y="16">
                Mulai Prediksi (Bulan ke-10)
              </text>
            </g>

            {/* X-Axis Labels */}
            <g className="text-[#64748B] text-[12px] font-medium" fill="currentColor" textAnchor="middle">
              <text x="90" y="344">Jan 26</text>
              <text x="170" y="344">Feb 26</text>
              <text x="250" y="344">Mar 26</text>
              <text x="330" y="344">Apr 26</text>
              <text x="415" y="344">Mei 26</text>
              <text x="495" y="344">Jun 26</text>
              <text x="575" y="344">Jul 26</text>
              <text x="655" y="344">Agu 26</text>
              <text className="font-semibold text-[#0A1622] dark:text-white" fill="currentColor" x="735" y="344">Sep 26</text>

              {/* Future Months with Orange Highlight */}
              <text className="font-semibold" fill="#D67811" x="820" y="344">Okt 26</text>
              <text className="font-semibold" fill="#D67811" x="910" y="344">Nov 26</text>
              <text className="font-bold" fill="#D67811" x="1000" y="344">Des 26*</text>
            </g>
          </svg>

          {/* Interactive Tooltip on Point Hover */}
          {hoveredPoint && (
            <div
              className="absolute bg-slate-900 text-white rounded-lg px-3 py-1.5 shadow-md text-xs pointer-events-none transform -translate-x-1/2 -translate-y-full z-30 flex flex-col gap-0.5 border border-slate-700"
              style={{ left: `${(hoveredPoint.x / 1060) * 100}%`, top: `${(hoveredPoint.y / 380) * 100 - 8}%` }}
            >
              <span className="font-semibold">{hoveredPoint.month}</span>
              <span className="text-amber-400 font-bold">{hoveredPoint.actual}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35618E] dark:bg-[#38BDF8]"></span>
            Data historis tervalidasi dari ERP RetailPulse (Jan – Sep 2026).
          </span>
          <span>*Tingkat ketidakpastian membesar seiring kedalaman horizon prediksi.</span>
        </div>
      </div>

      {/* ── 4. Prediction Table (3 Months Ahead: Oktober, November, Desember) ── */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#E3E7ED] dark:border-[#1E293B] shadow-sm overflow-hidden flex flex-col transition-colors">
        <div className="p-5 border-b border-[#F1F5F9] dark:border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#0A1622] dark:text-white font-['Manrope',sans-serif]">
              Rincian Proyeksi Penjualan 3 Bulan ke Depan
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              Detail point forecast dan rentang toleransi kepercayaan 95% per bulan.
            </p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded bg-[#F1F5F9] dark:bg-[#161F30] text-[#1F2A37] dark:text-[#94A3B8] self-start sm:self-auto border border-border-soft dark:border-[#1E293B]">
            Mata Uang: IDR (Rupiah)
          </span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#161F30] text-[#0A1622] dark:text-white text-xs font-semibold border-b border-[#E3E7ED] dark:border-[#1E293B]">
                <th className="py-3 px-6" scope="col">Bulan</th>
                <th className="py-3 px-6" scope="col">Prediksi</th>
                <th className="py-3 px-6" scope="col">Rentang (95% Confidence)</th>
                <th className="py-3 px-6 text-right" scope="col">MoM Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E7ED] dark:divide-[#1E293B] text-sm">
              {predictions.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC] dark:hover:bg-[#161F30]/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F28E2B]"></div>
                      <span className="font-semibold text-[#0A1622] dark:text-white">{p.label}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                          p.isPeak
                            ? 'bg-[#FFEDD5] text-[#9A3412] dark:bg-amber-950/60 dark:text-amber-400'
                            : 'bg-[#F1F5F9] text-[#64748B] dark:bg-[#161F30] dark:text-slate-400'
                        }`}
                      >
                        {p.subTag}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-[#0A1622] dark:text-white font-['Manrope',sans-serif]">
                    {p.predVal}
                  </td>
                  <td className="py-4 px-6 text-[#64748B] dark:text-[#94A3B8] text-xs">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <span>{p.range.split('–')[0]}</span>
                      <span className="text-[#CBD5E1] dark:text-slate-600">–</span>
                      <span>{p.range.split('–')[1]}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center justify-end gap-1 px-2.5 py-1 rounded-full bg-[#EBF5E9] dark:bg-emerald-950/50 text-[#59A14F] text-xs font-semibold">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      {p.mom}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#F8FAFC] dark:bg-[#161F30] border-t border-[#E3E7ED] dark:border-[#1E293B] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8] gap-2">
          <span>
            Total Proyeksi 3 Bulan:{' '}
            <strong className="text-[#0A1622] dark:text-white font-semibold">Rp 5.145.000.000</strong>
          </span>
          <span className="flex items-center gap-1 text-[#59A14F] font-medium">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Semua estimasi berada dalam ambang batas aman inventory holding
          </span>
        </div>
      </div>

      {/* ── 5. Forecast Insight Box (Orange Accent Bar on Left) ── */}
      <div className="rounded-xl bg-[#FFF9F4] dark:bg-[#161F30] p-5 border border-[#FDE6D2] dark:border-amber-900/40 border-l-4 border-l-[#F28E2B] shadow-sm transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F28E2B]/15 flex items-center justify-center text-[#F28E2B] shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[24px]">insights</span>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-[#240F00] dark:text-white font-['Manrope',sans-serif]">
                Forecast &amp; Demand Insight
              </h4>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#FFDCC2] text-[#6D3900] dark:bg-amber-950/80 dark:text-amber-300 rounded">
                AI Generated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#1F2A37] dark:text-[#94A3B8] mt-1">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#F28E2B] text-[18px] shrink-0 mt-0.5">
                  trending_up
                </span>
                <span>
                  Model memproyeksikan lonjakan omset signifikan di bulan Desember hingga mencapai{' '}
                  <strong className="text-[#0A1622] dark:text-white font-semibold">Rp 1,92 Miliar</strong> didukung
                  tren musiman akhir tahun.
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#59A14F] text-[18px] shrink-0 mt-0.5">
                  verified_user
                </span>
                <span>
                  Nilai <strong className="text-[#0A1622] dark:text-white font-semibold">MAPE 4.2%</strong>{' '}
                  mengindikasikan tingkat akurasi tinggi untuk perencanaan alokasi persediaan logistik kuartal
                  mendatang.
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center">
              <button
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D67811] dark:text-amber-400 hover:text-[#9A3412] dark:hover:text-amber-300 transition-colors cursor-pointer"
                type="button"
                onClick={() => alert('Membuka rekomendasi stok gudang untuk Q4...')}
              >
                <span>Lihat Rekomendasi Alokasi Stok Gudang</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

