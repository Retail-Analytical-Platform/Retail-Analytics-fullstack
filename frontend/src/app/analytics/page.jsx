"use client";

import { useState } from 'react';

const dimensions = [
  { id: 'store', label: 'Per Toko / Cabang', icon: 'domain' },
  { id: 'category', label: 'Per Kategori Produk', icon: 'category' },
  { id: 'customer', label: 'Per Segmen Pelanggan', icon: 'groups' },
  { id: 'region', label: 'Per Wilayah / Revenue', icon: 'public' },
];

const storeData = [
  { name: 'Jakarta Central Flagship', revenue: 'Rp 48.2 M', change: '+18.4%', width: '88%', region: 'barat', positive: true },
  { name: 'Surabaya Supermall', revenue: 'Rp 34.6 M', change: '+12.1%', width: '68%', region: 'timur', positive: true },
  { name: 'Bandung Paris Van Java', revenue: 'Rp 29.8 M', change: '+9.8%', width: '58%', region: 'barat', positive: true },
  { name: 'Medan Podomoro Hub', revenue: 'Rp 22.4 M', change: '+4.2%', width: '44%', region: 'barat', positive: false },
  { name: 'Bali Beachwalk Discovery', revenue: 'Rp 18.9 M', change: '+15.7%', width: '37%', region: 'timur', positive: true },
];

