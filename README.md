Product Showcase & Enquiry System 🛍️
A complete full-stack web application built with React frontend, Node.js/Express backend, and SQLite database. This application allows users to browse products, submit enquiries, and provides an admin dashboard to manage customer interactions.
🎯 Frontend (React)
Product Listing: Responsive grid layout with search, filter by category, and pagination

Product Details: Interactive modal with detailed product information

Enquiry Form: Client-side validation with user-friendly error messages

Admin Dashboard: View and manage all customer enquiries

Responsive Design: Mobile-first approach works on all screen sizes

Accessibility: ARIA labels, keyboard navigation, screen reader support

Modern UI: Clean design with smooth animations and transitions

⚙️ Backend (Node.js + Express)
RESTful API: Clean, documented endpoints with proper HTTP methods

Product Management: Get products with search, filter, and pagination

Enquiry Management: Submit and retrieve customer enquiries

Database Integration: SQLite with proper schema and relationships

Error Handling: Comprehensive error handling and validation

CORS Support: Cross-origin resource sharing enabled

🗄️ Database (SQLite)
Products Table: Store product information with categories

Enquiries Table: Store customer enquiries with foreign key relationships

Indexes: Optimized queries with proper indexing

Seed Data: Pre-populated with sample products and enquiries

🛠️ Tech Stack
Frontend
React 18 - Component-based UI library

React Router - Client-side routing

Axios - HTTP client for API requests

CSS3 - Modern styling with CSS Grid and Flexbox

ES6+ - Modern JavaScript features

Backend
Node.js - JavaScript runtime environment

Express - Web application framework

SQLite3 - Lightweight database engine

CORS - Cross-origin resource sharing

dotenv - Environment variable management

Development Tools
Git - Version control

npm - Package management

nodemon - Development server auto-restart

Create React App - Frontend build tooling

📁 Project Structure
text
product-showcase/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── EnquiryForm.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── Header.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── services/       # API and utility functions
│   │   │   ├── api.js
│   │   │   └── validation.js
│   │   ├── styles/         # CSS stylesheets
│   │   ├── App.jsx         # Main application component
│   │   └── index.js        # Application entry point
│   └── package.json        # Frontend dependencies
│
├── backend/                 # Node.js backend server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Server entry point
│   ├── database/           # SQLite database files
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
│
├── .gitignore              # Git ignore rules
└── README.md               # This file
🚀 Installation
Prerequisites
Node.js (v14 or higher)

npm (v6 or higher)

Modern web browser

Step-by-Step Setup
Clone the repository

bash
git clone https://github.com/yourusername/product-showcase.git
cd product-showcase
Set up the Backend

bash
cd backend
npm install
cp .env.example .env  # Create environment file
npm run seed          # Create database with sample data
Set up the Frontend

bash
cd ../frontend
npm install
