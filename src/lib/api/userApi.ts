import Cookies from "js-cookie";
import { BASE_URL } from "../BASE_URL";

export interface FormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginResponse {
  token: string;
  expiresAt: Date;
  userId: string;
}

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

export const loginUser = async (data: LoginFormData): Promise<string> => {
  const response = await fetch(`${BASE_URL}/User/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid username or password");
  }

  // Assuming the response contains a token you want to store
  const responseData: LoginResponse = await response.json();
  const { token, expiresAt, userId } = responseData; // Adjust this line according to your actual response structure

  // Convert expiresAt string to a Date object
  const expiresAtDate = new Date(expiresAt);

  // Store the token in cookies
  Cookies.set("authToken", token, { expires: expiresAtDate });
  Cookies.set("userId", userId, { expires: expiresAtDate });

  return "Login successfully";
};
