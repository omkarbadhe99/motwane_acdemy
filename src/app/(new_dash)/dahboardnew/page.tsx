import Header from "../components/header";
import DashboardTabs from "../components/dashboard-tabs";
import MetricsCards from "../components/metrics-card";
import CourseReport from "../components/course-report";
import Footer from "../components/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="p-6 flex-1">
        <DashboardTabs />
        <div className="mt-8">
          <MetricsCards />
        </div>
        <div className="mt-12">
          <CourseReport />
        </div>
      </main>
      <Footer />
    </div>
  );
}
