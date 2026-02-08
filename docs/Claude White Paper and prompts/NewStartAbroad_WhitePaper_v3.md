# NewStartAbroad — White Paper v3

## Your First 90 Days in the UK, Made Simple

### Investigational Analysis, Architecture Reference & Build Guide for a 5-Student Development Team

Based on the original prompt specifications and live deployment at **https://newstartabroad.lovable.app**

**Platform:** Lovable.dev | **Stack:** React 18 + Vite + Tailwind CSS + shadcn/ui

**Backend (Phase 2):** Supabase | **Design:** Fintech + Relocation Hybrid

**February 2026 | Version 3.0**

---

## 1. Executive Summary

NewStartAbroad is a web application built on Lovable.dev that guides Indian students and working professionals through their first 90 days in the United Kingdom. It covers five core pillars — Housing, Health, Banking, SIM & Connectivity, and Groceries — with persona-specific content (Student vs. Working Professional) and city-specific guidance.

This white paper is based on the actual prompt specifications used to build the app, comprising three iterative prompts that evolved from a broad feature brainstorm (25 features) to a focused, UI-first Phase 1 implementation. The document provides a complete analysis of the app's architecture and a practical build guide for a 5-student team to replicate and extend it.

**Critical Design Decision:** The app was explicitly built as **UI-only with mock/static data** in Phase 1 — no database, no Supabase, no external APIs. All data lives in TypeScript arrays and component state. This approach is deliberate: it allows rapid UI iteration on Lovable before wiring to a real backend in Phase 2.

The Phase 1 constraint eliminates an entire class of bugs and lets the team focus on user experience and content quality. The 5-pillar content is the actual product value. By forcing everything into TypeScript arrays in `src/data/`, the team is compelled to treat content as a first-class deliverable rather than something that lives in a database somewhere. When Phase 2 arrives, the team migrates validated, reviewed content into Supabase — not debugging both content accuracy and database queries simultaneously.

The project spans three defined phases: Phase 1 (the current 4-week sprint) delivers the UI-only MVP; Phase 2 (post-submission) adds Supabase backend, N8N automation, and AI chat integration; Phase 3 (independent work) embeds interactive tools drawn from the companion Relocator project.

---

## 2. How the App Was Built: The 3-Prompt Strategy

The NewStartAbroad team used an iterative prompting strategy that refined scope across three distinct prompts. Understanding this evolution is essential for any student team attempting to replicate the approach.

| Prompt | Focus | Key Decisions | Output |
|--------|-------|---------------|--------|
| **Prompt 1** | Broad brainstorm: 25 features, general country-agnostic scope, monetization strategy | Identified target user pain points. Requested Excel output with execution plan, features, and monetization. | Strategic planning document (not code) |
| **Prompt 2** | Full app specification: 10 pages, general origin/destination, all content areas | Defined all routes, data models, design system, integration stubs. Production-ready code requested. | Comprehensive spec (too broad for Phase 1) |
| **Prompt 3** | Focused execution: India→UK only, 5 pillars, UI-only, persona-driven, Lovable-optimized | Explicit constraints: no backend, no auth logic, mock data only. Named specific design references (Nestpick, Monzo, Spotahome). | The actual app deployed at lovable.app |

**Key Lesson for Students:** The team did not try to build everything at once. They brainstormed broadly (Prompt 1), specified comprehensively (Prompt 2), then **ruthlessly scoped down** to a deliverable Phase 1 (Prompt 3). This is the single most important pattern for succeeding with Lovable: start narrow, ship, then expand.

---

## 3. Application Analysis

### 3.1 Domain and Problem Statement

The problem is clear and well-defined: when anyone travels to a foreign country, there is confusion and no single reliable source of information. The team identified this from personal experience as a group of 5 AI enthusiasts. The app consolidates relocation guidance into a single, structured, persona-aware experience.

### 3.2 Target Users

