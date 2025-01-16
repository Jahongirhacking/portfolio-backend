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
