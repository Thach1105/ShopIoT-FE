import { Link } from "react-router-dom";
import { formatDateTime, formatNumber } from "../../../../utils/format";

/* eslint-disable react/prop-types */
function OrderRow({ order }) {
  return (
    <tr className="border-b text-sm">
      <td className="py-4 px-6">
        <Link to={`/admin/order-code/${order.orderCode}`}>
          <p className="text-gray-900 whitespace-no-wrap hover:text-yellow-500 cursor-pointer">
            {order.orderCode}
          </p>
        </Link>
      </td>
      <td className="py-4 px-6 flex items-center">
        {/* <img
          src={order.image}
          alt={order.item}
          className="w-12 h-12 rounded-full mr-4"
        /> */}
        {formatDateTime(order.orderTime)}
      </td>
      <td className="py-4 px-6">{order.fullName}</td>
      <td className="py-4 px-6">{order.paymentType}</td>
      <td className="py-4 px-6">{`${formatNumber(order.totalPrice)} VND`}</td>
      <td className="py-4 px-6">
        <span
          className={`px-3 py-1 rounded-full text-white ${
            order.orderStatus === "DELIVERED" ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {order.orderStatus}
        </span>
      </td>
    </tr>
  );
}

export default OrderRow;
