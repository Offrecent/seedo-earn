
'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, Loader2 } from 'lucide-react';

export default function RafflePage() {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  // Placeholder data
  const loading = false;
  const currentRaffle = {
      drawTime: new Date(Date.now() + 12 * 60 * 60 * 1000 + 45 * 60 * 1000),
      prizeAmount: 50000,
      ticketPrice: 100,
      maxTicketsPerUser: 10,
  };
  const pastWinners = [
      { id: '1', winnerName: 'Winner One', prizeAmount: 25000, drawTime: new Date(Date.now() - 86400000) },
      { id: '2', winnerName: 'Winner Two', prizeAmount: 25000, drawTime: new Date(Date.now() - 86400000 * 2) },
      { id: '3', winnerName: 'Winner Three', prizeAmount: 25000, drawTime: new Date(Date.now() - 86400000 * 3) },
  ];

  useEffect(() => {
    if (!currentRaffle || !isClient) return;

    const interval = setInterval(() => {
      const now = new Date();
      const drawTime = currentRaffle.drawTime;
      const difference = drawTime.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRaffle, isClient]);

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
                {loading ? <Loader2 className="w-12 h-12 animate-spin mx-auto"/> : currentRaffle && timeLeft && isClient ? (
                    <>
                        <p className="text-5xl font-bold tracking-tighter">
                            {String(timeLeft.hours).padStart(2, '0')}:
                            {String(timeLeft.minutes).padStart(2, '0')}:
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </p>
                        <p className="text-accent font-bold text-lg mt-2">Prize: ₦{currentRaffle.prizeAmount.toLocaleString()}</p>
                    </>
                ) : <p>No active raffle right now.</p>}
                 {!isClient && <Loader2 className="w-12 h-12 animate-spin mx-auto"/>}
            </CardContent>
          </Card>

           <div className="text-center mb-8">
                <Button size="lg" disabled={loading || !currentRaffle}>
                    <Ticket className="mr-2 h-5 w-5" />
                    Buy Tickets
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                    Tickets cost ₦{currentRaffle?.ticketPrice?.toLocaleString() || '...'} each. You can buy up to {currentRaffle?.maxTicketsPerUser || '...'} tickets today.
                </p>
           </div>


           <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Past Winners</h2>
             <div className="grid gap-4 md:grid-cols-3">
                 {loading ? <Loader2 className="animate-spin mx-auto"/> : pastWinners && pastWinners.length > 0 ? pastWinners.map(winner => (
                     <Card key={winner.id}>
                        <CardHeader>
                            <CardTitle className="text-lg">{winner.winnerName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Won <span className="font-bold text-accent">₦{winner.prizeAmount.toLocaleString()}</span></p>
                            <p className="text-xs text-muted-foreground">on {winner.drawTime.toLocaleDateString()}</p>
                        </CardContent>
                     </Card>
                 )) : <p className="text-muted-foreground text-center md:col-span-3">No past winners to show.</p>}
             </div>
           </div>

        </div>
      </main>
    </div>
  );
}
