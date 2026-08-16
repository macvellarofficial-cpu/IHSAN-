import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  Mail, 
  FileText,
  Heart
} from 'lucide-react';

interface SafeguardingPageProps {
  onOpenSafeguardingModal: () => void;
}

export const SafeguardingPage: React.FC<SafeguardingPageProps> = ({
  onOpenSafeguardingModal,
}) => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-16 sm:py-20 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F27D26]" />
            Child Protection & Integrity
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFCF8]">
            Child Protection & Safeguarding Policy
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D3] max-w-2xl mx-auto leading-relaxed font-light">
            Protecting the safety, dignity, and wellbeing of every child is the foundational duty of Ihsan Children's Foundation.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Urgent Action Callout */}
        <div className="bg-[#F5F2EA] border-2 border-[#E6E2D3] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F27D26] text-white text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              Confidential Whistleblowing Desk
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A3020]">
              Need to Report a Child Safety or Ethics Concern?
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed max-w-2xl">
              We provide a 100% confidential and secure reporting channel managed directly by our Designated Safeguarding Officer in Kampala.
            </p>
          </div>

          <button
            id="safeguarding-report-btn"
            onClick={onOpenSafeguardingModal}
            className="px-6 py-3.5 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Submit Safeguarding Report</span>
          </button>
        </div>

        {/* 1. Our Core Safeguarding Principles */}
        <div className="bg-[#FDFCF8] rounded-3xl p-6 sm:p-10 border border-[#E6E2D3] shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-[#1A3020]">
            Our Foundational Child Protection Principles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-2">
              <span className="text-xs font-bold text-[#F27D26] uppercase">Principle 1</span>
              <h3 className="text-sm font-bold text-[#1A3020]">Zero-Tolerance for Harm</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Absolute zero-tolerance for physical abuse, emotional harm, sexual exploitation, neglect, or commercial exploitation in any of our program locations.
              </p>
            </div>

            <div className="p-5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-2">
              <span className="text-xs font-bold text-[#1A3020] uppercase">Principle 2</span>
              <h3 className="text-sm font-bold text-[#1A3020]">Universal Dignity</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Every child is treated with profound respect regardless of nationality, tribe, religion, physical ability, economic status, or legal status.
              </p>
            </div>

            <div className="p-5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-2">
              <span className="text-xs font-bold text-[#5A5A40] uppercase">Principle 3</span>
              <h3 className="text-sm font-bold text-[#1A3020]">Dignified Media Ethics</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Never publishing degrading, humiliating, or distress-inducing imagery. We protect children's real names and geographic identities in public media.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Code of Conduct for Staff & Volunteers */}
        <div className="bg-[#F5F2EA] rounded-3xl p-6 sm:p-10 border border-[#E6E2D3] space-y-6">
          <h2 className="text-2xl font-extrabold text-[#1A3020]">
            Code of Conduct for Staff, Volunteers & Visitors
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5A40]">
            All personnel representing Ihsan Children's Foundation must strictly comply with the following mandatory rules:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Never spend unsupervised time alone with a child outside open program sightlines.',
              'Never administer physical punishment or emotionally degrading discipline.',
              'Never take or share photos of children without prior written guardian consent and Foundation authorization.',
              'Never give personal gifts or money directly to individual children outside established transparent distribution protocols.',
              'Never engage in inappropriate physical contact or personal communication via private social channels.',
              'Report any observed signs of abuse or distress immediately to the Safeguarding Lead.'
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#FDFCF8] rounded-xl border border-[#E6E2D3]">
                <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                <span className="text-xs text-[#5A5A40] leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Direct Contact with Safeguarding Lead */}
        <div className="bg-[#1A3020] text-white rounded-3xl p-6 sm:p-10 border border-[#E6E2D3] space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#FDFCF8]">
            Designated Child Safeguarding Lead Contacts
          </h2>
          <p className="text-xs sm:text-sm text-[#E6E2D3] leading-relaxed max-w-2xl font-light">
            For non-emergency policy consultations or to speak directly with our Kampala child protection coordinator:
          </p>
          <div className="flex flex-wrap gap-4 text-xs pt-2">
            <div className="flex items-center gap-2 bg-[#24422c] px-4 py-2 rounded-xl border border-[#F27D26]/30">
              <Phone className="w-4 h-4 text-[#F27D26]" />
              <span>Safeguarding Hotline: <strong>+256 702 570 802</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-[#24422c] px-4 py-2 rounded-xl border border-[#F27D26]/30">
              <Mail className="w-4 h-4 text-[#F27D26]" />
              <span>Direct Email: <strong>safeguarding@ihsanchildrensfoundation.org</strong></span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
