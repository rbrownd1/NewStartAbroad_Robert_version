# NewStartAbroad — Content Templates & Data File Specifications

## Working Reference for TypeScript Data Files

**Audience:** Student 4 (Hub Content owner), all students for reference
**Purpose:** Interface definitions, templates, and a fully worked example for every `src/data/` file

---

## 1. Overview: Content-as-Code Philosophy

### Why Data Lives in TypeScript Arrays

In Phase 1, all content is stored as TypeScript arrays in `src/data/`. This is not a limitation — it is a deliberate architectural choice:

- **Content becomes a first-class deliverable.** The team is forced to research, write, and review content before any backend exists. When Phase 2 arrives, you migrate *validated content* into Supabase — not debugging content accuracy and database queries simultaneously.

- **The data model discovers itself.** By Sprint 3, the TypeScript interfaces will reveal the true shape of the data — whether tasks need persona flags, city flags, or both. This is more reliable than designing a database schema from a whitepaper.

- **Configuration-driven content.** Adding a new city or a new bank should require editing a data file, not changing component code. If your component has hardcoded "London" or "Monzo," refactor it to read from the data array.

### Forward Compatibility with Phase 2

The interfaces below are designed to match the Phase 2 Supabase schema columns. When migrating to a database, each TypeScript array becomes a database table, and each interface field becomes a column. Fields like `id`, `display_order`, and `last_verified` exist specifically for this future migration.

---

## 2. TypeScript Interface Definitions

### 2.1 Task Interface

```typescript
// src/data/tasks.ts

export interface Task {
  id: string;                    // Unique identifier (e.g., "task-001")
  title: string;                 // Task name (e.g., "Collect BRP")
  description: string;           // 1-2 sentence explanation
  category: 'housing' | 'health' | 'banking' | 'sim' | 'groceries' | 'admin' | 'lifestyle';
  timeframe: 'before_you_fly' | 'first_week' | 'first_month' | 'first_three_months';
  persona_filter: ('student' | 'professional')[];  // Which personas see this task
  city_filter?: string[];        // Null/undefined = all cities, or ['london', 'manchester']
  linked_hub?: string;           // Which hub page to link to (e.g., 'housing', 'banking')
  official_url?: string;         // GOV.UK or official source link
  display_order: number;         // Sort order within timeframe
  last_verified: string;         // Date string (e.g., "2026-02-01")
  content_source?: string;       // URL of authoritative source
}
```

### 2.2 City Interface

```typescript
// src/data/cities.ts

export interface PopularArea {
  name: string;                  // e.g., "Stratford"
  description: string;           // Brief vibe description
  persona_fit: 'student' | 'professional' | 'both';
}

export interface City {
  id: string;
  slug: string;                  // URL-safe name (e.g., "london")
  name: string;                  // Display name (e.g., "London")
  cost_level: 'low' | 'moderate' | 'high' | 'very_high';
  avg_rent_student: number;      // £/month for student halls or shared
  avg_rent_professional: number; // £/month for 1-bed flat
  transport_summary: string;     // Brief transport overview
  transport_monthly_cost: number;// £/month typical transport cost
  popular_areas: PopularArea[];
  last_verified: string;
}
```

### 2.3 Housing Guide Interface

```typescript
// src/data/housing.ts

export interface Platform {
  name: string;
  url: string;
  description: string;
}

export interface ScamWarning {
  pattern: string;               // Description of the scam pattern
  advice: string;                // What to do about it
}

export interface DocumentNeeded {
  document: string;              // e.g., "CAS Letter"
  where_to_get: string;          // e.g., "Your university admissions team"
}

export interface HousingGuide {
  id: string;
  persona: 'student' | 'professional' | 'both';
  city_slug?: string;            // Null = universal guide
  housing_type: string;          // e.g., "university_halls", "private_rental"
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  avg_cost_range: string;        // e.g., "£600-900/month"
  recommended_platforms: Platform[];
  scam_warnings: ScamWarning[];
  documents_needed: DocumentNeeded[];
  display_order: number;
  last_verified: string;
}
```

### 2.4 Banking Guide Interface

```typescript
// src/data/banking.ts

export interface BankFeature {
  feature: string;
  included: boolean;
}

export interface BankingGuide {
  id: string;
  persona: 'student' | 'professional' | 'both';
  bank_type: 'digital' | 'traditional';
  bank_name: string;             // e.g., "Monzo"
  features: BankFeature[];
  newcomer_friendly: boolean;
  opening_steps: string[];       // Ordered array of step descriptions
  monthly_fees: number;          // 0 for free accounts
  international_transfer: boolean;
  display_order: number;
  last_verified: string;
}
```

### 2.5 SIM Guide Interface

```typescript
// src/data/sim.ts

export interface SimGuide {
  id: string;
  carrier_name: string;          // e.g., "Giffgaff"
  carrier_type: 'major' | 'mvno';
  plan_type: 'prepaid' | 'contract';
  monthly_cost: number;          // £/month
  data_allowance: string;        // e.g., "15GB"
  india_calling_rate: string;    // e.g., "1p/min with add-on"
  newcomer_notes: string;        // Why this is good/bad for newcomers
  persona_recommended: ('student' | 'professional')[];
  display_order: number;
  last_verified: string;
}
```

