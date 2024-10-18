import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layout/App.layout";

const AppRoutes = () => {
  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <div>Company</div>,
          },
          {
            path: "/ipo",
            element: <div>IPO</div>,
          },
        ],
      },
    ],
    {
      basename: "/",
    }
  );
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
