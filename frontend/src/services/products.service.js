import { httpGet, httpPost, httpPatch } from "./http.service";

// create product
const createProduct = async (productData) => {
    try {
        const response = await httpPost('/products/create', productData);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// update product
const updateProductById = async (productId, productData) => {
    try {
        const response = await httpPatch(`/products/update/${productId}`, productData);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// delete product by ID
const deleteProductById = async (productId) => {
    try {
        const response = await httpPatch(`/products/remove/${productId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// get product by id
const getProductById = async (productId) => {
    try {
        const response = await httpGet(`/products/${productId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// get all products by current user
const getProductsByCurrentUser = async () => {
    try {
        const response = await httpGet('/products');
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// get all products
const getAllProducts = async () => {
    try {
        const response = await httpGet('/products/');
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

// get poducts by service provider ID
const getProductsByServiceProviderId = async (serviceProviderId) => {
    try {
        const response = await httpGet(`/products/products-by-provider/${serviceProviderId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error?.response?.data;
    }
}

export { createProduct, getProductById, updateProductById, deleteProductById, getAllProducts, getProductsByServiceProviderId };