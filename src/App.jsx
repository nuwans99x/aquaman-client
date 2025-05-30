import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [theme, setTheme] = useState('light');
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5020/api/Product')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleCartVisibility = () => {
    setIsCartVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div className={`app ${theme}`} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="app-header" style={{ flexShrink: 0 }}>
        <h1>Aquaman Shopping Cart</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
        <div className="cart-icon" onClick={toggleCartVisibility} style={{ cursor: 'pointer' }}>
          <span role="img" aria-label="cart">🛒</span>
          <span className="cart-count">{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
        </div>
      </header>
      <main style={{ flexGrow: 1, overflow: 'auto' }}>
        <ProductList products={products} onAddToCart={handleAddToCart} />
        {isCartVisible && (
          <ShoppingCart
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            isVisible={isCartVisible}
          />
        )}
      </main>
    </div>
  );
}

export default App;