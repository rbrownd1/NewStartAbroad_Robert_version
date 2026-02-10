import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Building2, Landmark, Menu, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Resources', href: '/resources/apps' },
];

const bottomNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Plan', href: '/plan', icon: ClipboardList },
  { label: 'Housing', href: '/housing', icon: Building2 },
  { label: 'Banking', href: '/banking', icon: Landmark },
  { label: 'More', href: '/resources/apps', icon: MoreHorizontal },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-heading font-bold text-primary tracking-tight">
            NewStart<span className="text-coral">Abroad</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
            <Link to="/onboarding/persona">
              <Button variant="coral" size="sm">Get Started</Button>
            </Link>
          </nav>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map(link => (
                  <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className="text-lg text-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
                <Link to="/onboarding/persona" onClick={() => setOpen(false)}>
                  <Button variant="coral" className="w-full mt-4">Get Started</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <footer className="border-t border-border bg-muted/50 py-8 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2026 NewStartAbroad. All rights reserved.</p>
            <div className="flex gap-6">
              {['FAQ', 'Privacy', 'Terms', 'Contact'].map(item => (
                <Link key={item} to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="flex items-center justify-around h-16">
          {bottomNavItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href} className={`flex flex-col items-center gap-1 text-xs transition-colors ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};