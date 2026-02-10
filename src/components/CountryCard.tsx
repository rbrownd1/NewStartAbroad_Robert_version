import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { Country } from '@/data/countries';

export const CountryCard = ({ code, name, flag, description, status }: Country) => {
  const isLive = status === 'live';

  const content = (
    <div
      className={`relative p-6 rounded-2xl border transition-all h-full flex flex-col ${
        isLive
          ? 'bg-card border-border hover:shadow-lg hover:border-primary/30 cursor-pointer group'
          : 'bg-muted/40 border-border/50 opacity-70 cursor-default'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{flag}</span>
        <Badge variant={isLive ? 'default' : 'secondary'} className="text-xs">
          {isLive ? 'Live' : 'Coming soon'}
        </Badge>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-heading font-semibold">{name}</h3>
        <span className="text-xs text-muted-foreground uppercase font-mono tracking-wider">{code.toUpperCase()}</span>
      </div>
      <p className="text-sm text-muted-foreground flex-1">{description}</p>
      {isLive && (
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Explore <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </div>
  );

  if (isLive) {
    return <Link to={`/${code}`}>{content}</Link>;
  }

  return content;
};
