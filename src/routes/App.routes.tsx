import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layout/App.layout";
import Company from "@/pages/company/Company";
import FallbackError from "@components/FallbackError";
import CompanyDetails from "@/pages/company/CompanyDetails";
import DialogUpdateCompanyData from "@/pages/company/DialogUpdateCompanyData";

const AppRoutes = () => {
  const routes = createBrowserRouter(
    [
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
            element: <DialogUpdateCompanyData isNew={true} />,
          },
        ],
      },
      {
        path: "*",
        element: <FallbackError type="page_not_found" />,
      },
    ],
    {
      basename: "/",
    }
  );
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
