'use strict';
const {hashPass} = require('../helpers/bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Song,{foreignKey:'user_id'})
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique:{
        msg : `this email has been used`
      },
      validate:{
        notEmpty:{
          msg : `email is required`
        },
        isEmail:{
          msg:`email should use an '@'`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : `email is required`
        },
        len:{
          args: [6],
          msg: `password should be minimum 6 characters`
        }
      }
    },
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,opt) => {
    instance.password = hashPass(instance.password);
  });

  return User;
};