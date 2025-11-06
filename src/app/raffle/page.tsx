'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { Loader2 } from 'lucide-react';
import { useCollection } from '@/firebase';

export default function RafflePage() {
  const { user, loading: userLoading } = useUser();
  const { data: raffles, loading: rafflesLoading } = useCollection('raffles');
  const { data: pastWinnersData, loading: pastWinnersLoading } = useCollection('users'); // This is not ideal, should be a dedicated 'winners' collection

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const currentRaffle = raffles?.find(r => r.status === 'open');

  useEffect(() => {
    if (!currentRaffle) return;

    const interval = setInterval(() => {
      const now = new Date();
      const drawTime = currentRaffle.drawTime.toDate();
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
  }, [currentRaffle]);

  if (userLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }
  
  const loading = userLoading || rafflesLoading || pastWinnersLoading;
  
  const pastWinners = raffles?.filter(r => r.status === 'completed' && r.winnerId).slice(0, 3).map(r => {
      const winner = pastWinnersData?.find(u => u.id === r.winnerId);
      return { ...r, winnerName: winner?.fullName || 'Unknown Winner' };
  });

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
                {loading ? <Loader2 className="w-12 h-12 animate-spin mx-auto"/> : currentRaffle ? (
                    <>
                        <p className="text-5xl font-bold tracking-tighter">
                            {String(timeLeft.hours).padStart(2, '0')}:
                            {String(timeLeft.minutes).padStart(2, '0')}:
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </p>
                        <p className="text-accent font-bold text-lg mt-2">Prize: ₦{currentRaffle.prizeAmount.toLocaleString()}</p>
                    </>
                ) : <p>No active raffle right now.</p>}
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
                            <p className="text-xs text-muted-foreground">on {winner.drawTime.toDate().toLocaleDateString()}</p>
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
