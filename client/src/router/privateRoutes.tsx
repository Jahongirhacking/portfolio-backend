import { ReactElement } from "react";
import Categories from "../pages/admin/Categories";
import AdminLayout from "../pages/admin";
import AddCategory from "../pages/admin/Add/Category";
import AddSubCategory from "../pages/admin/Add/Subcategory";

export interface IRoute {
  path: string;
  element: ReactElement;
  children?: IRoute[];
}

export default [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/categories',
        element: <Categories />
      },
      {
        path: '/admin/add/category',
        element: <AddCategory />
      },
      {
        path: '/admin/add/:category/subcategory',
        element: <AddSubCategory />
      }
    ]
  },
] as IRoute[];
