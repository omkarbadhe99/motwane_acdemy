"use client";
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

export default function ReportsSummary() {
  const [search, setSearch] = useState("");

  const courses = [
    {
      id: 1,
      name: "React Basics",
      role: "Student",
      status: "Active",
      enrolled: 120,
      progress: 25, // in %
      certifications: 50,
    },
    {
      id: 2,
      name: "NodeJS Advanced",
      role: "Student",
      status: "In Progress",
      enrolled: 80,
      progress: 50,
      certifications: 40,
    },
    {
      id: 3,
      name: "NextJS Mastery",
      role: "Student",
      status: "Completed",
      enrolled: 60,
      progress: 100,
      certifications: 25,
    },
    {
      id: 4,
      name: "TypeScript Essentials",
      role: "Student",
      status: "In Progress",
      enrolled: 90,
      progress: 70,
      certifications: 60,
    },
  ];

  // Helper function for badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Courses Table */}
      <h6 className="text-gray-500 font-medium">Progress Report</h6>
      <div className="overflow-hidden rounded-lg shadow-md border bg-white">
        {/* Header + Search + Export */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4 border-b">
          <div className="relative w-full md:w-1/3">
            <Input
              placeholder="Search courses..."
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
                  Course
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Students
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Progress
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Certifications
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-700">{course.id}</td>
                  <td className="px-4 py-3 text-gray-800">{course.name}</td>

                  {/* Role Badge */}
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                      {course.role}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {course.status}
                    </span>
                  </td>

                  {/* Students */}
                  <td className="px-4 py-3 text-gray-700">{course.enrolled}</td>

                  {/* Progress Bar */}
                  <td className="px-4 py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {course.progress}%
                    </span>
                  </td>

                  {/* Certifications */}
                  <td className="px-4 py-3 text-gray-700">
                    {course.certifications}
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
