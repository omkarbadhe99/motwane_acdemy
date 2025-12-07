// import CourseSection from "@/components/course-section";
import Hero from "@/src/components/hero";
import CourseSection from "./components/course-section";
export default function DashboardPage() {
  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <CourseSection title="My Courses" category="active" />
        {/* <CourseSection title="Continue to Watch" category="in-progress" />
        <CourseSection title="Completed Courses" category="completed" /> */}
      </main>
    </>
  );
}
