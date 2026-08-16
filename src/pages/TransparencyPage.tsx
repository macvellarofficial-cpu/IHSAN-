import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  PieChart,
  Eye,
  X,
  FileCheck2
} from 'lucide-react';
import { SiteSettings } from '../types';

interface TransparencyPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  siteSettings: SiteSettings;
}

export const TransparencyPage: React.FC<TransparencyPageProps> = ({
  onNavigate,
  siteSettings,
}) => {
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const policies = [
    {
      id: 'safeguarding',
      title: 'Child Protection & Safeguarding Policy',
      category: 'Child Welfare & Protection',
      summary: 'Comprehensive mandatory procedures governing child safety, behavioral codes, consent, photo protocols, and confidential reporting across all operations.',
      fullText: `IHSAN CHILDREN'S FOUNDATION - CHILD SAFEGUARDING CHARTER
1. Core Mandate: Every child has an inherent right to protection from abuse, exploitation, neglect, and violence regardless of race, religion, gender, or nationality.
2. Code of Conduct: All employees, volunteers, contractors, and visitors must undergo background verification and sign a zero-tolerance pledge before interacting with children.
3. Media & Photography: No photography that exploits poverty, exhibits distress, or compromises dignity. Real names and exact vulnerable home locations are strictly protected.
4. Reporting & Whistleblowing: All safeguarding allegations must be reported immediately via our dedicated channel and escalated to the Child Safeguarding Committee within 24 hours.`,
    },
    {
      id: 'anti_fraud',
      title: 'Anti-Fraud, Bribery & Corruption Policy',
      category: 'Financial Governance',
      summary: 'Zero-tolerance governance for financial misappropriation, double-receipting, procurement conflicts, and unauthorized handling of donor funds.',
      fullText: `ANTI-FRAUD & INTEGRITY FRAMEWORK
1. Principle of Ihsan: Total moral and fiduciary stewardship of every charitable contribution.
2. Multi-Signatory Procurement: All project disbursements exceed preset thresholds require dual authorization by Finance Office and Trustees.
3. Random Field Audits: Surprise spot-checks on commodity distributions (food grain, scholastic packs, borehole hardware) to verify direct handover to intended beneficiaries.
4. Whistleblower Protection: Safe, retaliation-free reporting avenues for any suspected corruption.`,
    },
    {
      id: 'conflict_interest',
      title: 'Conflict of Interest & Governance Charter',
      category: 'Board & Trustee Oversight',
      summary: 'Rules preventing self-dealing, nepotism, and unearned enrichment by trustees, founders, and executive management.',
      fullText: `CONFLICT OF INTEREST CODE
1. Annual Declarations: All trustees and key decision-makers must file annual disclosures of familial, commercial, or institutional affiliations.
2. Recusal: Interested parties are legally recused from discussions and votes on procurement or grant allocations affecting their declared interests.`,
    },
    {
      id: 'complaints',
      title: 'Complaints, Feedback & Whistleblower Procedure',
      category: 'Community Accountability',
      summary: 'Formal mechanism ensuring community members, donors, and volunteers can submit complaints with guaranteed investigation and resolution timelines.',
      fullText: `COMPLAINTS & WHISTLEBLOWER PROCEDURE
1. Accessibility: Feedback boxes placed in Mutundwe HQ and accessible online reporting desks.
2. Resolution SLA: Acknowledgment within 48 hours; full investigative findings presented within 14 business days.`,
    },
    {
      id: 'donation_policy',
      title: 'Donation Acceptance & Ethical Fundraising Policy',
      category: 'Fundraising Integrity',
      summary: 'Standards guiding the refusal of illicit or coercive funding and guaranteeing 100% fund designation compliance.',
      fullText: `DONATION ACCEPTANCE POLICY
1. Designated Giving: Donations ear-marked for specific appeals (e.g. Karamoja Drought, Water Wells) are held strictly in restricted project ledger accounts.
2. Refusal of Tainted Funds: Ihsan refuses contributions derived from illegal activities, weapon manufacturing, or entities that contradict human dignity.`,
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-16 sm:py-20 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F27D26]" />
            Open Governance & Fiduciary Trust
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFCF8]">
            Transparency & Accountability Portal
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D3] max-w-2xl mx-auto leading-relaxed font-light">
            We hold ourselves to the highest ethical, legal, and financial standards. Explore our regulatory registration status, audited frameworks, and governance policies.
          </p>
        </div>
      </section>

      {/* 1. Legal Status & NGO Registration Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FDFCF8] rounded-3xl p-6 sm:p-10 border border-[#E6E2D3] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E6E2D3]">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-[#F5F2EA] text-[#F27D26] text-xs font-bold rounded-full uppercase tracking-wider border border-[#E6E2D3]">
                Regulatory Credentials
              </span>
              <h2 className="text-2xl font-extrabold text-[#1A3020]">
                Uganda NGO Registration & Governance Status
              </h2>
            </div>
            <div className="px-4 py-2 bg-[#F5F2EA] rounded-xl border border-[#E6E2D3] text-xs text-[#1A3020] font-mono font-bold">
              Status: Active Charitable Entity
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-2">
              <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">Registration Number</span>
              <p className="text-base font-mono font-bold text-[#1A3020]">{siteSettings.ngoRegistrationNumber}</p>
              <p className="text-[11px] text-[#5A5A40] leading-normal">
                Registered non-governmental charitable organisation in Uganda.
              </p>
            </div>

            <div className="p-5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-2">
              <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">Head Office Secretariat</span>
              <p className="text-sm font-bold text-[#1A3020]">Mutundwe, Kampala, Uganda</p>
              <p className="text-[11px] text-[#5A5A40] leading-normal">
                P.O. Box Mutundwe • Rubaga Division
              </p>
            </div>

            <div className="p-5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-2">
              <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">Founding Year & Leadership</span>
              <p className="text-sm font-bold text-[#1A3020]">Founded 2019</p>
              <p className="text-[11px] text-[#5A5A40] leading-normal">
                Co-Founders: Mr Hakimu & Jeremiah
              </p>
            </div>

          </div>

          {/* Compliance note */}
          <div className="p-4 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] text-xs text-[#1A3020] flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#F27D26] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1A3020]">Truth in Public Communication: </strong>
              Ihsan Children's Foundation adheres strictly to verifiable public reporting. We never exaggerate beneficiary metrics, fabricate partner endorsements, or misrepresent financial statements.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Financial Allocation Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#F5F2EA] rounded-3xl p-6 sm:p-10 border border-[#E6E2D3] space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-[#1A3020]">
              How Charitable Contributions Are Stewarded
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5A40]">
              We maximize direct project delivery in Uganda while maintaining rigorous field monitoring and safeguarding compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="bg-[#FDFCF8] p-6 rounded-2xl border border-[#E6E2D3] text-center space-y-2">
              <div className="text-3xl font-extrabold text-[#1A3020] font-mono">88%</div>
              <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">Direct Field Programs</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Scholastic materials, food parcels, water borehole drilling, and mobile medical relief.
              </p>
            </div>

            <div className="bg-[#FDFCF8] p-6 rounded-2xl border border-[#E6E2D3] text-center space-y-2">
              <div className="text-3xl font-extrabold text-[#F27D26] font-mono">7%</div>
              <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">Field Logistics & Safeguarding</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Truck transportation, volunteer coordination, background checks, and community verification.
              </p>
            </div>

            <div className="bg-[#FDFCF8] p-6 rounded-2xl border border-[#E6E2D3] text-center space-y-2">
              <div className="text-3xl font-extrabold text-[#5A5A40] font-mono">5%</div>
              <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">Administration & Audits</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Secretariat utilities, regulatory filings, banking fees, and annual independent accounting audits.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Governance Policies Repository */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-[#F5F2EA] text-[#1A3020] text-xs font-bold rounded-full uppercase tracking-wider border border-[#E6E2D3]">
              Policy Repository
            </span>
            <h2 className="text-2xl font-extrabold text-[#1A3020]">
              Institutional Governance Policies
            </h2>
          </div>
          <button
            onClick={() => onNavigate('safeguarding')}
            className="px-4 py-2 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Child Safeguarding Portal →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((p) => (
            <div
              key={p.id}
              className="bg-[#FDFCF8] p-6 rounded-2xl border border-[#E6E2D3] shadow-2xs hover:border-[#F27D26] transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#F27D26] uppercase tracking-wider bg-[#F5F2EA] border border-[#E6E2D3] px-2 py-0.5 rounded-md">
                  {p.category}
                </span>
                <h3 className="text-base font-bold text-[#1A3020]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#5A5A40] leading-relaxed">
                  {p.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6E2D3] flex items-center justify-between">
                <button
                  onClick={() => setActivePolicyModal(p.id)}
                  className="text-xs font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Policy Details</span>
                </button>
                <button
                  onClick={() => alert(`Official Policy Document (${p.title}) is on file at Mutundwe Secretariat.`)}
                  className="text-xs font-semibold text-[#5A5A40] hover:text-[#1A3020] flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Reference</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Policy Details Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          {(() => {
            const currentPolicy = policies.find(p => p.id === activePolicyModal);
            if (!currentPolicy) return null;
            return (
              <div className="bg-[#FDFCF8] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E6E2D3] overflow-hidden relative animate-in fade-in">
                <div className="bg-[#1A3020] text-white p-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#F27D26] font-bold uppercase">{currentPolicy.category}</span>
                    <h3 className="text-lg font-bold text-[#FDFCF8]">{currentPolicy.title}</h3>
                  </div>
                  <button
                    onClick={() => setActivePolicyModal(null)}
                    className="text-[#E6E2D3] hover:text-white p-1 rounded-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-[#1A3020] whitespace-pre-line leading-relaxed font-sans">
                  {currentPolicy.fullText}
                </div>

                <div className="p-4 bg-[#F5F2EA] border-t border-[#E6E2D3] flex justify-end">
                  <button
                    onClick={() => setActivePolicyModal(null)}
                    className="px-5 py-2 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
};
