import { Product } from "@/src/shared/types/Product";
import { Discount, Variant } from "@/src/shared/interfaces/Variant";
import { Image } from "@/src/types/product/image";

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
    price: number;
    discount?: Discount;
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
    id: generateUniqueId(),
    name: "Leather Bag",
    description: "A stylish leather bag perfect for daily use.",
    price: 99.12,
    image: createImage("https://placehold.co/500x500?text=Leather+Bag", [
      "https://placehold.co/500x500?text=Leather+Bag+1",
      "https://placehold.co/500x500?text=Leather+Bag+2",
    ]),
    isSale: true,
    salePrice: 89.0,
    variants: createVariants([
      {
        size: "Large",
        colorName: "Brown",
        hexCode: "#8B4513",
        quantity: 10,
        price: 99.12,
        discount: { id: "1", type: "Percentage", value: 10 },
      },
      {
        size: "Medium",
        colorName: "Black",
        hexCode: "#000000",
        quantity: 5,
        price: 99.12,
      },
    ]),
  },
  {
    id: generateUniqueId(),
    name: "Premium Tote Bag",
    description: "A spacious tote bag for everyday essentials.",
    price: 129.99,
    image: createImage("https://placehold.co/500x500?text=Premium+Tote", [
      "https://placehold.co/500x500?text=Premium+Tote+1",
      "https://placehold.co/500x500?text=Premium+Tote+2",
    ]),
    isSale: false,
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
    id: generateUniqueId(),
    name: "Classic Oxford Shoes",
    description: "Elegant shoes suitable for formal occasions.",
    price: 179.0,
    image: createImage("https://placehold.co/600x600?text=Oxford+Shoes", [
      "https://placehold.co/500x500?text=Oxford+Shoes+1",
      "https://placehold.co/500x500?text=Oxford+Shoes+2",
    ]),
    isSale: false,
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
    ]),
  },
  {
    id: generateUniqueId(),
    name: "Luxury Watch",
    description: "A luxurious watch to elevate your style.",
    price: 299.99,
    image: createImage("https://placehold.co/500x500?text=Luxury+Watch", [
      "https://placehold.co/500x500?text=Luxury+Watch+1",
      "https://placehold.co/500x500?text=Luxury+Watch+2",
    ]),
    isSale: true,
    salePrice: 259.99,
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
  {
    id: generateUniqueId(),
    name: "Casual Sneakers",
    description: "Comfortable sneakers for everyday wear.",
    price: 59.99,
    image: createImage("https://placehold.co/500x500?text=Casual+Sneakers", [
      "https://placehold.co/500x500?text=Casual+Sneakers+1",
      "https://placehold.co/500x500?text=Casual+Sneakers+2",
    ]),
    isSale: true,
    salePrice: 49.99,
    variants: createVariants([
      {
        size: "10",
        colorName: "White",
        hexCode: "#FFFFFF",
        quantity: 20,
        price: 59.99,
      },
      {
        size: "11",
        colorName: "Black",
        hexCode: "#000000",
        quantity: 10,
        price: 59.99,
      },
    ]),
  },
  {
    id: generateUniqueId(),
    name: "Formal Blazer",
    description: "A sleek blazer for professional occasions.",
    price: 149.0,
    image: createImage("https://placehold.co/500x500?text=Formal+Blazer", [
      "https://placehold.co/500x500?text=Formal+Blazer+1",
      "https://placehold.co/500x500?text=Formal+Blazer+2",
    ]),
    isSale: false,
    variants: createVariants([
      {
        size: "Medium",
        colorName: "Gray",
        hexCode: "#808080",
        quantity: 8,
        price: 149.0,
      },
      {
        size: "Large",
        colorName: "Navy",
        hexCode: "#000080",
        quantity: 5,
        price: 149.0,
      },
    ]),
  },
  {
    id: generateUniqueId(),
    name: "Graphic T-Shirt",
    description: "A fun, casual t-shirt with unique graphics.",
    price: 25.0,
    image: createImage("https://placehold.co/500x500?text=Graphic+T-Shirt", [
      "https://placehold.co/500x500?text=Graphic+T-Shirt+1",
    ]),
    isSale: true,
    salePrice: 20.0,
    variants: createVariants([
      {
        size: "Small",
        colorName: "Red",
        hexCode: "#FF0000",
        quantity: 30,
        price: 25.0,
      },
      {
        size: "Medium",
        colorName: "Blue",
        hexCode: "#0000FF",
        quantity: 25,
        price: 25.0,
      },
    ]),
  },
  {
    id: generateUniqueId(),
    name: "Classic Sunglasses",
    description: "Stylish sunglasses with UV protection.",
    price: 45.0,
    image: createImage("https://placehold.co/500x500?text=Sunglasses", [
      "https://placehold.co/500x500?text=Sunglasses+1",
    ]),
    isSale: false,
    variants: createVariants([
      {
        size: "One Size",
        colorName: "Black",
        hexCode: "#000000",
        quantity: 50,
        price: 45.0,
      },
      {
        size: "One Size",
        colorName: "Brown",
        hexCode: "#8B4513",
        quantity: 40,
        price: 45.0,
      },
    ]),
  },
  {
    id: generateUniqueId(),
    name: "Backpack",
    description: "Durable backpack with multiple compartments.",
    price: 79.99,
    image: createImage("https://placehold.co/500x500?text=Backpack", [
      "https://placehold.co/500x500?text=Backpack+1",
    ]),
    isSale: true,
    salePrice: 69.99,
    variants: createVariants([
      {
        size: "Large",
        colorName: "Green",
        hexCode: "#008000",
        quantity: 20,
        price: 79.99,
      },
      {
        size: "Medium",
        colorName: "Gray",
        hexCode: "#808080",
        quantity: 15,
        price: 79.99,
      },
    ]),
  },
  {
    id: generateUniqueId(),
    name: "Wool Scarf",
    description: "A warm wool scarf for chilly days.",
    price: 35.0,
    image: createImage("https://placehold.co/500x500?text=Wool+Scarf", [
      "https://placehold.co/500x500?text=Wool+Scarf+1",
    ]),
    isSale: false,
    variants: createVariants([
      {
        size: "One Size",
        colorName: "Red",
        hexCode: "#FF0000",
        quantity: 25,
        price: 35.0,
      },
      {
        size: "One Size",
        colorName: "Blue",
        hexCode: "#0000FF",
        quantity: 30,
        price: 35.0,
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
