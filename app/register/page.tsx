
import { Suspense } from 'react';
import RegisterInner from './RegisterInner';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// A fallback component to show while the client component is loading
function RegisterLoading() {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex items-center h-14 max-w-screen-2xl">
                 <span className="font-bold text-lg">Seedo</span>
            </div>
        </header>
        <main className="flex-1 flex items-center justify-center py-12 px-4">
             <Card className="w-full max-w-2xl">
                 <CardHeader>
                    <CardTitle className="text-2xl">Create your Seedo Account</CardTitle>
                    <CardDescription>Join the community and start earning.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center p-16">
                        <Loader2 className="w-16 h-16 animate-spin" />
                    </div>
                </CardContent>
             </Card>
        </main>
      </div>
    )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterInner />
    </Suspense>
  );
}
