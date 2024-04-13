const sqlite3 = require('sqlite3').verbose();

function runQuery(queryString, values, callback) {
    const db = new sqlite3.Database('database.db', (err) => {
        if (err) {
            console.error('Error connecting to SQLite database:', err.message);
            return callback(err);
        }
    });

    db.all(queryString, values, (err, rows) => {
        if (err) {
            console.error('Error executing SQLite query:', err.message);
            return callback(err);
        }

        // Close the database connection
        db.close();

        // Pass the rows to the callback function
        callback(null, rows);
    });
}

module.exports = runQuery;
