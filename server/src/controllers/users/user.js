import { User } from '../../models/index.js'

// User GET api/users/user w/ req.body.email
export const userValidate = async (req, res) => {
    const allUsers = await User.findAll({
        where: {
            email: req.body.email
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