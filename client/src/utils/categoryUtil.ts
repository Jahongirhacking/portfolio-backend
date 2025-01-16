import { ICategory } from "../types";

export const getSubCategories = (categories: ICategory[]): ICategory[] => {
  const subcategories: ICategory[] = [];
  const queue: ICategory[] = [...categories];
  while (queue.length) {
    const temp = queue.shift() as ICategory;
    if (!temp?.categories || !temp?.categories.length) {
      subcategories.push({ ...temp });
      continue;
    }
    for (const category of temp.categories) {
      queue.push(category);
    }
  }
  return [...subcategories];
};
