const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/mrsdb.sqlite'
})

module.exports = sequelize