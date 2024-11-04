"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic, e.g., API call
    console.log("Login submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Log In
        </h2>

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
            required
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
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
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
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
          className="w-full p-3 text-white rounded-md bg-primary-color hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-primary-color"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
