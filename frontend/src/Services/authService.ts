import api from "../api/axios";

export const login = async (data: { username: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
