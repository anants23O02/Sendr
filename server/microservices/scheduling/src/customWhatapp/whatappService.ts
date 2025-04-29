import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const client = new Client({
  authStrategy: new LocalAuth(),
});

// Event: QR Code Generation
client.on('qr', (qr: string) => {
  console.log('Scan this QR code with your WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// Event: Client Ready
client.on('ready', () => {
  console.log('✅ WhatsApp client is ready');
});

// Event: Authentication Failure
client.on('auth_failure', (message: string) => {
  console.error('❌ WhatsApp authentication failed:', message);
});

// Event: Client Disconnected
client.on('disconnected', (reason: string) => {
  console.warn('WhatsApp client was disconnected:', reason);
});

client.initialize();

// Function to Send WhatsApp Message
export const sendWhatsAppMessage = async (number: string, message: string): Promise<void> => {
  const chatId = `${number}@c.us`;
  try {
    await client.sendMessage(chatId, message);
    console.log(`📤 Sent WhatsApp message to ${number}`);
  } catch (err: any) {
    console.error('❌ Failed to send WhatsApp message:', err.message);
    throw err;
  }
};

// Export the WhatsApp Client
export const whatsappClient = client;