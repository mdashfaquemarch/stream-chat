import express from 'express';
import { isAuth } from '../../middlewares/isAuth.middleware.js';
import { createOrder, verifyOrder } from '../../controllers/payment.controller.js';

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyOrder);

export default router;