// "use client";

// import { useForm, useFieldArray, Controller } from "react-hook-form";

// interface Props {
//   onNext: () => void;
//   onPrev: () => void;
// }

// export default function ContentStep({ onNext, onPrev }: Props) {
//   const { control, handleSubmit, register } = useForm({
//     defaultValues: {
//       sections: [
//         {
//           name: "",
//           description: "",
//           lessons: [
//             { title: "", description: "", vimeoCode: "", videoInfo: "" },
//           ],
//         },
//       ],
//     },
//   });

//   const { fields: sectionFields, append: appendSection } = useFieldArray({
//     control,
//     name: "sections",
//   });

//   const onSubmit = (data: any) => {
//     console.log("Content Step Payload:", data);
//     onNext();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//       {sectionFields.map((section, sIndex) => (
//         <div key={section.id} className="border rounded-lg p-6 space-y-4">
//           <h3 className="text-lg font-semibold">Section {sIndex + 1}</h3>
//           <input
//             type="text"
//             {...register(`sections.${sIndex}.name` as const)}
//             placeholder="Section Name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           />
//           <textarea
//             {...register(`sections.${sIndex}.description` as const)}
//             placeholder="Section Description"
//             rows={2}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           />

//           {/* Lessons */}
//           <Controller
//             control={control}
//             name={`sections.${sIndex}.lessons`}
//             render={({ field }) => (
//               <div>
//                 {field.value.map((lesson: any, lIndex: number) => (
//                   <div
//                     key={lIndex}
//                     className="border rounded-lg p-4 mb-4 space-y-2"
//                   >
//                     <input
//                       {...register(
//                         `sections.${sIndex}.lessons.${lIndex}.title` as const
//                       )}
//                       placeholder="Lesson Title"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <textarea
//                       {...register(
//                         `sections.${sIndex}.lessons.${lIndex}.description` as const
//                       )}
//                       placeholder="Lesson Description"
//                       rows={2}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <input
//                       {...register(
//                         `sections.${sIndex}.lessons.${lIndex}.vimeoCode` as const
//                       )}
//                       placeholder="Vimeo Code"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <input
//                       {...register(
//                         `sections.${sIndex}.lessons.${lIndex}.videoInfo` as const
//                       )}
//                       placeholder="Video Info"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     field.value.push({
//                       title: "",
//                       description: "",
//                       vimeoCode: "",
//                       videoInfo: "",
//                     })
//                   }
//                   className="text-[#086CB6] hover:text-blue-700 text-sm font-medium"
//                 >
//                   + Add Lesson
//                 </button>
//               </div>
//             )}
//           />
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={() =>
//           appendSection({
//             name: "",
//             description: "",
//             lessons: [
//               { title: "", description: "", vimeoCode: "", videoInfo: "" },
//             ],
//           })
//         }
//         className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
//       >
//         + Add New Section
//       </button>

//       <div className="flex justify-between pt-6 border-t border-gray-200">
//         <button
//           type="button"
//           onClick={onPrev}
//           className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
//         >
//           Previous
//         </button>
//         <button
//           type="submit"
//           className="px-6 py-2 rounded-lg bg-[#086CB6] text-white hover:bg-blue-700"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditSectionModal from "./EditSectionModal";
interface Props {
  onNext: () => void;
  onPrev: () => void;
}

// Zod schema for lessons
const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  description: z.string().min(1, "Lesson description is required"),
  vimeoCode: z.string().min(1, "Vimeo code is required"),
  videoInfo: z.string().min(1, "Video info is required"),
});

// Zod schema for sections
const sectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  description: z.string().min(1, "Section description is required"),
  lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
});

// Zod schema for the full form
const contentSchema = z.object({
  sections: z.array(sectionSchema).min(1, "At least one section is required"),
});

type ContentForm = z.infer<typeof contentSchema>;

