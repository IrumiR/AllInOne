import axios from "axios";
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

export const httpUpload = (url, data) => {
  return axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // remove authorization header
    },

    // deleteHeaders: ["Authorization"],
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`Upload Progress: ${progress}%`);
    },
  });
}