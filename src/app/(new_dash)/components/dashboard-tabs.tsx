// "use client";

// import { useState } from "react";

// interface TabItem {
//   id: string;
//   label: string;
// }

// interface ReusableTabsProps {
//   tabs: TabItem[]; // menu list passed as props
//   defaultActive?: string; // optional default tab
//   onChange?: (tabId: string) => void; // callback when tab changes
// }

// export default function ReusableTabs({
//   tabs,
//   defaultActive,
//   onChange,
// }: ReusableTabsProps) {
//   const [activeTab, setActiveTab] = useState(defaultActive || tabs[0]?.id);

//   const handleClick = (id: string) => {
//     setActiveTab(id);
//     onChange?.(id);
//   };

//   return (
//     <div className="flex gap-6 border-b border-gray-200">
//       {tabs.map((tab) => (
//         <button
//           key={tab.id}
//           onClick={() => handleClick(tab.id)}
//           className={`px-1 py-3 text-sm font-medium border-b-2 transition ${
//             activeTab === tab.id
//               ? "border-blue-500 text-blue-600"
//               : "border-transparent text-gray-600 hover:text-gray-800"
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";

interface TabItem {
  id: string;
  label: string;
  href: string;
}

interface ReusableTabsProps {
  tabs: TabItem[];
  defaultActive?: string;
  onChange?: (tabId: string) => void;
}

export default function ReusableTabs({
  tabs,
  defaultActive,
  onChange,
}: ReusableTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActive || tabs[0]?.id);

  const handleClick = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className="flex gap-6  ">
      {tabs.map((tab) => (
        <Link key={tab.id} href={tab.href}>
          <button
            onClick={() => handleClick(tab.id)}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
