import React from "react";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.productId, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      <Link to={`/product/${item.productId}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link 
          to={`/product/${item.productId}`}
          className="font-medium text-secondary hover:text-primary line-clamp-2"
        >
          {item.name}
        </Link>
        
        <div className="text-lg font-bold text-secondary mt-1">
          ₹{(item.price * item.quantity).toLocaleString()}
        </div>
        
        <div className="text-sm text-gray-600">
          ₹{item.price.toLocaleString()} each
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 hover:bg-gray-100 rounded-l-lg"
          >
            <ApperIcon name="Minus" className="w-4 h-4" />
          </button>
          
          <span className="px-3 py-2 min-w-[50px] text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-gray-100 rounded-r-lg"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
          </button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromCart(item.productId)}
          className="text-error hover:bg-error/10"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;