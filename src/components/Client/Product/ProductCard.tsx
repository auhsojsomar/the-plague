import { Product } from "@/src/shared/types/Product";
import CustomImage from "@/src/components/Shared/CustomImage";
import { toKebabCase } from "@/src/utils/stringUtils";
import { formatPrice } from "@/src/utils/priceUtils";
import { Tooltip } from "flowbite-react";
import Link from "next/link";

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
      <div className="w-[230px] h-[230px] relative">
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
        <div className="mt-4 pb-2">
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
    </div>
  );
};

export default ProductCard;
