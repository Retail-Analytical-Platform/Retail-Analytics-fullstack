"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuASDF5M5nn2gEwtVPX9v4czLAO1oN6bmy2PB_McVLjavoWA6V5Kg_8QujqWLyEOfpLyeIrV6H8Pe_nbP8knYJE1d-FGCfimjPkwjrOxCNDxHQK9xAnUcrswOtdXLRJaY8uFf-nT8jnzVuNj8DfLLOcoiEn4qzDvKqIid2uUYNyxOg9AQXi9u83d8Ia4cMZXR7TC-aKsmNciv5CTDyqF3zqb-3JSKgiNd9EWY6cPEksyarY4p-ZjpLrXl2XVE3I2x6uU0Q";

const months = [
  { name: "Jan", val: "$98,200", target: "$88,000", cx: 80, cy: 210 },
  { name: "Feb", val: "$112,000", target: "$95,000", cx: 160, cy: 195 },
  { name: "Mar", val: "$125,400", target: "$104,000", cx: 240, cy: 180 },
  { name: "Apr", val: "$138,000", target: "$118,000", cx: 320, cy: 165 },
  { name: "Mei", val: "$147,500", target: "$126,000", cx: 400, cy: 150 },
  { name: "Jun", val: "$156,000", target: "$135,000", cx: 480, cy: 140 },
  { name: "Jul", val: "$162,800", target: "$144,000", cx: 560, cy: 130 },
  { name: "Agu", val: "$171,200", target: "$152,000", cx: 640, cy: 120 },
  { name: "Sep", val: "$158,900", target: "$161,000", cx: 720, cy: 135 },
  { name: "Okt", val: "$179,400", target: "$170,000", cx: 800, cy: 110 },
  { name: "Nov", val: "$212,450", target: "$182,000", cx: 880, cy: 42, isPeak: true },
  { name: "Des", val: "$204,300", target: "$195,000", cx: 960, cy: 50 },
];

