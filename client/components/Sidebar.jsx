"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, User, Trophy, Flag, Settings, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Home Page", icon: Home, href: "/home" },
  { name: "Profile Page", icon: User, href: "/profile" },
  { name: "Contest", icon: Trophy, href: "/contest" },
  { name: "Claim", icon: Flag, href: "/claim" },
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Create", icon: Users, href: "/host" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen fixed left-0 top-0 bg-white text-black border-r border-gray-300 transition-all ${
        isOpen ? "w-52" : "w-18"
      }`}
    >
      {/* Logo & Toggle Button */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <Image src="/logo.png" alt="Logo" width={100} height={30} />
        )}
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 transition-all ${isOpen ? "" : "mx-auto"}`}
        >
          <Menu />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 ml-2 flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 transition rounded-md"
          >
            <item.icon className="w-5 h-5" />
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
