"use client";

import { useState } from 'react';

const categories = {
  beverages: {
    label: 'Beverages / Minuman Kemasan',
    name: 'Beverages',
    baseRevenue: 450000000,
    baseUnits: 18000,
    basePrice: 25000,
    ratePerDay: 'Rata-rata 600 unit per hari',
  },
  dairy: {
    label: 'Dairy Products',
    name: 'Dairy',
    baseRevenue: 380000000,
    baseUnits: 19000,
    basePrice: 20000,
    ratePerDay: 'Rata-rata 633 unit per hari',
  },
  snacks: {
    label: 'Snacks & Confectionery',
    name: 'Snacks',
    baseRevenue: 300000000,
    baseUnits: 20000,
    basePrice: 15000,
    ratePerDay: 'Rata-rata 667 unit per hari',
  },
  personal: {
    label: 'Personal Care',
    name: 'Personal Care',
    baseRevenue: 520000000,
    baseUnits: 13000,
    basePrice: 40000,
    ratePerDay: 'Rata-rata 433 unit per hari',
  },
  household: {
    label: 'Household Necessities',
    name: 'Household',
    baseRevenue: 480000000,
    baseUnits: 16000,
    basePrice: 30000,
    ratePerDay: 'Rata-rata 533 unit per hari',
  },
};

const segments = {
  loyal: { label: 'Loyal & Repeat Buyers', liftMod: 1.0 },
  budget: { label: 'Budget Shoppers', liftMod: 1.25 },
  occasional: { label: 'Occasional Shoppers', liftMod: 0.9 },
  wholesale: { label: 'Bulk / Wholesale', liftMod: 1.15 },
};

