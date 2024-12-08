import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../provider/authProvider";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useCallback } from "react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import {
  changeStatusNotification,
  getNotificationForAdmin,
} from "../../../services/apiNotification";
import { Link } from "react-router-dom";

export default function Header({ count, setCount }) {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchNotification = useCallback(async () => {
    if (isFetching) return; // Tránh gọi API liên tục

    setIsFetching(true);
    const response = await getNotificationForAdmin();
    const { data } = response;
    setNotifications(data?.content);
    setIsFetching(false);
  }, [isFetching]);

  useEffect(() => {
    fetchNotification();
  }, [count, fetchNotification]);

  useEffect(() => {
    const decode = jwtDecode(token);
    const { data } = decode;
    setUserInfo(data);
  }, [token]);

  const handleViewNotification = async (id) => {
    await changeStatusNotification(id);
    setCount((c) => c - 1);
  };

  return (
    <div className="flex justify-end items-center py-2 px-4 bg-gradient-to-r from-pink-300 via-purple-400 to-blue-500 rounded-lg">
      <div className="flex items-center gap-3">
        <div
          onMouseEnter={() => setOpenNotification(true)}
          className="relative inline-block cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faCartPlus}
            size="xl"
            className="text-gray-700"
          />
          {count > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
          {openNotification && (
            <div
              onMouseLeave={() => setOpenNotification(false)}
              className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-4 z-[51] divide-y divide-gray-200 border border-gray-200"
            >
              <div className="pb-2">
                <h4 className="font-semibold text-lg text-gray-800">
                  Đơn hàng mới:
                </h4>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {notifications.length > 0 ? (
                  notifications.map(({ id, orderCode, message, hasViewed }) => (
                    <Link
                      onClick={handleViewNotification(id)}
                      key={id}
                      to={`/admin/order-code/${orderCode}`}
                      className={`p-2 rounded-lg flex items-center justify-between ${
                        hasViewed ? "bg-gray-100" : "bg-blue-50"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {message}
                        </p>
                        <p className="text-xs text-gray-600">
                          Mã đơn hàng: {orderCode}
                        </p>
                      </div>
                      {!hasViewed && (
                        <span className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1">
                          Mới
                        </span>
                      )}
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-600 text-center">
                    Không có thông báo mới.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <img
            src="https://placehold.co/40x40"
            alt="User profile"
            className="rounded-full w-10 h-10 mr-2"
          />
          <div>
            <div className="font-bold">{userInfo.username}</div>
            <div className="text-sm text-gray-500">Admin Profile</div>
          </div>
        </div>
      </div>
    </div>
  );
}
