import { Product } from "@/app/shared/types/Product";
import { Variant } from "@/app/shared/interfaces/Variant";
import { Image } from "@/app/types/product/image";
import { Discount } from "@/app/shared/interfaces/Variant";

// Helper function to generate a unique number ID
const generateUniqueId = () => Math.floor(Math.random() * 1000000).toString(); // Generate a random ID

// Helper function to generate a single variant
const createVariant = (
  size: string,
  colorName: string,
  hexCode: string,
  quantity: number,
  price: number
): Variant => ({
  id: generateUniqueId(), // Generates unique ID
  size: { id: generateUniqueId(), name: size }, // Unique ID for size
  color: { id: generateUniqueId(), name: colorName, hexCode }, // Unique ID for color
  price,
  quantity,
});

// Helper function to create a variant array for a product
const createVariants = (
  variantsData: {
    size: string;
    colorName: string;
    hexCode: string;
    quantity: number;
    price: number; // Added price field
  }[]
): Variant[] =>
  variantsData.map(({ size, colorName, hexCode, quantity, price }) =>
    createVariant(size, colorName, hexCode, quantity, price)
  );

// Helper function to create image structure
const createImage = (main: string, thumbnails: string[]): Image => ({
  main,
  thumbnails,
});

// List of products with multiple variants
const products: Product[] = [
  {
    id: "1", // Unique ID for the product
    name: "Leather Bag",
    description: "A stylish leather bag perfect for daily use.",
    price: 99.12,
    image: createImage("https://placehold.co/500x500", [
      "https://placehold.co/400?text=1",
      "https://placehold.co/400?text=2",
      "https://placehold.co/400?text=3",
    ]),
    isSale: true,
    salePrice: 89.0,
    discount: { id: "1", type: 1, value: 10 }, // Example discount
    variants: createVariants([
      {
        size: "Large",
        colorName: "Brown",
        hexCode: "#8B4513",
        quantity: 10,
        price: 99.12,
      },
      {
        size: "Medium",
        colorName: "Black",
        hexCode: "#000000",
        quantity: 5,
        price: 99.12,
      },
      {
        size: "Small",
        colorName: "Tan",
        hexCode: "#D2B48C",
        quantity: 8,
        price: 99.12,
      },
    ]),
  },
  {
    id: "2", // Unique ID for the product
    name: "Premium Tote Bag",
    description: "A spacious tote bag for everyday essentials.",
    price: 129.99,
    image: createImage("https://placehold.co/500x500", [
      "https://placehold.co/400?text=1",
      "https://placehold.co/400?text=2",
    ]),
    variants: createVariants([
      {
        size: "Large",
        colorName: "Tan",
        hexCode: "#D2B48C",
        quantity: 10,
        price: 129.99,
      },
      {
        size: "Small",
        colorName: "Brown",
        hexCode: "#8B4513",
        quantity: 15,
        price: 129.99,
      },
    ]),
  },
  {
    id: "3", // Unique ID for the product
    name: "Classic Oxford Shoes",
    description: "Elegant shoes suitable for formal occasions.",
    price: 179.0,
    image: createImage("https://placehold.co/500x500", [
      "https://placehold.co/400?text=1",
      "https://placehold.co/400?text=2",
    ]),
    variants: createVariants([
      {
        size: "8",
        colorName: "Black",
        hexCode: "#000000",
        quantity: 5,
        price: 179.0,
      },
      {
        size: "9",
        colorName: "Brown",
        hexCode: "#8B4513",
        quantity: 3,
        price: 179.0,
      },
      {
        size: "10",
        colorName: "Blue",
        hexCode: "#0000FF",
        quantity: 2,
        price: 179.0,
      },
    ]),
  },
  {
    id: "4", // Unique ID for the product
    name: "Luxury Watch",
    description: "A luxurious watch to elevate your style.",
    price: 299.99,
    image: createImage("https://placehold.co/500x500", [
      "https://placehold.co/400?text=1",
      "https://placehold.co/400?text=2",
    ]),
    variants: createVariants([
      {
        size: "One Size",
        colorName: "Gold",
        hexCode: "#FFD700",
        quantity: 2,
        price: 299.99,
      },
      {
        size: "One Size",
        colorName: "Silver",
        hexCode: "#C0C0C0",
        quantity: 4,
        price: 299.99,
      },
    ]),
  },
];

// Helper function to create a product list by duplicating sample products
const generateProductList = (count: number): Product[] => {
  const result: Product[] = [];
  for (let i = 0; i < count; i++) {
    const baseProduct = products[i % products.length];
    result.push({
      ...baseProduct,
      id: generateUniqueId(), // Unique ID
      name: `${baseProduct.name} ${i + 1}`, // Unique name
    });
  }
  return result;
};

// Featured products grouped into categories with 20 products each
export const featureProduct: {
  BEST_SELLER: Product[];
  NEW_PRODUCTS: Product[];
  MUST_HAVE: Product[];
} = {
  BEST_SELLER: generateProductList(20),
  NEW_PRODUCTS: generateProductList(20),
  MUST_HAVE: generateProductList(20),
};

// Best Products and generate 5 products
export const bestProduct: Product[] = generateProductList(5);

// Generate all products for Product list page
export const allProduct: Product[] = generateProductList(10);
