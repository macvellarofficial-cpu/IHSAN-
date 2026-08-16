import React, { useState } from 'react';
import { 
  Heart, 
  HeartHandshake, 
  Users, 
  Building2, 
  GraduationCap, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import { submitPartnershipInquiry } from '../lib/storage';

interface GetInvolvedPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onOpenDonate: (fundCategory?: string) => void;
  onOpenVolunteer: () => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({
  onNavigate,
  onOpenDonate,
  onOpenVolunteer,
}) => {
  const [partnerType, setPartnerType] = useState<'mosque' | 'ngo' | 'corporate' | 'school' | 'individual'>('mosque');
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [proposalDetails, setProposalDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitPartnershipInquiry({
        organizationName: orgName,
        organizationType: partnerType,
        contactPerson: contactName,
        email,
        phone,
        country: 'Uganda',
        partnershipScope: partnerType,
        partnershipType: partnerType,
        proposalDetails,
        message: proposalDetails,
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-16 sm:py-20 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <HeartHandshake className="w-3.5 h-3.5 text-[#F27D26]" />
            Humanitarian Collaboration
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFCF8]">
            Get Involved With Ihsan
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D3] max-w-2xl mx-auto leading-relaxed font-light">
            There are many meaningful ways to uplift vulnerable children in Uganda. Join hands with our field team.
          </p>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pathway 1 */}
          <div className="bg-[#FDFCF8] p-6 sm:p-8 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F2EA] border border-[#E6E2D3] text-[#F27D26] flex items-center justify-center font-bold">
                <Heart className="w-6 h-6 fill-[#F27D26] text-[#F27D26]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A3020]">Make a Charitable Gift</h3>
              <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
                Directly fund scholastic kits, emergency meals, medical support, or clean water boreholes in Uganda.
              </p>
            </div>
            <button
              onClick={() => onOpenDonate()}
              className="w-full py-3 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Donate Now →
            </button>
          </div>

          {/* Pathway 2 */}
          <div className="bg-[#FDFCF8] p-6 sm:p-8 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6 text-[#1A3020]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A3020]">Volunteer With Us</h3>
              <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
                Offer your time and professional skills in teaching, healthcare, logistics, fundraising, or field distributions.
              </p>
            </div>
            <button
              onClick={onOpenVolunteer}
              className="w-full py-3 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Apply as Volunteer →
            </button>
          </div>

          {/* Pathway 3 */}
          <div className="bg-[#FDFCF8] p-6 sm:p-8 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F2EA] border border-[#E6E2D3] text-[#5A5A40] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6 text-[#5A5A40]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A3020]">Institutional Partnerships</h3>
              <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
                Mosques, schools, foundations, and businesses can partner with us for dedicated seasonal and infrastructure projects.
              </p>
            </div>
            <a
              href="#partnership-form"
              className="w-full py-3 bg-[#F5F2EA] hover:bg-[#E6E2D3] text-[#1A3020] border border-[#E6E2D3] text-center font-bold text-xs rounded-xl transition-colors block cursor-pointer"
            >
              Submit Proposal ↓
            </a>
          </div>

        </div>
      </section>

      {/* Mosque & Islamic Community Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1A3020] rounded-3xl p-8 sm:p-12 border border-[#E6E2D3] text-[#FDFCF8] space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-bold uppercase tracking-wider border border-[#F27D26]/30">
            Zakat & Sadaqah Jariyah
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FDFCF8]">
            Mosque, Community & Faith-Based Collaboration
          </h2>
          <p className="text-xs sm:text-sm text-[#E6E2D3] leading-relaxed max-w-3xl font-light">
            Ihsan Children's Foundation facilitates 100% compliant Zakat distribution, Ramadan Iftar food pack drives, Qurbani/Udhiyah livestock programs, and Sadaqah Jariyah clean water boreholes for Muslim communities and partner congregations worldwide.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenDonate('Zakat & Sadaqah Jariyah')}
              className="px-6 py-2.5 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Dedicate Zakat / Sadaqah
            </button>
            <button
              onClick={() => { setPartnerType('mosque'); document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-5 py-2.5 bg-[#24422c] hover:bg-[#1A3020] text-[#FDFCF8] font-bold text-xs rounded-xl border border-[#F27D26]/40 transition-colors cursor-pointer"
            >
              Register Mosque Partnership
            </button>
          </div>
        </div>
      </section>

      {/* Partnership Proposal Submission Form */}
      <section id="partnership-form" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FDFCF8] p-6 sm:p-10 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#F27D26] text-xs font-bold uppercase tracking-wider border border-[#E6E2D3]">
              Formal Inquiries
            </div>
            <h2 className="text-2xl font-extrabold text-[#1A3020]">
              Submit a Partnership or Sponsorship Proposal
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5A40]">
              Our leadership and programs team in Kampala review partnership proposals within 48 business hours.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handlePartnerSubmit} className="space-y-4">
              
              {/* Partner Type */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                  Organization / Entity Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'mosque', label: 'Mosque / Faith Org' },
                    { id: 'ngo', label: 'NGO / Foundation' },
                    { id: 'corporate', label: 'Corporate / CSR' },
                    { id: 'school', label: 'School / University' },
                    { id: 'individual', label: 'Philanthropist' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPartnerType(t.id as any)}
                      className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        partnerType === t.id
                          ? 'bg-[#1A3020] text-[#FDFCF8] border-[#1A3020]'
                          : 'bg-[#F5F2EA] text-[#5A5A40] border-[#E6E2D3] hover:bg-[#E6E2D3]/60'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Organization Name & Contact Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Organization / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Al-Noor Community Center or Global CSR Initiative"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Contact Person Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Amina Yusuf"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partnerships@example.org"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 ... or international number"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Proposal Details */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                  Proposed Partnership Scope & Objectives *
                </label>
                <textarea
                  rows={4}
                  required
                  value={proposalDetails}
                  onChange={(e) => setProposalDetails(e.target.value)}
                  placeholder="Outline the nature of the partnership (e.g. project co-funding, volunteer expedition, scholastic drive, institutional grant)..."
                  className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Transmitting Proposal...</span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Send className="w-4 h-4" />
                    Submit Partnership Proposal
                  </span>
                )}
              </button>

            </form>
          ) : (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#F5F2EA] text-[#F27D26] flex items-center justify-center mx-auto border border-[#E6E2D3]">
                <CheckCircle2 className="w-10 h-10 text-[#F27D26]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A3020]">
                Partnership Inquiry Submitted
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A40] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{contactName}</strong> ({orgName}). Our partnership office in Mutundwe, Kampala will review your proposal and initiate contact at <strong>{email}</strong>.
              </p>
              <button
                onClick={() => { setSubmitted(false); setOrgName(''); setContactName(''); setEmail(''); setPhone(''); setProposalDetails(''); }}
                className="px-6 py-2 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
