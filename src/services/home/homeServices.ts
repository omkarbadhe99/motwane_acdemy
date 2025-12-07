import api from "@/src/lib/apis/axios_interceptor";

export const course = async (payload: any) => {
  const token = localStorage.getItem("token");
  const res = await api.get("/course-list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
