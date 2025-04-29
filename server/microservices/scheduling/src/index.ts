import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index'; 
import { sendMessage } from './services/smsHelper';
import { scheduleWhatsAppMessage } from './customWhatapp/messageScheduler';

dotenv.config(); // Load environment variables

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Scheduling Microservice!');
});

//sendMessage("+919103043247",'Hello World', "WHATSAPP"); // Example usage of sendMessage function non custom
//scheduleWhatsAppMessage("+919103043247", "Hello World", new Date(Date.now() + 10000)); // Example usage of scheduleWhatsAppMessage function non custom without using the twilio


app.use('/api/v1', routes); // SMS routes

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});


// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});