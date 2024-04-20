const sequelize = require('../utils/db')
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

    // async addFriend(user2){
    //   try{
    //     //const user2 = await User.findByPk(username2)
    //     if (!this.friends.includes(user2.username) && !user2.friends.includes(this.username))
    //     {
    //       this.friends = this.friends.concat(user2.username)
    //       user2.addFriend(this)
    //       console.log(Boolean(this.friends.includes(user2.username)))
    //       sequelize.sync()
    //     }
    //     else if(!this.friends.includes(user2.username))
    //     {
    //       this.friends = this.friends.concat(user2.username)
    //     }
    //     else
    //     {
    //       console.log("what")
    //     }

    //   }catch (error){
    //     console.log(error)
    //   }
    // }
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
    // friends: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: ""
    // }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

module.exports = User;
