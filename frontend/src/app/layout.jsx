import { ThemeProvider } from "../context/ThemeContext";
import Header from "../components/Header";
import "./globals.css";

export const metadata = {
  title: "Retail Analytics Platform",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-canvas-background dark:bg-[#0B0F17] text-on-surface dark:text-[#E2E8F0] transition-colors duration-200">
            <Header />
            <main className="flex-1 w-full pt-16">
              {children}
            </main>
            <footer className="w-full bg-surface-card dark:bg-[#0F172A] border-t border-border-soft dark:border-[#1E293B] py-space-lg transition-colors duration-200">
              <div className="max-w-[1200px] mx-auto px-gutter flex flex-col sm:flex-row items-center justify-between gap-space-sm text-[13px]">
                <div className="flex items-center gap-space-sm text-on-surface-variant dark:text-[#94A3B8] font-caption text-caption">
                  <span className="text-primary dark:text-white font-medium">Retail Analytics Platform -</span>
                  <span className="inline-block text-outline-variant dark:text-[#64748B]">•</span>
                  <span>© 2026 All rights reserved</span>
                </div>
                <div className="flex items-center gap-6"></div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
