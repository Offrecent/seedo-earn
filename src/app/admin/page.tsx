'use client';

import {
  Activity,
  CheckCircle2,
  DollarSign,
  Loader2,
  Settings,
  Ticket,
  Users,
  Wallet,
  XCircle,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Header from '@/components/header';
import { useUser } from '@/firebase/auth/use-user';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useRouter } from 'next/navigation';
import { doc, getFirestore, writeBatch } from 'firebase/firestore';
import { useFirebaseApp } from '@/firebase';
import { Label } from '@/components/ui/label';
import { useDoc } from '@/firebase';

export default function AdminPage() {
  const { user, userData, loading: userLoading } = useUser();
  const router = useRouter();
  const app = useFirebaseApp();

  const { data: usersData, loading: usersLoading } = useCollection('users');
  const { data: withdrawalsData, loading: withdrawalsLoading } = useCollection('withdrawals');
  const { data: chatMessagesData, loading: chatMessagesLoading } = useCollection('chatMessages');
  const { data: aiLogsData, loading: aiLogsLoading } = useCollection('aiLogs');
  const { data: globalSettingsData, loading: settingsLoading } = useDoc('settings/global');
  
  const totalUsers = usersData?.length || 0;
  const activeSubs = usersData?.filter(u => u.subscription?.status === 'active').length || 0;
  // Placeholder for total income until payments collection is implemented
  const totalIncome = '₦0';
  const pendingWithdrawalsCount = withdrawalsData?.filter(w => w.status === 'pending').length || 0;
  
  const handleUpdateUserStatus = async (userId: string, newStatus: 'active' | 'suspended') => {
      if (!app) return;
      const db = getFirestore(app);
      const userRef = doc(db, 'users', userId);
      try {
        await writeBatch(db).update(userRef, { 'subscription.status': newStatus }).commit();
        alert(`User status updated to ${newStatus}`);
      } catch (error) {
          console.error("Error updating user status: ", error);
          alert("Failed to update user status.");
      }
  };
  
  const handleWithdrawalAction = async (withdrawalId: string, action: 'approved' | 'rejected') => {
      if (!app) return;
      const db = getFirestore(app);
      const withdrawalRef = doc(db, 'withdrawals', withdrawalId);
      try {
        await writeBatch(db).update(withdrawalRef, { status: action, processedAt: new Date() }).commit();
        alert(`Withdrawal has been ${action}.`);
      } catch (error) {
          console.error(`Error ${action} withdrawal: `, error);
          alert(`Failed to ${action} withdrawal.`);
      }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (userData?.role !== 'admin') {
    router.push('/dashboard');
    return <p>Access Denied. Redirecting...</p>;
  }

  const overviewCards = [
    { title: 'Total Users', value: totalUsers, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Active Subs', value: activeSubs, icon: <CheckCircle2 className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Total Income', value: totalIncome, icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Pending Withdrawals', value: pendingWithdrawalsCount, icon: <Wallet className="h-4 w-4 text-muted-foreground" /> },
  ];

  const flaggedMessages = chatMessagesData?.filter(m => m.flagged) || [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, Admin. Manage the Seedo platform from here.
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-8 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="raffles">Raffles</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="ai-logs">AI Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {overviewCards.map((card) => (
                  <Card key={card.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {card.title}
                      </CardTitle>
                      {card.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{card.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8">
                  <Card>
                      <CardHeader>
                          <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground">Activity feed coming soon...</p>
                      </CardContent>
                  </Card>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Search, view, and manage user accounts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                   <Input placeholder="Search users by name, email..." className="mb-4" />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersLoading ? (
                        <TableRow><TableCell colSpan={4} className="text-center"><Loader2 className="animate-spin mx-auto"/></TableCell></TableRow>
                      ) : usersData && usersData.length > 0 ? usersData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.fullName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${user.subscription?.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                              {user.subscription?.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                             <Button variant="outline" size="sm" onClick={() => handleUpdateUserStatus(user.id, user.subscription?.status === 'active' ? 'suspended' : 'active')}>
                                {user.subscription?.status === 'active' ? 'Suspend' : 'Reactivate'}
                             </Button>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow><TableCell colSpan={4} className="text-center">No users found.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="raffles">
                <Card>
                    <CardHeader>
                        <CardTitle>Raffle Management</CardTitle>
                        <Button>Create New Raffle</Button>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">Raffle details and controls will appear here.</p>
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="payments">
                <Card>
                    <CardHeader>
                        <CardTitle>Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">Payment verification and history will appear here.</p>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="withdrawals">
                 <Card>
                    <CardHeader>
                        <CardTitle>Pending Withdrawals</CardTitle>
                        <CardDescription>Approve or reject user withdrawal requests.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {withdrawalsLoading ? (
                                    <TableRow><TableCell colSpan={4} className="text-center"><Loader2 className="animate-spin mx-auto"/></TableCell></TableRow>
                                ) : withdrawalsData?.filter(w => w.status === 'pending').length > 0 ? withdrawalsData.filter(w => w.status === 'pending').map(req => (
                                    <TableRow key={req.id}>
                                        <TableCell className="font-mono">{req.userId}</TableCell>
                                        <TableCell>₦{req.amount.toLocaleString()}</TableCell>
                                        <TableCell>{req.requestedAt.toDate().toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700" onClick={() => handleWithdrawalAction(req.id, 'approved')}>
                                                <CheckCircle2 className="mr-2 h-4 w-4"/> Approve
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleWithdrawalAction(req.id, 'rejected')}>
                                                <XCircle className="mr-2 h-4 w-4"/> Reject
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                     <TableRow><TableCell colSpan={4} className="text-center">No pending withdrawals.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            
             <TabsContent value="chat">
                 <Card>
                    <CardHeader>
                        <CardTitle>Chat Monitor</CardTitle>
                         <CardDescription>Review messages flagged by the moderation AI.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {chatMessagesLoading ? <Loader2 className="animate-spin mx-auto"/> : flaggedMessages.length > 0 ? flaggedMessages.map(msg => (
                            <div key={msg.id} className="border p-4 rounded-lg mb-4">
                                <p><strong>User:</strong> {msg.username}</p>
                                <p><strong>Message:</strong> "{msg.content}"</p>
                                <p className="text-destructive"><strong>Reason:</strong> Potential spam</p>
                                <div className="mt-2 space-x-2">
                                    <Button size="sm" variant="destructive">Delete Message</Button>
                                     <Button size="sm" variant="outline">Warn User</Button>
                                </div>
                            </div>
                        )) : (
                            <p className="text-muted-foreground text-center">No flagged messages.</p>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
            
             <TabsContent value="settings">
                 <Card>
                    <CardHeader>
                        <CardTitle>Global Settings</CardTitle>
                        <CardDescription>Manage platform-wide settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {settingsLoading ? <Loader2 className="animate-spin mx-auto"/> : globalSettingsData ? <>
                        <div className="space-y-2">
                            <Label>WhatsApp Group Link</Label>
                            <Input defaultValue={globalSettingsData.whatsappGroupLink} />
                        </div>
                        <div className="space-y-2">
                            <Label>Default Raffle Prize (₦)</Label>
                            <Input type="number" defaultValue={globalSettingsData.defaultRafflePrize} />
                        </div>
                         <div className="space-y-2">
                            <Label>Ticket Price (₦)</Label>
                            <Input type="number" defaultValue={globalSettingsData.ticketPrice} />
                        </div>
                         <div className="space-y-2">
                            <Label>Max Tickets Per User</Label>
                            <Input type="number" defaultValue={globalSettingsData.maxTicketsPerUser} />
                        </div>
                        <Button>Save Settings</Button>
                        </> : <p>Could not load settings.</p>}
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="ai-logs">
                <Card>
                    <CardHeader>
                        <CardTitle>AI Logs</CardTitle>
                        <CardDescription>Review logs from AI operations and tools.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {aiLogsLoading ? <Loader2 className="animate-spin mx-auto"/> : aiLogsData && aiLogsData.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Timestamp</TableHead>
                                        <TableHead>User ID</TableHead>
                                        <TableHead>Flow</TableHead>
                                        <TableHead>Error</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {aiLogsData.map(log => (
                                        <TableRow key={log.id}>
                                            <TableCell>{log.createdAt.toDate().toLocaleString()}</TableCell>
                                            <TableCell className="font-mono">{log.userId}</TableCell>
                                            <TableCell>{log.flow}</TableCell>
                                            <TableCell className="text-destructive">{log.error}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground">No AI logs found.</p>}
                    </CardContent>
                </Card>
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
}
