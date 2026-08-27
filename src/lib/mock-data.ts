export const AGENCY = {
  name: "Longevity Capital Insurance, LLC",
  shortName: "Longevity Capital Insurance",
  tagline: "Medicare, Life, Health, Home, Auto & More",
  brandLine: "Work with Experienced Insurance Experts!",
  positioning:
    "Longevity Capital Insurance, LLC team will shop your policy needs to multiple carriers to find you the lowest possible rate combined with the best coverage.",
  address: "6203 Abercorn Street, Suite 101, Savannah, GA 31405",
  addressLines: ["6203 Abercorn Street, Suite 101", "Savannah, GA 31405"],
  phone: "(912) 349-4379",
  phoneTel: "+19123494379",
  mobile: "(912) 308-4087",
  mobileTel: "+19123084087",
  email: "gbruce@lcinsurancenow.com",
  hoursWeekday: "Mon–Fri 10:00 AM–5:00 PM",
  hoursWeekend: "Sat–Sun Appointment Only",
  facebook: "https://facebook.com/Lcinsurancenow",
  instagram: "https://instagram.com/longevitycapital_insurance",
  mapUrl: "https://maps.google.com/?q=6203+Abercorn+Street+Suite+101+Savannah+GA+31405",
  veteranOwned: "Veteran Owned | Licensed Professional",
} as const;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
  address: string;
  memberSince: string;
  avatarUrl?: string;
  language: "en" | "es";
  twoFactor: boolean;
  household: HouseholdMember[];
};

export type HouseholdMember = {
  id: string;
  name: string;
  relationship: string;
  dob: string;
};

export type Agent = {
  id: string;
  name: string;
  title: string;
  license: string;
  phone: string;
  phoneTel: string;
  email: string;
  initials: string;
  photo: string;
  online: boolean;
  lastSeen: string;
};

export type ProductSlug =
  | "auto"
  | "home"
  | "life"
  | "health"
  | "medicare"
  | "business"
  | "dental"
  | "renters";

export type ProductField = {
  id: string;
  label: string;
  type: "text" | "select" | "number";
  placeholder?: string;
  options?: string[];
};

export type Product = {
  slug: ProductSlug;
  name: string;
  short: string;
  about: string;
  hero: string;
  heroAlt: string;
  covered: string[];
  faqs: { q: string; a: string }[];
  fields: ProductField[];
};

export type PolicyStatus = "Active" | "Pending" | "Expired";

export type CoverageLine = {
  type: string;
  limit: string;
  deductible: string;
};

export type Policy = {
  id: string;
  product: ProductSlug;
  name: string;
  number: string;
  carrier: string;
  status: PolicyStatus;
  premium: number;
  frequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
  effectiveDate: string;
  renewalDate: string;
  renewalPremium?: number;
  insureds: string[];
  beneficiaries?: { name: string; relationship: string }[];
  coverage: CoverageLine[];
  reminder: boolean;
  autopay: boolean;
  hasCard: boolean;
};

export type QuoteStatus = "Pending Review" | "In Progress" | "Quote Ready" | "Expired";

export type Quote = {
  id: string;
  product: ProductSlug;
  submittedAt: string;
  status: QuoteStatus;
  step: 0 | 1 | 2 | 3;
  personal: Record<string, string>;
  details: Record<string, string>;
  docs: string[];
  premium?: number;
  notes?: string;
};

export type ClaimStatus = "Submitted" | "Under Review" | "Advocate Assigned" | "Resolved";

export type Claim = {
  id: string;
  reference: string;
  policyId: string;
  product: ProductSlug;
  incidentDate: string;
  location: string;
  type: string;
  description: string;
  contactPref: "call" | "email" | "text";
  bestTime: string;
  photos: string[];
  submittedAt: string;
  status: ClaimStatus;
  notes: { from: "agent" | "you"; text: string; time: string }[];
};

export type AppointmentType = "In-Person" | "Phone Call";
export type AppointmentStatus = "Upcoming" | "Past" | "Cancelled";

export type Appointment = {
  id: string;
  type: AppointmentType;
  date: string;
  time: string;
  reason: string;
  notes: string;
  status: AppointmentStatus;
};

export type DocType =
  | "Declarations Page"
  | "ID Cards"
  | "Policy Contract"
  | "Endorsements"
  | "Claims Correspondence"
  | "Supporting";

