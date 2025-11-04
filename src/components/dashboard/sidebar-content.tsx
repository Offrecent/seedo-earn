"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  LayoutGrid,
  ListChecks,
  LogOut,
  Settings,
  Ticket,
  Users,
  Wallet,
  MessageSquare,
  Swords,
  ShieldQuestion
} from "lucide-react";
import {
  SidebarContent as SidebarContentArea,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "../logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/raffle", label: "Raffle", icon: Ticket },
  { href: "/withdraw", label: "Withdrawals", icon: Wallet },
  { href: "/referrals", label: "Referrals", icon: Users },
  { href: "/chatroom", label: "Chatroom", icon: MessageSquare },
  { href: "/mini-games", label: "Mini Games", icon: Swords },
];

const bottomMenuItems = [
    { href: "/support", label: "Support", icon: ShieldQuestion },
    { href: "/settings", label: "Settings", icon: Settings },
]

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <SidebarContentArea className="flex flex-col">
      <SidebarHeader className="border-b border-sidebar-border">
        <Logo />
      </SidebarHeader>

      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="p-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>

      <SidebarFooter className="border-t border-sidebar-border p-2 mt-auto">
         <SidebarMenu>
            {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                >
                    <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <Separator className="my-2" />
        <SidebarMenuButton tooltip="Profile">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/seed/avatar/100/100" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <span className="font-semibold">User</span>
            <span className="text-xs text-sidebar-foreground/70">user@seedo.com</span>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </SidebarContentArea>
  );
}
