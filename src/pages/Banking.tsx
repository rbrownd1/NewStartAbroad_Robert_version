import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Landmark, CheckCircle, ArrowRightLeft, GraduationCap, Briefcase, Info } from 'lucide-react';
import { banks } from '@/data/mockData';
import { useAppState } from '@/context/AppContext';

const comparisonFeatures = [
  'No monthly fee',
  'Instant notifications',
  'Fee-free spending abroad',
  'Multi-currency account',
  'Savings pots / spaces',
  'Bill splitting',
  'No credit check to open',
  'FSCS protected (£85k)',
];

const bankFeatureMap: Record<string, string[]> = {
  'Monzo': ['No monthly fee', 'Instant notifications', 'Fee-free spending abroad', 'Savings pots / spaces', 'Bill splitting', 'No credit check to open', 'FSCS protected (£85k)'],
  'Starling': ['No monthly fee', 'Instant notifications', 'Fee-free spending abroad', 'Multi-currency account', 'Savings pots / spaces', 'No credit check to open', 'FSCS protected (£85k)'],
  'Revolut': ['No monthly fee', 'Instant notifications', 'Fee-free spending abroad', 'Multi-currency account', 'Savings pots / spaces', 'Bill splitting', 'No credit check to open'],
  'Barclays': ['Instant notifications', 'FSCS protected (£85k)'],
  'HSBC': ['Multi-currency account', 'FSCS protected (£85k)'],
};

const moneyTransferOptions = [
  {
    name: 'Wise (formerly TransferWise)',
    description: 'Best exchange rates using the real mid-market rate. Low, transparent fees. Transfers arrive in 1–2 business days. The most popular choice for Indians in the UK.',
    highlights: ['Real mid-market rate', 'Fees from 0.4%', '1–2 day delivery', 'INR to GBP & reverse'],
  },
  {
    name: 'Revolut',
    description: 'Free international transfers on weekdays (up to a limit on the free plan). Excellent multi-currency wallet for holding GBP, INR, EUR, and more.',
    highlights: ['Free transfers (weekday)', 'Multi-currency wallet', 'Instant between Revolut users', 'Weekend markup applies'],
  },
  {
    name: 'Traditional bank transfer (SWIFT)',
    description: 'Send via your Indian bank (SBI, HDFC, ICICI) using SWIFT. Higher fees and worse exchange rates than Wise/Revolut, but familiar and reliable.',
    highlights: ['Familiar for parents in India', 'Higher fees (£15–£30)', '3–5 day delivery', 'Markup on exchange rate'],
  },
  {
    name: 'Remitly',
    description: 'Popular for sending money back to India from the UK. Competitive rates with express delivery options. First transfer usually fee-free.',
    highlights: ['GBP to INR specialist', 'Express & economy options', 'First transfer free', 'Direct to Indian bank'],
  },
];

const studentBankingTips = [
  { title: 'Student bank accounts', description: 'Barclays and HSBC offer dedicated international student accounts. These may come with interest-free overdrafts and student perks. Bring your CAS letter and university offer to apply.' },
  { title: 'Council tax exemption', description: 'Full-time students are exempt from council tax. Get a council tax exemption letter from your university and send it to your local council.' },
  { title: 'Student discounts', description: 'Register for UNiDAYS and Student Beans for discounts on food, tech, clothing, and more. Your student ID and .ac.uk email unlock many deals.' },
  { title: 'Budgeting on a student loan', description: 'Divide your maintenance loan by the number of weeks in your term. Set weekly spending limits in your Monzo/Starling app. Aim to save 10% for emergencies.' },
];

const professionalBankingTips = [
  { title: 'Salary & payroll', description: 'Share your UK bank sort code and account number with your employer for payroll. Your first salary may take 4–6 weeks depending on payroll cycles.' },
  { title: 'National Insurance (NI)', description: 'Your employer will deduct NI from your salary automatically. Apply for your NI number separately – you can work while waiting for it.' },
  { title: 'Council tax', description: 'Council tax is a local authority charge based on your property band. It ranges from £1,200–£2,500/year. Set up a direct debit to spread payments over 10–12 months.' },
  { title: 'Building UK credit history', description: 'Register on the electoral roll (Commonwealth citizens can register). Use a credit builder card (Loqbox, Tymit) and pay it off in full monthly. Good credit helps with renting and mortgages later.' },
  { title: 'Pension auto-enrolment', description: 'UK employers auto-enrol you into a workplace pension. You contribute 5% and your employer adds 3%. You can opt out, but it is generally worth keeping.' },
];

