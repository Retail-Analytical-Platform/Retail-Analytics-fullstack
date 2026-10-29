# Retail Analytics Platform (Next.js)

Platform dashboard analitik ritel yang telah dimigrasikan ke **Next.js (App Router)** dengan **Tailwind CSS**.

## Menjalankan Aplikasi

1. **Development Server:**

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser.

2. **Production Build:**

   ```bash
   npm run build
   ```

3. **Production Server:**
   ```bash
   npm run start
   ```

## Struktur Halaman (App Router)

- `/` - **Overview** (Executive Intelligence Hub & Ringkasan Metrik)
- `/analytics` - **Analytics Dashboard** (Visualisasi Tableau & Performa Toko)
- `/forecast` - **Sales & Demand Forecast** (Prediksi Tren & Confidence Interval)
- `/whatif` - **What-if Promo Impact Simulator** (Simulasi Elastisitas Harga)
- `/about` - **About Us** (Kolektif Kreator & Arsitektur)
