import express from 'express';
const router = express.Router();
import { userGet } from '../../../controllers/users/user.js';

// GET api/users/user/:email
router.get('/', userGet);


export default router;
