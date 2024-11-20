import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string[]; // Assuming this is an array of error messages
}

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
}: InputFieldProps) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="p-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary-color focus:border-transparent"
    />
    <span
      className={`text-red-500 my-1 text-sm transition-opacity ${
        error ? "opacity-100" : "opacity-0"
      } h-5`}
    >
      {error ? error.join(", ") : ""}
    </span>
  </div>
);

export default InputField;
