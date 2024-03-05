import express from 'express';
import { protect } from '../middleware/authMiddleware.mjs';
import { allChats } from '../controllers/messageController.mjs'

const router = express.Router();

router.route('/:chatId').get(protect, allChats);

export default router;