### 2.6 Grocery Guide Interface

```typescript
// src/data/groceries.ts

export interface GroceryGuide {
  id: string;
  city_slug?: string;            // Null = nationwide
  store_type: 'supermarket' | 'indian_asian' | 'delivery_app' | 'discount';
  store_name: string;
  description: string;
  price_level: 'budget' | 'mid' | 'premium';
  delivery_available: boolean;
  indian_products: boolean;
  display_order: number;
  last_verified: string;
}
```

### 2.7 Health Guide Interface

```typescript
// src/data/health.ts

export interface HealthGuide {
  id: string;
  persona: 'student' | 'professional' | 'both';
  city_slug?: string;            // Null = nationwide
  topic: string;                 // e.g., "gp_registration", "emergency_numbers"
  title: string;
  content: string;               // Main content text
  steps?: string[];              // Ordered action steps (for how-to guides)
  official_url?: string;
  display_order: number;
  last_verified: string;
}
```

### 2.8 App Recommendation Interface

```typescript
// src/data/apps.ts

export interface AppRecommendation {
  id: string;
  name: string;                  // e.g., "Citymapper"
  category: 'transport' | 'banking' | 'groceries' | 'safety' | 'communication';
  description: string;           // One-line purpose
  platform: 'ios' | 'android' | 'both';
  display_order: number;
}
```

### 2.9 Visa Type Interface

```typescript
// src/data/visaTypes.ts

export interface VisaType {
  slug: string;                  // e.g., "student"
  name: string;                  // e.g., "Student Visa"
  description: string;
  persona_fit: ('student' | 'professional')[];
}
```

---

## 3. Data File Templates — One Per Pillar

### 3.1 tasks.ts Template

```typescript
import { Task } from './types';  // Or define interface in same file

export const tasks: Task[] = [
  // ===== BEFORE YOU FLY =====
  {
    id: "task-001",
    title: "Arrange accommodation",
    description: "Research and book your first UK accommodation. Don't leave this until you arrive.",
    category: "housing",
    timeframe: "before_you_fly",
    persona_filter: ["student", "professional"],
    linked_hub: "housing",
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "task-002",
    title: "Open a UK bank account app",
    description: "Download Monzo or Starling and start registration before leaving India. You can complete verification after arrival.",
    category: "banking",
    timeframe: "before_you_fly",
    persona_filter: ["student", "professional"],
    linked_hub: "banking",
    official_url: "https://monzo.com",
    display_order: 2,
    last_verified: "2026-02-01",
  },
  {
    id: "task-003",
    title: "Buy a UK SIM card online",
    description: "Order a Giffgaff SIM for free delivery to your India address, or plan to buy at the airport.",
    category: "sim",
    timeframe: "before_you_fly",
    persona_filter: ["student", "professional"],
    linked_hub: "sim",
    official_url: "https://www.giffgaff.com/orders/free-sim-cards",
    display_order: 3,
    last_verified: "2026-02-01",
  },
  {
    id: "task-004",
    title: "Prepare documents folder",
    description: "Passport, visa printout, CAS letter, accommodation proof, financial evidence — keep originals and digital copies.",
    category: "admin",
    timeframe: "before_you_fly",
    persona_filter: ["student", "professional"],
    display_order: 4,
    last_verified: "2026-02-01",
  },
  {
    id: "task-005",
    title: "Research university health services",
    description: "Check what health services your university offers — most have free GP clinics and counselling.",
    category: "health",
    timeframe: "before_you_fly",
    persona_filter: ["student"],  // Student only
    linked_hub: "health",
    display_order: 5,
    last_verified: "2026-02-01",
  },

  // ===== FIRST WEEK =====
  {
    id: "task-010",
    title: "Activate UK SIM card",
    description: "Insert and activate your UK SIM. Use airport WiFi for initial setup if needed.",
    category: "sim",
    timeframe: "first_week",
    persona_filter: ["student", "professional"],
    linked_hub: "sim",
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "task-011",
    title: "Collect BRP",
    description: "Collect your Biometric Residence Permit from the Post Office specified in your visa decision letter. Must be done within 10 days.",
    category: "admin",
    timeframe: "first_week",
    persona_filter: ["student", "professional"],
    official_url: "https://www.gov.uk/biometric-residence-permits",
    display_order: 2,
    last_verified: "2026-02-01",
  },
  {
    id: "task-012",
    title: "Register with a GP",
    description: "Find your nearest GP surgery using NHS.uk and register. Bring passport, visa, and proof of address.",
    category: "health",
    timeframe: "first_week",
    persona_filter: ["student", "professional"],
    linked_hub: "health",
    official_url: "https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/",
    display_order: 3,
    last_verified: "2026-02-01",
  },
  {
    id: "task-013",
    title: "Complete bank verification",
    description: "Complete your Monzo/Starling verification with your UK address. Order the physical debit card.",
    category: "banking",
    timeframe: "first_week",
    persona_filter: ["student", "professional"],
    linked_hub: "banking",
    display_order: 4,
    last_verified: "2026-02-01",
  },
  {
    id: "task-014",
    title: "Do your first grocery shop",
    description: "Find your nearest Tesco, Sainsbury's, or Aldi. Stock up on essentials — see our week-1 shopping list.",
    category: "groceries",
    timeframe: "first_week",
    persona_filter: ["student", "professional"],
    linked_hub: "groceries",
    display_order: 5,
    last_verified: "2026-02-01",
  },

  // ===== FIRST MONTH =====
  {
    id: "task-020",
    title: "Get an Oyster card or transport pass",
    description: "Set up your Oyster card with auto top-up, or get a monthly Travelcard if commuting daily.",
    category: "admin",
    timeframe: "first_month",
    persona_filter: ["student", "professional"],
    city_filter: ["london"],
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "task-021",
    title: "Apply for National Insurance number",
    description: "Call the NI number application line (0800 141 2075). You need this to work legally in the UK.",
    category: "admin",
    timeframe: "first_month",
    persona_filter: ["student", "professional"],
    official_url: "https://www.gov.uk/apply-national-insurance-number",
    display_order: 2,
    last_verified: "2026-02-01",
  },
  {
    id: "task-022",
    title: "Set up direct debits for rent and bills",
    description: "Use your bank app to set up recurring payments for rent, utilities, and phone plan.",
    category: "banking",
    timeframe: "first_month",
    persona_filter: ["professional"],  // Professional only
    linked_hub: "banking",
    display_order: 3,
    last_verified: "2026-02-01",
  },

  // ===== FIRST THREE MONTHS =====
  {
    id: "task-030",
    title: "Register for council tax",
    description: "If you live in private accommodation, register for council tax. Students may be exempt — get a letter from your university.",
    category: "admin",
    timeframe: "first_three_months",
    persona_filter: ["student", "professional"],
    official_url: "https://www.gov.uk/council-tax",
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "task-031",
    title: "Review budget and adjust",
    description: "After 2-3 months of spending data, review your budget categories in your banking app and adjust.",
    category: "banking",
    timeframe: "first_three_months",
    persona_filter: ["student", "professional"],
    linked_hub: "banking",
    display_order: 2,
    last_verified: "2026-02-01",
  },

  // ... Continue to reach 20+ tasks minimum
];
```

