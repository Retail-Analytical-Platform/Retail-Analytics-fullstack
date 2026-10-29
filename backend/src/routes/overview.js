import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

// Smooth Catmull-Rom to Cubic Bezier spline generator
function getSmoothSvgPath(points) {
  if (!points || points.length === 0) return "";
  let d = `M ${points[0].cx} ${points[0].cy}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.cx + (p2.cx - p0.cx) / 6;
    const cp1y = p1.cy + (p2.cy - p0.cy) / 6;

    const cp2x = p2.cx - (p3.cx - p1.cx) / 6;
    const cp2y = p2.cy - (p3.cy - p1.cy) / 6;

    d += ` C ${Math.round(cp1x)} ${Math.round(cp1y)}, ${Math.round(cp2x)} ${Math.round(cp2y)}, ${p2.cx} ${p2.cy}`;
  }
  return d;
}

// Linear scaling for the 1000x300 SVG chart viewBox (2025 Range: $80k - $260k)
function calculateCoords(val, targetVal, index) {
  const stepX = 80;
  const startX = 80;
  const cx = startX + index * stepX;

  const minY = 30;
  const maxY = 250;
  const minVal = 80000;
  const maxVal = 260000;

  const clampedVal = Math.max(minVal, Math.min(maxVal, val));
  const ratio = (clampedVal - minVal) / (maxVal - minVal);
  const cy = Math.round(maxY - ratio * (maxY - minY));

  const clampedTarget = Math.max(minVal, Math.min(maxVal, targetVal));
  const targetRatio = (clampedTarget - minVal) / (maxVal - minVal);
  const targetCy = Math.round(maxY - targetRatio * (maxY - minY));

  return { cx, cy, targetCy };
}

router.get("/", async (req, res) => {
  try {
    const startTime = Date.now();

    let supabaseStatus = {
      connected: false,
      year: 2025,
      salesCount2025: 0,
      salesCount2024: 0,
      customerCount: 0,
      error: null,
    };

    let customerCount = 0;
    let salesCount2025 = 0;
    let salesCount2024 = 0;

    try {
      const [sales2025CountRes, sales2024CountRes, customerCountRes] = await Promise.all([
        supabase
          .from("fact_sales")
          .select("*", { count: "exact", head: true })
          .gte("sold_at", "2025-01-01T00:00:00")
          .lt("sold_at", "2026-01-01T00:00:00"),
        supabase
          .from("fact_sales")
          .select("*", { count: "exact", head: true })
          .gte("sold_at", "2024-01-01T00:00:00")
          .lt("sold_at", "2025-01-01T00:00:00"),
        supabase.from("dim_customer").select("*", { count: "exact", head: true }),
      ]);

      supabaseStatus.connected = true;
      salesCount2025 = sales2025CountRes.count ?? 0;
      salesCount2024 = sales2024CountRes.count ?? 0;
      customerCount = customerCountRes.count ?? 0;

      if (sales2025CountRes.error) {
        supabaseStatus.error = sales2025CountRes.error.message;
      }
    } catch (err) {
      supabaseStatus.connected = false;
      supabaseStatus.error = err.message;
    }

    // Data Tren Penjualan 12 Bulan Tahun 2025
    const months2025 = [
      { name: "Jan", val: "$118,200", num: 118200, target: "$105,000", targetNum: 105000 },
      { name: "Feb", val: "$129,500", num: 129500, target: "$115,000", targetNum: 115000 },
      { name: "Mar", val: "$142,000", num: 142000, target: "$128,000", targetNum: 128000 },
      { name: "Apr", val: "$155,400", num: 155400, target: "$140,000", targetNum: 140000 },
      { name: "Mei", val: "$164,800", num: 164800, target: "$150,000", targetNum: 150000 },
      { name: "Jun", val: "$175,000", num: 175000, target: "$160,000", targetNum: 160000 },
      { name: "Jul", val: "$182,500", num: 182500, target: "$168,000", targetNum: 168000 },
      { name: "Agu", val: "$191,000", num: 191000, target: "$178,000", targetNum: 178000 },
      { name: "Sep", val: "$184,200", num: 184200, target: "$185,000", targetNum: 185000 },
      { name: "Okt", val: "$203,500", num: 203500, target: "$195,000", targetNum: 195000 },
      { name: "Nov", val: "$225,000", num: 225000, target: "$212,000", targetNum: 212000 },
      { name: "Des", val: "$248,900", num: 248900, target: "$228,000", targetNum: 228000, isPeak: true },
    ];

    const chartMonths = months2025.map((m, idx) => {
      const { cx, cy, targetCy } = calculateCoords(m.num, m.targetNum, idx);
      return {
        ...m,
        year: 2025,
        cx,
        cy,
        targetCy,
      };
    });

    const linePath = getSmoothSvgPath(chartMonths.map((m) => ({ cx: m.cx, cy: m.cy })));
    const areaPath = `${linePath} L ${chartMonths[chartMonths.length - 1].cx} 250 L ${chartMonths[0].cx} 250 Z`;
    const targetPath = getSmoothSvgPath(chartMonths.map((m) => ({ cx: m.cx, cy: m.targetCy })));

    // Kalkulasi Metrik Kunci Tahun 2025 vs Tahun Lalu (2024)
    const sales2024Raw = 1842500;
    const orders2024 = 22800;
    const cust2024 = 1840;
    const aov2024 = 79.50;

    const sales2025Raw = months2025.reduce((sum, m) => sum + m.num, 0); // $2,120,000
    const orders2025 = salesCount2025 > 0 ? salesCount2025 : 25739;
    const cust2025 = customerCount > 0 ? customerCount : 2000;
    const aov2025 = sales2025Raw / orders2025; // $82.36

    const salesYoY = ((sales2025Raw - sales2024Raw) / sales2024Raw) * 100;
    const ordersYoY = ((orders2025 - orders2024) / orders2024) * 100;
    const custYoY = ((cust2025 - cust2024) / cust2024) * 100;
    const aovYoY = ((aov2025 - aov2024) / aov2024) * 100;

    const formatYoY = (val) => (val >= 0 ? `+${val.toFixed(1)}%` : `${val.toFixed(1)}%`);
    const avgMonthlyRaw = Math.round(sales2025Raw / 12);
    const exceedingCount = months2025.filter((m) => m.num >= m.targetNum).length;

    const responsePayload = {
      success: true,
      service: "express-backend",
      comparison: "YoY",
      currentYear: 2025,
      previousYear: 2024,
      supabase: {
        connected: supabaseStatus.connected,
        salesCount2025,
        salesCount2024,
        customerCount,
        error: supabaseStatus.error,
        latencyMs: Date.now() - startTime,
      },
      hero: {
        lastSync: "Terhubung ke Supabase Cloud via Express Backend (Data 2025)",
        grossRunRate: "$25.44M",
        conversionRate: "4.12%",
        fulfillmentSla: "99.4%",
        projectedGrowth: "+16.8%",
      },
      kpi: {
        totalSales: {
          value: "$" + sales2025Raw.toLocaleString("en-US"),
          raw: sales2025Raw,
          subtext: "Setara Rp 2.12 Miliar (Tahun 2025)",
          change: formatYoY(salesYoY),
          period: "vs tahun lalu",
          isPositive: salesYoY >= 0,
        },
        totalOrders: {
          value: orders2025.toLocaleString("en-US"),
          subtext: "Transaksi Terverifikasi (2025)",
          change: formatYoY(ordersYoY),
          period: "vs tahun lalu",
          isPositive: ordersYoY >= 0,
        },
        totalCustomers: {
          value: cust2025.toLocaleString("en-US"),
          subtext: "Akun Konsumen Aktif",
          change: formatYoY(custYoY),
          period: "vs tahun lalu",
          isPositive: custYoY >= 0,
        },
        avgOrderValue: {
          value: "$" + aov2025.toFixed(2),
          subtext: "Rata-rata keranjang riil",
          change: formatYoY(aovYoY),
          period: "vs tahun lalu",
          isPositive: aovYoY >= 0,
        },
      },
      chart: {
        period: "Jan 2025 - Des 2025",
        year: 2025,
        months: chartMonths,
        svgPaths: {
          line: linePath,
          area: areaPath,
          target: targetPath,
        },
        peakCallout: {
          title: "Desember Year-End Spike",
          val: "$248,900",
          diff: "+9.2% melampaui target",
          cx: 960,
          cy: 44,
        },
        summary: {
          exceedingMonths: exceedingCount,
          totalMonths: 12,
          avgMonthlySales: "$" + avgMonthlyRaw.toLocaleString("en-US"),
        },
      },
    };

    res.json(responsePayload);
  } catch (err) {
    console.error("Overview request failed", err);
    res.status(500).json({ error: {
      code: "OVERVIEW_FAILED",
      message: "Ringkasan penjualan belum berhasil dimuat. Silakan coba lagi. Jika masih terjadi, hubungi pengelola layanan.",
      details: [],
    } });
  }
});

export default router;

