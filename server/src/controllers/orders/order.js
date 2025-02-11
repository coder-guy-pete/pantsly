
// Order GET
export const orderGet = async (req, res) => {
    res.json(`This is the order history for the user id ${req.params.user_id}`);
};