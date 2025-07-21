import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Cart from "@/components/pages/Cart";
import Home from "@/components/pages/Home";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { productService } from "@/services/api/productService";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
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

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const handleImageClick = () => {
    setIsZoomModalOpen(true);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (zoomLevel > 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * (zoomLevel - 1) * -100;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * (zoomLevel - 1) * -100;
      setZoomPosition({ x, y });
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const navigateImage = (direction) => {
    const images = product?.images || [product?.image];
    if (direction === 'prev') {
      setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    } else {
      setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    }
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
        {/* Product Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Main Image */}
          <Card className="overflow-hidden cursor-zoom-in" onClick={handleImageClick}>
            <img
              src={product.images?.[selectedImageIndex] || product.image}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </Card>
          
          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? 'border-primary shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
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

      {/* Customer Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12"
      >
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary mb-4">Customer Reviews</h2>
            
            {/* Review Summary */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-secondary mb-2">{product.rating}</div>
                <div className="flex items-center justify-center md:justify-start mb-2">
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
                <div className="text-gray-600">Based on {product.reviews} reviews</div>
              </div>
              
              {/* Rating Breakdown */}
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const percentage = Math.max(10, Math.random() * 60 + (6 - stars) * 5);
                  return (
                    <div key={stars} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-2">{stars}</span>
                      <ApperIcon name="Star" className="w-3 h-3 text-warning fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-warning h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{Math.round(percentage)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter Options */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="outline" size="sm">
                All Reviews
              </Button>
              <Button variant="outline" size="sm">
                5 Stars
              </Button>
              <Button variant="outline" size="sm">
                4 Stars
              </Button>
              <Button variant="outline" size="sm">
                3 Stars & Below
              </Button>
              <Button variant="outline" size="sm">
                With Photos
              </Button>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {product.customerReviews && product.customerReviews.slice(0, 5).map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  {/* Reviewer Avatar */}
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {review.reviewer.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1">
                    {/* Reviewer Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-secondary">{review.reviewer}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <ApperIcon
                                key={i}
                                name="Star"
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-warning fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                      </div>
                      <Badge variant="success" size="sm">
                        <ApperIcon name="Check" className="w-3 h-3 mr-1" />
                        Verified Purchase
                      </Badge>
                    </div>

                    {/* Review Content */}
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {review.reviewText}
                    </p>

                    {/* Review Images (if any) */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image}
                            alt={`Review image ${imgIndex + 1}`}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    )}

                    {/* Review Actions */}
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-secondary transition-colors">
                        <ApperIcon name="ThumbsUp" className="w-4 h-4" />
                        Helpful ({review.helpful})
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-secondary transition-colors">
                        <ApperIcon name="MessageCircle" className="w-4 h-4" />
                        Reply
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-secondary transition-colors">
                        <ApperIcon name="Flag" className="w-4 h-4" />
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Reviews */}
          {product.customerReviews && product.customerReviews.length > 5 && (
            <div className="text-center mt-6">
              <Button variant="outline" size="lg">
                Load More Reviews
              </Button>
            </div>
          )}

          {/* Write Review Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <ApperIcon name="Edit3" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-3">Share your experience with this product</p>
              <Button variant="outline">
                Write a Review
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Zoom Modal */}
      {isZoomModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
            >
              <ApperIcon name="X" className="w-6 h-6 text-white" />
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 rounded-full p-2 transition-all"
              >
                <ApperIcon name="ZoomOut" className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleZoomReset}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 rounded-full p-2 transition-all"
              >
                <ApperIcon name="ZoomIn" className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Navigation Arrows */}
            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all"
                >
                  <ApperIcon name="ChevronLeft" className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all"
                >
                  <ApperIcon name="ChevronRight" className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Zoomable Image */}
            <div
              className="relative overflow-hidden max-w-full max-h-full cursor-move"
              onMouseMove={handleMouseMove}
              onWheel={handleWheel}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.images?.[selectedImageIndex] || product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                style={{
                  transform: `scale(${zoomLevel}) translate(${zoomPosition.x}px, ${zoomPosition.y}px)`,
                }}
                draggable={false}
              />
            </div>

            {/* Image Counter */}
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <span className="text-white text-sm">
                  {selectedImageIndex + 1} / {product.images.length}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetail;