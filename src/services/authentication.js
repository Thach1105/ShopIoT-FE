import axios from "axios";
import config from "../configs/config";

const url = `${config.url_Backend}/auth`;

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export async function login(account) {
  const response = await axios.post(`${url}/login`, account, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export function logout() {
  localStorage.removeItem("token");
}
