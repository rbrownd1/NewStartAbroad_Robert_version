# NewStartAbroad — Lovable & Build Prompt Library

## Copy-Paste Toolkit for AI-Assisted Development

**Audience:** All students (especially Student 2 — Frontend & Landing)
**Purpose:** Ready-to-use prompts organized by sprint, with verification checklists

---

## 1. Prompt Engineering Principles

### The 6 Rules

1. **Scope ruthlessly.** One page or component per prompt, not entire features. Lovable produces better results when focused on a single deliverable.

2. **Name your design references.** Say "Style like Monzo's app marketing pages" not "make it modern and clean." Concrete references give the AI a visual target.

3. **Declare constraints explicitly.** Every prompt must include: *"UI only, no database, no Supabase, mock data only."* Without this, Lovable will attempt to generate backend code.

4. **Name your components.** Say "Use the existing InfoCard component" not "create a card." This prevents duplicate component creation.

5. **Provide mock data inline.** Include specific examples like "Task: Collect BRP within 10 days of arrival" rather than "add some placeholder content."

6. **Describe layout AND content.** Say "Hero section, then tabs, then grid of cards" not just what features to include. Layout guidance prevents unpredictable results.

### Anti-Patterns That Cause Problems

- Asking for "the entire app" in one prompt — always break into pages
- Omitting the no-backend constraint — Lovable defaults to adding Supabase
- Using vague style descriptions — "modern" means nothing; name a reference site
- Not specifying mobile behavior — always mention how cards/filters should stack
- Asking for real API integrations in Phase 1 — immediate scope creep

### Recovery Prompt Template

If Lovable generates backend code, use this immediately:

> *"Remove all Supabase, database, and backend logic from the project. Keep only UI components, React Context state, and static data arrays in src/data/. All authentication should be mock UI forms only — no real auth logic. Replace any API calls with TODO comments describing what the API will do in Phase 2."*

---

## 2. Sprint 1 Prompts

### Prompt S1-1: Initial Project Setup

```
Build a modern, mobile-first React web app called NewStartAbroad. This app helps
Indians (students and working professionals) moving to the UK manage their first
90 days.

Focus on five pillars: Housing, Health, Banking, SIM Cards, and Local Groceries.

CONSTRAINTS:
- Build UI only with mock/static data in arrays
- Do NOT connect any database, Supabase, or external APIs
- No auth logic — login/signup are UI forms with mock validation only
- Use React 18 + TypeScript + Tailwind CSS + shadcn/ui
- Store persona and city selection in React Context (in-memory only)

COLOR PALETTE:
- Primary: Rich teal or blue-green (#0D9488 range) for headers, CTAs, links
- Accent: Warm coral or soft orange (#F97316 range) for secondary CTAs, badges
- Neutrals: Off-white backgrounds (#F9FAFB), light gray surfaces (#F3F4F6),
  dark gray text (#374151)
- Visual style: Rounded cards, subtle drop shadows, generous white space

Create routes for: / (landing), /onboarding/persona, /onboarding/intake, /plan,
/housing, /banking, /sim, /groceries, /health, /city/london, /resources/apps,
/auth/login, /auth/signup, /profile

Start with the landing page only. Include:
- Hero with headline "Your first 90 days in the UK, made simple"
- 3-step how-it-works section (Choose path, Get your plan, Start your journey)
- 5 feature cards (Housing, Health, Banking, SIM, Groceries) with icons
- Two persona cards (Student vs Working Professional)
- Social proof placeholder section
- Footer CTA "Start Your UK Journey"
```

**Expected output:** Landing page with hero, how-it-works, pillar grid, persona cards, and footer. React Router skeleton with placeholder pages for all routes.

**Verification checklist:**
- [ ] Landing page renders at `/`
- [ ] All 14 routes are defined (even if placeholder)
- [ ] No Supabase or database code present
- [ ] Teal/coral color scheme applied
- [ ] Mobile-responsive layout

---

### Prompt S1-2: Global Layout Component

