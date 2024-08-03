import { BACKEND_BASE_URL } from "@/config";
import { httpPost } from "@/services/http.service";


const login = async (email, password) => {
  try {
    const response = await httpPost(`${BACKEND_BASE_URL}/auth/login`, {
      email: email,
      password: password,
    });
    const data = response.data;
    return data;
  } catch (error) {

    // console.log(error?.response);
    throw error?.response?.data;

    // return error?.response?.data;
  }
};

const getCurrentUser = async (id) => {
  try {
    const response = await httpPost(`${BACKEND_BASE_URL}/users/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export { login, getCurrentUser };