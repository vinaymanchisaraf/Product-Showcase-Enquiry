const { db, initDatabase } = require('../config/database');

const seedData = () => {
    console.log('🌱 Seeding database...');
    initDatabase();

    const products = [
        {
            name: 'Wireless Headphones',
            category: 'Electronics',
            short_desc: 'Noise-cancelling wireless headphones with superior sound quality',
            long_desc: 'Premium noise-cancelling wireless headphones with 30-hour battery life, Bluetooth 5.0 connectivity, memory foam ear cups, and built-in microphone for crystal clear calls. Perfect for travel, work, and entertainment.',
            price: 199.99,
            image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop'
        },
        {
            name: 'Smart Watch Pro',
            category: 'Electronics',
            short_desc: 'Advanced fitness tracking smartwatch with GPS',
            long_desc: 'Feature-rich smartwatch with heart rate monitoring, sleep tracking, GPS, water resistance up to 50m, 7-day battery life, and customizable watch faces. Syncs with both Android and iOS devices.',
            price: 299.99,
            image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop'
        },
        {
            name: 'Premium Coffee Maker',
            category: 'Home Appliances',
            short_desc: 'Programmable coffee machine with thermal carafe',
            long_desc: '12-cup programmable coffee maker with built-in grinder, thermal stainless steel carafe to keep coffee hot for hours, adjustable brew strength, and 24-hour programmable timer. Includes reusable filter.',
            price: 89.99,
            image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop'
        },
        {
            name: 'Professional Yoga Mat',
            category: 'Fitness',
            short_desc: 'Eco-friendly, non-slip exercise mat with alignment lines',
            long_desc: 'Extra thick 6mm eco-friendly yoga mat with double-sided non-slip surface, alignment lines for perfect pose positioning, moisture-resistant top layer, and includes carrying strap. Perfect for all skill levels.',
            price: 34.99,
            image_url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&auto=format&fit=crop'
        },
        {
            name: 'Adjustable LED Desk Lamp',
            category: 'Home Office',
            short_desc: 'Energy-efficient LED desk lamp with adjustable brightness',
            long_desc: 'Modern LED desk lamp with 5 levels of brightness adjustment, 3 color temperatures (warm to cool white), touch controls, flexible gooseneck design, USB charging port, and memory function for last setting.',
            price: 45.99,
            image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop'
        },
        {
            name: 'Water-resistant Laptop Backpack',
            category: 'Travel',
            short_desc: 'Durable backpack with laptop compartment and USB port',
            long_desc: 'Weather-resistant backpack with dedicated 15.6" laptop compartment, multiple organizational pockets, USB charging port, hidden anti-theft pocket, comfortable padded straps, and luggage strap for travel.',
            price: 79.99,
            image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop'
        },
        {
            name: 'High-Speed Blender',
            category: 'Kitchen',
            short_desc: 'Professional-grade blender with 8 preset programs',
            long_desc: 'Powerful 1500W blender with 8 preset programs (smoothie, ice crush, soup, etc.), 64oz BPA-free pitcher, stainless steel blades, touch controls, self-cleaning function, and 7-year warranty.',
            price: 129.99,
            image_url: 'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?w=400&auto=format&fit=crop'
        },
        {
            name: 'Ceramic Plant Pot Set',
            category: 'Home Decor',
            short_desc: 'Set of 3 ceramic plant pots with drainage',
            long_desc: 'Set includes 3 ceramic plant pots in different sizes (6", 8", 10"), each with drainage holes and matching saucers. Made from premium clay with matte finish. Perfect for indoor plants and succulents.',
            price: 49.99,
            image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop'
        },
        {
            name: 'Ergonomic Office Chair',
            category: 'Home Office',
            short_desc: 'Comfortable ergonomic chair with lumbar support',
            long_desc: 'Premium ergonomic office chair with adjustable lumbar support, 3D armrests, 135-degree recline function, breathable mesh back, and smooth-rolling casters. Supports up to 250lbs weight capacity.',
            price: 189.99,
            image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop'
        },
        {
            name: 'Portable Bluetooth Speaker',
            category: 'Electronics',
            short_desc: 'Waterproof speaker with 12-hour battery',
            long_desc: 'IPX7 waterproof Bluetooth speaker with 360-degree sound, 12-hour battery life, built-in microphone for hands-free calls, and pairing capability for stereo sound. Perfect for outdoor activities.',
            price: 69.99,
            image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop'
        }
    ];

    
    db.run('DELETE FROM enquiries', () => {
        db.run('DELETE FROM products', () => {
            
            const insertStmt = db.prepare(`
                INSERT INTO products (name, category, short_desc, long_desc, price, image_url) 
                VALUES (?, ?, ?, ?, ?, ?)
            `);

            products.forEach(product => {
                insertStmt.run([
                    product.name,
                    product.category,
                    product.short_desc,
                    product.long_desc,
                    product.price,
                    product.image_url
                ]);
            });

            insertStmt.finalize();

            
            const enquiryStmt = db.prepare(`
                INSERT INTO enquiries (product_id, name, email, phone, message) 
                VALUES (?, ?, ?, ?, ?)
            `);

            const enquiries = [
                {
                    product_id: 1,
                    name: 'John Smith',
                    email: 'john@example.com',
                    phone: '+1 (555) 123-4567',
                    message: 'Interested in bulk purchase for corporate gifts. Please send pricing for 50 units.'
                },
                {
                    product_id: 3,
                    name: 'Sarah Johnson',
                    email: 'sarah@example.com',
                    phone: '',
                    message: 'Do you offer international shipping for the coffee maker? What is the voltage requirement?'
                }
            ];

            enquiries.forEach(enquiry => {
                enquiryStmt.run([
                    enquiry.product_id,
                    enquiry.name,
                    enquiry.email,
                    enquiry.phone,
                    enquiry.message
                ]);
            });

            enquiryStmt.finalize();

            console.log('✅ Database seeded successfully!');
            console.log(`📊 Inserted ${products.length} products and ${enquiries.length} enquiries`);
            db.all('SELECT id, name, category, price FROM products ORDER BY id', (err, rows) => {
                if (!err) {
                    console.log('\n📦 Products in database:');
                    rows.forEach(row => {
                        console.log(`   ${row.id}. ${row.name} - $${row.price} (${row.category})`);
                    });
                }
                process.exit(0);
            });
        });
    });
};

seedData();