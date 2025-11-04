import { cn } from "@/lib/utils";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("font-headline text-2xl font-bold text-primary", className)}>
      Seedo
    </Link>
  );
}
