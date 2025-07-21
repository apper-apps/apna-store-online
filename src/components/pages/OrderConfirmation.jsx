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

const OrderConfirmation = () => {
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Error message={error} onRetry={loadOrder} />
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-success to-info rounded-full flex items-center justify-center">
          <ApperIcon name="CheckCircle" className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-secondary mb-2">
          Order Confirmed!
        </h1>
        
        <p className="text-lg text-gray-600 mb-4">
          Thank you for your order. We've received your payment and will process your order shortly.
        </p>
        
        <Badge variant="success" size="lg">
          Order ID: {order.orderId}
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Order Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-lg text-secondary">
                  ₹{order.total.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <Badge variant="success">Paid</Badge>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Order Status</span>
                <Badge variant="info">{order.status}</Badge>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium">
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Shipping Address */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Shipping Address
            </h2>
            
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>{order.shippingAddress.pincode}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Ordered Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8"
      >
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-secondary mb-4">
            Items Ordered ({order.items.length})
          </h2>
          
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-medium text-secondary">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ₹{item.price.toLocaleString()} each
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-secondary">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to={`/track-order/${order.orderId}`}>
          <Button size="lg" className="w-full sm:w-auto">
            <ApperIcon name="Truck" className="w-5 h-5 mr-2" />
            Track Order
          </Button>
        </Link>
        
        <Link to="/orders">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <ApperIcon name="Package" className="w-5 h-5 mr-2" />
            View All Orders
          </Button>
        </Link>
        
        <Link to="/">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto">
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12"
      >
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="text-lg font-semibold text-secondary mb-4">
            What happens next?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="Package" className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium mb-2">Order Processing</h4>
              <p className="text-sm text-gray-600">
                We'll prepare your items for shipment within 24 hours
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="Truck" className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium mb-2">Shipping</h4>
              <p className="text-sm text-gray-600">
                Your order will be shipped and you'll receive tracking info
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="Home" className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium mb-2">Delivery</h4>
              <p className="text-sm text-gray-600">
                Your items will be delivered to your doorstep
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;