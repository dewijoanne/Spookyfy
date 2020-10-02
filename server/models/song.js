'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.User,{foreignKey:'user_id'})
    }
  };
  Song.init({
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `title is required`
        }
      }
    },
    artist: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `artist is required`
        }
      }
    },
    album: {
      type:DataTypes.STRING,
    },
    preview: {
      type:DataTypes.STRING,
    },
    lyrics: {
      type:DataTypes.STRING,
    },
    user_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};