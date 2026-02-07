interface AppRecommendationCardProps {
  name: string;
  category: string;
  description: string;
  icon: string;
}

export const AppRecommendationCard = ({ name, category, description, icon }: AppRecommendationCardProps) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-sm transition-shadow">
      <div className="text-3xl flex-shrink-0 h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-foreground">{name}</h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{category}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};