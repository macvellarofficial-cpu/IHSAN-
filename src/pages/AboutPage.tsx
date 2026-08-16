import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Eye, 
  Users, 
  Award, 
  Globe2, 
  CheckCircle2,
  FileText,
  Lock
} from 'lucide-react';
import { TeamMember, SiteSettings } from '../types';

interface AboutPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
  teamMembers: TeamMember[];
  siteSettings: SiteSettings;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenDonate,
  onOpenVolunteer,
  teamMembers,
  siteSettings,
}) => {
  const founders = teamMembers.filter(t => t.category === 'founders');
  const trustees = teamMembers.filter(t => t.category === 'trustees');
  const volunteers = teamMembers.filter(t => t.category === 'volunteers');

  const coreValues = [
    { name: 'Compassion', desc: 'Empathy in action, extending heartfelt care to the most vulnerable.' },
    { name: 'Integrity', desc: 'Uncompromising honesty, moral clarity, and truthfulness in all undertakings.' },
    { name: 'Dignity', desc: 'Respecting the inherent honor and agency of every child and beneficiary family.' },
    { name: 'Accountability', desc: 'Meticulous financial stewarding and measurable field reporting.' },
    { name: 'Service', desc: 'Selfless dedication to uplifting marginalized and crisis-impacted communities.' },
    { name: 'Child Protection', desc: 'Zero-tolerance for abuse, exploitation, or harm against children.' },
    { name: 'Transparency', desc: 'Open verification of programs, audits, and operational channels.' },
    { name: 'Equality', desc: 'Serving all children in need without prejudice to race, creed, or origin.' },
    { name: 'Sustainability', desc: 'Building long-term community resilience beyond temporary relief.' },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-16 sm:py-20 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <Heart className="w-3.5 h-3.5 fill-[#F27D26]" />
            Founded in 2019 • Mutundwe, Kampala
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFCF8]">
            About Ihsan Children's Foundation
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D3] max-w-2xl mx-auto leading-relaxed font-light">
            A child-focused, community-rooted humanitarian organisation dedicated to transforming vulnerable lives across Uganda and underserved regions.
          </p>
        </div>
      </section>

      {/* 1. Our Story & The Meaning of Ihsan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#F27D26] text-xs font-bold uppercase tracking-wider border border-[#E6E2D3]">
              Our Genesis
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3020] tracking-tight">
              Rooted in Faith, Driven by Humanity
            </h2>
            <p className="text-sm sm:text-base text-[#5A5A40] leading-relaxed">
              Ihsan Children's Foundation was established in <strong className="text-[#1A3020]">2019 in Mutundwe, Kampala, Uganda</strong> by <strong className="text-[#1A3020]">Mr Hakimu and Jeremiah</strong>. Witnessing first-hand the severe hardships faced by orphans, street-connected youth, and families in informal settlements and crisis areas, they came together to build a structured, transparent vehicle for relief and empowerment.
            </p>
            
            {/* The Spirit of Ihsan Callout */}
            <div className="p-5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-2">
              <h3 className="text-sm font-bold text-[#1A3020] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F27D26]" />
                The Core Principle of "Ihsan" (إحسان)
              </h3>
              <p className="text-xs sm:text-sm text-[#1A3020] leading-relaxed">
                In classical Arabic and Islamic ethical thought, <em>Ihsan</em> denotes the highest state of virtue: <strong>doing what is beautiful, extending sincere goodness, and striving for absolute excellence</strong>.
              </p>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                For our humanitarian mission, this means every bag of food, every school pack, every clean water well, and every child-protection intervention is executed with the greatest possible care, respect, and dignity.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E6E2D3]">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80"
                alt="Ihsan Children's Foundation field work"
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#FDFCF8]/95 backdrop-blur-md p-4 rounded-2xl border border-[#E6E2D3] text-xs">
                <p className="font-bold text-[#1A3020]">Kampala Headquarters & Regional Outreaches</p>
                <p className="text-[#5A5A40]">Mutundwe • Karamoja • West Nile Refugee Hubs</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="bg-[#F5F2EA] py-16 border-y border-[#E6E2D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-[#FDFCF8] p-8 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F27D26]/15 text-[#F27D26] flex items-center justify-center font-bold">
                <Target className="w-6 h-6 text-[#F27D26]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A3020]">Our Mission</h3>
              <p className="text-sm text-[#5A5A40] leading-relaxed">
                To defend, nurture, and empower vulnerable children, refugees, and marginalized families through sustainable education support, clean water access, food security, healthcare, and rapid humanitarian emergency response.
              </p>
            </div>

            <div className="bg-[#FDFCF8] p-8 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1A3020]/10 text-[#1A3020] flex items-center justify-center font-bold">
                <Eye className="w-6 h-6 text-[#1A3020]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A3020]">Our Vision</h3>
              <p className="text-sm text-[#5A5A40] leading-relaxed">
                An East Africa and global community where every child, regardless of socio-economic status or displacement, lives with safety, dignity, quality education, and the opportunity to realize their full potential.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our 9 Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#1A3020] text-xs font-bold uppercase tracking-wider border border-[#E6E2D3]">
            Ethical Pillars
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3020] tracking-tight">
            Our 9 Foundational Values
          </h2>
          <p className="text-sm text-[#5A5A40]">
            These guiding principles direct all operational policies, staff interactions, and program deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#FDFCF8] rounded-2xl border border-[#E6E2D3] shadow-2xs hover:border-[#F27D26] hover:shadow-md transition-all space-y-2"
            >
              <div className="flex items-center gap-2 text-[#1A3020]">
                <CheckCircle2 className="w-4 h-4 text-[#F27D26]" />
                <h3 className="text-sm font-bold">{val.name}</h3>
              </div>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Founders Section */}
      <section className="bg-[#F5F2EA] py-16 border-y border-[#E6E2D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDFCF8] text-[#F27D26] text-xs font-bold uppercase tracking-wider border border-[#E6E2D3]">
              Leadership & Governance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3020] tracking-tight">
              Our Founders
            </h2>
            <p className="text-sm text-[#5A5A40]">
              Co-founded in 2019 in Mutundwe, Kampala by Mr Hakimu and Jeremiah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((f) => (
              <div
                key={f.id}
                className="bg-[#FDFCF8] rounded-3xl overflow-hidden border border-[#E6E2D3] shadow-sm p-6 sm:p-8 space-y-4 text-center sm:text-left flex flex-col sm:flex-row gap-6 items-center"
              >
                <img
                  src={f.photo}
                  alt={f.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-[#F27D26] shrink-0"
                />
                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3020]">{f.name}</h3>
                    <span className="text-xs font-bold text-[#F27D26] uppercase tracking-wider bg-[#F5F2EA] border border-[#E6E2D3] px-2 py-0.5 rounded-md">
                      {f.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5A40] leading-relaxed">
                    {f.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Governance & Team Note */}
          <div className="mt-12 max-w-2xl mx-auto bg-[#FDFCF8] p-6 rounded-2xl border border-[#E6E2D3] text-center space-y-2">
            <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">
              Board of Trustees & Community Advisory Counsel
            </h3>
            <p className="text-xs text-[#5A5A40] leading-relaxed">
              Our foundation operates under regular community consultative reviews with local educators, village elders, and safeguarding specialists. Detailed profiles can be updated via the admin portal.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3020]">
          Join Our Mission in Uganda
        </h2>
        <p className="text-sm text-[#5A5A40] max-w-xl mx-auto">
          Whether through charitable donations, volunteer placement, or institutional partnership, your support helps us protect vulnerable children.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenDonate}
            className="px-6 py-3 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Donate Now
          </button>
          <button
            onClick={onOpenVolunteer}
            className="px-6 py-3 bg-[#1A3020] hover:bg-[#24422c] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Become a Volunteer
          </button>
          <button
            onClick={() => onNavigate('transparency')}
            className="px-5 py-3 bg-[#F5F2EA] hover:bg-[#E6E2D3] text-[#1A3020] font-semibold text-xs rounded-xl border border-[#E6E2D3] transition-all cursor-pointer"
          >
            View Transparency & Policies
          </button>
        </div>
      </section>

    </div>
  );
};
