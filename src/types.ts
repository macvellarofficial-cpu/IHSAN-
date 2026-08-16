export type CurrencyCode = 'USD' | 'UGX' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number; // For multi-currency display
  label: string;
}

export type ProgramCategory = 
  | 'child_protection'
  | 'education'
  | 'food_security'
  | 'emergency_relief'
  | 'community_health'
  | 'clean_water'
  | 'refugees_displaced'
  | 'winter_emergency';

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: ProgramCategory;
  tagline: string;
  description: string;
  detailedScope: string[];
  keyObjectives: string[];
  image: string;
  iconName: string;
  activeProjectsCount: number;
  highlightColor?: string;
}

export type ProjectStatus = 'urgent' | 'ongoing' | 'completed' | 'fully_funded';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProgramCategory;
  status: ProjectStatus;
  location: string;
  country: string;
  region: string;
  heroImage: string;
  galleryImages: string[];
  situation: string;
  objective: string;
  plannedActivities: string[];
  targetBeneficiaries: string;
  targetBeneficiariesNote?: string;
  amountRequired: number; // in USD
  amountRaised: number; // in USD
  featured: boolean;
  urgentAppeal: boolean;
  startDate: string;
  completionDate?: string;
  verifiedData: boolean;
  updates?: {
    date: string;
    title: string;
    content: string;
    image?: string;
  }[];
}

export interface RegionLocation {
  id: string;
  name: string;
  country: string;
  coordinates: { x: number; y: number }; // percentage on custom map
  type: 'headquarters' | 'field_hub' | 'refugee_settlement' | 'emergency_zone' | 'planned';
  description: string;
  humanitarianContext: string;
  activeProjects: string[];
  status: 'Active Field Operations' | 'Emergency Assessment' | 'Planned Expansion';
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  category: ProgramCategory;
  location: string;
  date: string;
  author: string;
  featuredImage: string;
  summary: string;
  content: string[];
  impactOutcome: string;
  safeguardingNotice: string; // e.g. "Name changed for child protection purposes."
  relatedProjectId?: string;
  isPublished: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  featuredImage: string;
  metaDescription: string;
  summary: string;
  content: string;
  tags: string[];
  readingTime?: string;
  isPublished: boolean;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amountUSD: number;
  currency: CurrencyCode;
  originalAmount: number;
  frequency: 'one_time' | 'monthly';
  fundCategory: string;
  paymentMethod: 'mtn_momo' | 'airtel_money' | 'card' | 'bank_transfer' | 'paypal' | 'flutterwave' | 'pesapal';
  status: 'completed' | 'pending' | 'processing';
  transactionReference: string;
  createdAt: string;
  isAnonymous: boolean;
  notes?: string;
  receiptNumber: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  locationCity: string;
  profession: string;
  skills: string[];
  areaOfInterest: string;
  availability: 'weekdays' | 'weekends' | 'flexible' | 'full_time' | 'remote';
  experienceSummary: string;
  motivation: string;
  hasChildProtectionConsent: boolean;
  status: 'new' | 'reviewing' | 'accepted' | 'rejected' | 'approved' | 'reviewed';
  submittedAt: string;
  adminNotes?: string;
}

export interface PartnershipInquiry {
  id: string;
  organizationName: string;
  organizationType: 'ngo' | 'charity' | 'mosque' | 'company' | 'school' | 'foundation' | 'international_agency' | 'other' | string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  partnershipScope: string;
  partnershipType?: string;
  proposalDetails?: string;
  message: string;
  status: 'new' | 'in_dialogue' | 'partnered' | 'archived';
  submittedAt: string;
  createdAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  fullName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
  createdAt?: string;
  isRead: boolean;
  isReplied: boolean;
}

export interface SafeguardingReport {
  id: string;
  referenceNumber: string;
  reporterType: 'confidential' | 'named';
  reporterName?: string;
  reporterEmail?: string;
  reporterPhone?: string;
  incidentLocation: string;
  incidentDate?: string;
  incidentDetails: string;
  urgencyLevel: 'high' | 'critical' | 'medium';
  status: 'received' | 'investigating' | 'action_taken' | 'resolved';
  submittedAt: string;
  createdAt?: string;
  investigationNotes?: string;
  adminNotes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'founders' | 'trustees' | 'management' | 'program_leads' | 'volunteers';
  bio: string;
  isPlaceholderBio: boolean;
  photo: string;
}

export interface PolicyDocument {
  id: string;
  title: string;
  category: 'safeguarding' | 'governance' | 'financial' | 'operational';
  fileSize: string;
  lastUpdated: string;
  summary: string;
  isVerifiedUpload: boolean;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  isVerified: boolean;
  placeholderText: string;
  iconName: string;
  description: string;
}

export interface SiteSettings {
  ngoName: string;
  headOffice: string;
  headOfficeAddress?: string;
  foundedYear: number;
  founders: string[];
  ngoRegistrationNumber: string;
  isRegistrationVerified: boolean;
  contactPhone: string;
  phonePrimary?: string;
  whatsappNumber: string;
  contactEmail: string;
  emailGeneral?: string;
  officeHours: string;
  emergencyHotline: string;
  announcementNotice: string;
  showAnnouncement: boolean;
}

export type AdminRole = 'super_admin' | 'administrator' | 'editor' | 'project_manager' | 'finance_manager' | 'admin';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  lastLogin?: string;
}
