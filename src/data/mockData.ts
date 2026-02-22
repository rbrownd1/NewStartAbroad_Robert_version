// ─── INTERFACES ───────────────────────────────────────────────

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'housing' | 'health' | 'banking' | 'sim' | 'groceries' | 'admin' | 'lifestyle';
  timeframe: 'before' | 'week1' | 'month1' | 'month3';
  persona: 'student' | 'professional' | 'both';
}

export interface SimCarrier {
  id: string;
  carrier_name: string;
  carrier_type: 'major' | 'mvno';
  plan_type: 'prepaid' | 'contract';
  monthly_cost: string;
  data_allowance: string;
  india_calling_rate: string;
  newcomer_notes: string;
  persona_recommended: ('student' | 'professional')[];
}

export interface HousingType {
  id: string;
  housing_type: string;
  title: string;
  description: string;
  persona: 'student' | 'professional' | 'both';
  pros: string[];
  cons: string[];
  avg_cost_range: string;
  recommended_platforms: string[];
}

export interface HealthGuide {
  id: string;
  persona: 'student' | 'professional' | 'both';
  topic: string;
  title: string;
  content: string;
  steps?: string[];
  official_url?: string;
}

export interface GroceryStore {
  id: string;
  store_type: 'supermarket' | 'indian_asian' | 'delivery_app' | 'discount';
  store_name: string;
  description: string;
  price_level: 'budget' | 'mid' | 'premium';
  delivery_available: boolean;
  indian_products: boolean;
}

export interface ShoppingListItem {
  category: string;
  items: string[];
}

// ─── TASKS (48) ───────────────────────────────────────────────

