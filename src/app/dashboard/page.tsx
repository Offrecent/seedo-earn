'use client';
import Link from 'next/link';
import {
  Activity,
  Award,
  BarChart,
  ChevronRight,
  ClipboardList,
  Contact,
  DollarSign,
  Gift,
  Grid,
  HeartHandshake,
  HelpCircle,
  Home,
  MessageCircle,
  Moon,
  Settings,
  Sun,
  Ticket,
  Users,
  Wallet,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import Header from '@/components/header';

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();

  const summaryCards = [
    {
      title: 'Earnings Summary',
      icon: <Wallet className="w-6 h-6 text-primary" />,
      content: (
        <div>
          <p className="text-2xl font-bold">₦12,500</p>
          <p className="text-xs text-muted-foreground">Total Balance</p>
          <div className="mt-2 text-sm">
            <p>
              Locked Bonus: <span className="font-semibold">₦4,500</span>
            </p>
            <p>
              Total Earned: <span className="font-semibold">₦17,000</span>
            </p>
          </div>
        </div>
      ),
      footerText: 'View wallet',
      link: '/wallet',
    },
    {
      title: 'Referral Stats',
      icon: <Users className="w-6 h-6 text-primary" />,
      content: (
        <div>
          <p className="text-2xl font-bold">5</p>
          <p className="text-xs text-muted-foreground">Successful Referrals</p>
          <Button size="sm" variant="outline" className="mt-2">
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
      description: 'Countdown: 12h 45m 30s',
      link: '/raffle',
      linkText: 'Buy tickets',
    },
  ];

  const navButtons = [
    { href: '/tasks', icon: <ClipboardList />, label: 'Tasks' },
    { href: '/raffle', icon: <Ticket />, label: 'Raffle' },
    { href: '/mini-games', icon: <Grid />, label: 'Games' },
    { href: '/chatroom', icon: <MessageCircle />, label: 'Chat' },
    { href: '/settings', icon: <Settings />, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Hello, User 👋</h1>
            <p className="text-muted-foreground">
              Welcome back to your Seedo dashboard.
            </p>
          </div>

          {/* Grid for summary cards */}
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

          {/* Grid for main cards */}
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
                  {/* Placeholder content for tasks or raffle info */}
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

          {/* Grid for navigation buttons */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
             {navButtons.map((item) => (
                <Link href={item.href} key={item.href}>
                    <div className="p-4 rounded-lg bg-card border hover:bg-muted transition-colors flex flex-col items-center justify-center aspect-square">
                        {item.icon}
                        <span className="text-sm mt-2 font-medium">{item.label}</span>
                    </div>
                </Link>
             ))}
          </div>

        </div>
      </main>

        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        >
          <HelpCircle className="h-8 w-8" />
          <span className="sr-only">Support</span>
        </Button>
    </div>
  );
}