```
Create a shared Layout component for NewStartAbroad that wraps all pages.

DESKTOP (768px+):
- Top navigation bar with: Logo "NewStartAbroad" (left), links: Home, How it Works,
  Features, Resources, About (center), "Get Started" CTA button (right, coral/orange)
- Footer with 4 columns: Product (Features, Pricing, FAQ), Resources (Blog, Guides,
  Help), Legal (Privacy, Terms, Contact), Social links placeholder

MOBILE (<768px):
- Sticky bottom navigation bar with 5 items: Home (house icon), Plan (checklist icon),
  Housing (building icon), Banking (credit card icon), More (menu icon)
- The "More" item opens a drawer/modal with remaining navigation links
- Top: Simple logo bar only

Use shadcn/ui components. Teal primary color for active nav items. The Layout should
accept children and render them between nav and footer.

CONSTRAINT: UI only, no database, no Supabase, mock data only.
```

**Expected output:** Layout component with desktop top nav and mobile bottom bar.

**Verification checklist:**
- [ ] Desktop shows top navigation bar
- [ ] Mobile shows sticky bottom bar
- [ ] Active page highlighted in nav
- [ ] Footer renders on all pages
- [ ] Smooth transition between breakpoints

---

### Prompt S1-3: Persona Selection Page

```
Build the /onboarding/persona page for NewStartAbroad.

Show two large PersonaCard components side by side (stacked on mobile):

STUDENT CARD:
- Icon: Graduation cap
- Title: "Student"
- Description: "Moving to the UK for university? Get guidance on student
  accommodation, NHS registration, student bank accounts, and budget-friendly
  living."
- Highlight: Budget tips, University support, Student visa guidance

PROFESSIONAL CARD:
- Icon: Briefcase
- Title: "Working Professional"
- Description: "Relocating for work? Get guidance on private rentals, GP
  registration, salary bank accounts, and professional networking."
- Highlight: Career support, Private housing, Skilled Worker visa guidance

BEHAVIOR:
- Clicking a card highlights it with a teal border and subtle background change
- A "Continue" button appears below the selected card
- Store the selection in React Context (not localStorage, not a database)
- On Continue, navigate to /onboarding/intake

STYLE: Rounded corners, subtle shadow, generous padding. Style like Monzo's
onboarding cards. Teal highlight on selection, coral "Continue" button.

CONSTRAINT: UI only, no database, no Supabase, mock data only.
```

**Expected output:** Two PersonaCards with selection state and navigation.

**Verification checklist:**
- [ ] Both cards render with correct content
- [ ] Selection highlights work (only one selectable)
- [ ] Continue button navigates to `/onboarding/intake`
- [ ] Persona stored in React Context
- [ ] Cards stack on mobile

---

### Prompt S1-4: Intake Form Page

```
Build the /onboarding/intake page for NewStartAbroad.

This is a multi-field form that collects the user's relocation details. Show the
selected persona tag at the top (from context).

FIELDS:
1. Origin City — text input, default "Mumbai" (placeholder: "Where are you moving from?")
2. Destination City — dropdown: London, Manchester, Birmingham, Edinburgh, Glasgow,
   Leeds, Bristol, Other
3. Visa Type — dropdown: Student Visa, Skilled Worker Visa, Graduate Visa,
   Dependant Visa
4. Arrival Month — month/year picker (e.g., "September 2026")
5. Accommodation Status — radio group: Not started, Currently searching, Already booked
6. Budget Band — radio group: Tight (under £800/month), Moderate (£800-1200/month),
   Comfortable (£1200+/month)

BEHAVIOR:
- All fields store in React Context (in-memory, not persistent)
- "Generate My UK Plan" button at bottom (coral/orange, full width on mobile)
- On submit: show a success toast "Your UK settlement plan is ready!"
- Navigate to /plan
- Basic client-side validation (all fields required)

STYLE: Clean form layout with labels above fields. Use shadcn/ui form components.
Group related fields. Mobile-friendly spacing.

CONSTRAINT: UI only, no database, no Supabase, mock data only. No real form
submission — just store in context and navigate.
```

**Expected output:** Complete intake form with all fields and navigation.

**Verification checklist:**
- [ ] All 6 fields render correctly
- [ ] Persona tag shows at top
- [ ] Form validation works (required fields)
- [ ] Data stored in React Context
- [ ] Success toast appears on submit
- [ ] Navigates to `/plan`

---

### Prompt S1-5: Route Skeleton

```
Ensure React Router is configured with all 14 routes for NewStartAbroad. Each route
that doesn't have its full page built yet should show a placeholder page with:
- The page title as an H1 heading
- A brief description of what the page will contain
- A "Coming in Sprint [2/3]" badge
- A "Back to Home" link

Routes needed:
/, /onboarding/persona, /onboarding/intake, /plan, /housing, /banking, /sim,
/groceries, /health, /city/:slug (dynamic), /resources/apps, /auth/login,
/auth/signup, /profile

Also add a 404 NotFound page for unknown routes with a friendly message and
"Go Home" button.

CONSTRAINT: UI only, no database, no Supabase, mock data only.
```

**Expected output:** All routes navigable with placeholder pages where needed.

**Verification checklist:**
- [ ] All 14 routes accessible
- [ ] Placeholder pages show sprint info
- [ ] 404 page works for unknown routes
- [ ] Dynamic `/city/:slug` route handles parameters
- [ ] No blank/broken pages

---

## 3. Sprint 2 Prompts

### Prompt S2-1: Plan Dashboard

```
Build the /plan page (90-Day Plan Dashboard) for NewStartAbroad.

LAYOUT:
1. ProgressHeader component at top:
   - Headline: "Your First 90 Days Plan"
   - Show persona tag (Student/Professional) and destination city from context
   - Progress bar showing completion percentage (calculate from completed tasks)
   - "X of Y tasks completed" counter

2. Four tab layout (use shadcn/ui Tabs):
   - Tab 1: "Before You Fly" (pre-departure tasks)
   - Tab 2: "First Week" (days 1-7 after arrival)
   - Tab 3: "First Month" (days 8-30)
   - Tab 4: "First Three Months" (days 31-90)

3. Each tab contains TaskCard components. Each TaskCard shows:
   - Checkbox/toggle for "Mark as done"
   - Task title (bold)
   - Task description (1-2 sentences)
   - Category badge (Housing/Health/Banking/SIM/Groceries — color coded)
   - Timeframe badge matching the tab
   - Link to relevant hub page (e.g., Housing tasks link to /housing)

MOCK DATA — include at least 20 tasks across all 4 tabs. Examples:
Before You Fly:
- "Arrange accommodation" (Housing) — Research and book your first UK accommodation
- "Open a UK bank account app" (Banking) — Download Monzo or Starling and start registration
- "Buy travel insurance" (Admin) — Get coverage for your journey and first weeks
- "Prepare documents folder" (Admin) — Passport, visa, CAS letter, accommodation proof

First Week:
- "Get UK SIM card" (SIM) — Buy and activate a Giffgaff or Three SIM at the airport
- "Register with GP" (Health) — Find and register with your nearest GP surgery
- "Collect BRP" (Admin) — Collect Biometric Residence Permit within 10 days
- "Set up bank account" (Banking) — Complete Monzo/Starling verification with UK address

BEHAVIOR:
- Toggling a task updates local state and recalculates progress percentage
- Filter by persona from context (some tasks only for Student, some only for Professional)
- Tasks persist in state during session (lost on refresh — this is acceptable for Phase 1)

STYLE: Cards with rounded corners, subtle shadows. Category badges use pillar colors.
Progress bar uses teal fill. Style like a modern project management tool.

CONSTRAINT: UI only, no database, no Supabase, mock data only. Task data comes from
a TypeScript array in src/data/tasks.ts.
```

**Expected output:** Fully interactive plan dashboard with tabs, tasks, and progress tracking.

**Verification checklist:**
- [ ] ProgressHeader shows persona and city from context
- [ ] All 4 tabs render with tasks
- [ ] At least 20 tasks total across tabs
- [ ] Toggle marks tasks complete
- [ ] Progress bar updates on toggle
- [ ] Category badges are color-coded
- [ ] Tasks link to hub pages

---

### Prompt S2-2: Hub Page Skeleton Template

Use this template for each of the 5 hub pages. Replace `[PILLAR]` with the specific hub:

```
Build the /[pillar] hub page skeleton for NewStartAbroad.

LAYOUT:
1. Hero section:
   - Large headline: "[Pillar-specific headline]"
   - Subtitle: "[Brief description of what this hub covers]"
   - Breadcrumb: Home > [Pillar Name]

2. Persona tabs or toggle:
   - "For Students" / "For Professionals" tabs
   - Content sections change based on selection (use persona from context as default)

3. Content sections using InfoCard components:
   - [Section 1 placeholder]
   - [Section 2 placeholder]
   - [Section 3 placeholder]

4. Sidebar or bottom section:
   - Quick links to related content
   - "Last updated: February 2026" badge

STYLE: Use existing InfoCard component. Teal headers, rounded cards with shadows.
Mobile: cards stack, tabs become horizontal scroll.

CONSTRAINT: UI only, no database, no Supabase. Content from static arrays in
src/data/[pillar].ts.
```

---

### Prompt S2-3: Auth UI Pages

```
Build the /auth/login and /auth/signup pages for NewStartAbroad.

LOGIN PAGE (/auth/login):
- Email input field
- Password input field
- "Log In" button (teal)
- "Don't have an account? Sign up" link to /auth/signup
- "Forgot password?" link (non-functional, shows "Coming soon" toast)

SIGNUP PAGE (/auth/signup):
- Full name input
- Email input
- Password input (with strength indicator)
- Persona selection (Student/Professional radio buttons)
- Destination city dropdown
- "Create Account" button (coral)
- "Already have an account? Log in" link to /auth/login

BEHAVIOR:
- Mock validation only — check that fields are non-empty, email has @
- On login submit: show toast "Welcome back!" and navigate to /plan
- On signup submit: store persona and city in context, show toast "Account created!
  Let's build your plan.", navigate to /onboarding/intake
- NO real authentication, NO Supabase auth, NO JWT tokens

STYLE: Centered card layout, max-width 480px, clean form styling with shadcn/ui.

CONSTRAINT: UI only, mock validation only, no database, no Supabase, no real auth.
```

**Verification checklist:**
- [ ] Login form renders and validates
- [ ] Signup form renders and validates
- [ ] Mock submit shows toast and navigates
- [ ] No real auth logic present
- [ ] Links between login/signup work

---

## 4. Sprint 3 Prompts

### Prompt S3-1: Housing Hub

```
Build the complete /housing hub page for NewStartAbroad.

HERO: "Find Your UK Home — Without the Stress"
Subtitle: "Navigate UK housing as a newcomer. Avoid scams, understand your options,
and find accommodation that fits your budget."

PERSONA TABS: Student | Professional (default from context)

STUDENT CONTENT:
1. Housing Types section (InfoCards):
   - University Halls: description, pros (social, bills included), cons (limited
     availability, shared facilities), cost range £120-250/week
   - Private Student Housing: Unite Students, Collegiate, cost range £150-300/week
   - Shared Houses: SpareRoom, Rightmove, cost range £400-700/month

2. Documents Needed: CAS letter, passport, proof of funding, university acceptance

3. Scam Avoidance: Never pay before viewing, verify landlord identity, use approved
   platforms, deposit protection schemes (DPS, MyDeposits, TDS)

4. Recommended Platforms: Unite Students, Student.com, Rightmove, SpareRoom,
   OpenRent, Zoopla

PROFESSIONAL CONTENT:
1. Housing Types section (InfoCards):
   - Private Rental (1-bed flat): Rightmove, Zoopla, cost range £800-2000/month
   - Shared Flat: SpareRoom, ideal for first 1-3 months, cost range £500-1000/month
   - Mid-term/Serviced: Spotahome, Blueground, cost range £1200-3000/month

2. Documents Needed: Employment contract, passport, visa, UK bank statements
   (or guarantor), references from previous landlord

3. Scam Avoidance: Same as student plus council tax guidance

4. Recommended Platforms: Rightmove, Zoopla, SpareRoom, OpenRent, Spotahome

BOTTOM SECTION:
- Housing checklist with toggles (mock state)
- "Last updated: February 2026"
- Disclaimer: "Prices are approximate. Verify with official sources."

STYLE: Like Nestpick/Spotahome listing pages. Rounded cards, comparison layout
for housing types, platform logos as links.

CONSTRAINT: UI only, no database, no Supabase. All content from src/data/housing.ts.
```

---

### Prompt S3-2: Banking Hub

