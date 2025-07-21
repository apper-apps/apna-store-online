import React from "react";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import ApperIcon from "@/components/ApperIcon";
const Layout = ({ children }) => {
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
    </div>
  );
};

export default Layout;