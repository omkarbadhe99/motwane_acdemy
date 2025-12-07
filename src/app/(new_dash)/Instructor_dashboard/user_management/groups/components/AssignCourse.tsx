"use client";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import {
  get_group_details,
  update_group_courses,
} from "@/src/services/Instructor/groupListService";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const memberSchema = z.object({
  courses: z.array(z.number()).min(1, "Please select at least one course"),
});

type MemberFormType = z.infer<typeof memberSchema>;

interface Member {
  groupId: number;
  id: number;
  name: string;
  is_assigned: number;
}

interface MemberSelectorProps {
  groupId: number | null;
  onCancel: () => void;
  open: boolean;
}

export function AssignCourse({ groupId, onCancel, open }: MemberSelectorProps) {
  const [selectedMembers, setSelectedMembers] = useState<Set<number>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const { handleSubmit, setValue, register, reset } = useForm<MemberFormType>({
    resolver: zodResolver(memberSchema),
    defaultValues: { courses: [] },
  });

  const { data: assign_courses, refetch } = useQuery({
    queryKey: ["assign_course_list", groupId],
    queryFn: () => get_group_details(groupId!),
    enabled: !!groupId && open,
  });

  const group_member_lists: Member[] =
    assign_courses?.success?.all_courses || [];

  useEffect(() => {
    if (!open || !groupId) return;

    // Clear instantly
    setSelectedMembers(new Set());

    refetch().then((res) => {
      const allMembers: Member[] = res.data?.success?.all_courses || [];

      const assigned = allMembers
        .filter((m) => m.is_assigned === 1)
        .map((m) => m.id);

      setSelectedMembers(new Set(assigned));
    });
  }, [open, groupId, refetch]);

  // Toggle checkbox selection
  const toggleMember = (id: number) => {
    setSelectedMembers((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return new Set(updated);
    });
  };

  useEffect(() => {
    setValue("courses", Array.from(selectedMembers));
  }, [selectedMembers, setValue]);

  const filteredMembers = group_member_lists.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateMemberMutation = useMutation({
    mutationFn: (data: MemberFormType) =>
      update_group_courses({ group_id: groupId!, ...data }),

    onSuccess: (response) => {
      toast.success(response?.success?.msg || "Courses updated successfully");

      queryClient.invalidateQueries({ queryKey: ["group-list"] });
      reset();
      onCancel();
    },

    onError: (error) => {
      console.error("Failed to update members:", error);
      toast.error("Failed to update courses");
    },
  });

  const onSubmit = (data: MemberFormType) => {
    updateMemberMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-3xl w-full p-0">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-xl font-semibold">Assign Courses</h1>
            <p className="text-sm text-muted-foreground">Select Courses</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("courses")} />

            <div className="mb-6">
              <Input
                placeholder="Search Courses"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="max-h-[48vh] md:max-h-80 overflow-y-auto divide-y pr-2 custom-scroll rounded-md border p-2 mb-6">
              {filteredMembers.length ? (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 transition rounded-md"
                  >
                    <Checkbox
                      checked={selectedMembers.has(member.id)}
                      onCheckedChange={() => toggleMember(member.id)}
                      className="
                        border-[#0D6CB3]
                        data-[state=checked]:bg-[#0D6CB3]
                        data-[state=checked]:border-[#0D6CB3]
                      "
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {member.name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No courses found
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="border-[#0D6CB3] text-[#0D6CB3]"
                onClick={onCancel}
              >
                Cancel
              </Button>

              <Button
                disabled={updateMemberMutation.isPending}
                type="submit"
                className="bg-[#0D6CB3] text-white"
              >
                {updateMemberMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
