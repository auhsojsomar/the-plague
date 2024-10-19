import { MESSAGE } from "@/app/constants"; // Import your footer data
import FooterSection from "./FooterSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CustomImage from "@/app/components/Shared/CustomImage";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="bg-black/85 text-white p-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Contact Us Section */}
          <FooterSection
            title={MESSAGE.FOOTER.CONTACT_US.title}
            labels={MESSAGE.FOOTER.CONTACT_US.label}
            hasIcons={true}
          />

          {/* Information Section */}
          <FooterSection
            title={MESSAGE.FOOTER.INFORMATION.title}
            labels={MESSAGE.FOOTER.INFORMATION.label}
          />

          {/* Our Offers Section */}
          <FooterSection
            title={MESSAGE.FOOTER.OUR_OFFERS.title}
            labels={MESSAGE.FOOTER.OUR_OFFERS.label}
          />

          {/* Our Policy Section */}
          <FooterSection
            title={MESSAGE.FOOTER.OUR_POLICY.title}
            labels={MESSAGE.FOOTER.OUR_POLICY.label}
          />

          {/* Get Newsletters Section */}
          <div className="mb-6 flex flex-col sm:flex-row sm:col-span-2 lg:col-span-2 lg:flex-row xl:col-span-1 xl:flex-col">
            <div className="flex-1 lg:flex-initial">
              <h2 className="text-lg font-semibold mb-2 uppercase">
                {MESSAGE.FOOTER.GET_NEWSLETTERS.title}
              </h2>
              <div className="flex sm:mr-6 lg:mr-6 xl:mr-0">
                <input
                  type="email"
                  placeholder={
                    MESSAGE.FOOTER.GET_NEWSLETTERS.textbox.placeholder
                  }
                  className="pl-4 w-8/12 sm:text-xs text-gray-900 rounded-tl-full rounded-bl-full p-2 border-0 focus:ring-0"
                />
                <button className="bg-gray-700 rounded-tr-full rounded-br-full p-2 pr-4 w-4/12 sm:text-xs">
                  {MESSAGE.FOOTER.GET_NEWSLETTERS.button.text}
                </button>
              </div>
            </div>

            {/* Connect Us Section */}
            <div className="mt-6 sm:mt-0 sm:flex-1 lg:mt-0 lg:flex-initial xl:mt-6">
              <h2 className="text-lg font-semibold mb-2 uppercase">
                {MESSAGE.FOOTER.GET_NEWSLETTERS.CONNECT_US.title}
              </h2>
              <div className="flex space-x-3">
                {MESSAGE.FOOTER.GET_NEWSLETTERS.CONNECT_US.label.map(
                  (item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      className="text-gray-300 hover:text-white"
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-lg w-5 h-5 p-2 rounded-full border border-white hover:bg-primary-color hover:border-transparent"
                      />
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-secondary-color">
        <div className="container flex flex-col items-center sm:justify-between sm:flex-row">
          <span className="text-sm text-white order-2 sm:order-1 sm:self-end mb-3 hover:brightness-125">
            Copyright ©{" "}
            {
              <Link className="text-primary-color" href="/">
                The Plague.
              </Link>
            }{" "}
            All Rights Reserved
          </span>
          <div className="flex h-20 gap-4 my-4 order-1 sm:order-2">
            <CustomImage
              className="h-full w-auto" // Use h-full and w-auto to maintain aspect ratio
              src="/image/payment-cod.jpg"
              alt="payment-cod"
              useNextImage
              width={319}
              height={189}
            />
            <CustomImage
              className="h-full w-auto" // Use h-full and w-auto to maintain aspect ratio
              src="/image/payment-gcash.jpg"
              alt="payment-gcash"
              useNextImage
              width={319}
              height={189}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
