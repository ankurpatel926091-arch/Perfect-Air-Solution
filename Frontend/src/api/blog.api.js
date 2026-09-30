import baseApi from "./baseApi";

// In-flight request deduplication to prevent duplicate concurrent network calls
const inFlightRequests = new Map();

export const getActiveBlogs = async () => {
  const key = "getActiveBlogs";
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key);
  }

  const promise = baseApi
    .get("/blogs/active")
    .then((response) => response.data)
    .finally(() => {
      inFlightRequests.delete(key);
    });

  inFlightRequests.set(key, promise);
  return promise;
};

export const getBlogById = async (slugOrId) => {
  const key = `getBlogById_${slugOrId}`;
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key);
  }

  const promise = baseApi
    .get(`/blogs/${slugOrId}`)
    .then((response) => response.data)
    .finally(() => {
      inFlightRequests.delete(key);
    });

  inFlightRequests.set(key, promise);
  return promise;
};