The app explicitly targets two personas, both originating from India:

| Persona | Description | Content Differences |
|---------|-------------|---------------------|
| **Student** | University/college student moving to the UK on a Student visa. Typically 18–28, budget-conscious, first time abroad. | University halls focus, NHS + university health services, student bank accounts, part-time income handling, CAS document requirements. |
| **Working Professional** | Full-time employee or contractor moving on a Skilled Worker or Graduate visa. Typically 25–45, salary-funded. | Private rentals + shared flats, GP near office, salary bank accounts with international transfers, occupational health, council tax guidance. |

### 3.3 The Five Phase-1 Pillars

From the original 25 brainstormed features, the team distilled five pillars for Phase 1:

| Pillar | Covers | Design Reference | Hub Route |
|--------|--------|------------------|-----------|
| **Housing** | Halls, private rentals, shared houses, mid-term platforms, scam avoidance, deposit protection | Nestpick, Spotahome, Flatio | `/housing` |
| **Health** | NHS vs private, GP registration, emergency numbers (999/111), university health, mental health | NHS.uk patterns | `/health` |
| **Banking** | Digital banks (Monzo/Starling/Revolut), traditional banks (Barclays/HSBC), account opening steps, budgeting | Monzo, Starling app design | `/banking` |
| **SIM & Connectivity** | Prepaid vs contract, carriers vs MVNOs, international calling rates to India, essential app setup | Carrier comparison sites | `/sim` |
| **Groceries** | UK supermarkets, Indian/Asian grocery stores, food delivery apps, discount/bulk options, week-1 shopping list | Deliveroo, grocery app UIs | `/groceries` |

### 3.4 Original 25-Feature Brainstorm (Future Phases)

The following features were brainstormed in Prompt 1 but deferred beyond Phase 1. They represent the product roadmap for the student team to reference when planning extensions:

| # | Feature | Phase-1 Status | Notes |
|---|---------|----------------|-------|
| 1 | Entry Permit to Resident Visa conversion | Deferred | Complex legal content; future visa-guide module |
| 2 | Embassy information | Deferred | Static content page, low complexity |
| 3 | Insurance | Deferred | Health insurance partially covered under Health pillar |
| 4 | Bank Account | **Phase 1 ✓** | Full banking hub implemented |
| 5 | Accommodation | **Phase 1 ✓** | Full housing hub implemented |
| 6 | Driving License | Deferred | Country-specific, high regulatory complexity |
| 7 | Healthcare facilities | **Phase 1 ✓** | Full health hub implemented |
| 8 | OLX-type marketplaces | Deferred | Requires marketplace integration |
| 9 | Mandatory Medical Test | Deferred | Visa-specific; add to pre-arrival checklist |
| 10 | Dependent Visa | Deferred | Visa type option exists in intake form |
| 11 | School Admission | Deferred | Family persona needed (Phase 3+) |
| 12 | Easy Transport Routes | Partial | Covered in Essential Services / city guides |
| 13 | Emergency Services | **Phase 1 ✓** | 999/111 in health hub |
| 14 | Travel places | Deferred | Full tourism module from Prompt 2 |
| 15 | Mobile & Internet | **Phase 1 ✓** | Full SIM hub implemented |
| 16 | Grocery stores | **Phase 1 ✓** | Full groceries hub implemented |
| 17 | Garbage collection laws | Deferred | City-specific, add to daily-life guide |
| 18 | Working days and hours | Deferred | Add to cultural tips module |
| 19 | Community connects | Deferred | Social feature; requires backend |
| 20 | Car Rentals | Deferred | Transport module extension |
| 21 | Packers and Movers | Deferred | Pre-arrival services module |
| 22 | Household Repairs | Deferred | Post-arrival daily-life module |
| 23 | Properties / Real Estate | Partial | Housing hub covers rentals, not purchases |
| 24 | Gyms | Deferred | Lifestyle module extension |
| 25 | Libraries | Deferred | Student-persona resource page |

