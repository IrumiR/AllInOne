import { httpPost } from "./http.service";

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

// delete service

// get service by id


export { createService };