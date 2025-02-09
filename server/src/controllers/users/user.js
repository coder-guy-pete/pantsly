import { User } from '../../models/index.js'

// User GET api/users/user/:id
export const userGet = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
}
