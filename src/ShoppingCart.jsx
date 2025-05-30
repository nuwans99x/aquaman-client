import React, { useState } from 'react';
import './ShoppingCart.css';

// Simple Modal component
const Modal = ({ children, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      {children}
      <button className="modal-close" onClick={onClose}>Close</button>
    </div>
  </div>
);

const ShoppingCart = ({ cartItems, onRemoveFromCart, onUpdateQuantity, isVisible }) => {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOrder = () => {
    setIsOrderConfirmed(true);
  };

  return (
    <div className={`shopping-cart ${isVisible ? 'visible' : ''}`}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                />
                <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${calculateTotal()}</h3>
      <button onClick={handleOrder} className="order-button">Place Order</button>

      {isOrderConfirmed && (
        <Modal onClose={() => setIsOrderConfirmed(false)}>
          <p>Your order has been confirmed!</p>
        </Modal>
      )}
    </div>
  );
};

export default ShoppingCart;