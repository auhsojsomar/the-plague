import { Product } from "@/app/shared/types/Product";
import CustomImage from "@/app/components/Shared/CustomImage";
import { toKebabCase } from "@/app/utils/stringUtils";
import { formatPrice } from "@/app/utils/priceUtils";
import { Tooltip } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const kebabCaseName = toKebabCase(product.productName); // Convert product name to kebab-case
  const productLink = `/products/${kebabCaseName}`; // Generate product link

  return (
    <div className="max-w-sm rounded-md overflow-hidden border shadow-md bg-white">
      {/* Product Image */}
      <CustomImage
        src="/image/product-placeholder.jpg"
        alt={kebabCaseName}
        width={300}
        height={300}
        className="aspect-square object-cover"
        useNextImage
      />
      <div className="p-2">
        {/* Product Name */}
        <h2 className="font-bold mb-2 h-12 line-clamp-2">
          {product.productName}
        </h2>
        {product.isSale ? (
          <div className="flex items-center">
            <span className="text-primary-color text-xl font-bold">
              {formatPrice(product.salePrice)}
            </span>
            <span className="relative ml-2 text-gray-500 before:content-[''] before:w-full before:h-[1.1px] before:bg-gray-500 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-12">
              {formatPrice(product.price)}
            </span>
          </div>
        ) : (
          <span className="text-secondary-color font-bold text-lg">
            {formatPrice(product.price)}
          </span>
        )}
        <div className="mt-4">
          {product.variants.map((variant) => (
            <div className="inline-block mr-2">
              <Tooltip
                key={variant.id}
                content={variant.color.name}
                className={`!bg-[${variant.color.hex.replace("#", "")}]`}
              >
                <button
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: variant.color.hex }}
                ></button>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex space-x-4 mt-6">
          {/* Buy Now Button */}
          <button
            className="px-6 py-3 font-medium rounded-md text-white hover:opacity-80 transition"
            style={{
              backgroundColor: "var(--primary-color)",
            }}
          >
            Buy Now
          </button>

          {/* Add to Cart Button */}
          <button
            className="px-6 py-3 text-white font-medium rounded-md hover:opacity-80 transition"
            style={{
              backgroundColor: "var(--secondary-color)",
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
