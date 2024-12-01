import { useEffect, useState } from "react";
import { getMyOrder } from "../../../../services/apiOrder";
import { formatDateTime, formatNumber } from "../../../../utils/format";
import OrderInformation from "./OrderInfomation";
import { useLocation } from "react-router-dom";

const displayStatusOrder = (status) => {
  switch (status) {
    case "PENDING":
      return <span className="text-blue-500 font-semibold">Chờ xử lý</span>;

    case "PROCESSING":
      return <span className="text-orange-500 font-semibold">Đang xử lý</span>;

    case "SHIPPED":
      return (
        <span className="text-yellow-500 font-semibold">Đang vận chuyển</span>
      );

    case "DELIVERED":
      return <span className="text-green-500 font-semibold">Đã nhận hàng</span>;

    case "CANCELLED":
      return <span className="text-black font-semibold">Đã hủy</span>;

    default:
      break;
  }
};

function MyOrder() {
  const location = useLocation();
  const [myOrders, setMyOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState(location?.state);

  useEffect(() => {
    async function fetchOrder() {
      const response = await getMyOrder();
      const { data } = response;
      setMyOrders(data?.content);
    }

    fetchOrder();
  }, []);

  return orderSelected ? (
    <OrderInformation order={orderSelected} setOrder={setOrderSelected} />
  ) : (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Quản lý đơn hàng</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Mã đơn hàng</th>
              <th className="text-left p-4">Ngày mua</th>
              <th className="text-right p-4">Tổng tiền</th>
              <th className="text-right p-4">Trạng thái đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td onClick={() => setOrderSelected(order)} className="p-4">
                  <p className="text-blue-500 font-semibold cursor-pointer hover:text-blue-700">
                    {order.orderCode}
                  </p>
                </td>
                <td className="p-4">{formatDateTime(order.orderTime)}</td>
                <td className="p-4 text-right">
                  {formatNumber(order.totalPrice)} ₫
                </td>
                <td className="p-4 text-right">
                  {displayStatusOrder(order.orderStatus)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrder;
