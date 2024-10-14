import Link from "next/link";

type Banner = {
  category: string;
  description: string;
  link: string;
  vertical?: boolean;
};

const ProductBannerText = ({
  category,
  description,
  link,
  vertical,
}: Banner) => {
  return (
    <>
      {/* Check if vertical banner */}
      <div
        className={`text-center uppercase pb-20 flex flex-col justify-center${
          !vertical ? "  md:px-8" : " lg:justify-end"
        } h-full md:pb-0`}
      >
        <div
          className={`${
            vertical ? "lg:bg-gray-100 lg:py-5 lg:px-4 lg:mx-8 lg:mb-5" : ""
          }`}
        >
          <h6 className="text-2xl/10">{description}</h6>
          <h5 className="text-3xl/10">{category}</h5>
          <Link
            className="before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-primary-color before:-top-2 before:left-0 text-primary-color relative inline-block mt-7"
            href="/"
          >
            {link}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductBannerText;
