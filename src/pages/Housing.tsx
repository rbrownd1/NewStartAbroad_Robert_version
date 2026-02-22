import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Building2, ShieldAlert, FileText, CheckCircle, XCircle } from 'lucide-react';
import { housingTypes } from '@/data/mockData';
import { useAppState } from '@/context/AppContext';

const scamWarnings = [
  'Never pay a deposit or rent before viewing the property in person (or via a verified virtual tour).',
  'Use only established platforms – avoid Gumtree, Facebook Marketplace, or WhatsApp-only listings for your first home.',
  'Check that your deposit is protected by a government-approved Tenancy Deposit Scheme (TDS, DPS, or MyDeposits).',
  'Be suspicious of prices significantly below market rate – if it seems too good to be true, it probably is.',
  'Never send money via Western Union, cryptocurrency, or direct bank transfer to an individual.',
  'Verify the landlord or agency is registered – check Companies House or estate agent redress schemes.',
];

const studentDocs = [
  'Passport & BRP (Biometric Residence Permit)',
  'CAS letter (Confirmation of Acceptance for Studies)',
  'University offer letter',
  'Proof of funding (bank statements or scholarship letter)',
  'Passport-sized photos',
  'Emergency contact details',
];

const professionalDocs = [
  'Passport & BRP (Biometric Residence Permit)',
  'Employment contract or offer letter',
  'Proof of income (payslips or employer letter)',
  'UK bank statements (once available)',
  'References from previous landlords (or employer reference)',
  'Proof of address (utility bill or council tax letter)',
  'National Insurance number (once obtained)',
];

const Housing = () => {
  const { state } = useAppState();
  const defaultTab = state.persona === 'professional' ? 'professional' : 'student';

  const filterHousing = (persona: 'student' | 'professional') =>
    housingTypes.filter(h => h.persona === persona || h.persona === 'both');

  return (
    <Layout>
      <HubHero
        icon={Building2}
        title="Housing for your first months in the UK"
        subtitle="From student halls to private rentals – find the right home for your new start."
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="mb-8 w-full sm:w-auto">
            <TabsTrigger value="student" className="flex-1 sm:flex-none">
              🎓 Student
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex-1 sm:flex-none">
              💼 Professional
            </TabsTrigger>
          </TabsList>

          {/* ── Student Tab ──────────────────────────────────────── */}
          <TabsContent value="student">
            <h2 className="text-2xl font-heading font-bold mb-6">Housing options for students</h2>
            <div className="grid gap-6 mb-12">
              {filterHousing('student').map(h => (
                <div key={h.id} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-lg font-heading font-semibold">{h.title}</h3>
                    <Badge variant="secondary">{h.avg_cost_range}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{h.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-emerald-700 mb-2">Pros</p>
                      <ul className="space-y-1.5">
                        {h.pros.map(p => (
                          <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-600 mb-2">Cons</p>
                      <ul className="space-y-1.5">
                        {h.cons.map(c => (
                          <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-2">Recommended platforms</p>
                    <div className="flex flex-wrap gap-2">
                      {h.recommended_platforms.map(p => (
                        <span key={p} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents for students */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Documents you'll need
              </h2>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {studentDocs.map(d => (
                    <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* ── Professional Tab ─────────────────────────────────── */}
          <TabsContent value="professional">
            <h2 className="text-2xl font-heading font-bold mb-6">Housing options for professionals</h2>
            <div className="grid gap-6 mb-12">
              {filterHousing('professional').map(h => (
                <div key={h.id} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-lg font-heading font-semibold">{h.title}</h3>
                    <Badge variant="secondary">{h.avg_cost_range}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{h.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-emerald-700 mb-2">Pros</p>
                      <ul className="space-y-1.5">
                        {h.pros.map(p => (
                          <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-600 mb-2">Cons</p>
                      <ul className="space-y-1.5">
                        {h.cons.map(c => (
                          <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-2">Recommended platforms</p>
                    <div className="flex flex-wrap gap-2">
                      {h.recommended_platforms.map(p => (
                        <span key={p} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents for professionals */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Documents you'll need
              </h2>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {professionalDocs.map(d => (
                    <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Scam Avoidance (shared) ──────────────────────────── */}
        <div className="mb-12">
          <Alert className="border-amber-300 bg-amber-50">
            <ShieldAlert className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800 font-heading text-lg">Avoid rental scams</AlertTitle>
            <AlertDescription>
              <ul className="mt-3 space-y-2">
                {scamWarnings.map(w => (
                  <li key={w} className="flex items-start gap-2 text-sm text-amber-900">
                    <span className="mt-1 flex-shrink-0">⚠️</span>
                    {w}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        {/* ── Last updated footer ─────────────────────────────── */}
        <p className="text-center text-xs text-muted-foreground">Last updated: February 2026</p>
      </div>
    </Layout>
  );
};

export default Housing;
