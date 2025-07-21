import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getById(productId);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} item(s) added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    // Navigate to cart or checkout
    window.location.href = "/cart";
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-pulse">
            <div className="w-full h-96 bg-gray-200 rounded-lg shimmer"></div>
          </div>
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded shimmer"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 shimmer"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2 shimmer"></div>
            <div className="h-32 bg-gray-200 rounded shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadProduct} />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const discountPercent = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
        <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
          {product.category}
        </Link>
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
        <span className="text-secondary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
          </Card>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Title and Brand */}
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600">by {product.brand}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon
                    key={i}
                    name="Star"
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-warning fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-secondary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <Badge variant="error" size="md">
                  {discountPercent}% OFF
                </Badge>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div>
            {product.inStock ? (
              <Badge variant="success" size="md">
                <ApperIcon name="Check" className="w-4 h-4 mr-1" />
                In Stock
              </Badge>
            ) : (
              <Badge variant="error" size="md">
                <ApperIcon name="X" className="w-4 h-4 mr-1" />
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          {product.inStock && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 rounded-l-lg"
                  >
                    <ApperIcon name="Minus" className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-center flex-1">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-r-lg"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  size="lg"
                  className="flex-1"
                >
                  <ApperIcon name="Zap" className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
              </div>
            </div>
          )}

          {/* Delivery Info */}
          <Card className="p-4 bg-gray-50">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ApperIcon name="Truck" className="w-5 h-5 text-success" />
                <span className="text-sm">Free delivery on orders above ₹499</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="RotateCcw" className="w-5 h-5 text-info" />
                <span className="text-sm">7-day return policy</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Shield" className="w-5 h-5 text-warning" />
                <span className="text-sm">1-year warranty included</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;