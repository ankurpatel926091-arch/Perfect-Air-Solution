import baseApi from "./baseApi";

export const getActiveBlogs = async () => {
  const response = await baseApi.get("/blogs/active");
  return response.data;
};

export const getBlogById = async (slugOrId) => {
  const response = await baseApi.get(`/blogs/${slugOrId}`);
  return response.data;
};