export type AppDocument = {
  id: string;
  name: string;
  type: DocType;
  policyId?: string;
  claimId?: string;
  addedAt: string;
  size: string;
  caption?: string;
};

export type ChatMessage = {
  id: string;
  from: "agent" | "you";
  text: string;
  time: string;
  attachment?: string;
};

export type NotificationCategory = "quotes" | "appointments" | "policies" | "messages" | "documents" | "claims";

export type AppNotification = {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  time: string;
  dateGroup: string;
  read: boolean;
  href: string;
};

export type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  exp: string;
  default: boolean;
  kind: "card" | "bank";
};

export type Payment = {
  id: string;
  date: string;
  policyId: string;
  product: ProductSlug;
  amount: number;
  status: "Paid" | "Failed" | "Refunded";
};

export type NotifPrefs = Record<NotificationCategory, boolean>;

export const seedAgent: Agent = {
  id: "ag1",
  name: "G. Bruce",
  title: "Licensed Agent",
  license: "GA Lic. #187442",
  phone: AGENCY.phone,
  phoneTel: AGENCY.phoneTel,
  email: AGENCY.email,
  initials: "GB",
  photo:
    "https://images.unsplash.com/photo-1560250097-0b367358e76f?auto=format&fit=crop&w=400&q=80",
  online: true,
  lastSeen: "Online now",
};

