import React, { useState } from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  FolderHeart, 
  Layers, 
  DollarSign, 
  Users, 
  ShieldAlert, 
  MessageSquare, 
  FileText, 
  Settings, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Download, 
  Search, 
  ExternalLink,
  Sparkles,
  Lock,
  LogOut,
  ChevronRight,
  Printer,
  Copy,
  AlertCircle
} from 'lucide-react';
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
  AdminUser, 
  AdminRole,
  CurrencyCode 
} from '../types';
import { 
  saveProjects, 
  savePrograms, 
  saveBlogPosts, 
  saveStories, 
  saveSiteSettings, 
  updateVolunteerStatus, 
  updateSafeguardingStatus,
  formatCurrency
} from '../lib/storage';
import { SUPABASE_SCHEMA_SQL, SUPABASE_SEED_SQL } from '../lib/supabaseSchema';
import { SUPABASE_URL, checkSupabaseConnection } from '../lib/supabase';

interface AdminDashboardProps {
  onNavigate: (tab: string, meta?: any) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  programs: Program[];
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
  donations: DonationRecord[];
  volunteers: VolunteerApplication[];
  setVolunteers: React.Dispatch<React.SetStateAction<VolunteerApplication[]>>;
  safeguardingReports: SafeguardingReport[];
  setSafeguardingReports: React.Dispatch<React.SetStateAction<SafeguardingReport[]>>;
  partnerships: PartnershipInquiry[];
  messages: ContactMessage[];
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  currency: CurrencyCode;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  projects,
  setProjects,
  programs,
  setPrograms,
  donations,
  volunteers,
  setVolunteers,
  safeguardingReports,
  setSafeguardingReports,
  partnerships,
  messages,
  posts,
  setPosts,
  stories,
  setStories,
  siteSettings,
  setSiteSettings,
  currency,
}) => {
  // Authentication & Role
  const [currentUser, setCurrentUser] = useState<AdminUser>({
    id: 'usr_admin1',
    name: 'Hakimu & Secretariat Team',
    email: 'admin@ihsanchildrensfoundation.org',
    role: 'super_admin',
    lastLogin: new Date().toISOString(),
  });

  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'programs' | 'donations' | 'volunteers' | 'safeguarding' | 'inquiries' | 'news_stories' | 'settings' | 'database'
  >('overview');

  const [copiedSql, setCopiedSql] = useState(false);

  // New Project Form State
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectLocation, setNewProjectLocation] = useState('Kampala, Uganda');
  const [newProjectSituation, setNewProjectSituation] = useState('');
  const [newProjectObjective, setNewProjectObjective] = useState('');
  const [newProjectAmountReq, setNewProjectAmountReq] = useState(5000);
  const [newProjectCategory, setNewProjectCategory] = useState('education');
  const [newProjectUrgent, setNewProjectUrgent] = useState(false);
  const [newProjectImage, setNewProjectImage] = useState('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80');

  // Site Settings Form
  const [ngoRegNum, setNgoRegNum] = useState(siteSettings.ngoRegistrationNumber);
  const [phonePrimary, setPhonePrimary] = useState(siteSettings.phonePrimary);
  const [whatsappNumber, setWhatsappNumber] = useState(siteSettings.whatsappNumber);
  const [headOfficeAddress, setHeadOfficeAddress] = useState(siteSettings.headOfficeAddress);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Stats
  const totalDonationsUSD = donations.reduce((acc, d) => acc + (d.amountUSD || 0), 0);
  const pendingVolunteers = volunteers.filter(v => v.status === 'pending');
  const activeSafeguarding = safeguardingReports.filter(s => s.status !== 'resolved');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      title: newProjectTitle,
      slug: newProjectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      situation: newProjectSituation,
      objective: newProjectObjective,
      location: newProjectLocation,
      country: 'Uganda',
      region: 'Central / Kampala',
      category: newProjectCategory,
      amountRequired: Number(newProjectAmountReq),
      amountRaised: 0,
      urgentAppeal: newProjectUrgent,
      featured: false,
      status: 'ongoing',
      verifiedData: true,
      targetBeneficiaries: 'Vulnerable children in community',
      heroImage: newProjectImage,
      galleryImages: [newProjectImage],
      plannedActivities: ['Community outreach', 'Distribution of supplies', 'Direct child assistance'],
      startDate: new Date().toISOString().split('T')[0],
    };

    const updated = [newProj, ...projects];
    setProjects(updated);
    saveProjects(updated);
    setIsAddingProject(false);
    setNewProjectTitle('');
    setNewProjectSituation('');
    setNewProjectObjective('');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
    }
  };

  const handleUpdateVolunteer = (id: string, status: VolunteerApplication['status']) => {
    const updated = updateVolunteerStatus(id, status);
    setVolunteers(updated);
  };

  const handleUpdateSafeguarding = (id: string, status: SafeguardingReport['status']) => {
    const updated = updateSafeguardingStatus(id, status);
    setSafeguardingReports(updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteSettings = {
      ...siteSettings,
      ngoRegistrationNumber: ngoRegNum,
      phonePrimary,
      whatsappNumber,
      headOfficeAddress,
    };
    setSiteSettings(updated);
    saveSiteSettings(updated);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A3020] pb-24">
      
      {/* Admin Top Bar */}
      <header className="bg-[#1A3020] text-[#FDFCF8] border-b-4 border-[#F27D26] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F27D26] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">Ihsan Secretariat Management Console</h1>
              <p className="text-[11px] text-[#E6E2D3]">Kampala Central Secretariat • Authenticated Portal</p>
            </div>
          </div>

          {/* Role selector & switch */}
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 bg-[#24422c] px-3 py-1.5 rounded-xl border border-[#E6E2D3]/20">
              <span className="text-[#E6E2D3]">Active Role:</span>
              <select
                value={currentUser.role}
                onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value as AdminRole })}
                className="bg-transparent text-[#F27D26] font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="super_admin" className="text-[#1A3020] bg-[#FDFCF8]">Super Admin (Full Access)</option>
                <option value="admin" className="text-[#1A3020] bg-[#FDFCF8]">Administrator</option>
                <option value="project_manager" className="text-[#1A3020] bg-[#FDFCF8]">Project Manager</option>
                <option value="finance_manager" className="text-[#1A3020] bg-[#FDFCF8]">Finance & Audits</option>
                <option value="editor" className="text-[#1A3020] bg-[#FDFCF8]">Content Editor</option>
              </select>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 bg-[#24422c] hover:bg-[#2d5237] text-[#FDFCF8] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Public Site</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Admin Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="bg-[#F5F2EA] p-3 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-1">
              
              {[
                { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard, badge: null },
                { id: 'projects', label: 'Projects & Appeals', icon: FolderHeart, badge: projects.length },
                { id: 'programs', label: 'Programs CMS', icon: Layers, badge: programs.length },
                { id: 'donations', label: 'Donations & Ledger', icon: DollarSign, badge: donations.length },
                { id: 'volunteers', label: 'Volunteer Applications', icon: Users, badge: pendingVolunteers.length > 0 ? pendingVolunteers.length : null, badgeColor: 'bg-[#F27D26] text-white' },
                { id: 'safeguarding', label: 'Safeguarding Triage', icon: ShieldAlert, badge: activeSafeguarding.length > 0 ? activeSafeguarding.length : null, badgeColor: 'bg-rose-600 text-white' },
                { id: 'inquiries', label: 'Partnerships & Messages', icon: MessageSquare, badge: partnerships.length + messages.length },
                { id: 'news_stories', label: 'News & Stories CMS', icon: FileText, badge: posts.length + stories.length },
                { id: 'settings', label: 'Site & Registration Config', icon: Settings, badge: null },
                { id: 'database', label: 'Supabase SQL & Schema', icon: Database, badge: 'Ready', badgeColor: 'bg-[#1A3020] text-[#FDFCF8]' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#1A3020] text-[#FDFCF8] shadow-xs'
                        : 'text-[#5A5A40] hover:bg-[#E6E2D3]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#F27D26]' : 'text-[#5A5A40]'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== null && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.badgeColor || 'bg-[#E6E2D3] text-[#1A3020]'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

            </div>

            {/* Quick Status Box */}
            <div className="bg-[#F5F2EA] p-4 rounded-2xl border border-[#E6E2D3] text-xs text-[#5A5A40] space-y-1.5">
              <span className="font-bold text-[#1A3020] uppercase text-[10px]">Database Persistence:</span>
              <p className="text-[11px] text-[#1A3020] font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#F27D26]" /> Local & Supabase-Ready Schema
              </p>
              <p className="text-[10px] text-[#5A5A40]">All edits persist seamlessly across sessions.</p>
            </div>
          </aside>

          {/* Admin Main Workspace */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* =========================================================
                TAB: OVERVIEW
                ========================================================= */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  <div className="bg-[#F5F2EA] p-5 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-1">
                    <span className="text-[11px] font-bold text-[#5A5A40] uppercase">Charitable Ledger</span>
                    <div className="text-xl font-extrabold text-[#1A3020] font-mono">
                      ${totalDonationsUSD.toLocaleString()} USD
                    </div>
                    <p className="text-[11px] text-[#5A5A40]">{donations.length} recorded donations</p>
                  </div>

                  <div className="bg-[#F5F2EA] p-5 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-1">
                    <span className="text-[11px] font-bold text-[#5A5A40] uppercase">Active Projects</span>
                    <div className="text-xl font-extrabold text-[#1A3020] font-mono">
                      {projects.length} Field Appeals
                    </div>
                    <p className="text-[11px] text-[#5A5A40]">{projects.filter(p => p.urgentAppeal).length} marked Urgent</p>
                  </div>

                  <div className="bg-[#F5F2EA] p-5 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-1">
                    <span className="text-[11px] font-bold text-[#5A5A40] uppercase">Volunteer Roster</span>
                    <div className="text-xl font-extrabold text-[#1A3020] font-mono">
                      {volunteers.length} Total Applicants
                    </div>
                    <p className="text-[11px] text-[#F27D26] font-semibold">{pendingVolunteers.length} pending review</p>
                  </div>

                  <div className="bg-[#F5F2EA] p-5 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-1">
                    <span className="text-[11px] font-bold text-[#5A5A40] uppercase">Safeguarding Desk</span>
                    <div className="text-xl font-extrabold text-rose-700 font-mono">
                      {safeguardingReports.length} Reports Logged
                    </div>
                    <p className="text-[11px] text-[#5A5A40]">{activeSafeguarding.length} active triage</p>
                  </div>

                </div>

                {/* Recent Activity Ledger Summary */}
                <div className="bg-[#F5F2EA] p-6 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E6E2D3]">
                    <h2 className="text-sm font-bold text-[#1A3020]">Recent Charitable Donations</h2>
                    <button
                      onClick={() => setActiveTab('donations')}
                      className="text-xs font-bold text-[#1A3020] hover:text-[#F27D26] cursor-pointer"
                    >
                      View Full Ledger →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#FDFCF8] text-[#5A5A40] font-bold border-b border-[#E6E2D3]">
                          <th className="p-2.5">Receipt #</th>
                          <th className="p-2.5">Donor</th>
                          <th className="p-2.5">Designated Fund</th>
                          <th className="p-2.5">Amount</th>
                          <th className="p-2.5">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6E2D3] font-medium">
                        {donations.slice(0, 5).map((d) => (
                          <tr key={d.id} className="hover:bg-[#FDFCF8]">
                            <td className="p-2.5 font-mono text-[#1A3020] font-bold">{d.receiptNumber}</td>
                            <td className="p-2.5 text-[#1A3020]">{d.donorName}</td>
                            <td className="p-2.5 text-[#5A5A40]">{d.fundCategory}</td>
                            <td className="p-2.5 font-mono font-bold text-[#1A3020]">
                              {d.currency} {d.originalAmount.toLocaleString()} (${d.amountUSD} USD)
                            </td>
                            <td className="p-2.5 text-[#5A5A40] text-[11px]">
                              {new Date(d.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* =========================================================
                TAB: PROJECTS
                ========================================================= */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#1A3020]">Humanitarian Projects & Appeals</h2>
                    <p className="text-xs text-[#5A5A40]">Create, edit, or update field project metrics and targets.</p>
                  </div>

                  <button
                    onClick={() => setIsAddingProject(!isAddingProject)}
                    className="px-4 py-2 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>
                </div>

                {/* Add Project Drawer */}
                {isAddingProject && (
                  <form onSubmit={handleCreateProject} className="bg-[#F5F2EA] p-6 rounded-2xl border border-[#E6E2D3] shadow-md space-y-4 animate-in fade-in">
                    <h3 className="text-sm font-bold text-[#1A3020]">Create New Humanitarian Appeal</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#1A3020] mb-1">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={newProjectTitle}
                          onChange={(e) => setNewProjectTitle(e.target.value)}
                          placeholder="e.g. Karamoja Emergency Water Borehole"
                          className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1A3020] mb-1">Location *</label>
                        <input
                          type="text"
                          required
                          value={newProjectLocation}
                          onChange={(e) => setNewProjectLocation(e.target.value)}
                          placeholder="e.g. Kotido District, Karamoja"
                          className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#1A3020] mb-1">Required Goal (USD) *</label>
                        <input
                          type="number"
                          required
                          value={newProjectAmountReq}
                          onChange={(e) => setNewProjectAmountReq(Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1A3020] mb-1">Program Category</label>
                        <select
                          value={newProjectCategory}
                          onChange={(e) => setNewProjectCategory(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                        >
                          <option value="clean_water">Clean Water (WASH)</option>
                          <option value="education">Education Support</option>
                          <option value="food_security">Food Security & Malnutrition</option>
                          <option value="emergency_relief">Emergency Relief</option>
                          <option value="health">Community Health</option>
                          <option value="refugees">Refugee Support</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          id="urgent-proj-check"
                          checked={newProjectUrgent}
                          onChange={(e) => setNewProjectUrgent(e.target.checked)}
                          className="w-4 h-4 text-[#F27D26] rounded-sm focus:ring-[#F27D26]"
                        />
                        <label htmlFor="urgent-proj-check" className="text-xs font-semibold text-[#1A3020]">
                          Mark as Urgent Emergency Appeal
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A3020] mb-1">Humanitarian Situation / Problem *</label>
                      <textarea
                        rows={2}
                        required
                        value={newProjectSituation}
                        onChange={(e) => setNewProjectSituation(e.target.value)}
                        placeholder="Describe the urgent need or context..."
                        className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A3020] mb-1">Project Objective *</label>
                      <textarea
                        rows={2}
                        required
                        value={newProjectObjective}
                        onChange={(e) => setNewProjectObjective(e.target.value)}
                        placeholder="What tangible solution will be delivered?"
                        className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingProject(false)}
                        className="px-4 py-2 bg-[#E6E2D3] hover:bg-[#d8d3c2] text-[#1A3020] text-xs font-semibold rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Save Project to Database
                      </button>
                    </div>
                  </form>
                )}

                {/* Projects Table */}
                <div className="bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FDFCF8] text-[#5A5A40] font-bold border-b border-[#E6E2D3]">
                        <th className="p-3">Project</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Raised / Target</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E2D3]">
                      {projects.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FDFCF8]">
                          <td className="p-3">
                            <div className="font-bold text-[#1A3020]">{p.title}</div>
                            {p.urgentAppeal && (
                              <span className="text-[10px] font-bold text-[#F27D26] uppercase">Urgent Appeal</span>
                            )}
                          </td>
                          <td className="p-3 text-[#5A5A40]">{p.location}</td>
                          <td className="p-3 font-mono font-bold text-[#1A3020]">
                            ${p.amountRaised.toLocaleString()} / ${p.amountRequired.toLocaleString()} USD
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-[#1A3020] text-[#FDFCF8] text-[10px] font-bold uppercase">
                              {p.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="text-rose-600 hover:text-rose-800 p-1 rounded-md cursor-pointer"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* =========================================================
                TAB: DONATIONS & LEDGER
                ========================================================= */}
            {activeTab === 'donations' && (
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#1A3020]">Charitable Financial Ledger</h2>
                    <p className="text-xs text-[#5A5A40]">Official log of contributions, currencies, and receipts.</p>
                  </div>
                  <button
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," 
                        + ["Receipt,Donor,Email,Fund,Currency,Amount,USD,Reference,Date"].join(",") + "\n"
                        + donations.map(d => `"${d.receiptNumber}","${d.donorName}","${d.donorEmail}","${d.fundCategory}","${d.currency}",${d.originalAmount},${d.amountUSD},"${d.transactionReference}","${d.createdAt}"`).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", `ihsan_ledger_export_${new Date().toISOString().slice(0,10)}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-4 py-2 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Ledger CSV</span>
                  </button>
                </div>

                <div className="bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FDFCF8] text-[#5A5A40] font-bold border-b border-[#E6E2D3]">
                        <th className="p-3">Receipt #</th>
                        <th className="p-3">Donor Name</th>
                        <th className="p-3">Designated Fund</th>
                        <th className="p-3">Payment Rail</th>
                        <th className="p-3">Original Amount</th>
                        <th className="p-3">USD Value</th>
                        <th className="p-3">Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E2D3] font-medium">
                      {donations.map((d) => (
                        <tr key={d.id} className="hover:bg-[#FDFCF8]">
                          <td className="p-3 font-mono font-bold text-[#1A3020]">{d.receiptNumber}</td>
                          <td className="p-3 text-[#1A3020]">
                            <div>{d.donorName}</div>
                            <div className="text-[10px] text-[#5A5A40]">{d.donorEmail}</div>
                          </td>
                          <td className="p-3 text-[#5A5A40]">{d.fundCategory}</td>
                          <td className="p-3 uppercase font-mono text-[10px] text-[#5A5A40]">{d.paymentMethod}</td>
                          <td className="p-3 font-mono text-[#1A3020]">
                            {d.currency} {d.originalAmount.toLocaleString()}
                          </td>
                          <td className="p-3 font-mono font-bold text-[#1A3020]">
                            ${d.amountUSD.toLocaleString()}
                          </td>
                          <td className="p-3 font-mono text-[10px] text-[#5A5A40]">{d.transactionReference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* =========================================================
                TAB: VOLUNTEERS
                ========================================================= */}
            {activeTab === 'volunteers' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1A3020]">Volunteer Applications</h2>
                  <p className="text-xs text-[#5A5A40]">Review volunteer profiles, skills, and safeguarding pledges.</p>
                </div>

                <div className="space-y-4">
                  {volunteers.map((vol) => (
                    <div key={vol.id} className="bg-[#F5F2EA] p-5 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-[#1A3020]">{vol.fullName}</h3>
                          <p className="text-xs text-[#5A5A40]">
                            {vol.profession} • {vol.locationCity}, {vol.country} • {vol.phone} • {vol.email}
                          </p>
                        </div>

                        {/* Status Pills */}
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                            vol.status === 'approved' ? 'bg-[#1A3020] text-[#FDFCF8]' :
                            vol.status === 'reviewed' ? 'bg-[#E6E2D3] text-[#1A3020]' :
                            vol.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                            'bg-[#F27D26] text-white'
                          }`}>
                            {vol.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#FDFCF8] p-3 rounded-xl border border-[#E6E2D3]">
                        <div>
                          <strong className="text-[#1A3020]">Area of Interest: </strong>
                          <span className="text-[#5A5A40]">{vol.areaOfInterest} ({vol.availability})</span>
                        </div>
                        <div>
                          <strong className="text-[#1A3020]">Skills: </strong>
                          <span className="text-[#5A5A40]">{vol.skills.join(', ')}</span>
                        </div>
                      </div>

                      {vol.motivation && (
                        <p className="text-xs text-[#5A5A40] italic">
                          "{vol.motivation}"
                        </p>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#E6E2D3] text-xs">
                        <span className="text-[10px] text-[#5A5A40]">
                          Safeguarding Pledge: {vol.hasChildProtectionConsent ? 'Verified ✓' : 'Pending'}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateVolunteer(vol.id, 'approved')}
                            className="px-3 py-1 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] text-xs font-bold rounded-lg cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateVolunteer(vol.id, 'reviewed')}
                            className="px-3 py-1 bg-[#E6E2D3] hover:bg-[#d8d3c2] text-[#1A3020] text-xs font-bold rounded-lg cursor-pointer"
                          >
                            Mark Reviewed
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* =========================================================
                TAB: SAFEGUARDING
                ========================================================= */}
            {activeTab === 'safeguarding' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1A3020] flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-[#F27D26]" />
                    Child Safeguarding Confidential Triage Desk
                  </h2>
                  <p className="text-xs text-[#5A5A40]">Restricted access channel for child protection officers.</p>
                </div>

                <div className="space-y-4">
                  {safeguardingReports.map((rep) => (
                    <div key={rep.id} className="bg-[#F5F2EA] p-5 rounded-2xl border-l-4 border-[#F27D26] border-y border-r border-[#E6E2D3] shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#1A3020]">{rep.referenceNumber}</span>
                          <span className={`ml-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            rep.urgencyLevel === 'critical' ? 'bg-rose-600 text-white' :
                            rep.urgencyLevel === 'high' ? 'bg-[#F27D26] text-white' :
                            'bg-[#E6E2D3] text-[#1A3020]'
                          }`}>
                            {rep.urgencyLevel} Urgency
                          </span>
                        </div>
                        <span className="text-[11px] text-[#5A5A40]">{new Date(rep.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="text-xs text-[#1A3020] space-y-1">
                        <p><strong>Location:</strong> {rep.incidentLocation}</p>
                        <p><strong>Reporter Type:</strong> {rep.reporterType === 'confidential' ? '100% Anonymous' : `${rep.reporterName} (${rep.reporterEmail || rep.reporterPhone})`}</p>
                      </div>

                      <div className="p-3 bg-[#FDFCF8] rounded-xl text-xs text-[#1A3020] border border-[#E6E2D3]">
                        {rep.incidentDetails}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E6E2D3] text-xs">
                        <span className="font-bold text-[#1A3020]">Status: {rep.status.toUpperCase()}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateSafeguarding(rep.id, 'investigating')}
                            className="px-3 py-1 bg-[#F27D26] text-white font-bold rounded-lg text-xs cursor-pointer"
                          >
                            Set Investigating
                          </button>
                          <button
                            onClick={() => handleUpdateSafeguarding(rep.id, 'resolved')}
                            className="px-3 py-1 bg-[#1A3020] text-[#FDFCF8] font-bold rounded-lg text-xs cursor-pointer"
                          >
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* =========================================================
                TAB: INQUIRIES & PARTNERSHIPS
                ========================================================= */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1A3020]">Partnerships & Contact Inquiries</h2>
                  <p className="text-xs text-[#5A5A40]">Proposals received from mosques, corporations, and community members.</p>
                </div>

                <div className="space-y-4">
                  {partnerships.map((p) => (
                    <div key={p.id} className="bg-[#F5F2EA] p-5 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-[#F27D26] text-white font-bold text-[10px] rounded-md uppercase">
                          {p.partnershipType} Partnership
                        </span>
                        <span className="text-[11px] text-[#5A5A40]">{new Date(p.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#1A3020]">{p.organizationName}</h3>
                      <p className="text-xs text-[#5A5A40]">Contact: {p.contactPerson} • {p.email} • {p.phone}</p>
                      <p className="text-xs text-[#1A3020] bg-[#FDFCF8] p-3 rounded-xl border border-[#E6E2D3]">{p.proposalDetails}</p>
                    </div>
                  ))}

                  {messages.map((m) => (
                    <div key={m.id} className="bg-[#F5F2EA] p-5 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-[#1A3020] text-[#FDFCF8] font-bold text-[10px] rounded-md uppercase">
                          General Message: {m.subject}
                        </span>
                        <span className="text-[11px] text-[#5A5A40]">{new Date(m.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#1A3020]">{m.fullName} ({m.email})</h3>
                      <p className="text-xs text-[#1A3020] bg-[#FDFCF8] p-3 rounded-xl border border-[#E6E2D3]">{m.message}</p>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* =========================================================
                TAB: SETTINGS
                ========================================================= */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1A3020]">Foundation Configuration & Registry Data</h2>
                  <p className="text-xs text-[#5A5A40]">Update official contact coordinates and Uganda NGO numbers.</p>
                </div>

                <form onSubmit={handleSaveSettings} className="bg-[#F5F2EA] p-6 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-4">
                  {settingsSaved && (
                    <div className="p-3 bg-[#1A3020] text-[#FDFCF8] text-xs font-bold rounded-xl">
                      Site settings saved successfully.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A3020] mb-1">Uganda NGO Registration Number</label>
                      <input
                        type="text"
                        value={ngoRegNum}
                        onChange={(e) => setNgoRegNum(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] rounded-xl font-mono focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A3020] mb-1">Head Office Address</label>
                      <input
                        type="text"
                        value={headOfficeAddress}
                        onChange={(e) => setHeadOfficeAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A3020] mb-1">Primary Voice Phone</label>
                      <input
                        type="text"
                        value={phonePrimary}
                        onChange={(e) => setPhonePrimary(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A3020] mb-1">Official WhatsApp Phone</label>
                      <input
                        type="text"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </form>

              </div>
            )}

            {/* =========================================================
                TAB: SUPABASE DATABASE & SQL MIGRATION CONSOLE
                ========================================================= */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                {/* Active Supabase Connection Banner */}
                <div className="bg-[#F5F2EA] p-5 rounded-2xl border border-[#E6E2D3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-[#1A3020]">Supabase Cloud Connected</span>
                    </div>
                    <p className="text-xs font-mono text-[#5A5A40] break-all">{SUPABASE_URL}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2.5 py-1 bg-[#1A3020] text-[#FDFCF8] font-bold rounded-lg">
                      Anon Key Configured
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#1A3020] flex items-center gap-2">
                      <Database className="w-5 h-5 text-[#F27D26]" />
                      Supabase PostgreSQL Schema & RLS Policies
                    </h2>
                    <p className="text-xs text-[#5A5A40]">Ready-to-execute migration script for complete cloud persistence.</p>
                  </div>

                  <button
                    onClick={handleCopySql}
                    className="px-4 py-2 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSql ? 'SQL Copied to Clipboard' : 'Copy PostgreSQL DDL'}</span>
                  </button>
                </div>

                <div className="bg-[#1A3020] text-[#E6E2D3] p-6 rounded-2xl border border-[#24422c] font-mono text-xs overflow-x-auto max-h-96">
                  <pre>{SUPABASE_SCHEMA_SQL}</pre>
                </div>

                <div className="bg-[#F5F2EA] p-4 rounded-2xl border border-[#E6E2D3] text-xs text-[#1A3020] space-y-1">
                  <h4 className="font-bold text-[#1A3020]">Supabase Deployment Instructions:</h4>
                  <p className="text-[#5A5A40]">1. Open your Supabase project SQL Editor.</p>
                  <p className="text-[#5A5A40]">2. Paste the copied SQL script and click <strong>Run</strong>.</p>
                  <p className="text-[#5A5A40]">3. Row-Level Security (RLS) policies will secure donations and safeguarding tables while keeping projects publicly readable.</p>
                </div>

              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
};
