import { Router, Request, Response } from 'express';

const router = Router();

// Dummy route for SMS
router.get('/dummy', (req: Request, res: Response) => {
  res.status(200).json({ message: 'This is a dummy SMS route!' });
});

export default router;