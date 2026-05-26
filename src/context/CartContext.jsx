import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token, isLoggedIn, user } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const item = window.localStorage.getItem('rkbeauty-cart');
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  const [appointments, setAppointments] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('rkbeauty-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch appointments when user logs in
  useEffect(() => {
    if (isLoggedIn && token) {
      fetch('/api/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setAppointments(Array.isArray(data) ? data : []))
        .catch(err => console.error('Error fetching appointments:', err));
    } else {
      setAppointments([]);
    }
  }, [isLoggedIn, token]);

  const addToCart = (service) => {
    setCartItems(prev => {
      if (prev.find(item => item.id === service.id)) return prev;
      setIsCartOpen(true);
      return [...prev, service];
    });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCartItems([]);

  const addAppointment = async (appointmentData) => {
    if (!token) return { error: 'Please log in to book an appointment.' };
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });
      if (response.ok) {
        const newApp = await response.json();
        setAppointments(prev => [newApp, ...prev]);
        return { success: true, data: newApp };
      } else {
        const err = await response.json();
        return { error: err.message };
      }
    } catch (err) {
      console.error('Failed to add appointment:', err);
      return { error: 'Network error. Please try again.' };
    }
  };

  const cancelAppointment = async (id) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setAppointments(prev => prev.map(app => 
          app.id === id ? { ...app, status: 'Cancelled' } : app
        ));
      }
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
    }
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, clearCart,
      isCartOpen, setIsCartOpen, cartTotal,
      appointments, addAppointment, cancelAppointment,
    }}>
      {children}
    </CartContext.Provider>
  );
};