export const tasks: Task[] = [
  // ── Before you fly ────────────────────────────────────────
  { id: 't1', title: 'Collect all document originals', description: 'Passport, CAS/CoS, BRP vignette, degree certificates, and financial documents.', category: 'admin', timeframe: 'before', persona: 'both' },
  { id: 't2', title: 'Shortlist 3–5 housing options', description: 'Research housing near your university or office – student halls, shared flats, or mid-term rentals.', category: 'housing', timeframe: 'before', persona: 'both' },
  { id: 't3', title: 'Research digital banks', description: 'Look into Monzo, Starling, and Revolut – they work well for UK newcomers without credit history.', category: 'banking', timeframe: 'before', persona: 'both' },
  { id: 't4', title: 'Download essential apps', description: 'Get Citymapper, WhatsApp, Google Maps, and your chosen bank app before departure.', category: 'sim', timeframe: 'before', persona: 'both' },
  { id: 't16', title: 'Buy travel insurance', description: 'Get comprehensive travel insurance covering health, baggage, and trip cancellation for your journey.', category: 'admin', timeframe: 'before', persona: 'both' },
  { id: 't17', title: 'Get passport-sized photos', description: 'Carry at least 6 passport-sized photos (white background) for various UK registrations.', category: 'admin', timeframe: 'before', persona: 'both' },
  { id: 't18', title: 'Arrange airport pickup or transport', description: 'Book a Heathrow Express, National Express coach, or pickup service to your accommodation.', category: 'admin', timeframe: 'before', persona: 'both' },
  { id: 't19', title: 'Pack UK-appropriate clothing', description: 'Pack layers, a waterproof jacket, and comfortable walking shoes. UK weather is unpredictable.', category: 'lifestyle', timeframe: 'before', persona: 'both' },
  { id: 't20', title: 'Inform your Indian bank about travel', description: 'Enable international transactions on your Indian debit/credit cards to avoid blocks on arrival.', category: 'banking', timeframe: 'before', persona: 'both' },
  { id: 't21', title: 'Activate international roaming or buy an eSIM', description: 'Get a temporary eSIM (Airalo, Holafly) or activate roaming so you have data on landing.', category: 'sim', timeframe: 'before', persona: 'both' },
  { id: 't22', title: 'Join university WhatsApp groups', description: 'Connect with your batch on WhatsApp, Facebook, and Reddit before you arrive.', category: 'lifestyle', timeframe: 'before', persona: 'student' },
  { id: 't23', title: "Research your employer's onboarding process", description: 'Understand your start date, dress code, and what documents HR needs on day one.', category: 'admin', timeframe: 'before', persona: 'professional' },
  { id: 't24', title: 'Save emergency contacts', description: 'Save the Indian High Commission, local police, NHS 111, and 999 in your phone.', category: 'admin', timeframe: 'before', persona: 'both' },

  // ── First week ────────────────────────────────────────────
  { id: 't5', title: 'Collect your BRP', description: 'Pick up your Biometric Residence Permit within 10 days of arrival from your designated post office.', category: 'admin', timeframe: 'week1', persona: 'both' },
  { id: 't6', title: 'Open a UK bank account', description: "Visit a branch or sign up online for a digital bank. You'll need your BRP and proof of address.", category: 'banking', timeframe: 'week1', persona: 'both' },
  { id: 't7', title: 'Buy a UK SIM card', description: 'Get a SIM with data and international calling to India. Available at airports, supermarkets, or carrier stores.', category: 'sim', timeframe: 'week1', persona: 'both' },
  { id: 't8', title: 'Stock up on basic groceries', description: "Visit Tesco, Sainsbury's, Asda, or Aldi for basics. Look for nearby Indian grocery stores too.", category: 'groceries', timeframe: 'week1', persona: 'both' },
  { id: 't25', title: 'Complete university enrolment', description: 'Attend enrolment, collect your student ID, and activate your university online account.', category: 'admin', timeframe: 'week1', persona: 'student' },
  { id: 't26', title: 'Get an Oyster card or transport pass', description: 'Buy an Oyster card (London) or local transport pass. Students can get a discounted 18+ Student Oyster.', category: 'admin', timeframe: 'week1', persona: 'both' },
  { id: 't27', title: 'Explore your neighbourhood on foot', description: 'Walk around your area. Locate the nearest supermarket, pharmacy, bus stop, and GP surgery.', category: 'lifestyle', timeframe: 'week1', persona: 'both' },
  { id: 't28', title: 'Buy bedding and kitchen essentials', description: 'Pick up a duvet, pillows, towels, and basic cookware from Primark, Argos, or Wilko.', category: 'groceries', timeframe: 'week1', persona: 'both' },
  { id: 't29', title: 'Activate your bank card', description: 'Set up contactless payments, Apple Pay or Google Pay, and verify your card works at a shop.', category: 'banking', timeframe: 'week1', persona: 'both' },
  { id: 't30', title: 'Register your address with the police', description: 'Some visa holders must register with the local police within 7 days. Check your BRP conditions.', category: 'admin', timeframe: 'week1', persona: 'both' },
  { id: 't31', title: 'Set up Wi-Fi in your accommodation', description: 'Check if Wi-Fi is included. If not, compare BT, Virgin Media, and Sky broadband deals.', category: 'sim', timeframe: 'week1', persona: 'both' },
  { id: 't49', title: 'Report to your employer on day one', description: 'Bring your passport, BRP, and right-to-work documents. Complete HR paperwork and IT setup.', category: 'admin', timeframe: 'week1', persona: 'professional' },

  // ── First month ───────────────────────────────────────────
  { id: 't9', title: 'Register with a GP', description: 'Find and register with a local NHS GP surgery. This is free and essential for healthcare access.', category: 'health', timeframe: 'month1', persona: 'both' },
  { id: 't10', title: 'Understand council tax & utilities', description: 'Learn about council tax obligations and set up utility bill payments for your accommodation.', category: 'housing', timeframe: 'month1', persona: 'professional' },
  { id: 't11', title: 'Set up hall payments', description: 'Ensure your student accommodation payments are set up correctly with your university.', category: 'housing', timeframe: 'month1', persona: 'student' },
  { id: 't14', title: 'Get a National Insurance number', description: "Apply for your NI number – you'll need it for work, tax, and benefits.", category: 'admin', timeframe: 'month1', persona: 'professional' },
  { id: 't15', title: 'Explore university health services', description: 'Visit your university health centre and learn about mental health support available.', category: 'health', timeframe: 'month1', persona: 'student' },
  { id: 't32', title: 'Register with an NHS dentist', description: 'Finding an NHS dentist can take time. Register early or explore private dental plans.', category: 'health', timeframe: 'month1', persona: 'both' },
  { id: 't33', title: 'Open a savings account', description: 'Set up a separate savings account or use savings pots for rent, emergencies, and goals.', category: 'banking', timeframe: 'month1', persona: 'both' },
  { id: 't34', title: 'Get a 16–25 Railcard', description: 'Save a third on train tickets across the UK. Apply online with your student ID.', category: 'admin', timeframe: 'month1', persona: 'student' },
  { id: 't35', title: 'Set up direct debits for bills', description: 'Automate rent, utilities, and subscription payments through your bank app.', category: 'banking', timeframe: 'month1', persona: 'professional' },
  { id: 't36', title: 'Join a gym or sports club', description: 'University gyms are cheap. PureGym and The Gym Group offer no-contract options from £15/month.', category: 'lifestyle', timeframe: 'month1', persona: 'both' },
  { id: 't37', title: 'Explore local Indian community', description: 'Find Indian restaurants, temples, cultural centres, and community Facebook groups in your area.', category: 'lifestyle', timeframe: 'month1', persona: 'both' },
  { id: 't38', title: 'Attend freshers events and join societies', description: "Freshers' week is the best time to meet people. Join at least 2–3 societies that interest you.", category: 'lifestyle', timeframe: 'month1', persona: 'student' },
  { id: 't39', title: 'Apply for council tax exemption', description: 'Full-time students are exempt from council tax. Get a council tax letter from your university.', category: 'admin', timeframe: 'month1', persona: 'student' },

  // ── First three months ────────────────────────────────────
  { id: 't12', title: 'Set up savings pots & budgeting', description: 'Use your digital bank app to create savings pots and set up budgeting goals.', category: 'banking', timeframe: 'month3', persona: 'both' },
  { id: 't13', title: 'Explore food delivery apps', description: 'Try Deliveroo, Uber Eats, Just Eat, and Too Good To Go for convenience and variety.', category: 'groceries', timeframe: 'month3', persona: 'both' },
  { id: 't40', title: 'Build UK credit history', description: 'Use a credit builder card or Loqbox to start building your UK credit score for future renting.', category: 'banking', timeframe: 'month3', persona: 'professional' },
  { id: 't41', title: 'Explore weekend day trips', description: 'Visit nearby cities and countryside. Use your Railcard for discounted off-peak train tickets.', category: 'lifestyle', timeframe: 'month3', persona: 'both' },
  { id: 't42', title: 'Review energy and utility providers', description: 'Compare gas and electricity tariffs on Uswitch or MoneySupermarket for better deals.', category: 'housing', timeframe: 'month3', persona: 'professional' },
  { id: 't43', title: 'Consider switching to a contract SIM', description: 'After a few months you may get better data deals on a 12-month SIM-only contract.', category: 'sim', timeframe: 'month3', persona: 'both' },
  { id: 't44', title: 'Register to vote (if eligible)', description: 'Commonwealth citizens can register to vote in UK elections. Check your eligibility on GOV.UK.', category: 'admin', timeframe: 'month3', persona: 'professional' },
  { id: 't45', title: 'Attend professional networking events', description: 'Join Meetup groups, LinkedIn events, and industry meetups to grow your UK professional network.', category: 'lifestyle', timeframe: 'month3', persona: 'professional' },
  { id: 't46', title: 'Get a library card', description: 'Public libraries are free. Great for books, study spaces, free Wi-Fi, and community events.', category: 'lifestyle', timeframe: 'month3', persona: 'both' },
  { id: 't47', title: 'Send your first remittance home', description: 'Use Wise or Remitly for the best exchange rates when sending money back to India.', category: 'banking', timeframe: 'month3', persona: 'both' },
  { id: 't48', title: 'Book a GP health check', description: 'Schedule a new patient health check with your GP. It is free and helps establish your medical records.', category: 'health', timeframe: 'month3', persona: 'both' },
];

