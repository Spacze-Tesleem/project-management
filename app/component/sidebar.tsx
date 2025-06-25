"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  role: "admin" | "staff";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks = [
    {
      name: "Dashboard",
      href: "/dashboard/admin/project-management",
      icon: LayoutDashboard,
    },
    {
      name: "Team Members",
      href: "/dashboard/admin/team-members",
      icon: Users,
    },
    {
      name: "Projects",
      href: "/dashboard/admin/projects",
      icon: FileText,
    },
    {
      name: "Calendar",
      href: "/dashboard/admin/calendar",
      icon: Calendar,
    },
    {
      name: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ];

  const staffLinks = [
    {
      name: "My Tasks",
      href: "/dashboard/staff/project-management",
      icon: LayoutDashboard,
    },
    {
      name: "Calendar",
      href: "/dashboard/staff/calendar",
      icon: Calendar,
    },
    {
      name: "Profile",
      href: "/dashboard/staff/profile",
      icon: Settings,
    },
  ];

  const links = role === "admin" ? adminLinks : staffLinks;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">ProjectHub</h2>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {role === "admin" ? "Admin Dashboard" : "Staff Dashboard"}
        </div>
      </div>
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="mr-3 h-5 w-5" />
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Link href="/">
          <Button variant="outline" className="w-full flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {isMobile ? (
        <div
          className={cn(
            "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="relative w-64 h-full">{sidebarContent}</div>
          {isOpen && (
            <div
              className="absolute inset-0 bg-black/50 z-[-1]"
              onClick={toggleSidebar}
            />
          )}
        </div>
      ) : (
        <div className="w-64 h-full">{sidebarContent}</div>
      )}
    </>
  );
}
