const sequelize = require('../db')
const {Model,DataTypes} = require('sequelize')

class User  extends Model{
    // constructor(username, password, email) {
    //     this.username = username;
    //     this.password = password;
    //     this.email = email;
    // }

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
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

module.exports = User;