```
Build the complete /banking hub page for NewStartAbroad.

HERO: "Banking Without UK Credit History"
Subtitle: "Open a UK bank account before you arrive. Compare digital and
traditional options for newcomers from India."

SECTIONS:
1. Digital Banks (recommended for newcomers) — InfoCards for each:
   - Monzo: Free, instant setup, app-only, budgeting tools, no monthly fees.
     Good for: Daily spending, bill splitting.
   - Starling: Free, app-only, connected savings, international transfers via Wise.
     Good for: Primary banking with savings goals.
   - Revolut: Multi-currency, crypto, free basic tier, £6.99/month premium.
     Good for: International money management, INR transfers.

2. Traditional Banks — InfoCards:
   - Barclays: UK's largest, branch network, graduate account available.
     Requires: Proof of address, ID, student/employment letter.
   - HSBC: International presence, good for India-UK corridor.
     Requires: Proof of address, passport, utility bill.

3. Persona-specific section:
   - STUDENT TAB: Student account benefits, overdraft facilities, part-time
     income handling, budgeting on £500-800/month
   - PROFESSIONAL TAB: Salary accounts, international transfer options,
     council tax direct debit, pension auto-enrollment basics

4. Step-by-Step Account Opening:
   Step 1: Download Monzo/Starling app before leaving India
   Step 2: Start registration with passport photo
   Step 3: Complete verification with UK address after arrival
   Step 4: Order physical debit card
   Step 5: Set up direct debits for rent and bills

5. Budgeting Starter section:
   - Track spending with bank app categories
   - Set savings goals
   - Split bills with flatmates (Monzo/Starling features)

STYLE: Like Monzo's marketing pages. Clean comparison cards, feature tick lists,
step-by-step visual timeline.

CONSTRAINT: UI only, no database, no Supabase. Content from src/data/banking.ts.
```

---

### Prompt S3-3: SIM & Connectivity Hub

```
Build the complete /sim hub page for NewStartAbroad.

HERO: "Stay Connected from Day One"
Subtitle: "Get a UK SIM card, set up broadband, and download the apps you'll
need every day."

SECTIONS:
1. Prepaid vs Contract comparison (side-by-side InfoCards):
   - Prepaid (Pay As You Go): No credit check, buy at airport/shops, top up monthly.
     Best for: First 1-3 months while you settle.
   - Contract (Monthly): Better value long-term, requires UK bank account + address.
     Best for: After 1-3 months when you have a bank account.

2. Carrier Comparison table/cards:
   - Giffgaff: £10/month, 15GB data, unlimited calls/texts, uses O2 network,
     no contract required. India calling: add-on available.
   - Three: £12/month, 12GB data, good coverage, free roaming in many countries.
     India calling: 1p/min with add-on.
   - Vodafone: £15/month, 25GB data, extensive 5G coverage.
     India calling: included in some plans.
   - EE: £18/month, 25GB data, fastest 5G, premium price.
   - Lebara (MVNO): £5/month, includes 100 mins to India, budget option.

3. SIM Setup Checklist (toggles):
   - Buy SIM card at airport or online before departure
   - Have passport ready for ID verification
   - Activate on airport WiFi or accommodation WiFi
   - Port your number later if desired
   - Set up auto-top-up or direct debit

4. Calling India section:
   - WhatsApp/video calls (free over WiFi/data)
   - Carrier international add-ons
   - Skype credit as backup

5. Essential Apps to Download:
   - WhatsApp (communication), Google Maps (navigation), Citymapper (transport),
     Monzo (banking), Deliveroo (food delivery), NHS App (healthcare)

STYLE: Carrier comparison like price comparison sites. Clean cards with monthly
cost prominently displayed.

CONSTRAINT: UI only, no database, no Supabase. Content from src/data/sim.ts.
```

---

### Prompt S3-4: Groceries Hub

```
Build the complete /groceries hub page for NewStartAbroad.

HERO: "Eat Well Without Breaking the Bank"
Subtitle: "Find Indian groceries, discover UK supermarkets, and get your
week-1 shopping sorted."

SECTIONS:
1. UK Supermarket Guide (grid of InfoCards):
   - Tesco: Largest chain, Clubcard discounts, online delivery. Price: Mid-range.
   - Sainsbury's: Good quality, Nectar card rewards, wide range. Price: Mid-range.
   - Asda: Walmart-owned, consistently low prices, large stores. Price: Budget.
   - Aldi: German discount chain, limited range but very cheap. Price: Budget.
   - Lidl: Similar to Aldi, weekly special offers. Price: Budget.
   - M&S Food: Premium quality, small stores in stations. Price: Premium.
   - Waitrose: Premium range, free coffee with loyalty card. Price: Premium.

2. Indian & Asian Grocery Stores:
   - General guidance: Search for "Indian grocery" or "Asian supermarket" near your area
   - Key chains: Taj Stores (London), various local independent stores
   - Online: Red Rickshaw, Spice Village, Amazon Pantry for Indian staples
   - What to expect: Spices, lentils, rice varieties, fresh vegetables, frozen items

3. Food Delivery Apps:
   - Deliveroo: Wide restaurant selection, grocery delivery too
   - Uber Eats: Similar to Deliveroo, often has promotions
   - Just Eat: Largest UK platform, more budget options
   - Getir/Zapp: Ultra-fast grocery delivery (15 min)

4. Week-1 Shopping List:
   - Essentials: Rice (basmati), cooking oil, salt, tea/coffee, milk, bread, eggs
   - Spices: Turmeric, cumin, chilli powder, garam masala, coriander
   - Fresh: Onions, tomatoes, potatoes, ginger, garlic, green chillies
   - Household: Dish soap, sponges, toilet paper, bin bags, laundry detergent
   - Budget tip: "Your first big shop at Aldi/Lidl will cost £30-50 for basics"

5. Budget Tips section:
   - Compare prices with MySupermarket or Trolley.co.uk
   - Buy own-brand products (often identical quality)
   - Yellow sticker reductions in evening for discounted items
   - Batch cook and freeze to save time and money

STYLE: Like a food delivery app UI. Cards with store logos, price level indicators,
friendly shopping list format.

CONSTRAINT: UI only, no database, no Supabase. Content from src/data/groceries.ts.
```

