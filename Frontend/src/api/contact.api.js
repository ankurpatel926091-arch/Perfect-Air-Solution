import baseApi from "./baseApi";

export const createContact = async (data) => {
  const response = await baseApi.post("/contact/send", data);
  return response.data;
};

