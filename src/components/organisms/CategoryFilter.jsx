import React from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  brands,
  selectedBrands,
  onBrandsChange,
  sizes,
  selectedSizes,
  onSizesChange,
  colors,
  selectedColors,
  onColorsChange,
  selectedRating,
  onRatingChange,
  isOpen,
  onClose 
}) => {
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" }
  ];

const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-secondary mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === "all" 
                ? "bg-primary text-white" 
                : "hover:bg-gray-100"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                selectedCategory === category 
                  ? "bg-primary text-white" 
                  : "hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-secondary mb-3">Price Range</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100000"
              step="500"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min="0"
              max="100000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-semibold text-secondary mb-3">Brand</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => onBrandsChange(brands)}
              className="text-xs text-primary hover:underline"
            >
              Select All
            </button>
            <button
              onClick={() => onBrandsChange([])}
              className="text-xs text-gray-500 hover:underline"
            >
              Clear
            </button>
          </div>
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onBrandsChange([...selectedBrands, brand]);
                  } else {
                    onBrandsChange(selectedBrands.filter(b => b !== brand));
                  }
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="font-semibold text-secondary mb-3">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                if (selectedSizes.includes(size)) {
                  onSizesChange(selectedSizes.filter(s => s !== size));
                } else {
                  onSizesChange([...selectedSizes, size]);
                }
              }}
              className={`p-2 border rounded-lg text-sm transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 hover:border-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="font-semibold text-secondary mb-3">Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                if (selectedColors.includes(color)) {
                  onColorsChange(selectedColors.filter(c => c !== color));
                } else {
                  onColorsChange([...selectedColors, color]);
                }
              }}
              className={`relative p-1 rounded-lg border transition-colors ${
                selectedColors.includes(color)
                  ? "border-primary ring-2 ring-primary ring-opacity-30"
                  : "border-gray-300"
              }`}
            >
              <div 
                className="w-8 h-8 rounded-md border border-gray-200"
                style={{ backgroundColor: color.toLowerCase() }}
              />
              {selectedColors.includes(color) && (
                <ApperIcon name="Check" className="absolute top-1 right-1 w-3 h-3 text-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold text-secondary mb-3">Customer Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => onRatingChange(rating)}
                className="text-primary focus:ring-primary"
              />
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <ApperIcon
                    key={i}
                    name="Star"
                    className={`w-4 h-4 ${
                      i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600">& above</span>
              </div>
            </label>
          ))}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={selectedRating === 0}
              onChange={() => onRatingChange(0)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm">All Ratings</span>
          </label>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-semibold text-secondary mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden lg:block">
        <Card className="p-6 sticky top-24">
          <FilterContent />
        </Card>
      </div>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto h-full pb-20">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilter;