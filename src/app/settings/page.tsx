
'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const { setTheme } = useTheme();
    const router = useRouter();
    
    const handleLogout = () => {
        // Placeholder for Firebase logout
        console.log('Logging out...');
        router.push('/login');
    };


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
                        <Input id="fullName" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+2348012345678" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input id="whatsapp" defaultValue="+2348012345678" />
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
                        <p className="text-sm text-muted-foreground">Your current plan expires on: <strong>October 31, 2024</strong>.</p>
                    </div>
                     <Button variant="outline">Change Password</Button>
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
                <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    Logout
                </Button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

