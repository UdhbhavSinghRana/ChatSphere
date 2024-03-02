import express from 'express';
import {registerUser, authUser, allUsers, addFriend, getFriends}  from '../controllers/userController.mjs';
import {protect} from '../middleware/authMiddleware.mjs';
const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);
router.route('/addFriend').put(protect, addFriend);
router.route('/getFriends').get(protect, getFriends);

export default router;
