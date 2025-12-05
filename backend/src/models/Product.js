const { db } = require('../config/database');

class Product {
    static getAll(filters = {}, page = 1, limit = 6) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM products WHERE 1=1';
            let params = [];
            
           
            if (filters.search) {
                query += ' AND (LOWER(name) LIKE ? OR LOWER(short_desc) LIKE ?)';
                const searchTerm = `%${filters.search.toLowerCase()}%`;
                params.push(searchTerm, searchTerm);
            }
            
            if (filters.category && filters.category !== '') {
                query += ' AND category = ?';
                params.push(filters.category);
            }
            
            
            const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
            db.get(countQuery, params, (err, countResult) => {
                if (err) {
                    reject(err);
                    return;
                }
                
               
                query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
                const offset = (page - 1) * limit;
                params.push(limit, offset);
                
                db.all(query, params, (err, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    resolve({
                        products: rows,
                        pagination: {
                            page: parseInt(page),
                            limit: parseInt(limit),
                            total: countResult.total,
                            totalPages: Math.ceil(countResult.total / limit)
                        }
                    });
                });
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM products WHERE id = ?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    static getCategories() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT DISTINCT category FROM products ORDER BY category';
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.map(row => row.category));
            });
        });
    }
}

module.exports = Product;