**Minimum requirement:** 20 tasks across all 4 timeframes, with at least 3 tasks per timeframe. Include a mix of categories and ensure both persona-specific and universal tasks exist.

---

### 3.2 housing.ts Template

```typescript
import { HousingGuide } from './types';

export const housingGuides: HousingGuide[] = [
  {
    id: "housing-001",
    persona: "student",
    city_slug: "london",
    housing_type: "university_halls",
    title: "University Halls of Residence",
    description: "Purpose-built student accommodation managed by your university. Usually the easiest option for your first year.",
    pros: [
      "Bills typically included (electricity, water, WiFi)",
      "Close to campus — no commute costs",
      "Built-in social life with other students",
      "University support and maintenance on-site",
      "No need for a UK guarantor"
    ],
    cons: [
      "Limited availability — apply early",
      "Shared kitchen and sometimes bathrooms",
      "Less independence than private housing",
      "Can be noisy during exam periods",
      "Fixed contract — usually full academic year"
    ],
    avg_cost_range: "£150–250/week (London), £100–180/week (other cities)",
    recommended_platforms: [
      { name: "Your university accommodation portal", url: "", description: "Always check your university's own allocation system first" },
      { name: "Unite Students", url: "https://www.unitestudents.com", description: "Largest private halls provider in the UK" },
      { name: "Student.com", url: "https://www.student.com", description: "Aggregator for student accommodation across UK cities" }
    ],
    scam_warnings: [
      { pattern: "Listing not on official university portal", advice: "Always verify through your university's official accommodation page" },
      { pattern: "Asked to pay deposit before viewing or without a contract", advice: "Never transfer money without a signed contract and receipt" }
    ],
    documents_needed: [
      { document: "CAS Letter", where_to_get: "Your university admissions team" },
      { document: "Passport copy", where_to_get: "Your own documents" },
      { document: "Proof of funding", where_to_get: "Bank statement or scholarship letter" }
    ],
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "housing-002",
    persona: "professional",
    city_slug: "london",
    housing_type: "private_rental",
    title: "Private Rental (1-Bed Flat)",
    description: "Renting your own flat through an agent or direct from a landlord. Most common option for working professionals.",
    pros: [
      "Full privacy and independence",
      "Choose your preferred neighbourhood",
      "Longer tenancy options (6-12 months)",
      "Can furnish to your taste (if unfurnished)"
    ],
    cons: [
      "Requires UK references or guarantor",
      "Deposit (usually 5 weeks' rent) plus first month upfront",
      "Bills not included — budget separately",
      "Competitive market in London — viewings book fast"
    ],
    avg_cost_range: "£1,200–2,500/month (London), £600–1,200/month (other cities)",
    recommended_platforms: [
      { name: "Rightmove", url: "https://www.rightmove.co.uk", description: "UK's largest property portal" },
      { name: "Zoopla", url: "https://www.zoopla.co.uk", description: "Second-largest property portal with price estimates" },
      { name: "OpenRent", url: "https://www.openrent.com", description: "Direct from landlords — no agent fees" },
      { name: "SpareRoom", url: "https://www.spareroom.co.uk", description: "Find rooms in shared houses" }
    ],
    scam_warnings: [
      { pattern: "Price significantly below market rate (30%+ cheaper)", advice: "If it looks too good to be true, it probably is. Check average rents for the area." },
      { pattern: "Landlord asks for money before you've viewed the property", advice: "Never pay anything before viewing in person. Legitimate landlords expect this." },
      { pattern: "Communication only via email, refuses phone/video calls", advice: "Insist on speaking to the landlord. Scammers avoid voice/video contact." },
      { pattern: "Property listed on multiple sites with different prices", advice: "Cross-reference listings. Scammers copy legitimate listings with fake contact details." }
    ],
    documents_needed: [
      { document: "Passport and visa/BRP", where_to_get: "Your own documents" },
      { document: "Employment contract or offer letter", where_to_get: "Your UK employer" },
      { document: "UK bank statements (or 3 months' rent upfront if new)", where_to_get: "Your UK bank app" },
      { document: "Previous landlord reference (if available)", where_to_get: "Former landlord" }
    ],
    display_order: 2,
    last_verified: "2026-02-01",
  },

  // ... Add shared_house, mid_term entries for each persona
];
```

