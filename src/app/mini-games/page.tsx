'use client';
import Header from '@/components/header';

export default function MiniGamesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
       <Header />
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        Mini Games will be here.
      </main>
    </div>
  );
}
