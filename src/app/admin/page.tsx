'use client';

import {
  Activity,
  BarChart,
  Bell,
  CheckCircle2,
  DollarSign,
  Eye,
  Settings,
  ShieldAlert,
  Ticket,
  Users,
  Wallet,
  XCircle,
  Bot,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
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

export default function AdminPage() {
  // Placeholder data - to be replaced with real data from Firestore
  const overviewCards = [
    { title: 'Total Users', value: '0', icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Active Subs', value: '0', icon: <CheckCircle2 className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Total Income', value: '₦0', icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Pending Withdrawals', value: '0', icon: <Wallet className="h-4 w-4 text-muted-foreground" /> },
  ];

  const users: any[] = [
    // { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active' },
  ];
  
  const pendingWithdrawals: any[] = [
      // { id: 'wd1', userName: 'John Doe', amount: '₦10,000', date: '2024-10-28' },
  ]
  
  const flaggedMessages: any[] = [
      // { id: 'msg1', userName: 'test_user', message: 'This is a flagged message.', reason: 'Potential spam' },
  ]

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
                      {users.length > 0 ? users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                             <Button variant="outline" size="sm">
                                {user.status === 'Active' ? 'Suspend' : 'Reactivate'}
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
                                    <TableHead>User</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingWithdrawals.length > 0 ? pendingWithdrawals.map(req => (
                                    <TableRow key={req.id}>
                                        <TableCell>{req.userName}</TableCell>
                                        <TableCell>{req.amount}</TableCell>
                                        <TableCell>{req.date}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700">
                                                <CheckCircle2 className="mr-2 h-4 w-4"/> Approve
                                            </Button>
                                            <Button variant="destructive" size="sm">
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
                        {flaggedMessages.length > 0 ? flaggedMessages.map(msg => (
                            <div key={msg.id} className="border p-4 rounded-lg mb-4">
                                <p><strong>User:</strong> {msg.userName}</p>
                                <p><strong>Message:</strong> "{msg.message}"</p>
                                <p className="text-destructive"><strong>Reason:</strong> {msg.reason}</p>
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
                        <div className="space-y-2">
                            <Label>WhatsApp Group Link</Label>
                            <Input defaultValue="https://chat.whatsapp.com/..." />
                        </div>
                        <div className="space-y-2">
                            <Label>Default Raffle Prize (₦)</Label>
                            <Input type="number" defaultValue="50000" />
                        </div>
                        <Button>Save Settings</Button>
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
                        <p className="text-muted-foreground">AI logs will be displayed here...</p>
                    </CardContent>
                </Card>
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
}
