import express from 'express';
import { accessChat, fetchChat } from '../controllers/chatController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').post(protect, fetchChat);


export default router;