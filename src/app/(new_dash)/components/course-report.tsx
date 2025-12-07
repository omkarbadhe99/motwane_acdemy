"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function CourseReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 13;

  const courseData = [
    {
      course: "Introduction to IOT",
      enrolled: 15,
      inProgress: 4,
      completed: 4,
    },
    {
      course: "Digital Solution Overview",
      enrolled: 12,
      inProgress: 4,
      completed: 4,
    },
    {
      course: "Product Training-Smart meter",
      enrolled: 11,
      inProgress: 5,
      completed: 3,
    },
    { course: "sales Techniques", enrolled: 13, inProgress: 2, completed: 5 },
    { course: "Advanced Analytics", enrolled: 8, inProgress: 3, completed: 2 },
    {
      course: "Cloud Computing Basics",
      enrolled: 10,
      inProgress: 4,
      completed: 3,
    },
    {
      course: "Data Science Fundamentals",
      enrolled: 14,
      inProgress: 5,
      completed: 4,
    },
    { course: "Mobile Development", enrolled: 9, inProgress: 2, completed: 3 },
    {
      course: "Web Design Principles",
      enrolled: 11,
      inProgress: 3,
      completed: 4,
    },
    {
      course: "Cybersecurity Essentials",
      enrolled: 7,
      inProgress: 2,
      completed: 2,
    },
    {
      course: "Machine Learning 101",
      enrolled: 6,
      inProgress: 1,
      completed: 2,
    },
    { course: "DevOps Fundamentals", enrolled: 8, inProgress: 3, completed: 2 },
    { course: "Blockchain Basics", enrolled: 5, inProgress: 1, completed: 1 },
  ];

  const displayedData = courseData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Course-wise summary report
        </h2>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter:</span>
          <select className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Courses</option>
          </select>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Courses
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Enrolled
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                In Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Completed
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {row.course}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {row.enrolled}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {row.inProgress}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {row.completed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 px-2">
        <span className="text-sm text-gray-600">
          Rows per page: <span className="font-medium">10</span> •{" "}
          {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
