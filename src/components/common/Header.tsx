import React, { useState } from 'react';
import { 
  Heart, 
  Menu, 
  X, 
  Phone, 
  Globe, 
  ShieldCheck, 
  Lock, 
  ChevronDown,
  Sparkles,
  MapPin
} from 'lucide-react';
import { CurrencyCode, SiteSettings } from '../../types';
import { CURRENCIES } from '../../data/initialData';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, meta?: any) => void;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onOpenDonate: (fundCategory?: string) => void;
  onOpenSafeguarding: () => void;
  siteSettings: SiteSettings;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  currency,
  onCurrencyChange,
  onOpenDonate,
  onOpenSafeguarding,
  siteSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Our Programs' },
    { id: 'projects', label: 'Projects' },
    { id: 'where-we-work', label: 'Where We Work' },
    { id: 'get-involved', label: 'Get Involved' },
    { id: 'news-stories', label: 'News & Stories' },
    { id: 'transparency', label: 'Transparency' },
    { id: 'safeguarding', label: 'Safeguarding' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-[#E6E2D3] transition-all">
      {/* Top Notification / Trust Bar */}
      <div className="bg-[#1A3020] text-[#E6E2D3] text-xs py-2 px-4 sm:px-6 border-b border-[#1A3020]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left info */}
          <div className="flex items-center flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-[#E6E2D3]">
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>Mutundwe • Kampala • Uganda</span>
            </span>
            <span className="hidden md:inline-block text-[#E6E2D3]/40">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#E6E2D3]/90">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>Est. 2019 • Child-Centered Humanitarian NGO</span>
            </span>
            <span className="hidden lg:inline-block text-[#E6E2D3]/40">•</span>
            <a 
              href="tel:+256741799231" 
              className="inline-flex items-center gap-1 hover:text-[#F27D26] transition-colors"
              title="Official Phone Contact"
            >
              <Phone className="w-3 h-3 text-[#F27D26]" />
              <span>+256 741 799 231</span>
            </a>
          </div>

          {/* Right actions: Currency + Confidential Safeguarding + Admin Portal */}
          <div className="flex items-center gap-3">
            {/* Safeguarding Report Quick Link */}
            <button
              id="header-safeguarding-quick-btn"
              onClick={onOpenSafeguarding}
              className="inline-flex items-center gap-1 text-[11px] text-[#FDFCF8] hover:text-[#F27D26] bg-[#2C4D35] px-2.5 py-0.5 rounded-full border border-[#E6E2D3]/30 transition-colors"
              title="Confidential Child Safeguarding Reporting Desk"
            >
              <ShieldCheck className="w-3 h-3 text-[#F27D26]" />
              <span className="hidden sm:inline">Report Safeguarding Concern</span>
              <span className="sm:hidden">Safeguarding Desk</span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                id="header-currency-selector-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#2C4D35] hover:bg-[#3D6647] rounded-full text-[11px] font-medium text-white transition-colors border border-[#E6E2D3]/30"
              >
                <Globe className="w-3 h-3 text-[#F27D26]" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-[#E6E2D3]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-[#FDFCF8] text-[#1A3020] rounded-xl shadow-xl border border-[#E6E2D3] py-1 z-50">
                  <div className="px-3 py-1 text-[10px] font-semibold text-[#5A5A40] uppercase tracking-wider border-b border-[#E6E2D3]">
                    Select Currency
                  </div>
                  {Object.values(CURRENCIES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#F5F2EA] transition-colors ${
                        currency === c.code ? 'font-bold text-[#F27D26] bg-[#F5F2EA]' : 'text-[#1A3020]'
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="text-[11px] text-[#5A5A40] font-mono">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Management Link */}
            <button
              id="header-admin-portal-link"
              onClick={() => handleNavClick('admin')}
              className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full transition-colors ${
                currentTab === 'admin'
                  ? 'bg-[#F27D26] text-white font-bold'
                  : 'text-[#E6E2D3] hover:text-white hover:bg-[#2C4D35]'
              }`}
              title="NGO Administration & Field Management Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Foundation Identity Logo */}
        <button
          id="header-logo-home-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-hidden"
        >
          {/* Logo Mark: Terracotta Orange icon matching Natural Tones header */}
          <div className="w-10 h-10 bg-[#F27D26] rounded-xl flex items-center justify-center shadow-xs group-hover:bg-[#d86c1e] transition-colors">
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight leading-none text-[#1A3020] uppercase">
              Ihsan
            </span>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#5A5A40] mt-0.5">
              Children's Foundation
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 text-[13px] font-semibold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'text-[#F27D26] border-b-2 border-[#F27D26] font-bold'
                    : 'text-[#1A3020]/80 hover:text-[#F27D26]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Primary CTA: Donate Now */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            id="header-donate-cta-btn"
            onClick={() => onOpenDonate()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F27D26] hover:bg-[#d86c1e] text-white font-bold text-xs tracking-wider uppercase rounded-full shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>DONATE NOW</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            id="mobile-donate-cta-compact"
            onClick={() => onOpenDonate()}
            className="sm:hidden px-3.5 py-1.5 bg-[#F27D26] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-xs flex items-center gap-1"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Donate</span>
          </button>

          <button
            id="header-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#1A3020] hover:bg-[#F5F2EA] focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FDFCF8] border-b border-[#E6E2D3] shadow-xl px-4 pt-2 pb-6 space-y-1 animate-in fade-in duration-200">
          <div className="p-3 bg-[#F5F2EA] rounded-xl mb-3 flex items-center justify-between border border-[#E6E2D3]">
            <span className="text-xs font-semibold text-[#1A3020]">Headquarters: Mutundwe, Kampala</span>
            <span className="text-[10px] text-[#F27D26] font-bold bg-white px-2.5 py-0.5 rounded-full border border-[#E6E2D3]">Founded 2019</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#F27D26] text-white font-bold'
                      : 'text-[#1A3020] bg-white border border-[#E6E2D3] hover:bg-[#F5F2EA]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#E6E2D3] flex flex-col gap-2">
            <button
              id="mobile-menu-full-donate-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="w-full py-3 bg-[#F27D26] hover:bg-[#d86c1e] text-white font-bold text-center rounded-full shadow-xs flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>DONATE NOW</span>
            </button>

            <button
              id="mobile-menu-safeguarding-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSafeguarding();
              }}
              className="w-full py-2.5 bg-[#1A3020] text-[#E6E2D3] hover:text-white font-medium text-xs rounded-full flex items-center justify-center gap-1.5 border border-[#E6E2D3]/30"
            >
              <ShieldCheck className="w-4 h-4 text-[#F27D26]" />
              <span>Report Safeguarding Concern</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
