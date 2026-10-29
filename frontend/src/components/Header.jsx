"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/forecast', label: 'Forecast' },
  { to: '/whatif', label: 'What-if' },
  { to: '/about', label: 'About Us' },
];

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBIhI8CoJUzGdt0Ra-Z1lcmX1g5MWiLIQZZglWxYJRONtiOgrFDKvaxEXSGvk3dpUXC9nqK_jelGA5K45IwKqaPYME5CteKIv3S8pBrV3ADHOOvXFPPm8WQj3ufTskEgYcX_k3K09LEDzYY-qjiNWWYSsZcGmw8CGtQ4qpTJ2kUrH5atu6kzuuoTlxIPd5JydEwyUfiZ_kJmbpAcaIlh07NuugJqpjCnrSNihHjuCdc-AfZ4BbgvH1X6dG6HQC6EOM9xA";

export default function Header() {
  const { dark, toggle } = useTheme();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white dark:bg-[#0F172A] border-b border-[#E3E7ED] dark:border-[#1E293B] shadow-[0_1px_3px_0_rgba(31,42,55,0.04)] dark:shadow-[0_2px_8px_0_rgba(0,0,0,0.35)] transition-colors duration-200">
      <div className="h-16 max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 no-underline">
          <img
            alt="Retail Analytics Logo"
            className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-secondary/20 dark:ring-[#38BDF8]/20"
            src={LOGO_URL}
          />
          <span className="font-headline-md font-bold text-[18px] text-primary dark:text-white tracking-tight font-['Manrope',sans-serif]">
            Retail Analytics
          </span>
        </Link>

        {/* Centered Navigation */}
        <nav className="flex-1 flex items-center justify-center gap-8 h-full">
          {navItems.map((item) => {
            const isActive = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`inline-flex items-center h-full px-1 text-[14px] transition-colors ${
                  isActive
                    ? 'font-semibold text-primary dark:text-white border-b-2 border-secondary dark:border-[#38BDF8]'
                    : 'font-normal text-on-surface-variant dark:text-[#94A3B8] hover:text-primary dark:hover:text-white border-b-2 border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle Button */}
        <div className="flex items-center shrink-0">
          {dark ? (
            <button
              type="button"
              onClick={toggle}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-[#161F30] border border-[#334155] rounded-full hover:border-[#38BDF8]/60 transition-colors shadow-sm cursor-pointer"
              title="Theme: Dark (Click to switch to Light)"
            >
              <span className="material-symbols-outlined text-[16px] text-[#38BDF8]">dark_mode</span>
              <span className="text-[12px] font-medium text-white">Dark</span>
              <div className="w-7 h-4 bg-[#0369A1] rounded-full p-0.5 flex items-center justify-end shadow-inner">
                <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={toggle}
              className="rounded-full bg-surface-container-high/60 hover:bg-surface-container-high border border-border-soft px-3 py-1 flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              title="Theme: Light (Click to switch to Dark)"
            >
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">light_mode</span>
              <span className="text-[12px] font-semibold text-on-surface">Light</span>
              <div className="w-8 h-4 bg-outline-variant/60 rounded-full p-0.5 relative flex items-center">
                <div className="w-3 h-3 bg-white rounded-full shadow transition-transform translate-x-0"></div>
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
