import client from "../utils/twilioClient";
import dotenv from 'dotenv';
dotenv.config();

console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);
export const sendMessage = async (
  to: string,
  body: string,
  type: 'SMS' | 'WHATSAPP'
) => {
  const formattedTo = type === 'WHATSAPP' ? `whatsapp:${to}` : to;
  const from = type === 'WHATSAPP'
    ? `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
    : process.env.TWILIO_PHONE_NUMBER;

  try {
    const message = await client.messages.create({
      body,
      from,
      to: formattedTo,
    });
    console.log('Message sent:', message.sid);
    return message;
  } catch (err) {
    console.error('Error sending message:', err);
    throw err;
  }
};
