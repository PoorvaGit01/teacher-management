"use client";

import React from "react";
import {
  Bell,
  User,
  ChevronDown,
} from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC = () => {
  const user = { name: "John Doe", role: "Administrator", avatar: null };
  const notifications = 3;
  const DropdownMenuOptions = [
    {
      label: "Profile Settings",
      path: "*",
    },
    {
      label: "Help & Support",
      path: "*",
    },
    {
      label: "Sign Out",
      path: "*",
    },
  ];

  return (
    <nav className="w-full bg-[#eb4034] dark:bg-[#eb4038] border-b border-orange-600 dark:border-orange-500 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        <SidebarTrigger />
        <div className="flex items-center space-x-2 sm:space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative p-2 text-white hover:text-orange-100 hover:bg-white/10 rounded-md"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {notifications > 9 ? "9+" : notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 mt-2">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>No Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 p-2 text-white hover:text-orange-100 hover:bg-white/10"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar || ""} alt={user.name} />
                  <AvatarFallback>
                    <User size={16} className="text-orange-600" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium">
                  {user.name}
                </span>
                <ChevronDown
                  size={16}
                  className="hidden sm:block text-orange-100"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2">
              <DropdownMenuLabel>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user.role}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DropdownMenuOptions?.map((opt) => (
                <DropdownMenuItem>
                  <User size={16} className="mr-2" /> {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
