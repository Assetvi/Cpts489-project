const sequelize = require('../utils/db')
const { Model, DataTypes, Op } = require('sequelize')

class Recommend extends Model {
  static async findRecommends(username) {
    try{
    const recommends = await Recommend.findAll({
      where: {
        receiver: username,
      },
    });
    return recommends
  } catch (error){
    console.error('Error fetching recommendations:', error);
    return null
  }

  }
}



Recommend.init({
  // Model attributes are defined here
  receiver: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  moviename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Recommend' // We need to choose the model name
});

module.exports = Recommend;
