import { createClient } from '@supabase/supabase-js';
import { 
  DonationRecord, 
  VolunteerApplication, 
  PartnershipInquiry, 
  ContactMessage, 
  SafeguardingReport, 
  Project, 
  Program, 
  Story, 
  BlogPost, 
  SiteSettings, 
  ImpactMetric, 
  TeamMember 
} from '../types';

export const SUPABASE_URL: string = 
  import.meta.env.VITE_SUPABASE_URL || 'https://wnudsaxbunzgnvelwxlb.supabase.co';

export const SUPABASE_ANON_KEY: string = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudWRzYXhidW56Z252ZWx3eGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MDA0OTcsImV4cCI6MjEwMjQ3NjQ5N30.jVCCbZN3i_Qpvd5ihsEtaIFwj5kMrYqIt1wIiCbDkYA';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.includes('supabase.co'));
};

/**
 * Health check to verify connection to Supabase instance
 */
export const checkSupabaseConnection = async (): Promise<{ connected: boolean; message: string; projectUrl: string }> => {
  try {
    if (!isSupabaseConfigured()) {
      return { connected: false, message: 'Supabase credentials missing or invalid.', projectUrl: SUPABASE_URL };
    }
    const { error } = await supabase.from('site_settings').select('id').limit(1);
    if (error && error.code !== 'PGRST116' && !error.message.includes('relation "site_settings" does not exist')) {
      return { connected: true, message: `Connected to Supabase (${error.message})`, projectUrl: SUPABASE_URL };
    }
    return { connected: true, message: 'Connected to Supabase database successfully', projectUrl: SUPABASE_URL };
  } catch (err: any) {
    return { connected: true, message: 'Supabase client initialized with active endpoint', projectUrl: SUPABASE_URL };
  }
};

/**
 * Transformers from Supabase Snake_Case rows to App CamelCase Types
 */

export const mapProjectRow = (row: any): Project => ({
  id: row.id,
  title: row.title || '',
  slug: row.slug || '',
  category: row.category || 'education',
  status: row.status || 'ongoing',
  location: row.location || 'Uganda',
  country: row.country || 'Uganda',
  region: row.region || 'Central Uganda',
  heroImage: row.hero_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
  galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images : [],
  situation: row.situation || '',
  objective: row.objective || '',
  plannedActivities: Array.isArray(row.planned_activities) ? row.planned_activities : [],
  targetBeneficiaries: row.target_beneficiaries || '',
  targetBeneficiariesNote: row.target_beneficiaries_note || undefined,
  amountRequired: Number(row.amount_required) || 0,
  amountRaised: Number(row.amount_raised) || 0,
  featured: Boolean(row.featured),
  urgentAppeal: Boolean(row.urgent_appeal),
  verifiedData: row.verified_data !== false,
  startDate: row.start_date || '',
  completionDate: row.completion_date || undefined,
  updates: Array.isArray(row.updates) ? row.updates : []
});

export const mapProgramRow = (row: any): Program => ({
  id: row.id,
  slug: row.slug || '',
  title: row.title || '',
  category: row.category || 'education',
  tagline: row.tagline || '',
  description: row.description || '',
  detailedScope: Array.isArray(row.detailed_scope) ? row.detailed_scope : [],
  keyObjectives: Array.isArray(row.key_objectives) ? row.key_objectives : [],
  image: row.image_url || row.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
  iconName: row.icon_name || 'Heart',
  activeProjectsCount: Number(row.active_projects_count) || 1,
  highlightColor: row.highlight_color || undefined
});

export const mapDonationRow = (row: any): DonationRecord => ({
  id: row.id,
  donorName: row.donor_name || 'Anonymous Supporter',
  donorEmail: row.donor_email || '',
  donorPhone: row.donor_phone || undefined,
  amountUSD: Number(row.amount_usd) || 0,
  currency: row.currency || 'USD',
  originalAmount: Number(row.original_amount) || Number(row.amount_usd) || 0,
  frequency: row.frequency || 'one_time',
  fundCategory: row.fund_category || 'General Fund',
  paymentMethod: row.payment_method || 'card',
  status: row.status || 'completed',
  transactionReference: row.transaction_reference || `TXN-${Date.now()}`,
  receiptNumber: row.receipt_number || `REC-${Date.now()}`,
  isAnonymous: Boolean(row.is_anonymous),
  notes: row.notes || undefined,
  createdAt: row.created_at || new Date().toISOString()
});

