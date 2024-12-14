import { BannerType } from "@/enums/BannerType";

interface Base {
  name: string;
  image: string;
  bannerType: BannerType;
}

export type Banner = Base;

export interface BannerDto extends Base {
  id: string;
  dateCreated: Date;
  dateModified: Date;
}
