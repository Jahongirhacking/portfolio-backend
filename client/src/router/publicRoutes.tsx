import { ReactElement } from "react";
import LoginPage from "../pages/auth/Login";

export default [
    {
        path: "/",
        element: <LoginPage />,
    }
] as { path: string; element: ReactElement }[];