// ─── CITIES (10) ──────────────────────────────────────────────

export const cities = [
  { slug: 'london', name: 'London', costLevel: 'High' as const, description: 'The capital city with world-class universities and endless opportunities.', transport: 'Oyster card, Tube, buses, Overground', neighborhoods: ['Shoreditch', 'Camden', 'Greenwich', 'Stratford', 'Wembley'] },
  { slug: 'manchester', name: 'Manchester', costLevel: 'Medium' as const, description: 'A vibrant northern hub with strong tech and creative industries.', transport: 'Metrolink trams, buses', neighborhoods: ['Fallowfield', 'Didsbury', 'Northern Quarter', 'Salford'] },
  { slug: 'birmingham', name: 'Birmingham', costLevel: 'Medium' as const, description: "England's second city with a diverse community and growing economy.", transport: 'West Midlands Metro, buses', neighborhoods: ['Selly Oak', 'Edgbaston', 'Jewellery Quarter'] },
  { slug: 'edinburgh', name: 'Edinburgh', costLevel: 'Medium-High' as const, description: "Scotland's capital with stunning architecture and top universities.", transport: 'Lothian buses, trams', neighborhoods: ['Marchmont', 'Newington', 'Leith'] },
  { slug: 'glasgow', name: 'Glasgow', costLevel: 'Medium-Low' as const, description: 'Friendly city with great nightlife and affordable living.', transport: 'Subway, buses, trains', neighborhoods: ['West End', 'Merchant City', 'Finnieston'] },
  { slug: 'leeds', name: 'Leeds', costLevel: 'Medium' as const, description: 'Fast-growing northern city with a thriving student scene and financial sector.', transport: 'Buses, trains, cycling routes', neighborhoods: ['Headingley', 'Hyde Park', 'City Centre', 'Chapel Allerton'] },
  { slug: 'bristol', name: 'Bristol', costLevel: 'Medium-High' as const, description: 'Creative, green city with a strong tech sector and vibrant arts scene.', transport: 'First buses, ferries, cycling', neighborhoods: ['Clifton', 'Stokes Croft', 'Harbourside', 'Redland'] },
  { slug: 'nottingham', name: 'Nottingham', costLevel: 'Medium-Low' as const, description: 'Affordable university city with great nightlife and two major universities.', transport: 'Trams (NET), buses', neighborhoods: ['Lenton', 'Beeston', 'Hockley', 'West Bridgford'] },
  { slug: 'liverpool', name: 'Liverpool', costLevel: 'Medium-Low' as const, description: 'Cultural capital with affordable living, rich history, and a welcoming community.', transport: 'Merseyrail, buses', neighborhoods: ['Baltic Triangle', 'Smithdown', 'Georgian Quarter', 'Allerton'] },
  { slug: 'coventry', name: 'Coventry', costLevel: 'Low' as const, description: 'UK City of Culture with two universities and excellent value for money.', transport: 'Buses, National Rail', neighborhoods: ['Earlsdon', 'Canley', 'City Centre', 'Tile Hill'] },
];

