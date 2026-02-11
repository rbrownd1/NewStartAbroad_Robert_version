import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const navLinks = [
  { label: 'Countries', href: '/#countries' },
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'About', href: '/#about' },
  { label: 'Login', href: '/auth/login' },
  { label: 'Sign up', href: '/auth/signup' },
];

export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-heading font-bold text-primary tracking-tight flex items-center gap-2">
            <Globe className="h-5 w-5" />
            NewStart<span className="text-coral">Abroad</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              link.href.startsWith('/#') ? (
                <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              )
            ))}
            <a href="#countries">
              <Button variant="coral" size="sm">Choose Country</Button>
            </a>
          </nav>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map(link => (
                  link.href.startsWith('/#') ? (
                    <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-lg text-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className="text-lg text-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  )
                ))}
                <a href="#countries" onClick={() => setOpen(false)}>
                  <Button variant="coral" className="w-full mt-4">Choose Country</Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <Breadcrumbs />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-muted/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2026 NewStartAbroad. All rights reserved.</p>
            <div className="flex gap-6">
              {['FAQ', 'Privacy', 'Terms', 'Contact'].map(item => (
                <a key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
