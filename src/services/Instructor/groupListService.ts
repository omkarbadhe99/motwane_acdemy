import api from "@/src/lib/apis/axios_interceptor";

export const group_list = async (userId?: number) => {
  const url = userId
    ? `/instructor/list_group?user_id=${userId}`
    : `/instructor/list_group`;
  // const res = await api.get("/instructor/list_group");
  const res = await api.get(url);
  return res.data;
};

export const create_group = async (payload: any) => {
  const res = await api.post("/instructor/create_group", payload);
  return res.data;
};

export const get_group_details = async (groupId: number) => {
  const res = await api.get(
    `/instructor/get_group_edit_data?group_id=${groupId}`
  );
  return res.data;
};

export const update_group = async (paload: any) => {
  const res = await api.post("/instructor/update_group", paload);
  return res.data;
};
export const update_group_mapping = async (paload: any) => {
  const res = await api.post("/instructor/update_group_members", paload);
  return res.data;
};
export const update_group_courses = async (paload: any) => {
  const res = await api.post("/instructor/update_group_courses", paload);
  return res.data;
};

// export const course_list = async (payload: any) => {
//   console.log("Fetching course list with payload:", payload);
//   const res = await api.get("/instructor/list_courses");
//   return res.data;
// };
export const course_list = async (userId?: number) => {
  console.log("Fetching course list for user:", userId);

  const url = userId
    ? `/instructor/list_courses?user_id=${userId}`
    : `/instructor/list_courses`;

  const res = await api.get(url);
  return res.data;
};

export const create_user = async (payload: any) => {
  const res = await api.post("/instructor/create_user_by_instructor", payload);
  return res.data;
};
export const update_user = async (payload: any) => {
  // console.log("payload",payload);return false;
  
  const res = await api.post("/instructor/update_user", payload);
  return res.data;
};

// export const user_list = async (page: number) => {
//   console.log("Fetching user list for page:", page);
//   // return false;

//   const res = await api.get(`/instructor/user_list?page=${page}`);
//   return res.data;
// };

export const user_list = async (page: number) => {
  // console.log("Fetching user list for page:", page);
  const res = await api.get(`/instructor/user_list`, {
    params: { page },
  });
  
  return res.data; 
};
export const user_details = async (userId: number) => {
  const res = await api.get(`/instructor/user_details?user_id=${userId}`);
  return res.data; // expects { data: [...], page, total_pages, total, per_page }
};
