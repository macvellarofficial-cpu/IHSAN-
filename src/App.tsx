import React, { useState, useEffect } from 'react';
import { 
  Project, 
  Program, 
  DonationRecord, 
  VolunteerApplication, 
  SafeguardingReport, 
  PartnershipInquiry, 
  ContactMessage, 
  BlogPost, 
  Story, 
  SiteSettings, 
  ImpactMetric, 
  TeamMember,
  CurrencyCode 
} from './types';
import { 
  getStoredProjects, 
  getStoredPrograms, 
  getStoredDonations, 
  getStoredVolunteers, 
  getStoredSafeguardingReports, 
  getStoredPartnerships, 
  getStoredMessages, 
  getStoredBlogPosts, 
  getStoredStories, 
  getStoredSiteSettings, 
  getStoredImpactMetrics, 
  getStoredTeamMembers 
} from './lib/storage';

// Common UI Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DonationModal } from './components/common/DonationModal';
import { ReceiptModal } from './components/common/ReceiptModal';
import { SafeguardingModal } from './components/common/SafeguardingModal';
import { VolunteerModal } from './components/common/VolunteerModal';
import { ProjectDetailModal } from './components/common/ProjectDetailModal';
import { FloatingActions } from './components/common/FloatingActions';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { WhereWeWorkPage } from './pages/WhereWeWorkPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { StoriesNewsPage } from './pages/StoriesNewsPage';
import { TransparencyPage } from './pages/TransparencyPage';
import { SafeguardingPage } from './pages/SafeguardingPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPages } from './pages/LegalPages';
import { AdminDashboard } from './pages/AdminDashboard';

// Modals for Stories & Posts
import { X, Calendar, MapPin, Share2, Heart, Check, Sparkles } from 'lucide-react';

