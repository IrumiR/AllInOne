import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { httpGet } from "@/services/http.service"
import { BACKEND_BASE_URL } from "@/config"
import { parse } from 'date-fns';
import { format } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export async function getSignature() {
  try {
    const response = await httpGet(`${BACKEND_BASE_URL}/get-signature`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting signature");
  }
}

// for services categories
export function getCategoryNameByValue(valueToLookFor, categoriesArray) {
  const selectedCategory = categoriesArray.find(
      category => category.serviceCategoryValue === valueToLookFor
  );

  return selectedCategory ? selectedCategory.serviceCategoryName : null;
}


/**
 * Converts a date string to a Unix timestamp in milliseconds.
 * 
 * @param {string} dateString - The date string to convert.
 * @returns {number} The Unix timestamp in milliseconds.
 */
export function convertToTimestamp(dateString) {
  // Parse the date string with the updated format including the timezone name.
  const parsedDate = parse(dateString, "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX (zzzz)", new Date());
  return parsedDate.getTime();
}



/**
 * Converts a Unix timestamp in milliseconds back to a date string.
 * 
 * @param {number} timestamp - The Unix timestamp in milliseconds.
 * @returns {string} The date string in the original format.
 */
export function convertToDateString(timestamp) {
  const date = new Date(timestamp);
  return format(date, "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX (zzzz)");
}
