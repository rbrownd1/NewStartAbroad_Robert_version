# NewStartAbroad — Technical Architecture

## Phase 2 Backend, Phase 3 Enhancements & Database Specification

**Audience:** Full team (especially Students 1, 3, 5 for Phase 2 planning)
**Purpose:** Complete backend architecture reference — database schema, N8N workflows, AI integration, and Phase 3 enhancement roadmap

---

## 1. Architecture Overview

### From UI-Only MVP to Full-Stack Platform

NewStartAbroad Phase 1 delivers a UI-only MVP with all data in TypeScript arrays. Phase 2 wires this to a real backend. Phase 3 adds interactive tools that combine Relocator's depth with NewStartAbroad's breadth.

| Dimension | Phase 1 (Current) | Phase 2 (Post-Submission) | Phase 3 (Independent) |
|-----------|-------------------|---------------------------|----------------------|
| **Frontend** | React + Vite + shadcn/ui | Same | Same |
| **Backend** | None (mock data) | Supabase | Supabase |
| **Database** | TypeScript arrays in `src/data/` | 15 PostgreSQL tables | + 3 additional tables |
| **Auth** | Mock UI forms | Supabase Auth + RLS | Same |
| **AI** | None | 3 prompts via Edge Functions | + Visa Personaliser |
| **Automation** | None | 6 N8N workflows | Same |
| **Content CMS** | Code commits to `src/data/` | Google Sheets → N8N → Supabase | Same |
| **Demo Risk** | Very low (all static) | Medium (live backend) | Medium |

### Why This Sequence Matters

The Relocator project was backend-first and struggled with content bottlenecks — Student D had 60+ hours of content work that nearly sank the project. NewStartAbroad's UI-first approach forces content to be the first deliverable, with backend as an upgrade layer. This is the better sequence for a content-heavy application.

However, Relocator's automation and AI patterns are more mature and directly transferable. The N8N content sync workflow, the retrieval-only AI guardrails, and the forex rate updater are essentially plug-and-play for NewStartAbroad's Phase 2.

---

## 2. Database Schema (Supabase / PostgreSQL)

### 2.1 Schema Overview

15 tables organized into 5 groups:

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `users` | Profiles, persona, city, journey stage | Primary entity |
| `user_intake` | Onboarding form responses | FK → users |
| `tasks` | Master 90-day settlement tasks | Referenced by user_tasks |
| `user_tasks` | User's task completion tracking | FK → users, tasks |
| `cities` | City-specific data (London, Manchester, etc.) | Referenced by users, content |
| `housing_guides` | Housing content by persona and city | FK → cities |
| `banking_guides` | Banking content by persona | Standalone |
| `health_guides` | Health/NHS content by persona and city | FK → cities |
| `sim_guides` | SIM & connectivity content | Standalone |
| `grocery_guides` | Grocery content by city | FK → cities |
| `app_recommendations` | Recommended apps by category | Standalone |
| `scam_patterns` | Housing scam indicators | Referenced by AI |
| `notifications` | User notification preferences and log | FK → users |
| `chat_history` | AI chat conversation logs | FK → users |
| `content_versions` | Content audit trail with "last updated" dates | FK → all guide tables |

### 2.2 Core Tables — Full SQL

