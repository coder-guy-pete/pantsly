import express from 'express';
const router = express.Router();
import { Volunteer } from '../../../models/index.js';

router.get('/', async (req, res) => {
  const volunteers = await Volunteer.findAll();
  res.json(volunteers);
});

export default router;
