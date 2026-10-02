"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import NotificationsMenu from "./notifications-menu";
import UserMenu from "./user-menu";

const titles: Record<string, string> = {
  "/dashboard": "My analyses",
  "/dashboard/analysis": "New analysis",
  "/dashboard/profile": "Profile",
  "/dashboard/subscription": "Subscription",
  "/dashboard/notifications": "Notifications",
  "/dashboard/support": "Support",
};

export default function DashboardHeader() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-6">
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />

      <SidebarTrigger aria-label="Toggle sidebar" className="-ml-1 size-9 text-foreground hover:bg-primary/10 hover:text-primary" />
      <span aria-hidden className="h-6 w-px shrink-0 bg-border" />

      <Breadcrumb className="min-w-0">
        <BreadcrumbList className="flex-nowrap text-sm sm:text-base">
          <BreadcrumbItem className="hidden sm:inline-flex">
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block" />
          <BreadcrumbItem className="min-w-0">
            <BreadcrumbPage className="truncate font-bold text-primary">{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}
