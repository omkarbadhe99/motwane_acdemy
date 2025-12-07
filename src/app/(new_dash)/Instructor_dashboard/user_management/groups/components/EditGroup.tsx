import { Button } from "@/src/components/ui/button";

import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  get_group_details,
  update_group,
} from "@/src/services/Instructor/groupListService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
interface EditGroupProps {
  groupId: number | null;
  onCancel: () => void;
  open: boolean;
}
const editGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().min(1, "Description is required"),
});
type EditGroupFormValues = z.infer<typeof editGroupSchema>;
export function EditGroup({ groupId, onCancel, open }: EditGroupProps) {
  const queryClient = useQueryClient();
  const {
    data: updatedData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["group-details", groupId],
    queryFn: () => get_group_details(groupId!),
    enabled: !!groupId,
  });
  const groupDetails = updatedData?.success?.group;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditGroupFormValues>({
    resolver: zodResolver(editGroupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  useEffect(() => {
    if (groupDetails) {
      reset({
        name: groupDetails.name || "",
        description: groupDetails.description || "",
      });
    }
  }, [groupDetails, reset]);

  const groupUpdateMutation = useMutation({
    mutationFn: (data: EditGroupFormValues) =>
      update_group({ group_id: groupId!, ...data }),
    onSuccess: (response) => {
      toast.success(response?.success?.msg || "Group updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["group-list"] });
      onCancel();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update group";
      toast.error(message);
    },
  });
  const onSubmit = (data: EditGroupFormValues) => {
    if (!groupId) return;
    groupUpdateMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-3xl w-full p-0">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold">Assign Courses</h1>
            <p className="text-sm text-muted-foreground">Select Courses</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
            {/* Form Fields */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Group Name
                </label>
                <Input placeholder="Enter group name" {...register("name")} />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  {...register("description")}
                  placeholder="Enter group description"
                  className="min-h-[100px]"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="border-[#0D6CB3] text-[#0D6CB3] hover:text-[#0D6CB3] cursor-pointer"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                disabled={groupUpdateMutation.isPending}
                type="submit"
                className="bg-[#0D6CB3] text-white hover:bg-[#0D6CB3] hover:text-white cursor-pointer"
              >
                {groupUpdateMutation.isPending ? "Save..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
