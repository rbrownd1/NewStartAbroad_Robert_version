# NewStartAbroad — Sprint Checklists & QA Sheets

## Printable Reference Cards for Daily Use

**Project:** NewStartAbroad | **Team:** 5 Students | **Timeline:** 4 × 7-Day Sprints

**February 2026 | Document 5 of 5**

---

## 1. Sprint 1 Checklist: Foundation (Days 1–7)

**Goal:** Project scaffolding, design system, landing page, onboarding flow deployed.

### Student 1 — Product Lead / PM

- [ ] Define sprint scope and communicate to all team members
- [ ] Establish prompt strategy document for Lovable interactions
- [ ] Set up GitHub repository and invite all team members
- [ ] Create task tracking board (GitHub Projects or equivalent)
- [ ] Review Student 2's landing page copy for accuracy and tone
- [ ] Verify all 14 route placeholders are navigable after Student 5 deploys

### Student 2 — Frontend & Landing

- [ ] Landing page: Hero section with "Your first 90 days in the UK, made simple"
- [ ] Landing page: 3-step "How It Works" section
- [ ] Landing page: 5-pillar feature grid (Housing, Health, Banking, SIM, Groceries)
- [ ] Landing page: Two persona cards (Student vs Working Professional)
- [ ] Landing page: Social proof placeholder section
- [ ] Landing page: Footer CTA
- [ ] Global Layout component: Desktop top nav (Logo + Home, How it Works, Features, Resources, About, Get Started)
- [ ] Global Layout component: Mobile sticky bottom bar (Home, Plan, Housing, Banking, More)
- [ ] Global Layout component: Footer (FAQ, Privacy, Terms, Contact)
- [ ] Design system: Teal primary, coral accent, off-white backgrounds enforced
- [ ] Design system: Typography hierarchy (Inter or similar sans-serif) applied

### Student 3 — Plan & Checklist

- [ ] Persona selection page (`/onboarding/persona`): Two large PersonaCards
- [ ] Persona selection page: Visual highlight on selection
- [ ] Persona selection page: "Continue" button navigates to intake
- [ ] Persona selection stored in React Context
- [ ] Intake form page (`/onboarding/intake`): All fields present — persona tag, origin city, destination city, visa type, arrival month/year, accommodation status, budget band
- [ ] Intake form page: "Generate my UK plan" button → toast + navigate to `/plan`
- [ ] Intake form data stored in React Context

### Student 4 — Hub Pages (Content)

- [ ] Begin research: Housing content — types, platforms, scam patterns, deposit protection
- [ ] Begin research: Banking content — digital vs traditional, opening steps, fees
- [ ] Document all sources with URLs and access dates
- [ ] Start drafting housing.ts and banking.ts data file structures

### Student 5 — City & Auth & Deploy

- [ ] React Router skeleton for ALL 14 routes with placeholder pages
- [ ] GitHub sync from Lovable confirmed working
- [ ] Initial deployment to .lovable.app
- [ ] Verify all 14 routes return a page (even if placeholder)
- [ ] Verify navigation between routes works without errors

### Sprint 1 Checkpoint

> **Can a user go from the landing page through persona selection and intake form to the plan page (even if empty)?**

### Sprint 1 Demo Script

1. Open landing page → show hero, 5-pillar grid, persona cards
2. Click "Get Started" → persona selection page loads
3. Select "Student" → highlight state visible
4. Click "Continue" → intake form loads
5. Fill all fields → click "Generate my UK plan"
6. Plan page loads (may be empty — that's acceptable for Sprint 1)
7. Show navigation: click through to at least 3 hub page placeholders
8. Show mobile view (375px): bottom nav visible and functional

---

## 2. Sprint 2 Checklist: Core Dashboard + Hub Skeletons (Days 8–14)

**Goal:** Fully functional 90-day plan dashboard with interactive checklist. All hub pages navigable with hero sections.

### Student 1 — PM

- [ ] Review task data (tasks.ts) for content accuracy
- [ ] Verify tasks span all 4 timeframes (Before You Fly, First Week, First Month, First Three Months)
- [ ] Verify tasks include both personas (student and professional)
- [ ] Conduct sprint retrospective — document what worked and blockers
- [ ] Resolve any blocked items from Sprint 1

### Student 2 — Frontend & Landing

- [ ] Design system polish: consistent spacing, shadows, and border-radius across Sprint 1 pages
- [ ] Responsive fixes for landing page at 375px, 768px, 1280px+
- [ ] Responsive fixes for onboarding pages at all breakpoints
- [ ] Support Student 3 and Student 4 with shared component patterns

### Student 3 — Plan & Checklist

- [ ] Plan dashboard (`/plan`): ProgressHeader component with progress bar
- [ ] Plan dashboard: 4-tab layout (Before You Fly / First Week / First Month / First Three Months)
- [ ] Plan dashboard: TaskCards rendered from tasks.ts data
- [ ] TaskCard: Title, description, category tag, timeframe badge visible
- [ ] TaskCard: "Mark as done" toggle functional (local state)
- [ ] TaskCard: Category tags displayed (Housing/Health/Banking/SIM/Groceries)
- [ ] Progress bar recalculates as tasks are toggled complete
- [ ] Tasks filtered by active tab (timeframe)
- [ ] Tasks filtered by persona from context

### Student 4 — Hub Pages (Content)

- [ ] Create tasks.ts — minimum 20 tasks across 4 timeframes, both personas
- [ ] Create housing.ts — housing types, platforms, tips, scam warnings
- [ ] Create banking.ts — digital and traditional banks, features, opening steps
- [ ] Create sim.ts — carrier comparisons, plan types, India calling rates
- [ ] Create groceries.ts — supermarkets, Indian stores, delivery apps
- [ ] Create health.ts — NHS overview, GP registration, emergency numbers
- [ ] Create apps.ts — recommended apps by category
- [ ] Create cities.ts — London minimum, Manchester stretch
- [ ] Housing hub (`/housing`): Hero section + basic InfoCard layout
- [ ] Banking hub (`/banking`): Hero section + basic InfoCard layout
- [ ] SIM hub (`/sim`): Hero section + basic InfoCard layout
- [ ] Groceries hub (`/groceries`): Hero section + basic InfoCard layout
- [ ] Health hub (`/health`): Hero section + basic InfoCard layout

### Student 5 — City & Auth & Deploy

- [ ] Login page (`/auth/login`): Email/password form with mock validation
- [ ] Signup page (`/auth/signup`): Name, email, password, persona, destination city with mock validation
- [ ] Profile page skeleton (`/profile`): Basic layout with persona and city display
- [ ] Continuous deployment — latest code live on .lovable.app
- [ ] No console errors on any deployed page

### Sprint 2 Checkpoint

> **Can a user toggle tasks complete and see the progress bar update? Do all 5 hub pages load without errors?**

### Sprint 2 Demo Script

1. Navigate to `/plan` → ProgressHeader visible with progress bar
2. Show all 4 tabs — click each, verify different tasks appear
3. Toggle 3 tasks complete → progress bar increases
4. Toggle 1 task back to incomplete → progress bar decreases
5. Navigate to each hub page (Housing, Banking, SIM, Groceries, Health) → hero sections visible
6. Navigate to `/auth/login` → form renders, mock validation works
7. Navigate to `/auth/signup` → form renders with all fields
8. Show mobile view: plan dashboard tabs scroll horizontally or stack

---

## 3. Sprint 3 Checklist: Full Content + Remaining Pages (Days 15–21)

**Goal:** All 14 routes fully populated with persona-specific content.

### Student 1 — PM

- [ ] Cross-reference Housing content against Shelter UK and GOV.UK (deposit protection)
- [ ] Cross-reference Banking content against Monzo, Starling, Barclays, HSBC official sites
- [ ] Cross-reference Health content against NHS.UK
- [ ] Cross-reference SIM content against official carrier sites
- [ ] Verify all content includes "Last updated" dates
- [ ] Verify visa/legal content includes GOV.UK disclaimer
- [ ] Content accuracy sign-off: all 5 hubs approved

### Student 2 — Frontend & Landing

- [ ] Responsive polish: all pages tested at 375px, 768px, 1280px+
- [ ] Mobile nav verification: bottom bar works on all pages
- [ ] Design consistency audit: teal/coral palette applied consistently
- [ ] Typography hierarchy consistent across all pages
- [ ] Card shadows and border-radius consistent

### Student 3 — Plan & Checklist

- [ ] Profile page (`/profile`): Displays persona from context
- [ ] Profile page: Displays destination city
- [ ] Profile page: Displays arrival date
- [ ] Profile page: Plan summary card (tasks completed / total)
- [ ] Profile page: Notification toggles (email, WhatsApp — non-functional UI only)
- [ ] Profile page: "Edit my UK plan" button links back to intake
- [ ] Task data refinements based on PM review feedback

### Student 4 — Hub Pages (Content)

- [ ] Housing hub complete: Student/Professional tabs or sections
- [ ] Housing hub: Housing types with InfoCards (halls, private rental, shared house, mid-term)
- [ ] Housing hub: Documents needed section
- [ ] Housing hub: Scam avoidance section
- [ ] Housing hub: Recommended platforms section
- [ ] Housing hub: Housing checklist
- [ ] Banking hub complete: Digital vs traditional comparison cards
- [ ] Banking hub: Persona-specific views (student fees vs professional salary features)
- [ ] Banking hub: Step-by-step account opening guide
- [ ] Banking hub: Budgeting starter section
- [ ] SIM hub complete: Prepaid vs contract comparison
- [ ] SIM hub: Carrier comparison cards
- [ ] SIM hub: Setup checklist
- [ ] SIM hub: India calling rates section
- [ ] Groceries hub complete: Supermarket grid
- [ ] Groceries hub: Indian/Asian stores section
- [ ] Groceries hub: Delivery apps section
- [ ] Groceries hub: Week-1 shopping tips/list
- [ ] Health hub complete: NHS vs private overview
- [ ] Health hub: GP registration steps
- [ ] Health hub: Emergency numbers (999/111)
- [ ] Health hub: Persona-specific sections (university health vs GP near office)
- [ ] Health hub: Mental health resources

### Student 5 — City & Auth & Deploy

- [ ] City detail page (`/city/london`): CitySummaryCard with cost-of-living indicator
- [ ] City detail page: Housing zones / popular neighbourhoods
- [ ] City detail page: Transport summary
- [ ] City detail page: City-specific tips
- [ ] Manchester city page (`/city/manchester`) — stretch goal
- [ ] Resources page (`/resources/apps`): AppRecommendationCards grouped by category
- [ ] Resources page: Transport apps (Citymapper, TfL)
- [ ] Resources page: Banking apps (Monzo, Starling)
- [ ] Resources page: Groceries apps (Deliveroo, Uber Eats)
- [ ] Resources page: Safety & Wellbeing apps
- [ ] Auth flow polish: form validation feedback, error states

### Sprint 3 Checkpoint

> **Can you walk the full persona flow — Landing → Persona → Intake → Plan → each Hub → City → Profile — without hitting empty states?**

### Sprint 3 Demo Script

1. Start at landing page → click "Get Started"
2. Select "Student" persona → fill intake form → generate plan
3. Show plan dashboard with tasks → toggle a few complete
4. Click through to Housing hub → show student-specific content
5. Click through to Banking hub → show student bank comparison
6. Click through to SIM hub → show carrier comparison
7. Click through to Groceries hub → show supermarkets + Indian stores
8. Click through to Health hub → show NHS overview + GP registration
9. Navigate to `/city/london` → show city detail card
10. Navigate to `/resources/apps` → show app recommendations
11. Navigate to `/profile` → show persona, city, plan summary
12. **Repeat steps 1–11 with "Working Professional" persona** — verify content differences

---

## 4. Sprint 4 Checklist: Polish, Test & Deploy (Days 22–28)

**Goal:** Production-ready deployed application with documentation.

### All Students — Collaborative Tasks

- [ ] **Mobile-first verification:** All pages tested at 375px (mobile)
- [ ] **Mobile-first verification:** All pages tested at 768px (tablet)
- [ ] **Mobile-first verification:** All pages tested at 1280px+ (desktop)
- [ ] **Mobile nav:** Sticky bottom bar works on all pages at mobile breakpoint
- [ ] **Desktop nav:** Top bar displays correctly on all pages at desktop breakpoint
- [ ] **Cross-browser:** Chrome — all pages render correctly
- [ ] **Cross-browser:** Safari — all pages render correctly
- [ ] **Cross-browser:** Firefox — all pages render correctly
- [ ] **Cross-browser:** Edge — all pages render correctly
- [ ] **Persona flow (Student):** Landing → Persona → Intake → Plan → all Hubs → City → Profile — no broken states
- [ ] **Persona flow (Professional):** Same flow — verify different content appears where expected
- [ ] **Context persistence:** Persona and city persist across navigation without page refresh
- [ ] **Content accuracy:** All GOV.UK references verified current
- [ ] **Content accuracy:** All NHS.UK references verified current
- [ ] **Content accuracy:** All bank information verified against official sites
- [ ] **Content accuracy:** "Last updated" dates present on all factual content
- [ ] **Content accuracy:** Disclaimers present on visa/legal content
- [ ] **Error states:** Loading indicators present where needed
- [ ] **Error states:** Empty states handled gracefully
- [ ] **Error states:** 404 page exists and handles unknown routes
- [ ] **Error states:** Form validation feedback on login, signup, and intake forms
- [ ] **SEO:** Page titles set for all 14 routes
- [ ] **SEO:** Meta descriptions set for all 14 routes
- [ ] **SEO:** Open Graph tags for social sharing
- [ ] **Deploy:** Production build runs without errors
- [ ] **Deploy:** Published to .lovable.app
- [ ] **Deploy:** Production URL tested on mobile device
- [ ] **Deploy:** Production URL tested on desktop browser
- [ ] **Documentation:** README includes architecture overview
- [ ] **Documentation:** README includes setup instructions
- [ ] **Documentation:** README includes team contributions per student
- [ ] **Documentation:** README includes data sources list
- [ ] **Documentation:** README includes Phase 2 roadmap summary
- [ ] **No console errors** on any page in production build

### Sprint 4 Final Checkpoint

> **Does the deployed URL work on mobile and desktop? Is the README complete?**

---

## 5. End-to-End Persona Flow Test Script

Run this script twice — once as **Student**, once as **Working Professional**.

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Open landing page (`/`) | Hero section visible, 5-pillar grid, persona cards, footer CTA | |
| 2 | Click "Get Started" or CTA button | Navigates to `/onboarding/persona` | |
| 3 | Verify two PersonaCards displayed | "Student" and "Working Professional" cards visible | |
| 4 | Select persona (Student or Professional) | Card highlights, selection stored | |
| 5 | Click "Continue" | Navigates to `/onboarding/intake` | |
| 6 | Verify intake form fields | Origin city, destination city, visa type, arrival month, accommodation status, budget band all present | |
| 7 | Fill all fields and submit | Toast notification, navigates to `/plan` | |
| 8 | Verify plan dashboard | ProgressHeader visible, 4 tabs present (Before You Fly, First Week, First Month, First Three Months) | |
| 9 | Verify TaskCards in active tab | Tasks visible with title, description, category tag | |
| 10 | Toggle 2 tasks complete | Checkmark appears, progress bar increases | |
| 11 | Toggle 1 task back to incomplete | Checkmark removed, progress bar decreases | |
| 12 | Switch between all 4 tabs | Different tasks appear per tab | |
| 13 | Navigate to `/housing` | Housing hub loads, persona-specific content visible | |
| 14 | Verify Housing persona content | Student: university halls prominent / Professional: private rentals prominent | |
| 15 | Navigate to `/banking` | Banking hub loads, comparison cards visible | |
| 16 | Verify Banking persona content | Student: student accounts / Professional: salary accounts with international transfers | |
| 17 | Navigate to `/sim` | SIM hub loads, carrier comparison visible | |
| 18 | Navigate to `/groceries` | Groceries hub loads, supermarket grid + Indian stores visible | |
| 19 | Navigate to `/health` | Health hub loads, NHS overview + GP registration visible | |
| 20 | Verify Health persona content | Student: university health services / Professional: GP near office | |
| 21 | Navigate to `/city/london` | City detail page loads, CitySummaryCard visible | |
| 22 | Navigate to `/resources/apps` | Apps page loads, AppRecommendationCards grouped by category | |
| 23 | Navigate to `/profile` | Profile page loads, correct persona and city displayed | |
| 24 | Verify profile plan summary | Task completion count matches dashboard | |
| 25 | Click "Edit my UK plan" | Navigates back to intake form | |
| 26 | Navigate to `/auth/login` | Login form renders with email/password fields | |
| 27 | Submit login with mock data | Mock validation response (success or error state) | |
| 28 | Navigate to unknown route (e.g., `/xyz`) | 404 page displayed | |

**Test Date:** _____________ **Tester:** _____________ **Persona Tested:** _____________

**Result:** ______ / 28 steps passed

---

## 6. Responsive Breakpoint Test Matrix

Test each route at three breakpoints. Mark Pass (✓) or Fail (✗) with notes.

| Route | 375px (Mobile) | 768px (Tablet) | 1280px+ (Desktop) | Notes |
|-------|:-:|:-:|:-:|-------|
| `/` (Landing) | | | | Cards stack on mobile, grid on desktop |
| `/onboarding/persona` | | | | PersonaCards stack vertically on mobile |
| `/onboarding/intake` | | | | Form fields full-width on mobile |
| `/plan` | | | | Tabs scroll horizontally or stack on mobile |
| `/housing` | | | | InfoCards stack on mobile |
| `/banking` | | | | Comparison cards stack on mobile |
| `/sim` | | | | Carrier cards stack on mobile |
| `/groceries` | | | | Grid columns reduce on mobile |
| `/health` | | | | Content sections stack on mobile |
| `/city/london` | | | | CitySummaryCard full-width on mobile |
| `/resources/apps` | | | | AppCards stack on mobile |
| `/auth/login` | | | | Form centered, full-width on mobile |
| `/auth/signup` | | | | Form centered, full-width on mobile |
| `/profile` | | | | Profile card full-width on mobile |

**Key Checks Per Breakpoint:**

- **375px:** Bottom nav visible (not top nav). Cards stack vertically. No horizontal overflow. Touch targets ≥ 44px.
- **768px:** Layout adapts — 2-column grids where appropriate. Nav may be either top or bottom.
- **1280px+:** Top nav visible (not bottom nav). Full grid layouts. Generous white space.

**Test Date:** _____________ **Tester:** _____________

---

## 7. Content Accuracy Audit Sheet

For each hub, verify key claims against approved sources. Add rows as needed.

### Housing Hub

| Claim | Source URL | Verified? | Date | Reviewer |
|-------|-----------|:-:|------|----------|
| Deposit protection scheme details | GOV.UK deposit protection page | | | |
| Average rent ranges by city | Numbeo / official sources | | | |
| Scam warning patterns | Shelter UK / Action Fraud | | | |
| Recommended platforms (Rightmove, SpareRoom, etc.) | Official platform sites | | | |

### Banking Hub

| Claim | Source URL | Verified? | Date | Reviewer |
|-------|-----------|:-:|------|----------|
| Monzo features and fees | monzo.com | | | |
| Starling features and fees | starlingbank.com | | | |
| Barclays newcomer account details | barclays.co.uk | | | |
| HSBC newcomer account details | hsbc.co.uk | | | |
| Account opening requirements | Official bank sites | | | |

### Health Hub

| Claim | Source URL | Verified? | Date | Reviewer |
|-------|-----------|:-:|------|----------|
| NHS eligibility for students | NHS.UK | | | |
| NHS eligibility for workers | NHS.UK | | | |
| GP registration process | NHS.UK | | | |
| Emergency numbers (999/111) | NHS.UK | | | |
| Immigration Health Surcharge | GOV.UK | | | |

### SIM Hub

| Claim | Source URL | Verified? | Date | Reviewer |
|-------|-----------|:-:|------|----------|
| Giffgaff plans and pricing | giffgaff.com | | | |
| Three plans and pricing | three.co.uk | | | |
| Vodafone plans and pricing | vodafone.co.uk | | | |
| India calling rates | Official carrier sites | | | |

### Groceries Hub

| Claim | Source URL | Verified? | Date | Reviewer |
|-------|-----------|:-:|------|----------|
| Supermarket price tiers | Official supermarket sites | | | |
| Delivery app availability | Deliveroo, Uber Eats sites | | | |
| Indian grocery store guidance | General guidance (not specific stores) | | | |

**Approved Sources Only:** GOV.UK, NHS.UK, official bank websites, Shelter UK, TfL.gov.uk, official carrier sites, Numbeo.

**NOT Approved:** Forums, Reddit, blogs, comparison sites, immigration agents.

---

## 8. Component Reuse Audit

Verify that all 8 named components are used as specified and not duplicated.

| Component | Expected Usage | Actually Used? | Duplicates Found? | Notes |
|-----------|---------------|:-:|:-:|-------|
| `PersonaCard` | `/onboarding/persona` | | | Should NOT be recreated on other pages |
| `TaskCard` | `/plan` | | | One implementation, used for all tasks |
| `TaskSection` | `/plan` | | | Groups TaskCards by timeframe tab |
| `ProgressHeader` | `/plan` | | | Single instance with progress bar |
| `InfoCard` | `/housing`, `/banking`, `/sim`, `/groceries`, `/health` | | | Same component across ALL hub pages |
| `CitySummaryCard` | `/city/[slug]` | | | One implementation per city |
| `AppRecommendationCard` | `/resources/apps` | | | Grouped by category |
| `Layout` | All pages (global) | | | Desktop nav + mobile bottom bar + footer |

**Audit Rule:** If a new card-style component exists that duplicates InfoCard or TaskCard functionality, flag it for consolidation.

**Audit Date:** _____________ **Auditor:** _____________

---

*"Phase 1 is UI-only. No exceptions. Ship the UI, then add backend in Phase 2."*
