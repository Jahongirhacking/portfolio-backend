export interface ICategory {
  name: string;
  categories: ICategory[];
  img: string;
  items: string[];
  parent: string;
  id: string;
}
