import React, { useState } from 'react';
import { 
  MapPin, 
  Globe2, 
  Compass, 
  Users, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Project, CurrencyCode } from '../types';

interface WhereWeWorkPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onOpenDonate: (fundCategory?: string) => void;
  projects: Project[];
  currency: CurrencyCode;
}

export const WhereWeWorkPage: React.FC<WhereWeWorkPageProps> = ({
  onNavigate,
  onOpenDonate,
  projects,
  currency,
}) => {
  const [selectedHubId, setSelectedHubId] = useState<string>('kampala');

  const hubs = [
    {
      id: 'kampala',
      name: 'Kampala & Greater Central Uganda',
      tag: 'Headquarters & Urban Relief Hub',
      coords: { x: '50%', y: '68%' },
      location: 'Mutundwe, Rubaga Division, Kampala',
      overview: 'Our primary operational secretariat and urban child welfare desks. We conduct regular scholastic kit distributions, orphan and street-connected youth rehabilitation, and emergency nutritional hampers for vulnerable child-headed households.',
      keyActivities: [
        'Urban child protection & legal aid referrals',
        'Direct scholastic supply packaging & delivery',
        'Emergency food hampers for single mothers & orphans',
        'Mutundwe community training & youth skills center'
      ],
      activeProjectsCount: projects.filter(p => p.location.includes('Kampala') || p.location.includes('Mutundwe')).length || 2,
    },
    {
      id: 'karamoja',
      name: 'Karamoja Sub-Region (North-Eastern Uganda)',
      tag: 'Drought & Malnutrition Response',
      coords: { x: '72%', y: '28%' },
      location: 'Kotido, Moroto & Kaabong Districts',
      overview: 'Arid and severely food-insecure communities facing cyclical drought, livestock loss, and chronic childhood malnutrition. Ihsan operates emergency mobile feeding drives and community clean water borehole assessments.',
      keyActivities: [
        'Therapeutic fortified porridge distribution in manyattas',
        'Clean water point assessment & rehabilitation',
        'Child malnutrition monitoring & clinic triage',
        'Seasonal emergency food grain relief'
      ],
      activeProjectsCount: projects.filter(p => p.location.includes('Karamoja')).length || 1,
    },
    {
      id: 'west_nile',
      name: 'West Nile & Refugee Host Communities',
      tag: 'Displaced Children & Cross-Border Corridors',
      coords: { x: '25%', y: '20%' },
      location: 'Yumbe (Bidi Bidi corridor) & Adjumani Districts',
      overview: 'Supporting South Sudanese and Congolese refugee children and vulnerable host families with transitional learning spaces, mental health & psychosocial circles, and essential hygiene kits.',
      keyActivities: [
        'Safe learning space materials & stationery',
        'Psychosocial support & trauma-informed play circles',
        'Menstrual hygiene & dignity kits for teenage girls',
        'Community peacebuilding & inter-faith cohesion'
      ],
      activeProjectsCount: projects.filter(p => p.location.includes('Refugee') || p.location.includes('Yumbe')).length || 1,
    },
    {
      id: 'northern_uganda',
      name: 'Northern & Eastern Uganda Corridors',
      tag: 'Post-Conflict Recovery & Health Outreaches',
      coords: { x: '45%', y: '35%' },
      location: 'Gulu, Pader & Soroti Districts',
      overview: 'Community health clinics, clean water projects, and vocational youth apprenticeships designed to break multi-generational poverty cycles.',
      keyActivities: [
        'Rural school sanitary facilities (latrines & handwash)',
        'Mobile health and deworming drives for pupils',
        'Community agricultural seed & tool distribution'
      ],
      activeProjectsCount: 1,
    },
  ];

  const currentHub = hubs.find(h => h.id === selectedHubId) || hubs[0];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-16 sm:py-20 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <Compass className="w-3.5 h-3.5 text-[#F27D26]" />
            Field Operations Map
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFCF8]">
            Where We Work in Uganda & Beyond
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D3] max-w-2xl mx-auto leading-relaxed font-light">
            From our head office in Mutundwe, Kampala to the most remote drought-impacted communities in Karamoja and refugee host settlements.
          </p>
        </div>
      </section>

      {/* Main Interactive Geographic Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Map Representation Canvas */}
          <div className="lg:col-span-6 bg-[#1A3020] rounded-3xl p-6 sm:p-8 border border-[#E6E2D3] text-white relative shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#FDFCF8] flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#F27D26]" />
                  Uganda Operational Map
                </h3>
                <p className="text-xs text-[#E6E2D3]">Click any operational hub to view field details</p>
              </div>
              <span className="text-[11px] font-mono bg-[#24422c] text-[#F27D26] border border-[#F27D26]/30 px-2 py-1 rounded-md">
                HQ: Kampala (0.3136° N, 32.5811° E)
              </span>
            </div>

            {/* Simulated Geographic Canvas */}
            <div className="relative w-full h-80 sm:h-96 bg-[#142619] rounded-2xl border border-[#E6E2D3]/20 overflow-hidden flex items-center justify-center p-4">
              
              {/* Country Silhouette Placeholder Graphic */}
              <svg className="w-full h-full opacity-30 text-[#F27D26]" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M120 80 Q 200 40, 280 70 T 340 180 T 310 320 T 180 360 T 90 280 T 80 150 Z" fill="rgba(242, 125, 38, 0.08)" />
                <path d="M220 270 Q 260 290, 240 340 T 180 330 Z" fill="rgba(90, 90, 64, 0.2)" />
              </svg>

              {/* Interactive Hub Hotspots */}
              {hubs.map((hub) => {
                const isSelected = selectedHubId === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHubId(hub.id)}
                    style={{ left: hub.coords.x, top: hub.coords.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 group cursor-pointer ${
                      isSelected
                        ? 'bg-[#F27D26] ring-8 ring-[#F27D26]/30 scale-125 z-20'
                        : 'bg-[#24422c] hover:bg-[#1A3020] ring-4 ring-[#E6E2D3]/20 z-10'
                    }`}
                  >
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-white fill-white' : 'text-[#E6E2D3]'}`} />
                    
                    {/* Floating Label */}
                    <span className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md transition-all ${
                      isSelected ? 'bg-[#F27D26] text-white' : 'bg-[#1A3020]/90 text-[#E6E2D3] opacity-80 group-hover:opacity-100'
                    }`}>
                      {hub.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Hub Navigation Pills */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {hubs.map(h => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHubId(h.id)}
                  className={`p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                    selectedHubId === h.id
                      ? 'bg-[#24422c] text-[#F27D26] font-bold border border-[#F27D26]/50'
                      : 'bg-[#1A3020]/80 text-[#E6E2D3] border border-[#E6E2D3]/15 hover:bg-[#24422c]/50'
                  }`}
                >
                  <div className="font-bold leading-tight">{h.name}</div>
                  <div className="text-[10px] text-[#E6E2D3]/70 mt-0.5">{h.tag}</div>
                </button>
              ))}
            </div>

          </div>

          {/* Right: Selected Hub Deep Dive */}
          <div className="lg:col-span-6 bg-[#FDFCF8] p-6 sm:p-8 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-[#F5F2EA] text-[#F27D26] text-xs font-bold rounded-full uppercase tracking-wider border border-[#E6E2D3]">
                {currentHub.tag}
              </span>
              <h2 className="text-2xl font-extrabold text-[#1A3020]">
                {currentHub.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#5A5A40] font-semibold">
                <MapPin className="w-4 h-4 text-[#F27D26]" />
                <span>{currentHub.location}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed bg-[#F5F2EA] p-4 rounded-2xl border border-[#E6E2D3]">
              {currentHub.overview}
            </p>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">
                Core Humanitarian Focus in this Region
              </h3>
              <div className="space-y-2">
                {currentHub.keyActivities.map((act, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#5A5A40]">
                    <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E2D3] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onOpenDonate(currentHub.name)}
                className="px-6 py-3 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Support Work in {currentHub.name.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-bold text-[#1A3020] hover:text-[#F27D26] cursor-pointer"
              >
                View Active Regional Projects →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* East Africa & Regional Cross-Border Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 bg-[#1A3020] rounded-3xl text-white border border-[#E6E2D3] shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-bold uppercase tracking-wider border border-[#F27D26]/30">
            Regional Humanitarian Vision
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FDFCF8]">
            Cross-Border Refugee Corridors & Future Expansion
          </h2>
          <p className="text-xs sm:text-sm text-[#E6E2D3] leading-relaxed max-w-3xl font-light">
            While rooted in Uganda, Ihsan Children's Foundation monitors emergency displacement across the Horn of Africa and Great Lakes corridors. We establish humanitarian partnerships to ensure refugee children crossing borders retain access to clean water, food, and protective safe spaces.
          </p>
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => onNavigate('get-involved')}
              className="px-5 py-2.5 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Propose a Regional Partnership
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
