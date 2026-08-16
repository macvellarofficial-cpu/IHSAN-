import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  UtensilsCrossed, 
  Droplets, 
  Truck, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Program, Project, CurrencyCode } from '../types';

interface ProgramsPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onOpenDonate: (programName?: string) => void;
  onOpenProjectDetail: (project: Project) => void;
  programs: Program[];
  projects: Project[];
  currency: CurrencyCode;
  initialCategory?: string;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onOpenDonate,
  onOpenProjectDetail,
  programs,
  projects,
  currency,
  initialCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');

  const categories = [
    { id: 'all', label: 'All 8 Programs' },
    { id: 'child_protection', label: 'Child Protection' },
    { id: 'education', label: 'Education Support' },
    { id: 'food_security', label: 'Food Security' },
    { id: 'emergency_relief', label: 'Emergency Relief' },
    { id: 'health', label: 'Community Health' },
    { id: 'clean_water', label: 'Clean Water (WASH)' },
    { id: 'refugees', label: 'Refugee Support' },
    { id: 'seasonal_aid', label: 'Seasonal & Winter Aid' },
  ];

  const filteredPrograms = selectedCategory === 'all'
    ? programs
    : programs.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-16 sm:py-20 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
            Humanitarian Pillars
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFCF8]">
            Our 8 Humanitarian Programs
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D3] max-w-2xl mx-auto leading-relaxed font-light">
            Delivering holistic, child-centered interventions that tackle immediate crises while building enduring community resilience.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <Filter className="w-4 h-4 text-[#5A5A40] shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1A3020] text-[#FDFCF8] shadow-sm'
                  : 'bg-[#F5F2EA] hover:bg-[#E6E2D3] text-[#5A5A40] border border-[#E6E2D3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Programs Listing */}
        <div className="space-y-12">
          {filteredPrograms.map((prog, index) => {
            const isEven = index % 2 === 0;
            const relatedProjects = projects.filter(p => p.category === prog.category);
            const objectivesList = (prog as any).objectives || prog.keyObjectives || prog.detailedScope || [];

            return (
              <div
                key={prog.id}
                id={prog.category}
                className="bg-[#FDFCF8] rounded-3xl overflow-hidden border border-[#E6E2D3] shadow-sm p-6 sm:p-8 lg:p-10 transition-all hover:border-[#F27D26]"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
                  
                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E6E2D3]">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-72 sm:h-80 object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#1A3020]/90 backdrop-blur-xs text-[#F27D26] text-[11px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider border border-[#F27D26]/30">
                        {prog.category.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3020] tracking-tight">
                        {prog.title}
                      </h2>
                      <p className="text-xs font-bold text-[#F27D26] uppercase tracking-wide">
                        {prog.tagline || `Target: Vulnerable children & families`}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Objectives / Activities */}
                    {objectivesList.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">
                          Key Activities & Objectives
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {objectivesList.map((obj: string, i: number) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-[#5A5A40] bg-[#F5F2EA] p-2.5 rounded-xl border border-[#E6E2D3]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26] shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Projects Teaser if any */}
                    {relatedProjects.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider">Active Field Project: </span>
                        {relatedProjects.map(rp => (
                          <button
                            key={rp.id}
                            onClick={() => onOpenProjectDetail(rp)}
                            className="inline-flex items-center gap-1 text-xs text-[#1A3020] font-semibold underline hover:text-[#F27D26] ml-1 mr-2 cursor-pointer"
                          >
                            {rp.title}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Program Actions */}
                    <div className="pt-4 border-t border-[#E6E2D3] flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onOpenDonate(prog.title)}
                        className="px-6 py-2.5 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>Support This Program</span>
                      </button>

                      <button
                        onClick={() => onNavigate('contact', { subject: `Inquiry regarding ${prog.title}` })}
                        className="px-4 py-2.5 bg-[#F5F2EA] hover:bg-[#E6E2D3] text-[#1A3020] font-semibold text-xs rounded-xl border border-[#E6E2D3] transition-colors cursor-pointer"
                      >
                        Partner on this Program
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Child Safeguarding Commitment footer bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-6 bg-[#F5F2EA] rounded-3xl border border-[#E6E2D3] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#1A3020] flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F27D26]" />
              Child Safeguarding Across All Programs
            </h3>
            <p className="text-xs text-[#5A5A40]">
              Every staff member, volunteer, and field partner undergoes safeguarding screening and pledges adherence to our Child Protection Charter.
            </p>
          </div>
          <button
            onClick={() => onNavigate('safeguarding')}
            className="px-4 py-2 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            View Safeguarding Policy
          </button>
        </div>
      </section>

    </div>
  );
};
