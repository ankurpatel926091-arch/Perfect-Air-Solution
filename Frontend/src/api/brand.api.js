import baseApi from "./baseApi";


// Get active brands
export const getActiveBrands = async () => {
  const response = await baseApi.get("/brand/active");
  return response.data;
};
