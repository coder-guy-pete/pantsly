import express from 'express';
const router = express.Router();
import volunteers from './volunteers/index.js';

router.use('/volunteers', volunteers);
router.get('/', (req, res) => {
  res.json({ message: 'Hello API!' });
});

export default router;
