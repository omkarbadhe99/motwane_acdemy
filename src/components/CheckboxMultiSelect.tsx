// "use client";

// import Select, { components } from "react-select";

// // Custom checkbox option component
// const CheckboxOption = (props: any) => (
//   <components.Option {...props}>
//     <input
//       type="checkbox"
//       checked={props.isSelected}
//       onChange={() => null}
//       className="mr-2"
//     />
//     {props.label}
//   </components.Option>
// );

// export default function CheckboxMultiSelect({
//   options,
//   value,
//   onChange,
//   placeholder,
// }: any) {
//   return (
//     <Select
//       options={options}
//       value={value}
//       onChange={onChange}
//       isMulti
//       closeMenuOnSelect={false}
//       hideSelectedOptions={false}
//       components={{ Option: CheckboxOption }}
//       className="react-select-container"
//       classNamePrefix="react-select"
//       placeholder={placeholder}
//     />
//   );
// }

"use client";

import React from "react";
import Select, { components } from "react-select";

// ---------- Custom Checkbox Option ----------
const CheckboxOption = (props: any) => (
  <components.Option {...props}>
    <input
      type="checkbox"
      checked={props.isSelected}
      onChange={() => null}
      className="mr-2"
    />
    {props.label}
  </components.Option>
);

// ---------- Select All / Clear All Menu ----------
const CustomMenu = (props: any) => {
  const { options, selectProps } = props;

  const allSelected =
    selectProps.value?.length === options.length && options.length > 0;

  return (
    <>
      <div className="px-3 py-2 border-b bg-gray-50 flex items-center justify-between">
        <button
          className="text-blue-600 text-sm hover:underline"
          onClick={() => selectProps.onChange(options)}
        >
          Select All
        </button>

        <button
          className="text-red-500 text-sm hover:underline"
          onClick={() => selectProps.onChange([])}
        >
          Clear All
        </button>
      </div>
      <components.Menu {...props} />
    </>
  );
};

export default function CheckboxMultiSelect({
  options,
  value,
  onChange,
  placeholder,
}: any) {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option: CheckboxOption,
        Menu: CustomMenu,
      }}
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={placeholder}
      // Big lists need search → enabled by default
    />
  );
}
