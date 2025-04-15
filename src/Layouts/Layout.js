import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="d-flex">
      <div className="col-md-2">
        <Sidebar />
      </div>

      <div className="container-fluid p-4 col-md-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
