import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
