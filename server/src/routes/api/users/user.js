import express from 'express';
const router = express.Router();
import { userGet, userValidate } from '../../../controllers/users/user.js';

// GET api/users/user/:email
router.get('/', userValidate);

router.get('/:id', userGet);


export default router;
