import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CategoryCard = ({ category, icon, image, productCount }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={`/category/${category.toLowerCase()}`}>
        <Card hover className="overflow-hidden text-center p-6">
          {image ? (
            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={category}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <ApperIcon name={icon} className="w-8 h-8 text-white" />
            </div>
          )}
          
          <h3 className="font-semibold text-secondary mb-1 capitalize">
            {category}
          </h3>
          
          {productCount && (
            <p className="text-sm text-gray-600">
              {productCount} products
            </p>
          )}
        </Card>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;