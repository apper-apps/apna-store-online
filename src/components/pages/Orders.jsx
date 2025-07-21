import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { orderService } from "@/services/api/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "placed":
        return "info";
      case "processing":
        return "warning";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "placed":
        return "Clock";
      case "processing":
        return "Package";
      case "shipped":
        return "Truck";
      case "delivered":
        return "CheckCircle";
      case "cancelled":
        return "XCircle";
      default:
        return "Package";
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadOrders} />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Empty 
          title="No orders found"
          message="You haven't placed any orders yet. Start shopping to see your orders here."
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <motion.div
            key={order.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              {/* Order Header */}
              <div className="p-6 bg-gray-50 border-b">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-secondary">
                        Order #{order.orderId}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <Badge 
                      variant={getStatusColor(order.status)}
                      size="md"
                      className="w-fit"
                    >
                      <ApperIcon 
                        name={getStatusIcon(order.status)} 
                        className="w-4 h-4 mr-1" 
                      />
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row gap-2">
                    <Link to={`/track-order/${order.orderId}`}>
                      <Button variant="outline" size="sm" className="w-full lg:w-auto">
                        <ApperIcon name="Truck" className="w-4 h-4 mr-2" />
                        Track Order
                      </Button>
                    </Link>
                    
                    <Link to={`/order-confirmation/${order.orderId}`}>
                      <Button variant="ghost" size="sm" className="w-full lg:w-auto">
                        <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-secondary">
                    Items ({order.items.length})
                  </h4>
                  <span className="text-lg font-bold text-secondary">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.slice(0, 3).map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">
                        +{order.items.length - 3} more items
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Delivery Info */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ApperIcon name="MapPin" className="w-4 h-4" />
                    <span>
                      Delivering to {order.shippingAddress.city}, {order.shippingAddress.state}
                    </span>
                  </div>
                  
                  {order.estimatedDelivery && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      <span>
                        Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="mt-12 text-center">
        <Link to="/">
          <Button size="lg">
            <ApperIcon name="ShoppingBag" className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Orders;