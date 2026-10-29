"use client";

import { useState } from "react";

const dimensions = [
  { id: "store", label: "Toko", icon: "domain" },
  { id: "category", label: "Produk", icon: "category" },
  { id: "customer", label: "Pelanggan", icon: "groups" },
];

const years = [2025, 2024];

const storeDataByYear = {
  2025: [
    { name: "Jakarta Central Flagship", revenue: "Rp 48.2 M", change: "+18.4%", width: "88%", region: "barat", positive: true },
    { name: "Surabaya Supermall", revenue: "Rp 34.6 M", change: "+12.1%", width: "68%", region: "timur", positive: true },
    { name: "Bandung Paris Van Java", revenue: "Rp 29.8 M", change: "+9.8%", width: "58%", region: "barat", positive: true },
    { name: "Medan Podomoro Hub", revenue: "Rp 22.4 M", change: "+4.2%", width: "44%", region: "barat", positive: false },
    { name: "Bali Beachwalk Discovery", revenue: "Rp 18.9 M", change: "+15.7%", width: "37%", region: "timur", positive: true },
  ],
  2024: [
    { name: "Jakarta Central Flagship", revenue: "Rp 40.7 M", change: "+10.2%", width: "78%", region: "barat", positive: true },
    { name: "Surabaya Supermall", revenue: "Rp 30.8 M", change: "+7.4%", width: "60%", region: "timur", positive: true },
    { name: "Bandung Paris Van Java", revenue: "Rp 27.1 M", change: "+5.1%", width: "53%", region: "barat", positive: true },
    { name: "Medan Podomoro Hub", revenue: "Rp 21.5 M", change: "-1.3%", width: "42%", region: "barat", positive: false },
    { name: "Bali Beachwalk Discovery", revenue: "Rp 16.3 M", change: "+8.9%", width: "32%", region: "timur", positive: true },
  ],
};

const heatmapDataByYear = {
  2025: {
    grocery: ["1.2x", "2.4x", "3.8x", "4.2x"],
    fashion: ["0.8x", "1.9x", "2.7x", "3.1x"],
    gadget: ["0.4x", "1.1x", "1.8x", "2.5x"],
    beauty: ["0.9x", "1.6x", "2.9x", "3.5x"],
  },
  2024: {
    grocery: ["1.0x", "2.0x", "3.2x", "3.7x"],
    fashion: ["0.6x", "1.5x", "2.3x", "2.8x"],
    gadget: ["0.3x", "0.9x", "1.4x", "2.0x"],
    beauty: ["0.7x", "1.3x", "2.4x", "3.0x"],
  },
};

const kpiByYear = {
  2025: { turnoverPeak: "4.2x", regionBarat: "58.4%", peakStore: "Surabaya Flagship" },
  2024: { turnoverPeak: "3.7x", regionBarat: "55.1%", peakStore: "Jakarta Flagship" },
};

