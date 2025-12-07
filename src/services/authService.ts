import api from "../lib/apis/axios_interceptor";

export const login = async (payload: any) => {
  const res = await api.post("/login", payload);
  return res.data;
};
