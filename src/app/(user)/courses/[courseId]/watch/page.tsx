// // import CourseSection from "@/components/course-section";
// // import Hero from "@/components/hero";

// // export default function WatchCoursePage() {
// //   return (
// //     <>

// //        <main className="container mx-auto px-4 py-12">

// //       </main>

// //     </>
// //   );
// // }

// "use client"

// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ChevronDown, Clock, Award, Download, Play } from "lucide-react"

// interface Subtopic {
//   id: number
//   title: string
//   duration: string
//   videoUrl: string
// }

// interface CourseTopic {
//   id: number
//   title: string
//   subtopics: Subtopic[]
// }

// const courseTopics: CourseTopic[] = [
//   {
//     id: 1,
//     title: "Introduction to UX Design",
//     subtopics: [
//       {
//         id: 1,
//         title: "What is User Experience (UX) Design?",
//         duration: "4min",
//         videoUrl: "https://www.youtube.com/embed/rQH8vrOBrPs?si=loPxB995DpP-iuIZ",
//       },
//       {
//         id: 2,
//         title: "Historical Overview of UX Design",
//         duration: "4min",
//         videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       },
//       { id: 3, title: "UX Design Principles", duration: "4min", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
//       {
//         id: 4,
//         title: "User Research Fundamentals",
//         duration: "4min",
//         videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       },
//       { id: 5, title: "Wireframing Basics", duration: "4min", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
//       {
//         id: 6,
//         title: "Prototyping Introduction",
//         duration: "4min",
//         videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       },
//     ],

//   },
//   {
//     id: 2,
//     title: "Introduction to UX Design",
//     subtopics: [
//       {
//         id: 1,
//         title: "What is User Experience (UX) Design?",
//         duration: "4min",
//         videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       },
//       {
//         id: 2,
//         title: "Historical Overview of UX Design",
//         duration: "4min",
//         videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       },
//       { id: 3, title: "UX Design Principles", duration: "4min", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
//       {
//         id: 4,
//         title: "User Research Fundamentals",
//         duration: "4min",
//         videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       },
//       { id: 5, title: "Wireframing Basics", duration: "4min", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
//       {
//         id: 6,
//         title: "Prototyping Introduction",
//         duration: "4min",
//         videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       },
//     ],

//   },
// ]

// const defaultVideo = courseTopics[0]?.subtopics[0]?.videoUrl

// export default function WatchCoursePage() {
//   const [expandedTopics, setExpandedTopics] = useState<number[]>([1])
//   const [selectedVideo, setSelectedVideo] = useState<string>(defaultVideo)
//   const [currentTopic, setCurrentTopic] = useState<Subtopic | null>(courseTopics[0]?.subtopics[0] || null)

//   const toggleTopic = (topicId: number) => {
//     setExpandedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
//   }

//   const handleSubtopicClick = (subtopic: Subtopic) => {
//     setSelectedVideo(subtopic.videoUrl)
//     setCurrentTopic(subtopic)
//   }

//   return (
//     <>
//       <main className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Sidebar - Course Content */}
//           <aside className="lg:col-span-1 order-2 lg:order-1">
//             <Card className="p-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
//               <h2 className="text-lg font-semibold mb-6 text-balance">Course Content</h2>

//               <div className="space-y-3">
//                 {courseTopics.map((topic) => (
//                   <div key={topic.id} className="border rounded-lg">
//                     {/* Topic Header */}
//                     <button
//                       onClick={() => toggleTopic(topic.id)}
//                       className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
//                     >
//                       <span className="font-medium text-sm">{topic.title}</span>
//                       <ChevronDown
//                         size={18}
//                         className={`transition-transform ${expandedTopics.includes(topic.id) ? "rotate-180" : ""}`}
//                       />
//                     </button>

//                     {/* Subtopics List */}
//                     {expandedTopics.includes(topic.id) && (
//                       <div className="bg-gray-50 border-t space-y-2 p-3">
//                         {topic.subtopics.map((subtopic) => (
//                           <button
//                             key={subtopic.id}
//                             onClick={() => handleSubtopicClick(subtopic)}
//                             className={`w-full flex items-center justify-between p-2 rounded transition-colors text-left ${
//                               currentTopic?.id === subtopic.id ? "bg-blue-100" : "hover:bg-white"
//                             }`}
//                           >
//                             <div className="flex items-center gap-2 flex-1 min-w-0">
//                               <Play size={14} className="text-blue-600 flex-shrink-0" />
//                               <span className="text-sm text-gray-700 truncate">{subtopic.title}</span>
//                             </div>
//                             <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0 ml-2">
//                               <Clock size={14} />
//                               {subtopic.duration}
//                             </div>
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Action Buttons */}
//               <div className="space-y-3 mt-8">
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Start Assessment</Button>
//                 <Button
//                   variant="outline"
//                   className="w-full border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
//                 >
//                   <Download size={16} className="mr-2" />
//                   Download Certificate
//                 </Button>
//               </div>

