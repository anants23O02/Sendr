import { Router } from 'express';
import smsRoutes from './sms.routes'; // Import SMS-related routes

const router = Router();

// Define route groups
router.use('/sms', smsRoutes); // All SMS-related routes will be prefixed with /sms

// Example: Add more route groups here as needed
// router.use('/users', userRoutes);

export default router;