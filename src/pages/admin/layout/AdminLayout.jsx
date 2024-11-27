import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 h-screen bg-gray-100 p-4">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 p-2 space-y-3 divide-y-2 divide-gray-400">
        <Header />
        <div className="flex-1 rounded-lg bg-gray-100 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
