import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  BookOpen, 
  Droplets, 
  UtensilsCrossed, 
  Truck, 
  Users, 
  HeartHandshake, 
  Sparkles, 
  FileText, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Smile,
  Globe2,
  Lock
} from 'lucide-react';
import { Project, Program, Story, BlogPost, ImpactMetric, SiteSettings, CurrencyCode } from '../types';
import { formatCurrency } from '../lib/storage';
import { AnimatedProgressBar } from '../components/common/AnimatedProgressBar';

interface HomePageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onOpenDonate: (fundCategory?: string) => void;
  onOpenVolunteer: () => void;
  onOpenProjectDetail: (project: Project) => void;
  onOpenStoryDetail: (story: Story) => void;
  onOpenPostDetail: (post: BlogPost) => void;
  projects: Project[];
  programs: Program[];
  stories: Story[];
  posts: BlogPost[];
  impactMetrics: ImpactMetric[];
  siteSettings: SiteSettings;
  currency: CurrencyCode;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenDonate,
  onOpenVolunteer,
  onOpenProjectDetail,
  onOpenStoryDetail,
  onOpenPostDetail,
  projects,
  programs,
  stories,
  posts,
  impactMetrics,
  siteSettings,
  currency,
}) => {
  const featuredAppeal = projects.find(p => p.urgentAppeal) || projects[0];
  const activeProjectsList = projects.slice(0, 3);
  const featuredStories = stories.slice(0, 2);
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="space-y-0">
      
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="relative bg-[#1A3020] text-white overflow-hidden bg-islamic-pattern pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
        {/* Subtle decorative glow accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F27D26]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#2C4D35]/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C4D35] border border-[#E6E2D3]/20 text-[#F27D26] text-xs font-bold uppercase tracking-wider shadow-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>Mutundwe • Kampala • Uganda</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Giving Children Hope. <br className="hidden sm:inline" />
                <span className="text-[#F27D26] underline decoration-[#F27D26]/40 decoration-4">
                  Building Stronger Communities.
                </span>
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-[#E6E2D3]/90 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Ihsan Children's Foundation works to protect vulnerable children and support underserved communities through education, food security, healthcare, clean water and humanitarian relief.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-donate-now-btn"
                  onClick={() => onOpenDonate()}
                  className="w-full sm:w-auto px-8 py-4 bg-[#F27D26] hover:bg-[#d86c1e] text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>DONATE NOW</span>
                </button>

                <button
                  id="hero-our-work-btn"
                  onClick={() => onNavigate('programs')}
                  className="w-full sm:w-auto px-7 py-4 bg-[#2C4D35] hover:bg-[#386043] text-white font-bold text-sm uppercase tracking-wider rounded-full border border-[#E6E2D3]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <span>OUR WORK</span>
                  <ArrowRight className="w-4 h-4 text-[#F27D26]" />
                </button>

                <button
                  id="hero-volunteer-btn"
                  onClick={onOpenVolunteer}
                  className="w-full sm:w-auto px-6 py-4 bg-transparent hover:bg-white/10 text-[#E6E2D3] font-semibold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4 text-[#F27D26]" />
                  <span>BECOME A VOLUNTEER</span>
                </button>
              </div>

              {/* Micro Trust Proof */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#E6E2D3]/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26]" />
                  <span>Founded in Uganda in 2019</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26]" />
                  <span>Child Protection Charter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26]" />
                  <span>100% Direct Field Impact</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2C4D35] bg-[#142619]">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80"
                  alt="Ugandan children learning and community support"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142619] via-transparent to-transparent"></div>

                {/* Floating Micro Badge on Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#FDFCF8]/95 backdrop-blur-md p-4 rounded-2xl text-[#1A3020] border border-[#E6E2D3] shadow-lg">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#F27D26] uppercase tracking-wider bg-[#F27D26]/10 px-2 py-0.5 rounded-md">
                      Featured Field Relief
                    </span>
                    <span className="text-[11px] text-[#5A5A40] font-medium">Karamoja & Kampala</span>
                  </div>
                  <p className="text-xs font-bold text-[#1A3020] leading-tight">
                    Emergency Food & Clean Water Distributions Underway
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] pt-2 border-t border-[#E6E2D3]">
                    <span className="text-[#1A3020] font-bold">100% Volunteer Driven</span>
                    <button
                      onClick={() => onOpenDonate('Food Security')}
                      className="text-[#F27D26] font-bold hover:underline"
                    >
                      Support Relief →
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TRUST / CREDIBILITY BAR
          ========================================================================= */}
      <section className="bg-[#F5F2EA] border-y border-[#E6E2D3] py-6 sm:py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            
            <div className="text-center p-2">
              <span className="text-xs uppercase font-bold text-[#5A5A40] tracking-wider">Established</span>
              <p className="text-base sm:text-lg font-bold text-[#1A3020]">Founded in 2019</p>
              <p className="text-[11px] text-[#5A5A40]">Mutundwe, Kampala</p>
            </div>

            <div className="text-center p-2 border-l border-[#E6E2D3]">
              <span className="text-xs uppercase font-bold text-[#5A5A40] tracking-wider">Legal Entity</span>
              <p className="text-base sm:text-lg font-bold text-[#1A3020]">Uganda-Based NGO</p>
              <p className="text-[11px] text-[#5A5A40]">Humanitarian Organisation</p>
            </div>

            <div className="text-center p-2 border-l border-[#E6E2D3]">
              <span className="text-xs uppercase font-bold text-[#5A5A40] tracking-wider">Primary Mandate</span>
              <p className="text-base sm:text-lg font-bold text-[#1A3020]">Child-Focused Programs</p>
              <p className="text-[11px] text-[#5A5A40]">Protection & Safeguarding</p>
            </div>

            <div className="text-center p-2 border-l border-[#E6E2D3]">
              <span className="text-xs uppercase font-bold text-[#5A5A40] tracking-wider">Operational Model</span>
              <p className="text-base sm:text-lg font-bold text-[#1A3020]">Community-Led Support</p>
              <p className="text-[11px] text-[#5A5A40]">Grassroots Engagement</p>
            </div>

          </div>

          {/* Registration Number Transparent Bar */}
          <div className="mt-4 pt-4 border-t border-[#E6E2D3] text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDFCF8] rounded-full border border-[#E6E2D3] text-[11px] text-[#1A3020]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>Uganda NGO Registration Number: <strong className="font-mono text-[#1A3020]">{siteSettings.ngoRegistrationNumber}</strong></span>
              <button 
                onClick={() => onNavigate('transparency')}
                className="text-[#F27D26] underline font-bold hover:text-[#d86c1e] ml-1"
              >
                View Regulatory Dossier
              </button>
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHO WE ARE (Compassion in Action)
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FDFCF8] bg-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left image cluster */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E6E2D3]">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80"
                  alt="Compassionate community support in Uganda"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#1A3020] text-white p-5 rounded-2xl shadow-xl max-w-xs border border-[#2C4D35]">
                <p className="text-xs font-bold text-[#F27D26] uppercase tracking-wider mb-1">
                  Co-Founders (2019)
                </p>
                <p className="text-sm font-semibold leading-tight text-[#E6E2D3]">
                  Established by Mr Hakimu and Jeremiah to uplift vulnerable children.
                </p>
              </div>
            </div>

            {/* Right Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#1A3020] border border-[#E6E2D3] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
                Who We Are
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A3020] tracking-tight">
                Compassion in Action
              </h2>

              <p className="text-base text-[#5A5A40] leading-relaxed">
                Ihsan Children's Foundation was established in 2019 by <strong className="text-[#1A3020]">Mr Hakimu and Jeremiah</strong> with the goal of improving the lives of children and disadvantaged communities across Uganda and refugee-hosting areas.
              </p>

              <div className="p-5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-2">
                <h4 className="text-sm font-bold text-[#1A3020] flex items-center gap-2">
                  <span className="text-[#F27D26] font-extrabold text-base">إحسان</span>
                  The Foundation of "Ihsan"
                </h4>
                <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
                  In classical tradition, <em>Ihsan</em> signifies the spiritual principle of <strong>excellence, sincere kindness, and doing what is beautiful</strong>. 
                  In our humanitarian practice, it means serving every child with pristine accountability, dignified protection, and unconditional love.
                </p>
              </div>

              {/* Mission / Vision / Values Quick Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-white rounded-2xl border border-[#E6E2D3] shadow-xs">
                  <h4 className="text-xs font-bold text-[#F27D26] uppercase tracking-wider mb-1">Our Mission</h4>
                  <p className="text-xs text-[#5A5A40] leading-normal">
                    Protect vulnerable children through education, food security, healthcare, and humanitarian relief.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-[#E6E2D3] shadow-xs">
                  <h4 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider mb-1">Our Vision</h4>
                  <p className="text-xs text-[#5A5A40] leading-normal">
                    A society where every child grows up safe, nourished, educated, and filled with hope.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-[#E6E2D3] shadow-xs">
                  <h4 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider mb-1">Our Values</h4>
                  <p className="text-xs text-[#5A5A40] leading-normal">
                    Compassion, Integrity, Dignity, Accountability, Child Protection & Transparency.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors"
                >
                  <span>Learn more about our founders and story</span>
                  <ChevronRight className="w-4 h-4 text-[#F27D26]" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. OUR PROGRAMS
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#E6E2D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#F27D26] border border-[#E6E2D3] text-xs font-bold uppercase tracking-wider">
              Core Humanitarian Verticals
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A3020] tracking-tight">
              Our 8 Humanitarian Programs
            </h2>
            <p className="text-sm sm:text-base text-[#5A5A40] leading-relaxed">
              Comprehensive, child-centered initiatives addressing root causes of vulnerability and delivering immediate life-saving relief.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="group bg-[#FDFCF8] hover:bg-white rounded-2xl overflow-hidden border border-[#E6E2D3] hover:border-[#F27D26] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A3020]/80 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2.5 left-3 text-[11px] font-bold text-[#F27D26] uppercase tracking-wider">
                      {prog.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="text-base font-bold text-[#1A3020] group-hover:text-[#F27D26] transition-colors leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-[#5A5A40] line-clamp-3 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#E6E2D3] mt-2">
                  <button
                    onClick={() => onNavigate('programs', { category: prog.category })}
                    className="text-xs font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors flex items-center gap-1"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#F27D26]" />
                  </button>

                  <button
                    onClick={() => onOpenDonate(prog.title)}
                    className="px-3.5 py-1.5 bg-[#F27D26] hover:bg-[#d86c1e] text-white text-xs font-bold rounded-full transition-colors"
                  >
                    Donate
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('programs')}
              className="px-6 py-3 bg-[#1A3020] hover:bg-[#2C4D35] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full shadow-md transition-colors inline-flex items-center gap-2"
            >
              <span>Explore All Program Details & Objectives</span>
              <ArrowRight className="w-4 h-4 text-[#F27D26]" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. FEATURED EMERGENCY APPEAL
          ========================================================================= */}
      {featuredAppeal && (
        <section className="py-16 bg-[#1A3020] text-white bg-islamic-pattern border-y border-[#2C4D35] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-[#2C4D35] rounded-3xl p-6 sm:p-10 border border-[#E6E2D3]/20 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left details */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F27D26] text-white text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Urgent Humanitarian Appeal
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {featuredAppeal.title}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-[#F27D26] font-semibold">
                    <MapPin className="w-4 h-4" />
                    <span>{featuredAppeal.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#E6E2D3]/90 leading-relaxed">
                    {featuredAppeal.situation}
                  </p>

                  {/* Progress info */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#E6E2D3]">
                        Raised: <strong className="text-white text-sm">{formatCurrency(featuredAppeal.amountRaised, currency)}</strong>
                      </span>
                      <span className="text-[#E6E2D3]">
                        Goal: <strong className="text-white text-sm">{formatCurrency(featuredAppeal.amountRequired, currency)}</strong>
                      </span>
                    </div>

                    <AnimatedProgressBar
                      percentage={(featuredAppeal.amountRaised / (featuredAppeal.amountRequired || 1)) * 100}
                      heightClass="h-3.5"
                      trackBgClass="bg-[#142619] border border-[#E6E2D3]/20"
                      barColorClass="bg-[#F27D26]"
                      duration={1.4}
                      delay={0.2}
                    />
                    <div className="flex items-center justify-between text-[11px] text-[#E6E2D3]/80 pt-0.5">
                      <span>{Math.min(100, Math.round((featuredAppeal.amountRaised / (featuredAppeal.amountRequired || 1)) * 100))}% Funded</span>
                      <span className="text-[#F27D26] font-semibold">Direct Field Allocation</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onOpenDonate(featuredAppeal.title)}
                      className="px-6 py-3 bg-[#F27D26] hover:bg-[#d86c1e] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-all flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Donate to this Emergency Appeal</span>
                    </button>
                    <button
                      onClick={() => onOpenProjectDetail(featuredAppeal)}
                      className="px-5 py-3 bg-[#1A3020] hover:bg-[#25422e] text-[#E6E2D3] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#E6E2D3]/30 transition-colors"
                    >
                      View Appeal Details
                    </button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#E6E2D3]/30">
                    <img
                      src={featuredAppeal.heroImage}
                      alt={featuredAppeal.title}
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          6. WHERE WE WORK (Uganda & Regional Focus)
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FDFCF8] bg-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#1A3020] border border-[#E6E2D3] text-xs font-bold uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-[#F27D26]" />
              Geographic Presence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A3020] tracking-tight">
              Where We Work
            </h2>
            <p className="text-sm sm:text-base text-[#5A5A40] leading-relaxed">
              Operating directly from our headquarters in Mutundwe, Kampala to Northern Uganda, refugee-hosting communities, and cross-border corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Hub 1: Kampala */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] text-[#F27D26] flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#F27D26] uppercase tracking-wider bg-[#F27D26]/10 px-2 py-0.5 rounded-md">
                Headquarters & Central Hub
              </span>
              <h3 className="text-lg font-bold text-[#1A3020]">Kampala & Suburbs</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Mutundwe head office coordinating urban child protection desks, vulnerable school kits, and community food parcel distribution across Rubaga and greater Kampala.
              </p>
              <div className="text-xs text-[#1A3020] font-bold pt-2 border-t border-[#E6E2D3]">
                Active Projects: School Supplies & Family Nutrition
              </div>
            </div>

            {/* Hub 2: Karamoja */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] text-[#F27D26] flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#F27D26] uppercase tracking-wider bg-[#F27D26]/10 px-2 py-0.5 rounded-md">
                Northern Uganda Relief
              </span>
              <h3 className="text-lg font-bold text-[#1A3020]">Karamoja Sub-Region</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Emergency drought response, therapeutic flour distribution, and child nutrition monitoring in remote manyattas across Kotido and Moroto districts.
              </p>
              <div className="text-xs text-[#1A3020] font-bold pt-2 border-t border-[#E6E2D3]">
                Active Projects: Drought Relief & Malnutrition Screening
              </div>
            </div>

            {/* Hub 3: Refugee Settlements */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] text-[#1A3020] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#1A3020] uppercase tracking-wider bg-[#F5F2EA] px-2 py-0.5 rounded-md border border-[#E6E2D3]">
                Displaced Families
              </span>
              <h3 className="text-lg font-bold text-[#1A3020]">Refugee Settlements</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Safe learning environments, psychosocial circles, and emergency basic kits in West Nile settlements (Yumbe, Adjumani) and South Sudan border crossings.
              </p>
              <div className="text-xs text-[#1A3020] font-bold pt-2 border-t border-[#E6E2D3]">
                Active Projects: Safe Spaces & School Access
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('where-we-work')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors"
            >
              <span>Explore full interactive map and field locations</span>
              <ChevronRight className="w-4 h-4 text-[#F27D26]" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. CURRENT PROJECTS
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#E6E2D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#F27D26] border border-[#E6E2D3] text-xs font-bold uppercase tracking-wider">
                Documented Field Initiatives
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A3020] tracking-tight">
                Featured Humanitarian Projects
              </h2>
              <p className="text-sm text-[#5A5A40]">
                Real, verifiable humanitarian projects delivering essential support. All figures managed directly by our administration.
              </p>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="px-5 py-2.5 bg-[#F5F2EA] hover:bg-[#E6E2D3] text-[#1A3020] font-bold text-xs uppercase tracking-wider rounded-full transition-colors shrink-0"
            >
              View All Projects ({projects.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeProjectsList.map((proj) => {
              const pct = Math.min(100, Math.round((proj.amountRaised / (proj.amountRequired || 1)) * 100));
              return (
                <div
                  key={proj.id}
                  className="bg-[#FDFCF8] rounded-2xl overflow-hidden border border-[#E6E2D3] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={proj.heroImage}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-1">
                        {proj.urgentAppeal && (
                          <span className="px-2 py-0.5 rounded-md bg-[#F27D26] text-white text-[10px] font-extrabold uppercase tracking-wider">
                            Urgent Appeal
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-[#1A3020]/90 text-[#E6E2D3] text-[10px] font-bold uppercase">
                          {proj.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-[#F27D26] font-semibold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.location}</span>
                      </div>

                      <h3 className="text-base font-bold text-[#1A3020] leading-snug">
                        {proj.title}
                      </h3>

                      <p className="text-xs text-[#5A5A40] line-clamp-2 leading-relaxed">
                        {proj.situation}
                      </p>

                      {/* Progress */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1A3020]">
                            {formatCurrency(proj.amountRaised, currency)}
                          </span>
                          <span className="text-[#5A5A40] text-[11px]">
                            Goal: {formatCurrency(proj.amountRequired, currency)}
                          </span>
                        </div>
                        <AnimatedProgressBar
                          percentage={pct}
                          heightClass="h-2.5"
                          trackBgClass="bg-[#E6E2D3]"
                          barColorClass="bg-[#F27D26]"
                          duration={1.2}
                          delay={0.15}
                        />
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[10px] text-[#5A5A40] font-medium">Verified Progress</span>
                          <span className="text-[11px] text-[#1A3020] font-bold">{pct}% Funded</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-[#E6E2D3] mt-2">
                    <button
                      onClick={() => onOpenProjectDetail(proj)}
                      className="text-xs font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors"
                    >
                      Details & Updates
                    </button>

                    <button
                      onClick={() => onOpenDonate(proj.title)}
                      className="px-4 py-2 bg-[#F27D26] hover:bg-[#d86c1e] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-colors"
                    >
                      Donate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. OUR IMPACT (Truthful Placeholders / Verified Metrics)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#1A3020] text-white bg-islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C4D35] text-[#F27D26] text-xs font-bold uppercase tracking-wider border border-[#E6E2D3]/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified & Transparent Reporting
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Our Impact in the Field
            </h2>
            <p className="text-xs sm:text-sm text-[#E6E2D3]/80 leading-relaxed">
              We strictly uphold truthfulness: All metrics reflect documented field records or clearly indicated verification audits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((m) => (
              <div
                key={m.id}
                className="bg-[#2C4D35] p-6 rounded-2xl border border-[#E6E2D3]/20 text-center space-y-2 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1A3020] text-[#F27D26] flex items-center justify-center mx-auto mb-2 border border-[#E6E2D3]/20">
                  <Smile className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-mono">
                  {m.value}
                </h3>
                <p className="text-xs font-bold text-[#F27D26] uppercase tracking-wider">
                  {m.label}
                </p>
                <p className="text-[11px] text-[#E6E2D3]/80 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-[#E6E2D3]/80">
            <span>Want to review our full transparency records? </span>
            <button
              onClick={() => onNavigate('transparency')}
              className="text-[#F27D26] font-bold underline hover:text-white"
            >
              Visit Transparency & Audits Page →
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          9. STORIES OF HOPE (Safeguarding & Privacy compliant)
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FDFCF8] bg-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#F27D26] border border-[#E6E2D3] text-xs font-bold uppercase tracking-wider">
              Real Transformations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A3020] tracking-tight">
              Stories of Hope
            </h2>
            <p className="text-sm text-[#5A5A40] leading-relaxed">
              Dignified humanitarian updates showcasing positive impact. In compliance with our Child Safeguarding charter, names are protected.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E6E2D3] shadow-xs hover:shadow-md transition-all p-6 sm:p-8 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#5A5A40]">
                    <span className="font-semibold text-[#F27D26] bg-[#F27D26]/10 px-2.5 py-0.5 rounded-full">
                      {story.category.replace('_', ' ')}
                    </span>
                    <span>{story.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A3020] leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
                    {story.summary}
                  </p>

                  <div className="p-3 bg-[#F5F2EA] rounded-xl border border-[#E6E2D3] text-xs text-[#1A3020]">
                    <strong>Outcome: </strong> {story.impactOutcome}
                  </div>

                  <p className="text-[10px] text-[#5A5A40] italic">
                    {story.safeguardingNotice}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E6E2D3] flex items-center justify-between">
                  <button
                    onClick={() => onOpenStoryDetail(story)}
                    className="text-xs font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors flex items-center gap-1"
                  >
                    <span>Read Full Story</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#F27D26]" />
                  </button>

                  <button
                    onClick={() => onOpenDonate()}
                    className="text-xs font-bold text-[#F27D26] hover:underline"
                  >
                    Support Similar Children
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          10. HOW YOUR DONATION HELPS
          ========================================================================= */}
      <section className="py-16 bg-white border-t border-[#E6E2D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl font-extrabold text-[#1A3020] tracking-tight">
              How Your Charitable Gift is Used
            </h2>
            <p className="text-sm text-[#5A5A40]">
              Clear, transparent conversion of donor generosity into direct on-the-ground support in Uganda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-[#FDFCF8] rounded-2xl border border-[#E6E2D3] space-y-2 text-center">
              <div className="text-2xl font-extrabold text-[#F27D26] font-mono">$25 USD</div>
              <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">Scholastic Learning Kit</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Provides a waterproof backpack, comprehensive notebooks, mathematical sets, and pens for a primary student.
              </p>
            </div>

            <div className="p-6 bg-[#FDFCF8] rounded-2xl border border-[#E6E2D3] space-y-2 text-center">
              <div className="text-2xl font-extrabold text-[#F27D26] font-mono">$50 USD</div>
              <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">Family Food Hamper</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Supplies a full month of dry rations (posho, high-protein beans, enriched cooking oil, and salt) for a vulnerable family.
              </p>
            </div>

            <div className="p-6 bg-[#FDFCF8] rounded-2xl border border-[#E6E2D3] space-y-2 text-center">
              <div className="text-2xl font-extrabold text-[#F27D26] font-mono">$100 USD</div>
              <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">Emergency Relief & Bedding</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Delivers thermal blankets, sleeping mats, hygiene sets, and emergency nutrition to displaced children.
              </p>
            </div>

            <div className="p-6 bg-[#FDFCF8] rounded-2xl border border-[#E6E2D3] space-y-2 text-center">
              <div className="text-2xl font-extrabold text-[#F27D26] font-mono">$250+ USD</div>
              <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">Clean Water Well Share</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Contributes directly to deep community borehole drilling, solar pumping, and clean water access for an entire village.
              </p>
            </div>

          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onOpenDonate()}
              className="px-8 py-3.5 bg-[#F27D26] hover:bg-[#d86c1e] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all inline-flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Make a Gift Today</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. GET INVOLVED
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FDFCF8] bg-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#1A3020] border border-[#E6E2D3] text-xs font-bold uppercase tracking-wider">
              Partnership & Volunteering
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A3020] tracking-tight">
              Get Involved With Ihsan
            </h2>
            <p className="text-sm text-[#5A5A40] leading-relaxed">
              We welcome individuals, community groups, schools, NGOs, and partners to join hands in humanitarian service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D3] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] text-[#F27D26] flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1A3020]">Become a Volunteer</h3>
                <p className="text-xs text-[#5A5A40] leading-relaxed">
                  Join our grassroots mobilizers in Kampala, Northern Uganda, and field hubs. Assist with scholastic drives, health days, and logistics.
                </p>
              </div>
              <button
                onClick={onOpenVolunteer}
                className="w-full py-2.5 bg-[#F5F2EA] hover:bg-[#1A3020] hover:text-white text-[#1A3020] font-bold text-xs uppercase tracking-wider rounded-full transition-colors"
              >
                Apply as Volunteer →
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D3] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] text-[#1A3020] flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1A3020]">Partner With Us</h3>
                <p className="text-xs text-[#5A5A40] leading-relaxed">
                  For community associations, international foundations, and development agencies seeking trusted local execution in Uganda.
                </p>
              </div>
              <button
                onClick={() => onNavigate('get-involved')}
                className="w-full py-2.5 bg-[#F5F2EA] hover:bg-[#1A3020] hover:text-white text-[#1A3020] font-bold text-xs uppercase tracking-wider rounded-full transition-colors"
              >
                Partnership Inquiry →
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D3] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] text-[#F27D26] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1A3020]">Sponsor a Project</h3>
                <p className="text-xs text-[#5A5A40] leading-relaxed">
                  Directly fund a complete village borehole, classroom rehabilitation, or seasonal relief hamper campaign.
                </p>
              </div>
              <button
                onClick={() => onNavigate('get-involved')}
                className="w-full py-2.5 bg-[#F5F2EA] hover:bg-[#1A3020] hover:text-white text-[#1A3020] font-bold text-xs uppercase tracking-wider rounded-full transition-colors"
              >
                Sponsor Project Details →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          12. TRANSPARENCY & ACCOUNTABILITY TEASER
          ========================================================================= */}
      <section className="py-14 bg-white border-y border-[#E6E2D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FDFCF8] rounded-2xl p-6 sm:p-8 border border-[#E6E2D3] flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F27D26] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#F27D26]" />
                Trust & Governance
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A3020]">
                100% Commitment to Financial Transparency & Child Safeguarding
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
                Download our Child Safeguarding Policy, Anti-Fraud Framework, and view our Uganda NGO compliance documentation.
              </p>
            </div>

            <button
              onClick={() => onNavigate('transparency')}
              className="px-6 py-3 bg-[#1A3020] hover:bg-[#2C4D35] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-colors shrink-0 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#F27D26]" />
              <span>Explore Transparency Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. LATEST NEWS & ARTICLES
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FDFCF8] bg-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#F27D26] border border-[#E6E2D3] text-xs font-bold uppercase tracking-wider">
                Field Dispatches
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A3020] tracking-tight">
                Latest News & Foundation Updates
              </h2>
            </div>

            <button
              onClick={() => onNavigate('news-stories')}
              className="text-xs sm:text-sm font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors"
            >
              View All Articles →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onOpenPostDetail(post)}
                className="bg-white rounded-2xl overflow-hidden border border-[#E6E2D3] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#5A5A40]">
                      <span className="font-semibold text-[#F27D26] bg-[#F27D26]/10 px-2 py-0.5 rounded-md">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#5A5A40] line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 text-xs font-bold text-[#1A3020] flex items-center gap-1">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#F27D26]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          14. NEWSLETTER TEASER
          ========================================================================= */}
      {/* (Integrated cleanly within footer and page rhythm) */}

      {/* =========================================================================
          15. FINAL DONATION CTA
          ========================================================================= */}
      <section className="py-20 bg-[#1A3020] text-white bg-islamic-pattern text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          
          <div className="w-16 h-16 rounded-2xl bg-[#F27D26] text-white flex items-center justify-center mx-auto shadow-xl">
            <Heart className="w-8 h-8 fill-white" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Every Child Deserves Safety, Education and Hope.
          </h2>

          <p className="text-base sm:text-lg text-[#E6E2D3]/90 max-w-2xl mx-auto leading-relaxed">
            Together, we can help vulnerable children and communities build safer, healthier and more hopeful futures across Uganda and beyond.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="final-cta-donate-btn"
              onClick={() => onOpenDonate()}
              className="w-full sm:w-auto px-9 py-4 bg-[#F27D26] hover:bg-[#d86c1e] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              DONATE NOW
            </button>

            <button
              id="final-cta-volunteer-btn"
              onClick={onOpenVolunteer}
              className="w-full sm:w-auto px-8 py-4 bg-[#2C4D35] hover:bg-[#386043] text-white font-bold text-xs uppercase tracking-wider rounded-full border border-[#E6E2D3]/30 transition-colors"
            >
              BECOME A VOLUNTEER
            </button>

            <button
              id="final-cta-partner-btn"
              onClick={() => onNavigate('get-involved')}
              className="w-full sm:w-auto px-7 py-4 bg-transparent hover:bg-white/10 text-[#E6E2D3] font-semibold text-xs uppercase tracking-wider rounded-full transition-colors"
            >
              PARTNER WITH US
            </button>
          </div>

          <p className="text-xs text-[#E6E2D3]/70 pt-4">
            Headquartered in Mutundwe, Kampala, Uganda • Est. 2019
          </p>

        </div>
      </section>

    </div>
  );
};
