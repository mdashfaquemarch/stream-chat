import express from 'express';
import userRoutes from './user.route.js';
import messageRoutes from './message.route.js';
import paymentRoutes from './payment.route.js';
import chatroomRoutes from './chatroom.route.js'

const router = express.Router();

router.use("/users", userRoutes);
router.use("/messages", messageRoutes);
router.use("/payments", paymentRoutes);
router.use("/chatroom", chatroomRoutes)

export default router;