import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import { orderService } from "@/services/api/orderService";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Basic validation
    const requiredFields = ["name", "phone", "address", "city", "state", "pincode"];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const total = getCartTotal();
      const deliveryFee = total >= 499 ? 0 : 50;
      const finalTotal = total + deliveryFee;
      
      const orderData = {
        items: cartItems,
        total: finalTotal,
        shippingAddress: formData
      };
      
      const order = await orderService.create(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${order.orderId}`);
      
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order error:", error);
    } finally {
      setLoading(false);
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
          
          <p className="text-gray-600 mb-8">
            Add some items to your cart before proceeding to checkout.
          </p>
          
          <Button onClick={() => navigate("/")} size="lg">
            <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>
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
        <h1 className="text-3xl font-bold text-secondary mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your order details</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-secondary mb-6">
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter your state"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <Input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter PIN code"
                    required
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-secondary mb-4">
                Order Summary
              </h2>
              
              {/* Items */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 mb-6 border-t pt-4">
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
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-secondary">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Place Order Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
              
              {/* Security Info */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ApperIcon name="Shield" className="w-4 h-4 text-success" />
                  <span>Your information is secure and encrypted</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;