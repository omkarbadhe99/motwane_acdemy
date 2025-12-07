import api from "@/lib/axios";

export const course = async (payload: any) => {
  const token = localStorage.getItem("token");
  const res = await api.get("/course-list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
