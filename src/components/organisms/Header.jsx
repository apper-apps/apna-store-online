import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const cartItemCount = getCartItemCount();

  const categories = [
    { name: "Clothing", icon: "Shirt" },
    { name: "Electronics", icon: "Smartphone" },
    { name: "Groceries", icon: "Apple" },
    { name: "Footwear", icon: "Footprints" },
    { name: "Home", icon: "Home" },
    { name: "Sports", icon: "Dumbbell" }
  ];

  return (
    <>
      {/* Main Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Store" className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gradient-text">RL Apna Store</h1>
                <p className="text-xs text-gray-600">Shop with Confidence</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center gap-4">
              {/* Search Icon - Mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => navigate("/search")}
              >
                <ApperIcon name="Search" className="w-5 h-5" />
              </Button>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm">
                  <ApperIcon name="ShoppingCart" className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <Badge 
                      variant="error" 
                      size="sm" 
                      className="absolute -top-1 -right-1 min-w-[20px] h-5"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Orders */}
              <Link to="/orders">
                <Button variant="ghost" size="sm">
                  <ApperIcon name="Package" className="w-5 h-5" />
                  <span className="hidden sm:inline ml-2">Orders</span>
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Categories Bar - Desktop */}
      <div className="hidden lg:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 py-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
              >
                <ApperIcon name={category.icon} className="w-4 h-4" />
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-white border-b border-gray-200 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/category/${category.name.toLowerCase()}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                    <ApperIcon name={category.icon} className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-secondary">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;