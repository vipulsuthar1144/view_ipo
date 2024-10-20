import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layout/App.layout";
import Company from "@/pages/company/Company";
import FallbackError from "@components/FallbackError";

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
            path: "/ipo",
            element: <div>IPO</div>,
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
