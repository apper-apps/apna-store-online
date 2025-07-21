import React from "react";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import CartItem from "@/components/molecules/CartItem";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast.success("Cart cleared successfully!");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <ApperIcon name="ShoppingCart" className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-secondary mb-4">
            Your cart is empty
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          
          <div className="space-y-4">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/category/clothing">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ApperIcon name="Shirt" className="w-4 h-4 mr-2" />
                  Browse Clothing
                </Button>
              </Link>
              
              <Link to="/category/electronics">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ApperIcon name="Smartphone" className="w-4 h-4 mr-2" />
                  Browse Electronics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const total = getCartTotal();
  const deliveryFee = total >= 499 ? 0 : 50;
  const finalTotal = total + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cartItems.length} items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-secondary">Items</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearCart}
              className="text-error hover:bg-error/10"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>
          
          {cartItems.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{total.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              
              {deliveryFee > 0 && (
                <p className="text-sm text-gray-500">
                  Add ₹{(499 - total).toLocaleString()} more for free delivery
                </p>
              )}
              
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-secondary">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link to="/checkout">
                <Button className="w-full" size="lg">
                  <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Shield" className="w-4 h-4 text-success" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Truck" className="w-4 h-4 text-success" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="RotateCcw" className="w-4 h-4 text-success" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;