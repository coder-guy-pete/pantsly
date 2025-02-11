import express from 'express';
const router = express.Router();
import  { searchGet } from '../../../controllers/UI/search.js';

// GET api/UI/search
router.get('/', searchGet);

export default router;