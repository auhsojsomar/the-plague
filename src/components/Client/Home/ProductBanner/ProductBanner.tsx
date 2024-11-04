import ProductBannerImage from "./ProductBannerImage";
import ProductBannerText from "./ProductBannerText";
import { MESSAGE } from "@/src/constants";

const ProductBanner = () => {
  const { PRODUCT_BANNER } = MESSAGE;

  return (
    <div className="container grid grid-cols-1 gap-4 py-12 px-5 font-display sm:py-20 md:grid-cols-2 lg:grid-cols-3 lg:pt-0 lg:px-0">
      {/* Row 1 - Column 1 */}
      <div className="relative order-1 overflow-hidden w-full h-auto">
        <ProductBannerImage
          src={PRODUCT_BANNER[0].src}
          alt={PRODUCT_BANNER[0].alt}
          width={416}
          height={286}
        />
      </div>

      {/* Row 1 - Column 2 */}
      <div className="relative order-2">
        <ProductBannerText
          title={PRODUCT_BANNER[0].title} // Correct title
          description={PRODUCT_BANNER[0].description} // Correct description
          label={PRODUCT_BANNER[0].label}
        />
      </div>

      {/* Row 2 - Column 1 */}
      <div className="relative order-4 md:order-3">
        <ProductBannerText
          title={PRODUCT_BANNER[1].title} // Correct title
          description={PRODUCT_BANNER[1].description} // Correct description
          label={PRODUCT_BANNER[1].label}
        />
      </div>

      {/* Row 2 - Column 2 */}
      <div className="relative order-3 overflow-hidden w-full h-auto md:order-4">
        <ProductBannerImage
          src={PRODUCT_BANNER[1].src}
          alt={PRODUCT_BANNER[1].alt}
          width={416}
          height={286}
        />
      </div>

      {/* Row 1 & 2 - Column 3 */}
      <div className="relative min-h-[31rem] order-5 overflow-hidden w-full h-auto lg:row-span-2 lg:row-start-1 lg:col-start-3">
        <ProductBannerImage
          src={PRODUCT_BANNER[2].src}
          alt={PRODUCT_BANNER[2].alt}
          width={416}
          height={588}
        />
      </div>

      {/* Row 2 - Column 3 */}
      <div className="relative order-6 lg:row-start-2 lg:col-start-3">
        <ProductBannerText
          title={PRODUCT_BANNER[2].title} // Correct title
          description={PRODUCT_BANNER[2].description} // Correct description
          label={PRODUCT_BANNER[2].label}
          vertical
        />
      </div>
    </div>
  );
};

export default ProductBanner;
