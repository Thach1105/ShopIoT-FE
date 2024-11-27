import {
  faGaugeHigh,
  faBox,
  faCartShopping,
  faUsers,
  faTags,
  faRightFromBracket,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/authentication";

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/login");
  }

  return (
    <div className="bg-purple-600 text-white w-64 min-h-full p-4 rounded-2xl">
      <div className="flex items-center mb-8">
        <i className="fas fa-shopping-bag text-2xl mr-2"></i>
        <span className="text-2xl font-bold">Shop Ecommerce</span>
      </div>
      <nav className="flex flex-col gap-2">
        <Link
          className="p-2 rounded-lg hover:bg-purple-700"
          to={"/admin/dashboard"}
        >
          <span className="text-xl font-bold  hover:text-yellow-200">
            <FontAwesomeIcon icon={faGaugeHigh} /> Dashboard
          </span>
        </Link>
        {/* Products */}
        <div className="cursor-pointer p-2 rounded-lg hover:bg-purple-700">
          <details>
            <summary className="flex">
              <span className="text-xl font-bold hover:text-yellow-200">
                <FontAwesomeIcon icon={faBox} /> Products
              </span>
            </summary>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li>
                <Link to={"/admin/product/list"}>
                  <span className="hover:text-yellow-200 font-semibold text-lg">
                    Product List
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/product/add"}>
                  <span className="hover:text-yellow-200 font-semibold text-lg">
                    New Product
                  </span>
                </Link>
              </li>
            </ul>
          </details>
        </div>
        {/* Brand */}

        <Link
          className="p-2 rounded-lg hover:bg-purple-700"
          to={"/admin/brand/list"}
        >
          <span className="text-xl font-bold  hover:text-yellow-200">
            <FontAwesomeIcon icon={faTags} /> Brand
          </span>
        </Link>
        {/* Categories */}
        <div className="cursor-pointer p-2 rounded-lg hover:bg-purple-700">
          <details>
            <summary className="flex">
              <span className="text-xl font-bold hover:text-yellow-200">
                <FontAwesomeIcon icon={faBarsStaggered} /> Categories
              </span>
            </summary>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li>
                <Link to={"/admin/categories-list"}>
                  <span className="hover:text-yellow-200 font-semibold text-lg">
                    Categories List
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/category/create"}>
                  <span className="hover:text-yellow-200 font-semibold text-lg">
                    Categories Add
                  </span>
                </Link>
              </li>
              {/* <li>
                <Link to={"/admin/category/edit/:categoryId"}>
                  <span className="hover:text-yellow-200 font-semibold text-lg">
                    Categories Edit
                  </span>
                </Link>
              </li> */}
            </ul>
          </details>
        </div>
        {/* Orders */}
        <div className="cursor-pointer p-2 rounded-lg hover:bg-purple-700">
          <details>
            <summary className="flex">
              <span className="text-xl font-bold hover:text-yellow-200">
                <FontAwesomeIcon icon={faCartShopping} /> Orders
              </span>
            </summary>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li>
                <Link to={"/admin/order-list"}>
                  <span className="hover:text-yellow-200 font-semibold text-lg">
                    Order List
                  </span>
                </Link>
              </li>
              {/* <li>
                <Link to={"/admin/order-code/:orderCode"}>
                  <span className="hover:text-yellow-200 font-semibold text-lg">
                    Order Details
                  </span>
                </Link>
              </li> */}
            </ul>
          </details>
        </div>
        {/* Customers */}
        <div className="cursor-pointer p-2 rounded-lg hover:bg-purple-700">
          <details>
            <summary className="flex">
              <span className="text-xl font-bold hover:text-yellow-200">
                <FontAwesomeIcon icon={faUsers} /> Customers
              </span>
            </summary>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li>
                <Link to={"/admin/customer-list"}>
                  <span className="hover:text-yellow-200 font-semibold text-lg">
                    Customers List
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/customer-details/:customerId"}>
                  <span className="hover:text-yellow-200 font-semibold text-lg">
                    Customers Details
                  </span>
                </Link>
              </li>
            </ul>
          </details>
        </div>
        <div
          className="cursor-pointer p-2 rounded-lg hover:bg-purple-700 hover:text-yellow-200"
          onClick={handleLogout}
        >
          <span className="text-xl font-bold">
            <FontAwesomeIcon icon={faRightFromBracket} rotation={180} /> Logout
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