export default function Analytics() {
  const [selectedDimension, setSelectedDimension] = useState('store');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const currentDimObj = dimensions.find((d) => d.id === selectedDimension) || dimensions[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6 space-y-6">

      {/* ── 1. Page Title & Subtitle ── */}
      <div className="pt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-sky-950/40 border border-blue-200 dark:border-sky-800 text-tableau-blue text-xs font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-tableau-blue"></span>
            Section 6.2 &amp; 11.2 • Interactive Reporting
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-on-surface-variant dark:text-[#94A3B8] text-sm sm:text-base mt-1 max-w-3xl">
            Eksplorasi metrik mendalam dan performa penjualan melalui visualisasi interaktif Tableau.
          </p>
        </div>

        {/* Live Connection Status Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-white dark:bg-[#111827] px-3 py-1.5 rounded-xl border border-border-soft dark:border-[#1E293B] shadow-xs text-xs font-medium text-slate-700 dark:text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-metric-positive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-metric-positive"></span>
          </span>
          <span>Tableau Server Live Sync</span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-slate-500 dark:text-slate-400 font-normal">v2025.4</span>
        </div>
      </div>

      {/* ── 2. Filter Dropdown Bar Card ── */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-border-soft dark:border-[#1E293B] p-4 sm:p-5 shadow-card transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Label & Selector Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-1">
            <label
              className="font-heading text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-[#94A3B8] whitespace-nowrap"
              htmlFor="dimension-select"
            >
              Lihat data berdasarkan:
            </label>

            <div className="relative w-full sm:w-80">
              <select
                id="dimension-select"
                value={selectedDimension}
                onChange={(e) => setSelectedDimension(e.target.value)}
                className="w-full h-10 pl-3 pr-10 text-sm font-medium text-primary dark:text-white bg-white dark:bg-[#161F30] border border-border-soft dark:border-[#1E293B] rounded-lg focus:outline-none focus:ring-2 focus:ring-tableau-blue focus:border-tableau-blue transition-colors cursor-pointer appearance-none shadow-xs"
              >
                {dimensions.map((dim) => (
                  <option key={dim.id} value={dim.id} className="dark:bg-[#161F30]">
                    {dim.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-on-surface-variant dark:text-[#94A3B8]">
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </div>
            </div>

            {/* Secondary Context Period Selector */}
            <div className="flex items-center gap-2 text-xs text-on-surface-variant dark:text-[#94A3B8] font-medium pl-1">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">calendar_today</span>
              <span>Periode: <strong>Q1-Q4 (FY 2025)</strong></span>
            </div>
          </div>

          {/* Right: Active Badge Chip */}
          <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-border-soft dark:border-[#1E293B]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-sky-950/40 border border-blue-200 dark:border-sky-800 text-xs font-medium text-tableau-blue">
              <span className="material-symbols-outlined text-[16px]">{currentDimObj.icon}</span>
              <span>Dimensi Aktif: {currentDimObj.label}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── 3. Main Section: Large Tableau Embed Container ── */}
      <section className="bg-white dark:bg-[#111827] rounded-xl border border-border-soft dark:border-[#1E293B] p-4 sm:p-6 shadow-card transition-colors">
        {/* Card Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-soft dark:border-[#1E293B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EBF2FA] dark:bg-sky-950/60 flex items-center justify-center text-tableau-blue">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <div>
              <h2 className="font-heading font-semibold text-base sm:text-lg text-primary dark:text-white">
                Sales &amp; Operational Performance - Tableau Embedded Engine
              </h2>
              <p className="text-xs text-on-surface-variant dark:text-[#94A3B8]">
                Multi-source Retail Data Pipeline • Auto-refresh interval 60s
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border-soft dark:border-[#1E293B] bg-white dark:bg-[#161F30] hover:bg-slate-50 dark:hover:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-all active:scale-95 shadow-xs cursor-pointer"
              title="Refresh visualisasi"
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-500 ${
                  isRefreshing ? 'rotate-180 animate-spin' : ''
                }`}
              >
                refresh
              </span>
            </button>

            {/* Open in Tableau Public Button */}
            <a
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-border-soft dark:border-[#1E293B] bg-white dark:bg-[#161F30] hover:bg-slate-50 dark:hover:bg-[#1E293B] text-xs font-medium text-slate-800 dark:text-slate-200 transition-all active:scale-95 shadow-xs"
              href="https://public.tableau.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Buka di Tableau Public</span>
              <span className="material-symbols-outlined text-[16px] text-tableau-blue">open_in_new</span>
            </a>
          </div>
        </div>

        {/* 16:9 Aspect Ratio Tableau Visual Dashboard Simulator */}
        <div className="relative w-full aspect-[16/9] min-h-[460px] mt-4 bg-slate-50 dark:bg-[#0B0F17] rounded-xl overflow-hidden border border-border-soft dark:border-[#1E293B] flex flex-col justify-between">
          {/* Tableau Workbook Ribbon Bar */}
          <div className="h-9 px-4 bg-white dark:bg-[#161F30] border-b border-border-soft dark:border-[#1E293B] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-white">
                <span className="w-2.5 h-2.5 rounded-sm bg-tableau-blue inline-block"></span>
                <span>TABLEAU WORKBOOK</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="hidden sm:inline-flex items-center gap-1 hover:text-primary dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">undo</span> Undo
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 hover:text-primary dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">redo</span> Redo
              </span>
              <span className="hidden md:inline-flex items-center gap-1 hover:text-primary dark:hover:text-white cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">restart_alt</span> Reset View
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[11px] font-medium">
                Fit to Width • 100%
              </span>
              <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors" title="Full Screen">
                <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              </button>
            </div>
          </div>

          {/* Embedded Simulation Canvas Content */}
          <div className="flex-1 p-3 sm:p-5 grid grid-cols-12 gap-3 sm:gap-4 overflow-hidden bg-[#FAFCFF] dark:bg-[#0B0F17]">
            {/* Left Panel: Top Stores Performance Bar Chart (7 Cols) */}
            <div className="col-span-12 lg:col-span-7 bg-white dark:bg-[#111827] rounded-lg border border-border-soft dark:border-[#1E293B] p-3 sm:p-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-heading font-semibold text-xs sm:text-sm text-primary dark:text-white">
                    Gross Revenue per Cabang Strategis
                  </h3>
                  <p className="text-[11px] text-on-surface-variant dark:text-[#94A3B8]">
                    Realisasi Penjualan Tahunan (Miliar IDR)
                  </p>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-3 text-[11px] text-on-surface-variant dark:text-[#94A3B8]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-tableau-blue"></span> Region Barat
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-tableau-orange"></span> Region Timur
                  </span>
                </div>
              </div>

              {/* Bar Items */}
              <div className="space-y-2.5 my-auto">
                {storeData.map((store, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{store.name}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {store.revenue}{' '}
                        <span className={`${store.positive ? 'text-metric-positive' : 'text-slate-500'} text-[11px] font-medium`}>
                          ({store.change})
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-[#1E293B] h-5 rounded overflow-hidden flex">
                      <div
                        className={`${
                          store.region === 'barat' ? 'bg-tableau-blue' : 'bg-tableau-orange'
                        } h-full rounded-r transition-all hover:brightness-110`}
                        style={{ width: store.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bar Axis Scale */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-mono">
                <span>0 M</span>
                <span>15 M</span>
                <span>30 M</span>
                <span>45 M</span>
                <span>60 M</span>
              </div>
            </div>

            {/* Right Panel: Matrix & Regional Distribution (5 Cols) */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-3 justify-between">
              {/* Heatmap / Product Breakdown by Quarter */}
              <div className="bg-white dark:bg-[#111827] rounded-lg border border-border-soft dark:border-[#1E293B] p-3 sm:p-3.5 flex-1 flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading font-semibold text-xs text-primary dark:text-white">
                    Turnover Rate per Kategori
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    Actual Q1-Q4
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                  <div className="text-[10px] font-semibold text-slate-400 text-left">Kat.</div>
                  <div className="text-[10px] font-semibold text-slate-400">Q1</div>
                  <div className="text-[10px] font-semibold text-slate-400">Q2</div>
                  <div className="text-[10px] font-semibold text-slate-400">Q3</div>
                  <div className="text-[10px] font-semibold text-slate-400">Q4</div>

                  {/* Grocery */}
                  <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-left truncate">Grocery</div>
                  <div className="bg-tableau-green/30 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">1.2x</div>
                  <div className="bg-tableau-green/50 text-white text-[11px] py-1 rounded font-semibold">2.4x</div>
                  <div className="bg-tableau-green/80 text-white text-[11px] py-1 rounded font-bold">3.8x</div>
                  <div className="bg-tableau-green text-white text-[11px] py-1 rounded font-bold">4.2x</div>

                  {/* Fashion */}
                  <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-left truncate">Fashion</div>
                  <div className="bg-tableau-blue/20 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">0.8x</div>
                  <div className="bg-tableau-blue/40 text-white text-[11px] py-1 rounded font-medium">1.9x</div>
                  <div className="bg-tableau-blue/70 text-white text-[11px] py-1 rounded font-bold">2.7x</div>
                  <div className="bg-tableau-blue text-white text-[11px] py-1 rounded font-bold">3.1x</div>

                  {/* Gadget */}
                  <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-left truncate">Gadget</div>
                  <div className="bg-tableau-orange/20 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">0.4x</div>
                  <div className="bg-tableau-orange/40 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">1.1x</div>
                  <div className="bg-tableau-orange/70 text-white text-[11px] py-1 rounded font-bold">1.8x</div>
                  <div className="bg-tableau-orange text-white text-[11px] py-1 rounded font-bold">2.5x</div>

                  {/* Beauty */}
                  <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-left truncate">Beauty</div>
                  <div className="bg-tableau-teal/30 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">0.9x</div>
                  <div className="bg-tableau-teal/50 text-white text-[11px] py-1 rounded font-semibold">1.6x</div>
                  <div className="bg-tableau-teal/80 text-white text-[11px] py-1 rounded font-bold">2.9x</div>
                  <div className="bg-tableau-teal text-white text-[11px] py-1 rounded font-bold">3.5x</div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 mt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Densitas Rendah</span>
                  <div className="h-1.5 w-16 rounded bg-gradient-to-r from-slate-200 via-tableau-blue/50 to-tableau-blue"></div>
                  <span>Densitas Tinggi</span>
                </div>
              </div>

              {/* Quick Mini KPI strip */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white dark:bg-[#111827] p-2.5 rounded-lg border border-border-soft dark:border-[#1E293B]">
                  <span className="text-[11px] text-on-surface-variant dark:text-[#94A3B8] block">Turnover Puncak</span>
                  <span className="font-heading text-lg font-bold text-slate-900 dark:text-white leading-tight">4.2x</span>
                  <span className="text-[10px] text-metric-positive font-medium mt-0.5 block">Surabaya Flagship</span>
                </div>
                <div className="bg-white dark:bg-[#111827] p-2.5 rounded-lg border border-border-soft dark:border-[#1E293B]">
                  <span className="text-[11px] text-on-surface-variant dark:text-[#94A3B8] block">Porsi Region Barat</span>
                  <span className="font-heading text-lg font-bold text-tableau-blue leading-tight">58.4%</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">Dominasi Nasional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau Status Footer Bar */}
          <div className="h-7 px-4 bg-white dark:bg-[#161F30] border-t border-border-soft dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-metric-positive"></span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Tableau Public JavaScript API Bridge Active
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="hidden sm:inline">Koneksi Enkripsi SSL</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[10px]">
              <span className="material-symbols-outlined text-[13px]">verified_user</span>
              <span>Data Verified by RetailPulse Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Detailed Insight Section ── */}
      <section className="bg-[#F0F7FF] dark:bg-[#161F30] rounded-xl border-l-4 border-tableau-blue border border-border-soft dark:border-[#1E293B] p-5 sm:p-6 shadow-card transition-colors">
        <div className="flex items-start gap-4">
          {/* Lightbulb Icon */}
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111827] text-tableau-blue flex items-center justify-center flex-shrink-0 shadow-xs border border-blue-100 dark:border-sky-900">
            <span className="material-symbols-outlined text-[24px]">lightbulb</span>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-heading font-bold text-base sm:text-lg text-primary dark:text-white">
                Insight untuk Dimensi {currentDimObj.label}
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white dark:bg-[#111827] text-tableau-blue border border-blue-200 dark:border-sky-800">
                Automated Analytics Synthesis
              </span>
            </div>

            {/* 3 Analytical Bullet Points */}
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <li className="bg-white/85 dark:bg-[#111827]/85 backdrop-blur-sm p-3.5 rounded-lg border border-blue-100 dark:border-sky-900/50 text-xs sm:text-sm text-on-surface-variant dark:text-[#94A3B8] flex flex-col justify-between space-y-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tableau-blue text-[18px] mt-0.5">pie_chart</span>
                  <div>
                    <strong className="text-primary dark:text-white font-semibold block mb-0.5">Dominasi Region Barat</strong>
                    Cabang Barat (Jakarta &amp; Bandung) menguasai{' '}
                    <span className="font-semibold text-primary dark:text-white">58% total revenue</span> dengan akselerasi retail fisik bertumbuh{' '}
                    <span className="text-metric-positive font-semibold">+14% YoY</span>.
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-tableau-blue font-medium flex items-center justify-between">
                  <span>Prioritas: Alokasi Modal</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </li>

              <li className="bg-white/85 dark:bg-[#111827]/85 backdrop-blur-sm p-3.5 rounded-lg border border-blue-100 dark:border-sky-900/50 text-xs sm:text-sm text-on-surface-variant dark:text-[#94A3B8] flex flex-col justify-between space-y-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tableau-orange text-[18px] mt-0.5">storefront</span>
                  <div>
                    <strong className="text-primary dark:text-white font-semibold block mb-0.5">Lonjakan Gerai Satelit</strong>
                    Gerai satelit tier-2 mencatatkan lonjakan transaksi kategori{' '}
                    <span className="font-semibold text-primary dark:text-white">grocery &amp; kebutuhan pokok</span>, mengindikasikan adopsi kanal lokal yang sangat cepat.
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-tableau-orange font-medium flex items-center justify-between">
                  <span>Kategori: Fast Moving</span>
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                </div>
              </li>

              <li className="bg-white/85 dark:bg-[#111827]/85 backdrop-blur-sm p-3.5 rounded-lg border border-blue-100 dark:border-sky-900/50 text-xs sm:text-sm text-on-surface-variant dark:text-[#94A3B8] flex flex-col justify-between space-y-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tableau-red text-[18px] mt-0.5">inventory_2</span>
                  <div>
                    <strong className="text-primary dark:text-white font-semibold block mb-0.5">Stok Turnover Kritis</strong>
                    Gerai Surabaya Supermall mencatat turnover stok hingga{' '}
                    <span className="font-semibold text-primary dark:text-white">4.2x</span>, memerlukan pemesanan ulang preventif guna mencegah stockout kuartal depan.
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-tableau-red font-medium flex items-center justify-between">
                  <span>Status: Perlu Tindakan</span>
                  <span className="material-symbols-outlined text-[14px]">priority_high</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. Secondary Preview / Documentation of the Two Specified States (Section 6.2) ── */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant dark:text-[#94A3B8] text-[20px]">layers</span>
            <h4 className="font-heading font-semibold text-sm sm:text-base text-primary dark:text-white">
              Pratinjau Status Komponen (State Variants Preview)
            </h4>
            <span className="text-xs text-on-surface-variant dark:text-[#94A3B8] hidden sm:inline">
              - Spesifikasi Desain Section 6.2
            </span>
          </div>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">UI Reference</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* State 1: Loading Skeleton */}
          <div className="bg-white dark:bg-[#111827] rounded-xl border border-border-soft dark:border-[#1E293B] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-border-soft dark:border-[#1E293B] mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-tableau-blue"></span>
                <span className="font-heading font-semibold text-xs sm:text-sm text-primary dark:text-white">
                  State 1: Loading Skeleton
                </span>
              </div>
              <span className="text-[10px] font-medium bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                Asynchronous Phase
              </span>
            </div>

            {/* Skeleton Illustration */}
            <div className="bg-slate-50 dark:bg-[#161F30] border border-border-soft dark:border-[#1E293B] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 animate-pulse"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-20 animate-pulse"></div>
              </div>
              <div className="space-y-2 py-1">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6 animate-pulse"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/6 animate-pulse"></div>
              </div>
              <div className="h-16 bg-slate-200/80 dark:bg-slate-700/60 rounded-lg flex items-center justify-center gap-2 animate-pulse">
                <span className="material-symbols-outlined text-slate-400 text-[20px] animate-spin">
                  progress_activity
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                  Memuat Dashboard Tableau...
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Efek Pulse Shimmer Berjalan</span>
              <span className="text-tableau-blue font-medium">Render Timeout: 8000ms</span>
            </div>
          </div>

          {/* State 2: Fallback Gagal Memuat */}
          <div className="bg-white dark:bg-[#111827] rounded-xl border border-border-soft dark:border-[#1E293B] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-border-soft dark:border-[#1E293B] mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-metric-negative"></span>
                <span className="font-heading font-semibold text-xs sm:text-sm text-primary dark:text-white">
                  State 2: Fallback Gagal Memuat
                </span>
              </div>
              <span className="text-[10px] font-semibold bg-red-50 dark:bg-rose-950/40 text-metric-negative px-2 py-0.5 rounded">
                AdBlocker / Network Error
              </span>
            </div>

            {/* Fallback Illustration */}
            <div className="bg-red-50/50 dark:bg-rose-950/20 border border-red-100 dark:border-rose-900/40 rounded-lg p-4 flex flex-col items-center text-center justify-center py-5">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-rose-900/50 text-metric-negative flex items-center justify-center mb-2 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">warning</span>
              </div>
              <h5 className="font-heading font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                Dashboard Tidak Dapat Ditampilkan
              </h5>
              <p className="text-xs text-on-surface-variant dark:text-[#94A3B8] max-w-xs mt-1 mb-3">
                Dashboard tidak bisa dimuat karena kemungkinan ad blocker browser atau pembatasan cross-origin sandbox.
              </p>
              <a
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white dark:bg-[#161F30] border border-border-soft dark:border-[#1E293B] text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs hover:bg-slate-50 dark:hover:bg-[#1E293B] transition-colors"
                href="https://public.tableau.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Buka di Tableau Public</span>
                <span className="material-symbols-outlined text-[14px] text-tableau-blue">open_in_new</span>
              </a>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="text-metric-negative font-medium">ERR_BLOCKED_BY_CLIENT</span>
              <span className="text-slate-400">Fallback Link Siaga</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

