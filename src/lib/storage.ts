import { 
  Project, 
  Program, 
  Story, 
  BlogPost, 
  DonationRecord, 
  VolunteerApplication, 
  PartnershipInquiry, 
  ContactMessage, 
  SafeguardingReport, 
  SiteSettings, 
  ImpactMetric, 
  TeamMember, 
  PolicyDocument, 
  CurrencyCode,
  AdminRole
} from '../types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_PROGRAMS, 
  INITIAL_STORIES, 
  INITIAL_BLOG_POSTS, 
  INITIAL_SITE_SETTINGS, 
  INITIAL_IMPACT_METRICS, 
  INITIAL_TEAM, 
  INITIAL_DOCUMENTS,
  CURRENCIES 
} from '../data/initialData';
import {
  supabase,
  fetchProjectsFromSupabase,
  fetchProgramsFromSupabase,
  fetchDonationsFromSupabase,
  fetchVolunteersFromSupabase,
  fetchPartnershipsFromSupabase,
  fetchContactMessagesFromSupabase,
  fetchSafeguardingReportsFromSupabase,
  fetchBlogPostsFromSupabase,
  fetchStoriesFromSupabase,
  fetchSiteSettingsFromSupabase,
  fetchImpactMetricsFromSupabase,
  fetchTeamMembersFromSupabase,
  syncDonationToSupabase,
  syncVolunteerToSupabase,
  syncPartnershipToSupabase,
  syncContactMessageToSupabase,
  syncSafeguardingReportToSupabase,
  syncNewsletterSubscriberToSupabase,
  updateVolunteerStatusInSupabase,
  updateSafeguardingStatusInSupabase
} from './supabase';

const STORAGE_KEYS = {
  PROJECTS: 'icf_projects_v1',
  PROGRAMS: 'icf_programs_v1',
  STORIES: 'icf_stories_v1',
  BLOG_POSTS: 'icf_blog_posts_v1',
  DONATIONS: 'icf_donations_v1',
  VOLUNTEERS: 'icf_volunteers_v1',
  PARTNERSHIPS: 'icf_partnerships_v1',
  CONTACTS: 'icf_contacts_v1',
  SAFEGUARDING: 'icf_safeguarding_v1',
  SETTINGS: 'icf_settings_v1',
  METRICS: 'icf_metrics_v1',
  TEAM: 'icf_team_v1',
  DOCUMENTS: 'icf_documents_v1',
  NEWSLETTER: 'icf_newsletter_v1',
  ADMIN_ROLE: 'icf_active_role_v1',
  IS_ADMIN_AUTH: 'icf_admin_auth_v1',
};

// Initial simulated donations for realism
const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'don-1',
    donorName: 'Dr. Tariq & Family',
    donorEmail: 'tariq.fam@example.com',
    donorPhone: '+256701234567',
    amountUSD: 500,
    currency: 'USD',
    originalAmount: 500,
    frequency: 'one_time',
    fundCategory: 'Food Security',
    paymentMethod: 'card',
    status: 'completed',
    transactionReference: 'TXN-UG-99824',
    receiptNumber: 'ICF-REC-2024-0811',
    isAnonymous: false,
    notes: 'For Karamoja emergency food relief and child nutrition.',
    createdAt: '2024-03-01T14:32:00Z'
  },
  {
    id: 'don-2',
    donorName: 'Anonymous Donor',
    donorEmail: 'supporter@community.org',
    amountUSD: 250,
    currency: 'GBP',
    originalAmount: 195,
    frequency: 'monthly',
    fundCategory: 'Clean Water',
    paymentMethod: 'paypal',
    status: 'completed',
    transactionReference: 'TXN-PAYPAL-44129',
    receiptNumber: 'ICF-REC-2024-0812',
    isAnonymous: true,
    notes: 'Monthly commitment for village borehole project.',
    createdAt: '2024-03-03T09:15:00Z'
  },
  {
    id: 'don-3',
    donorName: 'Sarah K. Nabatanzi',
    donorEmail: 'sarah.nab@example.ug',
    donorPhone: '+256741122334',
    amountUSD: 100,
    currency: 'UGX',
    originalAmount: 385000,
    frequency: 'one_time',
    fundCategory: 'Education',
    paymentMethod: 'mtn_momo',
    status: 'completed',
    transactionReference: 'MOMO-REF-771629',
    receiptNumber: 'ICF-REC-2024-0813',
    isAnonymous: false,
    notes: 'School supplies support for Mutundwe primary pupils.',
    createdAt: '2024-03-04T16:45:00Z'
  }
];

