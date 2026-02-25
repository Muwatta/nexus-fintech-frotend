import api from "./api";
import type { Notification } from "../types/notification";

export const getNotifications = async (): Promise<Notification[]> => {
  const res = await api.get("/notifications/");
  return res.data;
};
