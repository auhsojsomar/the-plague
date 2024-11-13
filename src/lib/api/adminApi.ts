import Cookies from "js-cookie";

interface LoginForm {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  expiresAt: Date;
  adminId: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginAdmin = async (data: LoginForm) => {
  const response = await fetch(`${BASE_URL}/Admin/login`, {
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
  const { token, expiresAt, adminId } = responseData; // Adjust this line according to your actual response structure

  // Convert expiresAt string to a Date object
  const expiresAtDate = new Date(expiresAt);

  // Store the token in cookies
  Cookies.set("authToken", token, { expires: expiresAtDate });
  Cookies.set("adminId", adminId, { expires: expiresAtDate });

  return "Login successfully";
};
