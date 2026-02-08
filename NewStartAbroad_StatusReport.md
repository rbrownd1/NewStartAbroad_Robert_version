# NewStartAbroad — Codebase Status Report

## Deep Code Review & Sprint Progress Assessment

**Date**: 8 February 2026  
**Reviewer**: Technical Advisor  
**Repo**: `newstartabroad` (Lovable-generated, GitHub-synced)  
**Live prototype**: https://newstartabroad.lovable.app

---

## 1. Executive Summary

The codebase represents a **solid Sprint 1–2 delivery** from the Lovable UI generation phase. All 14 specified routes exist, the core component architecture matches the spec, the design system is well-implemented, and the persona-driven onboarding flow works end-to-end. However, the project is at an **early Sprint 2 / late Sprint 1 stage** — hub pages have content but lack persona-specific depth, the data layer is consolidated into a single file rather than the specified split structure, and the task dataset is thin (15 tasks vs. the 20+ minimum). The foundation is strong; the content and polish work remains.

**Overall Grade: ~55–60% of Phase 1 complete.** Sprint 1 deliverables are met. Sprint 2 is partially done. Sprints 3–4 work remains.

---

## 2. Route Completeness Audit (Spec: 14+ routes)

| Route | Spec | In Code | Status | Notes |
|-------|------|---------|--------|-------|
| `/` | Landing Page | ✅ `Index.tsx` | **Complete** | Hero, how-it-works, 5-pillar grid, persona section, social proof, footer CTA — all present. Scroll animations add polish. |
| `/onboarding/persona` | Persona Selection | ✅ `PersonaSelection.tsx` | **Complete** | Two PersonaCards with highlight state, context storage, Continue button. |
| `/onboarding/intake` | Intake Form | ✅ `IntakeForm.tsx` | **Complete** | All fields present: origin city, destination, visa type, arrival month/year, accommodation toggle, budget band. Toast + navigate on submit. |
| `/plan` | 90-Day Plan Dashboard | ✅ `Plan.tsx` | **Functional** | ProgressHeader, 4 tabs, TaskCards with toggle. Persona filtering works. Progress recalculates. |
| `/housing` | Housing Hub | ✅ `Housing.tsx` | **Partial** | Housing types, tips, platform tags present. **Missing**: persona-specific tabs (Student vs. Professional), scam detail, document checklist. |
| `/banking` | Banking Hub | ✅ `Banking.tsx` | **Good** | Digital/traditional split, account opening steps, budgeting tips. **Missing**: persona-specific tabs, international transfer info for professionals. |
| `/sim` | SIM & Connectivity | ✅ `Sim.tsx` | **Partial** | Options and checklist present. **Missing**: carrier comparison table, India calling rates, persona variants. |
| `/groceries` | Groceries Hub | ✅ `Groceries.tsx` | **Good** | Supermarkets, Indian stores, delivery apps, tips. **Missing**: week-1 shopping list, delivery comparison. |
| `/health` | Health & NHS Hub | ✅ `Health.tsx` | **Complete** | NHS basics, GP registration, emergency numbers, persona-specific Student/Professional sections. Best hub page. |
| `/city/:slug` | City Detail | ✅ `CityDetail.tsx` | **Functional** | Dynamic routing works. Cost, transport, neighbourhoods, pillar links. 5 cities in data. |
| `/resources/apps` | Essential Apps | ✅ `ResourcesApps.tsx` | **Complete** | 14 apps grouped by category. Uses AppRecommendationCard correctly. |
| `/auth/login` | Login UI | ✅ `Login.tsx` | **Complete** | Mock validation, no real auth. Links to signup. |
| `/auth/signup` | Signup UI | ✅ `Signup.tsx` | **Complete** | All fields, persona + city selects, mock validation. |
| `/profile` | Profile Page | ✅ `Profile.tsx` | **Complete** | Persona, city, arrival, task count, notification toggles, edit plan link. |
| `*` (404) | NotFound | ✅ `NotFound.tsx` | **Functional** | Basic 404. Missing: Layout wrapper (no nav on this page). |

**Score: 14/14 routes exist. ~10/14 are content-complete.**

---

## 3. Named Component Audit (Spec: 8 required)

