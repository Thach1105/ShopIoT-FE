//import config from "../configs/config";
import axiosInstance from "../configs/axiosInstance";

//const url = `${config.url_Backend}`;

export async function getUsers(pageNum, pageSize) {
  const response = await axiosInstance.get(
    `/users?pageNumber=${pageNum}&pageSize=${pageSize}`
  );
  return response;
}

export async function getUserById(userId) {
  const response = await axiosInstance.get(`/users/${userId}`);

  return response;
}

export async function updateCustomer(updateUser, id) {
  const response = await axiosInstance.put(`/users/${id}`, updateUser, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
