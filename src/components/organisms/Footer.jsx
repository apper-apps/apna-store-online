import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Store" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">RL Apna Store</h3>
                <p className="text-sm text-gray-300">Shop with Confidence</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted online shopping destination for quality products at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/clothing" className="text-gray-300 hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="text-gray-300 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/groceries" className="text-gray-300 hover:text-white transition-colors">
                  Groceries
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <ApperIcon name="Phone" className="w-4 h-4 text-primary" />
                <span className="text-gray-300">1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Mail" className="w-4 h-4 text-primary" />
                <span className="text-gray-300">support@rlapnastore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="MapPin" className="w-4 h-4 text-primary" />
                <span className="text-gray-300">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-300">
              © 2024 RL Apna Store. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;