---

### Prompt S3-5: Health & NHS Hub

```
Build the complete /health hub page for NewStartAbroad.

HERO: "Your Health in the UK — NHS and Beyond"
Subtitle: "Register with a GP, understand the NHS, and know who to call in
an emergency."

SECTIONS:
1. Emergency Numbers (prominent, always visible):
   - 999: Life-threatening emergencies (ambulance, fire, police)
   - 111: Non-emergency medical advice (24/7, free)
   - 112: European emergency number (also works in UK)

2. NHS Overview:
   - Free at point of use for most services
   - Funded by Immigration Health Surcharge (paid with visa application)
   - Register with a GP (General Practitioner) as your first step
   - A&E (Accident & Emergency) for serious injuries/illness

3. GP Registration Steps (step-by-step):
   Step 1: Find a GP near your home — use NHS.uk GP finder
   Step 2: Visit in person or register online (varies by surgery)
   Step 3: Bring: passport, visa/BRP, proof of address
   Step 4: Fill out GMS1 registration form
   Step 5: You may be offered a new patient health check
   Step 6: You can now book appointments (online, phone, or in person)

4. Persona-specific content:
   STUDENT TAB:
   - University health services (usually free, on campus)
   - Student Minds and mental health support
   - Sexual health services (free at all ages)
   - Dental: NHS dental treatment costs (check if exempt as student)

   PROFESSIONAL TAB:
   - GP near your office vs near home
   - Occupational health through employer
   - Private health insurance (if offered by employer)
   - Dental: NHS vs private dental — finding an NHS dentist

5. Mental Health Resources:
   - Samaritans: 116 123 (free, 24/7)
   - Mind: mental health charity
   - NHS mental health services: self-referral to talking therapies
   - University counselling services (for students)

6. Pharmacies & Prescriptions:
   - Boots and Superdrug are major pharmacy chains
   - NHS prescriptions: £9.90 per item (or free with exemption certificate)
   - Over-the-counter medications available without prescription

BOTTOM: "Last updated: February 2026"
Disclaimer: "This is general guidance only. For medical advice, consult a
healthcare professional or call 111."

STYLE: NHS.uk-inspired clean layout. Emergency numbers in a prominent red/coral banner.
Step-by-step with numbered circles.

CONSTRAINT: UI only, no database, no Supabase. Content from src/data/health.ts.
```

---

### Prompt S3-6: City Detail Page

```
Build the /city/:slug page for NewStartAbroad. Start with /city/london.

LAYOUT:
1. City hero: "Living in London" with a gradient background
2. CitySummaryCard component:
   - Cost of Living: Very High
   - Average Student Rent: £800-1200/month (shared) / £1000-1800 (halls)
   - Average Professional Rent: £1200-2500/month (1-bed flat)
   - Monthly Transport: £150-180 (Zones 1-3 Travelcard)

3. Sections for each pillar (condensed city-specific info):
   - Housing in London: Popular areas by persona (student: Zone 2-3, near uni;
     professional: Zone 1-2, near office). Areas to consider: Stratford, Wembley,
     Tooting, Canary Wharf, Shoreditch.
   - Transport: Oyster card vs contactless, TfL app, Zones explained, bus vs tube
   - Health: NHS in London, GP finder, major hospitals
   - Banking: Same as general (not city-specific)
   - Groceries: London-specific Indian stores in Wembley, Tooting, Southall

4. Popular Neighbourhoods grid:
   Cards with area name, persona fit (Student/Professional/Both), typical rent,
   transport connections, vibe description.

DYNAMIC ROUTING: The page should accept a :slug parameter. For Phase 1, only
London data needs to be complete. Manchester can be a stretch goal with partial data.

STYLE: City guide aesthetic with sectioned cards. Cost-of-living uses visual
indicators (£ symbols or colored dots).

CONSTRAINT: UI only, no database, no Supabase. Data from src/data/cities.ts.
```

