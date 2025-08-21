import express from 'express';
import { createChatRoom, deleteChatRoom, getChatRoom, toggleIsLive } from '../../controllers/chatroom.controller.js';
import { isAuth } from '../../middlewares/isAuth.middleware.js';

const router = express.Router();


router.route("/").post(isAuth, createChatRoom);
router.route("/:id")
.delete(isAuth, deleteChatRoom)
.put(isAuth, toggleIsLive);

router.route("/:slug").get(getChatRoom);


export default router;