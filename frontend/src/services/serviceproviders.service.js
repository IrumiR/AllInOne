import { httpGet, httpPatch } from "./http.service";

// get service provider by user id
const getServiceProviderByUserId = async (userId) => {
    try {
        const response = await httpGet(`/serviceproviders/get-service-provider-by-user-id/${userId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// update the services provider by user id
const updateServiceProviderByUserId = async (userId, data) => {
    try {
        const response = await httpPatch(`/serviceproviders/update-service-provider-by-user-id/${userId}`, data);
        const updatedServiceProvider = response.data;
        return updatedServiceProvider;
    } catch (error) {
        throw error?.response?.data;
    }
}

export { getServiceProviderByUserId, updateServiceProviderByUserId };