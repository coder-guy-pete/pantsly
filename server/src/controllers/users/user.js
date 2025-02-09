import { User } from '../../models/index.js'

// GET User
export const userGet = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};