'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/firebase/auth/use-user';
import { Loader2 } from 'lucide-react';

export default function TasksPage() {
    const { user, loading } = useUser();

    // Placeholder data
    const tasks: any[] = [
        // { id: 1, title: 'Follow us on Twitter', payout: '₦100', category: 'Social', status: 'open' },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'submitted':
                return <span className="text-xs font-semibold py-1 px-2 rounded-full bg-yellow-500/20 text-yellow-500">Pending</span>;
            case 'approved':
                return <span className="text-xs font-semibold py-1 px-2 rounded-full bg-green-500/20 text-green-500">Approved</span>;
            case 'rejected':
                 return <span className="text-xs font-semibold py-1 px-2 rounded-full bg-destructive/20 text-destructive">Rejected</span>;
            default:
                return null;
        }
    }
    
    if (loading || !user) {
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Available Tasks</h1>
            <p className="text-muted-foreground">
              Complete tasks to grow your earnings. New tasks added daily.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="riddle">Riddle</TabsTrigger>
              <TabsTrigger value="mega">Mega</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
                <div className="space-y-4">
                    {tasks.length > 0 ? tasks.map(task => (
                         <Card key={task.id}>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>{task.title}</span>
                                    {getStatusBadge(task.status)}
                                </CardTitle>
                                <CardDescription>Payout: <span className="font-bold text-primary">{task.payout}</span></CardDescription>
                            </CardHeader>
                            {task.status === 'rejected' && (
                                <CardContent>
                                    <p className="text-sm text-destructive font-semibold">Admin Note: Proof submitted was not clear. Please try again.</p>
                                </CardContent>
                            )}
                            <CardFooter>
                                <Button disabled={task.status !== 'open'}>
                                    {task.status === 'open' ? 'Submit Proof' : 'View Submission'}
                                </Button>
                            </CardFooter>
                        </Card>
                    )) : (
                        <div className="text-center text-muted-foreground p-8 border rounded-lg">
                           <p>No tasks available right now. Check back later!</p>
                        </div>
                    )}
                </div>
            </TabsContent>
            {/* Add more TabsContent for other categories if needed */}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
