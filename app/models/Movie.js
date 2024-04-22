const sequelize = require('../utils/db')
const { Model, DataTypes, Op } = require('sequelize')

class Movie extends Model {
  static async findMovie(moviename) {
    try{
    const movie = await Movie.findOne({
      where: {
        title: moviename,
      },
    });
    return movie
  } catch (error){
    console.error('Error fetching movie:', error);
    return null
  }

  }
}



// Movie.init({
//   // Model attributes are defined here
//   title: {
//     type: DataTypes.STRING,
//     primaryKey: true,
//     allowNull: false
//   },
//   director: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   year: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   genre:{
//     type: DataTypes.STRING,
//     allowNull:false
//   }
// }, {
//   // Other model options go here
//   sequelize, // We need to pass the connection instance
//   modelName: 'Movie' // We need to choose the model name
// });

// module.exports = Movie;
// models/Movie.js
// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('../utils/db');

// class Movie extends Model {}

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