```sql
-- =============================================
-- USERS & ONBOARDING
-- =============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    
    -- Persona (the core branching logic)
    persona TEXT NOT NULL CHECK (persona IN ('student', 'professional')),
    
    -- Intake form data
    origin_city TEXT DEFAULT 'India',
    destination_city TEXT,
    visa_type TEXT CHECK (visa_type IN ('student', 'skilled_worker', 'graduate', 'dependant')),
    arrival_month TEXT,
    accommodation_status TEXT CHECK (accommodation_status IN ('not_started', 'searching', 'booked')),
    budget_band TEXT CHECK (budget_band IN ('tight', 'moderate', 'comfortable')),
    
    -- Journey tracking
    journey_phase TEXT DEFAULT 'before_you_fly' 
        CHECK (journey_phase IN ('before_you_fly', 'first_week', 'first_month', 'first_three_months', 'settled')),
    plan_progress_pct DECIMAL(5,2) DEFAULT 0,
    
    -- Notification preferences
    email_notifications BOOLEAN DEFAULT true,
    whatsapp_notifications BOOLEAN DEFAULT false,
    whatsapp_number TEXT,
    
    -- System
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);


-- =============================================
-- 90-DAY PLAN & TASKS
-- =============================================

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('housing', 'health', 'banking', 'sim', 'groceries', 'admin', 'lifestyle')),
    
    -- Phase mapping (the 4 tabs in /plan)
    timeframe TEXT NOT NULL CHECK (timeframe IN ('before_you_fly', 'first_week', 'first_month', 'first_three_months')),
    
    -- Persona targeting
    persona_filter TEXT[] DEFAULT '{student,professional}',
    
    -- City targeting (NULL = all cities)
    city_filter TEXT[],
    
    -- Ordering and linking
    display_order INT,
    linked_hub TEXT,
    official_url TEXT,
    
    -- Content metadata
    last_verified DATE,
    content_source TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Public read — tasks are not user-specific. No RLS needed.


CREATE TABLE user_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id),
    
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    
    UNIQUE(user_id, task_id)
);

ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own tasks" ON user_tasks 
    FOR ALL USING (auth.uid() = user_id);


-- =============================================
-- CITY DATA
-- =============================================

CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    
    cost_level TEXT CHECK (cost_level IN ('low', 'moderate', 'high', 'very_high')),
    avg_rent_student DECIMAL(8,2),
    avg_rent_professional DECIMAL(8,2),
    
    transport_summary TEXT,
    transport_monthly_cost DECIMAL(6,2),
    
    popular_areas JSONB,
    
    last_verified DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================
-- HUB CONTENT TABLES
-- =============================================

CREATE TABLE housing_guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    persona TEXT NOT NULL CHECK (persona IN ('student', 'professional', 'both')),
    city_slug TEXT REFERENCES cities(slug),
    
    housing_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    pros JSONB,
    cons JSONB,
    avg_cost_range TEXT,
    recommended_platforms JSONB,
    scam_warnings JSONB,
    documents_needed JSONB,
    
    display_order INT,
    last_verified DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE banking_guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    persona TEXT NOT NULL CHECK (persona IN ('student', 'professional', 'both')),
    
    bank_type TEXT NOT NULL CHECK (bank_type IN ('digital', 'traditional')),
    bank_name TEXT NOT NULL,
    
    features JSONB,
    newcomer_friendly BOOLEAN DEFAULT true,
    opening_steps JSONB,
    monthly_fees DECIMAL(6,2) DEFAULT 0,
    international_transfer BOOLEAN DEFAULT false,
    
    display_order INT,
    last_verified DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE health_guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    persona TEXT NOT NULL CHECK (persona IN ('student', 'professional', 'both')),
    city_slug TEXT REFERENCES cities(slug),
    
    topic TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    steps JSONB,
    official_url TEXT,
    
    display_order INT,
    last_verified DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sim_guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    carrier_name TEXT NOT NULL,
    carrier_type TEXT CHECK (carrier_type IN ('major', 'mvno')),
    plan_type TEXT CHECK (plan_type IN ('prepaid', 'contract')),
    
    monthly_cost DECIMAL(6,2),
    data_allowance TEXT,
    india_calling_rate TEXT,
    newcomer_notes TEXT,
    
    persona_recommended TEXT[] DEFAULT '{student,professional}',
    display_order INT,
    last_verified DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE grocery_guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_slug TEXT REFERENCES cities(slug),
    
    store_type TEXT CHECK (store_type IN ('supermarket', 'indian_asian', 'delivery_app', 'discount')),
    store_name TEXT NOT NULL,
    description TEXT,
    price_level TEXT CHECK (price_level IN ('budget', 'mid', 'premium')),
    delivery_available BOOLEAN DEFAULT false,
    indian_products BOOLEAN DEFAULT false,
    
    display_order INT,
    last_verified DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================
-- AI CHAT & NOTIFICATIONS
-- =============================================

CREATE TABLE chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    
    related_pillar TEXT,
    related_city TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own chats" ON chat_history 
    FOR ALL USING (auth.uid() = user_id);


CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    notification_type TEXT CHECK (notification_type IN ('task_reminder', 'deadline', 'content_update', 'tip')),
    title TEXT NOT NULL,
    body TEXT,
    
    sent_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    channel TEXT CHECK (channel IN ('email', 'whatsapp', 'in_app')),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================
-- CONTENT MANAGEMENT
-- =============================================

CREATE TABLE content_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    field_name TEXT,
    
    old_value TEXT,
    new_value TEXT,
    changed_by TEXT,
    change_reason TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_tasks_timeframe ON tasks(timeframe);
CREATE INDEX idx_tasks_persona ON tasks USING GIN(persona_filter);
CREATE INDEX idx_user_tasks_user ON user_tasks(user_id);
CREATE INDEX idx_housing_persona_city ON housing_guides(persona, city_slug);
CREATE INDEX idx_chat_user ON chat_history(user_id, created_at);
CREATE INDEX idx_notifications_user ON notifications(user_id, read_at);


-- =============================================
-- AUTO-UPDATE TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### 2.3 Key Design Decisions

**Why persona is a column, not a separate table.** NewStartAbroad has exactly two personas with no plans for more in Phase 2. A `persona TEXT CHECK (...)` column is simpler than a join table and matches how the frontend already branches content — a simple if/else on context state.

**Why JSONB for flexible content fields.** Housing `pros`, banking `features`, health `steps` — these are display-only arrays that don't need relational queries. JSONB keeps the schema simple while allowing rich structured content. If you later need to query "all banks with international transfer = true," the boolean column handles that; the JSONB holds the display detail.

**Why `last_verified` on every content table.** The whitepaper's risk matrix flags content accuracy as a top concern. A `last_verified DATE` on every guide table enables a pre-demo audit query (`SELECT * FROM housing_guides WHERE last_verified < NOW() - INTERVAL '30 days'`) and a user-facing "Last updated" badge.

**Why `content_versions` instead of full audit logging.** For a student project, a simple change log is more practical than Supabase's built-in audit features. It lets the PM (Student 1) track what changed, when, and why — critical for content accuracy accountability.

---

## 3. N8N Workflow Specifications

### 3.1 Workflow Overview

| # | Workflow | Trigger | Purpose | Complexity | Priority |
|---|----------|---------|---------|------------|----------|
| 1 | **Content Sync** | Schedule (every 6 hrs) OR webhook on Sheet edit | Sync Google Sheets content → Supabase guide tables | Medium | **Core** |
| 2 | **Forex Rate Updater** | Daily cron, 6 AM UTC | Update GBP/INR rate for budget context in Banking hub | Low | **Core** |
| 3 | **Task Deadline Reminder** | Daily cron, 9 AM UTC | Email/WhatsApp users with upcoming settlement deadlines | Medium | Core |
| 4 | **Onboarding Welcome Sequence** | Webhook on user signup | Send persona-specific welcome email with "Your first 3 steps" | Low | Nice-to-have |
| 5 | **Content Staleness Alert** | Weekly cron, Monday 8 AM | Flag any guide content where `last_verified > 60 days` → alert PM | Low | Nice-to-have |
| 6 | **AI Chat Logger** | Webhook on chat completion | Log common questions to identify content gaps | Low | Stretch |

### 3.2 Workflow Detail: Content Sync (The Most Important One)

This is the workflow the Relocator project used to great effect. It solves NewStartAbroad's biggest Phase 2 problem: how does non-developer Student 4 (Content) update housing costs or add a new bank without touching code?

```
TRIGGER: Schedule → Every 6 hours OR Webhook on Google Sheet edit

