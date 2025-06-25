"use client";

import { useState } from "react";
import { Bell, User, Search, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  role: "admin" | "staff";
}

export function Navbar({ role }: NavbarProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New task assigned to you",
      time: "5 minutes ago",
    },
    {
      id: 2,
      message: "Project deadline updated",
      time: "1 hour ago",
    },
    {
      id: 3,
      message: "Team meeting scheduled",
      time: "3 hours ago",
    },
  ]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const userName = role === "admin" ? "Ethan Walker" : "Sophia Taylor";
  const userInitials = role === "admin" ? "EW" : "ST";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-background border-b px-4">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 md:w-64 lg:w-80"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                    variant="destructive"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearNotifications}
                    className="h-auto text-xs font-normal"
                  >
                    Clear all
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start p-4"
                  >
                    <div className="font-medium">{notification.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No new notifications
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt={userName} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