// ─── BANKS ────────────────────────────────────────────────────

export const banks = [
  { name: 'Monzo', type: 'digital' as const, features: ['Instant notifications', 'Fee-free spending abroad', 'Easy signup with passport', 'Savings pots', 'Bill splitting'], forStudents: true, forProfessionals: true },
  { name: 'Starling', type: 'digital' as const, features: ['No monthly fees', 'Multi-currency account', 'Instant notifications', 'Savings spaces', 'Business accounts available'], forStudents: true, forProfessionals: true },
  { name: 'Revolut', type: 'digital' as const, features: ['Multi-currency support', 'Crypto trading', 'Free international transfers', 'Virtual cards', 'Budget analytics'], forStudents: true, forProfessionals: true },
  { name: 'Barclays', type: 'traditional' as const, features: ['Large branch network', 'Student accounts available', 'International banking', 'Barclays app', 'FSCS protected'], forStudents: true, forProfessionals: true },
  { name: 'HSBC', type: 'traditional' as const, features: ['Global presence', 'International student account', 'Premier banking', 'Multi-currency', 'FSCS protected'], forStudents: true, forProfessionals: true },
];

// ─── SIM CARRIERS (6) ────────────────────────────────────────

export const simCarriers: SimCarrier[] = [
  {
    id: 'sim1',
    carrier_name: 'Giffgaff',
    carrier_type: 'mvno',
    plan_type: 'prepaid',
    monthly_cost: '£10–£25',
    data_allowance: '15 GB – Unlimited',
    india_calling_rate: '8p/min via app, free on goodybags with int. mins',
    newcomer_notes: 'No credit check needed. Order a free SIM online before you fly. Runs on the O2 network. Community-driven support.',
    persona_recommended: ['student', 'professional'],
  },
  {
    id: 'sim2',
    carrier_name: 'Three',
    carrier_type: 'major',
    plan_type: 'prepaid',
    monthly_cost: '£10–£20',
    data_allowance: '12 GB – Unlimited',
    india_calling_rate: '3p/min with Go Roam add-on',
    newcomer_notes: 'Available at airports and high-street stores. Good 5G coverage in cities. No credit check for prepaid. Popular among students.',
    persona_recommended: ['student'],
  },
  {
    id: 'sim3',
    carrier_name: 'Voxi',
    carrier_type: 'mvno',
    plan_type: 'prepaid',
    monthly_cost: '£10–£30',
    data_allowance: '15 GB – Unlimited',
    india_calling_rate: '25 international mins included on selected plans',
    newcomer_notes: 'Powered by Vodafone network. Endless social media data on all plans. No contract, cancel anytime. Great for heavy social users.',
    persona_recommended: ['student'],
  },
  {
    id: 'sim4',
    carrier_name: 'Lebara',
    carrier_type: 'mvno',
    plan_type: 'prepaid',
    monthly_cost: '£5–£15',
    data_allowance: '5 GB – 15 GB',
    india_calling_rate: '100 international mins included on most plans',
    newcomer_notes: 'Best for cheap calls to India. Runs on Vodafone network. SIM available at corner shops and supermarkets. No credit check.',
    persona_recommended: ['student', 'professional'],
  },
  {
    id: 'sim5',
    carrier_name: 'EE',
    carrier_type: 'major',
    plan_type: 'contract',
    monthly_cost: '£18–£35',
    data_allowance: '25 GB – Unlimited',
    india_calling_rate: 'Add-on required (£5/month for 100 mins)',
    newcomer_notes: 'UK\'s fastest network with best 5G coverage. 12–24 month contracts require credit check and UK address. Best for professionals who need reliable coverage.',
    persona_recommended: ['professional'],
  },
  {
    id: 'sim6',
    carrier_name: 'Vodafone',
    carrier_type: 'major',
    plan_type: 'contract',
    monthly_cost: '£15–£30',
    data_allowance: '25 GB – Unlimited',
    india_calling_rate: 'International add-on from £5/month',
    newcomer_notes: 'Wide UK coverage including rural areas. Pay-as-you-go available for newcomers. Contract plans require credit check after 3+ months in the UK.',
    persona_recommended: ['professional'],
  },
];

// ─── HOUSING TYPES (5) ───────────────────────────────────────

