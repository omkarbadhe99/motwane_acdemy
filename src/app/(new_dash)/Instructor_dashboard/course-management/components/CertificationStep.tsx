"use client";

import { useForm } from "react-hook-form";

interface Props {
  onPrev: () => void;
}

export default function CertificationStep({ onPrev }: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = (data: any) => {
    console.log("Certification Step Payload:", data);
    alert("Course creation complete! Check console for payloads.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certificate Title *
        </label>
        <input
          type="text"
          {...register("title")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
          placeholder="Enter certificate title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certificate Description *
        </label>
        <textarea
          {...register("description")}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
          placeholder="Describe what this certificate represents..."
        />
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 cusror-pointer"
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-[#086CB6] text-white cursor-pointer "
        >
          Save
        </button>
      </div>
    </form>
  );
}
