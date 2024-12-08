import axiosInstance from "../configs/axiosInstance";

export async function getNotificationForAdmin() {
  const response = await axiosInstance.get(`/notification`);
  return response;
}

export async function changeStatusNotification(id) {
  const response = await axiosInstance.put(
    `/notification/viewedNotification/${id}`
  );
  return response;
}