---

### Prompt S3-7: Profile Page

```
Build the /profile page for NewStartAbroad.

LAYOUT:
1. Profile header:
   - User avatar placeholder (initials circle)
   - Name (from signup context or "Guest User" if not set)
   - Persona badge (Student/Professional)
   - Destination city

2. Plan Summary card:
   - Progress bar (same as ProgressHeader)
   - "X of Y tasks completed"
   - Current phase badge (Before You Fly / First Week / etc.)
   - Link to /plan

3. Your Details section:
   - Origin city
   - Destination city
   - Visa type
   - Arrival month
   - Accommodation status
   - Budget band
   - "Edit My UK Plan" button → navigates to /onboarding/intake

4. Notification Preferences:
   - Email notifications toggle (on by default)
   - WhatsApp notifications toggle (off by default)
   - WhatsApp number input (appears when WhatsApp toggle is on)
   - Note: "Notifications will be available in a future update"

STYLE: Clean profile layout with grouped sections. Toggles use shadcn/ui Switch.

CONSTRAINT: UI only, no database, no Supabase. All data from React Context.
Toggles are visual only — they don't actually send notifications.
```

---

### Prompt S3-8: Resources / Apps Page

```
Build the /resources/apps page for NewStartAbroad.

HERO: "Essential Apps for Life in the UK"
Subtitle: "Download these before you arrive — they'll make your first weeks
much smoother."

GROUP BY CATEGORY using AppRecommendationCard components:

TRANSPORT:
- Citymapper: Best for London/Manchester public transport navigation
- TfL Go: Official Transport for London app (Tube, bus, rail)
- Trainline: Book train tickets across UK
- Google Maps: General navigation, walking directions, bus routes

BANKING & MONEY:
- Monzo: Digital bank, instant notifications, budgeting
- Starling: Digital bank, savings goals, connected debit card
- Wise (TransferWise): Best rates for INR → GBP transfers
- Revolut: Multi-currency, international transfers

FOOD & GROCERIES:
- Deliveroo: Restaurant and grocery delivery
- Uber Eats: Food delivery with promotions
- Too Good To Go: Discounted surplus food from restaurants
- Ocado/Tesco app: Grocery delivery and Click & Collect

SAFETY & WELLBEING:
- NHS App: GP appointments, prescriptions, health records
- what3words: Precise location for emergencies
- ICE (In Case of Emergency): Emergency contact info
- Samaritans: Mental health support access

Each AppRecommendationCard shows: App icon placeholder, name, one-line
description, category badge, and "Available on iOS & Android" note.

STYLE: Grid layout, 2 columns on desktop, 1 on mobile. Cards with app icon
circles, clean typography.

CONSTRAINT: UI only, no database, no Supabase. Data from src/data/apps.ts.
```

---

## 5. Sprint 4 Prompts

### Prompt S4-1: Responsive Fixes

```
Review all pages in NewStartAbroad for responsive design issues.

TEST AT THREE BREAKPOINTS:
- 375px (iPhone SE / small mobile)
- 768px (iPad / tablet)
- 1280px (laptop / desktop)

FIX THESE COMMON ISSUES:
1. Navigation: Bottom bar on mobile (<768px), top bar on desktop (768px+)
2. Cards: Stack vertically on mobile, 2-3 columns on tablet/desktop
3. Tables: Horizontal scroll or card view on mobile
4. Forms: Full-width inputs on mobile
5. Tabs: Horizontal scroll if too many on mobile
6. Text: Ensure readable font sizes (minimum 14px body, 12px captions)
7. Touch targets: Minimum 44x44px for buttons and interactive elements
8. Images/icons: Don't overflow on small screens
9. Persona tabs: Should still be easily tappable on mobile

CONSTRAINT: UI only, no database, no Supabase, mock data only.
```

