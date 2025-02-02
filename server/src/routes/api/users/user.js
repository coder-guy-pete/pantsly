import express from 'express';
const router = express.Router();
import { User } from '../../../models/index.js';

router.get('/', async (req, res) => {
  res.json({ message: 'This is the user specific API route'});
});

export default router;
