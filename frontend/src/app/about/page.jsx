"use client";

const LinkedInIcon = () => (
  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const principles = [
  {
    symbol: "verified",
    iconBg: "bg-[#EBF3FC] dark:bg-sky-950/60",
    iconColor: "text-[#4E79A7] dark:text-[#38BDF8]",
    title: "Data Rigor",
    desc: "Akurasi pemodelan terverifikasi dan pipeline data terintegrasi yang menjamin validitas metrik di setiap level agregasi retail.",
  },
  {
    symbol: "insights",
    iconBg: "bg-[#FEF3EB] dark:bg-amber-950/60",
    iconColor: "text-[#F28E2B]",
    title: "Actionable Insights",
    desc: "Visualisasi dirancang untuk memandu aksi langsung para pemangku kepentingan komersial tanpa friksi interpretasi.",
  },
  {
    symbol: "group",
    iconBg: "bg-[#ECFDF5] dark:bg-emerald-950/60",
    iconColor: "text-[#10B981]",
    title: "Human-Centered",
    desc: "Pengalaman antarmuka intuitif dan bersih yang mempercepat alur kerja harian pengambil keputusan lintas divisi.",
  },
];

const members = [
  {
    initials: "JS",
    name: "Joseph",
    avatarBg: "bg-[#1F2A37]",
    role: "Data Engineer & Forecast Support",
    desc: "Setup GitHub, Docker, Supabase, PostgreSQL : query pipeline ETL; data cleaning & transformasi skala besar, dan data modelling (skema database). Feature engineering, training & tuning model forecast bersama Bayu.",
    tags: ["Data Engineer", "ETL Pipeline", "Supabase", "PostgreSQL", "Model Tuning"],
    linkedin: "https://linkedin.com",
  },
  {
    initials: "NK",
    name: "Niko",
    avatarBg: "bg-[#10B981]",
    role: "Data Analyst",
    desc: "EDA & business analyst, definisi KPI/metrik, query reporting untuk dashboard, dashboard tableau (calculated fields/LOD), insight & rekomendasi bisnis, validasi data, interpretasi hasil forecast.",
    tags: ["Data Analyst", "EDA", "Tableau LOD", "KPI Metrics", "Business Insights"],
    linkedin: "https://linkedin.com",
  },
  {
    initials: "FL",
    name: "Ferly",
    avatarBg: "bg-[#4E79A7]",
    role: "UI / UX Frontend",
    desc: "Wireframe & desain di Figma, implementasi frontend (React/Next.js), perancangan sistem desain terstruktur dan responsif untuk platform retail intelligence.",
    tags: ["UI/UX Designer", "Figma Wireframe", "React", "Next.js", "Frontend"],
    linkedin: "https://linkedin.com",
  },
  {
    initials: "BR",
    name: "Brian",
    avatarBg: "bg-[#4B5563]",
    role: "Backend",
    desc: "API endpoints (auth, koneksi database, fitur website umum), manajemen session, keamanan data terpusat, dan integrasi modul layanan aplikasi.",
    tags: ["Backend Engineer", "API Endpoints", "Database Connection", "Web Services"],
    linkedin: "https://linkedin.com",
  },
  {
    initials: "BY",
    name: "Bayu",
    avatarBg: "bg-[#3B82F6]",
    role: "Backend - ML / Forecast Support",
    desc: "FastAPI untuk serve model forecast, integrasi forecast ke web, bantu training model bersama Joseph, optimasi latency inferensi prediksi penjualan.",
    tags: ["FastAPI", "ML Serving", "Forecast Integration", "Model Training"],
    linkedin: "https://linkedin.com",
  },
  {
    initials: "RV",
    name: "Reva",
    avatarBg: "bg-[#F28E2B]",
    role: "Frontend + Deployment",
    desc: "Frontend React/Next.js, Integrasi komponen API, Responsive UI, deployment, env config, serta jaminan konsistensi desain lintas perangkat.",
    tags: ["Frontend Engineer", "Deployment", "API Integration", "Responsive UI", "Env Config"],
    linkedin: "https://linkedin.com",
  },
];

export default function About() {
  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 py-12 pb-16">
      {/* ── Section 1: Page Header / Hero ── */}
      <section className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8EFF7] dark:bg-sky-950/60 border border-[#E3E7ED] dark:border-sky-800 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-[#4E79A7] dark:bg-[#38BDF8]"></span>
          <span className="text-[11px] font-semibold text-[#4E79A7] dark:text-[#38BDF8] tracking-wider uppercase font-['Inter',sans-serif]">CORE ENGINEERING &amp; DESIGN GROUP</span>
        </div>

        <h1 className="font-['Poppins',sans-serif] font-bold text-[28px] sm:text-[32px] leading-[40px] text-[#1F2A37] dark:text-white tracking-tight mb-3">Tentang Tim Pengembang</h1>

        <p className="font-['Inter',sans-serif] text-[15px] leading-[24px] text-[#6B7280] dark:text-[#94A3B8] max-w-[720px]">
          Retail Analytics Platform dikembangkan secara kolaboratif oleh tim data intelligence untuk menjembatani data penjualan mentah menjadi keputusan bisnis strategis yang dapat dieksekusi secara nyata.
        </p>
      </section>

      {/* ── Section 2: Principles / Value Proposition Cards ── */}
      <section className="mb-12">
        <div className="bg-white dark:bg-[#111827] rounded-[14px] p-6 shadow-sm border border-[#E3E7ED] dark:border-[#1E293B] transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="flex flex-col p-5 bg-[#F8FAFC] dark:bg-[#161F30] rounded-[10px] border border-[#EDF1F5] dark:border-[#1E293B] hover:border-[#CBD5E1] dark:hover:border-slate-600 transition-all hover:-translate-y-0.5 duration-200"
              >
                <div className={`w-10 h-10 rounded-full ${p.iconBg} ${p.iconColor} flex items-center justify-center mb-3.5`}>
                  <span className="material-symbols-outlined text-[20px]">{p.symbol}</span>
                </div>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-[17px] text-[#1F2A37] dark:text-white mb-1.5">{p.title}</h3>
                <p className="font-['Inter',sans-serif] text-[13.5px] leading-[20px] text-[#6B7280] dark:text-[#94A3B8]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Team Section Header ── */}
      <section className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-['Poppins',sans-serif] font-bold text-[22px] text-[#1F2A37] dark:text-white tracking-tight">Kolektif Kreator &amp; Analis</h2>
          <p className="font-['Inter',sans-serif] text-[14px] text-[#6B7280] dark:text-[#94A3B8]">Para profesional di balik arsitektur, pemodelan statistik, dan desain antarmuka.</p>
        </div>

        <span className="inline-flex items-center px-3 py-1 bg-[#EEF2F6] dark:bg-[#161F30] border border-[#E3E7ED] dark:border-[#1E293B] rounded-full text-[12px] font-medium text-[#4B5563] dark:text-[#94A3B8]">6 Anggota Tim</span>
      </section>

      {/* ── Section 4: Team Grid (3 Columns) ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {members.map((m, idx) => (
          <div
            key={idx}
            className="group bg-white dark:bg-[#111827] rounded-[14px] border border-[#E3E7ED] dark:border-[#1E293B] p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center text-center">
              {/* Avatar Initial Circle */}
              <div
                className={`w-20 h-20 rounded-full ${m.avatarBg} text-white flex items-center justify-center font-['Poppins',sans-serif] font-bold text-[22px] shadow-sm mb-4 group-hover:scale-105 transition-transform duration-200 border-2 border-white dark:border-slate-800`}
              >
                {m.initials}
              </div>

              <h3 className="font-['Poppins',sans-serif] font-semibold text-[18px] text-[#1F2A37] dark:text-white mb-1">{m.name}</h3>

              <p className="font-['Inter',sans-serif] font-medium text-[13px] text-[#4E79A7] dark:text-[#38BDF8] mb-3 min-h-[38px] flex items-center justify-center">{m.role}</p>

              <p className="font-['Inter',sans-serif] text-[12px] text-[#6B7280] dark:text-[#94A3B8] leading-relaxed mb-4 text-center">{m.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
                {m.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 bg-[#F1F5F9] dark:bg-[#161F30] text-[#475569] dark:text-slate-300 border border-[#EDF1F5] dark:border-[#1E293B] rounded-full text-[11px] font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* LinkedIn Button */}
            <div className="pt-3 border-t border-[#F1F5F9] dark:border-[#1E293B]">
              <a
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-[#F8FAFC] dark:bg-[#161F30] hover:bg-[#1F2A37] hover:text-white dark:hover:bg-[#4E79A7] text-[#1F2A37] dark:text-slate-200 text-[12px] font-medium transition-colors border border-[#EDF1F5] dark:border-[#1E293B] cursor-pointer"
                href={m.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedInIcon />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* ── Section 5: Tech Architecture Info Banner ── */}
      <section>
        <div className="bg-white dark:bg-[#111827] rounded-[14px] border border-[#E3E7ED] dark:border-[#1E293B] p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] dark:bg-[#161F30] flex items-center justify-center text-[#1F2A37] dark:text-white flex-shrink-0 border border-[#E3E7ED] dark:border-[#1E293B]">
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#6B7280] dark:text-[#94A3B8] tracking-wider uppercase block mb-0.5 font-['Inter',sans-serif]">ARSIKTETUR &amp; TEKNOLOGI</span>
              <p className="text-[13.5px] font-medium text-[#1F2A37] dark:text-white font-['Inter',sans-serif]">Dibangun dengan Next.js 14, Tailwind CSS, Tableau Embedded v3 API, dan Python FastAPI Backend.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#F8FAFC] dark:bg-[#161F30] border border-[#EDF1F5] dark:border-[#1E293B] px-3.5 py-1.5 rounded-lg flex-shrink-0 self-stretch md:self-auto justify-between md:justify-start">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[12px] text-[#6B7280] dark:text-[#94A3B8] font-medium">Status:</span>
            <span className="text-[12px] font-semibold text-[#1F2A37] dark:text-white">Production Ready v1.2 (Sesuai PRD Final 2026)</span>
          </div>
        </div>
      </section>
    </div>
  );
}

