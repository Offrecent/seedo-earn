'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/firebase/auth/use-user';
import { Loader2 } from 'lucide-react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useCollectionQuery } from '@/firebase/firestore/use-collection';

export default function TasksPage() {
    const { user, loading: userLoading } = useUser();
    const firestore = useFirestore();

    const { data: allTasks, loading: allTasksLoading } = useCollection('tasks');
    const userTaskSubmissionsQuery = user && firestore ? query(collection(firestore, 'taskSubmissions'), where('userId', '==', user.uid)) : null;
    const { data: submissions, loading: submissionsLoading } = useCollectionQuery(userTaskSubmissionsQuery);

    const getTaskStatus = (taskId: string) => {
        if (!submissions) return 'open';
        const submission = submissions.find(s => s.taskId === taskId);
        return submission ? submission.status : 'open';
    }

    const getAdminNotes = (taskId: string) => {
        if (!submissions) return null;
        const submission = submissions.find(s => s.taskId === taskId);
        return submission ? submission.adminNotes : null;
    }

    const tasks = allTasks?.map(task => ({
        ...task,
        status: getTaskStatus(task.id),
        adminNotes: getAdminNotes(task.id),
    })) || [];
    
    const loading = userLoading || allTasksLoading || submissionsLoading;

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
    
    if (userLoading || !user) {
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
