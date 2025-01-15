import { ReactElement } from "react";
import Categories from "../pages/admin/Categories";
import AdminLayout from "../pages/admin";

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
      }
    ]
  },
] as IRoute[];
