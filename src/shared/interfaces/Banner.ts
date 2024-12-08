interface Base {
  name: string;
  image: string;
}

export type Banner = Base;

export interface BannerDto extends Base {
  id: string;
}
