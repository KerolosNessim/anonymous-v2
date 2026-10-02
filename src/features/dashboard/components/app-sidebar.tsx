"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  CreditCardIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  ScanSearchIcon,
  SparklesIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { mockSubscription } from "../constants/mock-account";
import { useNotifications } from "./notifications-provider";
import { useUser } from "./user-provider";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: "notifications";
}

const groups: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { title: "My analyses", href: "/dashboard", icon: LayoutDashboardIcon },
      { title: "New analysis", href: "/dashboard/analysis", icon: ScanSearchIcon },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", href: "/dashboard/profile", icon: UserIcon },
      { title: "Subscription", href: "/dashboard/subscription", icon: CreditCardIcon },
      { title: "Notifications", href: "/dashboard/notifications", icon: BellIcon, badge: "notifications" },
      { title: "Support", href: "/dashboard/support", icon: LifeBuoyIcon },
    ],
  },
];

// Tall items. The active one is filled with the primary (cyan) color.
const itemClass =
  "group/item h-12 gap-3 rounded-xl px-2 text-base font-medium text-sidebar-foreground transition-colors duration-200 hover:bg-sidebar-accent hover:text-white data-[active=true]:bg-sidebar-primary data-[active=true]:font-bold data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-md data-[active=true]:shadow-sidebar-primary/25 data-[active=true]:hover:bg-sidebar-primary data-[active=true]:hover:text-sidebar-primary-foreground";

function NavIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden
      className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 transition-colors group-data-[active=true]/item:bg-sidebar-primary-foreground/10"
    >
      <Icon className="size-5" />
    </span>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();
  const { unreadCount } = useNotifications();
  const { profile } = useUser();
  // on a phone the sidebar is a slide-out sheet, so close it once a link has been chosen
  const { setOpenMobile } = useSidebar();
  const closeMobile = () => setOpenMobile(false);

  // mock usage; this comes from the subscription API later
  const scans = mockSubscription.usage[0];
  const scansPercent = Math.round((scans.used / scans.limit) * 100);

  return (
    <Sidebar>
      <SidebarHeader className="h-16 justify-center border-b border-sidebar-border px-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Anonymous Defenders" className="hover:bg-transparent">
              <Link href="/dashboard" onClick={closeMobile}>
                <Image src="/images/logo.png" alt="Anonymous Defenders" width={140} height={40} priority className="h-9 w-auto object-contain" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-1 py-3">
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[0.7rem] font-bold tracking-widest text-sidebar-foreground/50 uppercase">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title} className={itemClass}>
                      <Link href={item.href} onClick={closeMobile}>
                        <NavIcon icon={item.icon} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge === "notifications" && unreadCount > 0 && (
                      <SidebarMenuBadge
                        aria-label={`${unreadCount} unread`}
                        className="top-1/2! -translate-y-1/2 rounded-full bg-red-500 px-1.5 text-xs font-bold text-white peer-data-[active=true]/menu-button:text-white"
                      >
                        {unreadCount}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to website" className={itemClass}>
                  <Link href="/" onClick={closeMobile}>
                    <NavIcon icon={HomeIcon} />
                    <span>Back to website</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Link
          href="/dashboard/subscription"
          onClick={closeMobile}
          className="relative block space-y-3 overflow-hidden rounded-xl border border-sidebar-border p-3 transition-colors duration-200 hover:border-sidebar-primary/60"
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,224,0.16),transparent_60%)]" />
          <span className="relative flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <SparklesIcon aria-hidden className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-white">{profile.plan} plan</span>
              <span className="block truncate text-xs text-sidebar-foreground/70">Manage your subscription</span>
            </span>
          </span>
          <span className="relative block space-y-1.5">
            <span className="flex justify-between text-xs text-sidebar-foreground/80">
              <span>Scans this month</span>
              <span className="font-mono font-bold text-white">
                {scans.used} / {scans.limit}
              </span>
            </span>
            <Progress value={scansPercent} aria-label={`${scansPercent} percent of scans used`} className="h-1.5 bg-white/10" />
          </span>
        </Link>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
