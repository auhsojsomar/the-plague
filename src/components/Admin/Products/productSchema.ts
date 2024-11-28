import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  image: z.object({
    main: z.string().min(1, { message: "Main image is required" }),
    thumbnails: z
      .array(z.string().url({ message: "Invalid thumbnail URL" }))
      .min(1, { message: "Please upload at least 1 thumbnail image" }),
  }),
  variants: z
    .array(
      z.object({
        size: z.object({
          name: z.string().min(1, { message: "Size name is required" }),
        }),
        color: z.object({
          name: z.string().min(1, { message: "Color name is required" }),
          hexCode: z.string().min(4, { message: "Hex code is invalid" }),
        }),
        price: z.number().positive({ message: "Price must be at least 1" }),
        quantity: z
          .number()
          .nonnegative({ message: "Quantity cannot be negative" }),
        discount: z
          .object({
            type: z.enum(["Percentage", "FixedAmount"], {
              message:
                "Discount type must be either 'Percentage' or 'FixedAmount'",
            }),
            value: z
              .number()
              .positive({ message: "Discount value must be positive" }),
          })
          .optional(),
      })
    )
    .min(1, { message: "At least one variant is required" }),
});

export { productSchema };
