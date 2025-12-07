import api from "@/src/lib/apis/axios_interceptor";

export const course_list = async (payload: any) => {
  const res = await api.get("/instructor/list_courses");
  return res.data;
};
