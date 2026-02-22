# NewStartAbroad — Claude Code Build Guide

## Project Overview

NewStartAbroad is a React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui web app that helps Indian students and professionals manage their first 90 days relocating to the UK. Built on Lovable.dev, currently UI-only with mock data (no backend).

**Repo:** `C:\Users\brown\OneDrive\Documents\GitHub\medical-writing-skills\newstartabroad`
**Branch:** `roberts-version` (branched from `main` on 2026-02-22)
**Docs:** `docs/Claude White Paper and prompts/` — 5 reference documents (whitepaper, prompt library, content templates, sprint checklists, technical architecture)

## Current Status

### What's Complete (DO NOT MODIFY)
- `src/App.tsx` — All routing final (18+ routes)
- `src/context/AppContext.tsx` — State management final
- `src/pages/GlobalHome.tsx` — Global landing page
- `src/pages/Index.tsx` — UK microsite landing page
- `src/pages/onboarding/PersonaSelection.tsx` — Persona selection
- `src/pages/onboarding/IntakeForm.tsx` — Intake form
- `src/pages/ComingSoon.tsx` — Placeholder for CA/DE/AU
- `src/pages/NotFound.tsx` — 404 page
- `src/pages/auth/Login.tsx` — Mock login UI
- `src/pages/auth/Signup.tsx` — Mock signup UI
- `src/components/layout/` — GlobalLayout + Layout (desktop top nav, mobile bottom bar)
- `src/components/ui/` — Full shadcn/ui library (59 components)
- `src/data/countries.ts` — Country data final
- All reusable components: InfoCard, HubHero, TaskCard, TaskSection, ProgressHeader, PersonaCard, CountryCard, CitySummaryCard, AppRecommendationCard, Breadcrumbs, NavLink

### What Needs Building (5-Session Build Plan)

**Session 1: Data Layer** ✅ COMPLETE (2026-02-22)
- [x] Expanded `src/data/mockData.ts`:
  - Tasks: 15 → 48 (added `admin` + `lifestyle` categories, persona-specific tasks across all 4 timeframes)
  - Cities: 5 → 10 (added Leeds, Bristol, Nottingham, Liverpool, Coventry)
  - Added `simCarriers` array: 6 carriers (Giffgaff, Three, Voxi, Lebara, EE, Vodafone) with pricing, data, India calling rates
  - Added `housingTypes` array: 5 types (uni halls, PBSA, shared house, studio, mid-term rental) with pros/cons/costs/platforms
  - Added `healthGuides` array: 8 guides (NHS overview, GP registration, emergencies, uni health, mental health, dentist, pharmacy, IHS/insurance)
  - Added `groceryStores` array: 13 stores (6 supermarkets, 3 Indian/Asian, 2 discount, 2 delivery apps)
  - Added `weekOneShoppingList` array: 6 categories (pantry, spices, fresh produce, proteins, household, personal care)
  - Expanded `apps` array: 14 → 28 (added Safety, Work, Community, Entertainment, Travel categories)
  - Added `admin` + `lifestyle` to `categoryColors` and `categoryIcons`
  - Added 6 new interfaces: `SimCarrier`, `HousingType`, `HealthGuide`, `GroceryStore`, `ShoppingListItem`
  - Build verified: `npm run build` passes with 0 errors

**Session 2: Housing + Banking Pages** ✅ COMPLETE (2026-02-22)
- [x] Rebuilt `src/pages/Housing.tsx`:
  - Persona tabs (Student/Professional) defaulting to AppContext persona
  - Detailed housing type cards with pros/cons lists (CheckCircle/XCircle icons) and cost range badges
  - Scam avoidance alert section (6 warnings in amber Alert component)
  - Documents needed section (6 student docs vs 7 professional docs, per-persona via tabs)
  - Recommended platforms per housing type as pill badges
  - "Last updated: February 2026" footer
