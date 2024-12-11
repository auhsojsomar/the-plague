import { Label } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import CustomInput from "@/shared/CustomInput";
import { Banner } from "@/src/shared/interfaces/Banner";

interface BannerNameInputProps {
  name: string;
  setName: Dispatch<SetStateAction<Banner>>;
  errors: { [key: string]: string };
  setErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const BannerNameInput: React.FC<BannerNameInputProps> = ({
  name,
  setName,
  errors,
  setErrors,
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName((prev) => ({
      ...prev,
      name: e.target.value,
    }));

    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors.name;
      return updatedErrors;
    });
  };
  return (
    <div>
      <Label
        htmlFor="productName"
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        Banner Name
      </Label>
      <CustomInput
        id="productName"
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter banner name"
        error={errors.name}
      />
    </div>
  );
};

export default BannerNameInput;
