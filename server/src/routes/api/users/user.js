import express from 'express';
const router = express.Router();
import { userGet } from '../../../controllers/users/user.js';

// GET api/users/user
router.get('/', async (req, res) => {
  res.json({ message: 'This is the user specific API route'});
});

// GET api/users/user/:id
router.get('/:id', userGet);


export default router;
