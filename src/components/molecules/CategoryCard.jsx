import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

export default function CategoryCard({ category, icon, image, ...props }) {
  // Early return if category is not provided
  if (!category) {
    return null;
  }

  // Ensure category is a string and provide fallback
  const categoryName = typeof category === 'string' ? category : String(category || 'category');
  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
  const iconName = icon || 'Package';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={`/category/${categorySlug}`}>
        <Card hover className="overflow-hidden text-center p-6">
          <div className="mb-4">
            {image ? (
              <img
                src={image}
                alt={categoryName}
                className="w-full h-32 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <ApperIcon name={iconName} className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
<h3 className="font-medium text-gray-900">{categoryName}</h3>
        </Card>
      </Link>
    </motion.div>
  );
}