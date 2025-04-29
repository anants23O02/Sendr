import { sendWhatsAppMessage } from "./whatappService";


/**
 * Schedules a WhatsApp message to be sent at a specific time.
 * @param number - The recipient's phone number (e.g., "+1234567890").
 * @param message - The message to send.
 * @param sendTime - The time to send the message (ISO string or Date object).
 */
export function scheduleWhatsAppMessage(number: string, message: string, sendTime: string | Date): void {
  const delay = new Date(sendTime).getTime() - Date.now();
  if (delay < 0) {
    console.error('⏰ Time is in the past');
    return;
  }

  console.log(`📅 Scheduled message to ${number} at ${sendTime}`);
  setTimeout(async () => {
    try {
      await sendWhatsAppMessage(number, message);
    } catch (err: any) {
      console.error('❌ Failed to send scheduled WhatsApp message:', err.message);
    }
  }, delay);
}