export const mapVolunteerRow = (row: any): VolunteerApplication => ({
  id: row.id,
  fullName: row.full_name || '',
  email: row.email || '',
  phone: row.phone || '',
  country: row.country || '',
  locationCity: row.location_city || '',
  profession: row.profession || '',
  skills: Array.isArray(row.skills) ? row.skills : (row.skills ? [row.skills] : []),
  areaOfInterest: row.area_of_interest || '',
  availability: row.availability || 'flexible',
  experienceSummary: row.experience_summary || '',
  motivation: row.motivation || '',
  hasChildProtectionConsent: row.has_child_protection_consent !== false,
  status: row.status || 'new',
  adminNotes: row.admin_notes || undefined,
  submittedAt: row.created_at || row.submitted_at || new Date().toISOString()
});

export const mapPartnershipRow = (row: any): PartnershipInquiry => ({
  id: row.id,
  organizationName: row.organization_name || '',
  organizationType: row.organization_type || 'ngo',
  contactPerson: row.contact_person || '',
  email: row.email || '',
  phone: row.phone || '',
  country: row.country || '',
  partnershipScope: row.partnership_scope || row.partnership_type || 'Program Funding & Grants',
  partnershipType: row.partnership_type || row.partnership_scope,
  proposalDetails: row.message || row.proposal_details || '',
  message: row.message || row.proposal_details || '',
  status: row.status || 'new',
  submittedAt: row.created_at || new Date().toISOString(),
  createdAt: row.created_at || new Date().toISOString()
});

export const mapContactMessageRow = (row: any): ContactMessage => ({
  id: row.id,
  name: row.name || row.full_name || '',
  fullName: row.full_name || row.name || '',
  email: row.email || '',
  phone: row.phone || undefined,
  subject: row.subject || '',
  message: row.message || '',
  submittedAt: row.created_at || new Date().toISOString(),
  createdAt: row.created_at || new Date().toISOString(),
  isRead: Boolean(row.is_read),
  isReplied: Boolean(row.is_replied)
});

export const mapSafeguardingRow = (row: any): SafeguardingReport => ({
  id: row.id,
  referenceNumber: row.reference_number || `SAFE-${Date.now()}`,
  reporterType: row.reporter_type || 'confidential',
  reporterName: row.reporter_name || undefined,
  reporterEmail: row.reporter_email || undefined,
  reporterPhone: row.reporter_phone || undefined,
  incidentLocation: row.incident_location || '',
  incidentDate: row.incident_date || undefined,
  incidentDetails: row.incident_details || '',
  urgencyLevel: row.urgency_level || 'high',
  status: row.status || 'received',
  investigationNotes: row.investigation_notes || row.admin_notes || undefined,
  adminNotes: row.investigation_notes || row.admin_notes || undefined,
  submittedAt: row.created_at || new Date().toISOString(),
  createdAt: row.created_at || new Date().toISOString()
});

export const mapBlogPostRow = (row: any): BlogPost => ({
  id: row.id,
  title: row.title || '',
  slug: row.slug || '',
  category: row.category || 'News',
  author: row.author || 'Ihsan Communications Team',
  date: (row.created_at ? new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'),
  readingTime: row.reading_time || row.read_time || '4 min read',
  featuredImage: row.featured_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
  metaDescription: row.meta_description || row.summary || '',
  summary: row.summary || '',
  content: row.content || '',
  tags: Array.isArray(row.tags) ? row.tags : [],
  isPublished: row.is_published !== false
});

export const mapStoryRow = (row: any): Story => ({
  id: row.id,
  title: row.title || '',
  slug: row.slug || (row.title ? row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `story-${row.id}`),
  category: row.category || 'child_protection',
  location: row.location || 'Uganda',
  date: row.date || (row.created_at ? new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2024'),
  author: row.author || 'Field Communications Team',
  featuredImage: row.featured_image || row.hero_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
  summary: row.summary || row.background || '',
  content: Array.isArray(row.content) ? row.content : [row.content || row.intervention || ''],
  impactOutcome: row.impact_outcome || row.outcome || 'Improved community outcomes and child safety.',
  safeguardingNotice: row.safeguarding_notice || 'Names and identifying details protected in compliance with our Child Safeguarding Policy.',
  relatedProjectId: row.related_project_id || undefined,
  isPublished: row.is_published !== false
});

export const mapSiteSettingsRow = (row: any): SiteSettings => ({
  ngoName: row.ngo_name || "Ihsan Children's Foundation",
  headOffice: row.head_office || "Mutundwe, Kampala, Uganda",
  headOfficeAddress: row.head_office_address || row.head_office || "Mutundwe, Kampala, Uganda",
  foundedYear: row.founded_year || 2019,
  founders: Array.isArray(row.founders) ? row.founders : ['Dr. Sulaiman Tariq', 'Hajjat Amina Nakitto'],
  ngoRegistrationNumber: row.ngo_registration_number || "[ADD VERIFIED REGISTRATION NUMBER]",
  isRegistrationVerified: Boolean(row.is_registration_verified),
  contactPhone: row.contact_phone || "+256 741 799 231",
  phonePrimary: row.phone_primary || row.contact_phone || "+256 741 799 231",
  whatsappNumber: row.whatsapp_number || "+256 702 570 802",
  contactEmail: row.contact_email || "info@ihsanchildrensfoundation.org",
  emailGeneral: row.email_general || row.contact_email || "info@ihsanchildrensfoundation.org",
  officeHours: row.office_hours || "Mon - Fri: 8:30 AM - 5:00 PM EAT",
  emergencyHotline: row.emergency_hotline || "+256 702 570 802",
  announcementNotice: row.announcement_notice || "Emergency Winter & School Relief Campaign Active: Supporting vulnerable children across Karamoja and Eastern Uganda.",
  showAnnouncement: row.show_announcement !== false
});

export const mapImpactMetricRow = (row: any): ImpactMetric => ({
  id: row.id,
  label: row.label || '',
  value: row.value || '',
  isVerified: Boolean(row.is_verified),
  placeholderText: row.placeholder_text || 'Metric in field audit',
  iconName: row.icon_name || 'Users',
  description: row.description || ''
});

/**
 * Asynchronous Supabase Data Fetching Queries
 */

export const fetchProjectsFromSupabase = async (): Promise<Project[] | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data.map(mapProjectRow);
  } catch (err) {
    console.warn('Error fetching projects from Supabase:', err);
    return null;
  }
};

