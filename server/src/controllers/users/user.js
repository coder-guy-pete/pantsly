import { User } from '../../models/index.js'

// User GET 
export const userGet = async (req, res) => {
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