---

### Prompt S4-2: Error States

```
Add error states and loading indicators across NewStartAbroad:

1. 404 PAGE (/404 or catch-all):
   - Friendly message: "Oops! This page doesn't exist yet."
   - "It might be coming in a future update!"
   - "Go Home" button linking to /
   - Illustration placeholder

2. EMPTY STATES for each hub page:
   - If no content loads: "Content loading..." with skeleton cards
   - For plan page if no persona selected: "Choose your path first" with link
     to /onboarding/persona

3. FORM VALIDATION:
   - Intake form: Red border and error message for empty required fields
   - Auth forms: Email format validation, password minimum length
   - Clear error messages in plain English

4. LOADING INDICATORS:
   - Skeleton cards while page sections load (even if data is static, good UX practice)
   - Button loading states (disabled + spinner) on form submissions

CONSTRAINT: UI only, no database, no Supabase, mock data only.
```

---

### Prompt S4-3: SEO & Metadata

```
Add SEO metadata to all pages in NewStartAbroad:

For each route, add:
- <title> tag: "Page Name | NewStartAbroad — Your First 90 Days in the UK"
- <meta name="description"> with page-specific description
- Open Graph tags: og:title, og:description, og:type (website), og:url

EXAMPLES:
Landing: "NewStartAbroad — Your First 90 Days in the UK, Made Simple"
Housing: "UK Housing Guide for Indian Newcomers | NewStartAbroad"
Banking: "Open a UK Bank Account from India | NewStartAbroad"
Plan: "Your 90-Day UK Settlement Plan | NewStartAbroad"

Use React Helmet or the equivalent in the current setup.

CONSTRAINT: UI only, no database, no Supabase, mock data only.
```

---

## 6. Fix & Recovery Prompts

### Backend Code Removal

```
Remove ALL backend, database, and Supabase code from NewStartAbroad.
This includes:
- Any Supabase client initialization
- Any database queries or mutations
- Any authentication logic beyond mock UI forms
- Any API calls to external services
- Any server-side functions or edge functions

Replace with:
- Static TypeScript arrays in src/data/ for all content
- React Context for state management
- Mock validation for forms
- TODO comments where real APIs will connect in Phase 2

Keep all UI components, styling, and navigation intact.
```

### Component Duplication Fix

```
Audit all components in NewStartAbroad for duplicates. The following named
components should each exist ONCE and be imported where needed:
- PersonaCard, TaskCard, TaskSection, ProgressHeader, InfoCard,
  CitySummaryCard, AppRecommendationCard, Layout

If any component has been duplicated with slight variations, consolidate
into the single named version with props for the variations.
```

### Styling Consistency Fix

```
Audit all pages for design system consistency. Ensure:
- Primary teal color used consistently for headers, CTAs, active states
- Coral/orange accent for secondary CTAs and badges only
- All cards have: rounded-lg, shadow-sm or shadow-md, consistent padding
- Text hierarchy: h1 for page titles, h2 for sections, h3 for subsections
- Consistent spacing between sections (use Tailwind spacing scale)
- Dark gray (#374151) for body text, not black
- Off-white (#F9FAFB) for page backgrounds, not pure white

Fix any inconsistencies found.
```

### Context Persistence Fix

```
The persona and intake form data should persist across page navigation
within a session. If context is being lost when navigating between pages:

1. Ensure the Context Provider wraps the entire Router (in App.tsx or main.tsx)
2. Ensure context state is not reset on route changes
3. The context should store: persona, originCity, destinationCity, visaType,
   arrivalMonth, accommodationStatus, budgetBand, completedTaskIds

This is in-memory only — data will be lost on page refresh. That is acceptable
for Phase 1. Do NOT add localStorage or database persistence.
```

### "It Broke Everything" Recovery

```
Something went wrong and the app is broken. Please:
1. Check the console for errors and fix them
2. Ensure React Router is correctly configured with all routes
3. Ensure the Layout component wraps all pages
4. Ensure the Context Provider wraps the Router
5. Check that all imports resolve correctly
6. Remove any half-implemented features that might be causing issues
7. Test navigation between all 14 routes

If a specific feature caused the break, remove it entirely and we'll
re-implement it properly in the next prompt.

CONSTRAINT: UI only, no database, no Supabase, mock data only.
```

---

*"One page per prompt. Name everything. Declare constraints. Ship, then improve."*
