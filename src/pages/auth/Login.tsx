import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
  };

  return (
    <GlobalLayout>
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your NewStartAbroad account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" size="lg">Continue</Button>
          <div className="text-center text-sm">
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
          </div>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account? <Link to="/auth/signup" className="text-primary hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </GlobalLayout>
  );
};

export default Login;
