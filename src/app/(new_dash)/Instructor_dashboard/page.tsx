// "use client";
// import CourseReport from "../components/course-report";
// import ReusableTabs from "../components/dashboard-tabs";
// import MetricsCards from "../components/metrics-card";

// export default function Page() {
//   const tabMenu = [
//     { id: "Users", label: "Users" },
//     { id: "Groups", label: "Groups" },
//   ];
//   return (
//     <>
//       <div className="container mx-auto p-4">
//         {/* <DashboardTabs /> */}
//         {/* <ReusableTabs
//           tabs={tabMenu}
//           defaultActive="summary"
//           onChange={(id) => console.log("Selected tab:", id)}
//         /> */}
//         <div className="mt-8">{/* <MetricsCards /> */}</div>
//         <div className="mt-12">
//           <CourseReport />
//         </div>
//       </div>
//     </>
//   );
// }
// ------------------------

"use client";

import { useState, useEffect } from "react";
import { FiFileText, FiList, FiPlayCircle, FiAward } from "react-icons/fi";

interface CourseDetail {
  name: string;
  description: string;
  thumbnail: File | null;
  thumbnailPreview: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  vimeoCode: string;
  videoInfo: string;
}

interface Section {
  id: string;
  name: string;
  description: string;
  lessons: Lesson[];
}

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

interface TestSettings {
  attempts: string;
  passingCriteria: string;
  instructions: string;
}

interface Certification {
  title: string;
  description: string;
}

