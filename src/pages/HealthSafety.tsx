import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Heart, Stethoscope, Phone, AlertTriangle, GraduationCap, Briefcase,
  Shield, Brain, Pill, SmilePlus, CheckCircle, Info, ExternalLink,
} from 'lucide-react';
import { healthGuides } from '@/data/mockData';
import { useAppState } from '@/context/AppContext';

const HealthSafety = () => {
  const { state } = useAppState();
  const defaultTab = state.persona === 'professional' ? 'professional' : 'student';

  const nhsOverview = healthGuides.find(g => g.topic === 'nhs_overview')!;
  const gpGuide = healthGuides.find(g => g.topic === 'gp_registration')!;
  const emergencyGuide = healthGuides.find(g => g.topic === 'emergency_services')!;
  const uniHealth = healthGuides.find(g => g.topic === 'university_health')!;
  const mentalHealth = healthGuides.find(g => g.topic === 'mental_health')!;
  const dentist = healthGuides.find(g => g.topic === 'dentist')!;
  const pharmacy = healthGuides.find(g => g.topic === 'pharmacy')!;
  const ihsGuide = healthGuides.find(g => g.topic === 'ihs_insurance')!;

  return (
    <Layout>
      <HubHero
        icon={Heart}
        title="Health & safety"
        subtitle="Understand the NHS, register with a doctor, and know your emergency options."
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* ── Emergency Numbers Banner ────────────────────────── */}
        <Alert className="border-red-300 bg-red-50 mb-12">
          <Phone className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-800">Emergency numbers</AlertTitle>
          <AlertDescription className="text-red-900">
            <div className="grid sm:grid-cols-3 gap-4 mt-3">
              <div className="p-3 rounded-xl bg-white/60 text-center">
                <span className="text-2xl font-heading font-bold text-red-700">999</span>
                <p className="text-sm mt-1">Life-threatening emergency (police, ambulance, fire)</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60 text-center">
                <span className="text-2xl font-heading font-bold text-amber-700">111</span>
                <p className="text-sm mt-1">Urgent but non-emergency medical advice (24/7)</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60 text-center">
                <span className="text-2xl font-heading font-bold text-sky-700">112</span>
                <p className="text-sm mt-1">European emergency number (also works in the UK)</p>
              </div>
            </div>
            <p className="text-sm mt-3">{emergencyGuide.content}</p>
          </AlertDescription>
        </Alert>

        {/* ── NHS Overview + IHS ──────────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          Understanding the NHS
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="text-lg font-heading font-semibold mb-3">{nhsOverview.title}</h3>
            <p className="text-sm text-muted-foreground">{nhsOverview.content}</p>
            {nhsOverview.official_url && (
              <a href={nhsOverview.official_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary mt-3 hover:underline">
                NHS official website <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-heading font-semibold">{ihsGuide.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{ihsGuide.content}</p>
            {ihsGuide.official_url && (
              <a href={ihsGuide.official_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary mt-3 hover:underline">
                GOV.UK IHS info <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* ── GP Registration Step-by-Step ────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          How to register with a GP
        </h2>
        <p className="text-muted-foreground mb-6">{gpGuide.content}</p>
        <div className="space-y-3 mb-12">
          {gpGuide.steps!.map((step, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <p className="text-foreground pt-1">{step}</p>
            </div>
          ))}
        </div>

        {/* ── Persona Tabs (Student vs Professional) ──────────── */}
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
            <h2 className="text-2xl font-heading font-bold mb-6">University health services</h2>
            <div className="p-6 rounded-2xl bg-card border border-border mb-6">
              <p className="text-sm text-muted-foreground mb-4">{uniHealth.content}</p>
              {uniHealth.steps && (
                <ul className="space-y-2">
                  {uniHealth.steps.map(step => (
                    <li key={step} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />{step}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <InfoCard title="Campus health centre" description="Register during freshers' week for easy access. On-campus GPs understand student-specific health issues and are easier to get appointments with." />
              <InfoCard title="Free counselling" description="Universities offer free counselling and wellbeing services. Sessions are confidential and can be booked online. Don't wait until you're struggling to reach out." />
              <InfoCard title="Sexual health services" description="Many universities run free sexual health clinics. Free contraception, STI testing, and confidential advice available on campus." />
              <InfoCard title="Vaccination catch-up" description="Meningitis ACWY vaccination is recommended for new students. Your university health centre or GP can arrange this during your first term." />
            </div>

            <Alert className="border-sky-300 bg-sky-50">
              <Info className="h-5 w-5 text-sky-600" />
              <AlertTitle className="text-sky-800">Quick health setup for students</AlertTitle>
              <AlertDescription className="text-sky-900 text-sm">
                <ol className="mt-2 space-y-1.5 list-decimal list-inside">
                  <li>Register at your university health centre during freshers' week.</li>
                  <li>Download the NHS App and link it to your GP practice.</li>
                  <li>Locate your nearest pharmacy and A&E department.</li>
                  <li>Book a new patient health check within your first month.</li>
                  <li>Save your university counselling service number in your phone.</li>
                </ol>
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="professional">
            <h2 className="text-2xl font-heading font-bold mb-6">Workplace health & benefits</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <InfoCard title="Occupational health" description="Many employers offer occupational health assessments, ergonomic workstation setups, and health & safety inductions. Ask HR on your first day." />
              <InfoCard title="Employee assistance programme" description="EAPs provide free, confidential counselling and support for work and personal issues. Check if your employer offers one." />
              <InfoCard title="Private health insurance" description="Some employers offer private medical insurance (PMI) as a benefit. This gives faster access to specialists and private hospitals. Check your benefits package." />
              <InfoCard title="Flexible GP access" description="Choose a GP convenient for your routine. Some offer evening and weekend appointments. Digital GPs like Babylon and Push Doctor offer video consultations." />
            </div>

            <Alert className="border-sky-300 bg-sky-50">
              <Info className="h-5 w-5 text-sky-600" />
              <AlertTitle className="text-sky-800">Quick health setup for professionals</AlertTitle>
              <AlertDescription className="text-sky-900 text-sm">
                <ol className="mt-2 space-y-1.5 list-decimal list-inside">
                  <li>Register with a local GP near your home or office within your first week.</li>
                  <li>Ask HR about private health insurance and employee assistance programmes.</li>
                  <li>Download the NHS App and link it to your GP for online bookings.</li>
                  <li>Register with an NHS dentist early (waiting lists can be long).</li>
                  <li>Schedule a new patient health check to establish your medical records.</li>
                </ol>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        {/* ── Mental Health Resources ─────────────────────────── */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Mental health support
          </h2>
          <p className="text-muted-foreground mb-6">{mentalHealth.content}</p>
          <div className="space-y-3 mb-8">
            {mentalHealth.steps!.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-foreground">{step}</p>
              </div>
            ))}
          </div>
          <Alert className="border-amber-300 bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800">You are not alone</AlertTitle>
            <AlertDescription className="text-amber-900 text-sm">
              Moving to a new country is a big life change. Homesickness, culture shock, and loneliness are completely normal. Reaching out for help is a sign of strength, not weakness. All NHS mental health services are free and confidential.
            </AlertDescription>
          </Alert>
        </div>

        {/* ── Pharmacies & Prescriptions ──────────────────────── */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            Pharmacies & prescriptions
          </h2>
          <p className="text-muted-foreground mb-6">{pharmacy.content}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {pharmacy.steps!.map(step => (
              <div key={step} className="flex items-start gap-2 p-4 rounded-xl bg-card border border-border">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">England prescription cost</p>
              <p className="text-xl font-heading font-bold text-primary">£9.90/item</p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Scotland, Wales & NI</p>
              <p className="text-xl font-heading font-bold text-emerald-600">Free</p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Prepayment certificate</p>
              <p className="text-xl font-heading font-bold text-primary">£30.25/3 months</p>
              <p className="text-xs text-muted-foreground mt-1">Saves money if you need 4+ prescriptions</p>
            </div>
          </div>
        </div>

        {/* ── Dental Care ─────────────────────────────────────── */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
            <SmilePlus className="h-6 w-6 text-primary" />
            Dental care
          </h2>
          <p className="text-muted-foreground mb-6">{dentist.content}</p>
          <div className="space-y-3 mb-6">
            {dentist.steps!.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{i + 1}</span>
                <p className="text-foreground pt-1">{step}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border text-center">
              <Badge variant="secondary" className="mb-2">Band 1</Badge>
              <p className="text-xl font-heading font-bold text-foreground">£26.80</p>
              <p className="text-xs text-muted-foreground mt-1">Check-up, diagnosis, X-rays</p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border text-center">
              <Badge variant="secondary" className="mb-2">Band 2</Badge>
              <p className="text-xl font-heading font-bold text-foreground">£73.50</p>
              <p className="text-xs text-muted-foreground mt-1">Fillings, extractions, root canal</p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border text-center">
              <Badge variant="secondary" className="mb-2">Band 3</Badge>
              <p className="text-xl font-heading font-bold text-foreground">£319.10</p>
              <p className="text-xs text-muted-foreground mt-1">Crowns, dentures, bridges</p>
            </div>
          </div>
          {dentist.official_url && (
            <a href={dentist.official_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary mt-4 hover:underline">
              Find an NHS dentist <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* ── Disclaimer Footer ───────────────────────────────── */}
        <Alert className="border-muted bg-muted/30 mt-12">
          <Info className="h-5 w-5 text-muted-foreground" />
          <AlertTitle className="text-muted-foreground">Disclaimer</AlertTitle>
          <AlertDescription className="text-muted-foreground text-sm">
            This page provides general guidance for newcomers and is not medical advice. Always consult a qualified healthcare professional for personal health concerns. NHS services, costs, and eligibility may change. Information is accurate as of February 2026.
          </AlertDescription>
        </Alert>

        <p className="text-center text-xs text-muted-foreground mt-6">Last updated: February 2026</p>
      </div>
    </Layout>
  );
};

export default HealthSafety;
