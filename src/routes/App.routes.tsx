import LoginPage from "@/pages/auth/Login";
import Company from "@/pages/company/Company";
import CompanyDetails from "@/pages/company/CompanyDetails";
import DialogUpdateCompanyData from "@/pages/company/DialogUpdateCompanyData";
import FallbackError from "@components/FallbackError";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layout/App.layout";

const AppRoutes = () => {
  const routes = createBrowserRouter(
    [
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <FallbackError type="something_went_wrong" />,
      },
      {
        path: "/",
        element: <AppLayout />,
        errorElement: <FallbackError type="something_went_wrong" />,
        children: [
          {
            index: true,
            element: <Company />,
          },
          {
            path: "ipo/:companyId",
            element: <CompanyDetails />,
          },
          {
            path: "ipo/:companyId/update",
            element: <DialogUpdateCompanyData isNew={false} />,
          },
          {
            path: "ipo/add",
            element: <DialogUpdateCompanyData isNew />,
          },
        ],
      },
      {
        path: "*",
        element: <FallbackError type="page_not_found" />,
      },
    ],
    {
      // basename: "/",
    }
  );
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
