import { Outlet } from "react-router-dom";
import { HeaderMenu } from "./HeaderMenu";

export const Layout = () => {
  return (
    <div className="w-full">
      <HeaderMenu />
      <div className="container mx-auto block p-4 mb-96">
        <Outlet />
      </div>
    </div>
  );
};