export default function Analytics() {
  const [selectedDimension, setSelectedDimension] = useState("store");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const currentDimObj = dimensions.find((d) => d.id === selectedDimension) || dimensions[0];
  const storeData = storeDataByYear[selectedYear];
  const heatmap = heatmapDataByYear[selectedYear];
  const kpi = kpiByYear[selectedYear];

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
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white tracking-tight">Analytics Dashboard</h1>
          <p className="text-on-surface-variant dark:text-[#94A3B8] text-sm sm:text-base mt-1 max-w-3xl">Eksplorasi metrik mendalam dan performa penjualan melalui visualisasi interaktif Tableau.</p>
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
          {/* Left: Label & Selector Dropdowns */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-1">
            <label className="font-heading text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-[#94A3B8] whitespace-nowrap" htmlFor="dimension-select">
              Lihat data berdasarkan:
            </label>

            {/* Dimension Dropdown */}
            <div className="relative w-full sm:w-52">
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

            {/* Year Dropdown */}
            <div className="relative w-full sm:w-40">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-on-surface-variant dark:text-[#94A3B8]">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              </div>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full h-10 pl-9 pr-10 text-sm font-medium text-primary dark:text-white bg-white dark:bg-[#161F30] border border-border-soft dark:border-[#1E293B] rounded-lg focus:outline-none focus:ring-2 focus:ring-tableau-blue focus:border-tableau-blue transition-colors cursor-pointer appearance-none shadow-xs"
              >
                {years.map((y) => (
                  <option key={y} value={y} className="dark:bg-[#161F30]">
                    {y}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-on-surface-variant dark:text-[#94A3B8]">
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </div>
            </div>

            {/* Period Context */}
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant dark:text-[#94A3B8] font-medium pl-1">
              <span>
                Periode: <strong>Q1–Q4 ({selectedYear})</strong>
              </span>
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
              <h2 className="font-heading font-semibold text-base sm:text-lg text-primary dark:text-white">Sales &amp; Operational Performance - Tableau Embedded Engine</h2>
              <p className="text-xs text-on-surface-variant dark:text-[#94A3B8]">Multi-source Retail Data Pipeline • Auto-refresh interval 60s</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border-soft dark:border-[#1E293B] bg-white dark:bg-[#161F30] hover:bg-slate-50 dark:hover:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-all active:scale-95 shadow-xs cursor-pointer"
              title="Refresh visualisasi"
            >
              <span className={`material-symbols-outlined text-[20px] transition-transform duration-500 ${isRefreshing ? "rotate-180 animate-spin" : ""}`}>refresh</span>
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
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[11px] font-medium">Fit to Width • 100%</span>
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
                  <h3 className="font-heading font-semibold text-xs sm:text-sm text-primary dark:text-white">Gross Revenue per Cabang Strategis</h3>
                  <p className="text-[11px] text-on-surface-variant dark:text-[#94A3B8]">Realisasi Penjualan Tahunan FY {selectedYear} (Miliar IDR)</p>
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
                        {store.revenue} <span className={`${store.positive ? "text-metric-positive" : "text-slate-500"} text-[11px] font-medium`}>({store.change})</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-[#1E293B] h-5 rounded overflow-hidden flex">
                      <div className={`${store.region === "barat" ? "bg-tableau-blue" : "bg-tableau-orange"} h-full rounded-r transition-all hover:brightness-110`} style={{ width: store.width }} />
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
                  <span className="font-heading font-semibold text-xs text-primary dark:text-white">Turnover Rate per Kategori</span>
                  <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">Actual Q1-Q4 {selectedYear}</span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                  <div className="text-[10px] font-semibold text-slate-400 text-left">Kat.</div>
                  <div className="text-[10px] font-semibold text-slate-400">Q1</div>
                  <div className="text-[10px] font-semibold text-slate-400">Q2</div>
                  <div className="text-[10px] font-semibold text-slate-400">Q3</div>
                  <div className="text-[10px] font-semibold text-slate-400">Q4</div>

                  {/* Grocery */}
                  <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-left truncate">Grocery</div>
                  <div className="bg-tableau-green/30 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">{heatmap.grocery[0]}</div>
                  <div className="bg-tableau-green/50 text-white text-[11px] py-1 rounded font-semibold">{heatmap.grocery[1]}</div>
                  <div className="bg-tableau-green/80 text-white text-[11px] py-1 rounded font-bold">{heatmap.grocery[2]}</div>
                  <div className="bg-tableau-green text-white text-[11px] py-1 rounded font-bold">{heatmap.grocery[3]}</div>

                  {/* Fashion */}
                  <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-left truncate">Fashion</div>
                  <div className="bg-tableau-blue/20 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">{heatmap.fashion[0]}</div>
                  <div className="bg-tableau-blue/40 text-white text-[11px] py-1 rounded font-medium">{heatmap.fashion[1]}</div>
                  <div className="bg-tableau-blue/70 text-white text-[11px] py-1 rounded font-bold">{heatmap.fashion[2]}</div>
                  <div className="bg-tableau-blue text-white text-[11px] py-1 rounded font-bold">{heatmap.fashion[3]}</div>

                  {/* Gadget */}
                  <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-left truncate">Gadget</div>
                  <div className="bg-tableau-orange/20 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">{heatmap.gadget[0]}</div>
                  <div className="bg-tableau-orange/40 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">{heatmap.gadget[1]}</div>
                  <div className="bg-tableau-orange/70 text-white text-[11px] py-1 rounded font-bold">{heatmap.gadget[2]}</div>
                  <div className="bg-tableau-orange text-white text-[11px] py-1 rounded font-bold">{heatmap.gadget[3]}</div>

                  {/* Beauty */}
                  <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-left truncate">Beauty</div>
                  <div className="bg-tableau-teal/30 text-slate-800 dark:text-white text-[11px] py-1 rounded font-medium">{heatmap.beauty[0]}</div>
                  <div className="bg-tableau-teal/50 text-white text-[11px] py-1 rounded font-semibold">{heatmap.beauty[1]}</div>
                  <div className="bg-tableau-teal/80 text-white text-[11px] py-1 rounded font-bold">{heatmap.beauty[2]}</div>
                  <div className="bg-tableau-teal text-white text-[11px] py-1 rounded font-bold">{heatmap.beauty[3]}</div>
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
                  <span className="font-heading text-lg font-bold text-slate-900 dark:text-white leading-tight">{kpi.turnoverPeak}</span>
                  <span className="text-[10px] text-metric-positive font-medium mt-0.5 block">{kpi.peakStore}</span>
                </div>
                <div className="bg-white dark:bg-[#111827] p-2.5 rounded-lg border border-border-soft dark:border-[#1E293B]">
                  <span className="text-[11px] text-on-surface-variant dark:text-[#94A3B8] block">Porsi Region Barat</span>
                  <span className="font-heading text-lg font-bold text-tableau-blue leading-tight">{kpi.regionBarat}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">Dominasi Nasional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau Status Footer Bar */}
          <div className="h-7 px-4 bg-white dark:bg-[#161F30] border-t border-border-soft dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-metric-positive"></span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Tableau Public JavaScript API Bridge Active</span>
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
                Insight untuk Dimensi {currentDimObj.label} — {selectedYear}
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white dark:bg-[#111827] text-tableau-blue border border-blue-200 dark:border-sky-800">Automated Analytics Synthesis</span>
            </div>

            {/* 3 Analytical Bullet Points */}
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <li className="bg-white/85 dark:bg-[#111827]/85 backdrop-blur-sm p-3.5 rounded-lg border border-blue-100 dark:border-sky-900/50 text-xs sm:text-sm text-on-surface-variant dark:text-[#94A3B8] flex flex-col justify-between space-y-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tableau-blue text-[18px] mt-0.5">pie_chart</span>
                  <div>
                    <strong className="text-primary dark:text-white font-semibold block mb-0.5">Dominasi Region Barat</strong>
                    Cabang Barat (Jakarta &amp; Bandung) menguasai <span className="font-semibold text-primary dark:text-white">{kpi.regionBarat} total revenue</span> dengan akselerasi retail fisik bertumbuh{" "}
                    <span className="text-metric-positive font-semibold">{selectedYear === 2025 ? "+14% YoY" : "+10% YoY"}</span>.
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
                    Gerai satelit tier-2 mencatatkan lonjakan transaksi kategori <span className="font-semibold text-primary dark:text-white">grocery &amp; kebutuhan pokok</span>, mengindikasikan adopsi kanal lokal yang sangat cepat.
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
                    Gerai {kpi.peakStore} mencatat turnover stok hingga <span className="font-semibold text-primary dark:text-white">{kpi.turnoverPeak}</span>, memerlukan pemesanan ulang preventif guna mencegah stockout kuartal depan.
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
    </div>
  );
}
