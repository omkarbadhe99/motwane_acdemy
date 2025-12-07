"use client";

import { useState } from "react";
import { X, ChevronsUpDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

export default function Select2Multi({
  options = [],
  selected = [],
  onChange,
  placeholder = "Select options",
}: {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const remove = (value: string) => {
    onChange(selected.filter((v) => v !== value));
  };

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className="flex min-h-12 w-full items-center flex-wrap gap-1 rounded-md border px-3 py-2 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {selected.length === 0 && (
              <span className="text-gray-400">{placeholder}</span>
            )}

            {selected.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="flex items-center gap-1 py-1.5 px-2"
              >
                {item}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(item);
                  }}
                />
              </Badge>
            ))}

            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-40" />
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-2">
          <Input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />

          <div className="max-h-56 overflow-y-auto">
            {filtered.map((item) => (
              <div
                key={item}
                onClick={() => toggle(item)}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-md px-2 py-2 hover:bg-gray-100",
                  selected.includes(item) && "bg-gray-200"
                )}
              >
                <span>{item}</span>

                {selected.includes(item) && (
                  <X className="h-4 w-4 opacity-60" />
                )}
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-center text-sm text-gray-500 py-4">
                No options found
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