// ============================================================================
// ASYNCHRONOUS SUPABASE DATA FETCHING QUERIES (Primary Real-Data Interface)
// ============================================================================

/**
 * Fetch projects asynchronously from Supabase, caching in localStorage
 */
export const fetchProjects = async (): Promise<Project[]> => {
  const remote = await fetchProjectsFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(remote));
    return remote;
  }
  return getProjects();
};

/**
 * Fetch programs asynchronously from Supabase
 */
export const fetchPrograms = async (): Promise<Program[]> => {
  const remote = await fetchProgramsFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(remote));
    return remote;
  }
  return getPrograms();
};

/**
 * Fetch stories asynchronously from Supabase
 */
export const fetchStories = async (): Promise<Story[]> => {
  const remote = await fetchStoriesFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(remote));
    return remote;
  }
  return getStories();
};

/**
 * Fetch blog posts asynchronously from Supabase
 */
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const remote = await fetchBlogPostsFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(remote));
    return remote;
  }
  return getBlogPosts();
};

/**
 * Fetch donations asynchronously from Supabase
 */
export const fetchDonations = async (): Promise<DonationRecord[]> => {
  const remote = await fetchDonationsFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(remote));
    return remote;
  }
  return getDonations();
};

/**
 * Fetch volunteer applications asynchronously from Supabase
 */
export const fetchVolunteers = async (): Promise<VolunteerApplication[]> => {
  const remote = await fetchVolunteersFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(remote));
    return remote;
  }
  return getVolunteers();
};

/**
 * Fetch partnership inquiries asynchronously from Supabase
 */
export const fetchPartnerships = async (): Promise<PartnershipInquiry[]> => {
  const remote = await fetchPartnershipsFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.PARTNERSHIPS, JSON.stringify(remote));
    return remote;
  }
  return getPartnerships();
};

/**
 * Fetch contact messages asynchronously from Supabase
 */
export const fetchContactMessages = async (): Promise<ContactMessage[]> => {
  const remote = await fetchContactMessagesFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(remote));
    return remote;
  }
  return getContactMessages();
};

/**
 * Fetch safeguarding reports asynchronously from Supabase
 */
export const fetchSafeguardingReports = async (): Promise<SafeguardingReport[]> => {
  const remote = await fetchSafeguardingReportsFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.SAFEGUARDING, JSON.stringify(remote));
    return remote;
  }
  return getSafeguardingReports();
};

/**
 * Fetch site settings asynchronously from Supabase
 */
export const fetchSiteSettings = async (): Promise<SiteSettings> => {
  const remote = await fetchSiteSettingsFromSupabase();
  if (remote) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(remote));
    return remote;
  }
  return getSiteSettings();
};

/**
 * Fetch impact metrics asynchronously from Supabase
 */
export const fetchImpactMetrics = async (): Promise<ImpactMetric[]> => {
  const remote = await fetchImpactMetricsFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(remote));
    return remote;
  }
  return getImpactMetrics();
};

/**
 * Fetch team members asynchronously from Supabase
 */
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const remote = await fetchTeamMembersFromSupabase();
  if (remote && remote.length > 0) {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(remote));
    return remote;
  }
  return getTeamMembers();
};

// ============================================================================
// CACHED / SYNCHRONOUS ACCESSORS (For immediate first-paint rendering)
// ============================================================================

export const getProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return raw ? JSON.parse(raw) : INITIAL_PROJECTS;
  } catch {
    return INITIAL_PROJECTS;
  }
};

export const saveProjects = async (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  // In addition, update Supabase if configured
  try {
    for (const p of projects) {
      await supabase.from('projects').upsert({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        status: p.status,
        location: p.location,
        country: p.country,
        region: p.region,
        hero_image: p.heroImage,
        gallery_images: p.galleryImages,
        situation: p.situation,
        objective: p.objective,
        planned_activities: p.plannedActivities,
        target_beneficiaries: p.targetBeneficiaries,
        amount_required: p.amountRequired,
        amount_raised: p.amountRaised,
        featured: p.featured,
        urgent_appeal: p.urgentAppeal,
        verified_data: p.verifiedData,
        start_date: p.startDate,
        completion_date: p.completionDate || null,
        updates: p.updates,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    }
  } catch (e) {
    console.warn('Supabase projects upsert notice:', e);
  }
};

export const saveStories = (stories: Story[]) => {
  localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
};

export const updateSafeguardingStatus = (id: string, status: SafeguardingReport['status'], adminNotes?: string): SafeguardingReport[] => {
  const current = getSafeguardingReports();
  const updated = current.map(s => s.id === id ? { ...s, status, adminNotes: adminNotes || s.adminNotes } : s);
  localStorage.setItem(STORAGE_KEYS.SAFEGUARDING, JSON.stringify(updated));
  updateSafeguardingStatusInSupabase(id, status, adminNotes).catch(() => {});
  return updated;
};

export const getPrograms = (): Program[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
    return raw ? JSON.parse(raw) : INITIAL_PROGRAMS;
  } catch {
    return INITIAL_PROGRAMS;
  }
};

export const savePrograms = (programs: Program[]) => {
  localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
};

export const getStories = (): Story[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STORIES);
    return raw ? JSON.parse(raw) : INITIAL_STORIES;
  } catch {
    return INITIAL_STORIES;
  }
};

