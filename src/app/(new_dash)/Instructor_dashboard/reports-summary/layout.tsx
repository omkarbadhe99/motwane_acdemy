// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function DashboardTabs() {
//   const pathname = usePathname();

//   const tabs = [
//     {
//       id: "summary",
//       label: "Summary",
//       href: "/Instructor_dashboard/reports-summary/summary",
//     },
//     {
//       id: "course-report",
//       label: "Course Report",
//       href: "/Instructor_dashboard/reports-summary/course-report",
//     },
//     {
//       id: "student-report",
//       label: "Student Report",
//       href: "/Instructor_dashboard/reports-summary/student-report",
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2">
//       <div className="flex gap-6 border-b border-gray-200">
//         {tabs.map((tab) => {
//           const isActive = pathname.endsWith(tab.id);
//           return (
//             <Link
//               key={tab.id}
//               href={tab.href}
//               className={`px-1 py-3 text-sm font-medium border-b-2 transition ${
//                 isActive
//                   ? "border-blue-500 text-blue-600"
//                   : "border-transparent text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               {tab.label}
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ReportsSummaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    {
      id: "summary",
      label: "Summary",
      href: "/Instructor_dashboard/reports-summary/summary",
    },
    {
      id: "course-report",
      label: "Course Report",
      href: "/Instructor_dashboard/reports-summary/course-report",
    },
    {
      id: "student-report",
      label: "Student Report",
      href: "/Instructor_dashboard/reports-summary/student-report",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = pathname.endsWith(tab.id);
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`px-1 py-3 text-sm font-medium  transition ${
                isActive
                  ? "border-[#0D6CB3] text-[#0D6CB3]"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Render nested content */}
      <div className="mt-4">{children}</div>
    </div>
  );
}
