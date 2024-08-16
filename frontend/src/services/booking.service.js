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


export { createBooking, getBookingById };