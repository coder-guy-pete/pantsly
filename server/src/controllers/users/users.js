import { User } from '../../models/index.js';

// GET /Users
export const usersGet = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:email
export const usersValidate = async (req, res) => {
  const allUsers = await User.findAll({
      where: {
          email: req.params.email
      }
  });

  let has_account = false;

 if (!allUsers) {
      return res.json({ has_account: has_account });
 } else {
      for (const user of allUsers) {
          if (user.password) {
              has_account = true;
              return res.json({ has_account: has_account });
          }
      }
 }

  return res.json({ has_account: has_account });

}

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
    return res.status(200).json({ user_id: user.id , message: 'User created'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ user_id: null, message: 'User could not be created' });
  }
};

// Users PUT
export const usersPut = async (req, res) => {
  // res.json({message: `Placeholder for usersPut. Will update user with ID: ${req.params.id} entered as a param for api/users/:id`})};

  try {
    const user = await User.findOne({ where: { id: req.params.user_id } });

    if (req.body.name) user.name = req.body.name;
    if (req.body.address1) user.address1 = req.body.address1;
    if (req.body.address2) user.address2 = req.body.address2;
    if (req.body.city) user.city = req.body.city;
    if (req.body.state) user.state = req.body.state;
    if (req.body.zip) user.zip = req.body.zip;
    if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.isAdmin) user.isAdmin = req.body.isAdmin;
  
    await user.save();
    
    return res.status(200).json({ user_id: user.id, message: 'User updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ user_id: null });
  };
};



//Users DELETE
export const usersDelete = (req, res) => {
  res.json({ message: `Placeholder for usersDelete. Will delete user with ID: ${req.params.id} entered as a param for api/users/:id`});
};