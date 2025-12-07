"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import type { Course } from "@/src/lib/types";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
export default function CourseCard({
  course,
  category,
}: {
  course: Course;
  category: string;
}) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col border border-gray-100">
      {/* <div
          className="h-32 md:h-40 flex items-center justify-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(91.48deg, #00AF6F -35.17%, #01A781 9.67%, #0287C7 101.07%)",
          }}
        > */}
      {/* <div className="text-white text-4xl md:text-5xl font-bold opacity-40">
          {course.initials}
        </div> */}
      <div className="flex items-center justify-end gap-2 pt-3 px-2">
        {course.category === "in-progress" && (
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            <p className="text-xs font-medium">In Progress</p>
          </div>
        )}

        {course.category === "completed" && (
          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            <p className="text-xs font-medium">Completed</p>
          </div>
        )}
        <Bookmark />
      </div>
      {/* </div> */}

      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <h3 className="font-medium text-gray-800 text-sm md:text-base mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
          {course.description}
        </p>
        <p className="text-xs text-gray-500 mb-4">By {course.instructor}</p>

        {course.category !== "active" && (
          <div className="mb-4">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {course.progress}% Complete
            </p>
          </div>
        )}
        <p className="text-xs text-gray-500 mb-4">{course.duration} hours</p>

        {
          <div className="flex justify-end">
            <Link href={`/courses/1`}>
              <Button className="inline-block bg-[#0D6CB3] hover:bg-[#0B5C98] cursor-pointer text-white text-sm  py-2 px-4 rounded font-medium">
                {course.category === "completed"
                  ? "View Certificate"
                  : "Start Course"}
              </Button>
            </Link>
          </div>

          // <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-sm font-semibold py-2">
          //   {course.category === "completed"
          //     ? "View Certificate"
          //     : "Start Course"}
          // </Button>
        }
        {/* <Button
            type="button"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              router.push(`/courses/1`)
            }
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-sm font-semibold py-2"
          >
            {course.category === "completed" ? "View Certificate" : "Start Course"}
          </Button> */}
      </div>
    </div>
  );
}
