import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="container mx-auto flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-4 py-16 text-center md:py-24">
      <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        Seedo — Plant tasks. <span className="text-primary">Grow earnings.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
        Paid subscription ₦3,000/month. Earn with daily tasks, referrals, and the Seedo raffle.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/register">Join Seedo</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-2">
          <a href="#features">
            How it works
            <ArrowDown className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
      <div className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-4xl font-bold text-accent">10,000+</p>
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            Active Users
          </p>
        </div>
        <div>
          <p className="text-4xl font-bold text-accent">₦500k+</p>
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            In Daily Prizes
          </p>
        </div>
      </div>
    </section>
  );
}
