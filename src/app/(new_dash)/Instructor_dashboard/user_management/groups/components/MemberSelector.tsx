"use client";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { useEffect, useState } from "react";
import {
  get_group_details,
  update_group_mapping,
} from "@/src/services/Instructor/groupListService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
const memberSchema = z.object({
  members: z.array(z.number()).min(1, "Please select at least one member"),
});

type MemberFormType = z.infer<typeof memberSchema>;

interface Member {
  id: number;
  full_name: string;
  is_assigned: number;
}

interface MemberSelectorProps {
  groupId: number | null;
  onCancel: () => void;
  open: boolean;
}

export function MemberSelector({
  groupId,
  onCancel,
  open,
}: MemberSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Set<number>>(
    new Set()
  );
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm<MemberFormType>({
    resolver: zodResolver(memberSchema),
    defaultValues: { members: [] },
  });

  const { data: group_members, refetch } = useQuery({
    queryKey: ["group-members", groupId],
    queryFn: () => get_group_details(groupId!),
    enabled: !!groupId && open,
  });

  const group_member_lists: Member[] = group_members?.success?.all_users || [];

  useEffect(() => {
    if (!open || !groupId) return;

    refetch().then((res) => {
      const allMembers: Member[] = res.data?.success?.all_users || [];
      const assigned = allMembers
        .filter((m) => m.is_assigned === 1)
        .map((m) => m.id);

      setSelectedMembers(new Set(assigned));
      setValue("members", assigned);
    });
  }, [open, groupId, refetch, setValue]);

  const toggleMember = (id: number) => {
    const updated = new Set(selectedMembers);
    updated.has(id) ? updated.delete(id) : updated.add(id);

    setSelectedMembers(updated);
    setValue("members", Array.from(updated));
  };

  const filteredMembers = group_member_lists.filter((m) =>
    m.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateMemberMutation = useMutation({
    mutationFn: (data: MemberFormType) =>
      // Return the promise
      update_group_mapping({ group_id: groupId!, ...data }),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["group-list"] });
      toast.success(response?.success?.msg || "Memebers updated successfully");
      reset();
      onCancel();
    },
    onError: (error: any) => {
      console.error("Failed to update members:", error);
      toast.error("Failed to update memebers");
    },
  });

  const onSubmit = (data: MemberFormType) => {
    if (!groupId) return;

    updateMemberMutation.mutate(data);

    console.log("Final Payload:", {
      group_id: groupId,
      members: data.members ?? [],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-3xl w-full p-0">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold">Manage Members</h1>
            <p className="text-sm text-muted-foreground">
              Select members for this group
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("members")} />
            <div className="mb-4">
              <Input
                placeholder="Search Members"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10"
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
                      {member.full_name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No members found
                </div>
              )}
            </div>
            {errors.members && (
              <p className="text-red-500 text-sm mb-4">
                {errors.members.message}
              </p>
            )}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="border-[#0D6CB3] text-[#0D6CB3] hover-text-[#0D6CB3] cursor-pointer"
                onClick={onCancel}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={updateMemberMutation.isPending}
                className="bg-[#0D6CB3] text-white hover:bg-[#0B5CA0] cursor-pointer"
              >
                {updateMemberMutation.isPending ? "Save..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
