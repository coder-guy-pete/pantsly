import express from 'express';
const router = express.Router();
import filterRoutes from './filter.js';
import searchRoutes from './search.js';

router.use('/search', searchRoutes);
router.use('/filter', filterRoutes);

// Get api/UI/
router.get('/', (req, res) => {
  res.json({ message: 'Hello UI!' });
});

export default router;