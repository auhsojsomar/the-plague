interface Base {
  name: string;
  src: string;
  alt: string;
}

export type Banner = Base;

export interface BannerDto extends Base {
  id: string;
}
