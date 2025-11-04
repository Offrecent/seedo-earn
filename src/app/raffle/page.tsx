'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from 'lucide-react';

export default function RafflePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
           <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Daily Raffle</h1>
            <p className="text-muted-foreground">
              Your chance to win big every day.
            </p>
          </div>

          <Card className="mb-8 text-center">
            <CardHeader>
                <CardTitle>Next Draw In</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-5xl font-bold tracking-tighter">12:45:30</p>
                <p className="text-accent font-bold text-lg mt-2">Prize: ₦100,000</p>
            </CardContent>
          </Card>

           <div className="text-center mb-8">
                <Button size="lg">
                    <Ticket className="mr-2 h-5 w-5" />
                    Buy Tickets
                </Button>
                <p className="text-sm text-muted-foreground mt-2">Tickets cost ₦1,000 each. You can buy up to 5 tickets today.</p>
           </div>


           <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Past Winners</h2>
             <div className="grid gap-4 md:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">John Doe</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Won <span className="font-bold text-accent">₦50,000</span></p>
                        <p className="text-xs text-muted-foreground">on {new Date().toLocaleDateString()}</p>
                    </CardContent>
                 </Card>
                  <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Jane Smith</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p>Won <span className="font-bold text-accent">₦50,000</span></p>
                        <p className="text-xs text-muted-foreground">on {new Date(Date.now() - 86400000).toLocaleDateString()}</p>
                    </CardContent>
                 </Card>
                  <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Alex Johnson</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p>Won <span className="font-bold text-accent">₦50,000</span></p>
                        <p className="text-xs text-muted-foreground">on {new Date(Date.now() - 2 * 86400000).toLocaleDateString()}</p>
                    </CardContent>
                 </Card>
             </div>
           </div>

        </div>
      </main>
    </div>
  );
}
