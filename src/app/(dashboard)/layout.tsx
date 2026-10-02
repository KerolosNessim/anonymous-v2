import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/features/dashboard/components/app-sidebar";
import DashboardHeader from "@/features/dashboard/components/dashboard-header";
import { NotificationsProvider } from "@/features/dashboard/components/notifications-provider";
import { UserProvider } from "@/features/dashboard/components/user-provider";
import { dashboardThemeCss } from "@/features/dashboard/constants/dashboard-theme";
import { listNotifications } from "@/features/dashboard/services/account";
import { getProfile } from "@/features/dashboard/services/profile";

// The dashboard is private, so keep it out of search results.
export const metadata: Metadata = {
  title: "Dashboard | Anonymous",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [notifications, profile] = await Promise.all([listNotifications(), getProfile()]);

  return (
    <>
      <style>{dashboardThemeCss}</style>
      {/* the sidebar's tooltips (shown when it is collapsed to icons) need this provider */}
      <TooltipProvider delayDuration={200}>
        <UserProvider initial={profile}>
          <NotificationsProvider initial={notifications}>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="min-w-0">
                <DashboardHeader />
                {/* SidebarInset is already the <main> landmark */}
                <div className="flex-1 p-4 md:p-6 lg:p-8">{children}</div>
              </SidebarInset>
            </SidebarProvider>
          </NotificationsProvider>
        </UserProvider>
      </TooltipProvider>
      <Toaster position="bottom-right" />
    </>
  );
}
