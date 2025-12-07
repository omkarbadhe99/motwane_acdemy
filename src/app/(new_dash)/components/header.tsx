"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between p-4 px-6">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png" // update with your image path
              alt="Director"
              height={60}
              width={60}
              className="rounded object-cover"
            />
          </div>
          <nav className="flex gap-1">
            <NavTab label="Instructor Dashboard" href="/Instructor_dashboard" />
            <NavTab
              label="Reports & Summary"
              href="/Instructor_dashboard/reports-summary/summary"
            />
            <NavTab
              label="User Management"
              href="/Instructor_dashboard/user_management"
            />
            <NavTab
              label="Course Management"
              href="/Instructor_dashboard/course-management"
            />
          </nav>
        </div>

        {/* Search and Profile */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Type here..."
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Bell className="h-5 w-5 text-gray-500" />
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded transition"
            >
              <span className="text-sm font-medium">John Doe</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-left transition">
                  <User className="h-4 w-4" />
                  <span className="text-sm">View Profile</span>
                </button>
                <button
                  onClick={() => {
                    console.log("[v0] User logged out");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-left transition border-t border-gray-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// function NavTab({
//   label,
//   active = false,
// }: {
//   label: string;
//   active?: boolean;
// }) {
//   return (
//     <button
//       className={`px-4 py-2 text-sm whitespace-nowrap rounded-t-lg  transition ${
//         active
//           ? " text-blue-600 font-semibold "
//           : "border-transparent text-gray-600 hover:text-gray-800"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }
interface NavTabProps {
  label: string;
  href: string;
}
function NavTab({ label, href }: NavTabProps) {
  const pathname = usePathname();

  // Check if this tab is active
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <button
        className={`px-4 py-2 text-sm whitespace-nowrap rounded-t-lg transition cursor-pointer ${
          isActive
            ? "text-[#0D6CB3] font-semibold border-b-2 border-[#0D6CB3]"
            : "font-semibold border-b-2 border-transparent hover:text-black hover:font-semibold"
        }`}
      >
        {label}
      </button>
    </Link>
  );
}