export const housingTypes: HousingType[] = [
  {
    id: 'h1',
    housing_type: 'university_halls',
    title: 'University Halls',
    description: 'Managed accommodation on or near campus with bills included. Ideal for first-year students wanting community and convenience.',
    persona: 'student',
    pros: ['Bills included (water, electricity, Wi-Fi)', 'Close to campus and facilities', 'Built-in social community', 'No UK guarantor needed', 'Secure with 24/7 support'],
    cons: ['Limited room size', 'Shared kitchens and bathrooms (most rooms)', 'Fixed-term contracts (40–51 weeks)', 'No control over flatmates', 'Can be noisy during term time'],
    avg_cost_range: '£120–£250/week',
    recommended_platforms: ['University accommodation portal', 'Unite Students', 'University Living'],
  },
  {
    id: 'h2',
    housing_type: 'private_halls',
    title: 'Private Student Halls (PBSA)',
    description: 'Premium student living operated by private companies. Modern amenities, en-suite rooms, and communal spaces.',
    persona: 'student',
    pros: ['En-suite bathrooms', 'Modern amenities (gym, cinema room, study pods)', 'All bills included', 'City-centre locations', 'Professional management'],
    cons: ['Expensive compared to university halls', 'Can feel impersonal', 'Strict contracts with early termination fees', 'Limited cooking space in studios'],
    avg_cost_range: '£180–£350/week',
    recommended_platforms: ['Unite Students', 'iQ Student', 'Vita Student', 'Student.com'],
  },
  {
    id: 'h3',
    housing_type: 'shared_house',
    title: 'Shared House / Flat',
    description: 'Rent a room in a shared house or flat. Budget-friendly and popular with both students and young professionals.',
    persona: 'both',
    pros: ['Most affordable private option', 'More space than halls', 'Choose your own flatmates', 'Flexible locations', 'Develops independence'],
    cons: ['Bills not usually included', 'UK guarantor often required', 'Shared responsibility for cleaning and bills', 'Risk of unreliable flatmates', 'Deposit required upfront'],
    avg_cost_range: '£400–£800/month (room)',
    recommended_platforms: ['SpareRoom', 'Rightmove', 'OpenRent', 'Zoopla', 'Facebook Marketplace'],
  },
  {
    id: 'h4',
    housing_type: 'studio_flat',
    title: 'Studio Flat',
    description: 'Self-contained unit with your own kitchen and bathroom. More privacy but higher cost. Popular with professionals.',
    persona: 'professional',
    pros: ['Complete privacy', 'Own kitchen and bathroom', 'No flatmate issues', 'Ideal for couples', 'Build your own space'],
    cons: ['Significantly more expensive', 'Can feel isolating when new to the UK', 'Council tax applies', 'Utility bills on top of rent', 'Usually need UK references'],
    avg_cost_range: '£700–£1,500/month',
    recommended_platforms: ['Rightmove', 'Zoopla', 'OpenRent', 'OnTheMarket'],
  },
  {
    id: 'h5',
    housing_type: 'mid_term_rental',
    title: 'Mid-term Rental',
    description: 'Flexible 1–12 month stays via specialist platforms. Furnished, bills included, and bookable from India before arrival.',
    persona: 'both',
    pros: ['Bookable before arrival from India', 'Furnished with bills included', 'Virtual tours available', 'Flexible lease lengths', 'No UK guarantor needed'],
    cons: ['Higher monthly cost than long-term rentals', 'Limited availability in popular areas', 'Smaller selection than traditional market', 'May need to move again after lease ends'],
    avg_cost_range: '£800–£2,000/month',
    recommended_platforms: ['HousingAnywhere', 'Spotahome', 'Nestpick', 'Flatio', 'Homelike'],
  },
];

// ─── HEALTH GUIDES (8) ──────────────────────────────────────

