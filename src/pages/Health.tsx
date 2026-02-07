import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { Heart, Stethoscope, Phone, AlertTriangle, GraduationCap, Briefcase } from 'lucide-react';

const basics = [
  { icon: Stethoscope, title: 'NHS vs Private', description: 'The NHS provides free healthcare at the point of use. Private healthcare offers faster access but costs extra. Most newcomers rely on the NHS.' },
  { icon: Heart, title: 'Register with a GP', description: 'Find a GP surgery near your home. Registration is free – bring your BRP and proof of address. You can then book appointments.' },
  { icon: AlertTriangle, title: 'Emergencies', description: 'Call 999 for life-threatening emergencies. Call 111 for urgent but non-emergency advice. Walk-in centres handle minor injuries without appointments.' },
];

const studentHealth = [
  { emoji: '🏥', title: 'University Health Centre', description: 'Most universities have on-campus health services. Register during freshers\' week for easy access.' },
  { emoji: '🧠', title: 'Mental Health Support', description: 'Free counselling and wellbeing services available through your university. Don\'t hesitate to reach out.' },
];

const professionalHealth = [
  { emoji: '🏢', title: 'Occupational Health', description: 'Your employer may offer health benefits, private insurance, or employee assistance programmes.' },
  { emoji: '📍', title: 'GP Near Home or Office', description: 'Choose a GP that\'s convenient for your daily routine. Some offer evening and weekend appointments.' },
];

const Health = () => {
  return (
    <Layout>
      <HubHero icon={Heart} title="Understand the NHS and stay healthy" subtitle="Everything you need to know about healthcare in the UK." />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-2xl font-heading font-bold mb-6">Healthcare basics</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {basics.map(b => (
            <InfoCard key={b.title} icon={b.icon} title={b.title} description={b.description} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-heading font-bold">For Students</h2>
            </div>
            <div className="space-y-4">
              {studentHealth.map(s => (
                <InfoCard key={s.title} emoji={s.emoji} title={s.title} description={s.description} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-heading font-bold">For Professionals</h2>
            </div>
            <div className="space-y-4">
              {professionalHealth.map(p => (
                <InfoCard key={p.title} emoji={p.emoji} title={p.title} description={p.description} />
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="h-5 w-5 text-primary" />
            <h3 className="font-heading font-semibold text-lg">Emergency numbers</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div><span className="font-semibold text-foreground">999</span> <span className="text-muted-foreground">– Life-threatening emergency</span></div>
            <div><span className="font-semibold text-foreground">111</span> <span className="text-muted-foreground">– Non-emergency medical advice</span></div>
            <div><span className="font-semibold text-foreground">112</span> <span className="text-muted-foreground">– European emergency number</span></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Health;