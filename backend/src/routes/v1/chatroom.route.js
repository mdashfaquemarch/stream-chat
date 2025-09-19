import express from 'express';
import { createChatRoom, deleteChatRoom, getChatRoom, getUserChatRooms, toggleIsLive } from '../../controllers/chatroom.controller.js';
import { isAuth } from '../../middlewares/isAuth.middleware.js';
import optionalAuth from '../../middlewares/optionalAuth.middleware.js';

const router = express.Router();


router.route("/").post(isAuth, createChatRoom);
router.route("/:id")
.delete(isAuth, deleteChatRoom)
.put(isAuth, toggleIsLive);

router.route("/:slug").get(optionalAuth,getChatRoom);

router.route("/").get(isAuth, getUserChatRooms)

export default router;