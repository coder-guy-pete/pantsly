import { DataTypes, Model } from 'sequelize';


// Renamed class without adjusting the model just for testing routes setup
class User extends Model {}

export function UserFactory(sequelize) {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    tableName: 'volunteers',
    sequelize,
  });

  return User;
}
