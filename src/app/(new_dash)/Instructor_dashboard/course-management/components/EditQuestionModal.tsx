"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";

import { useForm, Controller, useFieldArray } from "react-hook-form";

type EditQuestionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditQuestionModal({
  open,
  onOpenChange,
}: EditQuestionModalProps) {
  const { register, control, handleSubmit, watch, setValue } = useForm({
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

  const questionsWatch = watch("questions");

  const onSubmit = (values: any) => {
    console.log("EDITED TEST DATA:", values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-3xl md:max-w-4xl p-6">
        <DialogHeader>
          <DialogTitle>Edit Test / Questions</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Attempts + Passing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Number of Attempts</label>
              <input
                type="text"
                {...register("attempts")}
                className="w-full p-2 border rounded-md text-sm"
                placeholder="e.g., 3 or Unlimited"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Passing Criteria (%)
              </label>
              <input
                type="text"
                {...register("passingCriteria")}
                className="w-full p-2 border rounded-md text-sm"
                placeholder="e.g., 70"
              />
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="text-sm font-medium">Test Instructions</label>
            <textarea
              {...register("instructions")}
              rows={3}
              className="w-full p-2 border rounded-md text-sm"
              placeholder="Enter test instructions..."
            />
          </div>

          {/* Scrollable Questions */}
          <div className="max-h-[50vh] overflow-y-auto space-y-4 border p-2 rounded-md">
            {questionFields.map((question, qIndex) => (
              <div
                key={question.id}
                className="border rounded-md p-4 space-y-3 bg-gray-50"
              >
                <h4 className="font-medium text-sm">Question {qIndex + 1}</h4>

                <input
                  type="text"
                  {...register(`questions.${qIndex}.text`)}
                  placeholder="Question text"
                  className="w-full p-2 border rounded-md text-sm"
                />

                <div className="space-y-2">
                  {questionsWatch[qIndex].options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-3">
                      <Controller
                        name={`questions.${qIndex}.options.${oIndex}.isCorrect`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="radio"
                            checked={field.value}
                            onChange={() => {
                              questionsWatch[qIndex].options.forEach((_, i) =>
                                setValue(
                                  `questions.${qIndex}.options.${i}.isCorrect`,
                                  i === oIndex
                                )
                              );
                            }}
                          />
                        )}
                      />

                      <input
                        type="text"
                        {...register(
                          `questions.${qIndex}.options.${oIndex}.text`
                        )}
                        placeholder={`Option ${oIndex + 1}`}
                        className="flex-1 p-2 border rounded-md text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add Question */}
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
            className="bg-blue-600 text-white text-sm px-3 py-2 rounded-md"
          >
            + Add Question
          </button>

          <DialogFooter className="mt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm rounded-md border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-sm rounded-md bg-blue-600 text-white"
            >
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
