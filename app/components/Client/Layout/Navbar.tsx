import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import LinkGeneric from "../../Shared/Link";

const Navbar = () => {
  return (
    <>
      <div className="bg-black">
        <div className="container">
          <div className="navbar h-20 py-0">
            <div className="navbar-start">
              <Image
                src="/favicon.ico"
                alt="Picture of the author"
                width={60}
                height={60}
              />
            </div>
            <div className="navbar-end h-full">
              <ul className="flex text-white items-center h-full">
                <li className="h-full">
                  <LinkGeneric href="/" exact>
                    Home
                  </LinkGeneric>
                </li>
                <li className="h-full">
                  <LinkGeneric href="/about-us" exact>
                    About Us
                  </LinkGeneric>
                </li>
                <li className="h-full">
                  <LinkGeneric href="/products">Products</LinkGeneric>
                </li>
                <li className="h-full">
                  <LinkGeneric href="/login" exact>
                    Login
                  </LinkGeneric>
                </li>
              </ul>
              <div className="dropdown dropdown-end">
                <FontAwesomeIcon
                  className="text-gray-100"
                  icon={faCartShopping}
                  height={18}
                  tabIndex={0}
                  cursor={"pointer"}
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 z-[1] w-52 p-2 shadow top-14"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
