import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ProductGrid from "@/components/organisms/ProductGrid";
import CategoryFilter from "@/components/organisms/CategoryFilter";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(categoryName || "all");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

useEffect(() => {
    loadProducts();
    loadCategories();
    loadFilterOptions();
  }, [categoryName]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategory, priceRange, sortBy, selectedBrands, selectedSizes, selectedColors, selectedRating]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = categoryName && categoryName !== "all" 
        ? await productService.getByCategory(categoryName)
        : await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

const loadCategories = async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const [brandsData, sizesData, colorsData] = await Promise.all([
        productService.getBrands(),
        productService.getSizes(),
        productService.getColors()
      ]);
      setBrands(brandsData);
      setSizes(sizesData);
      setColors(colorsData);
    } catch (err) {
      console.error("Failed to load filter options:", err);
    }
  };

const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes && product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors && product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(product =>
        product.rating >= selectedRating
      );
    }

    // Sort
    switch (sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.Id - a.Id);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary capitalize mb-2">
          {categoryName ? categoryName.replace("-", " ") : "All Products"}
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(true)}
          className="w-full"
        >
          <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
          Filters & Sort
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
<CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            brands={brands}
            selectedBrands={selectedBrands}
            onBrandsChange={setSelectedBrands}
            sizes={sizes}
            selectedSizes={selectedSizes}
            onSizesChange={setSelectedSizes}
            colors={colors}
            selectedColors={selectedColors}
            onColorsChange={setSelectedColors}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid 
            products={filteredProducts}
            loading={loading}
            error={error}
            onRetry={loadProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;