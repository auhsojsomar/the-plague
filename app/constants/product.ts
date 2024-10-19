import { Product } from "../shared/types/Product";

// Helper function to generate a variant
const createVariant = (
  size: string,
  colorName: string,
  hex: string,
  quantity: number
) => ({
  id: Math.random(), // Generates unique ID
  size: { id: Math.random(), name: size },
  color: { id: Math.random(), name: colorName, hex },
  quantity,
});

// List of products (reusable data)
const products: Product[] = [
  {
    productName: "Leather Bag",
    price: 99.12,
    image: "https://placehold.co/500x500",
    isSale: true,
    salePrice: 89.0,
    variants: createVariant("Large", "Brown", "#8B4513", 10),
  },
  {
    productName: "Premium Tote Bag",
    price: 129.99,
    image: "https://placehold.co/500x500",
    variants: createVariant("Medium", "Tan", "#D2B48C", 8),
  },
  {
    productName: "Classic Oxford Shoes",
    price: 179.0,
    image: "https://placehold.co/500x500",
    variants: createVariant("10", "Black", "#000000", 5),
  },
  {
    productName: "Luxury Watch",
    price: 299.99,
    image: "https://placehold.co/500x500",
    variants: createVariant("One Size", "Silver", "#C0C0C0", 2),
  },
  // Add more products here to ensure each category has 20 items
];

// Helper function to create a product list by duplicating sample products
const generateProductList = (count: number): Product[] => {
  const result: Product[] = [];
  for (let i = 0; i < count; i++) {
    result.push({
      ...products[i % products.length], // Use modulo to cycle through sample products
      productName: `${products[i % products.length].productName} ${i + 1}`, // Unique name
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
