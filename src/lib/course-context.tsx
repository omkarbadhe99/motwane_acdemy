"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { Course } from "./types";

const COURSES: Course[] = [
  {
    id: "1",
    title: "Digital Transformation Fundamentals",
    description:
      "Learn the core principles of digital transformation and how to implement them in your organization",
    fullDescription:
      "A comprehensive guide to digital transformation in modern organizations",
    category: "active",
    progress: 45,
    duration: 12,
    lessons: 48,
    instructor: "Samuel Kodama",
    initials: "DF",
  },
  {
    id: "2",
    title: "Digital Transformation Fundamentals",
    description:
      "Learn the core principles of digital transformation and how to implement them in your organization",
    fullDescription:
      "Master advanced digital strategies for enterprise transformation",
    category: "active",
    progress: 60,
    duration: 15,
    lessons: 56,
    instructor: "Nyamwaya",
    initials: "DF",
  },
  {
    id: "3",
    title: "Digital Transformation Fundamentals",
    description:
      "Learn the core principles of digital transformation and how to implement them in your organization",
    fullDescription: "Explore modern approaches to digital innovation",
    category: "active",
    progress: 75,
    duration: 10,
    lessons: 40,
    instructor: "Nyamwaya Segemar",
    initials: "DF",
  },
  {
    id: "4",
    title: "Digital Transformation Fundamentals",
    description:
      "Learn the core principles of digital transformation and how to implement them in your organization",
    fullDescription: "Begin your journey into digital leadership",
    category: "active",
    progress: 30,
    duration: 18,
    lessons: 64,
    instructor: "Samuel Kodama",
    initials: "DF",
  },
  {
    id: "5",
    title: "Digital Transformation Advanced",
    description:
      "Dive deep into advanced aspects of digital transformation for enterprises",
    fullDescription: "Advanced techniques for scaling digital initiatives",
    category: "in-progress",
    progress: 35,
    duration: 20,
    lessons: 72,
    instructor: "Sarah Johnson",
    initials: "DA",
  },
  {
    id: "6",
    title: "Digital Transformation Advanced",
    description:
      "Dive deep into advanced aspects of digital transformation for enterprises",
    fullDescription: "Build robust digital infrastructure and processes",
    category: "in-progress",
    progress: 50,
    duration: 16,
    lessons: 60,
    instructor: "Mike Chen",
    initials: "DA",
  },
  {
    id: "7",
    title: "Digital Transformation Advanced",
    description:
      "Dive deep into advanced aspects of digital transformation for enterprises",
    fullDescription: "Implement cutting-edge digital solutions",
    category: "in-progress",
    progress: 65,
    duration: 22,
    lessons: 80,
    instructor: "Emma Davis",
    initials: "DA",
  },
  {
    id: "8",
    title: "Digital Transformation Advanced",
    description:
      "Dive deep into advanced aspects of digital transformation for enterprises",
    fullDescription: "Master enterprise-scale digital transformation",
    category: "in-progress",
    progress: 40,
    duration: 18,
    lessons: 68,
    instructor: "John Smith",
    initials: "DA",
  },
  {
    id: "9",
    title: "Digital Transformation Mastery",
    description:
      "Complete mastery of digital transformation strategies and implementation",
    fullDescription:
      "Become an expert in all aspects of digital transformation",
    category: "completed",
    progress: 100,
    duration: 25,
    lessons: 90,
    instructor: "Dr. Alexandra Berg",
    initials: "DM",
  },
  {
    id: "10",
    title: "Digital Transformation Fundamentals",
    description:
      "Learn the core principles of digital transformation and how to implement them",
    fullDescription:
      "Complete foundational knowledge for digital transformation",
    category: "completed",
    progress: 100,
    duration: 12,
    lessons: 48,
    instructor: "Robert Wilson",
    initials: "DF",
  },
];

interface CourseContextType {
  courses: Course[];
}

const CourseContext = createContext<Course[] | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  return (
    <CourseContext.Provider value={COURSES}>{children}</CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within CourseProvider");
  }
  return context;
}