export const healthGuides: HealthGuide[] = [
  {
    id: 'hg1',
    persona: 'both',
    topic: 'nhs_overview',
    title: 'Understanding the NHS',
    content: 'The National Health Service (NHS) provides free healthcare at the point of use for UK residents. As a visa holder who has paid the Immigration Health Surcharge (IHS), you are entitled to the same NHS services as a UK resident, including GP visits, hospital treatment, and prescriptions (prescriptions are free in Scotland, Wales, and Northern Ireland; £9.90 per item in England).',
    official_url: 'https://www.nhs.uk/using-the-nhs/about-the-nhs/',
  },
  {
    id: 'hg2',
    persona: 'both',
    topic: 'gp_registration',
    title: 'How to Register with a GP',
    content: 'Registering with a GP (General Practitioner) is your first step to accessing NHS healthcare. You do not need proof of address or immigration status to register. Walk into any GP surgery near your home and ask to register.',
    steps: [
      'Find a GP near your home using the NHS website or Google Maps',
      'Visit the surgery in person and ask for a registration form (GMS1)',
      'Fill in the form – you do not need proof of address or ID to register',
      'You may be offered a new patient health check (optional but recommended)',
      'You will receive confirmation of registration within a few days',
      'Download the NHS App and link it to your GP for online bookings',
    ],
    official_url: 'https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/',
  },
  {
    id: 'hg3',
    persona: 'both',
    topic: 'emergency_services',
    title: 'Emergency Numbers & Services',
    content: 'In a life-threatening emergency, call 999 (police, ambulance, fire). For urgent but non-emergency medical advice, call 111 – available 24/7. Walk-in urgent care centres and A&E departments handle injuries and acute conditions without appointments. The European emergency number 112 also works in the UK.',
    official_url: 'https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/',
  },
  {
    id: 'hg4',
    persona: 'student',
    topic: 'university_health',
    title: 'University Health Services',
    content: 'Most UK universities have on-campus health centres or dedicated GP surgeries for students. These are often easier to access than local GPs and understand student-specific health issues. Register during freshers week for the quickest access. Many universities also offer free sexual health services and vaccinations.',
    steps: [
      'Check your university website for the on-campus health centre location',
      'Register during freshers week (or as soon as you arrive)',
      'Bring your student ID, passport, and BRP',
      'Ask about available services: GP, nurse, sexual health, vaccinations',
    ],
  },
  {
    id: 'hg5',
    persona: 'both',
    topic: 'mental_health',
    title: 'Mental Health Support',
    content: 'Moving to a new country can be stressful. If you are struggling, reach out. Free NHS counselling is available through self-referral to IAPT (Improving Access to Psychological Therapies). University students have access to free counselling and wellbeing services. Your GP can also refer you to specialist mental health support.',
    steps: [
      'Talk to your GP – they can refer you to NHS talking therapies',
      'Self-refer to IAPT online (no GP referral needed)',
      'Students: contact your university wellbeing or counselling service',
      'Samaritans helpline: 116 123 (free, 24/7, confidential)',
      'Crisis text line: text SHOUT to 85258',
    ],
    official_url: 'https://www.nhs.uk/mental-health/',
  },
  {
    id: 'hg6',
    persona: 'both',
    topic: 'dentist',
    title: 'NHS Dentist Registration',
    content: 'NHS dental care is subsidised but not free. Treatment is charged in three bands: Band 1 (£26.80 for check-up), Band 2 (£73.50 for fillings), Band 3 (£319.10 for crowns/dentures). Finding an NHS dentist accepting new patients can be difficult – register as early as possible. Students in England can apply for an HC2 certificate for help with dental costs.',
    steps: [
      'Search for NHS dentists accepting new patients on the NHS website',
      'Call several practices as availability varies',
      'If no NHS dentist is available, ask to be added to waiting lists',
      'Consider private dental plans (from £10/month) as a backup',
    ],
    official_url: 'https://www.nhs.uk/nhs-services/dentists/',
  },
  {
    id: 'hg7',
    persona: 'both',
    topic: 'pharmacy',
    title: 'Pharmacies & Over-the-Counter Medicines',
    content: 'UK pharmacies (chemists) sell over-the-counter medicines and can advise on minor illnesses without a GP appointment. Boots and Superdrug are the largest chains. Many pharmacies offer flu vaccinations, blood pressure checks, and travel health services. Prescription medicines require a GP prescription.',
    steps: [
      'Find your nearest pharmacy on the NHS website or Google Maps',
      'Ask the pharmacist for advice on minor ailments (cold, headache, allergies)',
      'Popular pharmacy chains: Boots, Superdrug, Lloyds Pharmacy, local independents',
      'Some pharmacies are open late and on weekends – check opening hours',
    ],
  },
  {
    id: 'hg8',
    persona: 'both',
    topic: 'ihs_insurance',
    title: 'Immigration Health Surcharge & Insurance',
    content: 'The Immigration Health Surcharge (IHS) is paid as part of your visa application and gives you access to the NHS. Students pay a reduced rate. Despite having NHS access, consider getting additional insurance for private dental, optical care, and repatriation cover. Many universities include basic insurance in their packages.',
    official_url: 'https://www.gov.uk/healthcare-immigration-application',
  },
];

// ─── GROCERY STORES (13) ─────────────────────────────────────

