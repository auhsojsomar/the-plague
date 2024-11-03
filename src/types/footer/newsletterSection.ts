import { IconWithLink } from "../icons/iconWithLink";

export type NewsletterSection = {
  title: string;
  textbox: {
    placeholder: string;
  };
  button: {
    text: string;
  };
  CONNECT_US: {
    title: string;
    label: IconWithLink[];
  };
};
