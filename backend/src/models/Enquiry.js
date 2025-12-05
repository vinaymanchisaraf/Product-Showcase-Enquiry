const { db } = require('../config/database');

class Enquiry {
    static create(enquiryData) {
        return new Promise((resolve, reject) => {
            const { product_id, name, email, phone, message } = enquiryData;
            const query = `
                INSERT INTO enquiries (product_id, name, email, phone, message) 
                VALUES (?, ?, ?, ?, ?)
            `;
            
            db.run(query, [product_id, name, email, phone, message], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ 
                    id: this.lastID, 
                    ...enquiryData,
                    created_at: new Date().toISOString()
                });
            });
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    e.*, 
                    p.name as product_name,
                    p.category as product_category
                FROM enquiries e 
                LEFT JOIN products p ON e.product_id = p.id 
                ORDER BY e.created_at DESC
            `;
            
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    e.*, 
                    p.name as product_name,
                    p.category as product_category
                FROM enquiries e 
                LEFT JOIN products p ON e.product_id = p.id 
                WHERE e.id = ?
            `;
            
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }
}

module.exports = Enquiry;