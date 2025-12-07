// "use client";

// import { Checkbox } from "@/src/components/ui/checkbox";
// import { Input } from "@/src/components/ui/input";
// import { useState, useEffect, useMemo } from "react";
// import { group_list } from "@/src/services/Instructor/groupListService";
// import { useQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";

// interface Group {
//   id: number;
//   name: string;
//   is_assigned: number;
// }

// interface GroupListingProps {
//   userId?: number;
//   selected: number[];
//   onChange: (value: number[]) => void;
// }

// export function GroupListing({ userId, selected, onChange }: GroupListingProps) {
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["group_list", userId ?? null],
//     queryFn: () => group_list(userId),
//   });

//   const groups: Group[] = useMemo(() => {
//     return data?.success?.data ?? [];
//   }, [data?.success?.data]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedGroups, setSelectedGroups] = useState<Set<number>>(
//     new Set(selected)
//   );

//   // Sync when selected from parent changes
//   useEffect(() => {
//     setSelectedGroups(new Set(selected));
//   }, [selected]);

//   // --- FIX: Only run once when groups load and userId exists ---
//   useEffect(() => {
//     if (!userId) return;        // add mode → do nothing
//     if (!groups.length) return; // wait for API

//     const assigned = groups
//       .filter((g) => g.is_assigned === 1)
//       .map((g) => g.id);

//     setSelectedGroups(new Set(assigned));   // update local
//     onChange(assigned);                     // update RHF (safe after load)

//   }, [userId, groups]); // correct dependency

//   const toggleGroup = (groupId: number, checked: boolean) => {
//     setSelectedGroups((prev) => {
//       const updated = new Set(prev);
//       checked ? updated.add(groupId) : updated.delete(groupId);
//       onChange(Array.from(updated));
//       return updated;
//     });
//   };

//   const filteredGroups = groups.filter((g) =>
//     g.name.toLowerCase().includes(searchQuery.toLowerCase())
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
//         <p className="text-red-600 font-medium">Failed to load groups.</p>
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
//       <Input
//         placeholder="Search Groups"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="h-10 mb-4"
//       />

//       <div className="max-h-[20vh] overflow-y-auto pr-2 custom-scroll divide-y">
//         {filteredGroups.length ? (
//           filteredGroups.map((group) => (
//             <div
//               key={group.id}
//               className="flex items-center gap-5 p-3 hover:bg-gray-50 rounded-md"
//             >
//               <Checkbox
//                 checked={selectedGroups.has(group.id)}
//                 onCheckedChange={(checked) =>
//                   toggleGroup(group.id, checked === true)
//                 }
//                 className="
//                   border-[#0D6CB3]
//                   data-[state=checked]:bg-[#0D6CB3]
//                   data-[state=checked]:border-[#0D6CB3]
//                 "
//               />
//               <span className="text-sm font-medium text-gray-700">
//                 {group.name}
//               </span>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-6 text-muted-foreground text-sm">
//             No groups found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { Checkbox } from "@/src/components/ui/checkbox";
// import { Input } from "@/src/components/ui/input";
// import { useState, useEffect, useMemo } from "react";
// import { group_list } from "@/src/services/Instructor/groupListService";
// import { useQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";

// interface Group {
//   id: number;
//   name: string;
//   is_assigned: number;
// }

// interface GroupListingProps {
//   userId?: number;
//   selected: number[];
//   onChange: (value: number[]) => void;
// }

// export function GroupListing({ userId, selected, onChange }: GroupListingProps) {
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["group_list", userId ?? null],
//     queryFn: () => group_list(userId),
//     enabled: true,
//   });

//   const groups: Group[] = useMemo(() => data?.success?.data ?? [], [data]);

//   const [selectedGroups, setSelectedGroups] = useState<Set<number>>(
//     new Set(selected)
//   );

//   // Sync with parent
//   useEffect(() => {
//     setSelectedGroups(new Set(selected));
//   }, [selected]);

//   // --- PREFILL ONLY ONCE WHEN API LOADS (EDIT MODE) ---
//   useEffect(() => {
//     if (!userId) return;       // ADD MODE - skip
//     if (groups.length === 0) return;

//     const assigned = groups.filter(g => g.is_assigned === 1).map(g => g.id);

//     // Prevent unnecessary re-renders
//     const selectedArr = Array.from(selectedGroups).sort();
//     const assignedArr = [...assigned].sort();

//     if (JSON.stringify(selectedArr) !== JSON.stringify(assignedArr)) {
//       setSelectedGroups(new Set(assigned));
//       onChange(assigned);
//     }
//   }, [groups]); // runs only when groups load