| Component | Spec | In Code | Reused Correctly | Notes |
|-----------|------|---------|------------------|-------|
| `PersonaCard` | ✅ | ✅ | ✅ | Used on `/onboarding/persona`. Clean interface, highlight state, responsive. |
| `TaskCard` | ✅ | ✅ | ✅ | Used in `TaskSection` → `Plan`. Toggle, category tag, completion state. |
| `TaskSection` | ✅ | ✅ | ✅ | Groups tasks with completion counter. |
| `ProgressHeader` | ✅ | ✅ | ✅ | Dynamic progress bar with coral fill. Persona + city subtitle. |
| `InfoCard` | ✅ | ✅ | ✅ | Used across all 5 hub pages. Supports icon or emoji variant. |
| `CitySummaryCard` | ✅ | ✅ | ⚠️ **Not used** | Component exists but is **not rendered anywhere**. CityDetail page builds its own inline cards. Landing page doesn't link to city pages. |
| `AppRecommendationCard` | ✅ | ✅ | ✅ | Used on `/resources/apps` and `/groceries`. |
| `Layout` | ✅ | ✅ | ✅ | Global wrapper. Desktop top nav, mobile bottom nav, footer. Consistent across all pages (except NotFound). |

**Bonus components** (not in spec but well-built):
- `HubHero` — reusable hero banner for all hub pages. Good pattern.
- `NavLink` — router-aware nav link wrapper. Present but unused.
- `ScrollReveal` — intersection observer animation wrapper. Used on landing page.

**Score: 7/8 spec components actively used. CitySummaryCard built but orphaned.**

---

## 4. Data Architecture Assessment

### Current State: Single File

The spec calls for **9 separate data files** in `src/data/`:

| Spec File | Exists | Status |
|-----------|--------|--------|
| `tasks.ts` | ❌ | In `mockData.ts` as `tasks` array |
| `cities.ts` | ❌ | In `mockData.ts` as `cities` array |
| `housing.ts` | ❌ | Hardcoded inline in `Housing.tsx` |
| `banking.ts` | ❌ | Partially in `mockData.ts` (`banks`), partially inline |
| `sim.ts` | ❌ | Hardcoded inline in `Sim.tsx` |
| `groceries.ts` | ❌ | Hardcoded inline in `Groceries.tsx` |
| `health.ts` | ❌ | Hardcoded inline in `Health.tsx` |
| `apps.ts` | ❌ | In `mockData.ts` as `apps` array |
| `visaTypes.ts` | ❌ | In `mockData.ts` as `visaTypes` array |

**Finding**: All data is either in a single `mockData.ts` file or hardcoded directly in page components. This violates the spec's "data separated from presentation" principle and the "configuration-driven content" requirement.

### mockData.ts Content Inventory

| Data | Count | Quality |
|------|-------|---------|
| Tasks | 15 | Below spec minimum of 20. Distribution: 4 before, 4 week1, 5 month1, 2 month3. Persona-specific: only 3 tasks (t10 professional, t11 student, t14 professional, t15 student). Most are "both." |
| Cities | 5 | London, Manchester, Birmingham, Edinburgh, Glasgow. Good coverage. Basic data only (no avg rent, no detailed transport costs). |
| Banks | 5 | 3 digital (Monzo, Starling, Revolut), 2 traditional (Barclays, HSBC). Feature arrays present but no persona-specific differentiation. |
| Apps | 14 | Good variety across categories. Missing some spec items (NHS App present, Wise present). |
| Indian cities | 12 | Good list for origin city dropdown. |
| Visa types | 5 | Student, Skilled Worker, Graduate, Dependant, Other. Matches spec. |

### Content Hardcoded in Pages (Not Extractable)

| Page | Inline Data |
|------|------------|
| `Housing.tsx` | 5 housing types, 3 tips, 8 platform names |
| `Banking.tsx` | 6 account-opening steps, 3 budgeting tips |
| `Sim.tsx` | 3 SIM options, 5 checklist items |
| `Groceries.tsx` | 5 supermarkets, 4 delivery apps, 5 tips |
| `Health.tsx` | 3 healthcare basics, 2 student health items, 2 professional health items |

**This content needs extraction into `src/data/` files before Sprint 3 is complete.**

---

## 5. Design System Compliance

### Colors

| Element | Spec | Implementation | Status |
|---------|------|---------------|--------|
| Primary (teal) | Rich teal/blue-green | HSL `174 62% 35%` | ✅ Well-chosen teal |
| Accent (coral) | Warm coral/soft orange | HSL `16 85% 60%` | ✅ Custom `--coral` CSS variable + `variant="coral"` button |
| Neutrals | Off-white #F9FAFB, gray #F3F4F6, dark gray #374151 | HSL-based system matching these values | ✅ |
| Dark mode | Not in spec | Full dark mode variables defined | ✅ Bonus feature |

