const sequelize = require('../utils/db')
const { Model, DataTypes, Op } = require('sequelize')
//const { Op } = require('sequelize')

class Friendship extends Model {
  static async findFriends(username) {
    const friendList = await Friendship.findAll({
      where: {
        [Op.or]: [{ username1: username }, { username2: username }]
      }
    })
    var friendNames = []
    for (let i = 0; i < friendList.length; i++) {
      if (friendList[i].username1 == username) {
        friendNames.push(friendList[i].username2)
      }
      else {
        friendNames.push(friendList[i].username1)
      }
    }
    return friendNames
  }
}

Friendship.init({
  // Model attributes are defined here
  username1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username2: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Friendship' // We need to choose the model name
});

module.exports = Friendship;
