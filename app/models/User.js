const sequelize = require('../db')
const {Model,DataTypes} = require('sequelize')

class User extends Model{

    static async findUser(username, password){
        try{
            const user = await User.findByPk(username)
            if (user && user.password === password){
                return user
            }else{
                return null
            }
        }catch (error){
            console.log(error)
            return null
        }
    }

    static async addFriend(username1, username2){
      try{
        const user1 = await User.findByPk(username1)
        const user2 = await User.findByPk(username2)
        if(user1.friends == null)
        {
          user1.friends = ""
        }
        if(user2.friends == null)
        {
          user2.friends = ""
        }
        if (!user1.friends.includes(user2.username) && !user2.friends.includes(user1.username))
        {
          user1.friends = user1.friends.concat(user2.username)
          user2.friends = user2.friends.concat(user1.username)
          console.log("sawyer & trevor are now friends")
        }
        else
        {
          console.log("sawyer & trevor are ?")
        }

      }catch (error){
        console.log(error)
      }
    }
}

User.init({
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    friends: {
      type: DataTypes.STRING,
      allowNull: true,
      //defaultValue: ""
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

module.exports = User;
