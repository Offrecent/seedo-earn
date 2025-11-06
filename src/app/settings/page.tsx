
'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { Sun, Moon, LogOut, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function SettingsPage() {
    const { setTheme } = useTheme();
    const router = useRouter();
    
    const [isPending, startTransition] = useTransition();

    // Placeholder data
    const loading = false;
    const user = { uid: 'test-user' };
    const userData = {
        fullName: 'John Doe',
        phone: '08012345678',
        whatsapp: '08012345678',
        subscription: {
            expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
        }
    };

    const handleLogout = () => {
        startTransition(() => {
            setTimeout(() => router.push('/login'), 500);
        });
    };
    
    const handleChangePassword = () => {
      const newPassword = prompt("Please enter your new password:");
      if (newPassword && user) {
        startTransition(() => {
          setTimeout(() => {
            alert("Password updated successfully (simulation)!");
          }, 1000);
        });
      }
    }

    if (loading || !user || !userData) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-16 h-16 animate-spin" />
        </div>
      );
    }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile and application preferences.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue={userData.fullName} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={userData.phone} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input id="whatsapp" defaultValue={userData.whatsapp} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Manage your account settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Subscription</Label>
                        <p className="text-sm text-muted-foreground">Your current plan expires on: <strong>{userData.subscription.expiresAt.toLocaleDateString()}</strong>.</p>
                    </div>
                     <Button variant="outline" onClick={handleChangePassword} disabled={isPending}>
                       {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                       Change Password
                     </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>Customize the look and feel of the app.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                     <Button variant="outline" onClick={() => setTheme('light')} className="w-full flex items-center gap-2">
                        <Sun className="h-5 w-5"/> Light Mode
                     </Button>
                     <Button variant="outline" onClick={() => setTheme('dark')} className="w-full flex items-center gap-2">
                        <Moon className="h-5 w-5"/> Dark Mode
                     </Button>
                </CardContent>
            </Card>
            
             <Card>
                <CardHeader>
                    <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                     <Button variant="secondary" className="w-full">
                        Join our WhatsApp Group
                    </Button>
                </CardContent>
            </Card>
            
             <div className="text-center">
                <Button variant="destructive" onClick={handleLogout} disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <LogOut className="mr-2 h-4 w-4"/>}
                    Logout
                </Button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
