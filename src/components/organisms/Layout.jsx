import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Layout = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      
      {/* Privacy Notice */}
      <div className="bg-background border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start space-x-3 text-secondary">
            <ApperIcon name="Shield" size={16} className="mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-xs sm:text-sm leading-relaxed">
              We respect your privacy. Your contact and order details are kept confidential and never shared with third parties. We use your data only to fulfill orders and communicate important updates.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />

      {/* Live Chat Widget */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Chat Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 rounded-full bg-primary hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          >
            <ApperIcon 
              name={isChatOpen ? "X" : "MessageCircle"} 
              className="w-6 h-6 text-white" 
            />
          </Button>
        </motion.div>

        {/* Chat Interface */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <ApperIcon name="Headphones" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Live Support</h3>
                      <p className="text-xs opacity-90">We're here to help!</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 h-64 overflow-y-auto bg-gray-50">
                <div className="space-y-3">
                  {/* Welcome Message */}
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="Bot" className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm max-w-[85%]">
                      <p className="text-sm text-secondary">
                        👋 Hello! Welcome to RL Apna Store. How can I help you today?
                      </p>
                      <span className="text-xs text-gray-500 mt-1 block">Just now</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 font-medium">Quick Actions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { icon: "Package", text: "Track my order", action: "track" },
                        { icon: "RefreshCw", text: "Return/Exchange", action: "return" },
                        { icon: "CreditCard", text: "Payment issue", action: "payment" },
                        { icon: "HelpCircle", text: "Product inquiry", action: "product" }
                      ].map((item) => (
                        <button
                          key={item.action}
                          className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors text-left"
                          onClick={() => {/* Handle quick action */}}
                        >
                          <ApperIcon name={item.icon} className="w-4 h-4 text-primary" />
                          <span className="text-sm text-secondary">{item.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  <Button size="sm" className="px-3 py-2">
                    <ApperIcon name="Send" className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Typically replies instantly
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Layout;