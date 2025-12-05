import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Header from './components/Header';
import './App.css'; 
import './styles/Responsive.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [enquiries, setEnquiries] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="main-content">
        {currentPage === 'home' ? (
          <HomePage />
        ) : (
          <AdminPage enquiries={enquiries} setEnquiries={setEnquiries} />
        )}
      </main>
      <footer className="footer">
        <p>© 2024 Product Showcase & Enquiry System. All rights reserved.</p>
        <p className="footer-links">
          <span>Contact: support@productshowcase.com</span>
          <span>Phone: (555) 123-4567</span>
        </p>
      </footer>
    </div>
  );
}

export default App;