---

## 4. Technical Architecture

### 4.1 Technology Stack

| Layer | Technology | Role in NewStartAbroad |
|-------|-----------|------------------------|
| Frontend | React 18 + TypeScript | Component-based UI with type safety. All 14+ routes are React components. |
| Build Tool | Vite | Fast HMR development server. Sub-second hot reloads during Lovable development. |
| Styling | Tailwind CSS | Utility-first CSS. The teal/coral/off-white palette is configured via tailwind.config.ts. |
| UI Library | shadcn/ui + Radix UI | Pre-built accessible components: Cards, Buttons, Dialogs, Tabs, Progress bars. |
| Icons | Heroicons / Lucide React | Placeholder icons for Housing, Health, Banking, SIM, Groceries pillars. |
| Routing | React Router v6 | Client-side navigation across all 14+ routes with dynamic city slugs. |
| State (Phase 1) | React Context + local state | Persona, city, intake data, and task completion stored in-memory only. |
| Backend (Phase 2) | Supabase | PostgreSQL database, authentication, RLS, edge functions. Not used in Phase 1. |
| Deployment | Lovable Hosting | One-click deploy to newstartabroad.lovable.app subdomain. |
| Version Control | GitHub (via Lovable sync) | Automatic code sync for team collaboration. |

### 4.2 Verified Route Map

The following routes are directly specified in the Prompt 3 specification and represent the actual navigation structure:

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Hero with CTA, 3-step how-it-works, 5-pillar feature grid, persona cards, social proof, footer CTA |
| `/onboarding/persona` | Persona Selection | Two large PersonaCards: Student vs Working Professional. Selection stored in context. |
| `/onboarding/intake` | Intake Form | Origin city, destination city, visa type, arrival month, accommodation status, budget band |
| `/plan` | 90-Day Plan Dashboard | ProgressHeader + tabs: Before You Fly, First Week, First Month, First Three Months. TaskCards with status toggles. |
| `/housing` | Housing Hub | Guide UI (not marketplace). Types, documents, renting tips, recommended platforms, housing checklist. |
| `/banking` | Banking Hub | Digital vs traditional bank comparison. Persona-specific views. Step-by-step account opening. Budgeting section. |
| `/sim` | SIM & Connectivity | Prepaid vs contract, carrier comparison, checklist for setup, India calling rates. |
| `/groceries` | Groceries Hub | Supermarket grid, Indian/Asian stores, delivery apps, week-1 shopping tips. |
| `/health` | Health & NHS Hub | NHS vs private, GP registration steps, emergency numbers, persona-specific sections. |
| `/city/[slug]` | City Detail | Dynamic route (e.g., /city/london). Cost-of-living indicator, housing zones, transport, neighborhoods. |
| `/resources/apps` | Essential Apps | AppRecommendationCards grouped: Transport, Banking, Groceries, Safety & Wellbeing. |
| `/auth/login` | Login UI | Email/password form with mock validation. No actual auth logic. |
| `/auth/signup` | Signup UI | Name, email, password, persona, destination city. Mock validation only. |
| `/profile` | Profile Page | Display persona, city, arrival date, plan summary. Notification toggles. Edit link to intake. |

### 4.3 Verified Component Architecture

The following components are explicitly named in the Prompt 3 specification:

| Component | Purpose | Used On |
|-----------|---------|---------|
| `PersonaCard` | Card for Student vs Working Professional selection with highlight state | `/onboarding/persona` |
| `TaskCard` | Checklist item: title, description, category tag, timeframe badge, "Mark as done" toggle | `/plan` |
| `TaskSection` | Groups TaskCards by timeframe (Before You Fly, First Week, etc.) | `/plan` |
| `ProgressHeader` | Shows "Your first 90 days plan" headline + progress bar | `/plan` |
| `InfoCard` | Reusable content card for guides across all hub pages | All hub pages |
| `CitySummaryCard` | City overview: cost-of-living level, housing zones, transport basics | `/city/[slug]` |
| `AppRecommendationCard` | Recommended apps: icon, name, purpose, category (mock data) | `/resources/apps` |
| `Layout` | Shared top nav (desktop) + sticky bottom bar (mobile) + footer | Global |

