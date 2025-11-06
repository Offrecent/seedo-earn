'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export default function TasksPage() {
    // Placeholder data
    const loading = false;
    const tasks = [
        { id: '1', title: 'Follow us on Twitter', description: 'Follow our official Twitter account and get rewarded.', payout: 150, category: 'Social', status: 'open', adminNotes: null },
        { id: '2', title: 'Solve the Daily Riddle', description: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?', payout: 200, category: 'Riddle', status: 'open', adminNotes: null },
        { id: '3', title: 'Mega Task: Create a Video', description: 'Create a short video testimonial about Seedo and upload it to YouTube.', payout: 1000, category: 'Mega', status: 'pending', adminNotes: null },
        { id: '4', title: 'Like our Facebook Page', description: 'Like and follow our official page on Facebook.', payout: 150, category: 'Social', status: 'approved', adminNotes: null },
        { id: '5', title: 'Incorrect Submission', description: 'This task was submitted with incorrect proof and was rejected.', payout: 150, category: 'Social', status: 'rejected', adminNotes: 'The screenshot provided was not clear.' },
    ];
    
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <span className="text-xs font-semibold py-1 px-2 rounded-full bg-yellow-500/20 text-yellow-500">Pending</span>;
            case 'approved':
                return <span className="text-xs font-semibold py-1 px-2 rounded-full bg-green-500/20 text-green-500">Approved</span>;
            case 'rejected':
                 return <span className="text-xs font-semibold py-1 px-2 rounded-full bg-destructive/20 text-destructive">Rejected</span>;
            default:
                return null;
        }
    }
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-16 h-16 animate-spin" />
            </div>
        );
    }
    
    const renderTaskList = (filteredTasks: any[]) => {
        if (loading) {
            return (
                <div className="text-center text-muted-foreground p-8 border rounded-lg">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto"/>
                </div>
            );
        }
        
        if (filteredTasks.length === 0) {
            return (
                <div className="text-center text-muted-foreground p-8 border rounded-lg">
                    <p>No tasks available in this category right now. Check back later!</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {filteredTasks.map(task => (
                    <Card key={task.id}>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>{task.title}</span>
                                {getStatusBadge(task.status)}
                            </CardTitle>
                            <CardDescription>Payout: <span className="font-bold text-primary">₦{task.payout}</span></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{task.description}</p>
                            {task.status === 'rejected' && task.adminNotes && (
                                <p className="mt-2 text-sm text-destructive font-semibold">Admin Note: {task.adminNotes}</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button disabled={task.status !== 'open' && task.status !== 'rejected'}>
                                {
                                    task.status === 'open' ? 'Submit Proof' : 
                                    task.status === 'rejected' ? 'Resubmit Proof' : 'View Submission'
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
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
                {renderTaskList(tasks)}
            </TabsContent>
            <TabsContent value="social">
                {renderTaskList(tasks.filter(t => t.category === 'Social'))}
            </TabsContent>
            <TabsContent value="riddle">
                {renderTaskList(tasks.filter(t => t.category === 'Riddle'))}
            </TabsContent>
            <TabsContent value="mega">
                {renderTaskList(tasks.filter(t => t.category === 'Mega'))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
