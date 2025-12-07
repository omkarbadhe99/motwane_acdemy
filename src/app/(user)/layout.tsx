"use client";

import Header from "@/src/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* <Hero /> */}
      {/* Page Content */}
      <div>{children}</div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2025 www.motwaneacademy.com - All Rights Reserved</p>
          <div className="mt-4 space-x-4 flex justify-center flex-wrap gap-2">
            <a href="#" className="hover:text-white hover:underline transition">
              Terms and conditions
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white hover:underline transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
      {/* <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2025 www.motwaneacademy.com - All Rights Reserved</p>
          <div className="mt-2 space-x-4 flex justify-center flex-wrap gap-2">
            <a href="#" className="hover:text-white hover:underline transition">Terms and conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-white hover:underline transition">Privacy Policy</a>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
