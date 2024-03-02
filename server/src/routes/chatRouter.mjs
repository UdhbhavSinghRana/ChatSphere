import express from 'express';
import { accessChat, fetchChat, createGroupChat, renameGroupChat, groupAdd } from '../controllers/chatController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').post(protect, fetchChat);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroupChat);
router.route('/groupadd').put(protect, groupAdd);

export default router;