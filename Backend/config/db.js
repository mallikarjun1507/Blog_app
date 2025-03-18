const mysql = require("mysql2");

// Create the database connection object
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root",
    database: "Blog", // Ensure this matches your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("Database connection successful");

        // Check if the `posts` table exists, and create it if it doesn't
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        const createTableQuery1 = `
        CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            passwords TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
        db.query(createTableQuery, (err, result) => {
            if (err) {
                console.error("Error creating `posts` table:", err);
            } else {
                console.log("`posts` table is ready");
           
            }
        });
        db.query(createTableQuery1, (err, result) => {
            if (err) {
                console.error("Error creating `posts` table:", err);
            } else {
                console.log("`posts` table is ready");
            }
        });
    }
});

module.exports = db;