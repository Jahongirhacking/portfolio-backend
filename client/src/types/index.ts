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
  info: InfoProps[];
  links: string[];
  id: string;
}

export interface InfoProps {
  img: string;
  description: string;
}
