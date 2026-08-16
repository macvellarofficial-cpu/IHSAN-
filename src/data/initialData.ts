import { 
  Program, 
  Project, 
  RegionLocation, 
  Story, 
  BlogPost, 
  TeamMember, 
  PolicyDocument, 
  ImpactMetric, 
  SiteSettings,
  CurrencyConfig 
} from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateFromUSD: 1, label: 'USD ($)' },
  UGX: { code: 'UGX', symbol: 'USh ', rateFromUSD: 3850, label: 'UGX (USh)' },
  GBP: { code: 'GBP', symbol: '£', rateFromUSD: 0.78, label: 'GBP (£)' },
  EUR: { code: 'EUR', symbol: '€', rateFromUSD: 0.92, label: 'EUR (€)' },
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  ngoName: "Ihsan Children's Foundation",
  headOffice: "Mutundwe, Kampala, Uganda",
  foundedYear: 2019,
  founders: ["Mr Hakimu", "Jeremiah"],
  ngoRegistrationNumber: "[ADD VERIFIED REGISTRATION NUMBER]",
  isRegistrationVerified: false,
  contactPhone: "+256 741 799 231",
  whatsappNumber: "+256 702 570 802",
  contactEmail: "info@ihsanchildrensfoundation.org",
  officeHours: "Monday – Friday: 8:30 AM – 5:00 PM EAT (East Africa Time)",
  emergencyHotline: "+256 702 570 802 (24/7 Humanitarian Alert)",
  announcementNotice: "Notice: We do not solicit personal financial transfers outside our verified channels. Uganda NGO Registration documentation is available in our Transparency section.",
  showAnnouncement: true,
};

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    slug: 'child-protection',
    title: 'Child Protection',
    category: 'child_protection',
    tagline: 'Defending the dignity, safety, and rights of every vulnerable child.',
    description: 'Protecting vulnerable children from abuse, neglect, exploitation and harmful environments while promoting safe, supportive community ecosystems and safeguarding structures.',
    detailedScope: [
      'Community-based child protection committees and early response desks',
      'Psychosocial support, trauma counseling, and safe space access',
      'Legal advocacy, birth registration assistance, and protective guardianship',
      'Safeguarding training for local schools, caretakers, and religious leaders'
    ],
    keyObjectives: [
      'Zero tolerance for child exploitation, forced labor, or physical harm',
      'Strengthen family-level protection systems and guardian capacity',
      'Establish certified confidential reporting channels for child safety'
    ],
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80',
    iconName: 'ShieldCheck',
    activeProjectsCount: 3,
    highlightColor: 'border-amber-500'
  },
  {
    id: 'prog-2',
    slug: 'education',
    title: 'Education & Learning Support',
    category: 'education',
    tagline: 'Opening pathways out of poverty through quality learning and school kits.',
    description: 'Supplying school materials, education access, foundational learning support, vulnerable student scholarships where available, and grassroots community learning centers.',
    detailedScope: [
      'Distribution of durable school bags, textbooks, notebooks, and writing materials',
      'School fee sponsorship for total orphans and children from destitute households',
      'After-school remedial tutoring, literacy circles, and digital literacy introductions',
      'Classroom rehabilitation and desk provision in underserved schools'
    ],
    keyObjectives: [
      'Prevent school dropouts among vulnerable girls and orphaned boys',
      'Provide essential learning materials to underserved rural and urban children',
      'Support community educators with teaching aids and safe classrooms'
    ],
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
    iconName: 'BookOpen',
    activeProjectsCount: 4,
    highlightColor: 'border-emerald-600'
  },
  {
    id: 'prog-3',
    slug: 'food-security',
    title: 'Food Security & Nutrition',
    category: 'food_security',
    tagline: 'Nourishing young bodies and supporting household resilience.',
    description: 'Providing food parcels, community feeding activities, urban micro-gardening, and nutritional support for vulnerable child-headed and elderly-headed households.',
    detailedScope: [
      'Monthly balanced staple packs (maize flour, beans, rice, cooking oil, salt, enriched porridge)',
      'Nutrition screening for under-5 infants and breastfeeding mothers',
      'Support for climate-resilient vegetable gardens in community homesteads',
      'School feeding initiatives ensuring children stay focused during classes'
    ],
    keyObjectives: [
      'Eliminate acute hunger in targeted informal settlements in Kampala and rural outposts',
      'Improve dietary diversity and curb childhood stunting and malnutrition',
      'Empower families with seed kits and sustainable backyard farming'
    ],
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
    iconName: 'UtensilsCrossed',
    activeProjectsCount: 4,
    highlightColor: 'border-amber-600'
  },
  {
    id: 'prog-4',
    slug: 'emergency-food-relief',
    title: 'Emergency Food Relief',
    category: 'emergency_relief',
    tagline: 'Rapid humanitarian response during drought, displacement, and crisis.',
    description: 'Rapid food assistance and emergency sustenance during sudden displacement, severe climate disasters, droughts in arid areas like Karamoja, and humanitarian crises.',
    detailedScope: [
      'Immediate deployment of dry rations and emergency therapeutic food',
      'Coordination with local leaders and emergency logistics partners',
      'Prioritized delivery for lactating mothers, elderly guardians, and unaccompanied minors',
      'Transparent verification and dignity-centered queue management'
    ],
    keyObjectives: [
      'Deliver emergency rations within 48 to 72 hours of humanitarian alert trigger',
      'Prevent severe starvation in drought-affected and flood-isolated zones',
      'Maintain full accountability logs and partner validation'
    ],
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80',
    iconName: 'Truck',
    activeProjectsCount: 2,
    highlightColor: 'border-rose-600'
  },
  {
    id: 'prog-5',
    slug: 'community-health',
    title: 'Community Health & Hygiene',
    category: 'community_health',
    tagline: 'Preventive healthcare, sanitation, and maternal-child wellbeing.',
    description: 'Basic health outreach, hygiene awareness, maternal and child wellbeing initiatives, and primary medical support delivered through appropriately qualified health partners.',
    detailedScope: [
      'Community hygiene workshops, handwashing stations, and sanitation kit distributions',
      'Deworming and vitamin supplementation drives with registered healthcare staff',
      'Menstrual hygiene management kits and dignified reproductive education for girls',
      'Malaria prevention via long-lasting insecticidal mosquito nets'
    ],
    keyObjectives: [
      'Reduce preventable waterborne diseases and childhood malaria episodes',
      'Ensure adolescent girls attend school regularly through dignified menstrual kits',
      'Partner strictly with licensed medical practitioners and district health teams'
    ],
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80',
    iconName: 'HeartPulse',
    activeProjectsCount: 2,
    highlightColor: 'border-cyan-600'
  },
  {
    id: 'prog-6',
    slug: 'clean-water',
    title: 'Clean & Safe Drinking Water',
    category: 'clean_water',
    tagline: 'Sustainable clean water access to preserve life and stop disease.',
    description: 'Water access projects including community deep wells, boreholes, rainwater harvesting tanks, gravity flow taps, and safe drinking-water filtration systems.',
    detailedScope: [
      'Hydrogeological surveys and community-managed deep borehole installations',
      'Rainwater harvesting storage systems installed at local schools and community centers',
      'Formation and training of local Water User Committees for long-term maintenance',
      'Water quality laboratory testing and solar pumping enhancements'
    ],
    keyObjectives: [
      'Cut daily water-walk distances from 4 km to safe village-level points',
      'Prevent recurring outbreaks of cholera, typhoid, and bilharzia',
      'Ensure 100% community ownership and long-term maintenance funding'
    ],
    image: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=900&q=80',
    iconName: 'Droplets',
    activeProjectsCount: 3,
    highlightColor: 'border-blue-600'
  },
  {
    id: 'prog-7',
    slug: 'refugee-displaced-children',
    title: 'Refugee & Displaced Children',
    category: 'refugees_displaced',
    tagline: 'Restoring dignity and protection to families forced to flee their homes.',
    description: 'Targeted humanitarian assistance addressing education, food security, shelter-related protection, trauma alleviation, and basic survival items for refugee and displaced children.',
    detailedScope: [
      'Safe learning spaces and school re-enrollment support in refugee-hosting districts',
      'Household relief packs and essential household items for newly arrived families',
      'Language transition support, peace-building, and social cohesion circles',
      'Coordination with local settlement commandants and humanitarian clusters'
    ],
    keyObjectives: [
      'Provide protection and emotional reassurance to traumatized child refugees',
      'Bridge critical gaps between transit reception and long-term stabilization',
      'Foster inclusive community bonds between host communities and displaced families'
    ],
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80',
    iconName: 'Users',
    activeProjectsCount: 2,
    highlightColor: 'border-violet-600'
  },
  {
    id: 'prog-8',
    slug: 'winter-emergency-essentials',
    title: 'Winter & Emergency Essentials',
    category: 'winter_emergency',
    tagline: 'Warmth, shelter essentials, and dignifying household comfort.',
    description: 'Providing durable clothing, warm blankets, sleeping mattresses, hygiene kits, tarpaulins, and seasonal emergency survival supplies to destitute children and households.',
    detailedScope: [
      'Thermal blankets and waterproof sleeping mats for cold, damp settlement floors',
      'Dignified clothing bundles and durable shoes for growing children',
      'Emergency hygiene sets (soap, basins, sanitary items, dental packs)',
      'Solar lamps enabling children to study safely without hazardous kerosene fumes'
    ],
    keyObjectives: [
      'Shield vulnerable toddlers and elderly caretakers from pneumonia and respiratory illnesses',
      'Deliver immediate dignity to families sleeping on bare soil or torn mats',
      'Ensure seasonal protection before heavy rainy and cold seasons commence'
    ],
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80',
    iconName: 'PackageCheck',
    activeProjectsCount: 2,
    highlightColor: 'border-amber-700'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Karamoja Emergency Drought Food Relief',
    slug: 'karamoja-drought-food-relief',
    category: 'emergency_relief',
    status: 'urgent',
    location: 'Kotido & Moroto Districts, Karamoja',
    country: 'Uganda',
    region: 'Northern Uganda',
    heroImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80'
    ],
    situation: 'Prolonged erratic rains and consecutive crop failures in Karamoja have left hundreds of households, particularly child-headed families and elder guardians, facing severe food shortages and acute malnutrition.',
    objective: 'Provide immediate emergency dry food parcels (posho, high-protein beans, fortified cooking oil, and nutritious baby flour) to vulnerable households in remote manyattas.',
    plannedActivities: [
      'Distribution of 50kg dry ration kits per vulnerable household',
      'Emergency malnutrition screening with community health mobilizers',
      'Coordination with local village elders for fair, safe, and dignified distribution',
      'Monitoring post-distribution food access and household recovery'
    ],
    targetBeneficiaries: '350 Vulnerable Households (approx. 1,800 Children & Guardians)',
    targetBeneficiariesNote: 'Verified beneficiary list compiled in collaboration with local community leadership.',
    amountRequired: 18500,
    amountRaised: 11420,
    featured: true,
    urgentAppeal: true,
    startDate: '2024-01-15',
    verifiedData: true,
    updates: [
      {
        date: '2024-03-02',
        title: 'First Phase Distribution Completed in Kotido',
        content: 'Our field coordination team successfully delivered initial food rations to 120 families in Kotido sub-county under local administrative supervision.'
      }
    ]
  },
  {
    id: 'proj-2',
    title: 'Kampala Urban Vulnerable Children School Kits',
    slug: 'kampala-school-supplies-campaign',
    category: 'education',
    status: 'ongoing',
    location: 'Mutundwe, Rubaga & Bwaise, Kampala',
    country: 'Uganda',
    region: 'Central Uganda',
    heroImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80'
    ],
    situation: 'Many bright, eager children in informal settlements around Kampala are unable to remain in school because their families cannot afford compulsory scholastic supplies, notebooks, pens, and uniform requirements.',
    objective: 'Equip vulnerable primary school students with comprehensive scholastic packs and school re-entry kits to keep them safely in class throughout the academic term.',
    plannedActivities: [
      'Procurement of heavy-duty waterproof backpacks, mathematical sets, and exercise books',
      'Direct distribution at partner community learning hubs',
      'Student mentorship sessions and quarterly academic progress checks',
      'Engagement with headteachers to waive auxiliary supply penalties'
    ],
    targetBeneficiaries: '500 Primary School Children in Kampala Suburbs',
    amountRequired: 9200,
    amountRaised: 6850,
    featured: true,
    urgentAppeal: false,
    startDate: '2024-02-01',
    verifiedData: true,
    updates: [
      {
        date: '2024-02-28',
        title: '250 Learning Packs Handed Over',
        content: 'Children from Mutundwe and surrounding areas received their complete semester books and writing materials.'
      }
    ]
  },
  {
    id: 'proj-3',
    title: 'Community Clean Water Well Project',
    slug: 'community-clean-water-well',
    category: 'clean_water',
    status: 'ongoing',
    location: 'Wakiso & Mukono Rural Border Communities',
    country: 'Uganda',
    region: 'Central Region',
    heroImage: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80'
    ],
    situation: 'Over 1,200 villagers, mostly school children and mothers, walk more than 3 kilometers daily to fetch muddy, unprotected pond water contaminated with waterborne pathogens.',
    objective: 'Drill a solar-powered deep borehole with 10,000L raised storage tank and public multi-tap distribution station to guarantee free, safe drinking water.',
    plannedActivities: [
      'Comprehensive hydrogeological survey and environmental impact clearance',
      'Deep rotary drilling and casing installation to reach uncontaminated aquifers',
      'Installation of solar pumping array and protected concrete apron',
      'Training the elected Village Water User Committee on preventive maintenance'
    ],
    targetBeneficiaries: '1,250 Community Members & 2 Local Primary Schools',
    amountRequired: 14000,
    amountRaised: 10200,
    featured: true,
    urgentAppeal: false,
    startDate: '2024-01-10',
    verifiedData: true
  },
  {
    id: 'proj-4',
    title: 'Refugee Children Safe Spaces & Learning Support',
    slug: 'refugee-children-learning-support',
    category: 'refugees_displaced',
    status: 'urgent',
    location: 'West Nile Refugee Settlements (Yumbe & Adjumani)',
    country: 'Uganda',
    region: 'West Nile',
    heroImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
    ],
    situation: 'Children fleeing civil strife in neighboring regions face immense psychological distress, overcrowded learning tents, and lack of basic writing materials to resume their education in Uganda.',
    objective: 'Establish supportive child-friendly learning hubs, trauma-informed counseling groups, and distribute essential educational kits to displaced young learners.',
    plannedActivities: [
      'Renovation of communal shaded learning spaces with adequate ventilation',
      'Recruitment of volunteer community educators fluent in local dialects',
      'Weekly art therapy, storytelling circles, and structured recreational play',
      'Hygiene kit and soap distribution to settlement households'
    ],
    targetBeneficiaries: '450 Displaced Children & 180 Caregiver Families',
    amountRequired: 16500,
    amountRaised: 7900,
    featured: true,
    urgentAppeal: true,
    startDate: '2023-11-20',
    verifiedData: true
  },
  {
    id: 'proj-5',
    title: 'Ramadan & Eid Community Food Distribution',
    slug: 'ramadan-eid-community-food-distribution',
    category: 'food_security',
    status: 'completed',
    location: 'Kampala & Wakiso Vulnerable Communities',
    country: 'Uganda',
    region: 'Central Uganda',
    heroImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
    ],
    situation: 'During sacred months, destitute households struggle to secure sufficient food for Iftar and Eid celebrations, leaving orphans and low-income families without dignified sustenance.',
    objective: 'Distributed dignified family food hampers containing rice, sugar, cooking oil, dates, flour, and fresh meat packages to vulnerable Muslim and underprivileged families across Kampala.',
    plannedActivities: [
      'Carefully surveyed needy households across Mutundwe and neighboring informal settlements',
      'Packaged high-grade food essentials under strict hygienic standards',
      'Organized orderly, dignified collection centers with home deliveries for disabled elders',
      'Published photographic and financial distribution logs to donors'
    ],
    targetBeneficiaries: '400 Low-Income Families & 1,600+ Children',
    amountRequired: 12000,
    amountRaised: 12000,
    featured: false,
    urgentAppeal: false,
    startDate: '2023-03-01',
    completionDate: '2023-04-25',
    verifiedData: true
  },
  {
    id: 'proj-6',
    title: 'South Sudan Emergency Cross-Border Assessment',
    slug: 'south-sudan-emergency-cross-border-relief',
    category: 'emergency_relief',
    status: 'ongoing',
    location: 'Border Crossing Corridors & Nimule Entry Points',
    country: 'South Sudan / Uganda Border',
    region: 'Regional Humanitarian Zone',
    heroImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80'
    ],
    situation: 'Newly arrived families crossing into Uganda via northern border points require urgent humanitarian triage, clean water, high-energy biscuits, and rapid child-protection screening.',
    objective: 'Deploy mobile relief kits containing clean water sachets, electrolyte packs, blankets, and child identification tags to prevent family separation.',
    plannedActivities: [
      'Rapid field assessment of transit gathering hubs along border entries',
      'Direct distribution of emergency energy rations and clean drinking water',
      'Immediate referral of sick or unaccompanied minors to protection agencies',
      'Documenting field needs for coordinated humanitarian intervention'
    ],
    targetBeneficiaries: '300 Newly Arrived Transit Families',
    amountRequired: 15000,
    amountRaised: 8100,
    featured: false,
    urgentAppeal: true,
    startDate: '2024-02-15',
    verifiedData: true
  }
];

