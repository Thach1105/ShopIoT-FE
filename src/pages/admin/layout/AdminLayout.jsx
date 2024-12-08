import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
// import OrderNotification from "./OrderNotification";

function AdminLayout() {
  const [countNewOrder, setCountNewOrder] = useState(0);

  return (
    <div className="flex min-h-screen">
      {/* <OrderNotification setCount={setCountNewOrder} /> */}
      <div className="sticky top-0 h-screen bg-gray-100 p-4">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 p-2 space-y-3 divide-y-2 divide-gray-400">
        <Header count={countNewOrder} setCount={setCountNewOrder} />
        <div className="flex-1 rounded-lg border border-s-orange-600 bg-indigo-300 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
