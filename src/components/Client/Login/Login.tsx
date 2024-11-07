"use client";

import { useState } from "react";
import Link from "next/link";
import CustomImage from "@/src/components/Shared/CustomImage";
import { LoginFormData, loginUser } from "@/src/lib/api"; // Import the loginUser function
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset any previous errors
    setLoading(true); // Set loading to true when submitting

    try {
      const result = await loginUser(formData); // Call loginUser with the form data
      setSuccessMessage(result);
      setTimeout(() => {
        router.push("/products"); // Redirect to /products
      }, 1500);
    } catch (error: unknown) {
      // Use unknown instead of any
      if (error instanceof Error) {
        setError(error.message || "An error occurred during login"); // Set error message
      } else {
        setError("An unknown error occurred during login");
      }
    } finally {
      setLoading(false); // Reset loading state after the request completes
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
        className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Log In
        </h2>

        {/* Error and Success Messages */}
        <div className="flex flex-col items-center">
          <div className="h-5">
            {" "}
            {/* Fixed height for message container */}
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

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-primary-color border-gray-300 rounded focus:ring-primary-color"
            />
            <span className="ml-2">Remember Me</span>
          </label>
          <Link
            className="text-sm text-primary-color hover:underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable button while loading
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
