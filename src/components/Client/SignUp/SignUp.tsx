"use client";

import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, FormData } from "@/lib/api/userApi";
import InputField from "@/shared/InputField";
import CustomImage from "@/src/components/Shared/CustomImage";

// Define Zod schema for form validation
const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Define individual field schemas
const fieldSchemas = {
  firstName: formSchema.shape.firstName,
  middleName: formSchema.shape.middleName,
  lastName: formSchema.shape.lastName,
  email: formSchema.shape.email,
  password: formSchema.shape.password,
};

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (field: keyof FormData) => {
    const schema = fieldSchemas[field];
    const result = schema.safeParse(formData[field]);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field]: result.error.errors[0].message,
      }));
    } else {
      setErrors((prev) => {
        const rest = { ...prev };
        delete rest[field];
        return rest;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const firstErrors = Object.fromEntries(
        Object.entries(result.error.formErrors.fieldErrors).map(
          ([field, messages]) => [field, messages?.[0] ?? ""]
        )
      );
      setErrors(firstErrors);
      return;
    }

    setLoading(true);

    try {
      await registerUser(formData);
      setSuccessMessage("You have successfully signed up!");

      // Redirect to login page after a short delay to show success message
      setTimeout(() => {
        router.push("/login"); // Redirect to /login
      }, 1500);

      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const apiError = error instanceof Error ? error.message : "Unknown error";
      setErrors({ api: apiError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh_-_5rem)] p-4 relative overflow-hidden">
      <div className="absolute -inset-4 bg-cover bg-center filter blur-sm -z-10 bg-no-repeat opacity-95">
        <CustomImage
          className="w-full h-full"
          imageClass="object-cover"
          src="main-banner.webp"
          alt="main-banner"
          fill
          quality={50}
          useBucket
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign Up
        </h2>

        {errors.api && (
          <div className="text-red-500 text-sm text-center">{errors.api}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-sm text-center">
            {successMessage}
          </div>
        )}

        <InputField
          id="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={() => handleBlur("firstName")}
          error={errors.firstName ? [errors.firstName] : undefined}
        />
        <InputField
          id="middleName"
          label="Middle Name (Optional)"
          value={formData.middleName ?? ""}
          onChange={handleChange}
          onBlur={() => handleBlur("middleName")}
        />
        <InputField
          id="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={() => handleBlur("lastName")}
          error={errors.lastName ? [errors.lastName] : undefined}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          error={errors.email ? [errors.email] : undefined}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          error={errors.password ? [errors.password] : undefined}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 text-white rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary-color hover:bg-secondary-color"
          } focus:border-transparent focus:ring-2 focus:ring-primary-color`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
