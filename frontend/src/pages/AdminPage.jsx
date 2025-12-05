import React, { useState, useEffect } from 'react';
import { fetchEnquiries } from '../services/api';
import './AdminPage.css';

const AdminPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEnquiries();
      setEnquiries(data);
    } catch (err) {
      setError('Failed to load enquiries. Please check your connection and try again.');
      console.error('Error loading enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadEnquiries();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleViewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedEnquiry(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return '#3498db';
      case 'in-progress':
        return '#f39c12';
      case 'resolved':
        return '#27ae60';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const getProductName = (enquiry) => {
    return enquiry.product_name || 'General Enquiry';
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchTerm) ||
      enquiry.email.toLowerCase().includes(searchTerm) ||
      getProductName(enquiry).toLowerCase().includes(searchTerm) ||
      enquiry.message.toLowerCase().includes(searchTerm);
    
    const matchesStatus = selectedStatus === 'all' || enquiry.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-title">
          <h2>📊 Admin Dashboard</h2>
          <p>Manage and monitor customer enquiries</p>
        </div>
        <div className="admin-actions">
          <button 
            onClick={handleRefresh}
            className="refresh-button"
            aria-label="Refresh enquiries"
          >
            🔄 Refresh
          </button>
          <div className="stats-badge">
            <span className="stat-count">{enquiries.length}</span>
            <span className="stat-label">Total Enquiries</span>
          </div>
        </div>
      </div>

      <div className="admin-controls">
        <div className="search-control">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search enquiries by name, email, or message..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              aria-label="Search enquiries"
            />
          </div>
        </div>
        
        <div className="filter-control">
          <label htmlFor="status-filter" className="filter-label">
            Filter by Status:
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={handleStatusChange}
            className="status-select"
            aria-label="Filter enquiries by status"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading enquiries...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Enquiries</h3>
          <p>{error}</p>
          <button onClick={handleRefresh} className="retry-button">
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="enquiries-summary">
            <div className="summary-item">
              <span className="summary-count">{enquiries.length}</span>
              <span className="summary-label">Total</span>
            </div>
            <div className="summary-item">
              <span className="summary-count" style={{color: '#3498db'}}>
                {enquiries.filter(e => e.status === 'new').length}
              </span>
              <span className="summary-label">New</span>
            </div>
            <div className="summary-item">
              <span className="summary-count" style={{color: '#f39c12'}}>
                {enquiries.filter(e => e.status === 'in-progress').length}
              </span>
              <span className="summary-label">In Progress</span>
            </div>
            <div className="summary-item">
              <span className="summary-count" style={{color: '#27ae60'}}>
                {enquiries.filter(e => e.status === 'resolved').length}
              </span>
              <span className="summary-label">Resolved</span>
            </div>
          </div>

          <div className="enquiries-table-container">
            {filteredEnquiries.length === 0 ? (
              <div className="no-enquiries">
                <div className="no-enquiries-icon">📭</div>
                <h3>No Enquiries Found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="enquiries-table-wrapper">
                <table className="enquiries-table" aria-label="Customer enquiries">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Product</th>
                      <th scope="col">Message Preview</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((enquiry) => (
                      <tr key={enquiry.id}>
                        <td className="enquiry-id">#{enquiry.id}</td>
                        <td className="customer-info">
                          <div className="customer-name">{enquiry.name}</div>
                          <div className="customer-email">{enquiry.email}</div>
                          {enquiry.phone && (
                            <div className="customer-phone">{enquiry.phone}</div>
                          )}
                        </td>
                        <td className="product-info">
                          {getProductName(enquiry)}
                          {enquiry.product_category && (
                            <div className="product-category">
                              {enquiry.product_category}
                            </div>
                          )}
                        </td>
                        <td className="message-preview">
                          {enquiry.message.length > 80
                            ? `${enquiry.message.substring(0, 80)}...`
                            : enquiry.message}
                        </td>
                        <td className="enquiry-date">
                          {formatDate(enquiry.created_at)}
                        </td>
                        <td className="enquiry-status">
                          <span 
                            className="status-badge"
                            style={{backgroundColor: getStatusColor(enquiry.status || 'new')}}
                          >
                            {enquiry.status || 'new'}
                          </span>
                        </td>
                        <td className="enquiry-actions">
                          <button
                            onClick={() => handleViewDetails(enquiry)}
                            className="view-button"
                            aria-label={`View details of enquiry #${enquiry.id}`}
                          >
                            👁️ View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {showDetailsModal && selectedEnquiry && (
        <div className="enquiry-details-modal" onClick={handleCloseModal}>
          <div className="enquiry-details-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close-button"
              onClick={handleCloseModal}
              aria-label="Close enquiry details"
            >
              &times;
            </button>
            
            <div className="modal-header">
              <h3>Enquiry Details</h3>
              <div className="enquiry-id-badge">#{selectedEnquiry.id}</div>
            </div>
            
            <div className="modal-body">
              <div className="details-section">
                <h4>Customer Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedEnquiry.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedEnquiry.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">
                      {selectedEnquiry.phone || 'Not provided'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Submitted:</span>
                    <span className="detail-value">
                      {formatDate(selectedEnquiry.created_at)}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedEnquiry.product_name && (
                <div className="details-section">
                  <h4>Product Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Product:</span>
                      <span className="detail-value">{selectedEnquiry.product_name}</span>
                    </div>
                    {selectedEnquiry.product_category && (
                      <div className="detail-item">
                        <span className="detail-label">Category:</span>
                        <span className="detail-value">{selectedEnquiry.product_category}</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <span className="detail-label">Product ID:</span>
                      <span className="detail-value">{selectedEnquiry.product_id}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="details-section">
                <h4>Enquiry Message</h4>
                <div className="message-content">
                  {selectedEnquiry.message}
                </div>
              </div>
              
              <div className="details-section">
                <h4>Status Management</h4>
                <div className="status-management">
                  <select 
                    className="status-select"
                    defaultValue={selectedEnquiry.status || 'new'}
                    aria-label="Update enquiry status"
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="update-button">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="close-button" onClick={handleCloseModal}>
                Close
              </button>
              <div className="action-buttons">
                <button className="email-button" aria-label="Send email response">
                  📧 Reply via Email
                </button>
                <button className="phone-button" aria-label="Call customer">
                  📞 Call Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;