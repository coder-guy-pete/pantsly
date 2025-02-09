import express from 'express';
const router = express.Router();
import userRoutes from './user.js';
import { usersGet, usersPost, usersPut, usersDelete } from '../../../controllers/users/users.js';


router.use('/user', userRoutes);

//GET api/users
router.get('/', usersGet);

//POST api/users
router.post('/', usersPost); //NEED to hash password

// PUT api/users/id
router.put('/:id', usersPut) //NEED to hash password

// DELETE api/users/id
router.delete('/:id', usersDelete)


export default router;
