import { httpGet, httpPost, httpPatch } from "./http.service";

// create booking
const createBooking = async (bookingData) => {
  try {
    const response = await httpPost(`/bookings/create`, bookingData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating booking");
  }
}

// get booking By Id 
const getBookingById = async (bookingId) => {
  try {
    const response = await httpGet(`/bookings/${bookingId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting booking");
  }
}

// get booking by user id
const getBookingsByUserId = async (userId) => {
  try {
    const response = await httpGet(`/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting bookings");
  }
}

// update booking by id
const updateBookingById = async (bookingId, bookingData) => {
  try {
    const response = await httpPatch(`/bookings/${bookingId}`, bookingData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating booking status");
  }
}

//get bookings by service provider id
const getBookingsByServiceProviderId = async (serviceProviderId) => {
  try {
    const response = await httpGet(`/bookings/service-provider/${serviceProviderId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting bookings");
  }
} 

// get orders by service provider id
const fetchOrderProductsByServiceProviderId = async (serviceProviderId) => {
  try {
    const response = await httpGet(`/orders/products/${serviceProviderId}`);
    return response.data;
  } catch (error) {
    console.error(error)
    throw new Error("Error getting products from orders");
  }
}

export { createBooking, getBookingById, getBookingsByUserId, updateBookingById, getBookingsByServiceProviderId, fetchOrderProductsByServiceProviderId };