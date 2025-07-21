import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
const Footer = () => {
  return (
    <>
      {/* Why Choose Us Section */}
      <section className="bg-background py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best online shopping with our commitment to quality, service, and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 7-Day Easy Returns */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="RotateCcw" className="w-8 h-8 text-white" />
</div>
              <h3 className="text-lg font-semibold text-secondary mb-2">7-Day Easy Returns</h3>
              <p className="text-gray-600 text-sm">
                Easy returns within 7 days for damaged, defective, or wrong products. Items must be unused, in original packaging, with proof of purchase. Return shipping cost borne by buyer unless product was incorrect or defective.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Headphones" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock customer support ready to help you with any queries or concerns.
              </p>
            </div>

            {/* 100% Quality Products */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Shield" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">100% Quality Products</h3>
              <p className="text-gray-600 text-sm">
                Authentic products from trusted brands. Every item is quality-checked before dispatch.
              </p>
            </div>

            {/* Fast Delivery */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Truck" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Quick and secure delivery to your doorstep. Track your order in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white">
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
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">
                  +91-9876543210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="MessageCircle" className="w-4 h-4 text-primary" />
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Mail" className="w-4 h-4 text-primary" />
                <a href="mailto:rl.apnastore@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  rl.apnastore@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="MapPin" className="w-4 h-4 text-primary" />
                <span className="text-gray-300">Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Instagram" className="w-4 h-4 text-primary" />
                <a href="https://instagram.com/rlapnastore" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  instagram.com/rlapnastore
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Facebook" className="w-4 h-4 text-primary" />
                <a href="https://facebook.com/rlapnastore" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  facebook.com/rlapnastore
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Send" className="w-4 h-4 text-primary" />
                <a href="https://t.me/rlapnastore" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  t.me/rlapnastore
                </a>
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
              <a href="https://facebook.com/rlapnastore" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/rlapnastore" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
              <a href="https://t.me/rlapnastore" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <ApperIcon name="Send" className="w-5 h-5" />
              </a>
            </div>
          </div>
</div>
      </div>
    </footer>
    </>
  );
};

export default Footer;