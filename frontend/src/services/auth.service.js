import { BACKEND_BASE_URL } from "@/config";
import { httpPost, httpGet } from "@/services/http.service";


const customerRegister = async (customerData) => {

  try {
    const response = await httpPost(`${BACKEND_BASE_URL}/auth/register`, customerData);
    const data = response.data;
    return data;
  } catch (error) {
    throw error?.response?.data;
  }

}

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
    const response = await httpGet(`${BACKEND_BASE_URL}/users/profile/me`, {
      id: id,
    });
    const data = response.data;
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export { login, getCurrentUser, customerRegister };