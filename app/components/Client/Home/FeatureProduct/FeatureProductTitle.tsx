"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MESSAGE } from "@/app/constants";

const FeatureProductTitle = () => {
  const { FEATURE_PRODUCTS: { title } = {} } = MESSAGE;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper to check if a link is active
  const isActive = (link: string) => {
    const [basePath, linkQuery] = link.split("?");
    if (pathname !== basePath) return false;

    if (linkQuery) {
      const linkParams = new URLSearchParams(linkQuery);
      return Array.from(linkParams.entries()).every(
        ([key, value]) => searchParams.get(key) === value
      );
    }
    return true;
  };

  const centerIndex = Math.floor((title?.length || 0) / 2);

  // Check if any route is currently active
  const anyActive = title?.some((route) => isActive(route.link));

  return (
    <ul className="flex flex-col items-center gap-x-5 sm:gap-x-8 sm:flex-row sm:items-start sm:justify-center">
      {title?.map((route, index) => {
        // Mark the link active if it matches OR it’s the center link when nothing else is active
        const active =
          isActive(route.link) || (!anyActive && index === centerIndex);

        return (
          <li
            key={index}
            className={`relative group before:hidden after:hidden my-1 sm:my-0 ${
              index % 2 === 0
                ? ""
                : `sm:before:block before:absolute before:w-px before:bg-gray-400
                   before:h-8 before:-left-2 before:top-0 before:sm:-left-4
                   sm:after:block after:absolute after:w-px after:bg-gray-400
                   after:h-8 after:-right-2 after:top-0 after:sm:-right-4`
            }`}
          >
            <Link
              className={`uppercase font-bold text-2xl text-nowrap ${
                active
                  ? "text-secondary-color"
                  : "text-gray-300 hover:text-primary-color"
              } px-2 py-1 rounded-md transition-colors duration-400`}
              href={route.link}
              scroll={false}
            >
              {route.label}
            </Link>
            {active && (
              <div
                className="rounded-full hidden sm:block h-4 w-4 left-1/2 -bottom-2 -translate-x-1/2 border-gray-400 border-2 border-solid relative
                before:content-[''] before:h-px before:w-10 before:bg-gray-400 before:absolute
                before:top-1/2 before:-translate-y-1/2 before:-left-12
                after:content-[''] after:h-px after:w-10 after:bg-gray-400 after:absolute
                after:top-1/2 after:-translate-y-1/2 after:-right-12"
              ></div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default FeatureProductTitle;
