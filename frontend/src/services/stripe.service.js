import { httpGet } from "./http.service";

// get stripe transaction data by session Id
const getStripeTransactionData = async (sessionId) => {
    try {
        const response = await httpGet(`/payment-success/?session_id=${sessionId}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data;
    }
}

export { getStripeTransactionData };