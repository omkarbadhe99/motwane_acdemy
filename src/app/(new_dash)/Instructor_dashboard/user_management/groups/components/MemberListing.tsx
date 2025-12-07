// "use client";

// import { Checkbox } from "@/src/components/ui/checkbox";
// import { Input } from "@/src/components/ui/input";
// import { Loader2 } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { member_list } from "@/src/services/Instructor/memberListService";

// interface Member {
//   id: string;
//   full_name: string;
// }
// type MemberListingProps = {
//   selected: number[];
//   onChange: (ids: number[]) => void;
// };
// export default function MemberListing({
//   selected,
//   onChange,
// }: MemberListingProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
//     new Set()
//   );

//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["member_list"],
//     queryFn: member_list,
//   });

//   const members: Member[] = data?.success?.users ?? [];

//   const toggleMember = (id: string) => {
//     const updated = new Set(selectedMembers);
//     updated.has(id) ? updated.delete(id) : updated.add(id);
//     setSelectedMembers(updated);
//   };

//   const filtered = members.filter((m) =>
//     m.full_name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (isLoading) {
//     return (
//       <div className="flex justify-center p-6">
//         <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 text-center">
//         <p className="text-red-600 font-medium">Failed to load members.</p>
//         <button
//           onClick={() => refetch()}
//           className="mt-2 text-blue-600 underline text-sm"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4">
//       {/* Search */}
//       <div className="mb-4">
//         <Input
//           placeholder="Search Members"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="h-10"
//         />
//       </div>

//       {/* Members */}
//       <div className="max-h-[48vh] md:max-h-80 overflow-y-auto divide-y pr-2 custom-scroll">
//         {filtered.length ? (
//           filtered.map((member) => (
//             <div
//               key={member.id}
//               className="flex items-center gap-3 p-3 hover:bg-gray-50 transition rounded-md"
//             >
//               <Checkbox
//                 checked={selectedMembers.has(member.id)}
//                 onCheckedChange={() => toggleMember(member.id)}
//                 className="
//                   border-[#0D6CB3]
//                   data-[state=checked]:bg-[#0D6CB3]
//                   data-[state=checked]:border-[#0D6CB3]
//                 "
//               />

//               <span className="text-sm font-medium text-gray-700">
//                 {member.full_name}
//               </span>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-6 text-muted-foreground text-sm">
//             No members found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { member_list } from "@/src/services/Instructor/memberListService";

interface Member {
  id: string;
  full_name: string;
}

type MemberListingProps = {
  selected: number[];
  onChange: (ids: number[]) => void;
};

export default function MemberListing({
  selected,
  onChange,
}: MemberListingProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["member_list"],
    queryFn: member_list,
  });

  const members: Member[] = data?.data ?? [];
  console.log("members", members);

  const toggleMember = (id: string) => {
    const numericId = Number(id);
    let updated: number[];

    if (selected.includes(numericId)) {
      updated = selected.filter((x) => x !== numericId);
    } else {
      updated = [...selected, numericId];
    }

    onChange(updated); // <-- IMPORTANT!
  };

  const filtered = members.filter((m) =>
    m.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 font-medium">Failed to load members.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 text-blue-600 underline text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <Input
          placeholder="Search Members"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10"
        />
      </div>

      <div className="max-h-[48vh] md:max-h-80 overflow-y-auto divide-y pr-2 custom-scroll">
        {filtered.length ? (
          filtered.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition rounded-md"
            >
              <Checkbox
                checked={selected.includes(Number(member.id))}
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
    </div>
  );
}
