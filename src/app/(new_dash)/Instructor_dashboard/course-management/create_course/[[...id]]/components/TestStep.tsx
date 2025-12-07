// "use client";

// import { useForm, useFieldArray } from "react-hook-form";

// interface Props {
//   onNext: () => void;
//   onPrev: () => void;
// }

// export default function TestStep({ onNext, onPrev }: Props) {
//   const { register, control, handleSubmit } = useForm({
//     defaultValues: {
//       attempts: "",
//       passingCriteria: "",
//       instructions: "",
//       questions: [
//         {
//           text: "",
//           options: [
//             { text: "", isCorrect: false },
//             { text: "", isCorrect: false },
//             { text: "", isCorrect: false },
//             { text: "", isCorrect: false },
//           ],
//         },
//       ],
//     },
//   });

//   const { fields: questionFields, append: appendQuestion } = useFieldArray({
//     control,
//     name: "questions",
//   });

//   const onSubmit = (data: any) => {
//     console.log("Test Step Payload:", data);
//     onNext();
//   };

//   const setCorrect = (qIndex: number, oIndex: number) => {
//     const newQuestions = questionFields.map((q, idx) => {
//       if (idx !== qIndex) return q;
//       return {
//         ...q,
//         options: q.options.map((opt, i) => ({
//           ...opt,
//           isCorrect: i === oIndex,
//         })),
//       };
//     });
//     // Update the form manually
//     newQuestions.forEach((q, i) => {
//       q.options.forEach((opt, j) => {
//         control.setValue(
//           `questions.${i}.options.${j}.isCorrect`,
//           opt.isCorrect
//         );
//       });
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Number of Attempts
//           </label>
//           <input
//             type="text"
//             {...register("attempts")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
//             placeholder="e.g., 3 or Unlimited"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Passing Criteria (%)
//           </label>
//           <input
//             type="text"
//             {...register("passingCriteria")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
//             placeholder="e.g., 70"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Test Instructions
//         </label>
//         <textarea
//           {...register("instructions")}
//           rows={4}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
//           placeholder="Enter test instructions..."
//         />
//       </div>

//       {/* Questions */}
//       {questionFields.map((question, qIndex) => (
//         <div key={qIndex} className="border rounded-lg p-6 space-y-4">
//           <h4 className="font-medium">Question {qIndex + 1}</h4>
//           <input
//             type="text"
//             {...register(`questions.${qIndex}.text`)}
//             placeholder="Question text"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           />
//           <div className="space-y-2">
//             {question.options.map((option, oIndex) => (
//               <div key={oIndex} className="flex items-center space-x-3">
//                 <input
//                   type="radio"
//                   checked={option.isCorrect}
//                   onChange={() => setCorrect(qIndex, oIndex)}
//                   className="h-4 w-4 text-[#086CB6]"
//                 />
//                 <input
//                   type="text"
//                   {...register(`questions.${qIndex}.options.${oIndex}.text`)}
//                   placeholder={`Option ${oIndex + 1}`}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={() =>
//           appendQuestion({
//             text: "",
//             options: [
//               { text: "", isCorrect: false },
//               { text: "", isCorrect: false },
//               { text: "", isCorrect: false },
//               { text: "", isCorrect: false },
//             ],
//           })
//         }
//         className="bg-[#086CB6] text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//       >
//         + Add Question
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

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { EditQuestionModal } from "./EditQuestionModal";
import { useState } from "react";
interface Props {
  onNext: () => void;
  onPrev: () => void;
}

// Zod schema for each option
const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

// Zod schema for each question
const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  options: z
    .array(optionSchema)
    .length(4)
    .refine(
      (opts) => opts.some((o) => o.isCorrect),
      "Select at least one correct option"
    ),
});