STEP 1: Google Sheets node → Get all rows from "Housing" sheet
        Columns: persona, city, type, title, description, pros, cons,
                 cost_range, platforms, scam_warnings, documents, order, verified_date

STEP 2: Transform → Map sheet columns to Supabase column names
        Convert comma-separated strings to JSONB arrays

STEP 3: Supabase node → Upsert to housing_guides table
        Match on: persona + city_slug + housing_type (composite unique)
        Update all other fields

STEP 4: Repeat for banking_guides, health_guides, sim_guides, grocery_guides

STEP 5: Log sync completion with row counts per table
```

**Why this matters**: Student 4 owns all 5 hub content areas. Without a CMS layer, every price update, every new scam warning, every carrier plan change requires a code commit. Google Sheets → N8N → Supabase lets Student 4 edit a spreadsheet and have it reflect in the app within 6 hours (or immediately via webhook).

### 3.3 Workflow Detail: Task Deadline Reminder

The `/plan` dashboard already has 4 timeframes. Combined with the user's `arrival_month`, N8N can calculate actual calendar deadlines:

```
TRIGGER: Daily cron → 9 AM UTC

STEP 1: Query Supabase
        SELECT users.*, tasks.title, tasks.timeframe
        FROM users
        JOIN user_tasks ON users.id = user_tasks.user_id
        JOIN tasks ON user_tasks.task_id = tasks.id
        WHERE user_tasks.completed = false
        AND users.email_notifications = true

