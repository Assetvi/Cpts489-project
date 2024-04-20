const sqlite3 = require('sqlite3').verbose();

function createTable() {
    // Open a database connection
    const db = new sqlite3.Database('database.db');

    // Define SQL statement to create the EXAMPLE table
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS EXAMPLE (
            first VARCHAR(255),
            last VARCHAR(255),
            email VARCHAR(255)
        )
    `;

    // Execute the SQL statement to create the table
    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating EXAMPLE table:', err.message);
        } else {
            console.log('EXAMPLE table created successfully');
        }

        // Close the database connection after the operation is completed
        db.close((err) => {
            if (err) {
                console.error('Error closing database connection:', err.message);
            } else {
                console.log('Database connection closed');
            }
        });
    });
}

module.exports = createTable;
