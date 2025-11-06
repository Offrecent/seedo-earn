'use client';
import Link from 'next/link';
import {
  ClipboardList,
  ChevronRight,
  MessageCircle,
  Settings,
  Ticket,
  Users,
  Wallet,
  Gamepad2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Header from '@/components/header';
import React from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  // Placeholder data
  const loading = false;
  const user = { uid: 'test-user' };
  const userData = {
      fullName: 'John Doe',
      wallet: {
          balance: 12500,
          lockedBonus: 4500,
          totalEarned: 25000,
      },
      referrals: {
          count: 5,
      },
      referralCode: 'john123',
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  const summaryCards = [
    {
      title: 'Earnings Summary',
      icon: <Wallet className="w-6 h-6 text-primary" />,
      content: (
        <div>
          <p className="text-2xl font-bold">₦{userData?.wallet?.balance.toLocaleString() || '0'}</p>
          <p className="text-xs text-muted-foreground">Total Balance</p>
          <div className="mt-2 text-sm">
            <p>
              Locked Bonus: <span className="font-semibold">₦{userData?.wallet?.lockedBonus.toLocaleString() || '0'}</span>
            </p>
            <p>
              Total Earned: <span className="font-semibold">₦{userData?.wallet?.totalEarned.toLocaleString() || '0'}</span>
            </p>
          </div>
        </div>
      ),
      footerText: 'View wallet',
      link: '/withdraw',
    },
    {
      title: 'Referral Stats',
      icon: <Users className="w-6 h-6 text-primary" />,
      content: (
        <div>
          <p className="text-2xl font-bold">{userData?.referrals?.count || 0}</p>
          <p className="text-xs text-muted-foreground">Successful Referrals</p>
          <Button size="sm" variant="outline" className="mt-2" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/register?ref=${userData?.referralCode}`)}>
            Copy Link
          </Button>
        </div>
      ),
      footerText: 'View network',
      link: '/referrals',
    },
  ];

  const mainCards = [
    {
      title: 'Active Tasks',
      icon: <ClipboardList className="w-5 h-5 text-muted-foreground" />,
      description: 'Complete tasks to earn rewards.',
      link: '/tasks',
      linkText: 'View all tasks',
    },
    {
      title: 'Next Raffle Draw',
      icon: <Ticket className="w-5 h-5 text-muted-foreground" />,
      description: 'Countdown: 12h 45m 30s', // Placeholder
      link: '/raffle',
      linkText: 'Buy tickets',
    },
  ];

  const navButtons = [
    { href: '/tasks', icon: <ClipboardList />, label: 'Tasks' },
    { href: '/raffle', icon: <Ticket />, label: 'Raffle' },
    { href: '/mini-games', icon: <Gamepad2 />, label: 'Games' },
    { href: '/chatroom', icon: <MessageCircle />, label: 'Chat' },
    { href: '/settings', icon: <Settings />, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Hello, {userData?.fullName?.split(' ')[0] || 'User'} 👋</h1>
            <p className="text-muted-foreground">
              Welcome back to your Seedo dashboard.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {summaryCards.map((card) => (
              <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  {card.icon}
                </CardHeader>
                <CardContent>{card.content}</CardContent>
                <CardFooter>
                  <Link
                    href={card.link}
                    className="text-xs text-muted-foreground flex items-center hover:text-primary"
                  >
                    {card.footerText} <ChevronRight className="w-3 h-3 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {mainCards.map((card) => (
              <Card key={card.title}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {card.icon}
                    <CardTitle className="text-md font-semibold">{card.title}</CardTitle>
                  </div>
                   <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  
                </CardContent>
                 <CardFooter>
                  <Button asChild variant="outline">
                    <Link href={card.link}>
                        {card.linkText}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
             {navButtons.map((item) => (
                <Link href={item.href} key={item.href}>
                    <div className="p-4 rounded-lg bg-card border hover:bg-muted transition-colors flex flex-col items-center justify-center aspect-square">
                        {item.icon && React.cloneElement(item.icon, { className: 'w-8 h-8' })}
                        <span className="text-sm mt-2 font-medium">{item.label}</span>
                    </div>
                </Link>
             ))}
          </div>

        </div>
      </main>
    </div>
  );
}
