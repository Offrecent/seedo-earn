
'use client';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password') {
          router.push('/admin');
        } else if (password === 'password') {
          router.push('/dashboard');
        } else {
          setError('Invalid email or password. Please try again.');
        }
      }, 1000);
    });
  };

  const handleForgotPassword = () => {
    setError(null);
    setMessage(null);
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }

    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        setMessage(`A password reset link has been sent to ${email}.`);
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-14 max-w-screen-2xl">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">Seedo</span>
          </Link>
           <nav className="flex items-center gap-6 text-sm ml-auto">
             <Button asChild variant="outline" size="sm">
                <Link href="/">Back to Home</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                  <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Login Failed</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                  </Alert>
              )}
               {message && (
                  <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Info</AlertTitle>
                      <AlertDescription>{message}</AlertDescription>
                  </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button type="button" variant="link" size="sm" className="h-auto p-0" onClick={handleForgotPassword} disabled={isPending}>
                        Forgot password?
                    </Button>
                 </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPending}
                  />
                  <Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 h-full" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="text-center text-sm text-muted-foreground">
             <p>Don't have an account? <Link href="/register" className="text-primary hover:underline">Register now</Link></p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
