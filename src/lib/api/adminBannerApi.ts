import { Banner, BannerDto } from "@/src/shared/interfaces/Banner";
import { BASE_URL } from "../BASE_URL";

export const getBanner = async (): Promise<BannerDto[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Banner`);

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data = await response.json();
    return data as BannerDto[];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const insertBanner = async (banner: Banner): Promise<BannerDto> => {
  try {
    const response = await fetch(`${BASE_URL}/Banner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(banner),
    });

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data = await response.json();
    return data as BannerDto;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const updateBanner = async (
  banner: Banner,
  id: string
): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/Banner/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(banner),
    });

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    return "Banner updated successfully";
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const deleteBanner = async (id: string): Promise<string> => {
  const response = await fetch(`${BASE_URL}/Banner/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred.");
    }
  }

  return "Banner deleted sucessfully";
};
