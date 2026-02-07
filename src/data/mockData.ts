export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'housing' | 'health' | 'banking' | 'sim' | 'groceries';
  timeframe: 'before' | 'week1' | 'month1' | 'month3';
  persona: 'student' | 'professional' | 'both';
}

export const tasks: Task[] = [
  { id: 't1', title: 'Collect all document originals', description: 'Passport, CAS/CoS, BRP vignette, degree certificates, and financial documents.', category: 'housing', timeframe: 'before', persona: 'both' },
  { id: 't2', title: 'Shortlist 3–5 housing options', description: 'Research housing near your university or office – student halls, shared flats, or mid-term rentals.', category: 'housing', timeframe: 'before', persona: 'both' },
  { id: 't3', title: 'Research digital banks', description: 'Look into Monzo, Starling, and Revolut – they work well for UK newcomers without credit history.', category: 'banking', timeframe: 'before', persona: 'both' },
  { id: 't4', title: 'Download essential apps', description: 'Get Citymapper, WhatsApp, Google Maps, and your chosen bank app before departure.', category: 'sim', timeframe: 'before', persona: 'both' },
  { id: 't5', title: 'Collect your BRP', description: 'Pick up your Biometric Residence Permit within 10 days of arrival from your designated post office.', category: 'housing', timeframe: 'week1', persona: 'both' },
  { id: 't6', title: 'Open a UK bank account', description: "Visit a branch or sign up online for a digital bank. You'll need your BRP and proof of address.", category: 'banking', timeframe: 'week1', persona: 'both' },
  { id: 't7', title: 'Buy a UK SIM card', description: 'Get a SIM with data and international calling to India. Available at airports, supermarkets, or carrier stores.', category: 'sim', timeframe: 'week1', persona: 'both' },
  { id: 't8', title: 'Stock up on basic groceries', description: "Visit Tesco, Sainsbury's, Asda, or Aldi for basics. Look for nearby Indian grocery stores too.", category: 'groceries', timeframe: 'week1', persona: 'both' },
  { id: 't9', title: 'Register with a GP', description: 'Find and register with a local NHS GP surgery. This is free and essential for healthcare access.', category: 'health', timeframe: 'month1', persona: 'both' },
  { id: 't10', title: 'Understand council tax & utilities', description: 'Learn about council tax obligations and set up utility bill payments for your accommodation.', category: 'housing', timeframe: 'month1', persona: 'professional' },
  { id: 't11', title: 'Set up hall payments', description: 'Ensure your student accommodation payments are set up correctly with your university.', category: 'housing', timeframe: 'month1', persona: 'student' },
  { id: 't12', title: 'Set up savings pots & budgeting', description: 'Use your digital bank app to create savings pots and set up budgeting goals.', category: 'banking', timeframe: 'month3', persona: 'both' },
  { id: 't13', title: 'Explore food delivery apps', description: 'Try Deliveroo, Uber Eats, Just Eat, and Getir for convenience and variety.', category: 'groceries', timeframe: 'month3', persona: 'both' },
  { id: 't14', title: 'Get a National Insurance number', description: 'Apply for your NI number – you\'ll need it for work, tax, and benefits.', category: 'banking', timeframe: 'month1', persona: 'professional' },
  { id: 't15', title: 'Explore university health services', description: 'Visit your university health centre and learn about mental health support available.', category: 'health', timeframe: 'month1', persona: 'student' },
];

export const cities = [
  { slug: 'london', name: 'London', costLevel: 'High' as const, description: 'The capital city with world-class universities and endless opportunities.', transport: 'Oyster card, Tube, buses, Overground', neighborhoods: ['Shoreditch', 'Camden', 'Greenwich', 'Stratford', 'Wembley'] },
  { slug: 'manchester', name: 'Manchester', costLevel: 'Medium' as const, description: 'A vibrant northern hub with strong tech and creative industries.', transport: 'Metrolink trams, buses', neighborhoods: ['Fallowfield', 'Didsbury', 'Northern Quarter', 'Salford'] },
  { slug: 'birmingham', name: 'Birmingham', costLevel: 'Medium' as const, description: "England's second city with a diverse community and growing economy.", transport: 'West Midlands Metro, buses', neighborhoods: ['Selly Oak', 'Edgbaston', 'Jewellery Quarter'] },
  { slug: 'edinburgh', name: 'Edinburgh', costLevel: 'Medium-High' as const, description: "Scotland's capital with stunning architecture and top universities.", transport: 'Lothian buses, trams', neighborhoods: ['Marchmont', 'Newington', 'Leith'] },
  { slug: 'glasgow', name: 'Glasgow', costLevel: 'Medium-Low' as const, description: 'Friendly city with great nightlife and affordable living.', transport: 'Subway, buses, trains', neighborhoods: ['West End', 'Merchant City', 'Finnieston'] },
];

