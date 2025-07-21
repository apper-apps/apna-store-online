import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProductGrid from "@/components/organisms/ProductGrid";
import Category from "@/components/pages/Category";
import CategoryCard from "@/components/molecules/CategoryCard";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { productService } from "@/services/api/productService";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { name: "Clothing", icon: "Shirt", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop" },
    { name: "Electronics", icon: "Smartphone", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop" },
    { name: "Groceries", icon: "Apple", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop" },
    { name: "Footwear", icon: "Footprints", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop" },
    { name: "Home", icon: "Home", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" },
    { name: "Sports", icon: "Dumbbell", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop" }
  ];

  const offers = [
    {
      title: "Mega Sale",
      subtitle: "Up to 70% Off",
      description: "On Fashion & Electronics",
      bg: "from-primary to-accent",
      icon: "Percent"
    },
    {
      title: "Free Delivery",
      subtitle: "On Orders Above ₹499",
      description: "Shop without worry",
      bg: "from-success to-info",
      icon: "Truck"
    },
    {
      title: "New Arrivals",
      subtitle: "Fresh Collection",
      description: "Latest trends in fashion",
      bg: "from-warning to-error",
      icon: "Sparkles"
    }
  ];

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const products = await productService.getFeatured();
      setFeaturedProducts(products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
Welcome to <span className="text-yellow-200">RL Apna Store</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your one-stop destination for quality products at unbeatable prices
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/category/all">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <ApperIcon name="ShoppingBag" className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Offers Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`bg-gradient-to-r ${offer.bg} text-white p-6 hover:scale-105 transition-transform`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                      <p className="text-lg font-semibold mb-1">{offer.subtitle}</p>
                      <p className="text-sm opacity-90">{offer.description}</p>
                    </div>
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <ApperIcon name={offer.icon} className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked products just for you</p>
            </div>
            <Link to="/category/clothing">
              <Button variant="outline">
                View All
                <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            loading={loading} 
            error={error} 
            onRetry={loadFeaturedProducts}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;