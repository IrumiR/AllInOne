import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { httpGet } from "@/services/http.service"
import { BACKEND_BASE_URL } from "@/config"

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