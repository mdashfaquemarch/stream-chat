import express from 'express';
import { getMe, signOut } from '../../controllers/user.controller.js';
import { isAuth } from '../../middlewares/isAuth.middleware.js';


const router = express.Router();


router.get("/signout",isAuth, signOut)
router.get("/getme", isAuth , getMe)

export default router;