// Zod schema for the test form
const testSchema = z.object({
  attempts: z.string().min(1, "Number of attempts is required"),
  passingCriteria: z.string().min(1, "Passing criteria is required"),
  instructions: z.string().min(1, "Instructions are required"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

type TestForm = z.infer<typeof testSchema>;

export default function TestStep({ onNext, onPrev }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TestForm>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      attempts: "",
      passingCriteria: "",
      instructions: "",
      questions: [
        {
          text: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    },
  });

  const { fields: questionFields, append: appendQuestion } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data: TestForm) => {
    console.log("Test Step Payload:", data);
    onNext();
  };

  const questionsWatch = watch("questions");
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Attempts
            </label>
            <input
              type="text"
              {...register("attempts")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
              placeholder="e.g., 3 or Unlimited"
            />
            {errors.attempts && (
              <p className="text-red-500 text-sm">{errors.attempts.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passing Criteria (%)
            </label>
            <input
              type="text"
              {...register("passingCriteria")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
              placeholder="e.g., 70"
            />
            {errors.passingCriteria && (
              <p className="text-red-500 text-sm">
                {errors.passingCriteria.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Instructions
          </label>
          <textarea
            {...register("instructions")}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
            placeholder="Enter test instructions..."
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm">
              {errors.instructions.message}
            </p>
          )}
        </div>

        {/* Questions */}
        {questionFields.map((question, qIndex) => (
          <div key={question.id} className="border rounded-lg p-6 space-y-4">
            <h4 className="font-medium">Question {qIndex + 1}</h4>
            <input
              type="text"
              {...register(`questions.${qIndex}.text`)}
              placeholder="Question text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.questions?.[qIndex]?.text && (
              <p className="text-red-500 text-sm">
                {errors.questions[qIndex]?.text?.message}
              </p>
            )}

            <div className="space-y-2">
              {questionsWatch[qIndex].options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-3">
                  <Controller
                    control={control}
                    name={`questions.${qIndex}.options.${oIndex}.isCorrect`}
                    render={({ field }) => (
                      <input
                        type="radio"
                        checked={field.value}
                        onChange={() => {
                          // Only one correct per question
                          questionsWatch[qIndex].options.forEach((_, i) =>
                            setValue(
                              `questions.${qIndex}.options.${i}.isCorrect`,
                              i === oIndex
                            )
                          );
                        }}
                        className="h-4 w-4 text-[#086CB6]"
                      />
                    )}
                  />
                  <input
                    type="text"
                    {...register(`questions.${qIndex}.options.${oIndex}.text`)}
                    placeholder={`Option ${oIndex + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  {errors.questions?.[qIndex]?.options?.[oIndex]?.text && (
                    <p className="text-red-500 text-sm">
                      {
                        errors.questions[qIndex]?.options?.[oIndex]?.text
                          ?.message
                      }
                    </p>
                  )}
                </div>
              ))}
              {errors.questions?.[qIndex]?.options?.message && (
                <p className="text-red-500 text-sm">
                  {errors.questions[qIndex]?.options?.message}
                </p>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            appendQuestion({
              text: "",
              options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
              ],
            })
          }
          className="bg-[#086CB6] text-white px-4 py-2 rounded-lg cusror-pointer"
        >
          + Add Question
        </button>

        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onPrev}
            className="cursor-pointer px-6 py-2 rounded-lg border border-gray-300 text-gray-700 "
          >
            Previous
          </button>
          <button
            type="submit"
            className="cursor-pointer px-6 py-2 rounded-lg bg-[#086CB6] text-white "
          >
            Next
          </button>
        </div>
      </form>
      {/* -------------------------------------- */}
      {/*         Questions Table Section         */}
      {/* -------------------------------------- */}

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Questions Table</h3>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">#</th>
                <th className="px-4 py-2 text-left font-medium">Question</th>
                <th className="px-4 py-2 text-left font-medium">
                  Correct Answer
                </th>
                <th className="px-4 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {questionFields.map((q, index) => {
                const correct =
                  questionsWatch[index]?.options?.find((o) => o.isCorrect)
                    ?.text || "—";

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 max-w-[220px] truncate">
                      {questionsWatch[index]?.text || "-"}
                    </td>
                    <td className="px-4 py-2">{correct}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => setOpenModal(true)}
                        className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <EditQuestionModal open={openModal} onOpenChange={setOpenModal} />
      </div>
    </>
  );
}
