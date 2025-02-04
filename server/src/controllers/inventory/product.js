// import { Product } from '../../models/index.js';

import tempData from './tempdata.js';


export const productGet = async (req, res) => {
    res.json(tempData);
}

