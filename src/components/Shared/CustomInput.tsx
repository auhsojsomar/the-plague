interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 p-2.5 text-sm rounded-lg focus:ring-primary-color focus:border-primary-color w-full"
      {...props}
    />
  );
};

export default CustomInput;