STEP 2: Calculate urgency
        IF user.arrival_month is within 14 days AND task.timeframe = 'before_you_fly':
            → URGENT: "You fly in 2 weeks — have you done X?"
        IF user.journey_phase = 'first_week' AND task.timeframe = 'first_week':
            → ACTIVE: "Day 3 tip: Register with a GP today"

STEP 3: Send email via SendGrid/SMTP
        Persona-specific template (student vs professional tone)
        Include direct link to relevant hub page

STEP 4: Log to notifications table
```

### 3.4 Workflow Detail: Forex Rate Updater

```
TRIGGER: Daily cron → 6 AM UTC

STEP 1: HTTP Request → GET exchange rate API (e.g., exchangerate-api.com)
        Target: GBP to INR rate

STEP 2: Supabase node → Upsert to forex_rates table
        {currency_pair: 'GBP_INR', rate: [value], fetched_at: NOW()}

STEP 3: Error handling → If API fails, keep previous rate, log error
```

This rate feeds the Banking hub budget context and the Phase 3 Budget Calculator.

---

## 4. AI Integration Architecture

### 4.1 AI Feature Map

| Feature | AI Task | Model | Input | Output | Risk Level |
|---------|---------|-------|-------|--------|------------|
| **Relocation Q&A Chat** | Answer settlement questions | GPT-4o-mini or Claude Haiku | User question + persona + city context | Grounded answer with source links | **High** — visa/legal misinformation |
| **Smart Task Recommender** | Suggest next priorities | GPT-4o-mini | User's completed tasks + arrival date + persona | Prioritised "do next" list | Medium |
| **Housing Scam Analyzer** | Evaluate listing red flags | GPT-4o-mini | Listing details + known patterns | Risk score + specific warnings | Medium |

### 4.2 AI Guardrails (CRITICAL)

**Principle: Retrieval-only for any regulated content.** This is the single most important AI design decision.

| Domain | AI Can Do | AI Must NOT Do |
|--------|-----------|----------------|
| **Visa/immigration** | Retrieve and display GOV.UK content from the guides database | Generate, summarise, or interpret visa requirements |
| **NHS/healthcare** | Link to NHS.uk pages, explain registration steps from the database | Offer medical advice or triage symptoms |
| **Banking** | Compare products from the banking_guides table | Recommend a specific bank or financial strategy |
| **Housing** | Flag scam patterns from the scam_patterns table | Declare a listing "safe" or provide legal tenancy advice |
| **General settlement** | Answer practical "how do I..." questions from curated content | Generate information not grounded in the guide database |

### 4.3 Prompt Templates

#### Prompt 1: Relocation Q&A Chat (Primary)

```
SYSTEM:
You are a UK relocation assistant for Indian students and professionals.
Answer questions using ONLY the provided context from our curated guide database.

