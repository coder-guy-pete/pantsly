import express from 'express';
const router = express.Router();
import api from './api/index.js';

router.use('/api', api);

// Test route to make sure API connection is working
router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;