- [x] Rebuilt `src/pages/Banking.tsx`:
  - Feature comparison matrix table for 3 digital banks (Monzo, Starling, Revolut) across 8 features
  - Traditional banks section (Barclays, HSBC) with feature lists
  - "Sending Money from India" section with 4 options (Wise, Revolut, SWIFT, Remitly) with highlight badges
  - Persona tabs (Student/Professional) with persona-specific tips (4 student, 5 professional InfoCards)
  - Step-by-step account opening guides per persona in Alert components
  - "Last updated: February 2026" footer
  - Build verified: `npm run build` passes with 0 errors

**Session 3: SIM + Groceries Pages** ✅ COMPLETE (2026-02-22)
- [x] Rebuilt `src/pages/Sim.tsx`:
  - Prepaid vs Contract side-by-side comparison with pros lists
  - 6-carrier comparison tables (prepaid and contract separated) with cost, data, India calling, persona badges
  - Carrier detail cards with newcomer notes
  - 7-step SIM setup checklist
  - "Calling India" section with 4 InfoCards (WhatsApp, carrier mins, add-ons, Wi-Fi calling)
  - Persona tabs (Student/Professional) with 4 tips each and step-by-step Alert guides
  - "Last updated: February 2026" footer
  - Build verified: `npm run build` passes with 0 errors
- [x] Rebuilt `src/pages/Groceries.tsx`:
  - UK supermarket grid (8 stores) with price level badges (budget/mid/premium) and delivery/Indian product badges
  - Indian & Asian grocery stores section (3 stores from data) with city-specific tips for 6 cities
  - Week-1 shopping list from weekOneShoppingList data (6 categories with checklist items)
  - Food delivery apps grid (2 apps from data)
  - Budget tips section (6 InfoCards)
  - Indian store vs supermarket price comparison Alert
  - "Last updated: February 2026" footer
  - Build verified: `npm run build` passes with 0 errors

**Session 4: Health + City Detail Pages** ✅ COMPLETE (2026-02-22)
- [x] Rebuilt `src/pages/HealthSafety.tsx`:
  - Emergency numbers alert banner (999/111/112) with red Alert styling and large number cards
  - NHS overview with IHS surcharge explanation (two-column cards with external links)
  - GP registration step-by-step guide (6 numbered steps from healthGuides data)
  - Persona tabs (Student: university health centre, counselling, sexual health, vaccinations + quick-start checklist; Professional: occupational health, EAP, private insurance, flexible GP + quick-start checklist)
  - Mental health resources section (5 support options from data, amber encouragement alert)
  - Pharmacies & prescriptions section (4 tips, England/Scotland/Wales/NI cost comparison cards, prepayment certificate info)
  - Dental care section (4 numbered steps, Band 1/2/3 cost cards with badges, NHS dentist finder link)
  - Disclaimer footer in muted Alert
  - "Last updated: February 2026" footer
  - Build verified: `npm run build` passes with 0 errors
- [x] Enhanced `src/pages/CityDetail.tsx`:
  - Cost breakdown section with avgRentStudent, avgRentProfessional, transportMonthlyCost in three cards
  - Indian community areas section with Badge pill components per city
  - Added city data: avgRentStudent, avgRentProfessional, transportMonthlyCost, indianCommunityAreas for all 10 cities in mockData.ts
  - Kept existing neighbourhood overview, living essentials links, and coming-soon community section
  - Build verified: `npm run build` passes with 0 errors

**Session 5: Resources + Profile + Plan + QA** ✅ COMPLETE (2026-02-22)
- [x] Updated `src/pages/ResourcesApps.tsx`:
  - Expanded categories array from 7 to 12: added Safety, Work, Community, Entertainment, Travel (matching all 28 apps in mockData)
  - Added "Last updated: February 2026" footer
- [x] Enhanced `src/pages/Profile.tsx`:
  - Added plan progress card with teal background, TrendingUp icon, Progress bar (coral fill), percentage, and "X of Y tasks completed" count
  - Card links to `/uk/plan` for quick navigation
  - Progress calculation filters tasks by persona (matches Plan.tsx logic)
  - Reuses existing Progress component with same styling as Plan.tsx ProgressHeader
