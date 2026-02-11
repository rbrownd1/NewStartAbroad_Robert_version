import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { countries } from '@/data/countries';

const routeLabels: Record<string, string> = {
  uk: 'United Kingdom',
  ca: 'Canada',
  de: 'Germany',
  au: 'Australia',
  plan: 'First 90 days plan',
  'living-essentials': 'Living essentials',
  housing: 'Housing',
  banking: 'Banking & money',
  'sim-mobile': 'SIM & mobile',
  groceries: 'Groceries & daily shopping',
  'health-safety': 'Health & safety',
  'work-study-family': 'Work, study & family',
  'mobility-logistics': 'Mobility & logistics',
  'community-lifestyle': 'Community & lifestyle',
  resources: 'Resources',
  apps: 'Essential apps',
  city: 'Cities',
  onboarding: 'Onboarding',
  persona: 'Persona',
  intake: 'Intake',
  auth: 'Auth',
  login: 'Login',
  signup: 'Sign up',
  profile: 'Profile',
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/' }];

  let path = '';
  segments.forEach((seg) => {
    path += `/${seg}`;
    const label = routeLabels[seg] || countries.find(c => c.code === seg)?.name || seg.charAt(0).toUpperCase() + seg.slice(1);
    crumbs.push({ label, href: path });
  });

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <BreadcrumbItem key={crumb.href}>
                {!isLast ? (
                  <>
                    <BreadcrumbLink asChild>
                      <Link to={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
