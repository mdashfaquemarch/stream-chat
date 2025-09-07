import express from 'express';
import { isAuth } from '../../middlewares/isAuth.middleware.js';
import { getMessages, sendMessage } from '../../controllers/message.controller.js';

const router = express.Router();

router.post("/", getMessages);
// router.post("/send", sendMessage);

export default router;