---

### 3.3 banking.ts Template

```typescript
import { BankingGuide } from './types';

export const bankingGuides: BankingGuide[] = [
  {
    id: "bank-001",
    persona: "both",
    bank_type: "digital",
    bank_name: "Monzo",
    features: [
      { feature: "Instant spending notifications", included: true },
      { feature: "Built-in budgeting categories", included: true },
      { feature: "Bill splitting with friends", included: true },
      { feature: "Free ATM withdrawals in UK", included: true },
      { feature: "International transfers", included: false },
      { feature: "Branch access", included: false },
      { feature: "Joint accounts", included: true },
      { feature: "Savings pots with goals", included: true }
    ],
    newcomer_friendly: true,
    opening_steps: [
      "Download the Monzo app from App Store or Google Play",
      "Start registration with your passport (can begin from India)",
      "Take a selfie for identity verification",
      "Enter your UK address after arrival (student halls or rental address)",
      "Verification typically completes within 24-48 hours",
      "Order your physical hot coral debit card (arrives in 2-3 days)",
      "Set up Apple Pay or Google Pay for immediate contactless payments"
    ],
    monthly_fees: 0,
    international_transfer: false,
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "bank-002",
    persona: "both",
    bank_type: "digital",
    bank_name: "Starling",
    features: [
      { feature: "Instant spending notifications", included: true },
      { feature: "Connected savings spaces", included: true },
      { feature: "International transfers via Wise", included: true },
      { feature: "Free ATM withdrawals in UK", included: true },
      { feature: "Free ATM withdrawals abroad", included: true },
      { feature: "Branch access", included: false },
      { feature: "Business accounts available", included: true },
      { feature: "Round-up savings", included: true }
    ],
    newcomer_friendly: true,
    opening_steps: [
      "Download the Starling Bank app",
      "Begin registration with passport and selfie",
      "Provide UK address for verification",
      "Account typically approved within 24 hours",
      "Debit card arrives in 3-5 working days",
      "Set up direct debits for rent and bills"
    ],
    monthly_fees: 0,
    international_transfer: true,
    display_order: 2,
    last_verified: "2026-02-01",
  },
  {
    id: "bank-003",
    persona: "both",
    bank_type: "traditional",
    bank_name: "Barclays",
    features: [
      { feature: "Branch network across UK", included: true },
      { feature: "Mobile banking app", included: true },
      { feature: "Student account with overdraft", included: true },
      { feature: "International transfers", included: true },
      { feature: "Cheque deposits", included: true },
      { feature: "Instant spending notifications", included: true },
      { feature: "Free ATM withdrawals abroad", included: false },
      { feature: "Bill splitting", included: false }
    ],
    newcomer_friendly: false,
    opening_steps: [
      "Book an appointment at your nearest Barclays branch",
      "Bring: passport, visa/BRP, proof of UK address, university letter or employment contract",
      "Complete application form at the branch",
      "Account opened same day in most cases",
      "Debit card arrives by post within 5-7 days",
      "Set up online banking and download the app"
    ],
    monthly_fees: 0,
    international_transfer: true,
    display_order: 3,
    last_verified: "2026-02-01",
  },

  // ... Add HSBC, Revolut entries
];
```

---

