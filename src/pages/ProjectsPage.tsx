import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Project, CurrencyCode } from '../types';
import { formatCurrency } from '../lib/storage';
import { AnimatedProgressBar } from '../components/common/AnimatedProgressBar';

interface ProjectsPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onOpenDonate: (projectName?: string) => void;
  onOpenProjectDetail: (project: Project) => void;
  projects: Project[];
  currency: CurrencyCode;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onOpenDonate,
  onOpenProjectDetail,
  projects,
  currency,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'urgent' | 'ongoing' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.situation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all'
      ? true
      : statusFilter === 'urgent'
      ? p.urgentAppeal
      : statusFilter === 'ongoing'
      ? p.status === 'ongoing'
      : p.status === 'completed' || p.status === 'fully_funded';

    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter || p.programCategory === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-16 sm:py-20 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <Sparkles className="w-3.5 h-3.5" />
            Field Operations & Appeals
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFCF8]">
            Humanitarian Projects & Appeals
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D3] max-w-2xl mx-auto leading-relaxed font-light">
            Support targeted interventions across Kampala, Karamoja, and refugee settlements with complete transparency.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Filter Controls Bar */}
        <div className="bg-[#FDFCF8] p-4 sm:p-6 rounded-2xl border border-[#E6E2D3] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#5A5A40] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects, locations..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#F5F2EA] border border-[#E6E2D3] rounded-xl text-xs text-[#1A3020] focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'all' ? 'bg-[#1A3020] text-[#FDFCF8]' : 'bg-[#F5F2EA] text-[#5A5A40] border border-[#E6E2D3] hover:bg-[#E6E2D3]'
                }`}
              >
                All Projects ({projects.length})
              </button>
              <button
                onClick={() => setStatusFilter('urgent')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  statusFilter === 'urgent' ? 'bg-rose-700 text-white' : 'bg-[#F5F2EA] text-[#5A5A40] border border-[#E6E2D3] hover:bg-[#E6E2D3]'
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                Urgent Appeals
              </button>
              <button
                onClick={() => setStatusFilter('ongoing')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'ongoing' ? 'bg-[#1A3020] text-white' : 'bg-[#F5F2EA] text-[#5A5A40] border border-[#E6E2D3] hover:bg-[#E6E2D3]'
                }`}
              >
                Ongoing
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'completed' ? 'bg-[#5A5A40] text-white' : 'bg-[#F5F2EA] text-[#5A5A40] border border-[#E6E2D3] hover:bg-[#E6E2D3]'
                }`}
              >
                Completed
              </button>
            </div>

          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#F5F2EA] rounded-3xl border border-[#E6E2D3] space-y-3">
            <p className="text-base font-bold text-[#1A3020]">No projects match your filter criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setStatusFilter('all'); setCategoryFilter('all'); }}
              className="text-xs font-bold text-[#F27D26] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => {
              const pct = Math.min(100, Math.round((proj.amountRaised / (proj.amountRequired || 1)) * 100));
              return (
                <div
                  key={proj.id}
                  className="bg-[#FDFCF8] rounded-3xl overflow-hidden border border-[#E6E2D3] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={proj.heroImage}
                        alt={proj.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {proj.urgentAppeal && (
                          <span className="px-2.5 py-0.5 rounded-md bg-rose-700 text-white text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                            Urgent Appeal
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-md bg-[#1A3020]/90 backdrop-blur-xs text-[#FDFCF8] text-[10px] font-bold uppercase border border-[#E6E2D3]/30">
                          {proj.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-[#F27D26] font-semibold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.location}</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1A3020] leading-snug">
                        {proj.title}
                      </h3>

                      <p className="text-xs text-[#5A5A40] line-clamp-3 leading-relaxed">
                        {proj.situation}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[#5A5A40] text-[11px]">Raised: </span>
                            <strong className="text-[#1A3020] font-bold">{formatCurrency(proj.amountRaised, currency)}</strong>
                          </div>
                          <div className="text-right">
                            <span className="text-[#5A5A40] text-[11px]">Goal: </span>
                            <strong className="text-[#5A5A40] font-bold">{formatCurrency(proj.amountRequired, currency)}</strong>
                          </div>
                        </div>

                        <AnimatedProgressBar
                          percentage={pct}
                          heightClass="h-2.5"
                          trackBgClass="bg-[#F5F2EA] border border-[#E6E2D3]"
                          barColorClass="bg-[#F27D26]"
                          duration={1.2}
                          delay={0.1}
                        />

                        <div className="flex items-center justify-between text-[10px] text-[#5A5A40]">
                          <span>{pct}% Funded</span>
                          <span>{proj.verifiedData ? 'Verified Ledger' : 'Target'}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 flex items-center justify-between gap-2 border-t border-[#E6E2D3] mt-2">
                    <button
                      onClick={() => onOpenProjectDetail(proj)}
                      className="text-xs font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Story & Budget</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenDonate(proj.title)}
                      className="px-4 py-2 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Donate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

    </div>
  );
};
