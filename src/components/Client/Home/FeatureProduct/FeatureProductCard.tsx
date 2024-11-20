import { formatPrice } from "@/src/utils/priceUtils";
import { Product } from "@/src/shared/types/Product";
import CustomImage from "@/src/components/Shared/CustomImage";
import ViewProductButton from "@/src/components/Shared/ViewProductButton";
import AddToCartButton from "@/src/components/Shared/AddToCartButton";
import { toKebabCase } from "@/src/utils/stringUtils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const kebabCaseName = toKebabCase(product.name); // Convert product name to kebab-case
  const productLink = `/products/${kebabCaseName}`; // Generate product link

  return (
    <div className="text-center shadow-lg border">
      <div className="aspect-square h-64 relative">
        <CustomImage
          className="w-full h-full"
          imageClass="object-cover"
          src={product.image.main}
          alt={kebabCaseName}
          fill
        />
        {/* Product card on hover */}
        <div className="absolute inset-0 flex items-center justify-center m-4 sm:m-3 bg-gray-50 opacity-0 transition-opacity duration-300 hover:opacity-100 cursor-pointer">
          <ViewProductButton href={productLink} />
          <AddToCartButton />
        </div>
      </div>
      <div className="py-3">
        {/* Product name */}
        <h2 className="text-md">{product.name}</h2>
        {/* Show dash price if sale */}
        {product.isSale && product.salePrice && (
          <small className="relative px-1 text-gray-400 before:content-[''] before:w-full before:h-[1px] before:bg-gray-400 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-12">
            {formatPrice(product.salePrice)}
          </small>
        )}
        {/* Product original price */}
        <small className="px-1">{formatPrice(product.price)}</small>
      </div>
    </div>
  );
};

export default ProductCard;
