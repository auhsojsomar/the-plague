import { z } from "zod";

export const bannerSchema = z.object({
  name: z.string().min(1, { message: "Banner name is required" }),
  image: z.string().min(1, { message: "Image is required" }),
});