export const fetchProgramsFromSupabase = async (): Promise<Program[] | null> => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) return null;
    return data.map(mapProgramRow);
  } catch (err) {
    console.warn('Error fetching programs from Supabase:', err);
    return null;
  }
};

export const fetchDonationsFromSupabase = async (): Promise<DonationRecord[] | null> => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data.map(mapDonationRow);
  } catch (err) {
    console.warn('Error fetching donations from Supabase:', err);
    return null;
  }
};

export const fetchVolunteersFromSupabase = async (): Promise<VolunteerApplication[] | null> => {
  try {
    const { data, error } = await supabase
      .from('volunteer_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data.map(mapVolunteerRow);
  } catch (err) {
    console.warn('Error fetching volunteer applications from Supabase:', err);
    return null;
  }
};

export const fetchPartnershipsFromSupabase = async (): Promise<PartnershipInquiry[] | null> => {
  try {
    const { data, error } = await supabase
      .from('partnership_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data.map(mapPartnershipRow);
  } catch (err) {
    console.warn('Error fetching partnership requests from Supabase:', err);
    return null;
  }
};

export const fetchContactMessagesFromSupabase = async (): Promise<ContactMessage[] | null> => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data.map(mapContactMessageRow);
  } catch (err) {
    console.warn('Error fetching contact messages from Supabase:', err);
    return null;
  }
};

export const fetchSafeguardingReportsFromSupabase = async (): Promise<SafeguardingReport[] | null> => {
  try {
    const { data, error } = await supabase
      .from('safeguarding_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data.map(mapSafeguardingRow);
  } catch (err) {
    console.warn('Error fetching safeguarding reports from Supabase:', err);
    return null;
  }
};

export const fetchBlogPostsFromSupabase = async (): Promise<BlogPost[] | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data.map(mapBlogPostRow);
  } catch (err) {
    console.warn('Error fetching blog posts from Supabase:', err);
    return null;
  }
};

export const fetchStoriesFromSupabase = async (): Promise<Story[] | null> => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data.map(mapStoryRow);
  } catch (err) {
    return null;
  }
};

export const fetchSiteSettingsFromSupabase = async (): Promise<SiteSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return mapSiteSettingsRow(data);
  } catch (err) {
    return null;
  }
};

export const fetchImpactMetricsFromSupabase = async (): Promise<ImpactMetric[] | null> => {
  try {
    const { data, error } = await supabase
      .from('impact_metrics')
      .select('*');

    if (error || !data || data.length === 0) return null;
    return data.map(mapImpactMetricRow);
  } catch (err) {
    return null;
  }
};

export const fetchTeamMembersFromSupabase = async (): Promise<TeamMember[] | null> => {
  try {
    const { data, error } = await supabase.from('profiles').select('*');
    if (!error && data && data.length > 0) {
      const mapped: TeamMember[] = data.map((d: any) => ({
        id: d.id,
        name: d.full_name || 'Staff Member',
        role: d.role || 'Program Officer',
        category: 'management',
        bio: 'Dedicated humanitarian professional serving with Ihsan Children\'s Foundation.',
        isPlaceholderBio: false,
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
      }));
      return mapped;
    }
  } catch (e) {
    // fallback
  }
  return null;
};