USER CONTEXT:
- Persona: {{persona}}  (student | professional)
- Destination city: {{city}}
- Visa type: {{visa_type}}
- Arrival timing: {{arrival_month}}
- Current phase: {{journey_phase}}

RELEVANT GUIDE CONTENT:
{{retrieved_guide_content}}

CONSTRAINTS:
- ONLY use information from the provided guide content above
- If the answer is not in the provided content, say: "I don't have specific
  guidance on that yet. Check [GOV.UK / NHS.uk / relevant official source] directly."
- NEVER generate visa requirements, immigration advice, or legal guidance
- NEVER say a housing listing is "safe"
- Always end visa/legal answers with: "Verify this on GOV.UK — immigration
  rules change frequently."
- Keep answers concise (under 150 words) and actionable
- Reference the user's persona where relevant
- Include links to official sources when available
```

#### Prompt 2: Housing Scam Analyzer

```
SYSTEM:
You are a UK housing scam detection assistant. Analyse accommodation listings
for red flags common in scams targeting Indian newcomers.

LISTING DETAILS:
- Monthly rent: £{{price}}
- Area: {{area}}, {{city}}
- Platform: {{platform}}
- Payment requested: {{payment_method}}
- Communication notes: {{notes}}

KNOWN SCAM PATTERNS:
{{scam_patterns_from_database}}

AVERAGE RENT FOR AREA:
{{city_avg_rent}} (for {{persona}})

OUTPUT:
Return JSON:
{
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "warnings": ["specific concern 1", "specific concern 2"],
  "green_flags": ["positive indicator 1"],
  "recommended_actions": ["what to do next"],
  "price_assessment": "below_market" | "market_rate" | "above_market"
}

CONSTRAINTS:
- NEVER say a listing is "definitely safe"
- If price is >30% below market average, always flag
- Always recommend viewing before payment
- Flag any request for payment before viewing
```

#### Prompt 3: Smart Task Recommender

```
SYSTEM:
You are a settlement planning assistant. Based on the user's progress and timing,
suggest which tasks to prioritise next.

USER STATUS:
- Persona: {{persona}}
- City: {{city}}
- Arrival: {{arrival_month}}
- Current phase: {{journey_phase}}
- Completed tasks: {{completed_task_ids}}
- Incomplete tasks: {{incomplete_tasks_with_details}}

OUTPUT:
Return the top 3 tasks to do next, ordered by urgency. For each:
{
  "task_id": "...",
  "reason": "Why this is urgent now (1 sentence)",
  "time_estimate": "15 min / 1 hour / half day"
}

CONSTRAINTS:
- Prioritise tasks with real deadlines (BRP collection, GP registration)
- Factor in the user's arrival date proximity
- Don't recommend tasks from future phases
```

### 4.4 Implementation Architecture

```
User types question in chat panel
        │
        ▼
Frontend sends to Supabase Edge Function
        │
        ▼
Edge Function:
  1. Identify question category (housing? banking? visa? general?)
  2. Query relevant guide table(s) for context
  3. Build prompt with user persona + city + retrieved content
  4. Call AI API (gpt-4o-mini, max_tokens: 500)
  5. Append disclaimer if visa/legal/health topic detected
  6. Log to chat_history table
  7. Return response to frontend
        │
        ▼