export function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [navMeta, setNavMeta] = useState<any>(null);

  // Currency State
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // Application Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [safeguardingReports, setSafeguardingReports] = useState<SafeguardingReport[]>([]);
  const [partnerships, setPartnerships] = useState<PartnershipInquiry[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getStoredSiteSettings());
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Modals
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateInitialFund, setDonateInitialFund] = useState<string | undefined>(undefined);
  const [activeReceipt, setActiveReceipt] = useState<DonationRecord | null>(null);
  const [isSafeguardingOpen, setIsSafeguardingOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Load Data on Mount
  useEffect(() => {
    setProjects(getStoredProjects());
    setPrograms(getStoredPrograms());
    setDonations(getStoredDonations());
    setVolunteers(getStoredVolunteers());
    setSafeguardingReports(getStoredSafeguardingReports());
    setPartnerships(getStoredPartnerships());
    setMessages(getStoredMessages());
    setPosts(getStoredBlogPosts());
    setStories(getStoredStories());
    setSiteSettings(getStoredSiteSettings());
    setImpactMetrics(getStoredImpactMetrics());
    setTeamMembers(getStoredTeamMembers());
  }, []);

  // Scroll to top on navigation
  const handleNavigate = (tab: string, meta?: any) => {
    setActiveTab(tab);
    setNavMeta(meta || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDonate = (fundCategory?: string) => {
    setDonateInitialFund(fundCategory);
    setIsDonateOpen(true);
  };

  const handleDonationComplete = (receipt: DonationRecord) => {
    // Refresh donations from storage
    setDonations(getStoredDonations());
    setProjects(getStoredProjects());
    setActiveReceipt(receipt);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-amber-500 selection:text-slate-950">
      <ScrollProgressBar />
      
      {/* Global Header (Hidden only in admin console if preferred, or always accessible) */}
      {activeTab !== 'admin' && (
        <Header
          activeTab={activeTab}
          onNavigate={handleNavigate}
          onOpenDonate={() => handleOpenDonate()}
          currency={currency}
          onCurrencyChange={setCurrency}
          siteSettings={siteSettings}
        />
      )}

      {/* Main Routed Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenVolunteer={() => setIsVolunteerOpen(true)}
            onOpenProjectDetail={setSelectedProject}
            onOpenStoryDetail={setSelectedStory}
            onOpenPostDetail={setSelectedPost}
            projects={projects}
            programs={programs}
            stories={stories}
            posts={posts}
            impactMetrics={impactMetrics}
            siteSettings={siteSettings}
            currency={currency}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
            onOpenVolunteer={() => setIsVolunteerOpen(true)}
            teamMembers={teamMembers}
            siteSettings={siteSettings}
          />
        )}

        {activeTab === 'programs' && (
          <ProgramsPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenProjectDetail={setSelectedProject}
            programs={programs}
            projects={projects}
            currency={currency}
            initialCategory={navMeta?.category}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenProjectDetail={setSelectedProject}
            projects={projects}
            currency={currency}
          />
        )}

        {activeTab === 'where-we-work' && (
          <WhereWeWorkPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            projects={projects}
            currency={currency}
          />
        )}

        {activeTab === 'get-involved' && (
          <GetInvolvedPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenVolunteer={() => setIsVolunteerOpen(true)}
          />
        )}

        {activeTab === 'news-stories' && (
          <StoriesNewsPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenStoryDetail={setSelectedStory}
            onOpenPostDetail={setSelectedPost}
            stories={stories}
            posts={posts}
          />
        )}

        {activeTab === 'transparency' && (
          <TransparencyPage
            onNavigate={handleNavigate}
            siteSettings={siteSettings}
          />
        )}

        {activeTab === 'safeguarding' && (
          <SafeguardingPage
            onOpenSafeguardingModal={() => setIsSafeguardingOpen(true)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            siteSettings={siteSettings}
            initialSubject={navMeta?.subject}
          />
        )}

        {activeTab === 'legal' && (
          <LegalPages
            initialTab={navMeta?.legalTab || 'privacy'}
            siteSettings={siteSettings}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            onNavigate={handleNavigate}
            projects={projects}
            setProjects={setProjects}
            programs={programs}
            setPrograms={setPrograms}
            donations={donations}
            volunteers={volunteers}
            setVolunteers={setVolunteers}
            safeguardingReports={safeguardingReports}
            setSafeguardingReports={setSafeguardingReports}
            partnerships={partnerships}
            messages={messages}
            posts={posts}
            setPosts={setPosts}
            stories={stories}
            setStories={setStories}
            siteSettings={siteSettings}
            setSiteSettings={setSiteSettings}
            currency={currency}
          />
        )}
      </main>

      {/* Global Footer (Rendered on all client pages) */}
      {activeTab !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenDonate={() => handleOpenDonate()}
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
          siteSettings={siteSettings}
        />
      )}

      {/* Floating Action Triggers */}
      {activeTab !== 'admin' && (
        <FloatingActions
          onOpenDonate={() => handleOpenDonate()}
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
          onOpenSafeguarding={() => setIsSafeguardingOpen(true)}
          siteSettings={siteSettings}
        />
      )}

      {/* =========================================================
          GLOBAL MODALS
          ========================================================= */}
      
      {/* 1. Donation Gateway Modal */}
      <DonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        defaultCurrency={currency}
        initialFundCategory={donateInitialFund}
        onDonationSuccess={handleDonationComplete}
        projects={projects}
      />

      {/* 2. Official Charitable Receipt Modal */}
      <ReceiptModal
        receipt={activeReceipt}
        onClose={() => setActiveReceipt(null)}
      />

      {/* 3. Child Safeguarding Incident Report Modal */}
      <SafeguardingModal
        isOpen={isSafeguardingOpen}
        onClose={() => setIsSafeguardingOpen(false)}
      />

      {/* 4. Volunteer Application Modal */}
      <VolunteerModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
      />

      {/* 5. Project Deep-Dive Story & Budget Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        currency={currency}
        onOpenDonateForProject={handleOpenDonate}
      />

      {/* 6. Story of Hope Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[85vh] flex flex-col">
            <div className="bg-[#0F2E22] text-white p-6 relative">
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs text-amber-400 font-bold uppercase">{selectedStory.category.replace('_', ' ')} • {selectedStory.location}</span>
              <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white">{selectedStory.title}</h2>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs">
                {selectedStory.summary}
              </p>
              
              <div className="space-y-2 whitespace-pre-line">
                {selectedStory.fullStory}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
                <strong>Documented Outcome: </strong> {selectedStory.impactOutcome}
              </div>

              <p className="text-[11px] text-slate-400 italic">
                {selectedStory.safeguardingNotice}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setSelectedStory(null);
                  handleOpenDonate(selectedStory.category);
                }}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow-xs"
              >
                Support Similar Causes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Blog / News Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
            
            <div className="relative h-60 shrink-0">
              <img
                src={selectedPost.featuredImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold text-amber-300 uppercase">{selectedPost.category} • {selectedPost.date}</span>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight mt-1">{selectedPost.title}</h2>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span>Author: <strong>{selectedPost.author}</strong></span>
                <span>{selectedPost.readingTime}</span>
              </div>

              <div className="whitespace-pre-line space-y-3">
                {selectedPost.content}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                {selectedPost.tags.map((t, idx) => (
                  <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 bg-[#0F2E22] text-white text-xs font-bold rounded-xl"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