### 3.4 sim.ts Template

```typescript
import { SimGuide } from './types';

export const simGuides: SimGuide[] = [
  {
    id: "sim-001",
    carrier_name: "Giffgaff",
    carrier_type: "mvno",
    plan_type: "prepaid",
    monthly_cost: 10,
    data_allowance: "15GB",
    india_calling_rate: "International add-on available (check current rates)",
    newcomer_notes: "Best first SIM for newcomers. No contract, no credit check. Free SIM delivered to India address. Uses O2 network.",
    persona_recommended: ["student", "professional"],
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "sim-002",
    carrier_name: "Three",
    carrier_type: "major",
    plan_type: "prepaid",
    monthly_cost: 12,
    data_allowance: "12GB",
    india_calling_rate: "1p/min with international add-on",
    newcomer_notes: "Good coverage across UK. Free roaming in 71 destinations. Available at most airport shops.",
    persona_recommended: ["student", "professional"],
    display_order: 2,
    last_verified: "2026-02-01",
  },
  {
    id: "sim-003",
    carrier_name: "Vodafone",
    carrier_type: "major",
    plan_type: "prepaid",
    monthly_cost: 15,
    data_allowance: "25GB",
    india_calling_rate: "Included in some plans — check current offers",
    newcomer_notes: "Extensive 5G coverage in cities. Higher price but more data. Good for video calls back to India.",
    persona_recommended: ["professional"],
    display_order: 3,
    last_verified: "2026-02-01",
  },
  {
    id: "sim-004",
    carrier_name: "Lebara",
    carrier_type: "mvno",
    plan_type: "prepaid",
    monthly_cost: 5,
    data_allowance: "5GB",
    india_calling_rate: "100 mins to India included",
    newcomer_notes: "Budget option with India calling included. Uses Vodafone network. Popular with Indian community in UK.",
    persona_recommended: ["student"],
    display_order: 4,
    last_verified: "2026-02-01",
  },

  // ... Add EE entry
];
```

---

### 3.5 groceries.ts Template

```typescript
import { GroceryGuide } from './types';

export const groceryGuides: GroceryGuide[] = [
  {
    id: "grocery-001",
    store_type: "supermarket",
    store_name: "Tesco",
    description: "UK's largest supermarket chain. Wide range, Clubcard loyalty discounts, online delivery available. Good baseline for price comparison.",
    price_level: "mid",
    delivery_available: true,
    indian_products: false,
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "grocery-002",
    store_type: "discount",
    store_name: "Aldi",
    description: "German discount supermarket. Limited range but consistently lowest prices. No loyalty card needed. Great for basics.",
    price_level: "budget",
    delivery_available: false,
    indian_products: false,
    display_order: 2,
    last_verified: "2026-02-01",
  },
  {
    id: "grocery-003",
    store_type: "indian_asian",
    store_name: "Local Indian Grocery Stores",
    description: "Search for 'Indian grocery' or 'Asian supermarket' near your area. Stock spices, lentils, rice varieties, fresh vegetables, and frozen Indian items.",
    price_level: "budget",
    delivery_available: false,
    indian_products: true,
    display_order: 5,
    last_verified: "2026-02-01",
  },
  {
    id: "grocery-004",
    city_slug: "london",
    store_type: "indian_asian",
    store_name: "Wembley & Tooting Indian Stores",
    description: "Wembley (Ealing Road) and Tooting (Upper Tooting Road) have concentrations of Indian grocery shops with wide selections and competitive prices.",
    price_level: "budget",
    delivery_available: false,
    indian_products: true,
    display_order: 6,
    last_verified: "2026-02-01",
  },
  {
    id: "grocery-005",
    store_type: "delivery_app",
    store_name: "Deliveroo",
    description: "Restaurant and grocery delivery. Wide selection but premium pricing. Useful when you first arrive and don't know the area.",
    price_level: "premium",
    delivery_available: true,
    indian_products: false,
    display_order: 8,
    last_verified: "2026-02-01",
  },

  // ... Add Sainsbury's, Lidl, M&S, Waitrose, Uber Eats, Too Good To Go
];
```

---

### 3.6 health.ts Template

