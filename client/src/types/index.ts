export interface ICategory {
  name: string;
  categories: ICategory[];
  img: string;
  items: string[];
  parent: string;
  id: string;
}

export interface ItemProps {
  title: string;
  img: string;
  category: {
    id: string;
    name: string;
  };
  info: InfoProps[];
  links: string[];
  id: string;
  rating: number;
}

export interface InfoProps {
  img: string;
  description: string;
}

export interface IProfile {
  id?: string;
  name?: string;
  username?: string;
  background_img?: string;
  short_info?: string;
  profile_img?: string;
  bio?: string;
  link?: string;
  services?: {
    icon?: string;
    name?: string;
    description?: string;
  }[];
  skills?: {
    name?: string;
    percent?: number;
  }[];
}