export const INITIAL_REGIONS: RegionLocation[] = [
  {
    id: 'reg-kampala',
    name: 'Kampala (Head Office: Mutundwe)',
    country: 'Uganda',
    coordinates: { x: 52, y: 62 },
    type: 'headquarters',
    description: 'Foundation headquarters, administrative nerve center, urban education support, child protection response, and Kampala community feeding programs.',
    humanitarianContext: 'Focus on informal urban settlements, orphans, school drop-out prevention, and emergency support for destitute urban families.',
    activeProjects: ['Kampala Urban Vulnerable Children School Kits', 'Ramadan & Eid Food Hampers', 'Mutundwe Community Protection Desks'],
    status: 'Active Field Operations'
  },
  {
    id: 'reg-karamoja',
    name: 'Karamoja Sub-Region (Northern Uganda)',
    country: 'Uganda',
    coordinates: { x: 74, y: 28 },
    type: 'emergency_zone',
    description: 'Arid pastoralist zone facing recurring climate emergencies, erratic rainfall, food insecurity, and childhood malnutrition in remote manyattas.',
    humanitarianContext: 'High rates of food insecurity and acute malnutrition; requires durable grain storage and emergency dry ration deployment.',
    activeProjects: ['Karamoja Emergency Drought Food Relief', 'Nutritional Screening Outreach'],
    status: 'Active Field Operations'
  },
  {
    id: 'reg-westnile',
    name: 'West Nile Refugee Settlements (Yumbe / Adjumani)',
    country: 'Uganda',
    coordinates: { x: 30, y: 24 },
    type: 'refugee_settlement',
    description: 'Hosting thousands of displaced families and unaccompanied minors fleeing regional unrest in South Sudan and DR Congo.',
    humanitarianContext: 'Uganda is Africa\'s largest refugee-hosting nation; critical focus on education continuity, child psychosocial protection, and safe water.',
    activeProjects: ['Refugee Children Safe Spaces & Learning Support'],
    status: 'Active Field Operations'
  },
  {
    id: 'reg-southsudan',
    name: 'South Sudan Border & Transit Hubs',
    country: 'South Sudan / Uganda Border',
    coordinates: { x: 42, y: 12 },
    type: 'emergency_zone',
    description: 'Cross-border humanitarian assessment corridors supporting newly arrived displaced families with transit sustenance.',
    humanitarianContext: 'Needs include emergency food rations, safe transit protection, and family tracing support.',
    activeProjects: ['South Sudan Emergency Cross-Border Assessment'],
    status: 'Emergency Assessment'
  },
  {
    id: 'reg-future',
    name: 'East & Horn of Africa Expansion Hubs',
    country: 'Regional Expansion',
    coordinates: { x: 80, y: 50 },
    type: 'planned',
    description: 'Future certified humanitarian partner network planned across East Africa pending formal regulatory clearances.',
    humanitarianContext: 'Planned long-term partnerships with verified local charities to scale Ihsan humanitarian principles regionally.',
    activeProjects: ['[Partner Accreditation in Progress]'],
    status: 'Planned Expansion'
  }
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'A Dignified Path to the Classroom for Ten-Year-Old Amina',
    slug: 'amina-path-to-classroom',
    category: 'education',
    location: 'Mutundwe, Kampala',
    date: '2024-02-18',
    author: 'Field Communications Team',
    featuredImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    summary: 'How basic scholastic tools and a tuition bridge restored hope and classroom attendance to a young aspiring teacher.',
    content: [
      'In early 2024, our community outreach team met ten-year-old Amina in Mutundwe. Following the passing of her father, her grandmother was struggling to balance basic rent with the cost of required school exercise books, uniform shoes, and stationery.',
      'Amina had already missed two months of primary class. Despite the setbacks, her desire to read and learn remained undiminished.',
      'Through our Education Support program, Amina received a full scholastic package comprising durable textbooks, writing books, pens, and a safe sturdy backpack. In addition, our team coordinated with her local school administration to facilitate her smooth re-entry.',
      'Today, Amina is back in class, participating actively and inspiring her peers. Her story reflects why we believe every child deserves access to education without economic humiliation.'
    ],
    impactOutcome: 'Full academic year school attendance secured with ongoing mentorship check-ins.',
    safeguardingNotice: 'Child Safeguarding Note: Name and identifying details changed to protect the privacy and dignity of the child in accordance with our Safeguarding Charter.',
    relatedProjectId: 'proj-2',
    isPublished: true
  },
  {
    id: 'story-2',
    title: 'Restoring Clean Water and Health to 250 Village Families',
    slug: 'restoring-clean-water-rural-wakiso',
    category: 'clean_water',
    location: 'Rural Wakiso Outskirts',
    date: '2024-01-28',
    author: 'Humanitarian WASH Officer',
    featuredImage: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=800&q=80',
    summary: 'Replacing contaminated pond water with a reliable, community-managed clean water source for children and mothers.',
    content: [
      'For over four years, school-aged children in this rural neighborhood woke up at 5:30 AM to walk steep paths down to an open pond. The water was frequently cloudy and shared with livestock, leading to repeated bouts of waterborne illness.',
      'Through generous contributions to our Clean Water campaign, we were able to conduct a hydrogeological survey and drill a dedicated deep borehole.',
      'The new water point is clean, certified, and fully accessible within minutes. The local community has formed a 7-member Water User Committee, of which 4 members are women, to steward the tap point.',
      'Mothers in the village report that children no longer miss morning classes due to water-fetching duties, and clinic visits for stomach ailments have significantly decreased.'
    ],
    impactOutcome: '250+ households have permanent, tested clean water within 200 meters of their homes.',
    safeguardingNotice: 'Verified community project report documented with community leadership consent.',
    relatedProjectId: 'proj-3',
    isPublished: true
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Meaning of Ihsan: Excellence, Compassion, and Humanity in Action',
    slug: 'meaning-of-ihsan-humanitarian-action',
    category: 'Foundation News',
    author: 'Ihsan Editorial Team',
    date: '2024-02-10',
    featuredImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    metaDescription: 'Exploring how the foundational concept of Ihsan drives ethical, transparent, and dignified humanitarian relief in Uganda.',
    summary: 'In Arabic, "Ihsan" represents the highest tier of moral conduct: doing what is beautiful, extending sincere kindness, and striving for excellence. Here is how that spiritual principle translates into child-centered charity.',
    content: `When Mr Hakimu and Jeremiah established Ihsan Children's Foundation in 2019 in Mutundwe, Kampala, the foundation was anchored in the timeless concept of Ihsan.\n\nIn classical traditions, Ihsan is defined as performing every good deed with the utmost integrity, sincerity, and perfection—as though you are in direct presence of the Divine.\n\nIn the realm of humanitarian work, Ihsan is not merely about giving leftovers; it is about treating every orphaned child, refugee mother, and struggling guardian with absolute dignity, reverence, and uncompromised respect.\n\nWe reject sensationalist imagery that exploits the suffering of vulnerable children. Instead, we uphold child safeguarding, verifiable accounting, and community-led solutions that leave recipients empowered rather than pitied.`,
    tags: ['Ihsan Principle', 'Values', 'Child Dignity', 'Uganda NGO'],
    isPublished: true
  },
  {
    id: 'post-2',
    title: 'Strengthening Child Safeguarding in Community Programs: Our 2024 Commitment',
    slug: 'strengthening-child-safeguarding-2024',
    category: 'Child Protection',
    author: 'Safeguarding Officer',
    date: '2024-01-22',
    featuredImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
    metaDescription: 'Our zero-tolerance approach to child abuse, exploitation, and improper media usage in humanitarian programs.',
    summary: 'A detailed overview of our updated Child Safeguarding Protocol, volunteer vetting procedures, and secure reporting channels.',
    content: `Protecting vulnerable children is the bedrock of everything we do. In 2024, Ihsan Children's Foundation has enacted enhanced vetting procedures for all staff, volunteers, and partner field agents.\n\nKey pillars of our Safeguarding Charter include:\n1. Strict background references and child-protection declarations for every volunteer.\n2. Responsible photography guidelines that prohibit identifiable portraits of distressed minors.\n3. Confidential reporting mechanisms accessible to community members and beneficiaries.\n\nWe invite all partners and supporters to review our complete policy documents in our Transparency repository.`,
    tags: ['Safeguarding', 'Child Protection', 'Accountability', 'Policies'],
    isPublished: true
  },
  {
    id: 'post-3',
    title: 'Food Relief Logistics in Karamoja: Overcoming Dry Terrain and Reaching Remote Manyattas',
    slug: 'food-relief-logistics-karamoja',
    category: 'Emergency Relief',
    author: 'Field Operations Coordinator',
    date: '2024-03-01',
    featuredImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    metaDescription: 'Field dispatch from our emergency dry ration distribution in Kotido and Moroto districts.',
    summary: 'A first-hand look at the challenges and triumphs of delivering essential sustenance to drought-affected families in Northern Uganda.',
    content: `Delivering emergency food parcels in Karamoja requires robust community dialogue, meticulous verification of vulnerable households, and heavy-duty logistics across rugged terrain.\n\nBy partnering closely with local elders, our teams ensured that rations went directly to the most vulnerable—chiefly elderly grandmothers raising orphaned grandchildren.\n\nEvery sack of posho and bean supply is weighed, registered, and signed off under local village leadership oversight.`,
    tags: ['Karamoja', 'Food Security', 'Field Dispatch', 'Emergency Relief'],
    isPublished: true
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Mr Hakimu',
    role: 'Co-Founder',
    category: 'founders',
    bio: '[Verified Biography and full profile details to be updated by authorized administration. Co-founded Ihsan Children\'s Foundation in 2019 in Mutundwe, Kampala, committed to child protection and community welfare.]',
    isPlaceholderBio: true,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'team-2',
    name: 'Jeremiah',
    role: 'Co-Founder',
    category: 'founders',
    bio: '[Verified Biography and full profile details to be updated by authorized administration. Co-founded Ihsan Children\'s Foundation in 2019 with a passion for grassroots humanitarian intervention and youth education.]',
    isPlaceholderBio: true,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'team-3',
    name: 'Community Advisory Board',
    role: 'Local Governance & Safeguarding Counsel',
    category: 'trustees',
    bio: 'Consists of respected community elders, educators, and civil society advocates who provide strategic guidance, ethics oversight, and accountability review.',
    isPlaceholderBio: false,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'team-4',
    name: 'Field Volunteer Corps',
    role: 'Grassroots Community Mobilizers',
    category: 'volunteers',
    bio: 'Dedicated local youth and community volunteers who assist with relief distribution logistics, scholastic kit handovers, and community health sensitization.',
    isPlaceholderBio: false,
    photo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_DOCUMENTS: PolicyDocument[] = [
  {
    id: 'doc-1',
    title: 'Child Safeguarding & Protection Policy',
    category: 'safeguarding',
    fileSize: '1.4 MB PDF',
    lastUpdated: 'January 2024',
    summary: 'Our foundational charter detailing mandatory reporting protocols, code of conduct, responsible media practices, and preventative safeguarding mechanisms.',
    isVerifiedUpload: true
  },
  {
    id: 'doc-2',
    title: 'Financial Accountability & Anti-Fraud Policy',
    category: 'financial',
    fileSize: '890 KB PDF',
    lastUpdated: 'February 2024',
    summary: 'Guidelines governing dual-signatory authorizations, procurement integrity, independent project audits, and transparent donor receipting.',
    isVerifiedUpload: true
  },
  {
    id: 'doc-3',
    title: 'Volunteer Code of Conduct & Vetting Charter',
    category: 'governance',
    fileSize: '740 KB PDF',
    lastUpdated: 'January 2024',
    summary: 'Requirements for community and international volunteers, including mandatory background checks, non-discrimination pledges, and ethics standards.',
    isVerifiedUpload: true
  },
  {
    id: 'doc-4',
    title: 'Donation & Refund Governance Framework',
    category: 'financial',
    fileSize: '620 KB PDF',
    lastUpdated: 'March 2024',
    summary: 'Policies outlining fund allocation, ring-fenced appeals, currency handling, and donor verification procedures.',
    isVerifiedUpload: true
  },
  {
    id: 'doc-5',
    title: 'Complaints & Whistleblower Mechanism',
    category: 'operational',
    fileSize: '950 KB PDF',
    lastUpdated: 'December 2023',
    summary: 'A secure, confidential procedure enabling community members, beneficiaries, and staff to register grievances or integrity concerns without fear of reprisal.',
    isVerifiedUpload: true
  },
  {
    id: 'doc-6',
    title: 'Uganda NGO Registration & Compliance Dossier',
    category: 'governance',
    fileSize: 'Pending Official Verification',
    lastUpdated: '2024 Dossier',
    summary: 'Official regulatory documentation and compliance filings with the Uganda NGO Bureau. [Placeholder awaiting final verified administrative certificate upload].',
    isVerifiedUpload: false
  }
];

export const INITIAL_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'metric-1',
    label: 'Children Supported',
    value: '[Verified statistic in review]',
    isVerified: false,
    placeholderText: 'Data undergoing independent audit',
    iconName: 'Smile',
    description: 'Direct beneficiaries of school kits, protective safe spaces, and child support.'
  },
  {
    id: 'metric-2',
    label: 'Meals & Food Parcels Distributed',
    value: '[Verified statistic in review]',
    isVerified: false,
    placeholderText: 'Documented field logs being compiled',
    iconName: 'Utensils',
    description: 'Emergency rations and family nutritional packages deployed across target zones.'
  },
  {
    id: 'metric-3',
    label: 'Clean Water Points Built',
    value: '3 Wells in Progress',
    isVerified: true,
    placeholderText: 'Community boreholes and rainwater systems',
    iconName: 'Droplet',
    description: 'Sustainable water installations active or underway in rural communities.'
  },
  {
    id: 'metric-4',
    label: 'Active Program Sectors',
    value: '8 Core Areas',
    isVerified: true,
    placeholderText: 'From child protection to emergency relief',
    iconName: 'Layers',
    description: 'Dedicated humanitarian verticals managed by foundation coordinators.'
  }
];
