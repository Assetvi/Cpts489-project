const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');
const bcrypt = require('bcryptjs');

class User extends Model {
  static async findUser(username, password) {
    try {
      const user = await User.findByPk(username);
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  watchlater: {
    type: DataTypes.STRING, 
    allowNull: true,
    defaultValue: '' // Set default value to empty string
  },
  alreadywatched: {
    type: DataTypes.STRING, 
    allowNull: true,
    defaultValue: '' // Set default value to empty string
  },
  friends: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  }
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