export const groceryStores: GroceryStore[] = [
  { id: 'gs1', store_type: 'supermarket', store_name: 'Tesco', description: "UK's largest supermarket. Clubcard offers great savings. Wide range including international foods and a decent world food aisle.", price_level: 'mid', delivery_available: true, indian_products: true },
  { id: 'gs2', store_type: 'supermarket', store_name: "Sainsbury's", description: 'Good quality own-brand products with Nectar card rewards. Strong range of Indian ready meals and spices.', price_level: 'mid', delivery_available: true, indian_products: true },
  { id: 'gs3', store_type: 'supermarket', store_name: 'Asda', description: 'Budget-friendly with large stores and good value own-brand lines. Competitive on staples like rice and lentils.', price_level: 'budget', delivery_available: true, indian_products: true },
  { id: 'gs4', store_type: 'discount', store_name: 'Aldi', description: 'Discount supermarket with excellent quality-to-price ratio. Limited but curated range. Great for weekly basics on a student budget.', price_level: 'budget', delivery_available: false, indian_products: false },
  { id: 'gs5', store_type: 'discount', store_name: 'Lidl', description: 'German discount chain similar to Aldi. Excellent bakery section. Weekly special offers on non-food items.', price_level: 'budget', delivery_available: false, indian_products: false },
  { id: 'gs6', store_type: 'supermarket', store_name: 'Morrisons', description: 'Known for fresh produce, in-store butchers, and bakeries. Good value market street counters.', price_level: 'mid', delivery_available: true, indian_products: true },
  { id: 'gs7', store_type: 'supermarket', store_name: 'Waitrose', description: 'Premium supermarket with high-quality products. myWaitrose card gives free tea/coffee. Good for specialty ingredients.', price_level: 'premium', delivery_available: true, indian_products: true },
  { id: 'gs8', store_type: 'supermarket', store_name: 'M&S Food', description: 'Marks & Spencer Food Hall – premium ready meals and specialty items. Excellent quality but higher prices.', price_level: 'premium', delivery_available: true, indian_products: false },
  { id: 'gs9', store_type: 'indian_asian', store_name: 'Local Indian/Asian Stores', description: 'Find authentic spices, lentils, rice, atta, paneer, and ready-made items. Search "Indian grocery" on Google Maps. Much cheaper than supermarkets for staples.', price_level: 'budget', delivery_available: false, indian_products: true },
  { id: 'gs10', store_type: 'indian_asian', store_name: 'Wembley & Southall Stores (London)', description: 'Wembley and Southall have large Indian grocery clusters. Stores like Ealing Road shops offer prices comparable to India. Bulk buying recommended.', price_level: 'budget', delivery_available: false, indian_products: true },
  { id: 'gs11', store_type: 'indian_asian', store_name: 'Tooting & East Ham Stores (London)', description: 'Tooting Broadway and East Ham high streets are packed with Indian and Sri Lankan shops. Fresh vegetables, snacks, and sweets.', price_level: 'budget', delivery_available: false, indian_products: true },
  { id: 'gs12', store_type: 'delivery_app', store_name: 'Deliveroo', description: 'Restaurant and grocery delivery with a wide selection of Indian food options. Deliveroo Plus subscription offers free delivery.', price_level: 'mid', delivery_available: true, indian_products: true },
  { id: 'gs13', store_type: 'delivery_app', store_name: 'Too Good To Go', description: 'Rescue unsold food from restaurants and shops at a third of the price. Magic bags from bakeries and supermarkets. Brilliant for budget-conscious newcomers.', price_level: 'budget', delivery_available: true, indian_products: false },
];

// ─── APPS (28) ────────────────────────────────────────────────

export const apps = [
  // Transport
  { name: 'Citymapper', category: 'Transport', description: 'Best app for navigating public transport in UK cities. Real-time updates and journey planning.', icon: '🗺️' },
  { name: 'TfL Go', category: 'Transport', description: 'Official Transport for London app. Live Tube status, bus arrivals, and journey planner.', icon: '🚇' },
  { name: 'Trainline', category: 'Transport', description: 'Book train tickets at the best prices. Split-ticketing feature saves money on long journeys.', icon: '🚂' },
  { name: 'Google Maps', category: 'Transport', description: 'Navigate and explore your new city. Essential for finding nearby shops, restaurants, and services.', icon: '📍' },
  { name: 'Uber', category: 'Transport', description: 'Ride-hailing for when public transport is not an option. Also offers Uber Eats food delivery.', icon: '🚗' },

  // Banking
  { name: 'Monzo', category: 'Banking', description: 'Digital bank with instant notifications and easy budgeting. Most popular with UK newcomers.', icon: '💳' },
  { name: 'Starling Bank', category: 'Banking', description: 'Fee-free current account with savings spaces and multi-currency support.', icon: '⭐' },
  { name: 'Revolut', category: 'Banking', description: 'Multi-currency support, free international transfers, and budget analytics in one app.', icon: '🔄' },
  { name: 'Wise', category: 'Banking', description: 'Send money to India at real mid-market exchange rates. Much cheaper than traditional bank transfers.', icon: '💱' },
  { name: 'Splitwise', category: 'Banking', description: 'Track shared expenses with flatmates. Perfect for splitting rent, groceries, and utility bills.', icon: '🤝' },

  // Food
  { name: 'Deliveroo', category: 'Food', description: 'Food delivery from local restaurants with a great selection of Indian cuisine.', icon: '🍕' },
  { name: 'Uber Eats', category: 'Food', description: 'Wide range of restaurant deliveries. Regular promotions for new users.', icon: '🍔' },
  { name: 'Just Eat', category: 'Food', description: "UK's largest food delivery platform with budget-friendly options and frequent deals.", icon: '🍜' },
  { name: 'Too Good To Go', category: 'Food', description: 'Rescue surplus food at a third of the price. Magic bags from Pret, Greggs, and local bakeries.', icon: '🥡' },

  // Groceries
  { name: 'Tesco Clubcard', category: 'Groceries', description: 'Earn points on grocery shopping. Clubcard prices offer significant discounts on hundreds of products.', icon: '🛒' },
  { name: "Sainsbury's SmartShop", category: 'Groceries', description: 'Scan as you shop for faster checkout. Nectar card integration for points and personalised offers.', icon: '🧡' },

  // Housing
  { name: 'SpareRoom', category: 'Housing', description: 'Find flatmates and rooms to rent. The most popular flat-share site in the UK.', icon: '🏠' },
  { name: 'Rightmove', category: 'Housing', description: 'Search for rental properties across the UK. Largest property listing site.', icon: '🔑' },
  { name: 'Zoopla', category: 'Housing', description: 'Search rentals with area insights, price estimates, and nearby transport links.', icon: '🏘️' },

  // Health
  { name: 'NHS App', category: 'Health', description: 'Manage GP appointments, order repeat prescriptions, and view your medical records.', icon: '🏥' },

  // Safety
  { name: 'what3words', category: 'Safety', description: 'Share your exact location in an emergency using three unique words. Used by UK emergency services.', icon: '📌' },

  // Communication
  { name: 'WhatsApp', category: 'Communication', description: 'Stay connected with family back in India. Free calls and messages over Wi-Fi or data.', icon: '💬' },

  // Work
  { name: 'Indeed', category: 'Work', description: 'Search for part-time jobs (students) or full-time roles. Set up job alerts for your field.', icon: '💼' },
  { name: 'LinkedIn', category: 'Work', description: 'Professional networking, job hunting, and industry connections in the UK market.', icon: '🔗' },

  // Community
  { name: 'Meetup', category: 'Community', description: 'Find and join local groups for hobbies, networking, and making friends in your new city.', icon: '👋' },

  // Entertainment
  { name: 'BBC iPlayer', category: 'Entertainment', description: 'Free streaming of BBC TV shows, films, and live TV. Requires a UK TV licence.', icon: '📺' },
  { name: 'Skyscanner', category: 'Travel', description: 'Compare cheap flights for trips home or weekend breaks across Europe.', icon: '✈️' },
  { name: 'Olio', category: 'Community', description: 'Free food sharing app. Neighbours share surplus food and household items. Great for saving money.', icon: '🍎' },
];

