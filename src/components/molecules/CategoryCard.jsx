import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CategoryCard = ({ category = '', icon = 'package', image, productCount }) => {
  // Ensure category is valid for URL generation
  const categorySlug = category?.toLowerCase() || 'unknown';
  const displayCategory = category || 'Category';
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={`/category/${categorySlug}`}>
        <Card hover className="overflow-hidden text-center p-6">
          {image ? (
            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={displayCategory}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <ApperIcon name={icon} className="w-8 h-8 text-white" />
            </div>
          )}
          
          <h3 className="font-semibold text-secondary mb-1 capitalize">
            {displayCategory}
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

// PropTypes for development validation (uncomment when prop-types is available)
// CategoryCard.propTypes = {
//   category: PropTypes.string,
//   icon: PropTypes.string,
//   image: PropTypes.string,
//   productCount: PropTypes.number
// };

export default CategoryCard;