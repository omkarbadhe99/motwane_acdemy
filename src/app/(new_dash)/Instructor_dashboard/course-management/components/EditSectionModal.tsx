"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

interface Lesson {
  title: string;
  description: string;
  vimeoCode: string;
  videoInfo: string;
}

interface Section {
  id: number;
  name: string;
  description: string;
  lessons: Lesson[];
}

interface EditSectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: Section | null;
  onSave: (updatedSection: Section) => void;
}

interface FormValues {
  name: string;
  description: string;
  lessons: Lesson[];
}

export default function EditSectionModal({
  open,
  onOpenChange,
  section,
  onSave,
}: EditSectionModalProps) {
  const { register, control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      lessons: [{ title: "", description: "", vimeoCode: "", videoInfo: "" }],
    },
  });

  const {
    fields: lessonFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "lessons",
  });

  useEffect(() => {
    if (section) {
      reset({
        name: section.name || "",
        description: section.description || "",
        lessons: section.lessons?.length
          ? section.lessons
          : [{ title: "", description: "", vimeoCode: "", videoInfo: "" }],
      });
    }
  }, [section, reset]);

  const onSubmit = (data: FormValues) => {
    if (section) {
      onSave({ id: section.id, ...data });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-3xl md:max-w-4xl p-6">
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 h-full flex flex-col"
        >
          {/* Section Fields */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Section Name
            </label>
            <input
              {...register("name")}
              placeholder="Section Name"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Section Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Section Description"
              rows={2}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
            />
          </div>

          {/* Lessons - Scrollable */}
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[400px] border p-3 rounded-md bg-gray-50">
            <h4 className="text-sm font-semibold mb-2">Lessons</h4>
            {lessonFields.map((lesson, index) => (
              <div
                key={lesson.id}
                className="border p-3 rounded-md space-y-2 relative bg-white"
              >
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-1 right-1 text-red-600 font-bold text-sm"
                >
                  X
                </button>

                <input
                  {...register(`lessons.${index}.title` as const)}
                  placeholder="Title"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                />
                <textarea
                  {...register(`lessons.${index}.description` as const)}
                  placeholder="Description"
                  rows={1}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    {...register(`lessons.${index}.vimeoCode` as const)}
                    placeholder="Vimeo Code"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                  <input
                    {...register(`lessons.${index}.videoInfo` as const)}
                    placeholder="Video Info"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  vimeoCode: "",
                  videoInfo: "",
                })
              }
              className="mt-1 text-sm px-3 py-1"
            >
              + Add Lesson
            </Button>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              size="sm"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
