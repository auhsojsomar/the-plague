import Cookies from "js-cookie";
import { BASE_URL } from "./BASE_URL";

interface LoginForm {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  expiresAt: Date;
  adminId: string;
}

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

  const responseData: LoginResponse = await response.json();
  const { token, expiresAt, adminId } = responseData;

  const expiresAtDate = new Date(expiresAt);

  Cookies.set("authToken", token, { expires: expiresAtDate });
  Cookies.set("adminId", adminId, { expires: expiresAtDate });

  return { message: "Login successfully", adminId };
};
