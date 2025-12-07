"use client";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const modules = [
  {
    id: 1,
    title: "Introduction to UX Design",
    lessons: 5,
    duration: "1 hour",
    isExpanded: true,
  },
  {
    id: 2,
    title: "Basic Principles of Design",
    lessons: 5,
    duration: "1 hour",
    isExpanded: false,
  },
  {
    id: 3,
    title: "Elements of User Experience",
    lessons: 5,
    duration: "1 hour",
    isExpanded: false,
  },
];

export default function CoursePage() {
  const [expandedModule, setExpandedModule] = useState<number>(1);
  const router = useRouter();
  return (
    // <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <div className="min-h-screen ">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Title Section */}
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Introduction to User Experience Design
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/instructor-teaching.png" />
                  <AvatarFallback>RR</AvatarFallback>
                </Avatar>

                <p className="font-light text-gray-500 text-sm">Created by</p>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-light text-sm"
                >
                  Ronald Richards
                </a>
                {/* </div> */}
              </div>
            </div>

            {/* Course Description */}
            <div className=" border-slate-200 p-5">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Course Description
              </h2>
              <p className="text-slate-600 leading-relaxed">
                This interactive e-learning course will introduce you to the
                fundamentals of User Experience (UX) design, the art of creating
                products and services that are intuitive, enjoyable, and
                user-friendly. Gain a solid foundation in UX principles and
                learn to apply them in real-world scenarios through engaging
                modules and interactive exercises.
              </p>
            </div>

            {/* Certification */}
            <div className=" p-5">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Certification
              </h2>
              <p className="text-slate-600 mb-3">
                At Udillearn, we understand the significance of formal
                recognition for your hard work and dedication to continuous
                learning. Upon successful completion of our courses, you will
                earn a prestigious certification that not only validates your
                expertise but also opens doors to new opportunities in your
                chosen field.
              </p>
            </div>
            <hr />
            {/* Instructor */}
            <div className="border-slate-200 p-5">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Instructor
              </h2>
              <div className="flex gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/instructor-teaching.png" />
                  <AvatarFallback>RR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-900">
                    Ronald Richards
                  </p>
                  <p className="text-sm text-slate-600">UX/UI Designer</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                With over a decade of industry experience, Ronald brings a
                wealth of practical knowledge to the classroom. He has played a
                pivotal role in designing user-centric interfaces for renowned
                tech companies, ensuring seamless and engaging user experiences.
              </p>
            </div>
            <hr />
            {/* Course Modules */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Course Modules
              </h2>
              <div className="space-y-3 ">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors"
                  >
                    <button
                      onClick={() =>
                        setExpandedModule(
                          expandedModule === module.id ? 0 : module.id
                        )
                      }
                      className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {expandedModule === module.id ? (
                          <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
                        )}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                          <p className="font-semibold text-slate-900">
                            {module.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            {module.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                    {expandedModule === module.id && (
                      <div className="bg-slate-50 border-t border-slate-200 p-4">
                        <p className="text-sm text-slate-600">
                          With over a decade of industry experience, Ronald
                          brings a wealth of practical knowledge to the
                          classroom. He has played a pivotal role in designing
                          user-centric interfaces for renowned tech companies,
                          ensuring seamless and engaging user experiences.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* <Button className=" bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-sm font-semibold py-2">
                Continue Watching
              </Button> */}
              {/* <Button className="inline-block bg-[#0D6CB3] hover:bg-[#0B5C98] text-white text-sm  py-2 px-4 rounded font-medium">
                {course.category === "completed"
                  ? "View Certificate"
                  : "Start Course"}
              </Button> */}
              <Button
                type="button"
                onClick={() => router.push("/courses/1/watch")}
                className="bg-[#0D6CB3] hover:bg-[#0B5C98] cursor-pointer text-white text-sm font-medium text-xs py-2"
              >
                Continue Watching
              </Button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-1">
            {/* Course Card */}
            <Card className="overflow-hidden border-slate-200 shadow-lg rounded-md">
              {/* Full-Width Top Image with Padding */}
              <div className="relative w-full h-100 ">
                <Image
                  src="/login.jpg" // Replace with your image or Unsplash URL
                  alt="Course Thumbnail"
                  fill
                  className="object-cover rounded-xl p-3 h-75"
                  priority
                />
              </div>

              <div className="p-6 space-y-1">
                {/* Course Info */}
                <div className="flex flex-col items-start gap-2">
                  <p className="text-sm text-slate-700">
                    53 Lectures • 3 hours
                  </p>
                </div>

                {/* Start Course Button */}
                <div className="flex justify-end md:justify-end">
                  <Button className="bg-[#0D6CB3] hover:bg-[#0B5C98] cursor-pointer text-white text-sm py-2 px-4 rounded font-medium">
                    Start Course
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
