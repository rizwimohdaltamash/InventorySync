import { useState, useEffect } from 'react';
import { stockAPI, productsAPI, dashboardAPI } from '../services/api';
import { FaFileDownload, FaChartBar, FaFilter, FaRedo } from 'react-icons/fa';

function Reports() {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [topSKUs, setTopSKUs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    inventoryId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [movementsRes, productsRes, topSKUsRes] = await Promise.all([
        stockAPI.getAll({}),
        productsAPI.getAll(),
        dashboardAPI.getTopSKUs()
      ]);

      setMovements(movementsRes.data);
      
      setProducts(productsRes.data);
      setTopSKUs(topSKUsRes.data);
    } catch (error) {
      console.error('Failed to fetch reports data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const response = await stockAPI.getAll(filters);
      setMovements(response.data);
    } catch (error) {
      console.error('Failed to apply filters', error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = async () => {
    setFilters({
      type: '',
      inventoryId: '',
      startDate: '',
      endDate: ''
    });
    setLoading(true);
    try {
      const response = await stockAPI.getAll({});
      setMovements(response.data);
    } catch (error) {
      console.error('Failed to reset filters', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Product', 'SKU', 'Quantity', 'Reason', 'Reference', 'Previous Stock', 'New Stock', 'Performed By'];
    const rows = movements.map(m => [
      new Date(m.date || m.createdAt).toLocaleString(),
      m.type.toUpperCase(),
      m.inventoryId?.name || '',
      m.inventoryId?.sku || '',
      m.quantity,
      m.reason,
      m.reference || '',
      m.previousStock,
      m.newStock,
      m.performedBy?.name || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">
          <div className="spinner"></div>
          Loading reports...
        </div>
      </div>
    );
  }

  const totalIn = movements.filter(m => m.type === 'in').reduce((sum, m) => sum + m.quantity, 0);
  const totalOut = movements.filter(m => m.type === 'out').reduce((sum, m) => sum + m.quantity, 0);
  const totalDamage = movements.filter(m => m.type === 'damage').reduce((sum, m) => sum + m.quantity, 0);

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a202c' }}>
          <FaChartBar style={{ fontSize: '32px', color: '#667eea' }} />
          Reports & Analytics
        </h1>
        <p>Detailed inventory movement reports and SKU performance</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{
          borderLeft: '5px solid #26de81',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          background: '#fff'
        }}>
          <div className="stat-label">Total Stock In</div>
          <div className="stat-value" style={{ color: '#26de81' }}>{totalIn}</div>
        </div>

        <div className="stat-card" style={{
          borderLeft: '5px solid #667eea',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          background: '#fff'
        }}>
          <div className="stat-label">Total Stock Out</div>
          <div className="stat-value" style={{ color: '#667eea' }}>{totalOut}</div>
        </div>

        <div className="stat-card" style={{
          borderLeft: '5px solid #f5576c',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          background: '#fff'
        }}>
          <div className="stat-label">Total Damaged</div>
          <div className="stat-value" style={{ color: '#f5576c' }}>{totalDamage}</div>
        </div>

        <div className="stat-card" style={{
          borderLeft: '5px solid #00d4ff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          background: '#fff'
        }}>
          <div className="stat-label">Total Movements</div>
          <div className="stat-value" style={{ color: '#00d4ff' }}>{movements.length}</div>
        </div>
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
          <FaChartBar style={{ fontSize: '22px', color: '#667eea' }} />
          SKU Performance Analysis
        </h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Total Sales</th>
                <th>Movement Count</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {topSKUs.map((item, index) => (
                <tr key={item._id}>
                  <td><strong>#{index + 1}</strong></td>
                  <td>{item.sku}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td><span className="badge badge-success">{item.totalQuantity}</span></td>
                  <td>{item.movements}</td>
                  <td>
                    <span className={`badge ${
                      item.totalQuantity > 15 ? 'badge-success' : 
                      item.totalQuantity >= 10 ? 'badge-info' : 
                      'badge-warning'
                    }`}>
                      {item.totalQuantity > 15 ? 'Excellent' : item.totalQuantity >= 10 ? 'Good' : 'Poor'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <FaChartBar style={{ fontSize: '22px', color: '#667eea' }} />
          Stock Movement History
        </h3>
        
        <div className="form-row" style={{ marginBottom: '20px' }}>
          <div className="form-group">
            <label>Movement Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="in">Stock In</option>
              <option value="out">Stock Out</option>
              <option value="damage">Damage</option>
            </select>
          </div>

          <div className="form-group">
            <label>Product</label>
            <select name="inventoryId" value={filters.inventoryId} onChange={handleFilterChange}>
              <option value="">All Products</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.sku} - {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  {/* LEFT SIDE - Apply Filters */}
  <div>
    <button
      onClick={applyFilters}
      className="btn btn-primary btn-sm"
      style={{
        fontSize: "12px",
        padding: "6px 12px",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <FaFilter />
      Apply Filters
    </button>
  </div>

  {/* RIGHT SIDE - Reset & Export */}
  <div style={{ display: "flex", gap: "8px" }}>
    <button
      onClick={resetFilters}
      className="btn btn-secondary btn-sm"
      style={{
        fontSize: "12px",
        padding: "6px 12px",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <FaRedo />
      Reset
    </button>

    <button
      onClick={exportToCSV}
      className="btn btn-success btn-sm"
      style={{
        fontSize: "12px",
        padding: "6px 12px",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <FaFileDownload />
      Export CSV
    </button>
  </div>
</div>


        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Reason</th>
                <th>Reference</th>
                <th>Previous Stock</th>
                <th>New Stock</th>
                <th>By</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((movement) => (
                <tr key={movement._id}>
                  <td>{new Date(movement.date || movement.createdAt).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${
                      movement.type === 'in' ? 'badge-success' :
                      movement.type === 'out' ? 'badge-info' :
                      'badge-warning'
                    }`}>
                      {movement.type.toUpperCase()}
                    </span>
                  </td>
                  <td>{movement.inventoryId?.name}</td>
                  <td><strong>{movement.inventoryId?.sku}</strong></td>
                  <td>
                    {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                  </td>
                  <td>{movement.reason}</td>
                  <td>{movement.reference || '-'}</td>
                  <td>{movement.previousStock}</td>
                  <td><strong>{movement.newStock}</strong></td>
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

export default Reports;