//             </Card>

//           </aside>

//           {/* Right Content - Main Area */}
//           <section className="lg:col-span-2 order-1 lg:order-2 space-y-6">
//             {/* Video Player Section */}
//             <Card className="overflow-hidden">
//               <div className="relative w-full bg-black aspect-video">
//                 <iframe
//                   width="100%"
//                   height="100%"
//                   src={selectedVideo}
//                   title="Course Video"
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   className="absolute inset-0"
//                 />
//               </div>
//             </Card>

//             {/* Video Title */}
//             {currentTopic && (
//               <div>
//                 <h2 className="text-2xl font-bold text-balance">{currentTopic.title}</h2>
//                 <p className="text-gray-600 mt-1 flex items-center gap-2">
//                   <Clock size={16} />
//                   Duration: {currentTopic.duration}
//                 </p>
//               </div>
//             )}

//             {/* Course Overview */}
//             <div className="space-y-4">
//               <div>
//                 <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-balance">Introduction to UX Design</h1>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Award size={18} />
//                   <span>Comprehensive UX Design Course</span>
//                 </div>
//               </div>

//               <Card className="p-6 bg-gray-50">
//                 <h3 className="font-semibold mb-3">Course Overview</h3>
//                 <p className="text-gray-700 leading-relaxed text-balance">
//                   Embark on a transformational journey into the dynamic world of User Experience (UX) Design with our
//                   comprehensive course, "Introduction to User Experience Design." This course is meticulously crafted to
//                   equip learners with the fundamental knowledge, practical skills, and strategic insights necessary to
//                   excel in crafting exceptional user experiences in the digital landscape.
//                 </p>
//               </Card>

//               {/* What You'll Learn */}
//               {/* <Card className="p-6">
//                 <h3 className="font-semibold mb-4">What You'll Learn</h3>
//                 <ul className="space-y-3">
//                   <li className="flex gap-3">
//                     <span className="text-teal-600 font-bold">✓</span>
//                     <span className="text-gray-700">Understand core UX design principles and methodologies</span>
//                   </li>
//                   <li className="flex gap-3">
//                     <span className="text-teal-600 font-bold">✓</span>
//                     <span className="text-gray-700">Conduct effective user research and usability testing</span>
//                   </li>
//                   <li className="flex gap-3">
//                     <span className="text-teal-600 font-bold">✓</span>
//                     <span className="text-gray-700">Create wireframes and interactive prototypes</span>
//                   </li>
//                   <li className="flex gap-3">
//                     <span className="text-teal-600 font-bold">✓</span>
//                     <span className="text-gray-700">Design for accessibility and inclusive experiences</span>
//                   </li>
//                   <li className="flex gap-3">
//                     <span className="text-teal-600 font-bold">✓</span>
//                     <span className="text-gray-700">Master design tools and best practices</span>
//                   </li>
//                 </ul>
//               </Card> */}

//               {/* Course Structure */}
//               {/* <Card className="p-6">
//                 <h3 className="font-semibold mb-4">Course Structure</h3>
//                 <div className="space-y-2 text-gray-700">
//                   <p>This course is organized into logical modules that build upon each other:</p>
//                   <ul className="list-disc list-inside space-y-1 ml-2">
//                     <li>Foundations of User Experience</li>
//                     <li>Research & Analysis Methods</li>
//                     <li>Design & Prototyping Techniques</li>
//                     <li>Testing & Iteration</li>
//                     <li>Real-World Case Studies</li>
//                   </ul>
//                 </div>
//               </Card> */}
//             </div>
//           </section>
//         </div>
//       </main>
//     </>
//   )
// }

"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ChevronDown, Clock, Award, Download, Play } from "lucide-react";
import { useRouter } from "next/navigation";
interface Subtopic {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
}

interface CourseTopic {
  id: number;
  title: string;
  subtopics: Subtopic[];
}

