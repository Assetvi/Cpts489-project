const sequelize = require('../utils/db');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static async findUser(username, password) {
    try {
      const user = await User.findByPk(username);
      if (user && bcrypt.compareSync(password, user.password)) { // Compare hashed password
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
      this.setDataValue('password', bcrypt.hashSync(value, 10)); // Automatically hash password on set
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email uniqueness within the database
    validate: {
      isEmail: true, // Validates email format
    }
  },
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
