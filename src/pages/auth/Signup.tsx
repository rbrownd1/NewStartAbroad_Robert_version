import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cities } from '@/data/mockData';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', persona: '', city: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground">Start planning your first 90 days in the UK</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-email">Email</Label>
            <Input id="s-email" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-password">Password</Label>
            <Input id="s-password" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>I am a…</Label>
            <Select value={form.persona} onValueChange={v => setForm(p => ({ ...p, persona: v }))}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="professional">Working Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Destination city</Label>
            <Select value={form.city} onValueChange={v => setForm(p => ({ ...p, city: v }))}>
              <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
              <SelectContent>
                {cities.map(c => <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" size="lg">Create account</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/uk/auth/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Signup;