// ... your courseTopics array
const courseTopics: CourseTopic[] = [
  {
    id: 1,
    title: "Introduction to UX Design",
    subtopics: [
      {
        id: 1,
        title: "What is User Experience (UX) Design?",
        duration: "4min",
        videoUrl:
          "https://www.youtube.com/embed/rQH8vrOBrPs?si=loPxB995DpP-iuIZ",
      },
      {
        id: 2,
        title: "Historical Overview of UX Design",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "UX Design Principles",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "User Research Fundamentals",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 5,
        title: "Wireframing Basics",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 6,
        title: "Prototyping Introduction",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
  },
  {
    id: 2,
    title: "Introduction to UX Design",
    subtopics: [
      {
        id: 1,
        title: "What is User Experience (UX) Design?",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Historical Overview of UX Design",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "UX Design Principles",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "User Research Fundamentals",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 5,
        title: "Wireframing Basics",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 6,
        title: "Prototyping Introduction",
        duration: "4min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
  },
];
const defaultVideo: string = courseTopics[0]?.subtopics[0]?.videoUrl || "";

export default function WatchCoursePage() {
  const router = useRouter();
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [selectedVideo, setSelectedVideo] = useState<string>(
    defaultVideo || ""
  );
  console.log(typeof selectedVideo);

  const [currentTopic, setCurrentTopic] = useState<Subtopic | null>(
    courseTopics[0]?.subtopics[0] || null
  );

  const toggleTopic = (topicId: number) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubtopicClick = (subtopic: Subtopic) => {
    setSelectedVideo(subtopic.videoUrl);
    setCurrentTopic(subtopic);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Sidebar */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <Card className="p-6 flex flex-col max-h-[calc(100vh-2rem)]">
            <h2 className="text-lg font-semibold mb-6 text-balance">
              Course Content
            </h2>

            {/* Scrollable content */}
            <div className="space-y-3 overflow-y-auto flex-1">
              {courseTopics.map((topic) => (
                <div key={topic.id} className="border rounded-lg">
                  {/* Topic Header */}
                  <button
                    onClick={() => toggleTopic(topic.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="font-medium text-sm">{topic.title}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        expandedTopics.includes(topic.id) ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Subtopics List */}
                  {expandedTopics.includes(topic.id) && (
                    <div className="bg-gray-50 border-t space-y-2 p-3">
                      {topic.subtopics.map((subtopic) => (
                        <button
                          key={subtopic.id}
                          onClick={() => handleSubtopicClick(subtopic)}
                          className={`w-full flex items-center justify-between p-2 rounded transition-colors text-left ${
                            currentTopic?.id === subtopic.id
                              ? "bg-blue-100"
                              : "hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Play
                              size={14}
                              className="text-blue-600 flex-shrink-0"
                            />
                            <span className="text-sm text-gray-700 truncate">
                              {subtopic.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0 ml-2">
                            <Clock size={14} />
                            {subtopic.duration}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons fixed at bottom */}
            <div className="mt-4 flex flex-col gap-3">
              {/* <Button className="w-full bg-[#0D6CB3] hover:bg-[#0D6CB3] text-white">
  Start Assessment
</Button> */}
              <Button
                type="button"
                onClick={() => router.push("/courses/1/instruction")}
                className="w-full bg-[#0D6CB3] hover:bg-[#0D6CB3] text-white cursor-pointer"
              >
                Start Assessment
              </Button>

              <Button className="bg-[#029F92] hover:bg-[#029F92] cursor-pointer text-white text-sm font-semibold py-2">
                <Download size={16} className="mr-2" />
                Download Certificate
              </Button>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-2 order-1 lg:order-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="relative w-full bg-black aspect-video">
              <ReactPlayer
                controls
                width="100%"
                height="100%"
                className="absolute inset-0"
              />
            </div>
          </Card>

          {/* Video Title */}
          {currentTopic && (
            <div>
              <h2 className="text-2xl font-bold text-balance">
                {currentTopic.title}
              </h2>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <Clock size={16} />
                Duration: {currentTopic.duration}
              </p>
            </div>
          )}

          {/* Course Overview */}
          {/* ... your overview content */}
          {/* <Card className="p-6 bg-gray-50"> */}
          <h3 className="font-semibold mb-3">Course Overview</h3>
          <p className="text-gray-700 leading-relaxed text-balance">
            Embark on a transformational journey into the dynamic world of User
            Experience (UX) Design with our comprehensive course, "Introduction
            to User Experience Design." This course is meticulously crafted to
            equip learners with the fundamental knowledge, practical skills, and
            strategic insights necessary to excel in crafting exceptional user
            experiences in the digital landscape.
          </p>
          {/* </Card> */}
        </section>
      </div>
    </main>
  );
}
