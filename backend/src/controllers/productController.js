const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 6 } = req.query;
        const filters = { search, category };
        
       
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(Math.max(1, parseInt(limit)), 50); // Max 50 per page
        
        const result = await Product.getAll(filters, pageNum, limitNum);
        
        res.json({
            success: true,
            data: result.products,
            pagination: result.pagination,
            filters: {
                search: search || '',
                category: category || ''
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch products',
            message: error.message 
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid product ID' 
            });
        }

        const product = await Product.getById(productId);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                error: 'Product not found' 
            });
        }
        
        res.json({ 
            success: true, 
            data: product 
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch product',
            message: error.message 
        });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Product.getCategories();
        res.json({ 
            success: true, 
            data: categories 
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch categories',
            message: error.message 
        });
    }
};