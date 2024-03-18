import { DataTypes } from "sequelize";
import sequelize from '../database/connection.js';

const Product = sequelize.define('product', {
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'There is no description for this product yet.'
   },
   quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
   },
},
{ 
   paranoid: true
});

export default Product;

