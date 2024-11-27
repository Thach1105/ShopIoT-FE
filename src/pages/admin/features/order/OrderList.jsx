import { useEffect, useState } from "react";
import Pagination from "../../../../utils/Pagination";
import OrderRow from "./OrderRow";
import {
  getAllOrder,
  getOrderByOrderCode,
} from "../../../../services/apiOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageDetail, setPageDetail] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await getAllOrder(pageNum, pageSize);
        console.log(data);
        setOrders(data?.content);
        setPageDetail(data?.pageDetails);
      } catch (error) {
        console.log(error);
      }
    }

    if (!search) fetchOrders();
  }, [pageNum, pageSize, search]);

  function handleChangePageSize(e) {
    setPageSize(Number(e.target.value));
  }

  function handleDecreasePageNum() {
    if (pageNum > 1) {
      setPageNum((pageNumber) => pageNumber - 1);
    }
  }

  function handleIncreasePageNum() {
    if (pageNum < pageDetail.totalPages) {
      setPageNum((pageNumber) => pageNumber + 1);
    }
  }

  async function handleSearch() {
    try {
      const response = await getOrderByOrderCode(search);
      console.log(response);
    } catch (error) {
      if (error.status === 400) {
        const { response } = error;
        setOrders([]);
        setPageDetail(null);
        console.log(response);
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between m-4">
        <h1 className="text-2xl font-bold mb-4">Orders List</h1>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
            placeholder="Search Order Code"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          />
          <button
            className="bg-gray-500 p-2 rounded-xl ml-1"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className=" text-white" />
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-6 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Code
              </th>
              <th className="py-2 px-6 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Create Time
              </th>
              <th className="py-2 px-6 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customers Name
              </th>
              <th className="py-2 px-6 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Info
              </th>
              <th className="py-2 px-6 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="py-2 px-6 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr className="border-b text-sm text-center">No order</tr>
            ) : (
              orders.map((order) => <OrderRow key={order.id} order={order} />)
            )}
          </tbody>
        </table>

        {pageDetail && (
          <Pagination
            totalElements={pageDetail?.totalElements}
            pageSize={pageSize}
            handleChangePageSize={handleChangePageSize}
            handleDecPage={handleDecreasePageNum}
            handleIncPage={handleIncreasePageNum}
          />
        )}
      </div>
    </div>
  );
}

export default OrderList;
