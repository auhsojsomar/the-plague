import ProductBannerImage from "./ProductBannerImage";
import ProductBannerText from "./ProductBannerText";

const ProductBanner = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 lg:px-0 py-12 sm:py-20">
      {/* row 1 column 1 */}
      <div className="relative min-h-60 order-1">
        <ProductBannerImage
          src="https://placehold.co/370x247?text=Place+your+image+here"
          alt="banner-1"
        />
      </div>
      {/* row 1 column 2 */}
      <div className="relative order-2">
        <ProductBannerText
          category="Send her your love"
          description="New design"
          link="Get it now"
        />
      </div>
      {/* row 2 column 1 */}
      <div className="relative order-4 md:order-3">
        <ProductBannerText
          category="Send her your love"
          description="New design"
          link="Get it now"
        />
      </div>
      {/* row 2 column 2 */}
      <div className="relative min-h-60 order-3 md:order-4">
        <ProductBannerImage
          src="https://placehold.co/370x247?text=Place+your+image+here"
          alt="banner-2"
        />
      </div>
      {/* row 1 & 2 column 3 */}
      <div className="relative min-h-[31rem] lg:row-span-2 lg:row-start-1 lg:col-start-3 order-5">
        <ProductBannerImage
          src="https://placehold.co/370x510?text=Place+your+image+here"
          alt="banner-3"
        />
      </div>
      {/* row 2 column 3 */}
      <div className="relative lg:row-start-2 lg:col-start-3 order-6">
        <ProductBannerText
          category="Mid season sale"
          description="Men’s Fashion"
          link="View Collection"
          vertical
        />
      </div>
    </div>
  );
};

export default ProductBanner;