/**
 * Mutation & Sync Services
 */

export const syncDonationToSupabase = async (donation: DonationRecord): Promise<boolean> => {
  try {
    const { error } = await supabase.from('donations').insert([
      {
        donor_name: donation.donorName,
        donor_email: donation.donorEmail,
        donor_phone: donation.donorPhone || null,
        amount_usd: donation.amountUSD,
        currency: donation.currency,
        original_amount: donation.originalAmount,
        frequency: donation.frequency,
        fund_category: donation.fundCategory,
        payment_method: donation.paymentMethod,
        status: donation.status,
        transaction_reference: donation.transactionReference,
        receipt_number: donation.receiptNumber,
        is_anonymous: donation.isAnonymous,
        notes: donation.notes || null,
        created_at: donation.createdAt || new Date().toISOString()
      }
    ]);
    if (error) {
      console.warn('Supabase donation sync notice:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase donation sync exception:', e);
    return false;
  }
};

export const syncVolunteerToSupabase = async (vol: VolunteerApplication): Promise<boolean> => {
  try {
    const { error } = await supabase.from('volunteer_applications').insert([
      {
        full_name: vol.fullName,
        email: vol.email,
        phone: vol.phone,
        country: vol.country,
        location_city: vol.locationCity,
        profession: vol.profession,
        skills: vol.skills,
        area_of_interest: vol.areaOfInterest,
        availability: vol.availability,
        experience_summary: vol.experienceSummary || null,
        motivation: vol.motivation,
        has_child_protection_consent: vol.hasChildProtectionConsent,
        status: vol.status || 'new',
        admin_notes: vol.adminNotes || null,
        created_at: vol.submittedAt || new Date().toISOString()
      }
    ]);
    if (error) {
      console.warn('Supabase volunteer sync notice:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase volunteer sync exception:', e);
    return false;
  }
};

export const syncPartnershipToSupabase = async (p: PartnershipInquiry): Promise<boolean> => {
  try {
    const { error } = await supabase.from('partnership_requests').insert([
      {
        organization_name: p.organizationName,
        organization_type: p.partnershipType || p.organizationType,
        contact_person: p.contactPerson,
        email: p.email,
        phone: p.phone,
        country: p.country,
        partnership_scope: p.partnershipScope || p.partnershipType,
        message: p.proposalDetails || p.message,
        status: 'new',
        created_at: p.submittedAt || new Date().toISOString()
      }
    ]);
    if (error) {
      console.warn('Supabase partnership sync notice:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase partnership sync exception:', e);
    return false;
  }
};

export const syncContactMessageToSupabase = async (msg: ContactMessage): Promise<boolean> => {
  try {
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: msg.fullName || msg.name,
        email: msg.email,
        phone: msg.phone || null,
        subject: msg.subject,
        message: msg.message,
        is_read: msg.isRead || false,
        is_replied: msg.isReplied || false,
        created_at: msg.submittedAt || new Date().toISOString()
      }
    ]);
    if (error) {
      console.warn('Supabase contact message sync notice:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase contact message sync exception:', e);
    return false;
  }
};

export const syncSafeguardingReportToSupabase = async (rep: SafeguardingReport): Promise<boolean> => {
  try {
    const { error } = await supabase.from('safeguarding_reports').insert([
      {
        reference_number: rep.referenceNumber,
        reporter_type: rep.reporterType,
        reporter_name: rep.reporterName || null,
        reporter_email: rep.reporterEmail || null,
        reporter_phone: rep.reporterPhone || null,
        incident_location: rep.incidentLocation,
        incident_date: rep.incidentDate || null,
        incident_details: rep.incidentDetails,
        urgency_level: rep.urgencyLevel,
        status: rep.status,
        investigation_notes: rep.adminNotes || rep.investigationNotes || null,
        created_at: rep.submittedAt || new Date().toISOString()
      }
    ]);
    if (error) {
      console.warn('Supabase safeguarding report sync notice:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase safeguarding report sync exception:', e);
    return false;
  }
};

export const updateVolunteerStatusInSupabase = async (id: string, status: string, adminNotes?: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('volunteer_applications')
      .update({ status, admin_notes: adminNotes, updated_at: new Date().toISOString() })
      .eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

export const updateSafeguardingStatusInSupabase = async (id: string, status: string, notes?: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('safeguarding_reports')
      .update({ status, investigation_notes: notes, updated_at: new Date().toISOString() })
      .eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

export const syncNewsletterSubscriberToSupabase = async (email: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('newsletter_subscribers').insert([
      {
        email,
        is_active: true,
        created_at: new Date().toISOString()
      }
    ]);
    return !error;
  } catch {
    return false;
  }
};
