import { ReactElement } from "react";
import AdminLayout from "../pages/admin";
import AddCategory from "../pages/admin/Add/Category";
import AddItem from "../pages/admin/Add/Item";
import AddSubCategory from "../pages/admin/Add/Subcategory";
import Categories from "../pages/admin/Categories";
import ViewCategory from "../pages/admin/View/Category";
import ViewSubCategory from "../pages/admin/View/Subcategory";

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
      },
      {
        path: '/admin/add/item',
        element: <AddItem />
      },
      {
        path: '/admin/view/:category',
        element: <ViewCategory />
      },
      {
        path: '/admin/view/:category/:subcategory',
        element: <ViewSubCategory />
      }
    ]
  },
] as IRoute[];