```typescript
import { HealthGuide } from './types';

export const healthGuides: HealthGuide[] = [
  {
    id: "health-001",
    persona: "both",
    topic: "emergency_numbers",
    title: "Emergency Numbers",
    content: "In a life-threatening emergency, call 999 for ambulance, fire, or police. For non-emergency medical advice available 24/7, call 111. The European emergency number 112 also works in the UK.",
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "health-002",
    persona: "both",
    topic: "nhs_overview",
    title: "How the NHS Works",
    content: "The National Health Service (NHS) provides healthcare free at the point of use. As a visa holder, you've paid the Immigration Health Surcharge (IHS) with your visa application, which entitles you to NHS services. Your first step is registering with a GP (General Practitioner), who becomes your primary doctor for non-emergency care.",
    official_url: "https://www.nhs.uk/using-the-nhs/nhs-services/",
    display_order: 2,
    last_verified: "2026-02-01",
  },
  {
    id: "health-003",
    persona: "both",
    topic: "gp_registration",
    title: "How to Register with a GP",
    content: "Registering with a GP is one of the most important tasks in your first week. You do not need proof of address or immigration status to register — GP surgeries must accept you.",
    steps: [
      "Find a GP surgery near your home using the NHS.uk GP finder tool",
      "Visit the surgery in person or check if they offer online registration",
      "Bring your passport, visa or BRP, and proof of address if available",
      "Fill out the GMS1 registration form (available at the surgery)",
      "You may be offered a new patient health check — accept it",
      "Once registered, you can book appointments online, by phone, or in person"
    ],
    official_url: "https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/",
    display_order: 3,
    last_verified: "2026-02-01",
  },
  {
    id: "health-004",
    persona: "student",
    topic: "university_health",
    title: "University Health Services",
    content: "Most UK universities offer free health services to enrolled students, including on-campus GP clinics, mental health counselling, and sexual health services. Register with your university health service during freshers' week — it's usually separate from NHS GP registration.",
    display_order: 4,
    last_verified: "2026-02-01",
  },
  {
    id: "health-005",
    persona: "both",
    topic: "mental_health",
    title: "Mental Health Support",
    content: "Moving to a new country can be stressful. Support is available and free. Samaritans (call 116 123, free, 24/7) provides a listening ear. Mind is a leading mental health charity with local services. The NHS offers self-referral to talking therapies (IAPT) — you can refer yourself without GP involvement.",
    official_url: "https://www.nhs.uk/mental-health/",
    display_order: 5,
    last_verified: "2026-02-01",
  },

  // ... Add dental, pharmacy, professional-specific entries
];
```

---

### 3.7 cities.ts Template

```typescript
import { City } from './types';

export const cities: City[] = [
  {
    id: "city-001",
    slug: "london",
    name: "London",
    cost_level: "very_high",
    avg_rent_student: 1000,      // £/month for shared/halls average
    avg_rent_professional: 1800, // £/month for 1-bed flat average
    transport_summary: "Extensive Tube, bus, and rail network. Oyster card or contactless payment. Zones 1-6 system — most newcomers live in Zones 2-4.",
    transport_monthly_cost: 165, // Zones 1-3 monthly Travelcard approximate
    popular_areas: [
      { name: "Stratford", description: "Well-connected, affordable by London standards, close to Westfield shopping. Good transport links via Jubilee and Central lines.", persona_fit: "both" },
      { name: "Wembley", description: "Large Indian community, excellent Indian grocery shopping on Ealing Road, good value accommodation.", persona_fit: "both" },
      { name: "Tooting", description: "Vibrant South Asian community, Northern Line access, great food scene, relatively affordable.", persona_fit: "both" },
      { name: "Canary Wharf", description: "Financial district, modern apartments, premium rent but close to banking jobs.", persona_fit: "professional" },
      { name: "Mile End / Stepney", description: "Near Queen Mary University, affordable, good Central Line access.", persona_fit: "student" },
    ],
    last_verified: "2026-02-01",
  },

  // ... Add Manchester, Birmingham, Edinburgh entries
];
```

---

### 3.8 apps.ts Template

```typescript
import { AppRecommendation } from './types';

export const appRecommendations: AppRecommendation[] = [
  // TRANSPORT
  { id: "app-001", name: "Citymapper", category: "transport", description: "Best public transport navigation for London and Manchester", platform: "both", display_order: 1 },
  { id: "app-002", name: "TfL Go", category: "transport", description: "Official Transport for London app — Tube, bus, and rail", platform: "both", display_order: 2 },
  { id: "app-003", name: "Trainline", category: "transport", description: "Book train tickets across the UK at best prices", platform: "both", display_order: 3 },
  { id: "app-004", name: "Google Maps", category: "transport", description: "General navigation, walking directions, bus routes", platform: "both", display_order: 4 },

  // BANKING & MONEY
  { id: "app-010", name: "Monzo", category: "banking", description: "Digital bank — instant notifications, budgeting, free UK account", platform: "both", display_order: 1 },
  { id: "app-011", name: "Starling", category: "banking", description: "Digital bank — savings goals, connected debit card", platform: "both", display_order: 2 },
  { id: "app-012", name: "Wise", category: "banking", description: "Best exchange rates for INR to GBP transfers", platform: "both", display_order: 3 },

  // FOOD & GROCERIES
  { id: "app-020", name: "Deliveroo", category: "groceries", description: "Restaurant and grocery delivery to your door", platform: "both", display_order: 1 },
  { id: "app-021", name: "Too Good To Go", category: "groceries", description: "Discounted surplus food from restaurants and shops", platform: "both", display_order: 2 },

  // SAFETY & WELLBEING
  { id: "app-030", name: "NHS App", category: "safety", description: "GP appointments, prescriptions, health records, COVID pass", platform: "both", display_order: 1 },
  { id: "app-031", name: "what3words", category: "safety", description: "Precise location sharing for emergencies", platform: "both", display_order: 2 },
];
```

