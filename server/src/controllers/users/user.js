import { User } from '../../models/index.js'

// User GET 
export const userGet = (req, res) => {
    res.json({ message: `Will retrieve user with ID ${req.params.id} entered as a param for api/users/user/:id` });
}