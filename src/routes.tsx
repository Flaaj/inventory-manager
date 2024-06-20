import { RouteObject } from "react-router-dom";
import InventoryPage from "./pages/inventory.page";
import NewProductPage from "./pages/new-product.page";

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
