import { RouteObject } from "react-router-dom";
import InventoryPage from "./pages/inventory";
import ProductsListPage from "./pages/products/products-list";
import NewProductPage from "./pages/products/new-product";

export const routes: RouteObject[] = [
  {
    index: true,
    path: "/",
    element: <InventoryPage />,
  },
  {
    path: "/products",
    element: <ProductsListPage />,
  },
  {
    path: "/products/new",
    element: <NewProductPage />,
  },
];
