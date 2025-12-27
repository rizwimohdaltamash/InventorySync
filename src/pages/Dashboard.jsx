import { useState, useEffect } from 'react';
import { dashboardAPI, productsAPI } from '../services/api';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaBoxes, FaExclamationTriangle, FaTimes, FaCheckCircle } from 'react-icons/fa';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [topSKUs, setTopSKUs] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [deadStockProducts, setDeadStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, topSKUsRes, lowStockRes, allProductsRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getTopSKUs(),
        productsAPI.getLowStock(),
        productsAPI.getAll()
      ]);

      setStats(statsRes.data);
      setTopSKUs(topSKUsRes.data);
      setLowStockProducts(lowStockRes.data);
      
      // Calculate dead stock (quantity = 0)
      const deadStock = allProductsRes.data.filter(p => p.quantity === 0 && p.status === 'active');
      setDeadStockProducts(deadStock);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">
          <div className="spinner"></div>
          Loading dashboard...
        </div>
      </div>
    );
  }

  const movementData = [
    { name: 'Stock In', value: stats?.movementTypes?.in || 0, color: '#26de81' },
    { name: 'Stock Out', value: stats?.movementTypes?.out || 0, color: '#667eea' },
    { name: 'Damage', value: stats?.movementTypes?.damage || 0, color: '#ff9f43' }
  ];

  return (
    <div className="main-content">
      <div className="page-header">
        <h4 style={{ fontSize: '28px', fontWeight: 600 }}>Dashboard</h4>
        <p>Overview of your inventory management system</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ 
          background: '#fff', 
          borderLeft: '5px solid #667eea', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease'
        }}>
          <div className="stat-label" style={{ color: '#667eea', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            <FaBoxes /> Total SKUs
          </div>
          <div className="stat-value" style={{ color: '#2c3e50', fontSize: '2.5rem' }}>{stats?.totalProducts || 0}</div>
          <div style={{ color: '#7f8c8d', fontSize: '0.9rem', marginTop: '8px' }}>Active Products: {stats?.activeProducts || 0}</div>
        </div>

        <div className="stat-card" style={{ 
          background: '#fff', 
          borderLeft: '5px solid #f5576c', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease'
        }}>
          <div className="stat-label" style={{ color: '#f5576c', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            <FaExclamationTriangle /> Low Stock Items
          </div>
          <div className="stat-value" style={{ color: '#2c3e50', fontSize: '2.5rem' }}>{lowStockProducts.length}</div>
          <div style={{ color: '#7f8c8d', fontSize: '0.9rem', marginTop: '8px' }}>Need Reorder Attention</div>
        </div>

        <div className="stat-card" style={{ 
          background: '#fff', 
          borderLeft: '5px solid #FFC107', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease'
        }}>
          <div className="stat-label" style={{ color: '#FFC107', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            <FaTimes /> Dead Stock Items
          </div>
          <div className="stat-value" style={{ color: '#2c3e50', fontSize: '2.5rem' }}>{deadStockProducts.length}</div>
          <div style={{ color: '#7f8c8d', fontSize: '0.9rem', marginTop: '8px' }}>Out of Stock</div>
        </div>

        <div className="stat-card" style={{ 
          background: '#fff', 
          borderLeft: '5px solid #26de81', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease'
        }}>
          <div className="stat-label" style={{ color: '#26de81', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
           ₹ Total Inventory Value
          </div>
          <div className="stat-value" style={{ color: '#2c3e50', fontSize: '2.5rem' }}>₹{stats?.totalValue || '0.00'}</div>
          <div style={{ color: '#7f8c8d', fontSize: '0.9rem', marginTop: '8px' }}>Current Stock Value</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08)', 
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ color: 'black', marginBottom: '20px', fontWeight: '600' }}>Stock Movement Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={movementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => {
                  // Only show label if value is greater than 0 or percentage is significant
                  if (value === 0 || percent < 0.01) return '';
                  return `${name}: ${value}`;
                }}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {movementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08)', 
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontWeight: '600' }}>Top Performing SKUs</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={topSKUs}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sku" />
              <YAxis 
                domain={[0, (dataMax) => {
                  // Get max value from both sold and stock quantities
                  const maxVal = Math.max(...topSKUs.map(item => 
                    Math.max(item.totalQuantity || 0, item.quantity || 0)
                  ));
                  
                  // If max is under 10, set to 10
                  if (maxVal <= 10) return 10;
                  
                  // Round up to nearest 10
                  return Math.ceil(maxVal / 10) * 10;
                }]}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalQuantity" fill="#667eea" name="Units Sold" barSize={40} />
              <Bar dataKey="quantity" fill="#26de81" name="Units in Stock" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08)', 
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ color: 'black', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '20px' }}>
            <FaExclamationTriangle /> Low Stock Alerts ({lowStockProducts.length})
          </h3>
          {lowStockProducts.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Reorder Level</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.slice(0, 5).map((product) => (
                    <tr key={product._id} style={{ backgroundColor: product.quantity === 0 ? '#fee' : '#fff8e1' }}>
                      <td><strong>{product.sku}</strong></td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td style={{ color: product.quantity === 0 ? '#d32f2f' : '#f57c00', fontWeight: 'bold' }}>
                        {product.quantity}
                      </td>
                      <td>{product.reorderLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {lowStockProducts.length > 5 && (
                <p style={{ textAlign: 'center', color: '#666', padding: '10px', fontSize: '0.9rem' }}>
                  + {lowStockProducts.length - 5} more items
                </p>
              )}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FaCheckCircle style={{ color: '#26de81' }} /> All products are well-stocked!
            </p>
          )}
        </div>

        <div className="card" style={{ 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08)', 
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ color: 'black', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '20px' }}>
            <FaTimes /> Dead Stock Items ({deadStockProducts.length})
          </h3>
          {deadStockProducts.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Last Movement</th>
                  </tr>
                </thead>
                <tbody>
                  {deadStockProducts.slice(0, 5).map((product) => (
                    <tr key={product._id} style={{ backgroundColor: '#f5f5f5', color: '#666' }}>
                      <td><strong>{product.sku}</strong></td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        {product.lastMovementDate ? 
                          new Date(product.lastMovementDate).toLocaleDateString() : 
                          'No movement'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {deadStockProducts.length > 5 && (
                <p style={{ textAlign: 'center', color: '#666', padding: '10px', fontSize: '0.9rem' }}>
                  + {deadStockProducts.length - 5} more items
                </p>
              )}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FaCheckCircle style={{ color: '#26de81' }} /> No out-of-stock items!
            </p>
          )}
        </div>
      </div>

      <div className="card" style={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08)', 
        transition: 'all 0.3s ease'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontWeight: '600' }}>Top 10 Best Selling Products</h3>
        {topSKUs.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>SKU</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Total Sold</th>
                  <th>Transactions</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            No sales data available yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
