


"use client";
import {  
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { CourseListing } from "../groups/components/CourseListing";
import { Button } from "@/src/components/ui/button";
import { GroupListing } from "../groups/components/GroupListing";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddUserFormValues,
  addUserSchema,
} from "@/src/schemas/Instructor/addUserSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  create_user,
  update_user,
  user_details,
} from "@/src/services/Instructor/groupListService";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface AddUserProps {
  userId: number | null;
  onCancel: () => void;
  open: boolean;
}

export function AddUser({ userId, onCancel, open }: AddUserProps) {
  const { data: updateUserData, refetch } = useQuery({
    queryKey: ["user_details", userId],
    queryFn: () => user_details(userId!),
    enabled: !!userId && open,
  });

  const userData = updateUserData?.success?.user;

  const queryClient = useQueryClient();
  
  // Add state to track initial form setup
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      full_name: "",
      email: "",
      mobile_no: "",
      role_id: "",
      group_ids: [],
      courses: [],
    },
  });
  
  useEffect(() => {
    if (userData) {
      reset({
        full_name: userData.full_name || "",
        email: userData.email || "",
        mobile_no: userData.mobile_no || "",
        role_id: String(userData.role_id) || "",
        // Leave group_ids and courses empty - they'll be set by child components
      });
      setInitialValuesSet(true);
    }
  }, [userData, reset]);
  
  useEffect(() => {
    if (open && !userId) {
      reset({
        full_name: "",
        email: "",
        mobile_no: "",
        role_id: "",
        group_ids: [],
        courses: [],
      });
      setInitialValuesSet(false);
    }
  }, [open, userId, reset]);

  const createUserMutation = useMutation({
    mutationFn: create_user,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user_list"] });
      toast.success("User created successfully!");
      onCancel();
      reset();
      setInitialValuesSet(false);
    },
    onError: (error) => {
      const backendErrors = (error as any)?.response?.data?.errors;
      if (backendErrors) {
        Object.keys(backendErrors).forEach((field) => {
          setError(field as keyof AddUserFormValues, {
            type: "server",
            message: backendErrors[field][0],
          });
        });
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: update_user,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user_list"] });
      toast.success("User Updated successfully!");
      onCancel();
      reset();
      setInitialValuesSet(false);
    },
    onError: (error) => {
      const backendErrors = (error as any)?.response?.data?.errors;
      if (backendErrors) {
        Object.keys(backendErrors).forEach((field) => {
          setError(field as keyof AddUserFormValues, {
            type: "server",
            message: backendErrors[field][0],
          });
        });
      }
    },
  });
  
  const onSubmit = (data: AddUserFormValues) => {
    if (!userId) {
      createUserMutation.mutate(data);
    } else {
      updateMutation.mutate({ user_id: userId, ...data });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-full max-w-3xl md:max-w-4xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>{userId ? "Update User" : 'Add New User'}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Full Name Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              {errors.full_name && (
                <p className="text-red-500 text-sm">
                  {errors.full_name.message}
                </p>
              )}
              <Input 
                placeholder="Enter name" 
                {...register("full_name")} 
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <Input
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              {errors.mobile_no && (
                <p className="text-red-500 text-sm">{errors.mobile_no.message}</p>
              )}
              <Input 
                placeholder="Enter phone number" 
                {...register("mobile_no")} 
              />
            </div>

            {/* Role Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Role</label>
              {errors.role_id && (
                <p className="text-red-500 text-sm">{errors.role_id.message}</p>
              )}
              <Controller
                name="role_id"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Student</SelectItem>
                      <SelectItem value="3">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Assign to Group Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Assign to Group
              </label>
              {errors.group_ids && (
                <p className="text-red-500 text-sm">
                  {errors.group_ids.message}
                </p>
              )}
              <Controller
                name="group_ids"
                control={control}
                render={({ field }) => (
                  <GroupListing
                    userId={userId ?? undefined}
                    selected={field.value ?? []}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    initialValuesSet={initialValuesSet}
                  />
                )}
              />
            </div>

            {/* Assign Courses Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Assign Courses
              </label>
              {errors.courses && (
                <p className="text-red-500 text-sm">{errors.courses.message}</p>
              )}
              <Controller
                name="courses"
                control={control}
                render={({ field }) => (
                  <CourseListing
                    userId={userId ?? undefined}
                    selected={field.value ?? []}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    initialValuesSet={initialValuesSet}
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              className="border-[#0D6CB3] text-[#0D6CB3] hover:text-[#0D6CB3] cursor-pointer"
              onClick={() => {
                reset();
                setInitialValuesSet(false);
                onCancel();
              }}
            >
              Cancel
            </Button>

            <Button
  type="submit"
  className="bg-[#0D6CB3] hover:bg-[#0B5CA0] text-white cursor-pointer"
  disabled={createUserMutation.isPending || updateMutation.isPending}
>
  {createUserMutation.isPending || updateMutation.isPending ? (
    <>
      
      {userId ? "Updating..." : "Creating..."}
    </>
  ) : (
    userId ? "Update User" : "Create User"
  )}
</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}