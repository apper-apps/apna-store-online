import React from "react";
import { Link } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No products found",
  message = "We couldn't find any products matching your criteria. Try adjusting your filters or browse our categories.",
  showBrowseButton = true 
}) => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Card className="p-8 text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
          <ApperIcon name="Search" className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-secondary mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {showBrowseButton && (
          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full">
                <ApperIcon name="Home" className="w-4 h-4 mr-2" />
                Browse All Products
              </Button>
            </Link>
            
            <Link to="/category/clothing">
              <Button variant="outline" className="w-full">
                <ApperIcon name="Shirt" className="w-4 h-4 mr-2" />
                View Clothing
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Empty;