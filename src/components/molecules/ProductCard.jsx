import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success("Product added to cart!");
  };

  const discountPercent = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card hover className="overflow-hidden h-full flex flex-col">
        <Link to={`/product/${product.Id}`} className="flex-1 flex flex-col">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {discountPercent > 0 && (
              <Badge 
                variant="error" 
                className="absolute top-2 left-2"
              >
                {discountPercent}% OFF
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Badge variant="error" size="md">Out of Stock</Badge>
              </div>
            )}
          </div>
          
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 flex-1">
              {product.name}
            </h3>
            
            <div className="text-sm text-gray-600 mb-2">
              {product.brand}
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                <ApperIcon name="Star" className="w-4 h-4 text-warning fill-current" />
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-secondary">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
        
        <div className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full"
            size="sm"
          >
            <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;