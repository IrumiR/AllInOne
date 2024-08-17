import { httpGet, httpPost, httpPatch } from "./http.service";

// create service
const createService = async (serviceData) => {
    try {
        const response = await httpPost('/services/create', serviceData);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}


// update service
const updateServiceById = async (serviceId, serviceData) => {
    try {
        const response = await httpPatch(`/services/update/${serviceId}`, serviceData);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// delete service
const deleteServiceById = async (serviceId) => {
    try {
        const response = await httpPatch(`/services/remove/${serviceId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// get service by id
const getServiceById = async (serviceId) => {
    try {
        const response = await httpGet(`/services/${serviceId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// get all services
const getAllServices = async () => {
    try {
        const response = await httpGet('/services');
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}


// get services by provider ID
const getServicesByServiceProviderId = async (serviceProviderId) => {
    try {
        const response = await httpGet(`/services/service-by-provider/${serviceProviderId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

const getFilteredServices = async (searchTerm = "", category = "") => {
    try {
        const response = await httpGet(`/services/getfiltered?searchTerm=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching filtered services:', error);
        throw error?.response?.data || 'An unexpected error occurred';
    }
}



export { createService, getServiceById, updateServiceById, getAllServices, deleteServiceById, getServicesByServiceProviderId, getFilteredServices };