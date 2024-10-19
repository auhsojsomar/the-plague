import { Product } from "../shared/interfaces/Product";

export const bestProduct: Product[] = [
  {
    productName: "Leather Bag",
    price: 99.12,
    image: "https://placehold.co/500x500?text=Place+your+image+here",
    isSale: true,
    salePrice: 89.0,
  },
  {
    productName: "Leather Shoe",
    price: 149.99,
    image: "https://placehold.co/500x500?text=Place+your+image+here",
  },
  {
    productName: "Vintage Lambskin Shoe",
    price: 199.99,
    image: "https://placehold.co/500x500?text=Place+your+image+here",
  },
  {
    productName: "Skin Leather Bag",
    price: 129.99,
    image: "https://placehold.co/500x500?text=Place+your+image+here",
  },
  {
    productName: "Luxury Leather Bag",
    price: 299.99,
    image: "https://placehold.co/500x500?text=Place+your+image+here",
  },
];

// Featured products grouped into categories
export const featureProduct: {
  BEST_SELLER: Product[];
  NEW_PRODUCTS: Product[];
  MUST_HAVE: Product[];
} = {
  BEST_SELLER: [
    {
      productName: "Leather Bag",
      price: 99.12,
      image: "https://placehold.co/500x500",
      isSale: true,
      salePrice: 89.0,
    },
    {
      productName: "Premium Tote Bag",
      price: 129.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Designer Wallet",
      price: 59.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Classic Oxford Shoes",
      price: 179.0,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Luxury Watch",
      price: 299.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Travel Backpack",
      price: 89.99,
      image: "https://placehold.co/500x500",
      isSale: true,
      salePrice: 79.0,
    },
    {
      productName: "Elegant Handbag",
      price: 249.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Vintage Sunglasses",
      price: 79.99,
      image: "https://placehold.co/500x500",
    },
  ],
  NEW_PRODUCTS: [
    {
      productName: "Suede Backpack",
      price: 199.0,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Canvas Shoulder Bag",
      price: 89.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Wool Scarf",
      price: 39.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Sports Watch",
      price: 159.0,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Running Shoes",
      price: 129.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Casual T-Shirt",
      price: 19.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Hiking Boots",
      price: 189.0,
      image: "https://placehold.co/500x500",
      isSale: true,
      salePrice: 169.0,
    },
    {
      productName: "Summer Hat",
      price: 24.99,
      image: "https://placehold.co/500x500",
    },
  ],
  MUST_HAVE: [
    {
      productName: "Luxury Wallet",
      price: 59.99,
      image: "https://placehold.co/500x500",
      isSale: true,
      salePrice: 49.99,
    },
    {
      productName: "Leather Gloves",
      price: 79.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Classic Messenger Bag",
      price: 149.0,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Silk Tie",
      price: 29.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Formal Belt",
      price: 49.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Winter Jacket",
      price: 199.99,
      image: "https://placehold.co/500x500",
    },
    {
      productName: "Premium Socks",
      price: 9.99,
      image: "https://placehold.co/500x500",
      isSale: true,
      salePrice: 7.99,
    },
    {
      productName: "Leather Journal",
      price: 39.99,
      image: "https://placehold.co/500x500",
    },
  ],
};
