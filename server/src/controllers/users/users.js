import { User } from '../../models/index.js';

// GET /Users
export const usersGet = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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