"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Users, Layers, Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { AddUser } from "./components/addUserDialog";
import ReusableTabs from "../../components/dashboard-tabs";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { user_list } from "@/src/services/Instructor/groupListService";
import { Input } from "@/src/components/ui/input";

export type User = {
  id?: number;
  full_name: string;
  email: string;
  mobile_no: string;
  role_id: number;
};

interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export default function UsersPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userId, setUserId] = useState<User | null>(null);

  const columns: ColumnDef<User>[] = [
    {
      header: "#",
      id: "serial",
      cell: ({ row, table }) => { 
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        const serialNumber = pageIndex * pageSize + row.index + 1;
        return <span className="font-medium text-gray-700">{serialNumber}</span>;
      },
    },
    { header: "Name", accessorKey: "full_name" },
    { header: "Email", accessorKey: "email" },
    { header: "Phone", accessorKey: "mobile_no" },
    {
      header: "Role",
      accessorKey: "role_id",
      cell: ({ row }) => {
        const roleMap: any = { 1: "Student", 3: "Customer" };
        const role = roleMap[row.original.role_id] || "Unknown";
        const colorMap: any = {
          Student: "bg-violet-200 text-violet-800",
          Customer: "bg-yellow-200 text-yellow-800",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[role]}`}>
            {role}
          </span>
        );
      },
    },
    {
      header: "Actions",
      id: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setUserId(row.row.original);
              setIsAddUserOpen(true);
            }}
            size="icon"
          >
            <Edit2 size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      ),
    },
  ];


  const { data, isFetching } = useQuery<UserListResponse>({
    queryKey: ["user_list", pageIndex + 1], 
    queryFn: () => user_list(pageIndex + 1), 
    staleTime: 5000,
    
  });

  const users: User[] = data?.data || [];
  const totalUsers = data?.total || 0;
  const totalPages = data?.total_pages || 1;
  const perPage = data?.per_page || 10;


  const table = useReactTable({
    data: users,
    columns,
    manualPagination: true,
    pageCount: totalPages,
    rowCount: totalUsers,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: pageIndex,
        pageSize: perPage,
      }
    },
    onPaginationChange: (updater) => {
  
  const newState = typeof updater === 'function' 
    ? updater({ pageIndex, pageSize: perPage })
    : updater;
  
  setPageIndex(newState.pageIndex);
},
  });

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

  return (
   <div className="container mx-auto p-4">
  {/* TOP CARDS */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white border rounded-xl shadow-sm p-6 flex items-center gap-4">
      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
        <Users size={28} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">Total Users</p>
        <p className="text-3xl font-bold mt-1">{totalUsers}</p>
      </div>
    </div>

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

  {/* Tabs */}
  <ReusableTabs
    tabs={tabMenu}
    defaultActive="users"
    onChange={(id) => console.log("Selected tab:", id)}
  />

  {/* SEARCH & ADD BUTTON SECTION */}
  <div className="overflow-hidden rounded-lg shadow-md border bg-white mt-2">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b gap-4">
      {/* SEARCH INPUT */}
      <div className="relative w-full md:w-64">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-10 w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {/* ADD USER BUTTON */}
      <Button
        className="flex items-center gap-2 bg-[#0D6CB3] hover:bg-[#0B5CA0] text-white"
        onClick={() => {
          setUserId(null);
          setIsAddUserOpen(true);
        }}
      >
        <Plus size={18} /> Add New User
      </Button>
    </div>

    {/* TABLE */}
    <div className="overflow-x-auto relative">
      {isFetching && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-10">
          <p>Loading...</p>
        </div>
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-gray-600 text-sm font-medium"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                No users found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* PAGINATION */}
    <div className="flex justify-between items-center p-4 bg-white border-t">
      <p className="text-sm text-gray-700">
        Page <strong>{table.getState().pagination.pageIndex + 1}</strong> 
        {" "}of{" "}
        <strong>{table.getPageCount()}</strong> 
      </p>

      <div className="flex gap-3">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || isFetching}
        >
          Previous
        </Button>

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isFetching}
        >
          Next
        </Button>
      </div>
    </div>
  </div>

  <AddUser
    userId={userId?.id || null}
    open={isAddUserOpen}
    onCancel={() => {
      setIsAddUserOpen(false);
      setUserId(null);
    }}
  />
</div>
  );
}