### 4.4 Design System

| Element | Specification |
|---------|---------------|
| **Primary Color** | Rich teal or blue-green ("trust + freshness"). Used for headers, CTAs, links. |
| **Accent Color** | Warm coral or soft orange ("energy, call-to-action"). Used for secondary CTAs, badges. |
| **Neutrals** | Off-white backgrounds (#F9FAFB), light gray surfaces (#F3F4F6), dark gray text (#374151). |
| **Visual Style** | Rounded cards, subtle drop shadows, generous white space. "Vibrant, optimistic, new beginning abroad" vibe. |
| **Design References** | Nestpick (housing), Spotahome (rentals), Monzo/Starling (banking), fintech + relocation hybrid. |
| **Typography** | Modern sans-serif (Inter or similar). Clear title/subtitle/body hierarchy for readability. |
| **Desktop Nav** | Top bar: Logo "NewStartAbroad" + links: Home, How it Works, Features, Resources, About, Get Started. |
| **Mobile Nav** | Sticky bottom bar with key sections: Home, Plan, Housing, Banking, More. |
| **Footer** | Links: FAQ, Privacy, Terms, Contact. |
| **Mobile-First** | All layouts stack on mobile. Filters become accordions or horizontal scrolls. |
| **Accessibility** | Good color contrast. Clear button labels. No tiny clickable elements. |

### 4.5 Data Architecture — Phase 1: Mock Only

All data in Phase 1 is static TypeScript arrays. The specification explicitly requires:

- **No database, Supabase, or external APIs** connected in Phase 1
- **No real authentication logic** — only UI forms and mock validation states
- **State stored in React Context or component state only** (persona, city, task completion)
- **Configuration-driven content** so new cities can be added without code changes
- **Clear interfaces/types and TODO comments** where real APIs (maps, weather, currency, jobs) should be plugged in later

**Data file structure** (TypeScript arrays in `src/data/`):

```
src/data/
  tasks.ts        ← Settlement tasks organized by phase and persona
  cities.ts       ← City-specific data (London, Manchester, etc.)
  housing.ts      ← Housing types, platforms, tips per persona
  banking.ts      ← Digital/traditional bank comparisons
  sim.ts          ← Carrier comparisons, setup checklist
  groceries.ts    ← Supermarkets, Indian stores, delivery apps
  health.ts       ← NHS info, GP registration steps, emergency numbers
  apps.ts         ← Recommended apps by category (transport, banking, food)
  visaTypes.ts    ← Student, Skilled Worker, Graduate, Dependant
```

---

## 5. Student Build Guide: 5-Person Team

### 5.1 Team Role Assignments

| # | Role | Owns | Routes | Key Components |
|---|------|------|--------|----------------|
| 1 | **Product Lead / PM** | Requirements, prompt strategy, QA, sprint scope, content accuracy review | All (review) | None (reviews all) |
| 2 | **Frontend & Landing** | Landing page, Layout component, onboarding flow, design system enforcement | `/`, `/onboarding/*` | Layout, PersonaCard |
| 3 | **Plan & Checklist** | 90-day dashboard, task system, progress tracking, profile page | `/plan`, `/profile` | TaskCard, TaskSection, ProgressHeader |
| 4 | **Hub Pages (Content)** | Housing, Banking, SIM, Groceries, Health hubs + all static data files | `/housing`, `/banking`, `/sim`, `/groceries`, `/health` | InfoCard, AppRecommendationCard |
| 5 | **City & Auth & Deploy** | City detail pages, auth UI, resources page, deployment, GitHub sync | `/city/*`, `/auth/*`, `/resources/*` | CitySummaryCard |

### 5.2 Content Ownership Matrix

| Content Area | Primary Owner | Reviewer |
|--------------|---------------|----------|
| Task data (90-day plan) | Student 3 | Student 1 (PM) |
| Housing content | Student 4 | Student 1 |
| Banking content | Student 4 | Student 1 |
| SIM & Connectivity content | Student 4 | Student 1 |
| Groceries content | Student 4 | Student 1 |
| Health content | Student 4 | Student 1 |
| City-specific data | Student 5 | Student 1 |
| App recommendations | Student 5 | Student 1 |
| UI copy, labels, error messages | Student 2 | Student 1 |
| README & documentation | Student 1 | All |

### 5.3 Sprint Plan (4 Weeks)

#### Sprint 1: Foundation (Days 1–7)

**Goal:** Project scaffolding, design system, landing page, onboarding flow deployed.

| Student | Deliverables |
|---------|-------------|
| 1 (PM) | Sprint scope, prompt strategy, GitHub repo setup, task tracking |
| 2 (Frontend) | Landing page (hero, how-it-works, 5-pillar grid, persona cards, footer CTA), global Layout component, design system enforcement |
| 3 (Plan) | Persona selection page (2 PersonaCards, context storage), intake form page (all fields, navigation to /plan) |
| 4 (Content) | Begin research: Housing and Banking data files, source documentation |
| 5 (City/Deploy) | React Router skeleton for ALL 14 routes with placeholder pages, GitHub sync from Lovable, initial deployment |

**Deliverable:** Deployed landing page with working onboarding flow (persona → intake → plan placeholder). All 14 routes navigable.

**Checkpoint:** *Can a user go from landing page through persona selection and intake form to the plan page (even if empty)?*

#### Sprint 2: Core Dashboard + Hub Skeletons (Days 8–14)

**Goal:** Fully functional 90-day plan dashboard with interactive checklist. All hub pages navigable with hero sections.

| Student | Deliverables |
|---------|-------------|
| 1 (PM) | Content accuracy review of task data, sprint retrospective, blocker resolution |
| 2 (Frontend) | Design system polish, responsive fixes for Sprint 1 pages, support Sprint 3 components |
| 3 (Plan) | Plan dashboard: ProgressHeader, 4-tab layout (Before You Fly / First Week / First Month / First Three Months), TaskCards with toggle interaction, progress recalculation |
| 4 (Content) | Create ALL static data files (tasks.ts, housing.ts, banking.ts, sim.ts, groceries.ts, health.ts, apps.ts, cities.ts). Hub page hero sections and basic InfoCard layouts for all 5 hubs |
| 5 (City/Deploy) | Auth UI pages (login/signup with mock validation), profile page skeleton, continuous deployment |

**Deliverable:** Interactive plan dashboard with 20+ tasks across 4 timeframes. All hub pages have hero sections and navigation.

**Checkpoint:** *Can a user toggle tasks complete and see progress update? Do all 5 hub pages load without errors?*

#### Sprint 3: Full Content + Remaining Pages (Days 15–21)

**Goal:** All 14 routes fully populated with persona-specific content.

| Student | Deliverables |
|---------|-------------|
| 1 (PM) | Cross-reference ALL UK content against GOV.UK, NHS.uk, official bank sites. Content accuracy sign-off |
| 2 (Frontend) | Responsive polish across all pages, mobile nav verification, design consistency audit |
| 3 (Plan) | Profile page (persona, city, arrival date, plan summary, notification toggles, "Edit my UK plan" button). Task data refinements based on PM review |
| 4 (Content) | **Complete all 5 hub pages**: Housing (student/professional tabs, types, scams, platforms), Banking (digital vs traditional, account opening steps, budgeting), SIM (carriers, checklist), Groceries (supermarkets, Indian stores, delivery apps, week-1 list), Health (NHS, GP registration, emergency numbers, persona sections) |
| 5 (City/Deploy) | City detail page (`/city/london` minimum, Manchester stretch), Resources/apps page (AppRecommendationCards grouped by category), auth flow polish |

**Deliverable:** All 14 routes fully populated with content. Persona-specific sections present on all hub pages.

**Checkpoint:** *Can you walk the full persona flow — Landing → Persona → Intake → Plan → each Hub → City → Profile — without hitting empty states?*

#### Sprint 4: Polish, Test & Deploy (Days 22–28)

**Goal:** Production-ready deployed application with documentation.

All students collaborate on:

- **Mobile-first verification:** Test all pages at 375px, 768px, 1280px+. Ensure filters become accordions, cards stack, bottom nav works.
- **Cross-browser testing:** Chrome, Safari, Firefox, Edge. Fix any Tailwind rendering inconsistencies.
- **Persona flow end-to-end:** Walk through: Landing → Persona → Intake → Plan → Hub pages → City detail → Profile. Verify context persists across navigation.
- **Content accuracy review:** Cross-reference all UK information against GOV.UK, NHS.uk, and official bank websites. Add "Last updated" dates.
- **Error states:** Loading indicators, empty states, 404 page, form validation feedback.
- **SEO & metadata:** Page titles, descriptions, Open Graph tags for social sharing.
- **Deploy:** Publish via Lovable to .lovable.app. Test production build.
- **Documentation:** README with architecture overview, setup instructions, team contributions, and Phase 2 roadmap.

**Deliverable:** Production-ready deployed application with README documentation.

**Checkpoint:** *Does the deployed URL work on mobile and desktop? Is the README complete?*

---

## 6. Content Standards

### 6.1 Approved Sources

| Content Type | Approved Sources | NOT Approved |
|--------------|------------------|--------------|
| Visa/immigration | GOV.UK only | Forums, blogs, agents |
| NHS/Healthcare | NHS.UK only | Private health sites |
| Banking | Official bank websites (Monzo, Starling, Barclays, HSBC) | Comparison sites, forums |
| Housing | Shelter UK, GOV.UK (deposit protection), official platform sites | Reddit, unverified blogs |
| Transport | TfL.gov.uk, official carrier sites | Third-party travel blogs |
| Costs/Prices | Official sources, Numbeo | Reddit, outdated blogs |

### 6.2 Writing Style

- **Friendly and reassuring**, not formal or bureaucratic
- **Direct and actionable** — every section answers "What do I DO?"
- **Plain English** — under 20 words per sentence average
- **Persona-aware** — flag where Student vs Professional content differs
- Add **"Last updated: [month/year]"** on all factual content
- Add **disclaimers**: "Verify with official GOV.UK sources" on visa/legal content

### 6.3 Content Quality Checklist

Before any content is marked complete:

- [ ] Verified against approved official sources
- [ ] Sources documented (URL + date accessed)
- [ ] Plain English, short sentences
- [ ] Actionable — tells user what to DO
- [ ] Persona-specific sections present where relevant
- [ ] "Last updated" date included

---

## 7. Success Criteria and Evaluation

| Criterion | Minimum Standard | Weight |
|-----------|-----------------|--------|
| **Route Completeness** | All 14 routes load without errors. Navigation works across all pages. 404 page handles unknown routes. | 20% |
| **Persona Flow** | End-to-end: Landing → Persona → Intake → Plan works. Context persists. TaskCard toggles update progress. | 20% |
| **Content Quality** | All 5 hub pages populated with accurate India→UK content. At least 20 tasks in plan across 4 timeframes. | 15% |
| **Responsive Design** | Fully functional at 375px (mobile), 768px (tablet), 1280px+ (desktop). Bottom nav on mobile, top nav on desktop. | 15% |
| **Design Fidelity** | Teal/coral palette. Rounded cards with shadows. Consistent spacing. Matches fintech/relocation hybrid aesthetic. | 10% |
| **Component Reuse** | Named components (PersonaCard, TaskCard, InfoCard, etc.) are actually reused across pages, not duplicated. | 10% |
| **Code Quality** | Clean file structure, TypeScript types, no console errors, data separated from presentation. | 5% |
| **Documentation** | README with architecture diagram, team contributions, data sources, and Phase 2 roadmap. | 5% |

---

## 8. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Lovable generates backend code** | Prompt 3 explicitly says UI-only, but Lovable may still try to add Supabase. This creates complexity and bugs. | If backend code appears, immediately prompt: "Remove all Supabase/database logic. Keep only UI components and static data." |
| **Lovable message limits** | Free/starter tier limits may slow development. | Plan prompts carefully. Use "Try to Fix" for errors (free). Batch related changes. Assign one team member as primary prompter. |
| **Content accuracy** | Outdated UK immigration/banking info could mislead users. | Cross-reference GOV.UK, NHS.uk, and official bank sites. Add disclaimers and "Last updated" dates on all content. |
| **Persona context loss** | React context resets on page refresh since there's no persistence. | Accept this limitation in Phase 1. Add localStorage fallback if time permits. Full persistence comes with Supabase in Phase 2. |
| **Scope creep to Phase 2** | Team wants to add real APIs, auth, database before UI is complete. | PM enforces: "Phase 1 is UI-only. No exceptions. Ship the UI, then add backend." |
| **Parallel Lovable conflicts** | Multiple people prompting the same Lovable project. | Use GitHub sync. Assign clear page ownership. One person prompts at a time, others review in GitHub. |
| **Indian-grocery content gap** | Hard to find accurate Indian/Asian store data for UK cities. | Use general guidance ("search for Indian grocery near [area]") rather than specific store names that may close. |

### Scope Creep Prevention

If any student suggests adding real APIs, Supabase, authentication logic, payment integration, or external services during Phase 1, the response is always: *"Phase 1 is UI-only. Add it to the Phase 2 doc. Ship what we have."*

If any student asks about features from the original 25-feature brainstorm (visa conversion, embassy info, driving license, etc.), the response is: *"That was in the original 25-feature brainstorm. We scoped to 5 pillars for Phase 1. It's on the roadmap for future phases."*

---

## 9. Phase Model Overview

NewStartAbroad has three defined phases. Each phase builds on the previous one.

### Phase 1 — UI-Only MVP (Current: 4-Week Sprint)

The active build phase. All data is static. No backend. Ship the user experience and content. This is the focus of the 4-week sprint plan detailed in Section 5.3.

### Phase 2 — Full-Stack Platform (Post-Submission)

Supabase backend, N8N automation, AI chat integration, Google Sheets CMS. The Phase 2 architecture includes a 15-table PostgreSQL schema with Row Level Security, 6 N8N workflows for content sync, forex updates, and deadline reminders, and 3 AI prompt templates with retrieval-only guardrails. Full technical detail is provided in the companion document: **NewStartAbroad_TechnicalArchitecture**.

Phase 2 priorities (if the team had 2 additional weeks):

1. Supabase auth + user_tasks persistence (3–4 days)
2. Google Sheets → N8N → Supabase content sync (2–3 days)
3. Forex rate display in Banking hub (1 day)
4. AI Q&A chat panel, retrieval-only (3–4 days)

### Phase 3 — Hybrid Enhancements (Independent Work)

Interactive tools embedded into the hub architecture, combining Relocator's interactive depth with NewStartAbroad's content breadth. Six enhancements are specified: First Week Deep Guide, Budget Calculator, Airport Route Planner, AI Visa Checklist, Housing Scam Detector, and Deadline Notifications. Total estimated effort: 19–26 additional working days. Full specifications are in the companion document: **NewStartAbroad_TechnicalArchitecture**, Section 7.

### Cross-Project Patterns: Relocator → NewStartAbroad

The Relocator project (a companion student project for Indian Master's students relocating to London) provides battle-tested patterns directly transferable to NewStartAbroad:

| Relocator Pattern | NewStartAbroad Application |
|-------------------|---------------------------|
| Google Sheets → N8N → Supabase content sync | Identical — Student 4 edits Sheets, content syncs to guide tables |
| Retrieval-only AI guardrails | Identical — AI never generates visa/legal/health content |
| N8N Forex Rate Updater (daily cron) | Identical — GBP/INR rate for Banking hub budget context |
| 12-table SQL schema with RLS | Extended to 15 tables; same RLS pattern on user-data tables |
| First Week Setup Checklist (demo centerpiece) | Phase 3 Enhancement #1 — day-by-day deep guide for First Week tab |
| Scam Detector (listing risk analysis) | Phase 3 Enhancement #5 — embedded in Housing hub |
| Airport Router (route comparison) | Phase 3 Enhancement #3 — linked from city pages |
| AI Visa Checklist (document filtering) | Phase 3 Enhancement #4 — new /visa route as 6th pillar |
| Backup demo strategy (Yellow/Orange/Red) | Not needed in Phase 1 (static data = no backend failure risk) |

**Key Architectural Insight:** Relocator was backend-first and struggled with content bottlenecks — Student D had 60+ hours of content work that nearly sank the project. NewStartAbroad's UI-first approach forces content to be the first deliverable, with backend as an upgrade layer. This is the better sequence for a content-heavy application. However, Relocator's automation and AI patterns are more mature and directly plug into Phase 2.

---

## 10. Monetization Strategy

| Model | How It Works | Implementation Phase |
|-------|-------------|---------------------|
| **Affiliate Referrals** | Earn commission when users sign up for banking (Monzo/Revolut referral programs), housing platforms (Spotahome/Nestpick), or SIM providers via tracked links. | Phase 2: Replace mock links with affiliate URLs |
| **Sponsored Listings** | UK service providers (landlords, banks, insurance) pay to be featured or highlighted in relevant hub pages. | Phase 3: Add "Featured" badge system |
| **Premium Content** | Free basic guides; paid premium features like personalized checklist, AI chat assistant, document vault. | Phase 3: Gated content + Stripe |
| **B2B / University Partnerships** | License the platform to UK universities for their international student onboarding programs. | Phase 4: White-label offering |
| **Advertising** | Display ads on high-traffic pages (landing, city guides). Low priority due to UX impact. | Phase 4+ (last resort) |
| **Community Membership** | Paid community access for peer support, local meetups, mentor matching. | Phase 3+: Requires backend |

---

## 11. Conclusion

NewStartAbroad demonstrates a disciplined approach to AI-assisted product development. The team's 3-prompt evolution — broad brainstorm, comprehensive specification, then ruthless scoping to a UI-only MVP — is a replicable pattern for any student team building on Lovable.

The key insights from this analysis are:

**Narrow your corridor.** India→UK is more shippable than "any country to any country." Serve one audience exceptionally before expanding.

**UI first, backend second.** The explicit constraint of no database in Phase 1 eliminates an entire class of bugs and lets the team focus on user experience and content quality.

**Persona-driven content.** Student vs. Professional is a simple branching logic that makes the app feel personalized without complex algorithms.

**Name everything.** Named components, named routes, named design references. Specificity in prompts produces specificity in output.

**Ship, then improve.** 25 features were brainstormed. 5 were built. The rest are a roadmap, not a requirement.

For the student team: follow the sprint plan, replicate Prompt 3's structure, enforce Phase 1 constraints, and deploy something real within 4 weeks. The barrier to building functional web applications has collapsed. What matters now is clarity of purpose and discipline of scope.

---

*"Start narrow, ship, then expand."*
