import { RouteObject } from "react-router-dom";
import { InventoryPage } from "./pages/inventory.page";
import { NewProductPage } from "./pages/new-product.page";
import { Layout } from "./components/Layout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <InventoryPage />,
      },
      {
        path: "/products/new",
        element: <NewProductPage />,
      },
    ],
  },
];
