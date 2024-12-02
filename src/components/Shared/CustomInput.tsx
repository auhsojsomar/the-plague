import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string; // Add an optional error prop
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`border p-2.5 text-sm rounded-lg w-full focus:ring-primary-color focus:border-primary-color ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100" : "bg-white"}`}
        {...props}
      />
      {/* Error message */}
      <p
        className={`text-red-500 my-1 text-sm h-5 transition-opacity ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error}
      </p>
    </div>
  );
};

export default CustomInput;