// ─── WEEK-1 SHOPPING LIST ────────────────────────────────────

export const weekOneShoppingList: ShoppingListItem[] = [
  {
    category: 'Pantry staples',
    items: ['Basmati rice (2 kg)', 'Cooking oil (sunflower or vegetable)', 'Salt', 'Sugar', 'Tea bags or loose chai', 'Atta / chapati flour', 'Toor dal & masoor dal', 'Pasta or noodles', 'Bread (sliced)'],
  },
  {
    category: 'Spices & seasonings',
    items: ['Turmeric powder (haldi)', 'Red chilli powder', 'Cumin seeds (jeera)', 'Coriander powder (dhaniya)', 'Garam masala', 'Mustard seeds (rai)', 'Black pepper'],
  },
  {
    category: 'Fresh produce',
    items: ['Onions (1 kg)', 'Tomatoes', 'Potatoes (1 kg)', 'Garlic & ginger', 'Fresh coriander', 'Green chillies', 'Bananas', 'Apples', 'Milk (2 litres)'],
  },
  {
    category: 'Proteins',
    items: ['Eggs (12 pack)', 'Chicken (if non-vegetarian)', 'Paneer (check Indian stores)', 'Tinned chickpeas or kidney beans', 'Yoghurt'],
  },
  {
    category: 'Household essentials',
    items: ['Washing-up liquid', 'Sponges', 'Kitchen roll', 'Bin bags', 'Toilet paper', 'Hand soap', 'Laundry detergent', 'Cling film or foil'],
  },
  {
    category: 'Personal care',
    items: ['Toothbrush & toothpaste', 'Shampoo & conditioner', 'Shower gel or soap', 'Deodorant', 'Moisturiser (UK weather is drying)', 'Lip balm'],
  },
];

// ─── REFERENCE DATA ──────────────────────────────────────────

export const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi'];

export const visaTypes = ['Student', 'Skilled Worker', 'Graduate', 'Dependant', 'Other'];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const timeframeLabels: Record<string, string> = {
  before: 'Before you fly',
  week1: 'First week',
  month1: 'First month',
  month3: 'First three months',
};

// ─── CATEGORY STYLING ────────────────────────────────────────

export const categoryColors: Record<string, string> = {
  housing: 'bg-primary/10 text-primary',
  health: 'bg-red-50 text-red-600',
  banking: 'bg-amber-50 text-amber-700',
  sim: 'bg-violet-50 text-violet-600',
  groceries: 'bg-emerald-50 text-emerald-600',
  admin: 'bg-sky-50 text-sky-600',
  lifestyle: 'bg-pink-50 text-pink-600',
};

export const categoryIcons: Record<string, string> = {
  housing: '🏠',
  health: '❤️',
  banking: '🏦',
  sim: '📱',
  groceries: '🛒',
  admin: '📋',
  lifestyle: '🎭',
};
