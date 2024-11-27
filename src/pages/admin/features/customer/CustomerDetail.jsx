import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrdersByUserId } from "../../../../services/apiOrder";
import { getUserById } from "../../../../services/apiCustomer";
import Pagination from "../../../../utils/Pagination";
import { formatDateTime } from "../../../../utils/format";

function CustomerDetail() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [pageDetail, setPageDetail] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await getUserById(customerId);
        console.log(response);
        const { data } = response;
        setCustomer(data?.content);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCustomer();
  }, [customerId]);

  useEffect(() => {
    async function fetchDataOrder() {
      try {
        const response = await getOrdersByUserId(customerId, pageNum, pageSize);
        const { data } = response;
        setOrders(data?.content);
        setPageDetail(data?.pageDetails);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDataOrder();
  }, [customerId, pageNum, pageSize]);

  function handleIncPageNum() {
    if (pageNum < pageDetail.totalPages) {
      setPageNum(pageNum + 1);
    }
  }

  function handleDecPageNum() {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  }

  function handlePageSize(e) {
    setPageSize(Number(e.target.value));
  }

  return (
    customer && (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Customer Detail</h1>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <p className="mb-2">
              <span className="font-bold">Username:</span> {customer.username}
            </p>
            <p className="mb-2">
              <span className="font-bold">Fullname: </span> {customer.fullName}
            </p>
            <p className="mb-2">
              <span className="font-bold">Email: </span> {customer.email}
            </p>
            <p className="mb-2">
              <span className="font-bold">Phone: </span> {customer.phoneNumber}
            </p>
          </div>
          {/* <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Billing Address</h2>
          <p className="mb-2">
            <span className="font-bold">Block Number:</span> A-510
          </p>
          <p className="mb-2">
            <span className="font-bold">Address:</span> 81 Fulton London
          </p>
          <p className="mb-2">
            <span className="font-bold">Pincode:</span> 385467
          </p>
          <p className="mb-2">
            <span className="font-bold">Phone:</span> 202-458-4568
          </p>
        </div> */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Customer Order</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-left">INDEX</th>
                <th className="py-2 text-left">ORDER CODE</th>
                <th className="py-2 text-left">ORDER STATUS</th>
                <th className="py-2 text-left">PAYMENT INFO</th>
                <th className="py-2 text-left">ORDER DATE</th>
                <th className="py-2 text-left">PRICE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="py-2">#{index + 1}</td>
                  <td className="py-2 flex items-center">
                    {/* <img
                    src="https://placehold.co/50x50"
                    alt="Note Diaries"
                    className="w-12 h-12 mr-4"
                  /> */}
                    <Link>
                      <p className="text-gray-900 whitespace-no-wrap hover:text-yellow-500">
                        {order.orderCode}
                      </p>
                    </Link>
                  </td>
                  <td className="py-2">{order.orderStatus}</td>
                  <td className="py-2">{order.paymentType}</td>
                  <td className="py-2">{formatDateTime(order.orderTime)}</td>
                  <td className="py-2">{`${order.totalPrice} VND`}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {pageDetail && (
            <Pagination
              handleDecPage={handleDecPageNum}
              handleIncPage={handleIncPageNum}
              totalElements={pageDetail.totalElements}
              pageSize={pageSize}
              handleChangePageSize={handlePageSize}
            />
          )}
        </div>
      </div>
    )
  );
}

export default CustomerDetail;