---

### 3.9 visaTypes.ts Template

```typescript
import { VisaType } from './types';

export const visaTypes: VisaType[] = [
  {
    slug: "student",
    name: "Student Visa",
    description: "For full-time study at a UK institution with a confirmed place (CAS). Allows limited part-time work during term (20 hours/week).",
    persona_fit: ["student"],
  },
  {
    slug: "skilled_worker",
    name: "Skilled Worker Visa",
    description: "For employment with a licensed UK sponsor employer. Must meet salary threshold and skill level requirements.",
    persona_fit: ["professional"],
  },
  {
    slug: "graduate",
    name: "Graduate Visa",
    description: "Post-study work visa for 2 years (3 for PhD). No sponsor needed. Available after completing a UK degree.",
    persona_fit: ["student", "professional"],
  },
  {
    slug: "dependant",
    name: "Dependant Visa",
    description: "For partners and children of Student or Skilled Worker visa holders. Rights depend on the main visa holder's visa type.",
    persona_fit: ["student", "professional"],
  },
];
```

---

## 4. Content Standards Quick Reference

### Approved Sources

| Content Type | Use ONLY | Never Use |
|--------------|----------|-----------|
| Visa/immigration | GOV.UK | Forums, blogs, immigration agents |
| NHS/Healthcare | NHS.UK | Private health comparison sites |
| Banking | Official bank websites | Comparison forums, Reddit |
| Housing | Shelter UK, GOV.UK, official platforms | Unverified blogs, Reddit |
| Transport | TfL.gov.uk, official carrier sites | Third-party travel blogs |
| Costs/Prices | Official sources, Numbeo | Outdated blogs, Reddit |

### Persona Branching Guide

Content **must differ** between Student and Professional in these areas:

| Area | Student Version | Professional Version |
|------|----------------|---------------------|
| Housing | University halls, student housing providers | Private rentals, shared flats, serviced apartments |
| Banking | Student account features, overdraft, part-time income | Salary accounts, international transfers, pension |
| Health | University health services, student counselling | GP near office, occupational health, employer insurance |
| Tasks | CAS letter prep, university enrollment, halls check-in | Employment contract prep, NI number, council tax |
| Budget | £500-800/month context, part-time work tips | Salary-based, council tax, commute costs |

Content that is **the same** for both personas: emergency numbers, SIM cards, supermarket guides, GP registration steps, general scam avoidance.

### "Last Updated" and Disclaimer Standards

Every data file entry must include `last_verified` as an ISO date string. Display as "Last updated: [Month Year]" in the UI.

All visa/immigration content must include: *"Verify with official GOV.UK sources — immigration rules change frequently."*

All health content must include: *"This is general guidance only. For medical advice, consult a healthcare professional."*

All housing prices must include: *"Prices are approximate and vary by location and season."*

---

## 5. Content Quality Checklist

Before marking any data file as complete, verify:

- [ ] Every entry has `last_verified` date set
- [ ] All factual claims verified against approved official sources
- [ ] Source URLs documented (in the data file or a separate source doc)
- [ ] Plain English — sentences under 20 words average
- [ ] Actionable — tells user what to DO, not just what exists
- [ ] Persona-specific entries exist where content differs (see branching guide)
- [ ] `display_order` set logically (most important/urgent first)
- [ ] No broken or placeholder URLs in `official_url` fields
- [ ] Category and type values match the interface enum values exactly

---

## 6. Fully Worked Example: banking.ts

This is the "if you follow nothing else, follow this" reference. A complete, production-ready data file:

