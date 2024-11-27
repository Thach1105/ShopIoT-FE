import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getToken, login } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import oauthConfig from "../../configs/oauthConfig";
import { useAuth } from "../../provider/authProvider";

function LoginDashboard() {
  const { setToken, role } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getToken();

    if (accessToken) {
      console.log(role);
      if (role === "ADMIN") navigate("/admin");
      if (role === "USER") navigate("/");
    }
  }, [navigate, role]);

  async function handleLogin(e) {
    e.preventDefault();
    const account = {
      username,
      password,
    };

    try {
      const { data } = await login(account);
      setToken(data?.content?.token);
      if (role === "ADMIN") navigate("/admin");
      if (role === "USER") navigate(-1);
    } catch (error) {
      console.log(error.response);
    }
  }

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    const callbackUrl = oauthConfig.redirectUri;
    const authUrl = oauthConfig.authUri;
    const googleClientId = oauthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  }

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4">Sign In</h2>
          <p className="mb-4">Enter your username and password to Sign In.</p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Your username</label>
              <input
                type="text"
                placeholder="abcdef"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="mb-4 flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-blue-600">
                  Terms and Conditions
                </a>
              </label>
            </div> */}
            <div className="flex justify-end items-center mb-4">
              {/* <div className="flex items-center">
                <input type="checkbox" id="newsletter" className="mr-2" />
                <label htmlFor="newsletter" className="text-gray-700">
                  Subscribe me to newsletter
                </label>
              </div> */}
              <a href="#" className="text-gray-700">
                Forgot Password
              </a>
            </div>
            <button
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              onClick={handleLogin}
            >
              SIGN IN
            </button>

            <button
              className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100"
              onClick={handleLoginWithGoogle}
            >
              <i className="pr-2">
                <FontAwesomeIcon icon={faGoogle} />
              </i>
              SIGN IN WITH GOOGLE
            </button>
          </form>
        </div>
        <div
          className="hidden md:block md:w-1/2 bg-cover"
          style={{ backgroundImage: "url('https://placehold.co/600x800')" }}
        ></div>
      </div>
    </div>
  );
}

export default LoginDashboard;
