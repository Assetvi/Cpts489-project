// utils/drop-all-tables.js

const { sequelize } = require('../utils/db'); // Assuming this is where your Sequelize instance is initialized
const User = require('../models/User');
const Movie = require('../models/Movie');
const Friendship = require('../models/Friendship'); // Import the Friendship model

const dropAllTables = async () => {
  try {
    // Drop all tables defined in your models
    await User.sync({ force: true });
    await Movie.sync({ force: true });
    await Friendship.sync({ force: true }); // Sync the Friendship model

    console.log('All tables dropped and re-synced successfully.');
  } catch (error) {
    console.error('Error dropping and re-syncing tables:', error);
  } finally {
    // Close the Sequelize connection
    if (sequelize) {
      await sequelize.close();
      console.log('Sequelize connection closed.');
    }
  }
};

dropAllTables();