const CourseWizard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [courseDetail, setCourseDetail] = useState<CourseDetail>({
    name: "",
    description: "",
    thumbnail: null,
    thumbnailPreview: "",
  });

  const [sections, setSections] = useState<Section[]>([
    { id: "1", name: "", description: "", lessons: [] },
  ]);

  const [testSettings, setTestSettings] = useState<TestSettings>({
    attempts: "",
    passingCriteria: "",
    instructions: "",
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "",
      options: [
        { id: "1", text: "", isCorrect: false },
        { id: "2", text: "", isCorrect: false },
        { id: "3", text: "", isCorrect: false },
        { id: "4", text: "", isCorrect: false },
      ],
    },
  ]);

  const [certification, setCertification] = useState<Certification>({
    title: "",
    description: "",
  });

  const tabs = [
    { id: 1, label: "Course Overview", icon: <FiFileText /> },
    { id: 2, label: "Content", icon: <FiList /> },
    { id: 3, label: "Create Test", icon: <FiPlayCircle /> },
    { id: 4, label: "Certification", icon: <FiAward /> },
  ];

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseDetail((prev) => ({
          ...prev,
          thumbnail: file,
          thumbnailPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string
  ) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", description: "", lessons: [] },
    ]);
  };

  const addLesson = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons.push({
      id: Date.now().toString(),
      title: "",
      description: "",
      vimeoCode: "",
      videoInfo: "",
    });
    setSections(updatedSections);
  };

  const handleLessonChange = (
    sectionIndex: number,
    lessonIndex: number,
    field: keyof Lesson,
    value: string
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons[lessonIndex] = {
      ...updatedSections[sectionIndex].lessons[lessonIndex],
      [field]: value,
    };
    setSections(updatedSections);
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "",
        options: [
          { id: "1", text: "", isCorrect: false },
          { id: "2", text: "", isCorrect: false },
          { id: "3", text: "", isCorrect: false },
          { id: "4", text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].text = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    // Reset all options to false
    updatedQuestions[questionIndex].options.forEach(
      (opt) => (opt.isCorrect = false)
    );
    // Set the selected option as correct
    updatedQuestions[questionIndex].options[optionIndex].isCorrect = true;
    setQuestions(updatedQuestions);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Name *
              </label>
              <input
                type="text"
                value={courseDetail.name}
                onChange={(e) =>
                  setCourseDetail((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                placeholder="Enter course name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description *
              </label>
              <textarea
                value={courseDetail.description}
                onChange={(e) =>
                  setCourseDetail((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                placeholder="Enter course description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Thumbnail *
              </label>
              <div className="mt-1 flex items-center space-x-4">
                {courseDetail.thumbnailPreview && (
                  <div className="w-32 h-32 border rounded-lg overflow-hidden">
                    <img
                      src={courseDetail.thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#086CB6]">
                    Upload Thumbnail
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended size: 1280x720px
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <div key={section.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Section {sectionIndex + 1}
                  </h3>
                  {sectionIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSections = sections.filter(
                          (_, i) => i !== sectionIndex
                        );
                        setSections(updatedSections);
                      }}
                      className="text-red-600 text-sm"
                    >
                      Remove Section
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Name *
                  </label>
                  <input
                    type="text"
                    value={section.name}
                    onChange={(e) =>
                      handleSectionChange(sectionIndex, "name", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                    placeholder="Enter section name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Description
                  </label>
                  <textarea
                    value={section.description}
                    onChange={(e) =>
                      handleSectionChange(
                        sectionIndex,
                        "description",
                        e.target.value
                      )
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                    placeholder="Enter section description"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Lessons in this Section</h4>
                    <button
                      type="button"
                      onClick={() => addLesson(sectionIndex)}
                      className="text-[#086CB6] hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Lesson
                    </button>
                  </div>

                  {section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="border rounded-lg p-4 mb-4 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">
                          Lesson {lessonIndex + 1}
                        </h5>
                        {lessonIndex > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updatedSections = [...sections];
                              updatedSections[sectionIndex].lessons =
                                updatedSections[sectionIndex].lessons.filter(
                                  (_, i) => i !== lessonIndex
                                );
                              setSections(updatedSections);
                            }}
                            className="text-red-600 text-sm"
                          >
                            Remove Lesson
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lesson Title *
                        </label>
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) =>
                            handleLessonChange(
                              sectionIndex,
                              lessonIndex,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                          placeholder="Enter lesson title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lesson Description
                        </label>
                        <textarea
                          value={lesson.description}
                          onChange={(e) =>
                            handleLessonChange(
                              sectionIndex,
                              lessonIndex,
                              "description",
                              e.target.value
                            )
                          }
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                          placeholder="Enter lesson description"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vimeo Code *
                          </label>
                          <input
                            type="text"
                            value={lesson.vimeoCode}
                            onChange={(e) =>
                              handleLessonChange(
                                sectionIndex,
                                lessonIndex,
                                "vimeoCode",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                            placeholder="Enter Vimeo video code"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Video Info
                          </label>
                          <input
                            type="text"
                            value={lesson.videoInfo}
                            onChange={(e) =>
                              handleLessonChange(
                                sectionIndex,
                                lessonIndex,
                                "videoInfo",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                            placeholder="Duration, quality, etc."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addSection}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
            >
              + Add New Section
            </button>

            {/* Lessons Table */}
            {sections.some((s) => s.lessons.length > 0) && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  All Lessons Overview
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Section
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lesson Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vimeo Code
                        </th>
                        <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Video Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sections.map((section, sectionIndex) =>
                        section.lessons.map((lesson, lessonIndex) => (
                          <tr key={`${sectionIndex}-${lessonIndex}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {section.name || `Section ${sectionIndex + 1}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {lesson.title || `Lesson ${lessonIndex + 1}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {lesson.vimeoCode}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {lesson.videoInfo}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Attempts
                </label>
                <input
                  type="text"
                  value={testSettings.attempts}
                  onChange={(e) =>
                    setTestSettings((prev) => ({
                      ...prev,
                      attempts: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                  placeholder="e.g., 3 or Unlimited"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passing Criteria (%)
                </label>
                <input
                  type="text"
                  value={testSettings.passingCriteria}
                  onChange={(e) =>
                    setTestSettings((prev) => ({
                      ...prev,
                      passingCriteria: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                  placeholder="e.g., 70"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Instructions
              </label>
              <textarea
                value={testSettings.instructions}
                onChange={(e) =>
                  setTestSettings((prev) => ({
                    ...prev,
                    instructions: e.target.value,
                  }))
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                placeholder="Enter test instructions..."
              />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Questions</h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-[#086CB6] text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  + Add Question
                </button>
              </div>

              {questions.map((question, questionIndex) => (
                <div
                  key={question.id}
                  className="border rounded-lg p-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">
                      Question {questionIndex + 1}
                    </h4>
                    {questionIndex > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updatedQuestions = questions.filter(
                            (_, i) => i !== questionIndex
                          );
                          setQuestions(updatedQuestions);
                        }}
                        className="text-red-600 text-sm"
                      >
                        Remove Question
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Text *
                    </label>
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(questionIndex, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                      placeholder="Enter your question"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Options (Select the correct answer)
                    </label>
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="radio"
                          name={`correct-answer-${questionIndex}`}
                          checked={option.isCorrect}
                          onChange={() =>
                            handleCorrectAnswer(questionIndex, optionIndex)
                          }
                          className="h-4 w-4 text-[#086CB6]"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) =>
                            handleOptionChange(
                              questionIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Questions Table */}
            {questions.some((q) => q.text.trim() !== "") && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  Questions Overview
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Question
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Options
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Correct Answer
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {questions.map((question, index) => (
                        <tr key={question.id}>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {question.text || `Question ${index + 1}`}
                          </td>
                          <td className="px-6 py-4">
                            <ul className="text-sm text-gray-900">
                              {question.options.map((opt, optIndex) => (
                                <li key={opt.id} className="mb-1">
                                  {optIndex + 1}.{" "}
                                  {opt.text || `Option ${optIndex + 1}`}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {question.options.find((opt) => opt.isCorrect)
                              ?.text || "Not set"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate Title *
              </label>
              <input
                type="text"
                value={certification.title}
                onChange={(e) =>
                  setCertification((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                placeholder="Enter certificate title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate Description *
              </label>
              <textarea
                value={certification.description}
                onChange={(e) =>
                  setCertification((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6] focus:border-transparent"
                placeholder="Describe what this certificate represents..."
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {certification.title || "Certificate Preview"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {certification.description ||
                    "Certificate description will appear here"}
                </p>
                <div className="text-sm text-gray-500">
                  This is a preview of how the certificate will look
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    const courseData = {
      courseDetail,
      sections,
      testSettings,
      questions,
      certification,
    };
    console.log("Course Data:", courseData);
    // Submit to your API
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Create New Course
            </h1>
            <p className="text-gray-600 mb-8">
              Fill in all the required details for your course
            </p>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center py-4 px-1 border-b-2 font-medium text-sm
                      ${
                        activeTab === tab.id
                          ? "border-[#086CB6] text-[#086CB6]"
                          : "border-transparent text-black hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <form onSubmit={handleSubmit}>
              <div className="mb-8">{renderTabContent()}</div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => Math.max(1, prev - 1))}
                  disabled={activeTab === 1}
                  className={`px-6 py-2 rounded-lg border ${
                    activeTab === 1
                      ? "border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Save Draft
                  </button>

                  {activeTab < 4 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTab((prev) => Math.min(4, prev + 1))
                      }
                      className="px-6 py-2 rounded-lg bg-[#086CB6] text-white hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                    >
                      Publish Course
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseWizard;
