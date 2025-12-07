"use client";

import React from "react";
import ReactSelect, { StylesConfig } from "react-select";

// Generic option type
interface Option<T> {
  label: string;
  value: T;
}

// Make MultiSelect generic over T
interface MultiSelectProps<T> {
  label?: string;
  options: Option<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
  placeholder?: string;
}

const customStyles: StylesConfig<any, true> = {
  control: (base, state) => ({
    ...base,
    borderRadius: "0.5rem",
    padding: "2px 6px",
    borderColor: state.isFocused ? "#0D6CB3" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 1px #0D6CB3" : "none",
    minHeight: "38px",
    "&:hover": { borderColor: "#0D6CB3" },
    backgroundColor: "white",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#0B5CA0",
    color: "white",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "white",
    ":hover": { backgroundColor: "#0B5CA0", color: "white" },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af", // gray-400
  }),
};

// Generic component declaration
export default function MultiSelect<T>({
  label,
  options,
  selected,
  onChange,
  placeholder = "Select...",
}: MultiSelectProps<T>) {
  const value = options.filter((opt) => selected.includes(opt.value));

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <ReactSelect
        isMulti
        options={options}
        value={value}
        onChange={(selectedOptions) =>
          onChange(selectedOptions.map((s: any) => s.value))
        }
        placeholder={placeholder}
        className="text-sm"
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </div>
  );
}
