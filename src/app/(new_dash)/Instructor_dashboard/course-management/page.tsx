"use client";
import Link from "next/link";
const courses = [
  {
    id: 1,
    name: "IOT",
    lectures: 2,
    students: 3,
    thumbnail: "/Thesis-amico.png",
    status: "Active",
  },
  {
    id: 2,
    name: "Next.js Mastery",
    lectures: 15,
    students: 200,
    thumbnail: "/Thesis-amico.png",
    status: "Active",
  },
  {
    id: 3,
    name: "Node.js & Express",
    lectures: 10,
    students: 90,
    thumbnail: "/Thesis-amico.png",
    status: "Active",
  },
];

export default function CourseList() {
  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course List</h1>
        <Link
          href="/Instructor_dashboard/course-management/create_course"
          className="bg-[#086CB6] rounded-md text-white px-4 py-2 hover:bg-[#065A9A] transition"
        >
          Create New Course
        </Link>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition bg-white relative"
          >
            {/* Status badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                {course.status}
              </span>
            </div>

            {/* Thumbnail */}
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.name}
              className="w-full h-32 object-cover p-2"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-md font-semibold mb-2 truncate">
                {course.name}
              </h2>

              <p className="text-gray-600 text-sm mb-1">
                Lectures: {course.lectures}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                Students: {course.students}
              </p>

              <button className="text-red-500 text-sm font-medium mb-3 hover:text-red-700 transition">
                Deactivate
              </button>

              <div className="flex gap-2">
                <Link
                  href=""
                  className="flex-1 text-white text-sm px-3 py-2 rounded-md bg-[#086CB6] hover:bg-[#065A9A] transition font-medium text-center"
                >
                  Preview
                </Link>

                <Link
                  href={`/Instructor_dashboard/course-management/create_course/${course.id}`}
                  className="flex-1 text-white text-sm px-3 py-2 rounded-md bg-[#00AF6F] hover:bg-[#00995A] transition font-medium text-center"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
