import express from "express";

const router = express.Router();

const rules = {
  page: { invalid: ["INSIGHTS_PAGE_INVALID", "Halaman insight tidak dikenali. Pilih Overview atau Analytics; insight Forecast tersedia bersama hasil prediksi."] },
  year: { invalid: ["ANALYTICS_YEAR_NOT_INTEGER", "Tahun harus berupa angka bulat, misalnya 2025. Periksa kembali tahun yang dipilih."], range: ["ANALYTICS_YEAR_OUT_OF_RANGE", "Tahun harus berada antara 1 dan 9999. Pilih tahun yang sesuai dengan data transaksi."] },
  dimension: { invalid: ["ANALYTICS_DIMENSION_INVALID", "Jenis analisis tidak dikenali. Pilih toko, produk, segmen pelanggan, atau pendapatan."] },
  target: { invalid: ["FORECAST_TARGET_INVALID", "Jenis prediksi tidak dikenali. Pilih Revenue, Customer, atau Produk."] },
  horizon: { invalid: ["FORECAST_HORIZON_NOT_INTEGER", "Rentang prediksi harus berupa jumlah bulan bulat, misalnya 1, 3, atau 6."], range: ["FORECAST_HORIZON_TOO_SMALL", "Rentang prediksi minimal 1 bulan. Masukkan jumlah bulan yang lebih besar dari nol."] },
  subcategory: { required: ["WHATIF_SUBCATEGORY_REQUIRED", "Pilih subkategori produk terlebih dahulu, lalu jalankan simulasi."], empty: ["WHATIF_SUBCATEGORY_EMPTY", "Subkategori produk belum dipilih. Pilih subkategori dari daftar, lalu jalankan simulasi."], invalid: ["WHATIF_SUBCATEGORY_INVALID", "Pilihan subkategori tidak valid. Pilih subkategori produk dari daftar."] },
  segment: { required: ["WHATIF_SEGMENT_REQUIRED", "Pilih segmen pelanggan terlebih dahulu, lalu jalankan simulasi."], empty: ["WHATIF_SEGMENT_EMPTY", "Segmen pelanggan belum dipilih. Pilih segmen dari daftar, lalu jalankan simulasi."], invalid: ["WHATIF_SEGMENT_INVALID", "Pilihan segmen tidak valid. Pilih segmen pelanggan dari daftar."] },
  discount_pct: { required: ["WHATIF_DISCOUNT_REQUIRED", "Pilih persentase diskon terlebih dahulu, dari 5% hingga 50%."], invalid: ["WHATIF_DISCOUNT_NOT_INTEGER", "Diskon harus berupa angka bulat dalam persen, misalnya 10 untuk diskon 10%."], range: ["WHATIF_DISCOUNT_OUT_OF_RANGE", "Diskon harus antara 5% dan 50%. Sesuaikan diskon, lalu jalankan simulasi kembali."], step: ["WHATIF_DISCOUNT_INVALID_STEP", "Diskon harus kelipatan 5%, misalnya 5%, 10%, atau 15%. Sesuaikan diskon, lalu coba lagi."] },
};

function detail(field, kind) {
  const [code, message] = rules[field][kind];
  return { field, code, message };
}
function reject(res, details) {
  const { code, message } = details.length === 1 ? details[0] : {
    code: "REQUEST_VALIDATION_FAILED", message: "Ada beberapa isian yang perlu diperbaiki. Periksa rincian di bawah, lalu coba lagi.",
  };
  return res.status(422).json({ error: { code, message, details } });
}
function notReady(res, code, feature) {
  return res.status(501).json({ error: { code, message: `${feature} belum tersedia karena fitur ini masih disiapkan. Silakan gunakan fitur lain terlebih dahulu.`, details: [] } });
}
function integer(value) {
  return typeof value === "string" && /^[+-]?\d+$/.test(value.trim()) && Number.isSafeInteger(Number(value));
}
function validate(query, specs) {
  const errors = [];
  for (const [field, spec] of Object.entries(specs)) {
    const value = query[field];
    if (value === undefined) { if (spec.required) errors.push(detail(field, "required")); continue; }
    if (typeof value !== "string") { errors.push(detail(field, "invalid")); continue; }
    if (spec.integer) {
      if (!integer(value)) errors.push(detail(field, "invalid"));
      else if (Number(value) < spec.min || (spec.max !== undefined && Number(value) > spec.max)) errors.push(detail(field, "range"));
    } else if (spec.values && !spec.values.includes(value)) errors.push(detail(field, "invalid"));
    else if (spec.nonempty && value.length === 0) errors.push(detail(field, "empty"));
  }
  return errors;
}
const year = { integer: true, min: 1, max: 9999 };
function validateOrReject(req, res, specs) {
  const errors = validate(req.query, specs);
  if (errors.length) { reject(res, errors); return false; }
  return true;
}
router.get("/analytics/kpi", (req, res) => {
  if (!validateOrReject(req, res, { year })) return;
  return notReady(res, "OVERVIEW_KPI_NOT_READY", "Ringkasan penjualan");
});
router.get("/analytics/sales-trend", (req, res) => {
  if (!validateOrReject(req, res, { year })) return;
  return notReady(res, "OVERVIEW_SALES_TREND_NOT_READY", "Tren penjualan bulanan");
});
router.get("/insights", (req, res) => {
  if (!validateOrReject(req, res, { page: { values: ["overview", "analytics"] }, dimension: { values: ["store", "product", "segment", "revenue"] }, year })) return;
  const page = req.query.page ?? "overview";
  if (page === "analytics" && req.query.dimension === undefined) return reject(res, [{ field: "dimension", code: "ANALYTICS_DIMENSION_REQUIRED", message: "Pilih jenis analisis: toko, produk, segmen pelanggan, atau pendapatan." }]);
  if (page !== "analytics" && req.query.dimension !== undefined) return reject(res, [{ field: "dimension", code: "INSIGHTS_DIMENSION_NOT_APPLICABLE", message: "Filter jenis analisis hanya dapat digunakan di halaman Analytics. Hapus filter ini atau buka Analytics." }]);
  return notReady(res, `${page.toUpperCase()}_INSIGHTS_NOT_READY`, `Ringkasan insight ${page === "overview" ? "Overview" : "Analytics"}`);
});
router.get("/forecast", (req, res) => {
  if (!validateOrReject(req, res, { target: { values: ["revenue", "customer", "product"] }, horizon: { integer: true, min: 1 } })) return;
  return notReady(res, "FORECAST_NOT_READY", "Hasil prediksi");
});
router.get("/whatif/options", (req, res) => notReady(res, "WHATIF_OPTIONS_NOT_READY", "Pilihan subkategori produk dan segmen pelanggan"));
router.get("/whatif/simulate", (req, res) => {
  if (!validateOrReject(req, res, { subcategory: { required: true, nonempty: true }, segment: { required: true, nonempty: true }, discount_pct: { required: true, integer: true, min: 5, max: 50 } })) return;
  if (!req.query.subcategory.trim()) return reject(res, [detail("subcategory", "empty")]);
  if (!req.query.segment.trim()) return reject(res, [detail("segment", "empty")]);
  if (Number(req.query.discount_pct) % 5 !== 0) return reject(res, [detail("discount_pct", "step")]);
  return notReady(res, "WHATIF_SIMULATION_NOT_READY", "Simulasi dampak diskon");
});

export default router;
