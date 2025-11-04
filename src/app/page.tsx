'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Gift, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      title: 'Paid Registration',
      description: 'Unlock your earning potential with a one-time subscription.',
      icon: <DollarSign className="w-8 h-8 text-primary" />,
    },
    {
      title: 'Daily Tasks',
      description: 'Complete simple tasks every day to boost your income.',
      icon: <Zap className="w-8 h-8 text-primary" />,
    },
    {
      title: 'Daily Raffle',
      description: 'Get a chance to win big in our daily raffle draws.',
      icon: <Gift className="w-8 h-8 text-primary" />,
    },
    {
      title: 'Partner Network',
      description: 'Earn more by inviting friends to join the Seedo community.',
      icon: <Users className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-transparent to-green-100 dark:from-blue-900/50 dark:via-transparent dark:to-green-900/50">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-14 max-w-screen-2xl">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">Seedo</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/#features"
              onClick={scrollToFeatures}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Features
            </Link>
            <Link
              href="/#stats"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Stats
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-24 md:py-32 lg:py-40 text-center">
          <div className="container">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400"
            >
              Seedo — Plant tasks. Grow earnings.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl"
            >
              Paid subscription ₦3,000/month. Earn with daily tasks, referrals,
              and the Seedo raffle.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button asChild size="lg">
                <Link href="/register">Join Seedo</Link>
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToFeatures}>
                How it works
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-background/50">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-sm border-white/20 dark:border-black/20 shadow-lg h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
                      {feature.icon}
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="stats" className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Quick Stats</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="p-8 border rounded-lg bg-background/50">
                <p className="text-4xl font-bold text-primary">1,234+</p>
                <p className="mt-2 text-muted-foreground">Active Users</p>
              </div>
              <div className="p-8 border rounded-lg bg-background/50">
                <p className="text-4xl font-bold text-accent">₦500,000+</p>
                <p className="mt-2 text-muted-foreground">in Daily Prizes</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">*Stats are for demonstration purposes.</p>
          </div>
        </section>

      </main>

      <footer className="border-t">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Seedo. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">WhatsApp Support</a>
            <a href="mailto:seedo.earn@gmail.com" className="hover:text-primary">seedo.earn@gmail.com</a>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
