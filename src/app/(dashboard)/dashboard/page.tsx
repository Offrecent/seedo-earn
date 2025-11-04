import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { ArrowUpRight, DollarSign, Users, ListChecks, Ticket, Gift, Link as LinkIcon, Bell } from "lucide-react";
  import Link from "next/link";
  
  export default function DashboardPage() {
    // Mock data
    const user = {
      displayName: "User",
      walletBalance: 12500,
      lockedWelcomeBonus: 4500,
      totalEarnings: 25000,
      referralsCount: 2,
      referralCode: "USER123",
    };
  
    const activeTasks = [
      { id: 1, title: "Share on Social Media", payout: 50 },
      { id: 2, title: "Daily Quiz", payout: 25 },
      { id: 3, title: "Watch a Video Ad", payout: 30 },
    ];

    const notifications = [
        { id: 1, text: "Your withdrawal request of ₦5,000 was approved." },
        { id: 2, text: "You won ₦500 in the daily raffle!" },
        { id: 3, text: "New tasks are available." },
    ];

    const appUrl = "https://seedo.app";
  
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
                Hello, {user.displayName} 👋
            </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Wallet Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{user.walletBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Locked Bonus: ₦{user.lockedWelcomeBonus.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{user.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.referralsCount}</div>
              <p className="text-xs text-muted-foreground">3 needed to unlock bonus</p>
            </CardContent>
          </Card>
           <Card className="bg-accent/20 border-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referral Link</CardTitle>
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {`${appUrl}/register?ref=${user.referralCode}`}
                    </p>
                    <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(`${appUrl}/register?ref=${user.referralCode}`)}>
                        <LinkIcon className="h-4 w-4"/>
                    </Button>
                </div>
              <p className="text-xs text-muted-foreground mt-2">Copy and share your link!</p>
            </CardContent>
          </Card>
        </div>
  
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
              <CardDescription>
                Complete these tasks to earn rewards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between rounded-md border p-3">
                        <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">Reward: <span className="font-semibold text-primary">₦{task.payout}</span></p>
                        </div>
                        <Button asChild size="sm">
                            <Link href="/tasks">Start</Link>
                        </Button>
                    </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/tasks">
                        View All Tasks <ListChecks className="ml-2 h-4 w-4"/>
                    </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
  
          <div className="lg:col-span-3 flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Ticket/> Next Raffle Draw</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="text-4xl font-bold tracking-tighter">10:30:45</div>
                    <p className="text-sm text-muted-foreground">hours : minutes : seconds</p>
                    <Button className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                        <Link href="/raffle">Buy Tickets</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell/> Notifications</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="space-y-3">
                        {notifications.map(n => (
                            <div key={n.id} className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-primary"/>
                                <p className="text-sm text-muted-foreground">{n.text}</p>
                            </div>
                        ))}
                    </div>
                 </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  