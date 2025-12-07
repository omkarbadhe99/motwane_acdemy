



"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { course_list } from "@/src/services/Instructor/groupListService";
import { useState, useEffect, useMemo, useRef } from "react";

interface Course {
  id: number;
  name: string;
  is_assigned: number;
}

interface CourseListingProps {
  userId?: number;
  selected: number[];
  onChange: (value: number[]) => void;
  initialValuesSet?: boolean; // Add this prop
}

export function CourseListing({
  userId,
  selected,
  onChange,
  initialValuesSet = false,
}: CourseListingProps) {
  // ---------------- QUERY ----------------
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["course_list", userId ?? "no-user"],
    queryFn: () => course_list(userId ?? 0),
    enabled: true,
  });

  // Memoize courses
  const courses: Course[] = useMemo(() => {
    return data?.success?.data ?? [];
  }, [data?.success?.data]);

  // ---------------- STATES ----------------
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<Set<number>>(
    new Set(selected)
  );
  
  // Track if we've already initialized from API
  const hasInitializedFromApi = useRef(false);

  // Sync parent → child
  useEffect(() => {
    setSelectedCourses(new Set(selected));
  }, [selected]);

  // EDIT MODE → auto-assign courses from API
  useEffect(() => {
    if (!userId || courses.length === 0 || hasInitializedFromApi.current) {
      return;
    }

    const assigned = courses
      .filter((c) => c.is_assigned === 1)
      .map((c) => c.id);

    // Mark that we've initialized
    hasInitializedFromApi.current = true;
    
    // Only update if we have assigned courses
    if (assigned.length > 0) {
      setSelectedCourses(new Set(assigned));
      
      // Use requestAnimationFrame to ensure this happens after render
      requestAnimationFrame(() => {
        onChange(assigned);
      });
    }
  }, [courses, userId]); // Remove onChange from dependencies

  // Reset initialization when userId changes (different user)
  useEffect(() => {
    hasInitializedFromApi.current = false;
  }, [userId]);

  // ---------------- HANDLER ----------------
  const toggleCourse = (id: number) => {
    setSelectedCourses((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      
      const newValue = Array.from(updated);
      onChange(newValue);
      return updated;
    });
  };

  // ---------------- FILTER ----------------
  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ---------------- LOADING & ERROR ----------------
  if (isLoading)
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 font-medium">Failed to load courses.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 text-blue-600 underline text-sm"
        >
          Retry
        </button>
      </div>
    );

  // ---------------- RENDER ----------------
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <Input
          placeholder="Search Courses"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10"
        />
      </div>

      <div className="max-h-[20vh] md:max-h-45 overflow-y-auto pr-2 custom-scroll divide-y">
        {filteredCourses.length ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex items-center gap-5 p-3 hover:bg-gray-50 transition rounded-md"
            >
              <Checkbox
                checked={selectedCourses.has(course.id)}
                onCheckedChange={() => toggleCourse(course.id)}
                className="
                  border-[#0D6CB3]
                  data-[state=checked]:bg-[#0D6CB3]
                  data-[state=checked]:border-[#0D6CB3]
                "
              />
              <span className="text-sm font-medium text-gray-700">
                {course.name}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground text-sm">
            No courses found
          </div>
        )}
      </div>
    </div>
  );
}