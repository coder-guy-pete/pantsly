import { DataTypes, Model } from 'sequelize';

class Volunteer extends Model {}

export function VolunteerFactory(sequelize) {
  Volunteer.init({
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

  return Volunteer;
}
