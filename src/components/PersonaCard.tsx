import { GraduationCap, Briefcase } from 'lucide-react';

interface PersonaCardProps {
  type: 'student' | 'professional';
  selected: boolean;
  onClick: () => void;
}

export const PersonaCard = ({ type, selected, onClick }: PersonaCardProps) => {
  const isStudent = type === 'student';
  const Icon = isStudent ? GraduationCap : Briefcase;

  return (
    <button
      onClick={onClick}
      className={`w-full p-8 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
        selected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-primary/30'
      }`}
    >
      <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-5 ${
        selected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
      }`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-heading font-semibold mb-2">
        {isStudent ? 'Student' : 'Working Professional'}
      </h3>
      <p className="text-muted-foreground">
        {isStudent
          ? 'University or college student moving to the UK for studies.'
          : 'Full-time employee or contractor relocating to the UK for work.'}
      </p>
      {selected && (
        <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
          <div className="h-2 w-2 rounded-full bg-primary" />
          Selected
        </div>
      )}
    </button>
  );
};