export default function ContentStep({ onNext, onPrev }: Props) {
  const [dummyData, setDummyData] = useState([
    { id: 1, name: "Section 1", description: "Description 1" },
    { id: 2, name: "Section 2", description: "Description 2" },
  ]);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContentForm>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      sections: [
        {
          name: "",
          description: "",
          lessons: [
            { title: "", description: "", vimeoCode: "", videoInfo: "" },
          ],
        },
      ],
    },
  });

  const { fields: sectionFields, append: appendSection } = useFieldArray({
    control,
    name: "sections",
  });

  const onSubmit = (data: ContentForm) => {
    console.log("Content Step Payload:", data);
    onNext();
  };

  // const Lessons = ({ sectionIndex }: { sectionIndex: number }) => {
  //   const { fields: lessonFields, append: appendLesson } = useFieldArray({
  //     control,
  //     name: `sections.${sectionIndex}.lessons`,
  //   });

  //   const sectionErrors = errors.sections?.[sectionIndex]?.lessons;

  //   return (
  //     <div>
  //       <h5 className="text-lg font-semibold mb-2">Lesson Details</h5>

  //       {lessonFields.map((lesson, lIndex) => (
  //         <div
  //           key={lesson.id}
  //           className="border rounded-lg p-3 mb-3 space-y-3 bg-gray-50"
  //         >
  //           {/* Lesson Title */}
  //           <div>
  //             <label className="text-sm font-medium">Lesson Title</label>
  //             <input
  //               {...register(
  //                 `sections.${sectionIndex}.lessons.${lIndex}.title` as const
  //               )}
  //               placeholder="Enter lesson title"
  //               className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
  //             />
  //           </div>

  //           {/* Lesson Description */}
  //           <div>
  //             <label className="text-sm font-medium">Description</label>
  //             <textarea
  //               {...register(
  //                 `sections.${sectionIndex}.lessons.${lIndex}.description` as const
  //               )}
  //               placeholder="Short description"
  //               rows={2}
  //               className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
  //             />
  //           </div>

  //           {/* Row: Vimeo Code + Video Info */}
  //           <div className="grid grid-cols-2 gap-3">
  //             <div>
  //               <label className="text-sm font-medium">Vimeo Code</label>
  //               <input
  //                 {...register(
  //                   `sections.${sectionIndex}.lessons.${lIndex}.vimeoCode` as const
  //                 )}
  //                 placeholder="Enter vimeo code"
  //                 className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
  //               />
  //             </div>

  //             <div>
  //               <label className="text-sm font-medium">Video Info</label>
  //               <input
  //                 {...register(
  //                   `sections.${sectionIndex}.lessons.${lIndex}.videoInfo` as const
  //                 )}
  //                 placeholder="Duration, quality, etc."
  //                 className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       ))}

  //       <button
  //         type="button"
  //         onClick={() =>
  //           appendLesson({
  //             title: "",
  //             description: "",
  //             vimeoCode: "",
  //             videoInfo: "",
  //           })
  //         }
  //         className="text-[#086CB6] hover:text-blue-700 text-sm font-medium"
  //       >
  //         + Add Lesson
  //       </button>
  //     </div>
  //   );
  // };

  const Lessons = ({ sectionIndex }: { sectionIndex: number }) => {
    const { fields: lessonFields, append: appendLesson } = useFieldArray({
      control,
      name: `sections.${sectionIndex}.lessons`,
    });

    const sectionErrors = errors.sections?.[sectionIndex]?.lessons;

    return (
      <div className="mt-4">
        <h5 className="text-lg font-semibold mb-2">Lesson Details</h5>

        {lessonFields.map((lesson, lIndex) => (
          <div
            key={lesson.id}
            className="border rounded-lg p-3 mb-3 space-y-3 bg-gray-50"
          >
            {/* Lesson Title */}
            <div>
              <label className="text-sm font-medium">Lesson Title</label>
              <input
                {...register(
                  `sections.${sectionIndex}.lessons.${lIndex}.title` as const
                )}
                placeholder="Enter lesson title"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
              />
              {sectionErrors?.[lIndex]?.title && (
                <p className="text-red-500 text-sm">
                  {sectionErrors[lIndex].title?.message}
                </p>
              )}
            </div>

            {/* Lesson Description */}
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                {...register(
                  `sections.${sectionIndex}.lessons.${lIndex}.description` as const
                )}
                placeholder="Short description"
                rows={2}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
              />
              {sectionErrors?.[lIndex]?.description && (
                <p className="text-red-500 text-sm">
                  {sectionErrors[lIndex].description?.message}
                </p>
              )}
            </div>

            {/* Vimeo Code + Video Info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Vimeo Code</label>
                <input
                  {...register(
                    `sections.${sectionIndex}.lessons.${lIndex}.vimeoCode` as const
                  )}
                  placeholder="Enter Vimeo code"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                />
                {sectionErrors?.[lIndex]?.vimeoCode && (
                  <p className="text-red-500 text-sm">
                    {sectionErrors[lIndex].vimeoCode?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Video Info</label>
                <input
                  {...register(
                    `sections.${sectionIndex}.lessons.${lIndex}.videoInfo` as const
                  )}
                  placeholder="Duration, quality, etc."
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                />
                {sectionErrors?.[lIndex]?.videoInfo && (
                  <p className="text-red-500 text-sm">
                    {sectionErrors[lIndex].videoInfo?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            appendLesson({
              title: "",
              description: "",
              vimeoCode: "",
              videoInfo: "",
            })
          }
          className="text-[#086CB6] hover:text-blue-700 text-sm font-medium"
        >
          + Add Lesson
        </button>
      </div>
    );
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);

  const handleEdit = (section: any) => {
    setSelectedSection(section);
    setOpenDialog(true);
  };

  const handleDelete = (sectionId: number) => {
    alert(`Delete section with ID ${sectionId}`);
    // implement delete logic here
  };
  const handleSave = (updatedSection: any) => {
    setDummyData((prev) =>
      prev.map((s) => (s.id === updatedSection.id ? updatedSection : s))
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {sectionFields.map((section, sIndex) => (
          <div key={section.id} className="border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Section {sIndex + 1}</h3>
            <input
              type="text"
              {...register(`sections.${sIndex}.name` as const)}
              placeholder="Section Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.sections?.[sIndex]?.name && (
              <p className="text-red-500 text-sm">
                {errors.sections[sIndex].name?.message}
              </p>
            )}

            <textarea
              {...register(`sections.${sIndex}.description` as const)}
              placeholder="Section Description"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.sections?.[sIndex]?.description && (
              <p className="text-red-500 text-sm">
                {errors.sections[sIndex].description?.message}
              </p>
            )}

            <Lessons sectionIndex={sIndex} />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            appendSection({
              name: "",
              description: "",
              lessons: [
                { title: "", description: "", vimeoCode: "", videoInfo: "" },
              ],
            })
          }
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 cursor-pointer"
        >
          + Add New Section
        </button>

        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onPrev}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Previous
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-[#086CB6] text-white cursor-pointer"
          >
            Next
          </button>
        </div>
      </form>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Sections Table</h3>
        <div className="overflow-x-auto rounded border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyData.map((section) => (
                <tr
                  key={section.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-3 py-2 whitespace-nowrap">{section.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {section.name}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-500">
                    {section.description}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap flex gap-1">
                    <button
                      onClick={() => handleEdit(section)}
                      className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      <FiEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(section.id)}
                      className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <EditSectionModal
          open={openDialog}
          onOpenChange={setOpenDialog}
          section={selectedSection}
          onSave={handleSave}
        />
      </div>
    </>
  );
}