export const banks = [
  { name: 'Monzo', type: 'digital' as const, features: ['Instant notifications', 'Fee-free spending abroad', 'Easy signup with passport', 'Savings pots', 'Bill splitting'], forStudents: true, forProfessionals: true },
  { name: 'Starling', type: 'digital' as const, features: ['No monthly fees', 'Multi-currency account', 'Instant notifications', 'Savings spaces', 'Business accounts available'], forStudents: true, forProfessionals: true },
  { name: 'Revolut', type: 'digital' as const, features: ['Multi-currency support', 'Crypto trading', 'Free international transfers', 'Virtual cards', 'Budget analytics'], forStudents: true, forProfessionals: true },
  { name: 'Barclays', type: 'traditional' as const, features: ['Large branch network', 'Student accounts available', 'International banking', 'Barclays app', 'FSCS protected'], forStudents: true, forProfessionals: true },
  { name: 'HSBC', type: 'traditional' as const, features: ['Global presence', 'International student account', 'Premier banking', 'Multi-currency', 'FSCS protected'], forStudents: true, forProfessionals: true },
];

export const apps = [
  { name: 'Citymapper', category: 'Transport', description: 'Best app for navigating public transport in UK cities.', icon: '🗺️' },
  { name: 'Monzo', category: 'Banking', description: 'Digital bank with instant notifications and easy budgeting.', icon: '💳' },
  { name: 'Deliveroo', category: 'Food', description: 'Food delivery from local restaurants.', icon: '🍕' },
  { name: 'Uber Eats', category: 'Food', description: 'Wide range of restaurant deliveries.', icon: '🍔' },
  { name: 'Just Eat', category: 'Food', description: "UK's largest food delivery platform.", icon: '🍜' },
  { name: 'Trainline', category: 'Transport', description: 'Book train tickets at the best prices.', icon: '🚂' },
  { name: 'NHS App', category: 'Health', description: 'Manage GP appointments and prescriptions.', icon: '🏥' },
  { name: 'Tesco Clubcard', category: 'Groceries', description: 'Earn points on your grocery shopping.', icon: '🛒' },
  { name: 'WhatsApp', category: 'Communication', description: 'Stay connected with family back in India.', icon: '💬' },
  { name: 'Wise', category: 'Banking', description: 'Send money internationally at real exchange rates.', icon: '💱' },
  { name: 'SpareRoom', category: 'Housing', description: 'Find flatmates and rooms to rent.', icon: '🏠' },
  { name: 'Rightmove', category: 'Housing', description: 'Search for rental properties across the UK.', icon: '🔑' },
  { name: 'Google Maps', category: 'Transport', description: 'Navigate and explore your new city.', icon: '📍' },
  { name: 'Starling Bank', category: 'Banking', description: 'Fee-free current account with savings spaces.', icon: '⭐' },
];

export const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi'];

export const visaTypes = ['Student', 'Skilled Worker', 'Graduate', 'Dependant', 'Other'];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const timeframeLabels: Record<string, string> = {
  before: 'Before you fly',
  week1: 'First week',
  month1: 'First month',
  month3: 'First three months',
};

export const categoryColors: Record<string, string> = {
  housing: 'bg-primary/10 text-primary',
  health: 'bg-red-50 text-red-600',
  banking: 'bg-amber-50 text-amber-700',
  sim: 'bg-violet-50 text-violet-600',
  groceries: 'bg-emerald-50 text-emerald-600',
};

export const categoryIcons: Record<string, string> = {
  housing: '🏠',
  health: '❤️',
  banking: '🏦',
  sim: '📱',
  groceries: '🛒',
};