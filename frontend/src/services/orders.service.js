import { httpGet, httpPatch, httpPost } from "./http.service";

// get all orders
const getAllOrders = async () => {
    try {
        const response = await httpGet("/orders");
        return response.data;
    } catch (error) {
        throw error?.response?.data;
    }
}


// update order
const updateOrder = async (orderId, orderData) => {
    try {
        const response = await httpPatch(`/orders/edit/${orderId}`, orderData);
        return response.data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// create order
const createOrder = async (orderData) => {
    try {
        const response = await httpPost("/orders/create", orderData);
        return response.data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// get order by user id
const getOrdersByUserId = async (userId) => {
    try {
        const response = await httpGet(`/orders/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data;
    }
}

export { getAllOrders, updateOrder, createOrder, getOrdersByUserId };