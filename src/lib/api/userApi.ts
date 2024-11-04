export interface FormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
}

// Base URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (data: FormData) => {
  const response = await fetch(`${BASE_URL}/User/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return await response.json(); // Assuming the response returns the user or a success message
};
