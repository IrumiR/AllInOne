import axiosClient from "@/config/axiosInstance.config";

export const httpGet = (url) => {
  return axiosClient.get(url);
};

export const httpPost = (url, data) => {
  return axiosClient.post(url, data);
};

export const httpPut = (url, data={}) => {
  return axiosClient.put(url, data);
};

export const httpPatch = (url, data={}) => {
  return axiosClient.patch(url, data);
};

export const httpDelete = (url) => {
  return axiosClient.delete(url);
};
