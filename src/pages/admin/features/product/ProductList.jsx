import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../../../../utils/Pagination";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { searchProduct } from "../../../../services/apiProduct";
import Loading from "../../../../utils/Loading";
import { formatNumber } from "../../../../utils/format";
import { getCategoriesTree } from "../../../../services/apiCategory";

function categorySelect(categories, depth = 0) {
  return categories.map((category, index) => (
    <React.Fragment key={index}>
      <option className="text-xs" key={index} value={category.id}>
        {"--".repeat(depth) + " " + category.name}
      </option>
      {category.children && categorySelect(category.children, depth + 1)}
    </React.Fragment>
  ));
}

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [pageDetail, setPageDetail] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [active, setActive] = useState(-1);
  const [inStock, setInStock] = useState(-1);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getCategoriesTree();
        const { data } = response;
        setCategories(data?.content);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function search() {
      try {
        const params = {
          search: searchValue,
          pageNumber,
          pageSize,
          active,
          inStock,
          category: categoryId,
        };
        console.log(params);
        const response = await searchProduct(params);
        const { data } = response;
        console.log(data);

        setProductList(data?.content);
        setPageDetail(data?.pageDetails);
      } catch (error) {
        console.log(error);
      }
    }

    search();
  }, [searchValue, pageNumber, pageSize, active, inStock, categoryId]);

  function handleChangePageSize(e) {
    setPageSize(Number(e.target.value));
  }

  function handleDecreasePageNum() {
    if (pageNumber > 1) {
      setPageNumber((pageNumber) => pageNumber - 1);
    }
  }

  function handleIncreasePageNum() {
    if (pageNumber < pageDetail.totalPages) {
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  }

  return (
    <div className="p-2">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Product List</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <select
              value={active}
              onChange={(e) => setActive(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value={-1}>Status</option>
              <option value={1}>Publish</option>
              <option value={0}>Hidden</option>
            </select>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 w-60"
            >
              <option value={0}>Category</option>
              {categorySelect(categories)}
            </select>
            <select
              value={inStock}
              onChange={(e) => setInStock(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value={-1}>Stock</option>
              <option value={1}>In Stock</option>
              <option value={0}>Out of Stock</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search Product Name, SKU"
              className="border border-gray-300 rounded-lg p-2 w-72"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Link
              to={"/admin/product/add"}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-400/80"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Product
            </Link>
          </div>
        </div>
        {productList ? (
          <>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">PRODUCT</th>
                  <th className="py-2 px-4 border-b text-center">CATEGORY</th>
                  <th className="py-2 px-4 border-b text-center">STOCK</th>
                  <th className="py-2 px-4 border-b text-center">COST</th>
                  <th className="py-2 px-4 border-b text-center">QTY</th>
                  <th className="py-2 px-4 border-b text-center">STATUS</th>
                  <th className="py-2 px-4 border-b text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-20 h-20 rounded-full mr-2 border-2"
                      />
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div title="SKU" className="text-xs text-blue-600">
                          {`SKU: ${product.sku}`}
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.category?.name
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }`}
                      >
                        {product.category?.name}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.inStock
                            ? "bg-blue-100 text-blue-800"
                            : "bg-stone-200 text-stone-800"
                        }`}
                      >
                        <p className="text-xs">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </span>
                    </td>
                    <td className="py-2 px-4 text-right right-1">
                      <p> {formatNumber(product.cost)} đ</p>
                    </td>
                    <td className="py-2 px-4 text-center">{product.stock}</td>
                    <td className="py-2 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.active ? "Publish" : "Hidden"}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center space-x-2">
                      <Link
                        to={`/admin/product-detail/${product.id}`}
                        title="View Detail"
                        className="text-gray-500 p-2 hover:text-blue-500 hover:text-xl"
                      >
                        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                      </Link>
                      <Link
                        to={`/admin/product/edit/${product.id}`}
                        title="Edit"
                        className="text-gray-500 hover:text-blue-500 hover:text-xl"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              pageSize={pageSize}
              totalElements={pageDetail?.totalElements}
              handleIncPage={handleIncreasePageNum}
              handleDecPage={handleDecreasePageNum}
              handleChangePageSize={handleChangePageSize}
            />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default ProductList;
