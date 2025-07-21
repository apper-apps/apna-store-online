import { useState, useEffect } from "react";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("rl-apna-store-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (items) => {
    localStorage.setItem("rl-apna-store-cart", JSON.stringify(items));
    setCartItems(items);
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.productId === product.Id);
    
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.productId === product.Id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      saveCart(updatedItems);
    } else {
      const newItem = {
        productId: product.Id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      };
      saveCart([...cartItems, newItem]);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedItems = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    );
    saveCart(updatedItems);
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.productId !== productId);
    saveCart(updatedItems);
  };

  const clearCart = () => {
    localStorage.removeItem("rl-apna-store-cart");
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount
  };
};