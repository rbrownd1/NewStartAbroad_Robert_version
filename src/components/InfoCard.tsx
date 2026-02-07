import { type LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const InfoCard = ({ icon: Icon, emoji, title, description, children }: InfoCardProps) => {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
      {(Icon || emoji) && (
        <div className="mb-4">
          {Icon ? (
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          ) : (
            <span className="text-3xl">{emoji}</span>
          )}
        </div>
      )}
      <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {children}
    </div>
  );
};