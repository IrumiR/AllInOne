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


export { createBooking, getBookingById, getBookingsByUserId };