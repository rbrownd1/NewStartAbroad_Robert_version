import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Smartphone, CheckCircle, Phone, Wifi, Zap, Globe, GraduationCap, Briefcase, Info } from 'lucide-react';
import { simCarriers } from '@/data/mockData';
import { useAppState } from '@/context/AppContext';

const prepaidPros = [
  'No credit check – buy on arrival',
  'Available at airports, supermarkets, and corner shops',
  'No contract – cancel or switch anytime',
  'Works with any unlocked phone',
  'Top up as you go or set auto-renew',
];

const contractPros = [
  'Better value for heavy data users',
  'Priority 5G access on major networks',
  'Can include phone upgrades',
  'Consistent monthly billing',
  'Better customer support tiers',
];

const setupChecklist = [
  'Buy a prepaid SIM at the airport or a local supermarket on arrival day.',
  'Insert the SIM and follow the activation instructions (usually via text or app).',
  'Register your SIM online – UK law requires identity verification for PAYG SIMs.',
  'Set up essential apps with your new UK number: bank, NHS, delivery apps.',
  'Download your carrier\'s app to track data usage and top up.',
  'Consider keeping your Indian SIM active (dual-SIM phone or eSIM) for OTPs.',
  'Save your new UK number and share it with family and your university/employer.',
];

const callingIndiaTips = [
  { title: 'WhatsApp & video calls', description: 'Free over Wi-Fi or data. The most popular way Indians in the UK stay in touch. Works perfectly on even 4G connections.' },
  { title: 'Carrier international minutes', description: 'Lebara includes 100 international minutes on most plans. Voxi includes 25 minutes on selected plans. Giffgaff goodybags include international minutes too.' },
  { title: 'International add-ons', description: 'EE and Vodafone offer international calling add-ons from £5/month for 100 minutes. Useful if you prefer traditional calling.' },
  { title: 'Wi-Fi calling', description: 'Most UK carriers support Wi-Fi calling. Enable it in your phone settings for better call quality indoors and to save data.' },
];

const studentSimTips = [
  { title: 'Best student picks', description: 'Giffgaff (£10/month for 15 GB) and Three (£10/month for 12 GB) offer the best value for students. No credit check, no commitment.' },
  { title: 'Endless social media', description: 'Voxi gives you unlimited data for social media apps (Instagram, TikTok, Snapchat, WhatsApp) on all plans – great for staying connected.' },
  { title: 'Campus Wi-Fi', description: 'Most universities offer eduroam Wi-Fi across campus. Connect once and it works at any UK university. Saves your mobile data.' },
  { title: 'Group plans', description: 'Some carriers offer family or group discounts. Ask your flatmates if they want to join the same network for referral bonuses.' },
];

const professionalSimTips = [
  { title: 'Best professional picks', description: 'EE and Vodafone offer the most reliable 5G coverage and business-grade support. Ideal if you depend on your phone for work.' },
  { title: 'Work phone options', description: 'Check if your employer provides a work SIM or phone. Many companies offer a mobile phone allowance as part of their benefits package.' },
  { title: 'Contract timing', description: 'Start with a prepaid SIM, then switch to a 12-month SIM-only contract after 2–3 months when you have a UK bank account and credit footprint.' },
  { title: 'International roaming', description: 'If your role involves European travel, check roaming policies. EE and Three include EU roaming on some plans; others charge daily fees.' },
];

