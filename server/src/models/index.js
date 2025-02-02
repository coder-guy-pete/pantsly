import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';

const User = UserFactory(sequelize);
console.log(User === sequelize.models.User);

export { User };