### Typography

| Element | Spec | Implementation | Status |
|---------|------|---------------|--------|
| Body font | Modern sans-serif (Inter or similar) | DM Sans | ✅ Good alternative |
| Heading font | Clear hierarchy | Outfit | ✅ Distinct heading typeface |

### Layout & Navigation

| Element | Spec | Implementation | Status |
|---------|------|---------------|--------|
| Desktop nav | Top bar with logo + links + Get Started | ✅ Present | Logo has coral "Abroad" accent |
| Mobile nav | Sticky bottom bar | ✅ 5 items: Home, Plan, Housing, Banking, More | Matches spec |
| Mobile hamburger | Not explicit in spec | ✅ Sheet-based drawer on mobile | Good addition |
| Footer | FAQ, Privacy, Terms, Contact | ✅ Present (desktop only) | Links are `#` placeholders |
| Rounded cards | Yes | ✅ `rounded-2xl` consistently | |
| Drop shadows | Subtle | ✅ `hover:shadow-lg` on cards | |

### Missing from Spec

- **"About" link in desktop nav** — spec says "Home, How it Works, Features, Resources, About, Get Started." Current nav omits "About."
- **Footer hidden on mobile** — the `hidden md:block` class makes the footer invisible on mobile. The spec doesn't explicitly address this, but footer links (FAQ, Privacy, Terms) should be accessible.
- **No font loading** — DM Sans and Outfit are referenced in CSS but not loaded via Google Fonts link in `index.html`. Browser will fall back to system fonts.

---

## 6. Context & State Management

### AppContext Implementation

The `AppContext.tsx` is well-structured:

```typescript
interface AppState {
  persona: 'student' | 'professional' | null;
  originCity: string;
  city: string;
  visaType: string;
  arrivalMonth: string;
  arrivalYear: string;
  hasAccommodation: boolean;
  budget: 'low' | 'medium' | 'high';
  completedTasks: string[];
}
```

**Strengths**:
- Type-safe with TypeScript interface
- `toggleTask` helper exposed for task completion
- Persona selection persists across navigation
- Task completion state works correctly

**Known Limitations** (accepted for Phase 1):
- State resets on page refresh (no localStorage). Spec acknowledges this.
- No `accommodationStatus` field matching the spec's `'not_started' | 'searching' | 'booked'` — uses a boolean instead.
- Budget uses `'low' | 'medium' | 'high'` vs spec's `'tight' | 'moderate' | 'comfortable'` — cosmetic difference.

---

## 7. Persona-Specific Content Assessment

The spec requires every hub page to have persona-specific content sections or tabs.

| Page | Persona Content | Status |
|------|----------------|--------|
| `/plan` | Tasks filtered by persona (both/student/professional) | ✅ Works |
| `/health` | Separate "For Students" and "For Professionals" sections | ✅ **Best implementation** |
| `/housing` | No persona tabs or sections | ❌ **Gap** |
| `/banking` | No persona tabs. Bank data has `forStudents`/`forProfessionals` booleans but they're unused | ❌ **Gap** — data exists, UI doesn't branch |
| `/sim` | No persona differentiation | ❌ **Gap** |
| `/groceries` | No persona differentiation | ❌ **Gap** |
| `/profile` | Displays persona correctly | ✅ |

**Finding**: Only `/health` and `/plan` implement persona branching. The other 4 hub pages show identical content regardless of whether the user selected Student or Professional. This is a Sprint 3 deliverable.

---

## 8. Content Quality Review

### Against Spec Content Standards

| Standard | Status | Notes |
|----------|--------|-------|
| Verified against official sources | ⚠️ **Unverifiable** | Content appears generally accurate but no source URLs documented in code |
| Sources documented (URL, date) | ❌ **Missing** | No source documentation anywhere |
| "Last updated" dates | ❌ **Missing** | Not on any content |
| Disclaimers on visa/legal | ❌ **Missing** | No "Verify with GOV.UK" disclaimers |
| Actionable (tells user what to DO) | ✅ Mostly | Task descriptions are action-oriented |
| Plain English, short sentences | ✅ | Content is clear and readable |
| TODO comments for Phase 2 APIs | ❌ **Missing** | No TODO markers for future API integration points |

---

## 9. Technical Quality

### Stack Compliance