function formatRupiah(num) {
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

export default function WhatIf() {
  const [subcat, setSubcat] = useState('beverages');
  const [segment, setSegment] = useState('loyal');
  const [discount, setDiscount] = useState(15);
  const [isSimulating, setIsSimulating] = useState(false);

  const currentCat = categories[subcat] || categories.beverages;
  const currentSeg = segments[segment] || segments.loyal;

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  const handleReset = () => {
    setSubcat('beverages');
    setSegment('loyal');
    setDiscount(15);
  };

  // Calculations
  const adjustedPrice = currentCat.basePrice * (1 - discount / 100);
  const breakevenLift = (((1 / (1 - discount / 100)) - 1) * 100).toFixed(1);

  // Scenarios
  // 1. Conservative (10% base lift * discount factor)
  const consVolPct = Math.round(10 * (discount / 15) * currentSeg.liftMod);
  const consUnits = Math.round(currentCat.baseUnits * (1 + consVolPct / 100));
  const consRev = Math.round(consUnits * adjustedPrice);
  const consDelta = consRev - currentCat.baseRevenue;
  const consDeltaPct = ((consDelta / currentCat.baseRevenue) * 100).toFixed(1);

  // 2. Moderate (25% base lift * discount factor)
  const modVolPct = Math.round(25 * (discount / 15) * currentSeg.liftMod);
  const modUnits = Math.round(currentCat.baseUnits * (1 + modVolPct / 100));
  const modRev = Math.round(modUnits * adjustedPrice);
  const modDelta = modRev - currentCat.baseRevenue;
  const modDeltaPct = ((modDelta / currentCat.baseRevenue) * 100).toFixed(1);

  // 3. Aggressive (45% base lift * discount factor)
  const aggVolPct = Math.round(45 * (discount / 15) * currentSeg.liftMod);
  const aggUnits = Math.round(currentCat.baseUnits * (1 + aggVolPct / 100));
  const aggRev = Math.round(aggUnits * adjustedPrice);
  const aggDelta = aggRev - currentCat.baseRevenue;
  const aggDeltaPct = ((aggDelta / currentCat.baseRevenue) * 100).toFixed(1);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 py-6 flex flex-col gap-6">

      {/* ── 2. Header & Judul Halaman ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2F7] dark:bg-sky-950/50 text-[#4E79A7] dark:text-[#38BDF8] font-['Manrope',sans-serif] text-xs font-bold tracking-wider uppercase border border-[#4E79A7]/20">
            <span className="material-symbols-outlined text-[15px]">tune</span>
            PROMO IMPACT SIMULATOR
          </span>
        </div>

        <h1 className="font-['Poppins',sans-serif] font-bold text-[28px] sm:text-[32px] leading-tight text-[#1F2A37] dark:text-white tracking-tight">
          What-if Promo Impact Simulator
        </h1>

        <p className="font-['Inter',sans-serif] text-[15px] leading-relaxed text-[#6B7280] dark:text-[#94A3B8] max-w-3xl">
          Simulasi dampak perubahan persentase diskon terhadap estimasi volume penjualan dan pendapatan berdasarkan parameter produk dan segmen pelanggan.
        </p>
      </div>

      {/* ── 3. Simulator Input Bar ── */}
      <div className="bg-white dark:bg-[#111827] rounded-[14px] border border-[#E3E7ED] dark:border-[#1E293B] p-6 shadow-sm flex flex-col gap-5 relative transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          {/* Dropdown Subkategori Produk */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#1F2A37] dark:text-slate-200 flex items-center gap-1.5" htmlFor="subcat-select">
              <span className="material-symbols-outlined text-[17px] text-[#4E79A7] dark:text-[#38BDF8]">category</span>
              Subkategori Produk
            </label>
            <div className="relative">
              <select
                id="subcat-select"
                value={subcat}
                onChange={(e) => setSubcat(e.target.value)}
                className="w-full h-11 px-3.5 pr-9 bg-[#F9FAFB] dark:bg-[#161F30] border border-[#E3E7ED] dark:border-[#1E293B] rounded-[8px] text-sm text-[#1F2A37] dark:text-white font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#4E79A7]/30 focus:border-[#4E79A7] transition-all cursor-pointer"
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key} className="dark:bg-[#161F30]">
                    {cat.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Dropdown Segmen Pelanggan */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#1F2A37] dark:text-slate-200 flex items-center gap-1.5" htmlFor="segment-select">
              <span className="material-symbols-outlined text-[17px] text-[#4E79A7] dark:text-[#38BDF8]">group</span>
              Segmen Pelanggan
            </label>
            <div className="relative">
              <select
                id="segment-select"
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full h-11 px-3.5 pr-9 bg-[#F9FAFB] dark:bg-[#161F30] border border-[#E3E7ED] dark:border-[#1E293B] rounded-[8px] text-sm text-[#1F2A37] dark:text-white font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#4E79A7]/30 focus:border-[#4E79A7] transition-all cursor-pointer"
              >
                {Object.entries(segments).map(([key, seg]) => (
                  <option key={key} value={key} className="dark:bg-[#161F30]">
                    {seg.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Slider Persentase Diskon */}
          <div className="lg:col-span-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#1F2A37] dark:text-slate-200 flex items-center gap-1.5" htmlFor="discount-range">
                <span className="material-symbols-outlined text-[17px] text-[#4E79A7] dark:text-[#38BDF8]">percent</span>
                Persentase Diskon
              </label>
              {/* Bubble Badge */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EBF2F7] dark:bg-sky-950/60 text-[#4E79A7] dark:text-[#38BDF8] font-['Manrope',sans-serif] font-bold text-xs shadow-xs border border-[#4E79A7]/20">
                {discount}%
              </span>
            </div>

            <div className="py-1">
              <input
                id="discount-range"
                type="range"
                min="5"
                max="50"
                step="5"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full h-2 bg-[#E3E7ED] dark:bg-slate-700 rounded-lg appearance-none cursor-pointer focus:outline-none accent-[#4E79A7]"
              />
              <div className="flex justify-between text-[11px] text-[#6B7280] dark:text-[#94A3B8] mt-1 font-medium px-0.5">
                <span>5%</span>
                <span>15%</span>
                <span>25%</span>
                <span>35%</span>
                <span>50%</span>
              </div>
            </div>
            <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
              Rentang diskon promo 5% - 50% (langkah 5%)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-2 flex items-center gap-2">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="flex-1 h-11 bg-[#4E79A7] hover:bg-[#3b628a] text-white font-medium text-sm px-4 rounded-[10px] shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75"
              type="button"
            >
              {isSimulating ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  <span>Simulate</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="h-11 px-3 bg-white dark:bg-[#161F30] hover:bg-slate-50 dark:hover:bg-[#1E293B] border border-[#E3E7ED] dark:border-[#1E293B] text-[#1F2A37] dark:text-white font-medium text-sm rounded-[10px] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
              title="Reset parameter ke default"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px] text-[#6B7280] dark:text-slate-300">
                restart_alt
              </span>
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E3E7ED]/70 dark:border-[#1E293B] flex items-center justify-between text-xs text-[#6B7280] dark:text-[#94A3B8]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#4E79A7] dark:text-[#38BDF8]">info</span>
            Klik Simulate untuk memperbarui proyeksi skenario
          </span>
          <span className="text-[11px]">Model Algoritma: Price Elasticity v2.4</span>
        </div>
      </div>

      {/* ── 4. Current Stats Context Bar (Baseline) ── */}
      <div className="bg-white dark:bg-[#111827] rounded-[14px] border border-[#E3E7ED] dark:border-[#1E293B] p-5 shadow-sm flex flex-col gap-3 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E3E7ED]/60 dark:border-[#1E293B]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#94A3B8]">
            <span className="h-2 w-2 rounded-full bg-[#4E79A7] inline-block animate-pulse"></span>
            <span>STATISTIK HISTORIS SAAT INI (BASELINE)</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-[#1F2A37] dark:text-white font-bold">Subkategori: {currentCat.name}</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-[#1F2A37] dark:text-white font-bold">Segmen: {currentSeg.label}</span>
          </div>
          <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] bg-[#F7F8FA] dark:bg-[#161F30] px-2.5 py-1 rounded-md border border-[#E3E7ED] dark:border-[#1E293B]">
            Periode Acuan: 30 Hari Terakhir
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E3E7ED] dark:divide-[#1E293B] pt-1">
          {/* Baseline Revenue */}
          <div className="flex flex-col py-2 md:py-0 md:px-4 first:pl-0">
            <span className="text-xs font-semibold text-[#6B7280] dark:text-[#94A3B8] uppercase tracking-wide">Current Revenue</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-['Manrope',sans-serif] font-extrabold text-2xl text-[#1F2A37] dark:text-white">
                {formatRupiah(currentCat.baseRevenue)}
              </span>
            </div>
            <span className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">30 Hari Terakhir (Gross Revenue)</span>
          </div>

          {/* Baseline Units Sold */}
          <div className="flex flex-col py-2 md:py-0 md:px-4">
            <span className="text-xs font-semibold text-[#6B7280] dark:text-[#94A3B8] uppercase tracking-wide">Current Units Sold</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-['Manrope',sans-serif] font-extrabold text-2xl text-[#1F2A37] dark:text-white">
                {currentCat.baseUnits.toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-medium text-[#6B7280] dark:text-[#94A3B8]">Unit</span>
            </div>
            <span className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">{currentCat.ratePerDay}</span>
          </div>

          {/* Baseline Avg Price */}
          <div className="flex flex-col py-2 md:py-0 md:px-4 last:pr-0">
            <span className="text-xs font-semibold text-[#6B7280] dark:text-[#94A3B8] uppercase tracking-wide">Current Price (Avg)</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-['Manrope',sans-serif] font-extrabold text-2xl text-[#1F2A37] dark:text-white">
                {formatRupiah(currentCat.basePrice)}
              </span>
              <span className="text-sm font-medium text-[#6B7280] dark:text-[#94A3B8]">/ Unit</span>
            </div>
            <span className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">Harga retail rata-rata normal</span>
          </div>
        </div>
      </div>

      {/* ── 5. Tiered Scenario Cards (3 Kolom Sejajar Sesuai Section 6.4 PRD) ── */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-200 ${isSimulating ? 'opacity-50 pointer-events-none' : ''}`}>
        
        {/* KARTU 1: Conservative */}
        <div className="bg-white dark:bg-[#111827] rounded-[14px] border border-[#E3E7ED] dark:border-[#1E293B] border-t-4 border-t-[#6B7280] p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-['Manrope',sans-serif] font-bold text-xl text-[#1F2A37] dark:text-white">Konservatif</h2>
                <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">Asumsi elastisitas rendah</p>
              </div>
              <span className="p-2 rounded-full bg-[#F3F4F6] dark:bg-[#161F30] text-[#6B7280] dark:text-slate-400">
                <span className="material-symbols-outlined text-[20px] block">shield</span>
              </span>
            </div>

            {/* Detail Metric Table */}
            <div className="flex flex-col gap-2.5 text-sm pt-2">
              <div className="flex items-center justify-between py-1.5 px-2.5 bg-[#F9FAFB] dark:bg-[#161F30] rounded-[6px]">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Assumed Sales Increase</span>
                <span className="font-semibold text-[#1F2A37] dark:text-white">+{consVolPct}% volume</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2.5">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Adjusted Price (Diskon {discount}%)</span>
                <span className="font-semibold text-[#1F2A37] dark:text-white">{formatRupiah(adjustedPrice)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2.5 bg-[#F9FAFB] dark:bg-[#161F30] rounded-[6px]">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Estimated Units Sold</span>
                <span className="font-semibold text-[#1F2A37] dark:text-white">{consUnits.toLocaleString('id-ID')} Unit</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2.5">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Estimated Revenue</span>
                <span className="font-bold text-[#1F2A37] dark:text-white">{formatRupiah(consRev)}</span>
              </div>
            </div>
          </div>

          {/* Highlight Revenue Box */}
          <div className={`mt-6 rounded-[10px] p-3.5 flex flex-col gap-1 border ${
            consDelta >= 0
              ? 'bg-[#F0FDF4] dark:bg-emerald-950/30 border-[#DCFCE7] dark:border-emerald-900/50 text-[#59A14F]'
              : 'bg-[#FEF2F2] dark:bg-rose-950/30 border-[#FEE2E2] dark:border-rose-900/50 text-[#E15759]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase">Projected Revenue Change</span>
              <span className="material-symbols-outlined text-[18px]">
                {consDelta >= 0 ? 'trending_up' : 'trending_down'}
              </span>
            </div>
            <div className="font-['Manrope',sans-serif] font-extrabold text-lg">
              {consDelta >= 0 ? '+' : ''}{formatRupiah(consDelta)} ({consDelta >= 0 ? '+' : ''}{consDeltaPct}%)
            </div>
            <span className="text-xs opacity-85 leading-snug">
              {consDelta < 0
                ? `Kenaikan ${consVolPct}% volume belum mengimbangi potongan harga diskon.`
                : `Kenaikan volume berhasil mengimbangi potongan diskon dengan aman.`}
            </span>
          </div>
        </div>

        {/* KARTU 2: Moderate (Recommended) */}
        <div className="bg-white dark:bg-[#111827] rounded-[14px] border border-[#4E79A7]/40 dark:border-sky-800 border-t-4 border-t-[#4E79A7] p-6 shadow-md relative flex flex-col justify-between transition-all hover:shadow-lg ring-1 ring-[#4E79A7]/15">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-['Manrope',sans-serif] font-bold text-xl text-[#1F2A37] dark:text-white">Moderat</h2>
                  <span className="p-1.5 rounded-full bg-[#EBF2F7] dark:bg-sky-950/60 text-[#4E79A7] dark:text-[#38BDF8]">
                    <span className="material-symbols-outlined text-[18px] block">verified</span>
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">Baseline respons pasar reguler</p>
              </div>

              {/* Badge pill */}
              <span className="bg-blue-100 dark:bg-sky-950/80 text-[#4E79A7] dark:text-[#38BDF8] font-semibold text-xs px-2.5 py-0.5 rounded-full shadow-2xs border border-[#4E79A7]/20">
                ★ Paling Masuk Akal
              </span>
            </div>

            {/* Detail Metric Table */}
            <div className="flex flex-col gap-2.5 text-sm pt-2">
              <div className="flex items-center justify-between py-1.5 px-2.5 bg-[#EBF2F7]/50 dark:bg-[#161F30] rounded-[6px]">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Assumed Sales Increase</span>
                <span className="font-bold text-[#4E79A7] dark:text-[#38BDF8]">+{modVolPct}% volume</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2.5">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Adjusted Price (Diskon {discount}%)</span>
                <span className="font-semibold text-[#1F2A37] dark:text-white">{formatRupiah(adjustedPrice)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2.5 bg-[#EBF2F7]/50 dark:bg-[#161F30] rounded-[6px]">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Estimated Units Sold</span>
                <span className="font-semibold text-[#1F2A37] dark:text-white">{modUnits.toLocaleString('id-ID')} Unit</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2.5">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Estimated Revenue</span>
                <span className="font-bold text-[#1F2A37] dark:text-white">{formatRupiah(modRev)}</span>
              </div>
            </div>
          </div>

          {/* Highlight Revenue Box */}
          <div className={`mt-6 rounded-[10px] p-3.5 flex flex-col gap-1 border ${
            modDelta >= 0
              ? 'bg-[#F0FDF4] dark:bg-emerald-950/30 border-[#DCFCE7] dark:border-emerald-900/50 text-[#59A14F]'
              : 'bg-[#FEF2F2] dark:bg-rose-950/30 border-[#FEE2E2] dark:border-rose-900/50 text-[#E15759]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase">Projected Revenue Change</span>
              <span className="material-symbols-outlined text-[18px]">
                {modDelta >= 0 ? 'trending_up' : 'trending_down'}
              </span>
            </div>
            <div className="font-['Manrope',sans-serif] font-extrabold text-lg">
              {modDelta >= 0 ? '+' : ''}{formatRupiah(modDelta)} ({modDelta >= 0 ? '+' : ''}{modDeltaPct}%)
            </div>
            <span className="text-xs opacity-90 leading-snug">
              Titik ekuilibrium optimal dengan keuntungan marjinal positif.
            </span>
          </div>
        </div>

        {/* KARTU 3: Aggressive */}
        <div className="bg-white dark:bg-[#111827] rounded-[14px] border border-[#E3E7ED] dark:border-[#1E293B] border-t-4 border-t-[#F28E2B] p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-['Manrope',sans-serif] font-bold text-xl text-[#1F2A37] dark:text-white">Agresif</h2>
                <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">Momentum viral / bundling promosi</p>
              </div>
              <span className="p-2 rounded-full bg-[#FFF7ED] dark:bg-amber-950/60 text-[#F28E2B]">
                <span className="material-symbols-outlined text-[20px] block">rocket_launch</span>
              </span>
            </div>

            {/* Detail Metric Table */}
            <div className="flex flex-col gap-2.5 text-sm pt-2">
              <div className="flex items-center justify-between py-1.5 px-2.5 bg-[#FFF7ED]/60 dark:bg-[#161F30] rounded-[6px]">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Assumed Sales Increase</span>
                <span className="font-bold text-[#EA580C] dark:text-[#F28E2B]">+{aggVolPct}% volume</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2.5">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Adjusted Price (Diskon {discount}%)</span>
                <span className="font-semibold text-[#1F2A37] dark:text-white">{formatRupiah(adjustedPrice)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2.5 bg-[#FFF7ED]/60 dark:bg-[#161F30] rounded-[6px]">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Estimated Units Sold</span>
                <span className="font-semibold text-[#1F2A37] dark:text-white">{aggUnits.toLocaleString('id-ID')} Unit</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2.5">
                <span className="text-[#6B7280] dark:text-[#94A3B8]">Estimated Revenue</span>
                <span className="font-bold text-[#1F2A37] dark:text-white">{formatRupiah(aggRev)}</span>
              </div>
            </div>
          </div>

          {/* Highlight Revenue Box */}
          <div className="mt-6 bg-[#F0FDF4] dark:bg-emerald-950/30 border border-[#DCFCE7] dark:border-emerald-900/50 rounded-[10px] p-3.5 flex flex-col gap-1 text-[#59A14F]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase">Projected Revenue Change</span>
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
            </div>
            <div className="font-['Manrope',sans-serif] font-extrabold text-lg">
              {aggDelta >= 0 ? '+' : ''}{formatRupiah(aggDelta)} ({aggDelta >= 0 ? '+' : ''}{aggDeltaPct}%)
            </div>
            <span className="text-xs opacity-90 leading-snug">
              Lonjakan omset tinggi dengan dukungan kesiapan suplai logistik.
            </span>
          </div>
        </div>
      </div>

      {/* Teks Catatan Metodologi */}
      <div className="text-xs text-[#6B7280] dark:text-[#94A3B8] italic px-1 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[16px] not-italic text-[#4E79A7] dark:text-[#38BDF8]">info</span>
        <span>
          *Catatan: Angka di atas merupakan hasil simulasi berbasis rule elastisitas dan asumsi kenaikan volume tetap (what-if model), bukan prediksi time-series absolut.
        </span>
      </div>

      {/* ── 6. Scenario Insight Box ── */}
      <div className="bg-[#F0F4F8] dark:bg-[#161F30] rounded-[14px] border-l-4 border-l-[#4E79A7] dark:border-l-[#38BDF8] border border-[#E3E7ED] dark:border-[#1E293B] p-5 shadow-sm flex flex-col md:flex-row items-start gap-4 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111827] text-[#4E79A7] dark:text-[#38BDF8] border border-[#4E79A7]/20 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
          <span className="material-symbols-outlined text-[24px]">lightbulb</span>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-['Manrope',sans-serif] font-bold text-[16px] text-[#1F2A37] dark:text-white">
            Rekomendasi Eksekutif Simulasi Diskon
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-[#1F2A37]/90 dark:text-[#94A3B8] leading-relaxed list-disc list-inside marker:text-[#4E79A7]">
            <li>
              Diskon {discount}% pada kategori <strong>{currentCat.name}</strong> membutuhkan minimal kenaikan volume{' '}
              <strong className="text-primary dark:text-white">+{breakevenLift}%</strong> agar mencapai titik impas (<em>break-even volume</em>).
            </li>
            <li>
              Skenario <strong>Moderat (+{modVolPct}% unit)</strong> berpotensi menghasilkan tambahan omset bersih{' '}
              <strong className="text-primary dark:text-white">{formatRupiah(Math.abs(modDelta))}</strong> dengan tingkat konversi pelanggan {currentSeg.label.toLowerCase()} yang solid.
            </li>
            <li>
              Disarankan menjalankan strategi <strong>bundling multi-pack</strong> guna mengamankan volume di atas skenario Konservatif.
            </li>
          </ul>
        </div>
      </div>

      {/* ── 7. Dokumentasi State (PRD Section 5.4 Preview) ── */}
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#E3E7ED] dark:border-[#1E293B] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4E79A7] dark:text-[#38BDF8] text-[20px]">layers</span>
            <h4 className="font-['Manrope',sans-serif] font-bold text-sm text-[#1F2A37] dark:text-white uppercase tracking-wide">
              Simulator System States (PRD Section 5.4 Preview)
            </h4>
          </div>
          <span className="text-xs bg-[#EBF2F7] dark:bg-sky-950/60 text-[#4E79A7] dark:text-[#38BDF8] font-semibold px-2.5 py-0.5 rounded border border-[#4E79A7]/20">
            Interactive Reference
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mini Preview: Empty State */}
          <div className="bg-white dark:bg-[#111827] rounded-[12px] border border-[#E3E7ED] dark:border-[#1E293B] p-5 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1F2A37] dark:text-white uppercase tracking-wide">
                State 1: Pre-Simulation (Kondisi Awal Kosong)
              </span>
              <span className="text-[11px] bg-slate-100 dark:bg-[#161F30] text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                Empty State
              </span>
            </div>
            <div className="border border-dashed border-[#E3E7ED] dark:border-slate-700 rounded-[10px] p-6 bg-[#F9FAFB] dark:bg-[#161F30] flex flex-col items-center text-center justify-center min-h-[160px]">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#111827] border border-[#E3E7ED] dark:border-[#1E293B] flex items-center justify-center text-[#6B7280] dark:text-slate-400 mb-2 shadow-2xs">
                <span className="material-symbols-outlined text-[20px]">hourglass_empty</span>
              </div>
              <p className="font-['Manrope',sans-serif] font-bold text-sm text-[#1F2A37] dark:text-white">
                Parameter Belum Dihitung
              </p>
              <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] max-w-xs mt-1">
                Pilih subkategori, segmen pelanggan, dan atur slider diskon lalu tekan "Simulate".
              </p>
            </div>
          </div>

          {/* Mini Preview: Skeleton Loading State */}
          <div className="bg-white dark:bg-[#111827] rounded-[12px] border border-[#E3E7ED] dark:border-[#1E293B] p-5 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1F2A37] dark:text-white uppercase tracking-wide">
                State 2: Loading State (Shimmer Skeleton)
              </span>
              <span className="text-[11px] bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 px-2 py-0.5 rounded font-medium">
                Calculating
              </span>
            </div>
            <div className="border border-[#E3E7ED] dark:border-[#1E293B] rounded-[10px] p-4 bg-[#F9FAFB] dark:bg-[#161F30] flex flex-col justify-between min-h-[160px] gap-3">
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white dark:bg-[#111827] p-2.5 rounded-md border border-[#E3E7ED] dark:border-[#1E293B] space-y-2">
                  <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
                <div className="bg-white dark:bg-[#111827] p-2.5 rounded-md border border-[#E3E7ED] dark:border-[#1E293B] space-y-2">
                  <div className="h-2 w-4/5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-6 w-full bg-[#EBF2F7] dark:bg-sky-950/50 rounded animate-pulse"></div>
                </div>
                <div className="bg-white dark:bg-[#111827] p-2.5 rounded-md border border-[#E3E7ED] dark:border-[#1E293B] space-y-2">
                  <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#6B7280] dark:text-[#94A3B8] pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4E79A7] animate-ping"></span>
                  Memproses skenario elastisitas permintaan...
                </span>
                <span className="font-mono text-[10px]">ETA: ~350ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
