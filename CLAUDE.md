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

**Session 1: Data Layer** (DO FIRST — everything depends on this)
- [ ] Expand `src/data/mockData.ts`:
  - Tasks: 15 → 40+ (add admin category, more persona-specific tasks)
  - Cities: 5 basic → 10 with avgRentStudent, avgRentProfessional, transportMonthlyCost, indianCommunityAreas
  - Add `simCarriers` array: 6 UK carriers with pricing, data, India calling rates
  - Add `housingTypes` array: 5 types with pros/cons/costs per persona
  - Add `healthGuides` array: 8 guides (emergency, NHS, GP registration, mental health, pharmacy, dental)
  - Add `groceryStores` array: 13 stores (supermarkets, Indian/Asian, delivery apps)
  - Add `weekOneShoppingList` array: grouped by category (essentials, spices, fresh, household)
  - Expand `apps` array: 14 → 25+ (add Admin and Safety categories)
  - Add `admin` to `categoryColors` and `categoryIcons`

**Session 2: Housing + Banking Pages**
- [ ] Rebuild `src/pages/Housing.tsx`:
  - Persona tabs (Student/Professional) defaulting to AppContext persona
  - Detailed housing type cards with pros/cons lists and cost ranges
  - Scam avoidance alert section
  - Documents needed section (different per persona)
  - Recommended platforms per persona
  - "Last updated: February 2026" footer
- [ ] Rebuild `src/pages/Banking.tsx`:
  - Persona tabs (Student/Professional)
  - Feature comparison matrix for digital banks
  - "Sending Money from India" section (Wise, Revolut, bank transfer)
  - Persona-specific section (student accounts vs salary/NI/council tax)
  - "Last updated: February 2026" footer

**Session 3: SIM + Groceries Pages**
- [ ] Rebuild `src/pages/Sim.tsx`:
  - Prepaid vs Contract side-by-side comparison
  - 6-carrier comparison table/cards from simCarriers data
  - SIM setup checklist
  - "Calling India" section
  - "Last updated: February 2026" footer
- [ ] Rebuild `src/pages/Groceries.tsx`:
  - UK supermarket grid with price level badges
  - Indian & Asian grocery stores section with city-specific tips
  - Week-1 shopping list from weekOneShoppingList data
  - Food delivery apps grid
  - Budget tips section
  - "Last updated: February 2026" footer

**Session 4: Health + City Detail Pages**
- [ ] Rebuild `src/pages/HealthSafety.tsx`:
  - Emergency numbers alert banner (999/111/112)
  - NHS overview with IHS surcharge explanation
  - GP registration step-by-step guide
  - Persona tabs (student health services vs occupational health)
  - Mental health resources section
  - Pharmacies & prescriptions section
  - Dental care section
  - Disclaimer footer
- [ ] Enhance `src/pages/CityDetail.tsx`:
  - Show avgRentStudent, avgRentProfessional, transportMonthlyCost
  - Indian community areas section with pill badges
  - Keep existing neighbourhood and essentials sections

**Session 5: Resources + Profile + Plan + QA**
- [ ] Update `src/pages/ResourcesApps.tsx`: Add "Admin" and "Safety" to categories
- [ ] Enhance `src/pages/Profile.tsx`: Add plan progress card with progress bar
- [ ] Verify `src/pages/Plan.tsx`: Handles 40+ tasks, new admin category works
- [ ] Test all pages render without errors at 375px, 768px, 1280px+

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
│   └── mockData.ts            # ALL content data (EXPAND IN SESSION 1)
├── pages/
│   ├── GlobalHome.tsx         # DONE
│   ├── Index.tsx              # DONE
│   ├── Plan.tsx               # DONE (verify with new tasks)
│   ├── LivingEssentials.tsx   # DONE (hub nav page)
│   ├── Housing.tsx            # SESSION 2
│   ├── Banking.tsx            # SESSION 2
│   ├── Sim.tsx                # SESSION 3
│   ├── Groceries.tsx          # SESSION 3
│   ├── HealthSafety.tsx       # SESSION 4
│   ├── CityDetail.tsx         # SESSION 4
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
