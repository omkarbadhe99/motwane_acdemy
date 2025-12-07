// "use client";

// import { useForm } from "react-hook-form";

// interface Props {
//   onNext: () => void;
// }

// export default function CourseOverviewStep({ onNext }: Props) {
//   const { register, handleSubmit, watch, setValue } = useForm({
//     defaultValues: { name: "", description: "", thumbnail: null },
//   });

//   const thumbnailPreview = watch("thumbnail");

//   const onSubmit = (data: any) => {
//     console.log("Course Overview Payload:", data);
//     onNext();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Course Name *
//         </label>
//         <input
//           type="text"
//           {...register("name")}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
//           placeholder="Enter course name"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Course Description *
//         </label>
//         <textarea
//           {...register("description")}
//           rows={4}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
//           placeholder="Enter course description"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Course Thumbnail *
//         </label>
//         <input type="file" accept="image/*" />
//         {thumbnailPreview && (
//           <div className="mt-2">
//             <img
//               src={URL.createObjectURL(thumbnailPreview)}
//               alt="Thumbnail Preview"
//               className="w-32 h-32 object-cover"
//             />
//           </div>
//         )}
//       </div>

//       <div className="flex justify-end pt-6 border-t border-gray-200">
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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
  onNext: () => void;
}

// Zod schema for validation
const courseOverviewSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  description: z.string().min(1, "Course description is required"),
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, "Thumbnail is required"),
});

type CourseOverviewForm = z.infer<typeof courseOverviewSchema>;

export default function CourseOverviewStep({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CourseOverviewForm>({
    resolver: zodResolver(courseOverviewSchema),
    defaultValues: { name: "", description: "", thumbnail: null },
  });

  const watchThumbnail = watch("thumbnail");

  const onSubmit = (data: CourseOverviewForm) => {
    console.log("Course Overview Payload:", data);
    onNext();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("thumbnail", file, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Name *
        </label>
        <input
          type="text"
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
          placeholder="Enter course name"
        />
        {errors.name && (
          // <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Description *
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086CB6]"
          placeholder="Enter course description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Thumbnail *
        </label>
        <input type="file" accept="image/*" onChange={handleThumbnailChange} />
        {/* {errors.thumbnail && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.thumbnail?.message}
          </p>
        )} */}
        {watchThumbnail && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(watchThumbnail)}
              alt="Thumbnail Preview"
              className="w-32 h-32 object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-[#086CB6] text-white cusror-pointer"
        >
          Next
        </button>
      </div>
    </form>
  );
}
