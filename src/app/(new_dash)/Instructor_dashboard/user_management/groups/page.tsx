"use client";

import { useState } from "react";
import { Layers, Plus, Users } from "lucide-react";

import { Button } from "@/src/components/ui/button";

import { MemberSelector } from "./components/MemberSelector";
import { AssignCourse } from "./components/AssignCourse";
import { EditGroup } from "./components/EditGroup";

import ReusableTabs from "../../../components/dashboard-tabs";
import { GroupModal } from "./components/CreateGroup";
import { useQuery } from "@tanstack/react-query";
// import ManageMembersDialog from "./components/ManageMembersDialog";
// import CheckboxMultiSelect from "@/src/components/CheckboxMultiSelect";
// Sample data
import { group_list } from "@/src/services/Instructor/groupListService";

interface Group {
  name: string;
  description: string;
  members: string[];
  courses: string[];
}
interface Member {
  id: string;
  name: string;
}

export default function GroupsPage() {
  const tabMenu = [
    {
      id: "users",
      label: "Users",
      href: "/Instructor_dashboard/user_management",
    },
    {
      id: "groups",
      label: "Groups",
      href: "/Instructor_dashboard/user_management/groups",
    },
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenAssignCourse, setIsDialogOpenAssignCourse] =
    useState(false);
  const [isDialogOpenEditGroup, setIsDialogOpenEditGroup] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const {
    data: group_lists,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["group-list"],
    queryFn: () => group_list(),
  });
  type GroupListType = {
    id: number;
    name: string;
    description: string;
    members_count: number;
    students_count: number;
    customers_count: number;
    courses_count: number;
  };

  const groupsData: GroupListType[] = group_lists?.success?.data || [];

  const [open, setOpen] = useState(false);
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Total Users */}
        <div className="bg-white border rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <p className="text-3xl font-bold mt-1">42</p>
          </div>
        </div>

        {/* Total Groups */}
        <div className="bg-white border rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <Layers size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Groups</p>
            <p className="text-3xl font-bold mt-1">8</p>
          </div>
        </div>
      </div>
      <ReusableTabs
        tabs={tabMenu}
        defaultActive="groups"
        onChange={(id) => console.log("Selected tab:", id)}
      />
      {/* Header */}
      <div className="flex justify-end items-center mb-6 mt-3">
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#0D6CB3] hover:bg-[#0B5CA0] text-white"
        >
          <Plus size={18} />
          Add New Group
        </Button>
      </div>
      {/* Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groupsData?.map((group, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top-left badges */}
            <div className="absolute top-4 right-4 flex flex-row gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0D6CB3] text-white shadow-sm">
                Customers {group.customers_count}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#48bc97] text-white shadow-sm">
                Students {group.students_count}
              </span>
            </div>

            {/* Group Info */}
            <div className="mt-5">
              <h2 className="text-xl font-bold text-gray-900">{group.name}</h2>
              <p className="text-gray-600 mt-1 line-clamp-2">
                {group.description}
              </p>
              <p className="text-gray-500 mt-3 text-sm">
                Total Members: {group.members_count}
              </p>
            </div>

            <hr className="border-gray-200 my-3" />

            {/* Action Buttons */}
            <div className="mt-auto flex gap-2 flex-wrap">
              <Button
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setIsDialogOpen(true);
                }}
                className="bg-[#0D6CB3] hover:bg-[#0B5CA0] text-white font-medium cursor-pointer"
                size="sm"
              >
                Manage Members
              </Button>

              <Button
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setIsDialogOpenAssignCourse(true);
                }}
                className="bg-[#00AF6F] hover:bg-[#00995a] text-white font-medium cursor-pointer"
                size="sm"
              >
                Assign Courses
              </Button>
              <Button
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setIsDialogOpenEditGroup(true);
                }}
                className="bg-[#029F92] hover:bg-[#027b6f] text-white font-medium cursor-pointer"
                size="sm"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
      <MemberSelector
        groupId={selectedGroupId}
        open={isDialogOpen}
        onCancel={() => {
          setIsDialogOpen(false);
        }}
      />
      <AssignCourse
        groupId={selectedGroupId}
        open={isDialogOpenAssignCourse}
        onCancel={() => {
          setIsDialogOpenAssignCourse(false);
        }}
      />
      <EditGroup
        groupId={selectedGroupId}
        open={isDialogOpenEditGroup}
        onCancel={() => {
          setIsDialogOpenEditGroup(false);
        }}
      />
      <GroupModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
