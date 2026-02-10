export interface Country {
  code: string;
  name: string;
  flag: string;
  description: string;
  status: 'live' | 'comingSoon';
}

export const countries: Country[] = [
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧', description: 'Optimized for Indian students and professionals moving to the UK.', status: 'live' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦', description: 'Housing, health, banking, and settlement guides for Canada.', status: 'comingSoon' },
  { code: 'de', name: 'Germany', flag: '🇩🇪', description: 'Navigate bureaucracy, housing, and daily life in Germany.', status: 'comingSoon' },
  { code: 'au', name: 'Australia', flag: '🇦🇺', description: 'Your guide to settling down under in Australia.', status: 'comingSoon' },
];

export const futureCountries: Country[] = [
  { code: 'us', name: 'United States', flag: '🇺🇸', description: 'Coming soon.', status: 'comingSoon' },
  { code: 'ae', name: 'UAE', flag: '🇦🇪', description: 'Coming soon.', status: 'comingSoon' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬', description: 'Coming soon.', status: 'comingSoon' },
  { code: 'ie', name: 'Ireland', flag: '🇮🇪', description: 'Coming soon.', status: 'comingSoon' },
  { code: 'nl', name: 'Netherlands', flag: '🇳🇱', description: 'Coming soon.', status: 'comingSoon' },
];
