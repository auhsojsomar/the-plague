interface AdminData {
  adminId: string;
  username: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const verifyAdminToken = async (
  token: string,
  adminId: string | undefined
): Promise<boolean> => {
  if (!token) throw new Error("No auth token found.");

  try {
    const response = await fetch(`${BASE_URL}/Token/verify-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred.");
    }

    const data = await response.json();

    return data.adminId === adminId;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
