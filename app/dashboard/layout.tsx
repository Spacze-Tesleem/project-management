"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "../component/sidebar";
import { Navbar } from "../component/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "staff" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Determine role based on URL path
    if (pathname.includes("/dashboard/admin")) {
      setRole("admin");
    } else if (pathname.includes("/dashboard/staff")) {
      setRole("staff");
    } else {
      // If no valid role found in path, redirect to login
      router.push("/login");
      return;
    }
    setIsLoading(false);
  }, [pathname, router]);

  // Show loading state while determining role
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // If no role determined, don't render anything (redirect will happen)
  if (!role) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar with role-specific navigation */}
      <Sidebar role={role} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar with user-specific information */}
        <Navbar role={role} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50 dark:bg-gray-900/50">
          {children}
        </main>
      </div>
    </div>
  );
}
