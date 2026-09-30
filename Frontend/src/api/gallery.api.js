import baseApi from "./baseApi";

export const getGallery = async (params = {}) => {
  const response = await baseApi.get("/gallery/get", {
    params,
  });

  return response.data;
};

export const getGalleryCategories = async (params = {}) => {
  const response = await baseApi.get("/galleryCategory/get", {
    params,
  });

  return response.data;
};