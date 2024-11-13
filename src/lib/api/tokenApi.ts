import Cookies from "js-cookie";

const authToken = Cookies.get("authToken");
const adminId = Cookies.get("adminId");

interface AdminData {
  adminId: string;
  username: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const verifyAdminToken = async (): Promise<boolean> => {
  if (!authToken) {
    throw new Error("No auth token found.");
  }

  try {
    const response = await fetch(`${BASE_URL}/Token/verify-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data: AdminData = await response.json();

    if (data.adminId === adminId) return true;
    return false;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
