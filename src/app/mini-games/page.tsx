
'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Puzzle, Ticket, Trophy } from 'lucide-react';

export default function MiniGamesPage() {

    const games = [
        {
            title: 'Daily Quiz',
            description: 'Test your knowledge and earn a bonus.',
            icon: <Puzzle className="w-8 h-8 text-primary"/>,
            cta: 'Play Now'
        },
        {
            title: 'Spin & Win',
            description: 'Try your luck on the wheel for instant prizes.',
            icon: <Trophy className="w-8 h-8 text-primary"/>,
            cta: 'Coming Soon',
            disabled: true
        },
        {
            title: 'Quick Trivia',
            description: 'Answer 5 quick questions to win a raffle ticket.',
            icon: <Ticket className="w-8 h-8 text-primary"/>,
            cta: 'Play Now'
        }
    ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Mini-Games Hub</h1>
            <p className="text-muted-foreground">
              Play fun games, win exciting prizes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {games.map(game => (
                 <Card key={game.title} className="flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold">{game.title}</CardTitle>
                        {game.icon}
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{game.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" disabled={game.disabled}>
                           {game.cta}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
          </div>
          
           <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Game Leaderboards</h2>
             <Card>
                <CardHeader>
                    <CardTitle>Daily Quiz Top Earners</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Leaderboards are coming soon. Check back later to see how you stack up against the competition!</p>
                </CardContent>
             </Card>
           </div>
        </div>
      </main>
    </div>
  );
}
