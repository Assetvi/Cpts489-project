// models/Movie.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Movie extends Model {}

Movie.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vote_average: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  release_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  genres: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [] // Default value as empty array
  },
  overview: {
    type: DataTypes.TEXT,
    allowNull: true // or adjust as needed
  }
}, {
  sequelize,
  modelName: 'Movie'
});

module.exports = Movie;
