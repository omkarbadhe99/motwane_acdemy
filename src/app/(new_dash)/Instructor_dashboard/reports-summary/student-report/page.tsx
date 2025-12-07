"use client";
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
export default function ReportsSummary() {
  const [search, setSearch] = useState("");

  const students = [
    {
      id: 1,
      name: "John Doe",
      course: "React Basics",
      completed: 5,
      role: "Student",
    },
    {
      id: 2,
      name: "Jane Smith",
      course: "NodeJS Advanced",
      completed: 3,
      role: "Student",
    },
    {
      id: 3,
      name: "Alice Johnson",
      course: "NextJS Mastery",
      completed: 7,
      role: "Admin",
    },
    {
      id: 4,
      name: "Bob Brown",
      course: "TypeScript Essentials",
      completed: 4,
      role: "Student",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Students Table */}
      <h6 className="text-gray-500 font-medium">Student Details</h6>
      <div className="overflow-hidden rounded-lg shadow-md border bg-white">
        {/* Header + Search + Export */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4 border-b">
          <div className="relative w-full md:w-1/3">
            <Input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  #
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Course Assign
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Completed Count
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-700">{student.id}</td>
                  <td className="px-4 py-3 text-gray-800">{student.name}</td>
                  <td className="px-4 py-3 text-gray-700">{student.course}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {student.completed}
                  </td>

                  {/* Role Badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.role === "Admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {student.role}
                    </span>
                  </td>

                  {/* Action Eye Icon */}
                  <td className="px-4 py-3">
                    <Link
                      href={`/Instructor_dashboard/reports-summary/progress-report`}
                    >
                      <Button variant="ghost" size="icon">
                        <Eye size={18} />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
