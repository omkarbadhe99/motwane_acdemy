"use client";
import Image from "next/image";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function Header() {
  // const { user, logout, login } = useAuth()
  const { user, logout } = useAuth();
  type User = {
    email: string;
    name: string;
  };
  const displayUser: User = {
    email: user?.email || "guest@motwane.com",
    name: user?.fullname || "Guest User",
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-24 h-10 md:w-32 md:h-12">
              <Image
                src="/logo.png"
                alt="Motwane Digital"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Center Title */}
          <h1 className="text-base md:text-2xl font-semibold text-teal-600 flex-1 text-center">
            Motwane Academy
          </h1>

          {/* User Section - Always show user info */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <span className="text-sm md:text-base font-medium text-gray-700 hidden sm:inline">
              Hi {displayUser.name.split(" ")[0]}!
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full w-10 h-10 p-0 bg-gradient-to-br from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-semibold flex-shrink-0"
                >
                  {displayUser.name.charAt(0).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-semibold text-base">
                  {displayUser.name}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs font-normal text-gray-500 mb-2">
                  {displayUser.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/profile">
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={`/profile`}>
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}

// {user ? (
//                   <>
//                     <DropdownMenuItem asChild className="cursor-pointer">
//                       <Link href="/profile">
//                         <span>My Profile</span>
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem asChild className="cursor-pointer">
//                       <Link href="/settings">
//                         <span>Settings</span>
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem onClick={() => logout()} className="text-red-600 cursor-pointer">
//                       Logout
//                     </DropdownMenuItem>
//                   </>
//                 ) : (
//                   <>
//                     <DropdownMenuItem asChild className="cursor-pointer">
//                       <Link href="/starter">
//                         <span>Get Started</span>
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem
//                       onClick={() => {
//                         login({ email: "demo@motwane.com", password: "demo123", name: "Demo User" })
//                       }}
//                       className="text-teal-600 cursor-pointer"
//                     >
//                       Demo Login
//                     </DropdownMenuItem>
//                   </>
//                 )}