Frontend displays in chat panel with source links
```

**Why Supabase Edge Functions instead of N8N for chat?** Latency. Chat needs sub-second response. N8N webhooks add unnecessary hops. Edge Functions run at the database layer with direct access to guide tables — one query for context, one API call for AI, one insert for logging.

**Why N8N for everything else?** Cron jobs (forex, reminders, staleness alerts) and batch operations (content sync) don't need low latency. N8N's visual workflow builder is more maintainable for students than writing Edge Functions for scheduled tasks.

---

## 5. Phase 2 Enhancement Prioritisation

### If the Team Had 2 Additional Weeks (Weeks 5–6)

| Priority | Enhancement | Effort | Impact | Justification |
|----------|-------------|--------|--------|---------------|
| **1** | Supabase auth + user_tasks persistence | 3–4 days | High | Task completion survives page refresh — the #1 UX gap in Phase 1 |
| **2** | Google Sheets → N8N → Supabase content sync | 2–3 days | High | Student 4 can update content without code commits |
| **3** | Forex rate display in Banking hub | 1 day | Medium | Simple N8N cron + one Supabase table + one UI component |
| **4** | AI Q&A chat panel (retrieval-only) | 3–4 days | High | Differentiation; answers the "I have a specific question" use case |

### If the Team Had 4 Additional Weeks (Full Phase 2)

| Priority | Enhancement | Effort | Impact |
|----------|-------------|--------|--------|
| **5** | Task deadline reminders (N8N → email) | 2–3 days | Medium |
| **6** | Housing scam analyzer | 2–3 days | Medium |
| **7** | City-specific content in database (not just London) | 3–4 days | Medium |
| **8** | Smart task recommender AI | 2 days | Low-Medium |
| **9** | Profile persistence + intake data storage | 1–2 days | Medium |
| **10** | Content staleness alerts for PM | 1 day | Low |

### What to Never Build (In a Student Project)

| Feature from Whitepaper | Why Not |
|------------------------|---------|
| Community Forum | Requires moderation, real-time infra, abuse handling — scope explosion |
| Document Vault | File upload + storage + security is a project unto itself |
| Multi-Country Expansion | Content multiplication problem; India→UK isn't even complete yet |
| Affiliate Monetization | Business logic, tracking, compliance — irrelevant for academic demo |
| Push Notifications (browser) | Service workers, permissions, cross-browser hell — low ROI |

---

## 6. Content Management Pipeline

### The Problem

Student 4 owns all 5 hub content areas. Without a CMS layer, every price update, every new scam warning, every carrier plan change requires a code commit. This doesn't scale.

### The Solution: Google Sheets → N8N → Supabase

```
Student 4 edits Google Sheets
    → N8N Content Sync workflow (every 6 hours or webhook)
    → Transform sheet columns to Supabase column names
    → Convert comma-separated strings to JSONB arrays
    → Upsert to guide tables (match on composite unique keys)
    → Log sync completion with row counts
```

### Google Sheet Structure (One Sheet Per Pillar)

**Housing Sheet Columns:**
persona | city | type | title | description | pros | cons | cost_range | platforms | scam_warnings | documents | order | verified_date

**Banking Sheet Columns:**
persona | bank_type | bank_name | features | newcomer_friendly | opening_steps | monthly_fees | international_transfer | order | verified_date

**Rules:**
- Comma-separated values in pros/cons/features columns → N8N converts to JSONB arrays
- `persona` values: student, professional, both
- `verified_date` must be updated every time content is edited
- Student 1 (PM) has edit access; Student 4 has edit access; others have view-only

---

## 7. Phase 3: Hybrid Enhancement Specifications

These are post-Phase 2 enhancements that combine Relocator's interactive depth with NewStartAbroad's content breadth. All require Phase 2 backend to be operational.

### Enhancement 1: First Week Deep Guide

| Attribute | Detail |
|-----------|--------|
| **Source pattern** | Relocator's demo centerpiece — First Week Setup Checklist |
| **Where it lives** | Enhanced "First Week" tab in `/plan` |
| **What it does** | Replaces generic First Week TaskCards with day-by-day breakdown: Day 1 through Day 7, each with 3–5 detailed tasks including step-by-step instructions, official links, time estimates, and "you'll need" checklists |
| **Backend needs** | Enhanced `tasks` table with `day_number` field + `detailed_steps` JSONB + `estimated_time_minutes` |
| **Estimated effort** | 4–5 days |

**Content structure per day:**
```
Day 1: Arrival & Essentials
├── Task: Get UK SIM card (30 min)
│   ├── Steps: Go to WHSmith/Vodafone in arrivals → buy Giffgaff/Three SIM → activate on airport WiFi
│   ├── You'll need: Passport, £10-15 cash or card
│   └── Link: giffgaff.com/activate
├── Task: Get to accommodation (1-2 hrs)
│   └── Persona variant: Student → halls check-in / Professional → tenancy key collection
├── Task: Buy immediate essentials (1 hr)
│   └── Link: [from Groceries hub week-1 list]
└── Task: Activate UK banking app (15 min)
    └── Prerequisite: UK SIM active