| Spec | Actual | Match |
|------|--------|-------|
| React 18 | `react: ^18.3.1` | ✅ |
| Vite | `vite: ^5.4.19` | ✅ |
| Tailwind CSS | `tailwindcss: ^3.4.17` | ✅ |
| shadcn/ui + Radix | Full set of `@radix-ui/*` packages | ✅ |
| React Router v6 | `react-router-dom: ^6.30.1` | ✅ |
| TypeScript | `typescript: ^5.8.3` | ✅ |

### Additional Dependencies (Not in Spec)

- `@tanstack/react-query` — imported and initialized but **never actually used** (no queries in a static data app). Unnecessary dependency.
- `react-hook-form` + `@hookform/resolvers` + `zod` — present but **unused**. The intake form uses basic state management instead.
- `recharts` — present but **unused**.
- `embla-carousel-react` — present but **unused**.
- `next-themes` — present but **unused** (dark mode toggle not exposed in UI).
- `lovable-tagger` — Lovable build tool, expected.

**Finding**: The Lovable scaffold installed ~15 unused dependencies. Not a bug but adds bundle weight. Low priority to clean up.

### Code Quality

- **TypeScript types**: Good — `Task` interface defined, component props typed, state typed.
- **Console errors**: `NotFound.tsx` intentionally logs 404s to console.
- **File structure**: Clean pages/components/data/hooks/context separation. Follows React conventions.
- **No backend code**: ✅ Zero Supabase imports, zero API calls, zero auth logic. Phase 1 constraint fully respected.

---

## 10. Sprint Progress Matrix

### Sprint 1 Checklist (Days 1–7): **~90% Complete**

| Deliverable | Status |
|-------------|--------|
| Landing page (hero, how-it-works, pillars, personas, CTA) | ✅ |
| Global Layout component | ✅ |
| Design system enforcement | ✅ |
| Persona selection with context storage | ✅ |
| Intake form with all fields and navigation | ✅ |
| React Router skeleton for all 14 routes | ✅ |
| GitHub sync and deployment | ✅ |
| **Sprint 1 Checkpoint**: User can go landing → persona → intake → plan | ✅ |

### Sprint 2 Checklist (Days 8–14): **~65% Complete**

| Deliverable | Status |
|-------------|--------|
| Plan dashboard: ProgressHeader, 4 tabs, TaskCards with toggle | ✅ |
| Progress recalculation on task toggle | ✅ |
| ALL static data files created | ⚠️ **Partial** — single `mockData.ts` instead of 9 files; hub content inline |
| Hub page hero sections | ✅ All 5 have HubHero |
| Hub page basic InfoCard layouts | ✅ |
| Auth UI pages (mock validation) | ✅ |
| Profile page skeleton | ✅ |
| Content accuracy review of task data | ⚠️ **Unknown** — no evidence of PM review |
| **Sprint 2 Checkpoint**: Tasks toggle and progress updates? | ✅ |
| **Sprint 2 Checkpoint**: All 5 hubs load without errors? | ✅ |

### Sprint 3 Checklist (Days 15–21): **~25% Complete**

| Deliverable | Status |
|-------------|--------|
| Cross-reference UK content against official sources | ❌ Not done |
| Responsive polish across all pages | ⚠️ Partially (Lovable generates responsive code but no manual audit evidence) |
| Profile page complete | ✅ |
| Housing hub: Student/Professional tabs | ❌ |
| Banking hub: persona-specific views | ❌ |
| SIM hub: carrier comparison, India rates | ❌ |
| Groceries hub: week-1 shopping list | ❌ |
| Health hub: persona sections | ✅ Already done |
| City detail: London minimum | ✅ (plus 4 more cities) |
| Resources/apps page | ✅ |
| **Sprint 3 Checkpoint**: Full persona flow without empty states? | ⚠️ — flow works but persona branching missing on 4 hubs |

### Sprint 4 Checklist (Days 22–28): **~10% Complete**

| Deliverable | Status |
|-------------|--------|
| Mobile-first verification (375px, 768px, 1280px+) | ❌ Not evidenced |
| Cross-browser testing | ❌ |
| Content accuracy review with "Last updated" dates | ❌ |
| Error states (loading, empty, validation) | ⚠️ Basic (form validation present, no loading states) |
| SEO & metadata (titles, descriptions, OG tags) | ❌ |
| README documentation | ❌ Default Lovable README, not customized |
| **Sprint 4 Checkpoint**: Deployed URL works on mobile & desktop? README complete? | ❌ |

---

## 11. Priority Action Items

Ranked by impact on the success criteria weighting:

### Critical (Blocks Submission)

