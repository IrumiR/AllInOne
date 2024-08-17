import { httpPost } from "./http.service";

// Send email using the email service
export const sendEmail = async (to, subject, text, html) => {
    const data = { to, subject, text, html };
    return await httpPost('/send-email', data);
};