const Banking = () => {
  const { state } = useAppState();
  const defaultTab = state.persona === 'professional' ? 'professional' : 'student';
  const digitalBanks = banks.filter(b => b.type === 'digital');

  return (
    <Layout>
      <HubHero
        icon={Landmark}
        title="Banking without UK credit history"
        subtitle="Digital and traditional banks that welcome newcomers from India."
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* ── Feature Comparison Matrix ───────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-6">Digital bank comparison</h2>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Feature</th>
                {digitalBanks.map(b => (
                  <th key={b.name} className="text-center py-3 px-4 font-heading font-semibold text-foreground">
                    {b.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map(feature => (
                <tr key={feature} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-4 text-muted-foreground">{feature}</td>
                  {digitalBanks.map(b => (
                    <td key={b.name} className="text-center py-3 px-4">
                      {bankFeatureMap[b.name]?.includes(feature) ? (
                        <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Traditional Banks ───────────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-6">Traditional banks</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {banks.filter(b => b.type === 'traditional').map(bank => (
            <div key={bank.name} className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-heading font-semibold mb-3">{bank.name}</h3>
              <ul className="space-y-2">
                {bank.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Sending Money from India ────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-primary" />
          Sending money from India
        </h2>
        <p className="text-muted-foreground mb-6">Compare the best ways to transfer money between India and the UK.</p>
        <div className="grid gap-4 mb-12">
          {moneyTransferOptions.map(opt => (
            <div key={opt.name} className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-heading font-semibold mb-2">{opt.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{opt.description}</p>
              <div className="flex flex-wrap gap-2">
                {opt.highlights.map(h => (
                  <Badge key={h} variant="secondary" className="text-xs">{h}</Badge>
                ))}
              </div>
            </div>
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
            <h2 className="text-2xl font-heading font-bold mb-6">Banking tips for students</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {studentBankingTips.map(tip => (
                <InfoCard key={tip.title} title={tip.title} description={tip.description} />
              ))}
            </div>

            <Alert className="border-sky-300 bg-sky-50">
              <Info className="h-5 w-5 text-sky-600" />
              <AlertTitle className="text-sky-800">Opening a student bank account</AlertTitle>
              <AlertDescription className="text-sky-900 text-sm">
                <ol className="mt-2 space-y-1.5 list-decimal list-inside">
                  <li>Arrive and collect your BRP from the designated post office.</li>
                  <li>Download Monzo, Starling, or Revolut and sign up with your passport and a selfie.</li>
                  <li>For a traditional student account (Barclays/HSBC), visit a branch with your BRP, CAS letter, and university offer.</li>
                  <li>Transfer funds from India using Wise or your Indian bank's SWIFT transfer.</li>
                  <li>Set up Apple Pay or Google Pay for contactless spending.</li>
                </ol>
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="professional">
            <h2 className="text-2xl font-heading font-bold mb-6">Banking tips for professionals</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {professionalBankingTips.map(tip => (
                <InfoCard key={tip.title} title={tip.title} description={tip.description} />
              ))}
            </div>

            <Alert className="border-sky-300 bg-sky-50">
              <Info className="h-5 w-5 text-sky-600" />
              <AlertTitle className="text-sky-800">Getting started with your salary account</AlertTitle>
              <AlertDescription className="text-sky-900 text-sm">
                <ol className="mt-2 space-y-1.5 list-decimal list-inside">
                  <li>Open a Monzo or Starling account immediately on arrival (no credit check, no proof of address needed).</li>
                  <li>Share your sort code and account number with your employer's HR/payroll team.</li>
                  <li>Apply for your National Insurance number via the DWP helpline (0800 141 2075).</li>
                  <li>Once you receive your first payslip, set up direct debits for rent and utilities.</li>
                  <li>Consider opening a savings account and allocating a percentage of each payslip automatically.</li>
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

export default Banking;
