import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { SiteSettings } from '../types';

interface LegalPagesProps {
  initialTab?: string;
  siteSettings: SiteSettings;
}

export const LegalPages: React.FC<LegalPagesProps> = ({
  initialTab = 'privacy',
  siteSettings,
}) => {
  const [activeLegalTab, setActiveLegalTab] = useState<string>(initialTab);

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Use' },
    { id: 'refund', label: 'Donation & Refund Policy' },
    { id: 'complaints', label: 'Complaints Procedure' },
    { id: 'cookies', label: 'Cookie Policy' },
  ];

  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-14 sm:py-16 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <Lock className="w-3.5 h-3.5 text-[#F27D26]" />
            Legal & Regulatory Framework
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FDFCF8]">
            Legal & Compliance Center
          </h1>
          <p className="text-xs sm:text-sm text-[#E6E2D3] max-w-xl mx-auto font-light">
            Ihsan Children's Foundation operates under strict adherence to Ugandan law and international humanitarian governance.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 space-y-2">
            <div className="bg-[#FDFCF8] p-3 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLegalTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeLegalTab === tab.id
                      ? 'bg-[#1A3020] text-[#FDFCF8] shadow-xs'
                      : 'text-[#5A5A40] hover:bg-[#F5F2EA] hover:text-[#1A3020]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <ChevronRight className={`w-4 h-4 ${activeLegalTab === tab.id ? 'text-[#F27D26]' : 'text-[#5A5A40]'}`} />
                </button>
              ))}
            </div>

            <div className="bg-[#F5F2EA] p-5 rounded-2xl border border-[#E6E2D3] text-xs text-[#5A5A40] space-y-2">
              <span className="font-bold text-[#1A3020] uppercase text-[11px]">Official Inquiries</span>
              <p>Legal & compliance desk: <a href="mailto:info@ihsanchildrensfoundation.org" className="text-[#1A3020] hover:text-[#F27D26] font-bold underline">info@ihsanchildrensfoundation.org</a></p>
              <p>Mutundwe, Kampala, Uganda</p>
            </div>
          </div>

          {/* Legal Document Content Area */}
          <div className="lg:col-span-8 bg-[#FDFCF8] p-6 sm:p-10 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-6 text-[#5A5A40] text-xs sm:text-sm leading-relaxed">
            
            {activeLegalTab === 'privacy' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#1A3020]">Privacy & Data Protection Policy</h2>
                <p className="text-[#5A5A40]/80 text-xs">Last updated: January 2025 • Governing Jurisdiction: Republic of Uganda (Data Protection and Privacy Act 2019)</p>

                <h3 className="text-sm font-bold text-[#1A3020] pt-2">1. Commitment to Donor & Beneficiary Privacy</h3>
                <p>
                  Ihsan Children's Foundation respects your privacy and is committed to protecting your personal information. We never sell, rent, or trade donor or visitor personal data to any third party.
                </p>

                <h3 className="text-sm font-bold text-[#1A3020] pt-2">2. Information We Collect</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Donations:</strong> Donor name, email address, transaction reference, amount, and designated charitable fund. Credit card and mobile money PINs are processed securely by licensed payment providers and are never stored on our servers.</li>
                  <li><strong>Volunteers & Job Inquiries:</strong> CVs, contact information, background checks, and safeguarding certifications.</li>
                  <li><strong>Child Safeguarding Data:</strong> Strictly confidential incident reports accessed only by designated child protection officers.</li>
                </ul>

                <h3 className="text-sm font-bold text-[#1A3020] pt-2">3. Child Privacy & Media Dignity</h3>
                <p>
                  In accordance with our Child Safeguarding Policy, images and accounts of vulnerable children are shared exclusively with informed guardian consent. Real names and exact vulnerable home locations are pseudonymised.
                </p>
              </div>
            )}

            {activeLegalTab === 'terms' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#1A3020]">Website Terms of Use</h2>
                <p className="text-[#5A5A40]/80 text-xs">Governing Law: Laws of the Republic of Uganda</p>

                <h3 className="text-sm font-bold text-[#1A3020] pt-2">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using the official digital platform of Ihsan Children's Foundation, you agree to comply with and be bound by these terms.
                </p>

                <h3 className="text-sm font-bold text-[#1A3020] pt-2">2. Charitable Use & Intellectual Property</h3>
                <p>
                  All content, branding, photographs, and publications are the property of Ihsan Children's Foundation. Unauthorised commercial use or misrepresentation of our humanitarian work is strictly prohibited.
                </p>
              </div>
            )}

            {activeLegalTab === 'refund' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#1A3020]">Donation & Refund Policy</h2>
                
                <h3 className="text-sm font-bold text-[#1A3020] pt-2">1. Dedicated Fund Allocation</h3>
                <p>
                  All charitable contributions made to Ihsan Children's Foundation are allocated directly to the humanitarian vertical specified by the donor (e.g. Clean Water, Food Security, School Kits).
                </p>

                <h3 className="text-sm font-bold text-[#1A3020] pt-2">2. Official Receipts</h3>
                <p>
                  Every verified gift generates an immediate, downloadable charitable receipt containing the transaction reference, amount, and date.
                </p>

                <h3 className="text-sm font-bold text-[#1A3020] pt-2">3. Error Inquiries & Refunds</h3>
                <p>
                  If an error occurred during your payment (such as accidental duplicate debit), please contact our finance desk at <strong>info@ihsanchildrensfoundation.org</strong> with your transaction reference within 14 days for resolution.
                </p>
              </div>
            )}

            {activeLegalTab === 'complaints' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#1A3020]">Complaints & Whistleblower Procedure</h2>
                
                <p>
                  We are committed to the highest standards of transparency and integrity. Any person who observes misconduct, fraud, safeguarding violations, or poor service is encouraged to report it immediately.
                </p>

                <h3 className="text-sm font-bold text-[#1A3020] pt-2">How to Submit a Complaint</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Confidential Child Protection Desk:</strong> Use the Safeguarding reporting tool on this website.</li>
                  <li><strong>General or Financial Misconduct:</strong> Email direct to the Trustees Oversight Counsel at <code>trustees@ihsanchildrensfoundation.org</code>.</li>
                  <li><strong>Physical Drop Box:</strong> Located at Mutundwe Secretariat, Kampala.</li>
                </ul>
              </div>
            )}

            {activeLegalTab === 'cookies' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#1A3020]">Cookie Policy</h2>
                
                <p>
                  Our website uses strictly necessary and performance cookies to remember your currency preference, secure donor sessions, and optimize mobile loading speeds. We do not use third-party behavioral advertising trackers.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
