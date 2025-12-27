import { useState, useEffect } from 'react';
import { productsAPI, stockAPI } from '../services/api';
import { FaExclamationTriangle, FaTimes, FaBoxes} from 'react-icons/fa';

function Damage() {
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
        stockAPI.getAll({ type: 'damage' })
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
      // Use the specific /api/stock/damage endpoint
      const response = await stockAPI.stockDamage({
        inventoryId: formData.inventoryId,
        quantity: parseInt(formData.quantity),
        reason: formData.reason,
        reference: formData.reference,
        notes: formData.notes
      });

      setSuccess(`Damage reported successfully! New quantity: ${response.data.updatedProduct.quantity}`);
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
      setError(err.response?.data?.message || 'Failed to report damage');
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
          <FaExclamationTriangle style={{ fontSize: '32px', color: '#f57c00' }} />
          Damage / Adjustment Report
        </h1>
        <p>Report damaged, defective, or lost inventory with detailed reason logging</p>
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
          <FaBoxes style={{ fontSize: '22px', color: '#f57c00' }} />
          Report Damaged Items
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
                backgroundColor: '#f57c00', 
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
                <option value="">-- Choose a product to report damage --</option>
                {products.map(product => (
                  <option key={product._id} value={product._id}>
                    {product.sku} - {product.name} (Available: {product.quantity} units)
                  </option>
                ))}
              </select>
              {products.length === 0 && (
                <p style={{ color: '#f57c00', marginTop: '10px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '5px' }}><FaExclamationTriangle /> No products with stock available</p>
              )}
            
            {/* Selected Product Display */}
            {selectedProduct && (
              <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #ddd' }}>
                <strong>Selected:</strong> {selectedProduct.name} ({selectedProduct.sku})<br/>
                <span style={{ color: '#666' }}>Available Stock: <strong style={{ color: selectedProduct.quantity <= selectedProduct.reorderLevel ? '#f57c00' : '#2e7d32' }}>{selectedProduct.quantity}</strong> units</span><br/>
                <span style={{ color: '#666' }}>Reorder Level: {selectedProduct.reorderLevel} units</span>
              </div>
            )}
            </div>
          </div>

          {/* STEP 2: Enter Quantity Damaged */}
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
                backgroundColor: '#d32f2f', 
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
              Enter Quantity Damaged / Lost
            </h4>
            <div className="form-group">
              <label style={{ fontWeight: '600' }}>Quantity Damaged *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="1"
                max={selectedProduct?.quantity || undefined}
                placeholder="Enter damaged quantity"
                style={{ fontSize: '1.2rem', padding: '12px', fontWeight: 'bold' }}
              />
              {selectedProduct && formData.quantity && (
                <div style={{ marginTop: '10px' }}>
                  {parseInt(formData.quantity) <= selectedProduct.quantity ? (
                    <div style={{ padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
                      <strong>New quantity will be:</strong> {selectedProduct.quantity} - {formData.quantity} = <strong style={{ color: '#d32f2f', fontSize: '1.2rem' }}>{selectedProduct.quantity - parseInt(formData.quantity)}</strong> units
                      {(selectedProduct.quantity - parseInt(formData.quantity)) === 0 && (
                        <div style={{ marginTop: '5px', color: '#d32f2f', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}><FaTimes /> Product will be out of stock!</div>
                      )}
                      {(selectedProduct.quantity - parseInt(formData.quantity)) > 0 && (selectedProduct.quantity - parseInt(formData.quantity)) <= selectedProduct.reorderLevel && (
                        <div style={{ marginTop: '5px', color: '#f57c00', display: 'flex', alignItems: 'center', gap: '5px' }}><FaExclamationTriangle /> Will be at/below reorder level!</div>
                      )}
                    </div>
                  ) : (
                    <div style={{ padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px', color: '#d32f2f' }}>
                      <FaTimes style={{ marginRight: '5px' }} /> Cannot report {formData.quantity} units as damaged. Only {selectedProduct.quantity} available!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: Reason for Damage */}
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
                backgroundColor: '#9e9e9e', 
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
              Reason & Details (Required)
            </h4>

          <div className="form-row">
            <div className="form-group">
              <label style={{ fontWeight: '600' }}>Damage Reason *</label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                style={{ fontSize: '1rem', padding: '12px' }}
              >
                <option value="">Select damage reason...</option>
                <option value="Physical Damage">Physical Damage</option>
                <option value="Expired">Expired / Past Best-By Date</option>
                <option value="Manufacturing Defect">Manufacturing Defect</option>
                <option value="Water Damage">Water Damage</option>
                <option value="Fire Damage">Fire Damage</option>
                <option value="Contamination">Contamination</option>
                <option value="Theft/Loss">Theft / Loss</option>
                <option value="Quality Control Failure">Quality Control Failure</option>
                <option value="Packaging Damage">Packaging Damage</option>
                <option value="Incorrect Storage">Incorrect Storage Conditions</option>
                <option value="Customer Return - Damaged">Customer Return - Damaged</option>
                <option value="Adjustment">Inventory Adjustment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontWeight: '600' }}>Reference/Report Number</label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                placeholder="Report#, Claim#, etc."
                style={{ padding: '12px' }}
              />
            </div>
          </div>

            <div className="form-group">
              <label style={{ fontWeight: '600' }}>Detailed Description *</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                required
                placeholder="Describe the damage in detail: What happened? When was it discovered? What is the condition of the items? Include any relevant photos, incident reports, or claim numbers..."
                rows="4"
                style={{ padding: '12px', fontSize: '1rem' }}
              />
              <small style={{ color: '#666', fontSize: '0.85rem' }}>Detailed notes help with insurance claims and quality control analysis</small>
            </div>
          </div>

          {/* STEP 4: Submit */}
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
                backgroundColor: '#E63946', 
                color: '#FFFFFF', 
                borderRadius: '50%', 
                width: '28px', 
                height: '28px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: '700',
                fontSize: '14px'
              }}>4</span>
              Submit Damage Report
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
              <FaExclamationTriangle />
              Report Damage & Update Inventory
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
          <FaExclamationTriangle style={{ fontSize: '22px', color: '#f57c00' }} />
          Recent Damage Reports
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
                <th>Reported By</th>
              </tr>
            </thead>
            <tbody>
              {recentMovements.map((movement) => (
                <tr key={movement._id}>
                  <td>{new Date(movement.date || movement.createdAt).toLocaleDateString()}</td>
                  <td>{movement.inventoryId?.name}</td>
                  <td>{movement.inventoryId?.sku}</td>
                  <td><span className="badge badge-warning">{movement.quantity}</span></td>
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

export default Damage;
