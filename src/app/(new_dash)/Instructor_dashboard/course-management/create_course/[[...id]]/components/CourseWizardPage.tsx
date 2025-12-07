"use client";

import { useState } from "react";
import CourseOverviewStep from "./CourseOverviewStep";
import ContentStep from "./ContentStep";
import TestStep from "./TestStep";
import CertificationStep from "./CertificationStep";

const tabs = [
  { id: 1, label: "Course Overview" },
  { id: 2, label: "Content" },
  { id: 3, label: "Create Test" },
  { id: 4, label: "Certification" },
];

export default function CourseWizardPage() {
  const [activeTab, setActiveTab] = useState(1);

  const handlePrev = () => setActiveTab((prev) => Math.max(1, prev - 1));
  const handleNext = () => setActiveTab((prev) => Math.min(4, prev + 1));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
          <h1 className="text-2xl font-bold mb-2">Create New Course</h1>
          <p className="text-gray-600 mb-8">
            Fill in all the required details for your course
          </p>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-1 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-[#086CB6] text-[#086CB6] border-b-2"
                      : "border-transparent text-black hover:text-gray-700 hover:border-gray-300 cusror-pointer"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Step Component */}
          <div className="mb-8">
            {activeTab === 1 && <CourseOverviewStep onNext={handleNext} />}
            {activeTab === 2 && (
              <ContentStep onNext={handleNext} onPrev={handlePrev} />
            )}
            {activeTab === 3 && (
              <TestStep onNext={handleNext} onPrev={handlePrev} />
            )}
            {activeTab === 4 && <CertificationStep onPrev={handlePrev} />}
          </div>
        </div>
      </div>
    </div>
  );
}
