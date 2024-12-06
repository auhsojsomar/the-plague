import { formatPrice } from "@/src/utils/priceUtils";
import { Product } from "@/src/shared/types/Product";
import CustomImage from "@/src/components/Shared/CustomImage";
import { toKebabCase } from "@/src/utils/stringUtils";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const kebabCaseName = toKebabCase(product.name); // Convert product name to kebab-case
  const productLink = `/products/${kebabCaseName}`; // Generate product link

  return (
    <div className="relative text-center border overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <Link className="absolute inset-0 z-10" href={productLink} />
      <div className="aspect-square h-64 relative">
        <CustomImage
          className="w-full h-full"
          imageClass="object-cover"
          src={product.image.main}
          alt={kebabCaseName}
          fill
        />
      </div>
      <div className="py-3 bg-white">
        {/* Product name */}
        <h2 className="text-md font-semibold">{product.name}</h2>

        {/* Product original price */}
        <small className="px-1 text-primary-color">
          {formatPrice(product.price)}
        </small>

        {/* Show dash price if on sale */}
        {product.isSale && product.salePrice && (
          <small className="relative px-1 text-gray-400 before:content-[''] before:w-full before:h-[1px] before:bg-gray-400 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-12">
            {formatPrice(product.salePrice)}
          </small>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
