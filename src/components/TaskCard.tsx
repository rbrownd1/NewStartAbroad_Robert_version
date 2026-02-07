import { Check } from 'lucide-react';
import { categoryColors, categoryIcons } from '@/data/mockData';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

export const TaskCard = ({ id, title, description, category, completed, onToggle }: TaskCardProps) => {
  return (
    <div className={`p-4 rounded-xl border transition-all ${completed ? 'bg-muted/50 border-border/50' : 'bg-card border-border hover:shadow-sm'}`}>
      <div className="flex gap-3">
        <button
          onClick={() => onToggle(id)}
          className={`mt-0.5 flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            completed ? 'bg-primary border-primary' : 'border-muted-foreground/30 hover:border-primary'
          }`}
        >
          {completed && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
        </button>
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium mb-1 ${completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {title}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[category] || 'bg-muted text-muted-foreground'}`}>
            {categoryIcons[category]} {category}
          </span>
        </div>
      </div>
    </div>
  );
};