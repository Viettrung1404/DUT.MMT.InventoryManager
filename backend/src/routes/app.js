import userRouter from './users.route.js';
import authRouter from './auth.route.js';
import inventoryRouter from './inventory.route.js';
import { Router } from 'express';

const router = Router();
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/inventory', inventoryRouter);

export default router;