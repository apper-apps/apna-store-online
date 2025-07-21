import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { orderService } from "@/services/api/orderService";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getById(orderId);
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTrackingSteps = (currentStatus) => {
    const steps = [
      {
        id: "placed",
        title: "Order Placed",
        description: "Your order has been placed successfully",
        icon: "CheckCircle",
        completed: true
      },
      {
        id: "processing",
        title: "Processing",
        description: "We're preparing your items for shipment",
        icon: "Package",
        completed: ["processing", "shipped", "delivered"].includes(currentStatus.toLowerCase())
      },
      {
        id: "shipped",
        title: "Shipped",
        description: "Your order is on its way",
        icon: "Truck",
        completed: ["shipped", "delivered"].includes(currentStatus.toLowerCase())
      },
      {
        id: "delivered",
        title: "Delivered",
        description: "Your order has been delivered",
        icon: "Home",
        completed: currentStatus.toLowerCase() === "delivered"
      }
    ];

    return steps;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadOrder} />
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const trackingSteps = getTrackingSteps(order.status);
  const currentStepIndex = trackingSteps.findIndex(step => step.id === order.status.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">
          Track Order #{order.orderId}
        </h1>
        <p className="text-gray-600">
          Placed on {new Date(order.orderDate).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Timeline */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary mb-6">
              Order Status
            </h2>
            
            <div className="space-y-6">
              {trackingSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  {/* Step Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? "bg-gradient-to-r from-success to-info text-white" 
                      : "bg-gray-200 text-gray-400"
                  }`}>
                    <ApperIcon name={step.icon} className="w-6 h-6" />
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`font-semibold ${
                        step.completed ? "text-secondary" : "text-gray-400"
                      }`}>
                        {step.title}
                      </h3>
                      {step.completed && (
                        <Badge variant="success" size="sm">
                          Completed
                        </Badge>
                      )}
                    </div>
                    
                    <p className={`text-sm ${
                      step.completed ? "text-gray-600" : "text-gray-400"
                    }`}>
                      {step.description}
                    </p>
                    
                    {step.id === order.status.toLowerCase() && (
                      <div className="mt-2">
                        <Badge variant="primary" size="sm">
                          Current Status
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  {/* Connection Line */}
                  {index < trackingSteps.length - 1 && (
                    <div className={`absolute left-6 mt-12 w-0.5 h-6 ${
                      trackingSteps[index + 1].completed 
                        ? "bg-success" 
                        : "bg-gray-200"
                    }`} style={{ marginLeft: "1.5rem" }} />
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Estimated Delivery */}
            {order.estimatedDelivery && order.status.toLowerCase() !== "delivered" && (
              <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-secondary">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Items</span>
                <span className="font-medium">{order.items.length}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-lg text-secondary">
                  ₹{order.total.toLocaleString()}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium text-secondary mb-3">
                  Shipping Address
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                  <p>{order.shippingAddress.pincode}</p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link to={`/order-confirmation/${order.orderId}`}>
                <Button variant="outline" className="w-full">
                  <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                  View Order Details
                </Button>
              </Link>
              
              <Link to="/orders">
                <Button variant="ghost" className="w-full">
                  <ApperIcon name="Package" className="w-4 h-4 mr-2" />
                  All Orders
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="mt-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-secondary mb-4">
            Items in this order ({order.items.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-secondary line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm font-medium text-secondary">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Help Section */}
      <div className="mt-8">
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="text-lg font-semibold text-secondary mb-4">
            Need Help?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <ApperIcon name="Phone" className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Call Support</p>
                <p className="text-sm text-gray-600">1800-123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ApperIcon name="Mail" className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Email Support</p>
                <p className="text-sm text-gray-600">support@rlapnastore.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ApperIcon name="MessageCircle" className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Live Chat</p>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;