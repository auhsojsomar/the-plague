import { Product } from "@/src/shared/types/Product";
import CustomImage from "@/src/components/Shared/CustomImage";
import { toKebabCase } from "@/src/utils/stringUtils";
import { formatPrice } from "@/src/utils/priceUtils";
import { Tooltip } from "flowbite-react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import dynamic from "next/dynamic";
import IconSkeleton from "../../Skeleton/IconSkeleton";

const FontAwesomeIcon = dynamic(
  () =>
    import("@fortawesome/react-fontawesome").then((mod) => mod.FontAwesomeIcon),
  {
    ssr: false,
    loading: () => <IconSkeleton />,
  }
);

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const kebabCaseName = toKebabCase(product.name);
  const productLink = `/products/${kebabCaseName}`;

  return (
    <div className="relative rounded-md overflow-hidden border shadow-md bg-white">
      {/* Product card link wrapping the entire card */}
      <Link href={productLink} className="absolute inset-0 z-10" />

      {/* Product Image */}
      <div className="w-[230px] h-[230px]">
        <CustomImage
          className="w-full h-full"
          src={product.image.main || "image/product-placeholder.webp"} // Use main image or fallback to placeholder
          alt={kebabCaseName}
          imageClass="aspect-square object-cover"
          fill
          useBucket={
            product.image.main && !product.image.main.includes("placehold.co")
              ? true
              : false
          } // If no image or if it’s not a placehold.co domain, use the S3 bucket image
        />
      </div>

      {/* Product Details */}
      <div className="p-2">
        <h2 className="relative font-bold mb-2 h-12 line-clamp-2 z-20">
          {product.name}
        </h2>

        {/* Price Display */}
        {product.isSale ? (
          <div className="flex items-center">
            <span className="text-primary-color text-xl font-bold z-20">
              {product.salePrice !== undefined
                ? formatPrice(product.salePrice)
                : formatPrice(product.price)}
            </span>
            <span className="relative ml-2 text-sm text-gray-500 z-20 before:content-[''] before:w-full before:h-[1.1px] before:bg-gray-500 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-12">
              {product.price !== undefined ? formatPrice(product.price) : ""}
            </span>
          </div>
        ) : (
          <span className="relative text-secondary-color font-bold text-lg z-20">
            {product.price !== undefined ? formatPrice(product.price) : ""}
          </span>
        )}

        {/* Color Pills */}
        <div className="mt-4">
          {product.variants.map((variant) => (
            <div key={variant.id} className="relative inline-block mr-2 z-20">
              <Tooltip className="text-nowrap" content={variant.color.name}>
                <button
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: variant.color.hexCode }}
                ></button>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-4 relative z-20">
        <div className="flex  space-x-2">
          <button className="flex-1 font-medium rounded-md bg-primary-color text-white hover:opacity-80 transition">
            Buy Now
          </button>

          <Tooltip
            content="Add to cart"
            className="z-30 whitespace-nowrap max-w-xs"
          >
            <button className="flex items-center justify-center bg-secondary-color rounded-md hover:opacity-80 transition w-10 h-10">
              <div className="w-6 h-6">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-white text-xl w-full h-full"
                />
              </div>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
