import { httpGet, httpPost, httpPatch } from "./http.service";

// update any user by ID (only for user info, valid for customer and service provider)
const updateUserById = async (userId, userData) => {
    try {
        const response = await httpPatch(`/users/update/${userId}`, userData);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

export { updateUserById };