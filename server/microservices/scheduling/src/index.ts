import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index'; 
import { sendMessage } from './services/smsHelper';
import { scheduleWhatsAppMessage } from './customWhatapp/messageScheduler';

dotenv.config(); 

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api/v1', routes); 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});