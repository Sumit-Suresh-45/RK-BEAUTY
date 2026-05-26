import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import MyBookings from './pages/MyBookings';
import Policies from './pages/Policies';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Protected route — redirects to /login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <div style={{ textAlign: 'center', padding: '5rem', color: '#d4af37' }}>Loading...</div>;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <CartSidebar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Protected Routes */}
              <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
              <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </main>

          {/* Sticky Mobile Booking Button */}
          <div className="mobile-only-sticky">
            <Link to="/booking" className="btn-sticky-book">Book Now 🌸</Link>
          </div>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