Day 2: Admin & Orientation
├── Task: Collect BRP (if applicable)
├── Task: Register with university / Report to employer
├── Task: Get Oyster card / transport pass
└── ...

[Through Day 7]
```

### Enhancement 2: Budget Calculator

| Attribute | Detail |
|-----------|--------|
| **Source pattern** | Relocator Budget Calculator + Forex |
| **Where it lives** | New section within `/banking` hub |
| **What it does** | Interactive cost breakdown: user enters rent, tuition (student), transport, groceries → computes monthly total in GBP → toggle to INR at live rate → savings gap tracker |
| **Backend needs** | `forex_rates` table + N8N Forex Updater + `user_budgets` table |
| **Estimated effort** | 3–4 days |
| **Persona variants** | Student: includes tuition + halls. Professional: includes council tax + commute. |

### Enhancement 3: Airport Route Planner

| Attribute | Detail |
|-----------|--------|
| **Source pattern** | Relocator Airport Router |
| **Where it lives** | Component in `/city/[slug]` transport section |
| **What it does** | User selects airport → sees route options with cost, time, and steps → can save as PDF |
| **Backend needs** | `airport_routes` table |
| **Estimated effort** | 2–3 days |

**Route data example:**
```
Heathrow → London
├── Tube (Piccadilly Line): £6, 60 min, luggage-friendly: moderate
├── Heathrow Express: £25, 15 min to Paddington, luggage-friendly: yes
├── Elizabeth Line: £11, 30-40 min, luggage-friendly: yes
└── National Express coach: £6-10, 60-90 min, luggage-friendly: yes
```

### Enhancement 4: AI Visa Checklist

| Attribute | Detail |
|-----------|--------|
| **Source pattern** | Relocator AI Visa Checklist |
| **Where it lives** | New route: `/visa` — becomes the 6th pillar |
| **What it does** | User answers visa-type questions → AI filters master document list → each document has plain-English explanation + how-to-get steps + GOV.UK link → user marks documents as gathered |
| **Backend needs** | `document_items` + `user_documents` tables + AI Visa Personaliser Edge Function |
| **Estimated effort** | 5–7 days |
| **Critical guardrail** | AI only filters from curated `document_items` table. Never generates or interprets requirements. |
| **Content lead time** | 15–20 hours of GOV.UK research for master document list |

### Enhancement 5: Housing Scam Detector

| Attribute | Detail |
|-----------|--------|
| **Source pattern** | Relocator Scam Detector |
| **Where it lives** | Interactive section in `/housing` hub |
| **What it does** | User pastes listing details → AI analyses against known patterns + city average rent → returns risk score with warnings |
| **Backend needs** | `scam_patterns` table + `scam_analyses` log + Scam Analyzer Edge Function |
| **Estimated effort** | 3–4 days |

### Enhancement 6: Deadline Notifications

| Attribute | Detail |
|-----------|--------|
| **Source pattern** | Relocator Deadline Reminders |
| **Where it lives** | Activates existing `/profile` notification toggles |
| **What it does** | N8N workflow checks arrival date vs incomplete tasks → sends persona-specific reminders |
| **Backend needs** | Phase 2 N8N Workflow #3 + `notifications` table + SendGrid/Twilio |
| **Estimated effort** | 2–3 days |

### 7.1 Phase 3 Build Order

| Priority | Enhancement | Effort | Cumulative | Impact |
|----------|-------------|--------|------------|--------|
| **1** | First Week Deep Guide | 4–5 days | 4–5 days | High |
| **2** | Budget Calculator | 3–4 days | 7–9 days | High |
| **3** | Airport Route Planner | 2–3 days | 9–12 days | Medium |
| **4** | AI Visa Checklist | 5–7 days | 14–19 days | Very High |
| **5** | Scam Detector | 3–4 days | 17–23 days | Medium |
| **6** | Deadline Notifications | 2–3 days | 19–26 days | Medium |

**Total:** 19–26 working days (~4–5 weeks for one developer, 2–3 weeks for two).

### 7.2 Dependency Chain

```
Phase 1 (4-week sprint)
│   UI-only MVP: 5 pillars + plan dashboard + city pages
│
├──▶ Phase 2 (Sections 2-6 of this document)
│       Supabase auth + schema + N8N workflows + AI chat
│       PREREQUISITE for all Phase 3 enhancements
│
└──▶ Phase 3 Enhancements (Section 7)
        │
        ├── #1 First Week Deep Guide — needs: enhanced tasks table
        ├── #2 Budget Calculator — needs: forex_rates + N8N updater
        ├── #3 Airport Route Planner — needs: airport_routes table (independent)
        ├── #4 AI Visa Checklist — needs: AI infrastructure + document_items table
        ├── #5 Scam Detector — needs: scam_patterns + AI Edge Functions
        └── #6 Deadline Notifications — needs: N8N workflows + SendGrid/Twilio
