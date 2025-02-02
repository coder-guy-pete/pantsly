import { User } from '../../models/index.js';

// Users GET
export const usersGet = (req, res) => {
  res.json({message: 'Placeholder for usersGet.'});
}

// Users POST
export const usersPost = (req, res) => {
  res.json({message: 'Placeholder for usersPost. Will be used to create new user'});
}

// Users PUT
export const usersPut = (req, res) => {
  res.json({message: `Placeholder for usersPut. Will update user with ID: ${req.params.id} entered as a param for api/users/:id`})};

//Users DELETE
export const usersDelete = (req, res) => {
  res.json({ message: `Placeholder for usersDelete. Will delete user with ID: ${req.params.id} entered as a param for api/users/:id`});
}