"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreditCardIcon, LifeBuoyIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "../services/analyses";
import { useUser } from "./user-provider";

export default function UserMenu() {
  const router = useRouter();
  const { profile, fullName, initials } = useUser();
  const [leaving, setLeaving] = useState(false);

  async function handleLogout() {
    setLeaving(true);
    await logout();
    toast.success("You are logged out");
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Account menu for ${fullName}`}
          className="flex cursor-pointer items-center gap-2.5 rounded-full border border-border py-1 pr-1 pl-1 outline-none transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:border-primary sm:pr-4"
        >
          <Avatar>
            <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-bold">{fullName}</span>
            <span className="block text-xs text-muted-foreground">{profile.plan} plan</span>
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={10} className="min-w-60 rounded-xl border border-border">
        <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
          <span className="text-sm font-bold text-foreground">{fullName}</span>
          <span className="text-xs text-muted-foreground">{profile.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <UserIcon />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/subscription">
              <CreditCardIcon />
              Subscription
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/support">
              <LifeBuoyIcon />
              Support
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            disabled={leaving}
            onSelect={(event) => {
              event.preventDefault();
              void handleLogout();
            }}
          >
            <LogOutIcon />
            {leaving ? "Logging out..." : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
