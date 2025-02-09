import { User } from '../../models/index.js';


// Users POST
export const usersPost = async (req, res) => {
  // res.json({message: 'Placeholder for usersPost. Will be used to create new user'});

  const newUser = {
    name: req.body.name,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  }

  if (req.body.password) {
    newUser.password = req.body.password;
  }

  if (req.body.isAdmin) {
    newUser.isAdmin = req.body.isAdmin;
  }

  try {
    const user = await User.create(newUser);
    return res.status(200).json({ user_id: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ user_id: null });
  }
};

// Users PUT
export const usersPut = (req, res) => {
  res.json({message: `Placeholder for usersPut. Will update user with ID: ${req.params.id} entered as a param for api/users/:id`})};

//Users DELETE
export const usersDelete = (req, res) => {
  res.json({ message: `Placeholder for usersDelete. Will delete user with ID: ${req.params.id} entered as a param for api/users/:id`});
};