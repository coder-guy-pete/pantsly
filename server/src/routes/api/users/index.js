import express from 'express';
const router = express.Router();
import userRoutes from './user.js';
import { usersGet, usersPost, usersPut, usersDelete } from '../../../controllers/users/users.js';


router.use('/user', userRoutes);

//GET api/users
router.get('/', usersGet);

//POST api/users
router.post('/', usersPost);

// PUT api/users/id
router.put('/:id', usersPut)

// DELETE api/users/id
router.delete('/:id', usersDelete)


export default router;
