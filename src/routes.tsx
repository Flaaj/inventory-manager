import { RouteObject } from "react-router-dom";
import InventoryPage from "./pages/inventory";
import NewProductPage from "./pages/new-product";

export const routes: RouteObject[] = [
  {
    index: true,
    path: "/",
    element: <InventoryPage />,
  },
  {
    path: "/products/new",
    element: <NewProductPage />,
  },
];
