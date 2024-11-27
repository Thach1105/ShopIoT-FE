import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../provider/authProvider";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Header() {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const decode = jwtDecode(token);
    const { data } = decode;

    setUserInfo(data);
  }, [token]);

  return (
    <div className="flex justify-end items-center">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faBell} size="xl" />
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
        <FontAwesomeIcon icon={faGear} size="lg" />
      </div>
    </div>
  );
}
