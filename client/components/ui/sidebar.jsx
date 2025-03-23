// ui/sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Trophy,
  Flag,
  Settings,
  Users,
  Menu,
  ChevronsUpDown,
  Image as ImageIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Add the CSS for the fancy border
const fancyBorderStyles = `

  @keyframes borderPulse {
    0% {
      box-shadow: 4px 0 15px -3px rgba(0, 0, 0, 0.1), 1px 0 2px -1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(59, 130, 246, 0.1);
    }
    50% {
      box-shadow: 4px 0 18px -3px rgba(37, 99, 235, 0.15), 1px 0 3px -1px rgba(37, 99, 235, 0.08), 0 0 0 1px rgba(59, 130, 246, 0.2);
    }
    100% {
      box-shadow: 4px 0 15px -3px rgba(0, 0, 0, 0.1), 1px 0 2px -1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(59, 130, 246, 0.1);
    }
  }

  .sidebar-fancy-border.open {
    position: relative;
    animation: borderPulse 4s infinite;
    height: 100vh !important;
    min-height: 100vh;
  }
  
  .sidebar-fancy-border.closed {
    position: relative;
    box-shadow: 4px 0 15px -3px rgba(0, 0, 0, 0.1), 1px 0 2px -1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(59, 130, 246, 0.1);
    height: 100vh !important;
    min-height: 100vh;
  }

  .sidebar-fancy-border.closed::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(59, 130, 246, 0.03),
      rgba(59, 130, 246, 0.1) 20%,
      rgba(99, 102, 241, 0.15) 50%,
      rgba(59, 130, 246, 0.1) 80%,
      rgba(59, 130, 246, 0.03)
    );
  }

  .sidebar-fancy-border.open::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(59, 130, 246, 0.05),
      rgba(59, 130, 246, 0.2) 20%,
      rgba(99, 102, 241, 0.3) 50%,
      rgba(59, 130, 246, 0.2) 80%,
      rgba(59, 130, 246, 0.05)
    );
  }
  .dark .sidebar-fancy-border.open::after {
    background: linear-gradient(to bottom, 
      rgba(59, 130, 246, 0.05),
      rgba(59, 130, 246, 0.15) 20%,
      rgba(99, 102, 241, 0.25) 50%,
      rgba(59, 130, 246, 0.15) 80%,
      rgba(59, 130, 246, 0.05)
    );
  }
  
  .dark .sidebar-fancy-border.closed::after {
    background: linear-gradient(to bottom, 
      rgba(59, 130, 246, 0.03),
      rgba(59, 130, 246, 0.08) 20%,
      rgba(99, 102, 241, 0.12) 50%,
      rgba(59, 130, 246, 0.08) 80%,
      rgba(59, 130, 246, 0.03)
    );
  }
`;

const sidebarVariants = {
  open: {
    width: "15rem",
  },
  closed: {
    width: "3.05rem",
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

// Animation variants for the ModelWars text
const logoTextVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      delay: 0.1
    }
  },
  closed: {
    opacity: 0,
    y: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Add the styles to the document
  useEffect(() => {
    // Create style element
    const styleEl = document.createElement('style');
    styleEl.id = 'fancy-border-styles';
    styleEl.innerHTML = fancyBorderStyles;
    
    // Add to head if it doesn't exist yet
    if (!document.getElementById('fancy-border-styles')) {
      document.head.appendChild(styleEl);
    }
    
    // Cleanup on unmount
    return () => {
      const existingStyle = document.getElementById('fancy-border-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <motion.div
      className={cn(
        "sidebar fixed left-0 z-40 h-screen shrink-0 border-r fixed sidebar-fancy-border",
        isCollapsed ? "closed" : "open"
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className={`relative z-40 flex text-muted-foreground h-screen shrink-0 flex-col bg-white dark:bg-black transition-all`}
        variants={contentVariants}
        style={{
          backgroundImage: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.01) 70%, rgba(59, 130, 246, 0.05) 100%)"
        }}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            <div className="flex h-[54px] w-full shrink-0 border-b p-2">
              <div className="mt-[1.5px] flex w-full items-center justify-between">
                {!isCollapsed && (<>
                  <Image
                    src="/06b110f2-2e49-4fb2-acb9-b3b9a362d60f.png"
                    alt="Logo"
                    className="flex justify-center align-middle place-content-center animate-spin"
                    width={24}
                    height={24}
                  />
                  <motion.h1 
                    className="text-lg font-thin bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    variants={logoTextVariants}
                    initial="closed"
                    animate="open"
                  >
                    Model wars
                  </motion.h1>
                  </>
                )}
                <Button
                  variant="ghost"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-4">
                <ScrollArea className="h-16 grow p-2">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    <Link
                      href="/contest"
                      className={cn(
                        "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                        pathname?.includes("contest") &&
                          "bg-muted text-blue-600"
                      )}
                    >
                      <Trophy className="h-4 w-4" />{" "}
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <div className="flex items-center gap-2">
                            <p className="ml-2 text-sm font-medium">Contests</p>
                          </div>
                        )}
                      </motion.li>
                    </Link>
                    <Link
                      href="/claim"
                      className={cn(
                        "flex h-8 flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                        pathname?.includes("claim") && "bg-muted text-blue-600"
                      )}
                    >
                      <Flag className="h-4 w-4" />
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <div className="ml-2 flex items-center gap-2">
                            <p className="text-sm font-medium">Claim bounties</p>
                          </div>
                        )}
                      </motion.li>
                    </Link>
                    <Link
                      href="/host"
                      className={cn(
                        "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                        pathname?.includes("host") && "bg-muted text-blue-600"
                      )}
                    >
                      <Users className="h-4 w-4" />{" "}
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">Host contest</p>
                        )}
                      </motion.li>
                    </Link>
                  </div>
                </ScrollArea>
              </div>
              <div className="flex flex-col p-2">
                <Link
                  href="/settings"
                  className={cn(
                    "mt-auto flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                    pathname?.includes("settings") && "bg-muted text-blue-600"
                  )}
                >
                  <Settings className="h-4 w-4 shrink-0" />{" "}
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium">Settings</p>
                    )}
                  </motion.li>
                </Link>
                <div>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-full">
                      <div className="flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary">
                        <Avatar className="size-4">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <motion.li
                          variants={variants}
                          className="flex w-full items-center gap-2"
                        >
                          {!isCollapsed && (
                            <>
                              <p className="text-sm font-medium">Account</p>
                              <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
                            </>
                          )}
                        </motion.li>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={5}>
                      <div className="flex flex-row items-center gap-2 p-2">
                        <Avatar className="size-6">
                          <AvatarFallback>MW</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-medium">
                            Model Wars
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            wallet@example.com
                          </span>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        asChild
                        className="flex items-center gap-2"
                      >
                        <Link href="/profile">
                          <User className="h-4 w-4" /> Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Flag className="h-4 w-4" /> Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}