import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import overviewRoutes from "./routes/overview.js";
import websiteRoutes from "./routes/website.js";
import openapi from "./openapi.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(
  cors({
    origin: (process.env.CORS_ORIGINS ?? "http://localhost:3000").split(",").map((origin) => origin.trim()).filter(Boolean),
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "retail-analytics-backend", timestamp: new Date() });
});

// Overview routes
app.use("/api/overview", overviewRoutes);
app.use("/api/v1", websiteRoutes);
app.get("/openapi.json", (req, res) => res.json(openapi));

const knownPaths = new Set(["/health", "/api/overview", "/openapi.json", ...Object.keys(openapi.paths)]);
app.use((req, res) => {
  const methodNotAllowed = knownPaths.has(req.path.replace(/\/$/, "") || "/");
  const code = methodNotAllowed ? "API_METHOD_NOT_ALLOWED" : "API_ENDPOINT_NOT_FOUND";
  const message = methodNotAllowed
    ? "Permintaan ini tidak didukung oleh layanan yang dituju. Muat ulang halaman dan coba lagi."
    : "Layanan yang Anda tuju tidak ditemukan. Periksa tautan atau kembali ke halaman sebelumnya.";
  if (methodNotAllowed) res.set("Allow", "GET, HEAD");
  res.status(methodNotAllowed ? 405 : 404).json({ error: { code, message, details: [] } });
});
const serverErrors = {
  "/health": ["HEALTH_CHECK_FAILED", "Status layanan belum berhasil diperiksa."],
  "/api/overview": ["OVERVIEW_FAILED", "Ringkasan penjualan belum berhasil dimuat."],
  "/api/v1/analytics/kpi": ["OVERVIEW_KPI_FAILED", "Ringkasan penjualan belum berhasil dimuat."],
  "/api/v1/analytics/sales-trend": ["OVERVIEW_SALES_TREND_FAILED", "Tren penjualan bulanan belum berhasil dimuat."],
  "/api/v1/insights": ["INSIGHTS_GENERATION_FAILED", "Ringkasan insight belum berhasil dibuat."],
  "/api/v1/forecast": ["FORECAST_FAILED", "Hasil prediksi belum berhasil dimuat."],
  "/api/v1/whatif/options": ["WHATIF_OPTIONS_FAILED", "Pilihan subkategori produk dan segmen pelanggan belum berhasil dimuat."],
  "/api/v1/whatif/simulate": ["WHATIF_SIMULATION_FAILED", "Simulasi dampak diskon belum berhasil diselesaikan."],
};
app.use((err, req, res, next) => {
  console.error("Unhandled backend exception", err);
  if (res.headersSent) return next(err);
  const status = err.status >= 400 && err.status < 500 ? err.status : 500;
  const [code, message] = serverErrors[req.path.replace(/\/$/, "")] ?? ["INTERNAL_SERVER_ERROR", "Permintaan Anda belum berhasil diproses."];
  const detail = status === 500
    ? { code, message: `${message} Silakan coba lagi. Jika masih terjadi, hubungi pengelola layanan.`, details: [] }
    : { code: "REQUEST_REJECTED", message: "Permintaan Anda belum dapat diproses. Periksa pilihan Anda atau hubungi pengelola layanan.", details: [] };
  return res.status(status).json({ error: detail });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

