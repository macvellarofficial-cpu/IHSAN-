import React, { useState } from 'react';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Globe2, 
  Lock,
  FileText,
  ExternalLink
} from 'lucide-react';
import { subscribeNewsletter } from '../../lib/storage';
import { SiteSettings } from '../../types';

interface FooterProps {
  onNavigate: (tab: string, meta?: any) => void;
  onOpenDonate: () => void;
  onOpenSafeguarding: () => void;
  siteSettings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDonate,
  onOpenSafeguarding,
  siteSettings,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    subscribeNewsletter(emailInput);
    setSubscribed(true);
    setEmailInput('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#1A3020] text-[#E6E2D3] pt-16 pb-8 border-t-4 border-[#F27D26] bg-islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Trust & Islamic Value Banner */}
        <div className="bg-[#2C4D35] rounded-3xl p-6 sm:p-8 mb-12 border border-[#E6E2D3]/20 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A3020] text-[#F27D26] text-xs font-bold uppercase tracking-wider border border-[#E6E2D3]/20">
              <Heart className="w-3.5 h-3.5 fill-[#F27D26]" />
              The Spirit of Ihsan (إحسان)
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Excellence in Kindness. Dignity in Humanitarian Relief.
            </h3>
            <p className="text-sm text-[#E6E2D3]/90 leading-relaxed">
              "Doing what is beautiful and striving for moral excellence." Founded in Mutundwe, Kampala in 2019, 
              Ihsan Children's Foundation defends vulnerable children, orphans, and displaced families with absolute accountability.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="footer-donate-cta-highlight"
              onClick={onOpenDonate}
              className="px-6 py-3 bg-[#F27D26] hover:bg-[#d86c1e] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Donate to Ihsan
            </button>
            <button
              id="footer-safeguarding-quick-btn"
              onClick={onOpenSafeguarding}
              className="px-5 py-3 bg-[#1A3020] hover:bg-[#25422e] text-[#E6E2D3] border border-[#E6E2D3]/30 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#F27D26]" />
              <span>Report Safeguarding Desk</span>
            </button>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#E6E2D3]/20">
          
          {/* Col 1: Foundation Info & Registration */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F27D26] flex items-center justify-center text-white font-bold">
                <Heart className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white leading-none">
                  Ihsan Children's Foundation
                </h4>
                <p className="text-xs text-[#F27D26] mt-1 font-semibold uppercase tracking-wider">
                  Mutundwe • Kampala • Uganda
                </p>
              </div>
            </div>

            <p className="text-xs text-[#E6E2D3]/80 leading-relaxed">
              A child-focused, community-rooted non-governmental organisation dedicated to child protection, education, emergency food relief, safe water, healthcare, and refugee family support.
            </p>

            {/* Official Registration Notice Placeholder */}
            <div className="bg-[#142619] p-4 rounded-2xl border border-[#E6E2D3]/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F27D26]">
                <ShieldCheck className="w-4 h-4 text-[#F27D26]" />
                <span className="uppercase tracking-wider">Uganda NGO Regulatory Status</span>
              </div>
              <p className="text-[11px] text-[#E6E2D3] font-mono">
                Registration No: <span className="text-[#F27D26] font-semibold">{siteSettings.ngoRegistrationNumber}</span>
              </p>
              <p className="text-[10px] text-[#E6E2D3]/70">
                Founded: 2019 by Mr Hakimu & Jeremiah in Mutundwe, Kampala. Complete audited filings & charter available in Transparency.
              </p>
            </div>
          </div>

          {/* Col 2: Core Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F27D26] uppercase tracking-widest">
              Our Programs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('programs', { category: 'child_protection' })}
                  className="hover:text-[#F27D26] transition-colors text-left text-[#E6E2D3]/90"
                >
                  Child Protection & Safety
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('programs', { category: 'education' })}
                  className="hover:text-[#F27D26] transition-colors text-left text-[#E6E2D3]/90"
                >
                  Education & School Kits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('programs', { category: 'food_security' })}
                  className="hover:text-[#F27D26] transition-colors text-left text-[#E6E2D3]/90"
                >
                  Food Security & Feeding
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('programs', { category: 'emergency_relief' })}
                  className="hover:text-[#F27D26] transition-colors text-left text-[#E6E2D3]/90"
                >
                  Emergency Food Relief
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('programs', { category: 'clean_water' })}
                  className="hover:text-[#F27D26] transition-colors text-left text-[#E6E2D3]/90"
                >
                  Clean & Safe Drinking Water
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('programs', { category: 'refugees_displaced' })}
                  className="hover:text-[#F27D26] transition-colors text-left text-[#E6E2D3]/90"
                >
                  Refugee & Displaced Children
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('programs', { category: 'community_health' })}
                  className="hover:text-[#F27D26] transition-colors text-left text-[#E6E2D3]/90"
                >
                  Community Health Outreach
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('programs', { category: 'winter_emergency' })}
                  className="hover:text-[#F27D26] transition-colors text-left text-[#E6E2D3]/90"
                >
                  Winter & Emergency Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F27D26] uppercase tracking-widest">
              Organisation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F27D26] transition-colors text-[#E6E2D3]/90">
                  About Us & Founders
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-[#F27D26] transition-colors text-[#E6E2D3]/90">
                  Active & Urgent Appeals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('where-we-work')} className="hover:text-[#F27D26] transition-colors text-[#E6E2D3]/90">
                  Where We Work (Uganda)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('transparency')} className="hover:text-[#F27D26] transition-colors text-[#E6E2D3]/90">
                  Transparency & Audits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('safeguarding')} className="hover:text-[#F27D26] transition-colors text-[#E6E2D3]/90">
                  Child Safeguarding Charter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('get-involved')} className="hover:text-[#F27D26] transition-colors text-[#E6E2D3]/90">
                  Volunteer Application
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('get-involved')} className="hover:text-[#F27D26] transition-colors text-[#E6E2D3]/90">
                  Partner / Institutional Alliances
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('news-stories')} className="hover:text-[#F27D26] transition-colors text-[#E6E2D3]/90">
                  Stories of Hope & News
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#F27D26] uppercase tracking-widest">
              Head Office Contact
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                <span className="text-[#E6E2D3]/90">Mutundwe, Kampala, Uganda</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F27D26] shrink-0" />
                <a href="tel:+256741799231" className="hover:text-white text-[#E6E2D3]/90 transition-colors">
                  +256 741 799 231
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F27D26] shrink-0" />
                <a href="mailto:info@ihsanchildrensfoundation.org" className="hover:text-white text-[#E6E2D3]/90 transition-colors truncate">
                  info@ihsanchildrensfoundation.org
                </a>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-[11px] text-[#E6E2D3] mb-2 font-medium">
                Subscribe to verified humanitarian updates:
              </p>
              <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-xs bg-[#142619] border border-[#E6E2D3]/30 rounded-xl text-white placeholder:text-[#E6E2D3]/50 focus:outline-hidden focus:border-[#F27D26]"
                  required
                />
                <button
                  type="submit"
                  className="p-2 bg-[#F27D26] hover:bg-[#d86c1e] text-white rounded-xl transition-colors shrink-0"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Subscribed successfully.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal, Socials & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E6E2D3]/70">
          <div>
            <p>
              © {new Date().getFullYear()} Ihsan Children's Foundation • All rights reserved • Kampala, Uganda
            </p>
            <p className="text-[10px] text-[#E6E2D3]/50 mt-0.5">
              Strict safeguarding policy: Photographs published solely with informed consent; child identities protected.
            </p>
          </div>

          {/* Legal Pages */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => onNavigate('privacy-policy')} className="hover:text-[#F27D26]">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('terms-of-use')} className="hover:text-[#F27D26]">
              Terms of Use
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('donation-policy')} className="hover:text-[#F27D26]">
              Donation Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('complaints-policy')} className="hover:text-[#F27D26]">
              Complaints Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('admin')} className="text-[#F27D26] hover:text-white flex items-center gap-1 font-bold uppercase tracking-wider text-[11px]">
              <Lock className="w-3 h-3" /> Staff Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
