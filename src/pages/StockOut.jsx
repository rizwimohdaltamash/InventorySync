import { useState, useEffect } from 'react';
import { productsAPI, stockAPI } from '../services/api';
import { FaCheckCircle, FaBoxes, FaClipboardList, FaArrowCircleUp } from 'react-icons/fa';

function StockOut() {
  const [products, setProducts] = useState([]);
  const [recentMovements, setRecentMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    inventoryId: '',
    quantity: '',
    reason: '',
    reference: '',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, movementsRes] = await Promise.all([
        productsAPI.getAll(),
        stockAPI.getAll({ type: 'out' })
      ]);
      setProducts(productsRes.data.filter(p => p.quantity > 0));
      setRecentMovements(movementsRes.data.slice(0, 10));
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Track selected product for display
    if (name === 'inventoryId') {
      const product = products.find(p => p._id === value);
      setSelectedProduct(product || null);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Use the specific /api/stock/out endpoint
      const response = await stockAPI.stockOut({
        inventoryId: formData.inventoryId,
        quantity: parseInt(formData.quantity),
        reason: formData.reason,
        reference: formData.reference,
        notes: formData.notes
      });

      setSuccess(`Stock removed successfully! New quantity: ${response.data.updatedProduct.quantity}`);
      setFormData({
        inventoryId: '',
        quantity: '',
        reason: '',
        reference: '',
        notes: ''
      });
      setSelectedProduct(null);
      
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove stock');
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">
          <div className="spinner"></div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a202c' }}>
          <FaArrowCircleUp style={{ fontSize: '32px', color: '#f5576c' }} />
          Stock Out
        </h1>
        <p>Remove inventory from products - Track sales and outgoing stock</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="card" style={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08)',
        background: '#fff'
      }}>
        <h3 style={{ 
          marginBottom: '30px', 
          color: '#1a202c', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          fontSize: '20px',
          fontWeight: '600'
        }}>
          <FaBoxes style={{ fontSize: '22px', color: '#f5576c' }} />
          Remove Stock Form
        </h3>
        <form onSubmit={handleSubmit}>
          {/* STEP 1: Select SKU */}
          <div style={{ 
            marginBottom: '25px', 
            padding: '20px', 
            backgroundColor: '#f9fafb', 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ 
              color: '#1a202c', 
              marginBottom: '15px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              <span style={{ 
                backgroundColor: '#f5576c', 
                color: '#fff', 
                borderRadius: '50%', 
                width: '28px', 
                height: '28px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: '700',
                fontSize: '14px'
              }}>1</span>
              Select SKU / Product
            </h4>
            <div className="form-group">
              <label style={{ fontWeight: '600' }}>Select Product *</label>
              <select
                name="inventoryId"
                value={formData.inventoryId}
                onChange={handleInputChange}
                required
                style={{ fontSize: '1rem', padding: '12px' }}
              >
                <option value="">-- Choose a product to remove stock --</option>
                {products.map(product => (
                  <option key={product._id} value={product._id}>
                    {product.sku} - {product.name} (Available: {product.quantity} units)
                  </option>
                ))}
              </select>
              {products.length === 0 && (
                <p style={{ color: '#f57c00', marginTop: '10px', fontStyle: 'italic' }}>⚠️ No products with stock available</p>
              )}
            
            {/* Selected Product Display */}
            {selectedProduct && (
              <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #ddd' }}>
                <strong>Selected:</strong> {selectedProduct.name} ({selectedProduct.sku})<br/>
                <span style={{ color: '#666' }}>Available Stock: <strong style={{ color: selectedProduct.quantity <= selectedProduct.reorderLevel ? '#f57c00' : '#2e7d32' }}>{selectedProduct.quantity}</strong> units</span><br/>
                <span style={{ color: '#666' }}>Reorder Level: {selectedProduct.reorderLevel} units</span>
                {selectedProduct.quantity <= selectedProduct.reorderLevel && (
                  <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#f57c00' }}>
                    ⚠️ This product is at or below reorder level!
                  </div>
                )}
              </div>
            )}
            </div>
          </div>

          {/* STEP 2: Enter Quantity Sold */}
          <div style={{ 
            marginBottom: '25px', 
            marginTop: '25px', 
            padding: '20px', 
            backgroundColor: '#f9fafb', 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ 
              color: '#1a202c', 
              marginBottom: '15px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              <span style={{ 
                backgroundColor: '#667eea', 
                color: '#fff', 
                borderRadius: '50%', 
                width: '28px', 
                height: '28px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: '700',
                fontSize: '14px'
              }}>2</span>
              Enter Quantity Sold / Removed
            </h4>
            <div className="form-group">
              <label style={{ fontWeight: '600' }}>Quantity to Remove *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="1"
                max={selectedProduct?.quantity || undefined}
                placeholder="Enter quantity sold/removed"
                style={{ fontSize: '1.2rem', padding: '12px', fontWeight: 'bold' }}
              />
              {selectedProduct && formData.quantity && (
                <div style={{ marginTop: '10px' }}>
                  {parseInt(formData.quantity) <= selectedProduct.quantity ? (
                    <div style={{ padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
                      <strong>New quantity will be:</strong> {selectedProduct.quantity} - {formData.quantity} = <strong style={{ color: '#667eea', fontSize: '1.2rem' }}>{selectedProduct.quantity - parseInt(formData.quantity)}</strong> units
                      {(selectedProduct.quantity - parseInt(formData.quantity)) <= selectedProduct.reorderLevel && (
                        <div style={{ marginTop: '5px', color: '#f57c00' }}>⚠️ Will be at/below reorder level!</div>
                      )}
                    </div>
                  ) : (
                    <div style={{ padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px', color: '#d32f2f' }}>
                      ❌ Cannot remove {formData.quantity} units. Only {selectedProduct.quantity} available!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          <div style={{ 
            marginBottom: '25px', 
            padding: '20px', 
            backgroundColor: '#f9fafb', 
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ 
              color: '#1a202c', 
              marginBottom: '15px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              <FaClipboardList style={{ fontSize: '18px', color: '#667eea' }} />
              Additional Details
            </h4>
            <div className="form-row">
            <div className="form-group">
              <label>Reason *</label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
              >
                <option value="">Select reason...</option>
                <option value="Sale">Sale</option>
                <option value="Transfer">Transfer</option>
                <option value="Return to Supplier">Return to Supplier</option>
                <option value="Sample">Sample</option>
                <option value="Internal Use">Internal Use</option>
                <option value="Adjustment">Adjustment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Reference Number</label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                placeholder="Order#, Invoice#, etc."
              />
            </div>
          </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes..."
                rows="3"
              />
            </div>
          </div>

          {/* STEP 3: Submit */}
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            backgroundColor: '#f9fafb', 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <h4 style={{ 
              color: '#1a202c', 
              marginBottom: '15px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              <span style={{ 
                backgroundColor: '#f5576c', 
                color: '#fff', 
                borderRadius: '50%', 
                width: '28px', 
                height: '28px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: '700',
                fontSize: '14px'
              }}>3</span>
              Submit to Update Inventory
            </h4>
            <button 
              type="submit" 
              className="btn btn-danger" 
              style={{ 
                fontSize: '15px', 
                padding: '10px 20px',
                flex: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              disabled={selectedProduct && formData.quantity && parseInt(formData.quantity) > selectedProduct.quantity}
            >
              <FaCheckCircle />
              Remove Stock from Inventory
            </button>
          </div>
        </form>
      </div>

      <div className="card" style={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08)',
        background: '#fff'
      }}>
        <h3 style={{ 
          marginBottom: '20px', 
          color: '#1a202c',
          fontSize: '20px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <FaClipboardList style={{ fontSize: '22px', color: '#667eea' }} />
          Recent Stock Out Movements
        </h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Reason</th>
                <th>Reference</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
              {recentMovements.map((movement) => (
                <tr key={movement._id}>
                  <td>{new Date(movement.date || movement.createdAt).toLocaleDateString()}</td>
                  <td>{movement.inventoryId?.name}</td>
                  <td>{movement.inventoryId?.sku}</td>
                  <td><span className="badge badge-danger">-{movement.quantity}</span></td>
                  <td>{movement.reason}</td>
                  <td>{movement.reference || '-'}</td>
                  <td>{movement.performedBy?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StockOut;
