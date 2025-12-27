import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import StockIn from './pages/StockIn';
import StockOut from './pages/StockOut';
import Damage from './pages/Damage';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/inventory" element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        } />
        
        <Route path="/stock-in" element={
          <ProtectedRoute>
            <StockIn />
          </ProtectedRoute>
        } />
        
        <Route path="/stock-out" element={
          <ProtectedRoute>
            <StockOut />
          </ProtectedRoute>
        } />
        
        <Route path="/damage" element={
          <ProtectedRoute>
            <Damage />
          </ProtectedRoute>
        } />
        
        <Route path="/reports" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
