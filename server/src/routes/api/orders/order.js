import express from 'express';
const router = express.Router();

// TODO: Import the Order model here.
// User model being used as a temporary placeholder for setup

import { User } from '../../../models/index.js';

router.get('/', (req, res) => {
    res.json({ message: 'This is the route specific to individual order'});
});

export default router;