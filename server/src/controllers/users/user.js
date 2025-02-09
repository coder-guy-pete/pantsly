import { User } from '../../models/index.js'

// User GET 
export const userGet = async (req, res) => {
    const userDetails = await User.findAll({
        where: {
            id: req.params.id
        }
    });

    if (userDetails.length > 0) {
        return res.status(200).json(userDetails);
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
    
}