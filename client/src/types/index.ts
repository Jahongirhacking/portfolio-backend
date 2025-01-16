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
  category: ICategory;
  info: { img: string; description: string }[];
  links: string[];
  id: string;
}
