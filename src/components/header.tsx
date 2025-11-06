'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Moon, Sun, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    // Simulate logout
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-14 max-w-screen-2xl">
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg">Seedo</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">User Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem onClick={() => router.push('/settings')}>
                <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="h-[1.2rem] w-[1.2rem] mr-2" />
                Light Mode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="h-[1.2rem] w-[1.2rem] mr-2" />
                Dark Mode
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
