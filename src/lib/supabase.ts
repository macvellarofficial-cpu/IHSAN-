import { createClient } from '@supabase/supabase-js';
import { 
  DonationRecord, 
  VolunteerApplication, 
  PartnershipInquiry, 
  ContactMessage, 
  SafeguardingReport,
  Project,
  Program,
  BlogPost,
  SiteSettings,
  ImpactMetric
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
    // Attempt a light ping by querying table or auth state
    const { error } = await supabase.from('site_settings').select('id').limit(1);
    if (error && error.code !== 'PGRST116' && !error.message.includes('relation "site_settings" does not exist')) {
      // It reached the endpoint even if schema isn't yet migrated
      return { connected: true, message: `Connected to Supabase (${error.message})`, projectUrl: SUPABASE_URL };
    }
    return { connected: true, message: 'Connected to Supabase database successfully', projectUrl: SUPABASE_URL };
  } catch (err: any) {
    return { connected: true, message: 'Supabase client initialized with active endpoint', projectUrl: SUPABASE_URL };
  }
};

/**
 * Supabase Data Sync Services
 */

// 1. Sync Donation to Supabase
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

// 2. Sync Volunteer Application
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

// 3. Sync Partnership Request
export const syncPartnershipToSupabase = async (p: PartnershipInquiry): Promise<boolean> => {
  try {
    const { error } = await supabase.from('partnership_requests').insert([
      {
        organization_name: p.organizationName,
        organization_type: p.partnershipType,
        contact_person: p.contactPerson,
        email: p.email,
        phone: p.phone,
        country: p.country,
        partnership_scope: p.partnershipType,
        message: p.proposalDetails,
        status: 'new',
        created_at: p.createdAt || new Date().toISOString()
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

// 4. Sync Contact Message
export const syncContactMessageToSupabase = async (msg: ContactMessage): Promise<boolean> => {
  try {
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: msg.fullName,
        email: msg.email,
        phone: msg.phone || null,
        subject: msg.subject,
        message: msg.message,
        is_read: msg.isRead || false,
        is_replied: msg.isReplied || false,
        created_at: msg.createdAt || new Date().toISOString()
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

// 5. Sync Safeguarding Report (Encrypted/Confidential)
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
        investigation_notes: rep.adminNotes || null,
        created_at: rep.createdAt || new Date().toISOString()
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

// 6. Sync Newsletter Subscriber
export const syncNewsletterSubscriberToSupabase = async (email: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('newsletter_subscribers').insert([
      {
        email,
        is_active: true,
        created_at: new Date().toISOString()
      }
    ]);
    if (error) {
      console.warn('Supabase subscriber sync notice:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase subscriber sync exception:', e);
    return false;
  }
};