export default function Overview() {
  const [data, setData] = useState(null);
  const [hoveredMonth, setHoveredMonth] = useState(null);

  useEffect(() => {
    fetch("/api/overview")
      .then((res) => res.json())
      .then((json) => {
        if (json?.success) {
          setData(json);
        }
      })
      .catch((err) => console.error("Error fetching overview data:", err));
  }, []);

  const kpi = data?.kpi;
  const hero = data?.hero;
  const chartMonths = data?.chart?.months || months;
  const chartSummary = data?.chart?.summary;
  const peakCallout = data?.chart?.peakCallout;
  const svgPaths = data?.chart?.svgPaths;

  const scrollToInsights = () => {
    document.getElementById("insights-summary")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 flex flex-col gap-10">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-white dark:bg-[#111827] rounded-3xl shadow-sm p-6 md:p-10 border border-[#E3E7ED] dark:border-[#1E293B] transition-colors">
        {/* Ambient Radial Accents */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-secondary/10 dark:bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-64 h-64 bg-secondary-fixed/30 dark:bg-sky-900/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 bg-surface-container dark:bg-[#161F30] rounded-full text-secondary dark:text-[#38BDF8] text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">monitoring</span>
              <span>Retail Executive Intelligence Hub</span>
            </div>

            <h1 className="font-headline-xl text-[28px] md:text-[34px] leading-tight font-bold text-primary dark:text-white tracking-tight font-['Manrope',sans-serif]">Dari Data Penjualan Jadi Keputusan yang Bisa Dijalankan</h1>

            <p className="text-[15px] leading-relaxed text-on-surface-variant dark:text-[#94A3B8] max-w-xl">
              Pantau performa ritel, tren penjualan bulanan, pesanan, dan metrik operasional utama secara real-time untuk mengambil keputusan bisnis berbasis data yang presisi.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link href="/analytics" className="inline-flex items-center justify-center gap-2 px-5 h-10 bg-secondary hover:bg-secondary/90 text-white rounded-lg text-sm font-medium transition-all shadow-sm active:scale-[0.99]">
                <span>Lihat Analisis Mendalam</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>

              <button
                type="button"
                onClick={scrollToInsights}
                className="inline-flex items-center justify-center gap-2 px-5 h-10 bg-surface-container-low hover:bg-surface-container dark:bg-[#161F30] dark:hover:bg-[#1E293B] text-on-surface dark:text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">insights</span>
                <span>Pelajari Metrik</span>
              </button>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs text-on-surface-variant dark:text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-metric-positive"></span>
                {hero?.lastSync || "Sinkronisasi Data: 12 Detik lalu"}
              </span>
            </div>
          </div>

          {/* Right Visual Vector Panel */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-canvas-background dark:bg-[#161F30] rounded-xl p-4 shadow-sm border border-border-soft dark:border-[#1E293B]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-soft/60 dark:border-[#1E293B]">
                <div className="flex items-center gap-2">
                  <img alt="System Visual Status" className="w-6 h-6 rounded-full object-cover" src={HERO_IMG} />
                  <span className="text-xs font-semibold text-primary dark:text-white">Live Performance Matrix</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-metric-positive/10 text-metric-positive font-semibold">Optimal</span>
              </div>

              {/* Mini Sparklines & Velocity Card */}
              <div className="space-y-3">
                <div className="bg-white dark:bg-[#111827] p-3 rounded-lg flex items-center justify-between shadow-xs border border-border-soft/40 dark:border-[#1E293B]">
                  <div>
                    <div className="text-[11px] text-on-surface-variant dark:text-[#94A3B8]">Gross Run-Rate (Annual)</div>
                    <div className="text-lg font-bold text-primary dark:text-white font-['Manrope',sans-serif]">$22.10M</div>
                  </div>
                  <div className="w-24 h-9">
                    <svg className="w-full h-full stroke-secondary dark:stroke-[#38BDF8] fill-none" preserveAspectRatio="none" viewBox="0 0 100 36">
                      <path d="M0 28 Q 20 26, 40 18 T 80 12 T 100 4" strokeLinecap="round" strokeWidth="2.5" />
                      <path className="text-secondary/10 dark:text-[#38BDF8]/10" d="M0 28 Q 20 26, 40 18 T 80 12 T 100 4 L 100 36 L 0 36 Z" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white dark:bg-[#111827] p-3 rounded-lg border border-border-soft/40 dark:border-[#1E293B]">
                    <span className="text-[11px] text-on-surface-variant dark:text-[#94A3B8]">Conversion Rate</span>
                    <div className="text-base font-bold text-primary dark:text-white font-['Manrope',sans-serif]">3.84%</div>
                    <span className="text-[11px] text-metric-positive flex items-center gap-0.5 mt-0.5 font-medium">
                      <span className="material-symbols-outlined text-[13px]">trending_up</span> +0.4% MoM
                    </span>
                  </div>

                  <div className="bg-white dark:bg-[#111827] p-3 rounded-lg border border-border-soft/40 dark:border-[#1E293B]">
                    <span className="text-[11px] text-on-surface-variant dark:text-[#94A3B8]">Fulfillment SLA</span>
                    <div className="text-base font-bold text-primary dark:text-white font-['Manrope',sans-serif]">99.2%</div>
                    <span className="text-[11px] text-metric-positive flex items-center gap-0.5 mt-0.5 font-medium">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span> On-Track
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-high/60 dark:bg-[#1E293B]/60 rounded-lg p-2.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary dark:text-[#38BDF8] text-[20px]">auto_graph</span>
                  <p className="text-[11px] text-on-surface-variant dark:text-[#94A3B8] leading-tight">
                    Model prediktif memproyeksikan ekspansi revenue <span className="font-semibold text-primary dark:text-white">+14.2%</span> di kuartal mendatang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. KPI CARDS ROW (4 Cards) ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-primary dark:text-white font-['Manrope',sans-serif]">Ringkasan Metrik Kunci</h2>
          <span className="text-xs text-on-surface-variant dark:text-[#94A3B8]">Basis komparasi: Bulan sebelumnya (MoM)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Sales */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 shadow-sm border border-[#E3E7ED] dark:border-[#1E293B] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant dark:text-[#94A3B8]">Total Sales</span>
              <div className="w-8 h-8 rounded-full bg-secondary/10 dark:bg-sky-500/10 flex items-center justify-center text-secondary dark:text-[#38BDF8] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
            </div>
            <div className="my-3">
              <div className="text-[26px] font-bold text-primary dark:text-white font-['Manrope',sans-serif] tracking-tight">{kpi?.totalSales?.value || "$1,842,500"}</div>
              <div className="text-[11px] text-on-surface-variant dark:text-[#94A3B8]">{kpi?.totalSales?.subtext || "Setara Rp 1.84 Miliar"}</div>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#EBF5E9] dark:bg-emerald-950/50 text-metric-positive text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {kpi?.totalSales?.change || "+12.4%"}
              </span>
              <span className="text-[11px] text-on-surface-variant dark:text-[#94A3B8] ml-2">vs bulan lalu</span>
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 shadow-sm border border-[#E3E7ED] dark:border-[#1E293B] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant dark:text-[#94A3B8]">Total Orders</span>
              <div className="w-8 h-8 rounded-full bg-[#F28E2B]/10 flex items-center justify-center text-[#F28E2B] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              </div>
            </div>
            <div className="my-3">
              <div className="text-[26px] font-bold text-primary dark:text-white font-['Manrope',sans-serif] tracking-tight">{kpi?.totalOrders?.value || "24,890"}</div>
              <div className="text-[11px] text-on-surface-variant dark:text-[#94A3B8]">{kpi?.totalOrders?.subtext || "Transaksi Terverifikasi"}</div>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#EBF5E9] dark:bg-emerald-950/50 text-metric-positive text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {kpi?.totalOrders?.change || "+8.1%"}
              </span>
              <span className="text-[11px] text-on-surface-variant dark:text-[#94A3B8] ml-2">vs bulan lalu</span>
            </div>
          </div>

          {/* Card 3: Total Customers */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 shadow-sm border border-[#E3E7ED] dark:border-[#1E293B] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant dark:text-[#94A3B8]">Total Customers</span>
              <div className="w-8 h-8 rounded-full bg-metric-positive/10 flex items-center justify-center text-metric-positive group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[18px]">group</span>
              </div>
            </div>
            <div className="my-3">
              <div className="text-[26px] font-bold text-primary dark:text-white font-['Manrope',sans-serif] tracking-tight">{kpi?.totalCustomers?.value || "14,320"}</div>
              <div className="text-[11px] text-on-surface-variant dark:text-[#94A3B8]">{kpi?.totalCustomers?.subtext || "Akun Konsumen Aktif"}</div>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#EBF5E9] dark:bg-emerald-950/50 text-metric-positive text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {kpi?.totalCustomers?.change || "+5.6%"}
              </span>
              <span className="text-[11px] text-on-surface-variant dark:text-[#94A3B8] ml-2">vs bulan lalu</span>
            </div>
          </div>

          {/* Card 4: Average Order Value */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 shadow-sm border border-[#E3E7ED] dark:border-[#1E293B] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant dark:text-[#94A3B8]">Average Order Value</span>
              <div className="w-8 h-8 rounded-full bg-surface-container dark:bg-[#1E293B] flex items-center justify-center text-on-surface-variant dark:text-[#94A3B8] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[18px]">sell</span>
              </div>
            </div>
            <div className="my-3">
              <div className="text-[26px] font-bold text-primary dark:text-white font-['Manrope',sans-serif] tracking-tight">{kpi?.avgOrderValue?.value || "$74.00"}</div>
              <div className="text-[11px] text-on-surface-variant dark:text-[#94A3B8]">{kpi?.avgOrderValue?.subtext || "Setara Rp 74.000 / order"}</div>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#FDF0F0] dark:bg-rose-950/50 text-metric-negative text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_down</span>
                {kpi?.avgOrderValue?.change || "-1.8%"}
              </span>
              <span className="text-[11px] text-on-surface-variant dark:text-[#94A3B8] ml-2">vs bulan lalu</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SALES TREND CHART SECTION (12 Months) ── */}
      <section className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-sm border border-[#E3E7ED] dark:border-[#1E293B] flex flex-col gap-6 transition-colors">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-primary dark:text-white font-['Manrope',sans-serif]">Tren Penjualan 12 Bulan Terakhir</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container dark:bg-[#1E293B] text-xs text-on-surface-variant dark:text-[#94A3B8] font-medium">{data?.chart?.period || "Jan 2025 - Des 2025"}</span>
            </div>
            <p className="text-sm text-on-surface-variant dark:text-[#94A3B8] mt-0.5">Performa pendapatan bulanan riil dibandingkan indikator target strategis retail.</p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 self-start sm:self-auto text-xs text-on-surface-variant dark:text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary dark:bg-[#38BDF8]" />
              <span>Aktual Penjualan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-outline-variant dark:bg-slate-600 rounded-full" />
              <span>Target Ritel</span>
            </div>
          </div>
        </div>

        {/* Inline Rich SVG Line Chart */}
        <div className="relative w-full overflow-x-auto">
          <div className="min-w-[700px] h-[340px] relative select-none">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="salesAreaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#35618e" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#35618e" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Grid Lines (Y-Axis) */}
              <line stroke="#E3E7ED" strokeDasharray="3 3" strokeWidth="1" x1="60" x2="980" y1="30" y2="30" className="dark:stroke-slate-800" />
              <line stroke="#E3E7ED" strokeDasharray="3 3" strokeWidth="1" x1="60" x2="980" y1="85" y2="85" className="dark:stroke-slate-800" />
              <line stroke="#E3E7ED" strokeDasharray="3 3" strokeWidth="1" x1="60" x2="980" y1="140" y2="140" className="dark:stroke-slate-800" />
              <line stroke="#E3E7ED" strokeDasharray="3 3" strokeWidth="1" x1="60" x2="980" y1="195" y2="195" className="dark:stroke-slate-800" />
              <line stroke="#E3E7ED" strokeWidth="1" x1="60" x2="980" y1="250" y2="250" className="dark:stroke-slate-800" />

              {/* Y-Axis Labels */}
              <text fill="#75777c" fontFamily="Hanken Grotesk" fontSize="11" textAnchor="end" x="50" y="34">
                $260k
              </text>
              <text fill="#75777c" fontFamily="Hanken Grotesk" fontSize="11" textAnchor="end" x="50" y="89">
                $215k
              </text>
              <text fill="#75777c" fontFamily="Hanken Grotesk" fontSize="11" textAnchor="end" x="50" y="144">
                $170k
              </text>
              <text fill="#75777c" fontFamily="Hanken Grotesk" fontSize="11" textAnchor="end" x="50" y="199">
                $125k
              </text>
              <text fill="#75777c" fontFamily="Hanken Grotesk" fontSize="11" textAnchor="end" x="50" y="254">
                $80k
              </text>

              {/* Target Baseline Curve (Muted Dashed Line) */}
              <path
                d={svgPaths?.target || "M 80 200 C 180 190, 250 185, 340 170 C 430 155, 520 150, 610 135 C 700 120, 800 100, 960 70"}
                fill="none"
                stroke="#c5c6cc"
                strokeDasharray="5 5"
                strokeLinecap="round"
                strokeWidth="2"
                className="dark:stroke-slate-600"
              />

              {/* Actual Sales Area Fill */}
              <path d={svgPaths?.area || ""} fill="url(#salesAreaGradient)" />

              {/* Actual Sales Smooth Curve */}
              <path d={svgPaths?.line || ""} fill="none" stroke="#35618e" strokeLinecap="round" strokeWidth="3.5" className="dark:stroke-[#38BDF8]" />

              {/* Data Circles for each Month */}
              {chartMonths.map((m, idx) => {
                if (m.isPeak) {
                  return (
                    <g key={idx} onMouseEnter={() => setHoveredMonth(m)} onMouseLeave={() => setHoveredMonth(null)} className="cursor-pointer">
                      <circle cx={m.cx} cy={m.cy} fill="#ffffff" r="7" stroke="#d67811" strokeWidth="3" />
                      <circle cx={m.cx} cy={m.cy} fill="#d67811" r="3" />
                      <line stroke="#d67811" strokeDasharray="2 2" strokeWidth="1.5" x1={m.cx} x2={m.cx} y1={m.cy} y2="25" />
                    </g>
                  );
                }
                return (
                  <circle
                    key={idx}
                    cx={m.cx}
                    cy={m.cy}
                    fill="#ffffff"
                    r={hoveredMonth?.name === m.name ? "6" : "4.5"}
                    stroke="#35618e"
                    strokeWidth={hoveredMonth?.name === m.name ? "3" : "2.5"}
                    className="cursor-pointer transition-all dark:stroke-[#38BDF8]"
                    onMouseEnter={() => setHoveredMonth(m)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  />
                );
              })}

              {/* Month X Labels */}
              {chartMonths.map((m, idx) => (
                <text
                  key={idx}
                  fill={m.isPeak ? "#0a1622" : "#44474c"}
                  fontFamily="Hanken Grotesk"
                  fontSize="12"
                  fontWeight={m.isPeak ? "700" : "400"}
                  textAnchor="middle"
                  x={m.cx}
                  y="275"
                  className={m.isPeak ? "dark:fill-white" : "dark:fill-[#94A3B8]"}
                >
                  {m.name}
                </text>
              ))}
            </svg>

            {/* Floating Interactive Callout Box for Peak Month (Nov Promo Spike) */}
            <div className="absolute right-[15px] top-[14px] bg-primary text-white rounded-lg px-3.5 py-2 shadow-lg pointer-events-none transform -translate-x-1/2 flex flex-col gap-0.5 z-20 border border-slate-700">
              <div className="flex items-center gap-1.5 text-xs text-secondary-fixed font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-metric-positive"></span>
                <span>{peakCallout?.title || "November Promo Spike"}</span>
              </div>
              <div className="text-base leading-tight font-bold font-['Manrope',sans-serif]">{peakCallout?.val || "$212,450"}</div>
              <div className="text-[11px] text-primary-fixed-dim">{peakCallout?.diff || "+28.5% melampaui target"}</div>
            </div>

            {/* Hover Tooltip if hovering another month */}
            {hoveredMonth && !hoveredMonth.isPeak && (
              <div
                className="absolute bg-slate-900 text-white rounded-lg px-3 py-1.5 shadow-md text-xs pointer-events-none transform -translate-x-1/2 -translate-y-full z-30 flex flex-col gap-0.5"
                style={{ left: `${hoveredMonth.cx / 10}%`, top: `${(hoveredMonth.cy / 300) * 100 - 6}%` }}
              >
                <span className="font-semibold">{hoveredMonth.name} {hoveredMonth.year || 2025}</span>
                <span>Aktual: {hoveredMonth.val}</span>
                <span className="text-slate-400">Target: {hoveredMonth.target}</span>
              </div>
            )}
          </div>
        </div>

        {/* Chart Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-on-surface-variant dark:text-[#94A3B8] text-xs border-t border-[#E3E7ED] dark:border-[#1E293B]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-metric-positive">check_circle</span>{(chartSummary?.exceedingMonths || 9)} dari {(chartSummary?.totalMonths || 12)} bulan melampaui target kuartalan
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Rata-rata pendapatan bulanan: {chartSummary?.avgMonthlySales || "$153,541"}</span>
          </div>

          <Link href="/forecast" className="inline-flex items-center gap-1 text-secondary dark:text-[#38BDF8] font-medium hover:underline">
            <span>Buka Model Forecast 2025</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>
      </section>

      {/* ── 4. KEY INSIGHT BOX ── */}
      <section className="bg-surface-container-low dark:bg-[#161F30] rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden border border-[#E3E7ED] dark:border-[#1E293B]" id="insights-summary">
        {/* Accent Bar Left */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary dark:bg-[#38BDF8]" />

        <div className="pl-2 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary/15 dark:bg-sky-500/15 flex items-center justify-center text-secondary dark:text-[#38BDF8]">
                <span className="material-symbols-outlined text-[20px]">lightbulb</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-primary dark:text-white font-['Manrope',sans-serif]">Key Insight Bisnis</h3>
                <p className="text-xs text-on-surface-variant dark:text-[#94A3B8]">Sintesis analitik berbasis tren data kuartal terbaru</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-white dark:bg-[#111827] text-secondary dark:text-[#38BDF8] text-xs font-semibold shadow-xs border border-border-soft dark:border-[#1E293B]">AI &amp; Analyst Verified</span>
          </div>

          {/* 4 Bullet Observation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Point 1 */}
            <div className="bg-white dark:bg-[#111827] p-4 rounded-xl flex items-start gap-3 shadow-xs border border-border-soft/60 dark:border-[#1E293B]">
              <span className="material-symbols-outlined text-secondary dark:text-[#38BDF8] text-[20px] shrink-0 mt-0.5">trending_up</span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary dark:text-white">Lonjakan Signifikan Q4</span>
                <p className="text-xs leading-relaxed text-on-surface-variant dark:text-[#94A3B8] mt-1">
                  Peningkatan penjualan tertinggi terjadi pada Q4 (November-Desember), didorong oleh seasonal promo terarah dan peningkatan repeat order hingga 24%.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="bg-white dark:bg-[#111827] p-4 rounded-xl flex items-start gap-3 shadow-xs border border-border-soft/60 dark:border-[#1E293B]">
              <span className="material-symbols-outlined text-secondary dark:text-[#38BDF8] text-[20px] shrink-0 mt-0.5">corporate_fare</span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary dark:text-white">Pertumbuhan Segmen Korporat</span>
                <p className="text-xs leading-relaxed text-on-surface-variant dark:text-[#94A3B8] mt-1">
                  Segmen pelanggan korporat menunjukkan pertumbuhan nilai keranjang (AOV) tertinggi sebesar +14% dengan volume repeat transaksi stabil.
                </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="bg-white dark:bg-[#111827] p-4 rounded-xl flex items-start gap-3 shadow-xs border border-border-soft/60 dark:border-[#1E293B]">
              <span className="material-symbols-outlined text-secondary dark:text-[#38BDF8] text-[20px] shrink-0 mt-0.5">pie_chart</span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary dark:text-white">Kategori Dominan 68%</span>
                <p className="text-xs leading-relaxed text-on-surface-variant dark:text-[#94A3B8] mt-1">
                  Subkategori produk elektronik dan kebutuhan rumah tangga menyumbang 68% dari total pendapatan tahun berjalan, menjadi kontributor margin paling sehat.
                </p>
              </div>
            </div>

            {/* Point 4 */}
            <div className="bg-white dark:bg-[#111827] p-4 rounded-xl flex items-start gap-3 shadow-xs border border-border-soft/60 dark:border-[#1E293B]">
              <span className="material-symbols-outlined text-[#d67811] text-[20px] shrink-0 mt-0.5">tune</span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary dark:text-white">Rekomendasi Bundling AOV</span>
                <p className="text-xs leading-relaxed text-on-surface-variant dark:text-[#94A3B8] mt-1">
                  Penurunan tipis pada AOV di bulan Oktober (-1.8%) dapat dimitigasi pada siklus berikutnya menggunakan strategi bundling produk komplementer.
                </p>
              </div>
            </div>
          </div>

          {/* Action footer in insight box */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs text-on-surface-variant dark:text-[#94A3B8]">Insight ini diperbarui otomatis setiap kali data transaksi diimpor ke sistem.</span>
            <Link href="/whatif" className="text-xs font-semibold text-secondary dark:text-[#38BDF8] hover:underline flex items-center gap-1">
              <span>Jalankan Simulasi What-If</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