export const getBlogPosts = (): BlogPost[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
    return raw ? JSON.parse(raw) : INITIAL_BLOG_POSTS;
  } catch {
    return INITIAL_BLOG_POSTS;
  }
};

export const saveBlogPosts = (posts: BlogPost[]) => {
  localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(posts));
};

export const getDonations = (): DonationRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    return raw ? JSON.parse(raw) : INITIAL_DONATIONS;
  } catch {
    return INITIAL_DONATIONS;
  }
};

export const recordDonation = (donation: Omit<DonationRecord, 'id' | 'receiptNumber' | 'transactionReference' | 'createdAt'>): DonationRecord => {
  const current = getDonations();
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const receiptNumber = `ICF-REC-${dateStr}-${randNum}`;
  const transactionReference = `TXN-${donation.paymentMethod.toUpperCase()}-${Date.now().toString().slice(-6)}`;

  const newRecord: DonationRecord = {
    ...donation,
    id: `don-${Date.now()}`,
    receiptNumber,
    transactionReference,
    createdAt: new Date().toISOString(),
  };

  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updated));

  // Sync to Supabase in background
  syncDonationToSupabase(newRecord).catch(() => {});

  // If donation target matches a project, update project amount raised
  if (donation.fundCategory) {
    const projects = getProjects();
    const targetProject = projects.find(p => 
      p.title.toLowerCase().includes(donation.fundCategory.toLowerCase()) ||
      p.category.toLowerCase().includes(donation.fundCategory.toLowerCase())
    );
    if (targetProject) {
      targetProject.amountRaised += donation.amountUSD;
      saveProjects(projects);
    }
  }

  return newRecord;
};

export const getVolunteers = (): VolunteerApplication[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const submitVolunteerApplication = (app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>): VolunteerApplication => {
  const current = getVolunteers();
  const newApp: VolunteerApplication = {
    ...app,
    id: `vol-${Date.now()}`,
    status: 'new',
    submittedAt: new Date().toISOString()
  };
  const updated = [newApp, ...current];
  localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(updated));

  // Sync to Supabase in background
  syncVolunteerToSupabase(newApp).catch(() => {});

  return newApp;
};

export const updateVolunteerStatus = (id: string, status: VolunteerApplication['status'], adminNotes?: string) => {
  const current = getVolunteers();
  const updated = current.map(v => v.id === id ? { ...v, status, adminNotes: adminNotes || v.adminNotes } : v);
  localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(updated));
  updateVolunteerStatusInSupabase(id, status, adminNotes).catch(() => {});
};

export const getPartnerships = (): PartnershipInquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PARTNERSHIPS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const submitPartnershipInquiry = (inquiry: Omit<PartnershipInquiry, 'id' | 'submittedAt' | 'status'>): PartnershipInquiry => {
  const current = getPartnerships();
  const newInquiry: PartnershipInquiry = {
    ...inquiry,
    id: `part-${Date.now()}`,
    status: 'new',
    submittedAt: new Date().toISOString()
  };
  const updated = [newInquiry, ...current];
  localStorage.setItem(STORAGE_KEYS.PARTNERSHIPS, JSON.stringify(updated));

  // Sync to Supabase in background
  syncPartnershipToSupabase(newInquiry).catch(() => {});

  return newInquiry;
};

export const getContactMessages = (): ContactMessage[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const submitContactMessage = (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'isRead' | 'isReplied'>): ContactMessage => {
  const current = getContactMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    isRead: false,
    isReplied: false
  };
  const updated = [newMsg, ...current];
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(updated));

  // Sync to Supabase in background
  syncContactMessageToSupabase(newMsg).catch(() => {});

  return newMsg;
};