| # | Item | Owner | Effort | Criteria Impact |
|---|------|-------|--------|-----------------|
| 1 | **Add persona-specific content to Housing, Banking, SIM, Groceries hubs** | Student 4 | 3–4 days | Persona Flow (20%), Content Quality (15%) |
| 2 | **Extract inline data to separate `src/data/` files** (housing.ts, banking.ts, sim.ts, groceries.ts, health.ts) | Student 4 | 1 day | Code Quality (5%), Phase 2 readiness |
| 3 | **Add 5+ more tasks to reach 20 minimum** with better persona distribution | Student 3 | 0.5 days | Content Quality (15%) |
| 4 | **Add "Last updated" dates and source disclaimers** to all hub pages | Student 4 + PM review | 0.5 days | Content Quality (15%) |
| 5 | **Write proper README** with architecture, team contributions, data sources, Phase 2 roadmap | Student 1 (PM) | 1 day | Documentation (5%) |

### Important (Affects Grade)

| # | Item | Owner | Effort |
|---|------|-------|--------|
| 6 | **Wire CitySummaryCard** into landing page or a city overview section — component exists but is unused | Student 5 | 0.5 days |
| 7 | **Add TODO comments** at every Phase 2 integration point (maps, weather, currency, auth) | All | 0.5 days |
| 8 | **Fix NotFound page** to use Layout wrapper (currently no navigation) | Student 5 | 15 min |
| 9 | **Add Google Fonts link** for DM Sans and Outfit to `index.html` | Student 2 | 15 min |
| 10 | **Responsive audit** at 375px, 768px, 1280px+ breakpoints | Student 2 | 1 day |
| 11 | **Add SEO metadata** (page titles, descriptions, OG tags) | Student 5 | 0.5 days |
| 12 | **Add "About" link** to desktop nav (spec requires it) | Student 2 | 15 min |

### Nice-to-Have

| # | Item | Notes |
|---|------|-------|
| 13 | Remove unused dependencies (react-query, recharts, embla, etc.) | Reduces bundle size |
| 14 | Add localStorage persistence for context state | Spec accepts this as stretch for Phase 1 |
| 15 | Add footer visibility on mobile (currently hidden) | Accessibility concern |
| 16 | Add carrier comparison table to SIM hub with actual plan data | Content enhancement |

---

## 12. Success Criteria Scoring (Current)

| Criterion | Weight | Current Score | Notes |
|-----------|--------|---------------|-------|
| Route Completeness | 20% | **17/20** | All 14 routes exist and load. 404 works. Minor: NotFound lacks Layout. |
| Persona Flow | 20% | **13/20** | End-to-end flow works, context persists, tasks toggle. But 4/5 hubs lack persona branching. |
| Content Quality | 15% | **8/15** | Content present but below minimum task count, no source docs, no "Last updated" dates, no disclaimers. |
| Responsive Design | 15% | **11/15** | Lovable generates responsive code; bottom nav works. No manual audit evidence. |
| Design Fidelity | 10% | **9/10** | Teal/coral palette, rounded cards, shadows, typography — all excellent. |
| Component Reuse | 10% | **8/10** | 7/8 spec components actively used. CitySummaryCard orphaned. |
| Code Quality | 5% | **3.5/5** | Clean structure, typed, no console errors, no backend code. Data not separated per spec. |
| Documentation | 5% | **0.5/5** | Default Lovable README. No architecture docs, team contributions, or Phase 2 roadmap. |

**Estimated Total: ~70/100** — solid foundation, needs Sprint 3–4 work to reach submission quality.

---

## 13. What's Working Well

1. **Design system execution** is excellent — the teal/coral palette, Outfit headings, DM Sans body, rounded card aesthetic feels professional and matches the fintech/relocation hybrid spec perfectly.

2. **Landing page** is polished — scroll animations, clear value prop, persona cards, social proof section. This would demo well.

3. **Plan dashboard** works correctly — persona filtering, tab switching, task toggling, progress recalculation. This is the core interactive feature and it's solid.

4. **Health hub** is the gold standard — it's the only hub with proper persona branching (Student vs. Professional sections). The other 4 hubs should follow this pattern.

5. **Phase 1 constraint fully respected** — zero backend code, zero API calls, zero Supabase imports. The team has maintained scope discipline.

6. **Component architecture is clean** — InfoCard, HubHero, AppRecommendationCard are genuinely reused across pages, not duplicated.

---

*Report generated from full codebase read of the `newstartabroad` repository.*
