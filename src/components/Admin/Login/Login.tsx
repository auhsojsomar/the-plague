"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomImage from "@/src/components/Shared/CustomImage";
import { loginAdmin } from "@/src/lib/api/adminApi";

interface LoginFormData {
  username: string;
  password: string;
}

export default function AdminLoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await loginAdmin(formData);
      setSuccessMessage(result.message);
      router.push("/admin/dashboard"); // Redirect to the admin dashboard
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred during login");
      } else {
        setError("An unknown error occurred during login");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
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
        className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Admin Log In
        </h2>

        {/* Error and Success Messages */}
        <div className="flex flex-col items-center">
          <div className="h-5">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {successMessage && (
              <div className="text-green-500 text-sm text-center">
                {successMessage}
              </div>
            )}
          </div>
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 mt-1 border rounded-md focus:border-transparent focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="p-2 mt-1 border rounded-md focus:border-transparent focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 text-white rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary-color hover:bg-secondary-color"
          } focus:border-transparent focus:ring-2 focus:ring-primary-color`}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
