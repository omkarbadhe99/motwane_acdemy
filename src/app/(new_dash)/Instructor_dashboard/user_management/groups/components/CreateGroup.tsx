"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";

import MemberListing from "./MemberListing";
import { CourseListing } from "./CourseListing";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_group } from "@/src/services/Instructor/groupListService";
import { toast } from "sonner";

const GroupSchema = z.object({
  group_name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  members: z.array(z.number()).min(1, "Select at least one member"),
  courses: z.array(z.number()).min(1, "Select at least one course"),
});

type GroupType = z.infer<typeof GroupSchema>;

interface GroupModalProps {
  open: boolean;
  onClose: () => void;
}

export function GroupModal({ open, onClose }: GroupModalProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<GroupType>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      group_name: "",
      description: "",
      members: [],
      courses: [],
    },
  });

  const createGroupMutation = useMutation({
    mutationFn: create_group,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["group-list"] });
      console.log("Success:", response);
      toast.success("Group created!");
      onClose();
      reset();
      // queryClient.invalidateQueries(["group-list"]);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to create group";

      toast.error(message);
    },
  });

  const onSubmit = (data: GroupType) => {
    const fd = new FormData();
    fd.append("name", data.group_name);
    fd.append("description", data.description || "");
    data.members.forEach((m) => fd.append("members[]", String(m)));
    data.courses.forEach((c) => fd.append("courses[]", String(c)));

    createGroupMutation.mutate(fd);
    // createGroupMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-5xl sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Add New Group</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Group Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Group Name
            </label>
            <Input placeholder="Enter group name" {...register("group_name")} />
            {errors.group_name && (
              <p className="text-red-500 text-sm">
                {errors.group_name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              placeholder="Enter group description"
              rows={4}
              {...register("description")}
            />
          </div>

          {/* Members + Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Members */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Add Members
              </label>
              <Controller
                name="members"
                control={control}
                render={({ field }) => (
                  <MemberListing
                    selected={field.value ?? []}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.members && (
                <p className="text-red-500 text-sm">{errors.members.message}</p>
              )}
            </div>

            {/* Courses */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Assign Courses
              </label>
              <Controller
                name="courses"
                control={control}
                render={({ field }) => (
                  <CourseListing
                    selected={field.value ?? []}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.courses && (
                <p className="text-red-500 text-sm">{errors.courses.message}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#0D6CB3] text-[#0D6CB3] hover:bg-[#0D6CB3] hover:text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createGroupMutation.isPending}
              className="bg-[#0D6CB3] hover:bg-[#0B5CA0] text-white"
            >
              {createGroupMutation.isPending ? "Creating..." : "Create Group"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
