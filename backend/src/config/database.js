const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../database/database.sqlite');


const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database');
    }
});


db.get('PRAGMA foreign_keys = ON');

const initDatabase = () => {
    const createProductsTable = `
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            short_desc TEXT NOT NULL,
            long_desc TEXT NOT NULL,
            price REAL NOT NULL CHECK(price >= 0),
            image_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    const createEnquiriesTable = `
        CREATE TABLE IF NOT EXISTS enquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL
        )
    `;

    
    const createIndexes = `
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
        CREATE INDEX IF NOT EXISTS idx_enquiries_product_id ON enquiries(product_id);
        CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);
    `;

    db.serialize(() => {
        db.run(createProductsTable);
        db.run(createEnquiriesTable);
        db.run(createIndexes);
    });
};

module.exports = { db, initDatabase };