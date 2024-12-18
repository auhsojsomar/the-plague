import Link from "next/link";

type Banner = {
  title: string;
  description: string;
  label: string;
  vertical?: boolean;
};

const ProductBannerText = ({ title, description, label, vertical }: Banner) => {
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
            vertical ? "lg:bg-gray-50 lg:py-5 lg:px-4 lg:mx-8 lg:mb-5" : ""
          }`}
        >
          <h6 className="text-2xl/10">{description}</h6>
          <h5 className="text-3xl/10">{title}</h5>
          <Link
            className="before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-primary-color before:-top-2 before:left-0 text-primary-color relative inline-block mt-7"
            href="/"
          >
            {label}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductBannerText;
