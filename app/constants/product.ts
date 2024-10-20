import { Product } from "@/app/shared/types/Product";
import { Variant } from "@/app/shared/interfaces/Variant";

// Helper function to generate a single variant
const createVariant = (
  size: string,
  colorName: string,
  hex: string,
  quantity: number
): Variant => ({
  id: Math.random(), // Generates unique ID
  size: { id: Math.random(), name: size },
  color: { id: Math.random(), name: colorName, hex },
  quantity,
});

// Helper function to create a variant array for a product
const createVariants = (
  variantsData: {
    size: string;
    colorName: string;
    hex: string;
    quantity: number;
  }[]
): Variant[] =>
  variantsData.map(({ size, colorName, hex, quantity }) =>
    createVariant(size, colorName, hex, quantity)
  );

// List of products with multiple variants
const products: Product[] = [
  {
    productName: "Leather Bag",
    price: 99.12,
    image: "https://placehold.co/500x500",
    isSale: true,
    salePrice: 89.0,
    variants: createVariants([
      { size: "Large", colorName: "Brown", hex: "#8B4513", quantity: 10 },
      { size: "Medium", colorName: "Black", hex: "#000000", quantity: 5 },
      { size: "Small", colorName: "Tan", hex: "#D2B48C", quantity: 8 },
    ]),
  },
  {
    productName: "Premium Tote Bag",
    price: 129.99,
    image: "https://placehold.co/500x500",
    variants: createVariants([
      { size: "Large", colorName: "Tan", hex: "#D2B48C", quantity: 10 },
      { size: "Small", colorName: "Brown", hex: "#8B4513", quantity: 15 },
    ]),
  },
  {
    productName: "Classic Oxford Shoes",
    price: 179.0,
    image: "https://placehold.co/500x500",
    variants: createVariants([
      { size: "8", colorName: "Black", hex: "#000000", quantity: 5 },
      { size: "9", colorName: "Brown", hex: "#8B4513", quantity: 3 },
      { size: "10", colorName: "Blue", hex: "#0000FF", quantity: 2 },
    ]),
  },
  {
    productName: "Luxury Watch",
    price: 299.99,
    image: "https://placehold.co/500x500",
    variants: createVariants([
      { size: "One Size", colorName: "Gold", hex: "#FFD700", quantity: 2 },
      { size: "One Size", colorName: "Silver", hex: "#C0C0C0", quantity: 4 },
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
      productName: `${baseProduct.productName} ${i + 1}`, // Unique name
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
