import React from 'react';
import { useCart } from '../context/CartContext';
import Button from './Button';
import './CartSidebar.css';

const CartSidebar = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
      
      {/* Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is currently empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <button 
                  className="remove-item" 
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${cartTotal}</span>
          </div>
          <Button 
            to="/booking" 
            variant="primary" 
            className="btn-checkout"
            onClick={() => setIsCartOpen(false)}
          >
            Proceed to Book
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
