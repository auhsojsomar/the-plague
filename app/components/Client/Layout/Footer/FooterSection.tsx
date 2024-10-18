import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface LabelWithIcon {
  label: string;
  icon: any; // Replace with actual icon type if needed
}

interface LabelWithLink {
  label: string;
  link: string;
}

type Label = LabelWithIcon | LabelWithLink;

interface FooterSectionProps {
  title: string;
  labels: Label[];
  hasIcons?: boolean; // Optional prop to determine if the section has icons
}

const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  labels,
  hasIcons = false,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 uppercase">{title}</h2>
      <ul className="space-y-2">
        {labels.map((item, index) => (
          <li key={index} className="flex items-center">
            {hasIcons && "icon" in item && (
              <FontAwesomeIcon
                icon={item.icon}
                className="mr-2 text-gray-300"
              />
            )}
            {"link" in item ? (
              <Link
                href={item.link}
                className="text-gray-300 hover:text-primary-color"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-300">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
