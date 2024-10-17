import Link from "next/link";
import { MESSAGE } from "@/app/constants";

const FeatureProductTitle = () => {
  const { FEATURE_PRODUCTS: { title } = {} } = MESSAGE;
  return (
    <ul className="flex uppercase text-secondary-color justify-center gap-x-5 text-base font-bold sm:text-2xl sm:gap-x-8">
      {title?.map((route, index) => (
        <li
          key={index}
          className={`relative group ${
            index % 2 === 0
              ? ""
              : `before:block before:absolute before:w-px before:bg-gray-400
                 before:h-full before:-left-2 before:top-0 before:sm:-left-4
                 after:block after:absolute after:w-px after:bg-gray-400
                 after:h-full after:-right-2 after:top-0 after:sm:-right-4`
          }`}
        >
          <Link href={route.link} scroll={false}>
            {route.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FeatureProductTitle;
