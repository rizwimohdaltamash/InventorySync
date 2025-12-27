import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { FaExclamationTriangle, FaTimes, FaCheckCircle } from 'react-icons/fa';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    category: '',
    quantity: 0,
    reorderLevel: 10,
    unitPrice: 0,
    supplier: '',
    location: '',
    weightValue: '',
    weightUnit: 'kg'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct._id, formData);
      } else {
        await productsAPI.create(formData);
      }
      
      fetchProducts();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      sku: product.sku,
      name: product.name,
      description: product.description || '',
      category: product.category,
      quantity: product.quantity,
      reorderLevel: product.reorderLevel,
      unitPrice: product.unitPrice,
      supplier: product.supplier || '',
      location: product.location || '',
      weightValue: product.weightValue || '',
      weightUnit: product.weightUnit || 'kg'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await productsAPI.delete(id);
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      sku: '',
      name: '',
      description: '',
      category: '',
      quantity: 0,
      reorderLevel: 10,
      unitPrice: 0,
      supplier: '',
      location: '',
      weightValue: '',
      weightUnit: 'kg'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setError('');
  };

  const getStockStatus = (product) => {
    if (product.quantity === 0) return 'badge-danger';
    if (product.quantity <= product.reorderLevel) return 'badge-warning';
    return 'badge-success';
  };

  const getRowStyle = (product) => {
    // Dead stock (out of stock) - gray background
    if (product.quantity === 0) {
      return {
        backgroundColor: '#f5f5f5',
        color: '#888',
        opacity: 0.8
      };
    }
    // Low stock - red/orange background
    if (product.quantity <= product.reorderLevel) {
      return {
        backgroundColor: '#fff3e0',
        borderLeft: '4px solid #f57c00'
      };
    }
    // Normal stock
    return {};
  };

  const getQuantityStyle = (product) => {
    if (product.quantity === 0) {
      return { color: '#d32f2f', fontWeight: 'bold', fontSize: '1.1rem' };
    }
    if (product.quantity <= product.reorderLevel) {
      return { color: '#f57c00', fontWeight: 'bold', fontSize: '1.1rem' };
    }
    return { color: '#2e7d32', fontWeight: 'bold' };
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">
          <div className="spinner"></div>
          Loading inventory...
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h4 style={{ fontSize: '28px', fontWeight: 600 }}>Inventory Management</h4>
        <p>Manage your product inventory</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Quick Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        <div style={{ 
          padding: '20px', 
          background: '#fff', 
          borderRadius: '10px', 
          borderLeft: '5px solid #667eea',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: '600' }}>Total SKUs</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '8px', color: '#2c3e50' }}>{products.length}</div>
        </div>
        <div style={{ 
          padding: '20px', 
          background: '#fff', 
          borderRadius: '10px', 
          borderLeft: '5px solid #f5576c',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '0.85rem', color: '#f5576c', fontWeight: '600' }}>Low Stock</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '8px', color: '#2c3e50' }}>
            {products.filter(p => p.quantity > 0 && p.quantity <= p.reorderLevel).length}
          </div>
        </div>
        <div style={{ 
          padding: '20px', 
          background: '#fff', 
          borderRadius: '10px', 
          borderLeft: '5px solid #FFC107',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '0.85rem', color: '#FFC107', fontWeight: '600' }}>Dead Stock</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '8px', color: '#2c3e50' }}>
            {products.filter(p => p.quantity === 0).length}
          </div>
        </div>
        <div style={{ 
          padding: '20px', 
          background: '#fff', 
          borderRadius: '10px', 
          borderLeft: '5px solid #26de81',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '0.85rem', color: '#26de81', fontWeight: '600' }}>In Stock</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '8px', color: '#2c3e50' }}>
            {products.filter(p => p.quantity > p.reorderLevel).length}
          </div>
        </div>
      </div>

      <div className="card" style={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08)', 
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <h3 style={{ marginBottom: '15px', color: '#2c3e50', fontWeight: '600' }}>All Products ({products.length})</h3>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '14px', height: '14px', backgroundColor: '#f5f5f5', border: '2px solid #999', borderRadius: '3px' }}></div>
                <span style={{ color: '#666', fontWeight: '500' }}>Dead Stock</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '14px', height: '14px', backgroundColor: '#fff3e0', border: '2px solid #f57c00', borderRadius: '3px' }}></div>
                <span style={{ color: '#666', fontWeight: '500' }}>Low Stock</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '14px', height: '14px', backgroundColor: '#e8f5e9', border: '2px solid #2e7d32', borderRadius: '3px' }}></div>
                <span style={{ color: '#666', fontWeight: '500' }}>Normal Stock</span>
              </div>
            </div>
          </div>

          <button
  onClick={openAddModal}
  className="btn btn-primary btn-sm"
  style={{
    padding: '4px 8px',
    fontSize: '0.75rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    width: 'fit-content',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  + Add Product
</button>

        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Unit Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={getRowStyle(product)}>
                  <td><strong>{product.sku}</strong></td>
                  <td>
                    {product.name}
                    {product.quantity === 0 && (
                      <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#d32f2f', fontWeight: 'bold' }}>
                        [DEAD STOCK]
                      </span>
                    )}
                  </td>
                  <td>{product.category}</td>
                  <td>{product.weightValue ? `${product.weightValue} ${product.weightUnit}` : '-'}</td>
                  <td style={getQuantityStyle(product)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {product.quantity}
                      {product.quantity === 0 && <FaExclamationTriangle style={{ color: '#f57c00' }} />}
                    </span>
                  </td>
                  <td>{product.reorderLevel}</td>
                  <td>₹{product.unitPrice.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${getStockStatus(product)}`}>
                      {product.quantity === 0 ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaTimes /> Out of Stock</span>
                      ) : product.quantity <= product.reorderLevel ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaExclamationTriangle /> Low Stock</span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaCheckCircle /> In Stock</span>
                      )}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="btn btn-secondary btn-small"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-danger btn-small"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ padding: '20px' }}>
            <div className="modal-header" style={{ marginBottom: '15px' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="2"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Construction">Construction</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Unit Price *</label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Weight Value</label>
                  <input
                    type="number"
                    name="weightValue"
                    value={formData.weightValue}
                    onChange={handleInputChange}
                    placeholder="Enter weight"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label>Weight Unit</label>
                  <select
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleInputChange}
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="mg">Milligram (mg)</option>
                    <option value="lb">Pound (lb)</option>
                    <option value="oz">Ounce (oz)</option>
                    <option value="ton">Ton (ton)</option>
                    <option value="mm">Millimeter (mm)</option>
                    <option value="cm">Centimeter (cm)</option>
                    <option value="m">Meter (m)</option>
                    <option value="in">Inch (in)</option>
                    <option value="ft">Feet (ft)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Reorder Level *</label>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={formData.reorderLevel}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="btn-group">
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
