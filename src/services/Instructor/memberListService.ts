import api from "@/src/lib/apis/axios_interceptor";

export const member_list = async (payload: any) => {
  const res = await api.get("/instructor/user_list");
  return res.data;
};