const Sim = () => {
  const { state } = useAppState();
  const defaultTab = state.persona === 'professional' ? 'professional' : 'student';

  const prepaidCarriers = simCarriers.filter(c => c.plan_type === 'prepaid');
  const contractCarriers = simCarriers.filter(c => c.plan_type === 'contract');

  return (
    <Layout>
      <HubHero
        icon={Smartphone}
        title="Stay connected from day one"
        subtitle="Choose the right SIM and mobile plan for your new life in the UK."
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* ── Prepaid vs Contract ───────────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-6">Prepaid vs Contract</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-heading font-semibold">Prepaid (Pay As You Go)</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              No credit check, no contract. Buy a SIM at the airport or supermarket and start using it immediately. Best for your first weeks in the UK.
            </p>
            <ul className="space-y-2">
              {prepaidPros.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />{p}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-heading font-semibold">Contract (Monthly plan)</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Better data deals but requires a UK bank account and credit check. Consider switching after 2–3 months once you're settled.
            </p>
            <ul className="space-y-2">
              {contractPros.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />{p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Carrier Comparison Table ─────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2">Carrier comparison</h2>
        <p className="text-muted-foreground mb-6">All 6 carriers compared side by side – prepaid options first, then contracts.</p>

        {/* Prepaid carriers */}
        <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-violet-500" />
          Prepaid carriers (no credit check)
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Carrier</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Cost/month</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Data</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">India calling</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Best for</th>
              </tr>
            </thead>
            <tbody>
              {prepaidCarriers.map(c => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium">
                    {c.carrier_name}
                    <Badge variant="outline" className="ml-2 text-xs">{c.carrier_type === 'mvno' ? 'MVNO' : 'Major'}</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{c.monthly_cost}</td>
                  <td className="py-3 px-4 text-muted-foreground">{c.data_allowance}</td>
                  <td className="py-3 px-4 text-muted-foreground">{c.india_calling_rate}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {c.persona_recommended.map(p => (
                        <Badge key={p} variant="secondary" className="text-xs capitalize">{p}</Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contract carriers */}
        <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-violet-500" />
          Contract carriers (credit check required)
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Carrier</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Cost/month</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Data</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">India calling</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Best for</th>
              </tr>
            </thead>
            <tbody>
              {contractCarriers.map(c => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium">
                    {c.carrier_name}
                    <Badge variant="outline" className="ml-2 text-xs">Major</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{c.monthly_cost}</td>
                  <td className="py-3 px-4 text-muted-foreground">{c.data_allowance}</td>
                  <td className="py-3 px-4 text-muted-foreground">{c.india_calling_rate}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {c.persona_recommended.map(p => (
                        <Badge key={p} variant="secondary" className="text-xs capitalize">{p}</Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Carrier detail cards (newcomer notes) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {simCarriers.map(c => (
            <div key={c.id} className="p-5 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-semibold">{c.carrier_name}</h4>
                <Badge variant="secondary" className="text-xs">{c.monthly_cost}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{c.newcomer_notes}</p>
            </div>
          ))}
        </div>

        {/* ── SIM Setup Checklist ──────────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
          <Wifi className="h-6 w-6 text-primary" />
          SIM setup checklist
        </h2>
        <div className="space-y-3 mb-12">
          {setupChecklist.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <p className="text-foreground pt-1">{item}</p>
            </div>
          ))}
        </div>

        {/* ── Calling India ────────────────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
          <Phone className="h-6 w-6 text-primary" />
          Calling India
        </h2>
        <p className="text-muted-foreground mb-6">Stay connected with family and friends back home – here are your best options.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {callingIndiaTips.map(tip => (
            <InfoCard key={tip.title} title={tip.title} description={tip.description} />
          ))}
        </div>

        {/* ── Persona-Specific Sections ──────────────────────── */}
        <Tabs defaultValue={defaultTab}>
          <TabsList className="mb-8 w-full sm:w-auto">
            <TabsTrigger value="student" className="flex-1 sm:flex-none">
              <GraduationCap className="h-4 w-4 mr-1.5" />
              Student
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex-1 sm:flex-none">
              <Briefcase className="h-4 w-4 mr-1.5" />
              Professional
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <h2 className="text-2xl font-heading font-bold mb-6">SIM tips for students</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {studentSimTips.map(tip => (
                <InfoCard key={tip.title} title={tip.title} description={tip.description} />
              ))}
            </div>

            <Alert className="border-sky-300 bg-sky-50">
              <Info className="h-5 w-5 text-sky-600" />
              <AlertTitle className="text-sky-800">Quick start for students</AlertTitle>
              <AlertDescription className="text-sky-900 text-sm">
                <ol className="mt-2 space-y-1.5 list-decimal list-inside">
                  <li>Order a free Giffgaff SIM online before you fly (delivered to a UK address or airport pickup).</li>
                  <li>Alternatively, buy a Three or Voxi SIM at Heathrow/Gatwick on arrival.</li>
                  <li>Activate via the carrier's app or website – takes about 5 minutes.</li>
                  <li>Connect to eduroam Wi-Fi on campus to save data from day one.</li>
                  <li>Set up WhatsApp with your new UK number and add your family group chat.</li>
                </ol>
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="professional">
            <h2 className="text-2xl font-heading font-bold mb-6">SIM tips for professionals</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {professionalSimTips.map(tip => (
                <InfoCard key={tip.title} title={tip.title} description={tip.description} />
              ))}
            </div>

            <Alert className="border-sky-300 bg-sky-50">
              <Info className="h-5 w-5 text-sky-600" />
              <AlertTitle className="text-sky-800">Quick start for professionals</AlertTitle>
              <AlertDescription className="text-sky-900 text-sm">
                <ol className="mt-2 space-y-1.5 list-decimal list-inside">
                  <li>Buy a Giffgaff or Three prepaid SIM at the airport on your arrival day.</li>
                  <li>Use this number for your bank account, employer HR, and landlord registration.</li>
                  <li>After 2–3 months, compare 12-month SIM-only contracts from EE or Vodafone for better value.</li>
                  <li>Check if your employer offers a mobile phone allowance or work SIM.</li>
                  <li>Enable Wi-Fi calling at home and in the office for seamless coverage.</li>
                </ol>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        {/* ── Last updated footer ─────────────────────────────── */}
        <p className="text-center text-xs text-muted-foreground mt-12">Last updated: February 2026</p>
      </div>
    </Layout>
  );
};

export default Sim;
