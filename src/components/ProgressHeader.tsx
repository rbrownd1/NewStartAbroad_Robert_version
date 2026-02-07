import { Progress } from '@/components/ui/progress';

interface ProgressHeaderProps {
  title: string;
  subtitle?: string;
  progress: number;
}

export const ProgressHeader = ({ title, subtitle, progress }: ProgressHeaderProps) => {
  return (
    <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1">{title}</h1>
      {subtitle && <p className="text-primary-foreground/70 mb-4">{subtitle}</p>}
      <div className="flex items-center gap-4">
        <Progress value={progress} className="flex-1 h-3 bg-primary-foreground/20 [&>div]:bg-coral" />
        <span className="text-lg font-heading font-bold">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};