- [x] Verified `src/pages/Plan.tsx`:
  - Handles all 49 tasks correctly (dynamic filtering by persona and timeframe)
  - `admin` and `lifestyle` categories display with correct colors/icons from categoryColors/categoryIcons
  - No code changes needed — architecture already supports new categories
- [x] Build verified: `npm run build` passes with 0 errors

### Intentionally Left as "Coming Soon" (Phase 1 scope = 5 pillars only)
- `src/pages/WorkStudyFamily.tsx` — DO NOT BUILD OUT
- `src/pages/MobilityLogistics.tsx` — DO NOT BUILD OUT
- `src/pages/CommunityLifestyle.tsx` — DO NOT BUILD OUT

## Hard Constraints (Every Session)

1. **UI ONLY** — No Supabase, no database, no external APIs
2. **All data** in `src/data/mockData.ts` (static TypeScript arrays)
3. **State** via React Context only (in-memory, lost on refresh)
4. **Reuse existing components** — do NOT create new card components
5. **Design system** — teal primary, coral accent, off-white backgrounds, rounded-2xl cards
6. **Persona tabs** on every hub page, defaulting to AppContext persona
7. **"Last updated: February 2026"** at the bottom of every hub page
8. **Disclaimers** on health and visa/legal content

## How to Start Each Session

Paste this into each new Claude Code conversation:

> Read the repo at `C:\Users\brown\OneDrive\Documents\GitHub\medical-writing-skills\newstartabroad`.
> Read CLAUDE.md for build status. Read `src/data/mockData.ts` and the specific page files
> for the session you're executing. Then implement the changes for Session [N].

## Architecture Reference

```
src/
├── App.tsx                    # Routes (FINAL)
├── context/AppContext.tsx      # State (FINAL)
├── data/
│   ├── countries.ts           # Country list (FINAL)
│   └── mockData.ts            # ALL content data (48 tasks, 10 cities w/ rent+transport+Indian areas, 6 SIM, 5 housing, 8 health, 13 grocery, 28 apps, shopping list)
├── pages/
│   ├── GlobalHome.tsx         # DONE
│   ├── Index.tsx              # DONE
│   ├── Plan.tsx               # DONE (verify with new tasks)
│   ├── LivingEssentials.tsx   # DONE (hub nav page)
│   ├── Housing.tsx            # DONE (Session 2)
│   ├── Banking.tsx            # DONE (Session 2)
│   ├── Sim.tsx                # DONE (Session 3)
│   ├── Groceries.tsx          # DONE (Session 3)
│   ├── HealthSafety.tsx       # DONE (Session 4)
│   ├── CityDetail.tsx         # DONE (Session 4)
│   ├── ResourcesApps.tsx      # SESSION 5
│   ├── Profile.tsx            # SESSION 5
│   ├── onboarding/            # DONE
│   ├── auth/                  # DONE
│   ├── WorkStudyFamily.tsx    # COMING SOON (leave as-is)
│   ├── MobilityLogistics.tsx  # COMING SOON (leave as-is)
│   ├── CommunityLifestyle.tsx # COMING SOON (leave as-is)
│   ├── ComingSoon.tsx         # DONE
│   └── NotFound.tsx           # DONE
├── components/
│   ├── layout/                # DONE
│   ├── ui/                    # DONE (shadcn)
│   └── [reusable components]  # DONE
└── hooks/                     # DONE
```

## Key Docs Reference

| Document | Purpose |
|----------|---------|
| `NewStartAbroad_WhitePaper_v3.md` | Product vision, 3-prompt strategy, team guide, phase model |
| `NewStartAbroad_PromptLibrary.md` | Lovable.dev prompts by sprint, 6 prompt rules, recovery prompts |
| `NewStartAbroad_ContentTemplates.md` | TypeScript interfaces, data file templates, content standards |
| `NewStartAbroad_SprintChecklists.md` | Per-sprint QA checklists, demo scripts, test matrices |
| `NewStartAbroad_TechnicalArchitecture.md` | Phase 2 database schema, N8N workflows, AI integration |
