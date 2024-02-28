import express from 'express';
import {registerUser, authUser, allUsers}  from '../controllers/userController.mjs';
import {protect} from '../middleware/authMiddleware.mjs';
const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);

export default router;