//   const toggleGroup = (id: number, checked: boolean) => {
//     setSelectedGroups(prev => {
//       const updated = new Set(prev);
//       checked ? updated.add(id) : updated.delete(id);
//       onChange([...updated]);
//       return updated;
//     });
//   };

//   const [searchQuery, setSearchQuery] = useState("");
//   const filteredGroups = groups.filter(g =>
//     g.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (isLoading)
//     return (
//       <div className="flex justify-center p-6">
//         <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="p-4 text-center">
//         <p className="text-red-600 font-medium">Failed to load groups.</p>
//         <button onClick={() => refetch()} className="mt-2 text-blue-600 underline text-sm">
//           Retry
//         </button>
//       </div>
//     );

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4">
//       <Input
//         placeholder="Search Groups"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="h-10 mb-4"
//       />

//       <div className="max-h-[20vh] overflow-y-auto pr-2 divide-y">
//         {filteredGroups.length ? (
//           filteredGroups.map(group => (
//             <div
//               key={group.id}
//               className="flex items-center gap-5 p-3 hover:bg-gray-50 rounded-md"
//             >
//               <Checkbox
//                 checked={selectedGroups.has(group.id)}
//                 onCheckedChange={(checked) => toggleGroup(group.id, checked === true)}
//                 className="
//                   border-[#0D6CB3]
//                   data-[state=checked]:bg-[#0D6CB3]
//                   data-[state=checked]:border-[#0D6CB3]
//                 "
//               />
//               <span className="text-sm font-medium text-gray-700">{group.name}</span>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-6 text-muted-foreground text-sm">
//             No groups found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { useState, useEffect, useMemo, useRef } from "react";
import { group_list } from "@/src/services/Instructor/groupListService";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface Group {
  id: number;
  name: string;
  is_assigned: number;
}

interface GroupListingProps {
  userId?: number;
  selected: number[];
  onChange: (value: number[]) => void;
  initialValuesSet?: boolean; // Add this prop
}

export function GroupListing({ 
  userId, 
  selected, 
  onChange,
  initialValuesSet = false 
}: GroupListingProps) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["group_list", userId ?? null],
    queryFn: () => group_list(userId),
    enabled: true,
  });

  const groups: Group[] = useMemo(() => data?.success?.data ?? [], [data]);

  const [selectedGroups, setSelectedGroups] = useState<Set<number>>(
    new Set(selected)
  );
  
  // Track if we've already initialized from API
  const hasInitializedFromApi = useRef(false);

  // Sync with parent
  useEffect(() => {
    setSelectedGroups(new Set(selected));
  }, [selected]);

  // EDIT MODE → auto-assign groups from API
  useEffect(() => {
    if (!userId || groups.length === 0 || hasInitializedFromApi.current) {
      return;
    }

    const assigned = groups.filter(g => g.is_assigned === 1).map(g => g.id);

    // Mark that we've initialized
    hasInitializedFromApi.current = true;
    
    // Only update if we have assigned groups
    if (assigned.length > 0) {
      setSelectedGroups(new Set(assigned));
      
      // Use requestAnimationFrame to ensure this happens after render
      requestAnimationFrame(() => {
        onChange(assigned);
      });
    }
  }, [groups, userId]); // Remove onChange from dependencies

  // Reset initialization when userId changes
  useEffect(() => {
    hasInitializedFromApi.current = false;
  }, [userId]);

  const toggleGroup = (id: number, checked: boolean) => {
    setSelectedGroups(prev => {
      const updated = new Set(prev);
      checked ? updated.add(id) : updated.delete(id);
      const newValue = Array.from(updated);
      onChange(newValue);
      return updated;
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 font-medium">Failed to load groups.</p>
        <button onClick={() => refetch()} className="mt-2 text-blue-600 underline text-sm">
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Input
        placeholder="Search Groups"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-10 mb-4"
      />

      <div className="max-h-[20vh] overflow-y-auto pr-2 divide-y">
        {filteredGroups.length ? (
          filteredGroups.map(group => (
            <div
              key={group.id}
              className="flex items-center gap-5 p-3 hover:bg-gray-50 rounded-md"
            >
              <Checkbox
                checked={selectedGroups.has(group.id)}
                onCheckedChange={(checked) => toggleGroup(group.id, checked === true)}
                className="
                  border-[#0D6CB3]
                  data-[state=checked]:bg-[#0D6CB3]
                  data-[state=checked]:border-[#0D6CB3]
                "
              />
              <span className="text-sm font-medium text-gray-700">{group.name}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground text-sm">
            No groups found
          </div>
        )}
      </div>
    </div>
  );
}