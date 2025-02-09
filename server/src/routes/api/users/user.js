import express from 'express';
const router = express.Router();
import { userGet } from '../../../controllers/users/user.js';


// GET api/users/user/:id
router.get('/:id', userGet);


export default router;
