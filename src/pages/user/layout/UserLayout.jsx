import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div>
        <Header />
      </div>
      <div className="w-full bg-gray-100">
        <div className="w-5/6 flex-1 m-auto py-8 bg-gray-100">
          <Outlet />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default UserLayout;
