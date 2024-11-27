import { faCircleUser, faFileLines } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../provider/authProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCategoriesTree } from "../../../services/apiCategory";
import { searchForCustomer } from "../../../services/apiProduct";

function Header() {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [search, setSearch] = useState("");
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isSolutionMenuOpen, setIsSolutionMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState();
  const [resultSearch, setResultSearch] = useState([]);

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      const { data } = decode;

      setUserInfo(data);
    }
  }, [token]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategoriesTree();
      const { data } = response;
      setCategories(data?.content);
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (search) {
      async function fetchDataProduct() {
        const params = {
          size: 8,
          page: 1,
          keyword: search,
        };
        const response = await searchForCustomer(params);
        const { data } = response;
        console.log(data?.content);
        setResultSearch(data?.content);
      }

      fetchDataProduct();
    } else {
      setResultSearch([]);
    }
  }, [search]);

  return (
    <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white divide-y-2 divide-stone-300">
      <div className="container mx-auto flex items-center justify-between py-4 w-4/5">
        <Link to={"/"} className="flex items-center cursor-pointer">
          <img
            src="https://placehold.co/120x80"
            alt="Warehouse logo"
            className="mr-2 rounded-xl"
          />
          <h1 className="text-3xl font-bold">Shop IoT</h1>
        </Link>

        <div className="flex items-center justify-center md:w-1/3 relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Tìm sản phẩm..."
            className="px-4 py-3 rounded-l-md flex-1 text-black font-semibold"
          />
          <Link
            onClick={() => setSearch("")}
            to={`/tim-kiem?keyword=${search}`}
            className="p-3 rounded-r-xl bg-sky-400 hover:bg-sky-700"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
          </Link>

          {/* Danh sách sản phẩm kết quả tìm kiếm */}
          {resultSearch.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white text-black mt-2 shadow-lg rounded-lg z-10">
              <div className="flex flex-col p-2 space-y-1">
                {resultSearch.map((product) => (
                  <Link
                    key={product.id}
                    onClick={() => setSearch("")}
                    to={`/san-pham/${product.slug}`}
                    className="hover:bg-gray-200 p-2"
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="mr-2"
                    />
                    {product.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tra cứu đơn hàng */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faFileLines} size="xl" />
            <Link to={"/tra-cuu-don-hang"} href="#" className="ml-2 ">
              <p className="font-semibold text-base">
                Tra cứu
                <br /> đơn hàng
              </p>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCircleUser} size="xl" />
            {token ? (
              <div className="font-semibold">{userInfo.username}</div>
            ) : (
              <Link to={"/login"}>
                <p className="font-semibold text-base">
                  Đăng nhập
                  <br className="text-xl font-semibold hidden md:block" /> Tài
                  khoản
                </p>
              </Link>
            )}
          </div>

          <Link to={"/gio-hang"} className="flex items-center">
            <FontAwesomeIcon icon={faCartShopping} size="xl" />
            <span className="ml-1 bg-blue-600 rounded-full px-2">0</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-start py-1 w-4/5">
        <div className="flex-1 flex space-x-4 items-center relative">
          {/* Menu Danh mục sản phẩm */}
          <div
            onMouseEnter={() => setIsProductMenuOpen(true)}
            onMouseLeave={() => {
              setIsProductMenuOpen(false);
              setCategorySelected();
            }}
            className="hover:bg-sky-600 p-2 w-1/4 font-semibold cursor-pointer "
          >
            <p className="text-center">
              <FontAwesomeIcon className="mr-1" icon={faBars} />
              Danh mục sản phẩm
            </p>
            {isProductMenuOpen && (
              <div
                onMouseEnter={() => setIsProductMenuOpen(true)}
                onMouseLeave={() => {
                  setIsProductMenuOpen(false);
                  setCategorySelected();
                }}
                className="absolute top-full left-0 bg-white text-stone-500 w-full shadow-lg rounded-sm z-10 flex overflow-auto"
              >
                <div className="bg-white w-1/5 px-2">
                  <div className="flex flex-col p-2 space-y-2">
                    {categories.map(
                      (category, index) =>
                        category.enabled && (
                          <Link
                            key={index}
                            className="hover:bg-sky-200 hover:text-blue-500 p-2 cursor-pointer"
                            onMouseEnter={() => setCategorySelected(category)}
                            to={`/danh-muc/${category.slug}`}
                            state={category}
                          >
                            {category.name}
                          </Link>
                        )
                    )}
                  </div>
                </div>
                <div className="bg-gray-200 flex-1 grid grid-cols-3 gap-3 p-2">
                  {categorySelected?.children &&
                    categorySelected.children.map(
                      (child, index) =>
                        child.enabled && (
                          <Link
                            to={`/danh-muc/${child.slug}`}
                            state={child}
                            key={index}
                            className="text-stone-500 text-center py-2 font-normal hover:underline hover:text-blue-500 hover:italic"
                          >
                            {child.name}
                          </Link>
                        )
                    )}
                </div>
                <img
                  src="https://placehold.co/150x400"
                  alt="Warehouse logo"
                  className="flex-initial p-2"
                />
              </div>
            )}
          </div>

          {/* Menu Giải pháp */}
          <div
            onMouseEnter={() => setIsSolutionMenuOpen(true)}
            onMouseLeave={() => setIsSolutionMenuOpen(false)}
            className="hover:bg-sky-600 p-2 w-1/4 font-semibold relative"
          >
            <p className="text-center">Giải pháp</p>

            {isSolutionMenuOpen && (
              <div className="absolute top-full left-0 bg-white text-stone-500 w-full shadow-lg rounded-sm z-10">
                <div className="flex flex-col p-3 space-y-2">
                  <Link className="hover:bg-sky-200 hover:text-blue-500 p-2 cursor-pointer">
                    Giải pháp
                  </Link>
                  <Link className="hover:bg-sky-200 hover:text-blue-500 p-2 cursor-pointer">
                    Giải pháp
                  </Link>
                  <Link className="hover:bg-sky-200 hover:text-blue-500 p-2 cursor-pointer">
                    Giải pháp
                  </Link>
                  <Link className="hover:bg-sky-200 hover:text-blue-500 p-2 cursor-pointer">
                    Giải pháp
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