```

### 7.3 Content Work That Can Start Now

The longest lead time is content research, not code:

| Content Task | Hours | Can Start | Feeds Into |
|--------------|-------|-----------|------------|
| First Week Day 1–7 detailed guides | 15–20 | During Phase 1 Sprint 3 | Enhancement #1 |
| GOV.UK visa document master list | 15–20 | During Phase 1 Sprint 2 | Enhancement #4 |
| Airport route data (3–5 airports) | 3–5 | During Phase 1 Sprint 3 | Enhancement #3 |
| Housing scam pattern database | 3–4 | During Phase 2 | Enhancement #5 |

### 7.4 Cumulative Impact Summary

| Metric | Phase 1 Only | + Phase 2 | + Phase 3 |
|--------|-------------|-----------|-----------|
| Settlement topics | 5 pillars | 5 pillars + persistent data | 6 pillars (adds visa) |
| Interactive tools | 0 (static content) | 1 (AI chat) | 4 (calculator, visa, scam, router) |
| Persona customisation | Content branching | + persistent profiles | + AI-personalised outputs |
| First Week depth | Shallow task list | + persistent completion | + day-by-day guide |
| Notification system | Non-functional toggles | + email/WhatsApp delivery | + deadline-aware reminders |
| AI features | 0 | 3 (chat, scam, recommender) | + visa personaliser |
| Content update path | Code commits | Google Sheets CMS | Same |

---

## 8. System Prompt Additions for Phase 2

When Phase 2 is activated, add these sections to the project system prompt:

```markdown
### Database
- 15 Supabase tables (schema in Technical Architecture doc)
- RLS on all user-data tables
- JSONB for flexible guide content
- content_versions table for audit trail

### N8N Workflows
- Content Sync (Google Sheets → Supabase) — CORE
- Forex Rate Updater (daily cron) — CORE
- Task Deadline Reminder (daily cron) — CORE
- Onboarding Welcome Email — nice-to-have
- Content Staleness Alert — nice-to-have

### AI Integration
- Retrieval-only Q&A chat (Edge Function → AI API)
- Housing scam analyzer (retrieval + pattern matching)
- Smart task recommender
- CRITICAL GUARDRAIL: AI never generates visa/immigration/legal content

### Content Management
- Google Sheets as CMS for Student 4
- N8N syncs every 6 hours or on edit webhook
- last_verified dates on all content tables
```

---

*"UI first, backend second. Content first, features second. Ship, then improve."*
