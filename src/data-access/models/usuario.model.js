import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.config.js';

class Usuario extends Model {}

Usuario.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('cliente', 'empleado', 'admin'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
  }
);

export default Usuario;