export const getSafeguardingReports = (): SafeguardingReport[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAFEGUARDING);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const submitSafeguardingReport = (report: Omit<SafeguardingReport, 'id' | 'referenceNumber' | 'submittedAt' | 'status'>): SafeguardingReport => {
  const current = getSafeguardingReports();
  const rand = Math.floor(1000 + Math.random() * 9000);
  const ref = `SAFE-${new Date().getFullYear()}-${rand}`;
  const newReport: SafeguardingReport = {
    ...report,
    id: `safe-${Date.now()}`,
    referenceNumber: ref,
    status: 'received',
    submittedAt: new Date().toISOString()
  };
  const updated = [newReport, ...current];
  localStorage.setItem(STORAGE_KEYS.SAFEGUARDING, JSON.stringify(updated));

  // Sync to Supabase in background
  syncSafeguardingReportToSupabase(newReport).catch(() => {});

  return newReport;
};

export const getSiteSettings = (): SiteSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : INITIAL_SITE_SETTINGS;
  } catch {
    return INITIAL_SITE_SETTINGS;
  }
};

export const saveSiteSettings = (settings: SiteSettings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  (async () => {
    try {
      await supabase.from('site_settings').upsert({
        ngo_name: settings.ngoName,
        head_office: settings.headOffice,
        founded_year: settings.foundedYear,
        ngo_registration_number: settings.ngoRegistrationNumber,
        is_registration_verified: settings.isRegistrationVerified,
        contact_phone: settings.contactPhone,
        whatsapp_number: settings.whatsappNumber,
        contact_email: settings.contactEmail,
        office_hours: settings.officeHours,
        announcement_notice: settings.announcementNotice,
        show_announcement: settings.showAnnouncement,
        updated_at: new Date().toISOString()
      });
    } catch {
      // ignore
    }
  })();
};

export const getImpactMetrics = (): ImpactMetric[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.METRICS);
    return raw ? JSON.parse(raw) : INITIAL_IMPACT_METRICS;
  } catch {
    return INITIAL_IMPACT_METRICS;
  }
};

export const saveImpactMetrics = (metrics: ImpactMetric[]) => {
  localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics));
};

export const getTeamMembers = (): TeamMember[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEAM);
    return raw ? JSON.parse(raw) : INITIAL_TEAM;
  } catch {
    return INITIAL_TEAM;
  }
};

export const getPolicyDocuments = (): PolicyDocument[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return raw ? JSON.parse(raw) : INITIAL_DOCUMENTS;
  } catch {
    return INITIAL_DOCUMENTS;
  }
};

export const subscribeNewsletter = (email: string): boolean => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(list));
    }
    syncNewsletterSubscriberToSupabase(email).catch(() => {});
    return true;
  } catch {
    return true;
  }
};

export const getAdminAuth = (): { isAuthenticated: boolean; role: AdminRole; email: string } => {
  try {
    const isAuth = localStorage.getItem(STORAGE_KEYS.IS_ADMIN_AUTH) === 'true';
    const role = (localStorage.getItem(STORAGE_KEYS.ADMIN_ROLE) as AdminRole) || 'super_admin';
    return {
      isAuthenticated: isAuth,
      role,
      email: isAuth ? 'admin@ihsanchildrensfoundation.org' : ''
    };
  } catch {
    return { isAuthenticated: false, role: 'super_admin', email: '' };
  }
};

export const setAdminAuth = (isAuth: boolean, role: AdminRole = 'super_admin') => {
  localStorage.setItem(STORAGE_KEYS.IS_ADMIN_AUTH, isAuth ? 'true' : 'false');
  localStorage.setItem(STORAGE_KEYS.ADMIN_ROLE, role);
};

// Multi-currency formatter helper
export const formatCurrency = (amountUSD: number, targetCurrency: CurrencyCode = 'USD'): string => {
  const conf = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  const converted = amountUSD * conf.rateFromUSD;
  
  if (targetCurrency === 'UGX') {
    return `${conf.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  }
  return `${conf.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const convertFromCurrency = (amountInTarget: number, sourceCurrency: CurrencyCode = 'USD'): number => {
  const conf = CURRENCIES[sourceCurrency] || CURRENCIES.USD;
  return amountInTarget / conf.rateFromUSD;
};

// Backwards compatibility aliases mapped to async & fast accessors
export const getStoredProjects = getProjects;
export const getStoredPrograms = getPrograms;
export const getStoredStories = getStories;
export const getStoredBlogPosts = getBlogPosts;
export const getStoredDonations = getDonations;
export const getStoredVolunteers = getVolunteers;
export const getStoredPartnerships = getPartnerships;
export const getStoredMessages = getContactMessages;
export const getStoredSafeguardingReports = getSafeguardingReports;
export const getStoredSiteSettings = getSiteSettings;
export const getStoredImpactMetrics = getImpactMetrics;
export const getStoredTeamMembers = getTeamMembers;
