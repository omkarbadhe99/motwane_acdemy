"use client";
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Users, Activity, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function ReportsSummary() {
  const [search, setSearch] = useState("");

  // Sample static courses data
  const courses = [
    {
      id: 1,
      name: "React Basics",
      enrolled: 120,
      inProgress: 30,
      completed: 50,
    },
    {
      id: 2,
      name: "NodeJS Advanced",
      enrolled: 80,
      inProgress: 20,
      completed: 40,
    },
    {
      id: 3,
      name: "NextJS Mastery",
      enrolled: 60,
      inProgress: 10,
      completed: 25,
    },
    {
      id: 4,
      name: "TypeScript Essentials",
      enrolled: 90,
      inProgress: 15,
      completed: 60,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white border rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <p className="text-3xl font-bold mt-1">42</p>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white border rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Users</p>
            <p className="text-3xl font-bold mt-1">35</p>
          </div>
        </div>

        {/* Total Courses */}
        <div className="bg-white border rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <BookOpen size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Courses</p>
            <p className="text-3xl font-bold mt-1">12</p>
          </div>
        </div>

        {/* Active Courses */}
        <div className="bg-white border rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Courses</p>
            <p className="text-3xl font-bold mt-1">10</p>
          </div>
        </div>
      </div>
      <h6 className="text-gray-500 font-medium">Course-wise summary report</h6>
      {/* Courses Table */}
      <div className="overflow-hidden rounded-lg shadow-md border bg-white">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4 border-b">
          <div className="relative w-full md:w-1/3">
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="flex items-center gap-2 bg-[#0D6CB3] hover:bg-[#0B5CA0] text-white cursor-pointer">
            Export Report
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  #
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Courses
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Enrolled
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  In Progress
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Completed
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-700">{course.id}</td>
                  <td className="px-4 py-3 text-gray-800">{course.name}</td>
                  <td className="px-4 py-3 text-gray-700">{course.enrolled}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {course.inProgress}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {course.completed}
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
