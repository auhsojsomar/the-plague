import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import ViewProductButton from "./ViewProductButton";
import { Product } from "@/app/shared/interfaces/Product";

// Utility function to convert a string to kebab-case
const toKebabCase = (str: string) =>
  str
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w-]+/g, "") // Remove all non-word characters except dashes
    .replace(/--+/g, "-") // Replace multiple dashes with a single dash
    .replace(/^-+|-+$/g, ""); // Trim dashes from start and end

const ProductCard = ({
  productName,
  image,
  price,
  isSale,
  salePrice,
}: Product) => {
  const formatPrice = (amount: number) => `₱${amount.toFixed(2)}`;
  const kebabCaseName = toKebabCase(productName); // Convert product name to kebab-case
  const productLink = `/products/${kebabCaseName}`; // Generate product link

  return (
    <div className="relative w-full h-auto aspect-square">
      {/* Product badge (show only if isSale is true) */}
      {isSale && (
        <span className="absolute -top-4 -left-4 z-10 flex items-center justify-center w-12 h-12 p-2 text-sm bg-white rounded-full">
          <p>Sale!</p>
        </span>
      )}

      {/* Product image */}
      <Image src={image} alt={kebabCaseName} fill className="object-cover" />

      {/* Product details */}
      <div className="absolute inset-0 flex flex-col items-center justify-center m-6 bg-gray-50 opacity-0 transition-opacity duration-300 hover:opacity-100 cursor-pointer">
        {/* Product name */}
        <Link href={productLink} className="uppercase text-black">
          {productName}
        </Link>

        {/* Product price */}
        <div>
          {isSale && salePrice && (
            <small className="relative px-1 text-gray-400 before:content-[''] before:w-full before:h-[1px] before:bg-gray-400 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-12">
              {formatPrice(salePrice)}
            </small>
          )}
          <small className="px-1">{formatPrice(price)}</small>
        </div>

        {/* Product action buttons */}
        <div className="mt-4">
          <ViewProductButton href={productLink} />
          <AddToCartButton />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
