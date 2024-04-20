const sequelize = require('../db')
const {Model,DataTypes} = require('sequelize')
const {Op} = require('sequelize')

class Friendship extends Model{
    static async findFriends(username){
        const friendList = await Friendship.findAll({
            where: {
                [Op.or]:[{username1:username},{username2:username}]
            }
        })
        // friendList.forEach(myFunction(username))
        // function myFunction(username, item, index, arr){
        //     if((Friendship)item.username1 == username){
        //         arr[index]=item.username2
        //       }
        //       else{
        //         arr[index]=item.username1
        //       }
        // }
        // return friendList; 
        var friendNames = []
       for (let i = 0; i<friendList.length;i++){
        if (friendList[i].username1 == username){
            console.log(friendList[i].username2)
            friendNames.push(friendList[i].username2)
        }
        else{
            console.log(friendList[i].username1)
            friendNames.push(friendList[i].username1)
        }
       }
       for (let i = 0; i<friendNames.length;i++){
        console.log(friendNames[i])
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