export const seedUsers: User[] = [
  {
    id: "u1",
    firstName: "Jordan",
    lastName: "Hales",
    email: "jordan@email.com",
    phone: "(912) 555-0148",
    password: "Longevity1",
    dob: "1988-04-12",
    address: "412 Habersham Street, Savannah, GA 31401",
    memberSince: "2024-03-18",
    language: "en",
    twoFactor: false,
    household: [
      { id: "h1", name: "Morgan Hales", relationship: "Spouse", dob: "1990-09-03" },
      { id: "h2", name: "Eli Hales", relationship: "Child", dob: "2018-06-21" },
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "auto",
    name: "Auto Insurance",
    short: "Fast, accurate auto quotes with the right coverage for your vehicle.",
    about:
      "Get fast and accurate quotes without all the hassle. Work with EXPERT agents that will make sure you have the right coverage.",
    hero: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Car on an open road at dusk",
    covered: [
      "Bodily injury and property damage liability",
      "Collision and comprehensive coverage",
      "Uninsured / underinsured motorist protection",
      "Medical payments and roadside assistance options",
    ],
    faqs: [
      { q: "How quickly can I get an auto quote?", a: "Most drivers receive a quote review from a licensed agent within one business day after submitting vehicle details." },
      { q: "Can you shop multiple carriers?", a: "Yes. We shop your policy needs to multiple carriers to find the lowest possible rate combined with the best coverage." },
      { q: "What documents help speed things up?", a: "A current declarations page, driver’s license, and VIN make quoting faster and more accurate." },
    ],
    fields: [
      { id: "year", label: "Vehicle year", type: "number", placeholder: "2022" },
      { id: "make", label: "Make", type: "text", placeholder: "Toyota" },
      { id: "model", label: "Model", type: "text", placeholder: "Rav4" },
      { id: "vin", label: "VIN", type: "text", placeholder: "1HGCM82633A004352" },
    ],
  },
  {
    slug: "home",
    name: "Home Insurance",
    short: "Protect your biggest investment with comprehensive home coverage.",
    about:
      "Protect your biggest investment with comprehensive home coverage tailored to coastal Georgia living — from dwelling protection to personal liability.",
    hero: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Suburban house exterior at golden hour",
    covered: [
      "Dwelling and other structures",
      "Personal property and loss of use",
      "Personal liability and medical payments",
      "Optional wind, hail, and water backup endorsements",
    ],
    faqs: [
      { q: "Does home insurance cover hurricanes?", a: "Wind and named-storm coverage varies by carrier and deductible. Your agent will review the right options for Savannah-area homes." },
      { q: "What is a declarations page?", a: "It’s the summary of your limits, deductibles, and premiums. Upload yours and we’ll compare apples-to-apples." },
    ],
    fields: [
      { id: "propertyAddress", label: "Property address", type: "text", placeholder: "Street, city, ZIP" },
      { id: "yearBuilt", label: "Year built", type: "number", placeholder: "1998" },
    ],
  },
  {
    slug: "life",
    name: "Life Insurance",
    short: "Secure your family's future with the right life insurance plan.",
    about:
      "Secure your family's future with term or permanent life coverage. Licensed experts help you choose an amount that protects the people who depend on you.",
    hero: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Family together outdoors",
    covered: [
      "Term and permanent life options",
      "Income replacement and final expense planning",
      "Named beneficiaries and rider options",
      "No-pressure guidance from licensed agents",
    ],
    faqs: [
      { q: "How much coverage do I need?", a: "A common starting point is 10–15× annual income, plus debts and education goals. We’ll walk through it together." },
      { q: "Is a medical exam required?", a: "Not always. Many carriers offer accelerated underwriting based on age, amount, and health history." },
    ],
    fields: [
      { id: "coverageAmount", label: "Coverage amount", type: "select", options: ["$100,000", "$250,000", "$500,000", "$1,000,000"] },
      { id: "beneficiary", label: "Primary beneficiary", type: "text", placeholder: "Full name" },
    ],
  },
  {
    slug: "health",
    name: "Health Insurance",
    short: "Compare rates from multiple carriers to find your best plan.",
    about:
      "Compare rates from multiple carriers to find your best plan — individual, family, or small-group options with expert, no-pressure guidance.",
    hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Doctor consulting with a patient",
    covered: [
      "Preventive care and essential health benefits",
      "Doctor, hospital, and prescription coverage",
      "Family and individual plan options",
      "Help comparing deductibles and networks",
    ],
    faqs: [
      { q: "When can I enroll?", a: "Open enrollment and qualifying life events (move, marriage, loss of coverage) may allow you to apply outside the standard window." },
      { q: "Will you review my current plan?", a: "Yes. Bring your current coverage details and we’ll shop for a better rate and fit." },
    ],
    fields: [
      { id: "householdSize", label: "Household size", type: "select", options: ["1", "2", "3", "4", "5+"] },
      { id: "currentCoverage", label: "Current coverage", type: "text", placeholder: "Carrier or “None”" },
    ],
  },
  {
    slug: "medicare",
    name: "Medicare",
    short: "Navigate Medicare options with expert, no-pressure guidance.",
    about:
      "Navigate Medicare options with expert, no-pressure guidance — Advantage, Supplement, and Part D plans explained in plain language.",
    hero: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Senior couple walking together",
    covered: [
      "Medicare Advantage (Part C) plan comparisons",
      "Medigap / Supplement guidance",
      "Part D prescription drug plans",
      "Annual review during AEP and OEP",
    ],
    faqs: [
      { q: "Do you charge for Medicare help?", a: "We provide licensed guidance at no cost to you. Carriers pay contracted commissions when you enroll." },
      { q: "Can you review my current Advantage plan?", a: "Absolutely. We’ll check network, drugs, and extras before the next enrollment window." },
    ],
    fields: [
      { id: "householdSize", label: "Household size", type: "select", options: ["1", "2"] },
      { id: "currentCoverage", label: "Current coverage", type: "text", placeholder: "Original Medicare, Advantage, or none" },
    ],
  },
  {
    slug: "business",
    name: "Business Insurance",
    short: "Liability and business coverage tailored to your company.",
    about:
      "Liability and business coverage tailored to your company — general liability, BOP, and commercial auto options for Savannah-area owners.",
    hero: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Small business owner at a storefront",
    covered: [
      "General liability and business owner’s policy (BOP)",
      "Commercial property and inventory",
      "Professional and product liability options",
      "Workers’ compensation referrals as needed",
    ],
    faqs: [
      { q: "I just opened — what do I need first?", a: "Most new businesses start with general liability. We’ll match limits to your lease, contracts, and industry." },
      { q: "Do you cover contractors?", a: "Yes. Tell us your trade and payroll estimate and we’ll shop commercial packages." },
    ],
    fields: [
      { id: "businessName", label: "Business name", type: "text", placeholder: "Legal or DBA name" },
      { id: "industry", label: "Industry", type: "text", placeholder: "Retail, contractor, office…" },
    ],
  },
  {
    slug: "dental",
    name: "Dental & Vision",
    short: "Affordable dental and vision plans for you and your family.",
    about:
      "Affordable dental and vision plans for you and your family — cleanings, major services, frames, and contacts with straightforward networks.",
    hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Smiling person in a bright setting",
    covered: [
      "Preventive cleanings and exams",
      "Basic and major dental services",
      "Frames, lenses, and contact allowances",
      "Individual and family plan options",
    ],
    faqs: [
      { q: "Is there a waiting period?", a: "Preventive care is often day-one. Major services may have a short wait depending on the carrier." },
      { q: "Can I keep my dentist?", a: "We’ll check your providers against in-network lists before you enroll." },
    ],
    fields: [
      { id: "householdSize", label: "Household size", type: "select", options: ["1", "2", "3", "4", "5+"] },
    ],
  },
  {
    slug: "renters",
    name: "Renters Insurance",
    short: "Protect your belongings and liability as a renter.",
    about:
      "Protect your belongings and liability as a renter. Landlords’ policies don’t cover your furniture, electronics, or personal liability.",
    hero: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Apartment living room interior",
    covered: [
      "Personal property (theft, fire, certain water losses)",
      "Personal liability and medical payments",
      "Loss of use if your unit is uninhabitable",
      "Optional scheduled items for jewelry or electronics",
    ],
    faqs: [
      { q: "Does my landlord’s insurance cover me?", a: "No. Their policy covers the building. Renters insurance covers your things and liability." },
      { q: "How much personal property coverage?", a: "Walk through rooms and estimate replacement cost. Most renters start between $20,000 and $40,000." },
    ],
    fields: [
      { id: "propertyAddress", label: "Rental address", type: "text", placeholder: "Street, city, ZIP" },
    ],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const seedPolicies: Policy[] = [
  {
    id: "pol-auto",
    product: "auto",
    name: "Auto Insurance",
    number: "LCI-AU-482910",
    carrier: "Safeguard Mutual",
    status: "Active",
    premium: 148.2,
    frequency: "Monthly",
    effectiveDate: "2026-03-11",
    renewalDate: "2026-09-11",
    renewalPremium: 152.4,
    insureds: ["Jordan Hales", "Morgan Hales"],
    coverage: [
      { type: "Bodily Injury Liability", limit: "$100,000 / $300,000", deductible: "—" },
      { type: "Property Damage", limit: "$50,000", deductible: "—" },
      { type: "Collision", limit: "Actual cash value", deductible: "$500" },
      { type: "Comprehensive", limit: "Actual cash value", deductible: "$250" },
      { type: "Uninsured Motorist", limit: "$100,000 / $300,000", deductible: "—" },
    ],
    reminder: true,
    autopay: true,
    hasCard: true,
  },
  {
    id: "pol-home",
    product: "home",
    name: "Home Insurance",
    number: "LCI-HO-193844",
    carrier: "Harborlight Home",
    status: "Active",
    premium: 1860,
    frequency: "Annual",
    effectiveDate: "2026-02-01",
    renewalDate: "2027-02-01",
    insureds: ["Jordan Hales", "Morgan Hales"],
    coverage: [
      { type: "Dwelling", limit: "$425,000", deductible: "$1,000" },
      { type: "Other Structures", limit: "$42,500", deductible: "$1,000" },
      { type: "Personal Property", limit: "$212,500", deductible: "$1,000" },
      { type: "Personal Liability", limit: "$300,000", deductible: "—" },
    ],
    reminder: true,
    autopay: false,
    hasCard: false,
  },
  {
    id: "pol-life",
    product: "life",
    name: "Life Insurance",
    number: "LCI-LF-771203",
    carrier: "Northstar Life",
    status: "Active",
    premium: 64.5,
    frequency: "Monthly",
    effectiveDate: "2025-11-04",
    renewalDate: "2026-11-04",
    insureds: ["Jordan Hales"],
    beneficiaries: [{ name: "Morgan Hales", relationship: "Spouse" }],
    coverage: [
      { type: "Death Benefit", limit: "$500,000", deductible: "—" },
      { type: "Term Length", limit: "20 years", deductible: "—" },
    ],
    reminder: false,
    autopay: true,
    hasCard: false,
  },
  {
    id: "pol-health-pending",
    product: "health",
    name: "Health Insurance",
    number: "LCI-HE-PENDING",
    carrier: "Pending carrier",
    status: "Pending",
    premium: 412,
    frequency: "Monthly",
    effectiveDate: "2026-09-01",
    renewalDate: "2027-09-01",
    insureds: ["Jordan Hales", "Morgan Hales", "Eli Hales"],
    coverage: [
      { type: "Individual Deductible", limit: "$2,500", deductible: "$2,500" },
      { type: "Out-of-Pocket Max", limit: "$8,000", deductible: "—" },
    ],
    reminder: true,
    autopay: false,
    hasCard: false,
  },
  {
    id: "pol-renters-exp",
    product: "renters",
    name: "Renters Insurance",
    number: "LCI-RT-110928",
    carrier: "Harborlight Home",
    status: "Expired",
    premium: 18,
    frequency: "Monthly",
    effectiveDate: "2023-08-01",
    renewalDate: "2024-08-01",
    insureds: ["Jordan Hales"],
    coverage: [{ type: "Personal Property", limit: "$25,000", deductible: "$500" }],
    reminder: false,
    autopay: false,
    hasCard: false,
  },
];

export const seedQuotes: Quote[] = [
  {
    id: "q1",
    product: "home",
    submittedAt: "2026-08-20",
    status: "Quote Ready",
    step: 3,
    personal: {
      fullName: "Jordan Hales",
      dob: "1988-04-12",
      email: "jordan@email.com",
      phone: "(912) 555-0148",
      address: "412 Habersham Street, Savannah, GA 31401",
    },
    details: { propertyAddress: "412 Habersham Street, Savannah, GA 31401", yearBuilt: "1938" },
    docs: ["Current_dec_page.pdf"],
    premium: 1724,
    notes: "Two carriers returned. Harborlight is the better dwelling limit for the premium.",
  },
  {
    id: "q2",
    product: "auto",
    submittedAt: "2026-08-25",
    status: "Pending Review",
    step: 1,
    personal: {
      fullName: "Jordan Hales",
      dob: "1988-04-12",
      email: "jordan@email.com",
      phone: "(912) 555-0148",
      address: "412 Habersham Street, Savannah, GA 31401",
    },
    details: { year: "2022", make: "Toyota", model: "Rav4", vin: "2T3P1RFV5NW123456" },
    docs: [],
  },
];

export const seedClaims: Claim[] = [
  {
    id: "cl1",
    reference: "CLM-12345",
    policyId: "pol-auto",
    product: "auto",
    incidentDate: "2026-08-18",
    location: "Abercorn St & DeRenne Ave, Savannah, GA",
    type: "Accident",
    description: "Rear-ended at the light. Other driver cited. Photos of bumper and plate attached.",
    contactPref: "call",
    bestTime: "Afternoons",
    photos: ["bumper.jpg", "scene.jpg"],
    submittedAt: "2026-08-18",
    status: "Under Review",
    notes: [
      { from: "agent", text: "We’ve opened the claim with Safeguard and requested the police report.", time: "Aug 19" },
      { from: "you", text: "Thank you — I’ll upload the report once I have it.", time: "Aug 19" },
    ],
  },
];

export const seedAppointments: Appointment[] = [
  {
    id: "ap1",
    type: "Phone Call",
    date: "2026-09-03",
    time: "14:00",
    reason: "Policy Review",
    notes: "Walk through auto renewal options",
    status: "Upcoming",
  },
  {
    id: "ap2",
    type: "In-Person",
    date: "2026-07-12",
    time: "11:00",
    reason: "New Quote",
    notes: "Home coverage review at the Abercorn office",
    status: "Past",
  },
];

export const seedDocuments: AppDocument[] = [
  { id: "d1", name: "Auto_Declarations.pdf", type: "Declarations Page", policyId: "pol-auto", addedAt: "2026-03-11", size: "240 KB" },
  { id: "d2", name: "Auto_ID_Card.pdf", type: "ID Cards", policyId: "pol-auto", addedAt: "2026-03-11", size: "86 KB" },
  { id: "d3", name: "Auto_Contract.pdf", type: "Policy Contract", policyId: "pol-auto", addedAt: "2026-03-11", size: "1.2 MB" },
  { id: "d4", name: "Home_Declarations.pdf", type: "Declarations Page", policyId: "pol-home", addedAt: "2026-02-01", size: "310 KB" },
  { id: "d5", name: "Life_Contract.pdf", type: "Policy Contract", policyId: "pol-life", addedAt: "2025-11-04", size: "890 KB" },
  { id: "d6", name: "Claim_photos.zip", type: "Claims Correspondence", policyId: "pol-auto", claimId: "cl1", addedAt: "2026-08-18", size: "4.1 MB" },
];

export const seedMessages: ChatMessage[] = [
  {
    id: "m1",
    from: "agent",
    text: "Hi Jordan — G. Bruce here. I reviewed your home quote and have two strong options when you’re ready.",
    time: "Mon 9:14 AM",
  },
  {
    id: "m2",
    from: "you",
    text: "Thanks! Can we look at the auto renewal too? It looks like the premium moved a little.",
    time: "Mon 9:22 AM",
  },
  {
    id: "m3",
    from: "agent",
    text: "Absolutely. I booked a call for Sep 3 at 2:00 PM, or we can do it sooner if you prefer.",
    time: "Mon 9:28 AM",
  },
];

export const seedNotifications: AppNotification[] = [
  {
    id: "n1",
    category: "quotes",
    title: "Quote ready",
    body: "Your Home Insurance quote is ready to review",
    time: "2 hours ago",
    dateGroup: "Today",
    read: false,
    href: "/quotes/q1",
  },
  {
    id: "n2",
    category: "appointments",
    title: "Appointment reminder",
    body: "Reminder: consultation tomorrow at 2:00 PM",
    time: "Yesterday",
    dateGroup: "Yesterday",
    read: false,
    href: "/appointments",
  },
  {
    id: "n3",
    category: "policies",
    title: "Renewal coming up",
    body: "Your Auto policy renews in 15 days",
    time: "Yesterday",
    dateGroup: "Yesterday",
    read: false,
    href: "/renewal/pol-auto",
  },
  {
    id: "n4",
    category: "messages",
    title: "New message",
    body: "New message from your agent",
    time: "Mon",
    dateGroup: "This week",
    read: false,
    href: "/messages",
  },
  {
    id: "n5",
    category: "documents",
    title: "Document requested",
    body: "Please upload your driver's license to complete your quote",
    time: "Mon",
    dateGroup: "This week",
    read: true,
    href: "/documents/upload",
  },
  {
    id: "n6",
    category: "claims",
    title: "Claim update",
    body: "Your claim #12345 status has changed to In Review",
    time: "Aug 19",
    dateGroup: "Earlier",
    read: true,
    href: "/claims/cl1",
  },
];

export const seedPaymentMethods: PaymentMethod[] = [
  { id: "pm1", brand: "Visa", last4: "4242", exp: "08/28", default: true, kind: "card" },
  { id: "pm2", brand: "Checking", last4: "8819", exp: "—", default: false, kind: "bank" },
];

export const seedPayments: Payment[] = [
  { id: "pay1", date: "2026-08-11", policyId: "pol-auto", product: "auto", amount: 148.2, status: "Paid" },
  { id: "pay2", date: "2026-07-11", policyId: "pol-auto", product: "auto", amount: 148.2, status: "Paid" },
  { id: "pay3", date: "2026-02-01", policyId: "pol-home", product: "home", amount: 1860, status: "Paid" },
  { id: "pay4", date: "2026-08-04", policyId: "pol-life", product: "life", amount: 64.5, status: "Paid" },
];

export const DEFAULT_PREFS: NotifPrefs = {
  quotes: true,
  appointments: true,
  policies: true,
  messages: true,
  documents: true,
  claims: true,
};

export const ONBOARDING = [
  {
    title: "Coverage That Protects What Matters",
    body: "From auto to home to life — get the right policy at the right price, tailored to you.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    alt: "Family standing in front of their home",
  },
  {
    title: "Expert Agents, Real Guidance",
    body: "Work with licensed insurance experts who shop multiple carriers to find you the best rate.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    alt: "Insurance advisor in consultation with a client",
  },
  {
    title: "Manage Everything From Your Phone",
    body: "Track quotes, view policies, upload documents, and message your agent — all in one place.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    alt: "Person reviewing documents on a phone",
  },
] as const;

export const IMAGES = {
  splash: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80",
  auth: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1600&q=80",
  quoteHero: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
} as const;

export const TRUST_BULLETS = [
  { title: "Multiple Carriers, Best Rate", body: "We shop your policy needs to multiple carriers to find the lowest possible rate with the best coverage." },
  { title: "Licensed & Experienced Agents", body: "Work with Experienced Insurance Experts!" },
  { title: "Veteran Owned & Operated", body: "A licensed professional agency serving Savannah, GA families and businesses." },
] as const;

export const FAQ_CATEGORIES = [
  {
    id: "general",
    name: "General",
    items: [
      { q: "What does Longevity Capital Insurance do?", a: AGENCY.positioning },
      { q: "Where are you located?", a: `${AGENCY.address}. Hours: ${AGENCY.hoursWeekday}. ${AGENCY.hoursWeekend}.` },
      { q: "How do I get a quote?", a: "Tap Get a Quote, choose a product, and submit your details. An agent reviews and responds within one business day." },
    ],
  },
  {
    id: "auto",
    name: "Auto",
    items: [
      { q: "Can you bundle auto and home?", a: "Yes. Bundling is one of the most reliable ways we lower your combined premium." },
    ],
  },
  {
    id: "home",
    name: "Home",
    items: [
      { q: "Do you write coastal / wind coverage?", a: "We work with carriers that understand Savannah and coastal Georgia exposures. Your agent will review deductibles and wind options." },
    ],
  },
  {
    id: "life",
    name: "Life",
    items: [
      { q: "Term vs. whole life?", a: "Term is typically the most affordable income replacement. Permanent policies build cash value. We’ll match the tool to the goal." },
    ],
  },
  {
    id: "health",
    name: "Health",
    items: [
      { q: "Do you help with ACA marketplace plans?", a: "Yes. We can compare on- and off-marketplace options based on your household and subsidy eligibility." },
    ],
  },
  {
    id: "medicare",
    name: "Medicare",
    items: [
      { q: "When should I start looking at Medicare?", a: "Ideally 3 months before your 65th birthday, and again every fall during Annual Enrollment." },
    ],
  },
  {
    id: "business",
    name: "Business",
    items: [
      { q: "Can you certificate additional insureds?", a: "Yes. Message your agent with the certificate holder details and we’ll request it from the carrier." },
    ],
  },
  {
    id: "claims",
    name: "Claims",
    items: [
      { q: "What happens after I file?", a: "We act as your advocate to help you achieve the best possible outcome — from first notice through resolution." },
    ],
  },
  {
    id: "payments",
    name: "Payments",
    items: [
      { q: "Can I set up autopay?", a: "Yes. Open a policy and toggle Autopay, or manage methods under Payments." },
    ],
  },
] as const;

export const GLOSSARY = [
  { term: "Declarations page", def: "The summary sheet of who is insured, limits, deductibles, and premium." },
  { term: "Deductible", def: "What you pay out of pocket before the carrier pays on a covered loss." },
  { term: "Endorsement", def: "A change that adds, removes, or modifies coverage on an existing policy." },
  { term: "Named insured", def: "The person or business listed as the primary policyholder." },
  { term: "Premium", def: "The amount you pay to keep coverage in force." },
] as const;

export const CONSULT_REASONS = ["New Quote", "Policy Review", "Claims Help", "General Question", "Other"] as const;
export const TIME_SLOTS = ["10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"] as const;
export const INCIDENT_TYPES = ["Accident", "Theft", "Weather", "Injury", "Liability", "Other"] as const;
export const QUICK_REPLIES = ["Quote Question", "Claim Update", "Schedule Call"] as const;

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export function initials(first: string, last: string) {
  return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateShort(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function todayIso() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function daysUntil(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const target = new Date(y, m - 1, d).getTime();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target - now.getTime()) / 86400000);
}

export function isWeekend(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const day = new Date(y, m - 1, d).getDay();
  return day === 0 || day === 6;
}

export function nextId(prefix: string) {
  return `${prefix}${Date.now()}`;
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const last = digits.slice(-4);
  return `+1 (•••) •••-${last || "0000"}`;
}

export function passwordStrength(pw: string): { score: number; label: string } {
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/[0-9]/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  const label = ["Too weak", "Weak", "Fair", "Good", "Strong"][score] ?? "Too weak";
  return { score, label };
}