```typescript
// src/data/banking.ts
// Banking guide data for NewStartAbroad
// Last reviewed: February 2026
// Sources: monzo.com, starling.com, barclays.co.uk, hsbc.co.uk, revolut.com

export interface BankFeature {
  feature: string;
  included: boolean;
}

export interface BankingGuide {
  id: string;
  persona: 'student' | 'professional' | 'both';
  bank_type: 'digital' | 'traditional';
  bank_name: string;
  features: BankFeature[];
  newcomer_friendly: boolean;
  opening_steps: string[];
  monthly_fees: number;
  international_transfer: boolean;
  display_order: number;
  last_verified: string;
}

export const bankingGuides: BankingGuide[] = [
  {
    id: "bank-001",
    persona: "both",
    bank_type: "digital",
    bank_name: "Monzo",
    features: [
      { feature: "Instant spending notifications", included: true },
      { feature: "Built-in budgeting categories", included: true },
      { feature: "Bill splitting with friends", included: true },
      { feature: "Free UK ATM withdrawals", included: true },
      { feature: "Savings pots with goals", included: true },
      { feature: "International transfers (via Wise)", included: false },
      { feature: "Branch access", included: false },
      { feature: "Cheque deposits", included: false },
    ],
    newcomer_friendly: true,
    opening_steps: [
      "Download the Monzo app from App Store or Google Play",
      "Start registration with your passport (you can begin from India)",
      "Take a selfie for identity verification",
      "Enter your UK address after arrival (halls, rental, or temporary address)",
      "Verification completes within 24-48 hours",
      "Order your physical hot coral debit card (arrives in 2-3 working days)",
      "Set up Apple Pay or Google Pay for immediate contactless payments",
    ],
    monthly_fees: 0,
    international_transfer: false,
    display_order: 1,
    last_verified: "2026-02-01",
  },
  {
    id: "bank-002",
    persona: "both",
    bank_type: "digital",
    bank_name: "Starling Bank",
    features: [
      { feature: "Instant spending notifications", included: true },
      { feature: "Connected savings spaces", included: true },
      { feature: "International transfers (built-in via Wise)", included: true },
      { feature: "Free UK ATM withdrawals", included: true },
      { feature: "Free overseas ATM withdrawals", included: true },
      { feature: "Round-up savings", included: true },
      { feature: "Branch access", included: false },
      { feature: "Cheque deposits", included: false },
    ],
    newcomer_friendly: true,
    opening_steps: [
      "Download the Starling Bank app",
      "Begin registration with your passport and a selfie",
      "Provide your UK address when prompted",
      "Account typically approved within 24 hours",
      "Physical debit card arrives in 3-5 working days",
      "Set up standing orders and direct debits for rent and bills",
    ],
    monthly_fees: 0,
    international_transfer: true,
    display_order: 2,
    last_verified: "2026-02-01",
  },
  {
    id: "bank-003",
    persona: "both",
    bank_type: "digital",
    bank_name: "Revolut",
    features: [
      { feature: "Multi-currency accounts (GBP + INR + others)", included: true },
      { feature: "Competitive INR to GBP exchange rates", included: true },
      { feature: "Crypto trading", included: true },
      { feature: "Instant spending notifications", included: true },
      { feature: "Free UK ATM withdrawals (up to £200/month)", included: true },
      { feature: "Virtual disposable cards for online shopping", included: true },
      { feature: "Branch access", included: false },
      { feature: "UK sort code and account number", included: true },
    ],
    newcomer_friendly: true,
    opening_steps: [
      "Download the Revolut app",
      "Register with your passport and phone number",
      "Complete identity verification with a selfie",
      "Your GBP account is ready immediately (virtual card available instantly)",
      "Order a physical card (standard: free, metal: paid)",
      "Top up from your Indian bank card to start using",
    ],
    monthly_fees: 0,
    international_transfer: true,
    display_order: 3,
    last_verified: "2026-02-01",
  },
  {
    id: "bank-004",
    persona: "both",
    bank_type: "traditional",
    bank_name: "Barclays",
    features: [
      { feature: "Branch network across UK (1,000+ branches)", included: true },
      { feature: "Mobile banking app", included: true },
      { feature: "Student account with interest-free overdraft", included: true },
      { feature: "International transfers", included: true },
      { feature: "Cheque deposits (app and branch)", included: true },
      { feature: "Instant spending notifications", included: true },
      { feature: "Bill splitting", included: false },
      { feature: "Free overseas ATM withdrawals", included: false },
    ],
    newcomer_friendly: false,
    opening_steps: [
      "Book an appointment at your nearest Barclays branch (use the branch finder online)",
      "Bring: passport, visa or BRP, proof of UK address, university letter (students) or employment contract (professionals)",
      "Complete the application form at the branch with a staff member",
      "Account is usually opened same day",
      "Debit card arrives by post within 5-7 working days",
      "Download the Barclays app and set up online banking",
    ],
    monthly_fees: 0,
    international_transfer: true,
    display_order: 4,
    last_verified: "2026-02-01",
  },
  {
    id: "bank-005",
    persona: "both",
    bank_type: "traditional",
    bank_name: "HSBC",
    features: [
      { feature: "Branch network across UK", included: true },
      { feature: "Mobile banking app", included: true },
      { feature: "International banking (India-UK corridor)", included: true },
      { feature: "Student account available", included: true },
      { feature: "Global transfers (good for India remittances)", included: true },
      { feature: "Instant notifications", included: true },
      { feature: "Bill splitting", included: false },
      { feature: "Free overseas ATM withdrawals", included: false },
    ],
    newcomer_friendly: false,
    opening_steps: [
      "Book an appointment at your nearest HSBC branch",
      "Bring: passport, visa or BRP, proof of address, and a utility bill or bank statement",
      "Students: bring your university acceptance letter",
      "Professionals: bring your employment contract",
      "Account opening may take 1-3 working days",
      "Debit card and PIN arrive separately by post",
      "Set up online banking via the HSBC app",
    ],
    monthly_fees: 0,
    international_transfer: true,
    display_order: 5,
    last_verified: "2026-02-01",
  },
];
```

This file demonstrates: proper TypeScript typing, both digital and traditional banks represented, `newcomer_friendly` flags for recommendation logic, detailed opening steps that are actionable, feature comparison data suitable for UI tables, and consistent `last_verified` dates.

---

*"Content is the product. The code just displays it."*
