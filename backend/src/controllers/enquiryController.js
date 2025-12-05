const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
    try {
        const { product_id, name, email, phone, message } = req.body;
        
        
        const errors = [];
        
        if (!name || name.trim().length === 0) {
            errors.push('Name is required');
        }
        
        if (!email || email.trim().length === 0) {
            errors.push('Email is required');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push('Invalid email format');
            }
        }
        
        if (!message || message.trim().length === 0) {
            errors.push('Message is required');
        } else if (message.trim().length < 10) {
            errors.push('Message must be at least 10 characters');
        }
        
        if (phone && phone.trim().length > 0) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                errors.push('Invalid phone number format');
            }
        }
        
        if (errors.length > 0) {
            return res.status(400).json({ 
                success: false, 
                errors 
            });
        }
        
        const enquiry = await Enquiry.create({
            product_id: product_id || null,
            name: name.trim(),
            email: email.trim(),
            phone: phone ? phone.trim() : null,
            message: message.trim()
        });
        
        res.status(201).json({
            success: true,
            message: 'Enquiry submitted successfully',
            data: enquiry
        });
    } catch (error) {
        console.error('Error creating enquiry:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to submit enquiry',
            message: error.message 
        });
    }
};

exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.getAll();
        res.json({ 
            success: true, 
            data: enquiries 
        });
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch enquiries',
            message: error.message 
        });
    }
};

exports.getEnquiryById = async (req, res) => {
    try {
        const enquiryId = parseInt(req.params.id);
        if (isNaN(enquiryId)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid enquiry ID' 
            });
        }

        const enquiry = await Enquiry.getById(enquiryId);
        if (!enquiry) {
            return res.status(404).json({ 
                success: false, 
                error: 'Enquiry not found' 
            });
        }
        
        res.json({ 
            success: true, 
            data: enquiry 
        });
    } catch (error) {
        console.error('Error fetching enquiry:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch enquiry',
            message: error.message 
        });
    }
};