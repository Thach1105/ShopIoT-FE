import { useEffect, useState } from "react";
import {
  changePaymentStatusOrder,
  changeStatusOrder,
  getOrderByOrderCode,
} from "../../../../services/apiOrder";
import { useParams } from "react-router-dom";
import { formatDateTime, formatNumber } from "../../../../utils/format";

function OrderDetail() {
  const { orderCode } = useParams();
  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await getOrderByOrderCode(orderCode);
        console.log(response);
        const { data } = response;
        setOrder(data?.content);
        setOrderDetail(data?.content?.orderDetail);
        setPaymentStatus(data?.content.paymentStatus);
        setOrderStatus(data?.content.orderStatus);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOrder();
  }, [orderCode]);

  const subTotalPrice = orderDetail.reduce(
    (accumulator, item) => accumulator + item.totalPrice,
    0
  );

  async function handleSubmitStatus() {
    if (orderStatus !== order.orderStatus) {
      try {
        const response = await changeStatusOrder(orderCode, orderStatus);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    if (paymentStatus !== order.paymentStatus) {
      try {
        const response = await changePaymentStatusOrder(
          orderCode,
          paymentStatus
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    order && (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Order Details:{" "}
          <span className="text-blue-600">{`#${order.orderCode}`}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-100 p-4 rounded flex items-center">
            <i className="fas fa-shopping-cart text-2xl text-green-600 mr-4"></i>
            <div>
              <p className="text-sm">Order Created at</p>
              <p className="font-bold">{formatDateTime(order.orderTime)}</p>
            </div>
          </div>
          <div className="bg-red-100 p-4 rounded flex items-center">
            <i className="fas fa-user text-2xl text-red-600 mr-4"></i>
            <div>
              <p className="text-sm">Name</p>
              <p className="font-bold">{order.fullName}</p>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded flex items-center">
            <i className="fas fa-envelope text-2xl text-yellow-600 mr-4"></i>
            <div>
              <p className="text-sm">Email</p>
              <p className="font-bold">{order.email}</p>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded flex items-center">
            <i className="fas fa-phone text-2xl text-blue-600 mr-4"></i>
            <div>
              <p className="text-sm">Contact No</p>
              <p className="font-bold">{order.phone}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Delivery Address</h2>
            </div>
            <p>
              <span className="font-bold">Block Number:</span> A-510
            </p>
            <p>
              <span className="font-bold">Address:</span> 81 Fulton London
            </p>
            <p>
              <span className="font-bold">Pincode:</span> 385467
            </p>
            <p>
              <span className="font-bold">Phone:</span> 202-458-4568
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Billing Information</h2>
            </div>
            <p>
              <span className="font-bold">Payment Type: </span> A-510
            </p>
            <p>
              <span className="font-bold">Transaction ID: </span>
              81 Fulton London
            </p>
            {/* <p>
              <span className="font-bold">Pincode:</span> 385467
            </p>
            <p>
              <span className="font-bold">Phone:</span> 202-458-4568
            </p> */}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Invoice Detail</h2>
            </div>
            <p>
              <span className="font-bold">Number:</span> #78414
            </p>
            <p>
              <span className="font-bold">Seller GST:</span> AFQWEPX17390VJ
            </p>
            <p>
              <span className="font-bold">Purchase GST:</span> NVFQWEPX1730VJ
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-4 ">
          <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">PRODUCT IMAGE</th>
                  <th className="py-2">PRODUCT NAME</th>
                  <th className="py-2">QUANTITY</th>
                  <th className="py-2">PRICE</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">
                      <img
                        //src="https://placehold.co/50x50"
                        src={item?.product.imageUrl}
                        alt="Oculus VR"
                        className="w-12 h-12"
                      />
                    </td>
                    <td className="py-2">
                      <div>{item?.product.productName}</div>
                      <div className="text-blue-500">{item?.product.sku}</div>
                    </td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{formatNumber(item.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">Rows per page: 10</div>
              <div className="text-sm text-gray-600">1-4 of 4</div>
              <div className="flex items-center">
                <button className="text-gray-600">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="text-gray-600 ml-2">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div> */}

            <div className="mt-4">
              <div className="flex justify-between">
                <div>Subtotal Price:</div>
                <div>{`${formatNumber(subTotalPrice)} VND`}</div>
              </div>
              {/* <div className="flex justify-between">
                <div>Shipping Cost (+):</div>
                <div>$12.00</div>
              </div> */}
              <div className="flex justify-between">
                <div>Discount (-):</div>
                <div>{`${formatNumber(
                  subTotalPrice - order.totalPrice
                )} VND`}</div>
              </div>
              <div className="flex justify-between font-bold">
                <div>Total Payable:</div>
                <div>{`${formatNumber(order.totalPrice)} VND`}</div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold my-2">
                NOTE FROM CUSTOMER
              </label>
              <p className="w-full p-2 border rounded">{order.notes}</p>
            </div>
          </div>
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Status Orders</h2>
            <form onSubmit={handleSubmitStatus}>
              <div className="mb-4">
                <label className="block text-gray-700">Order ID</label>
                <input
                  type="text"
                  value={order.id}
                  className="w-full p-2 border rounded"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Order Status</label>
                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value={"PENDING"}>PENDING</option>
                  <option value={"PROCESSING"}>PROCESSING</option>
                  <option value={"SHIPPED"}>SHIPPED</option>
                  <option value={"DELIVERED"}>DELIVERED</option>
                  <option value={"CANCELLED"}>CANCELLED</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value={true}>COMPLETED</option>
                  <option value={false}>UNPAID</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 text-white p-2 rounded"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default OrderDetail;
