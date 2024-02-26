import express from 'express';
import registerUser  from '../controllers/userController.mjs';
const router = express.Router();

router.route('/').post(registerUser);

export default router;
