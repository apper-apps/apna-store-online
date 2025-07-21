import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "@/components/molecules/SearchBar";
import ProductGrid from "@/components/organisms/ProductGrid";
import CategoryFilter from "@/components/organisms/CategoryFilter";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query) {
      searchProducts();
    }
    loadCategories();
  }, [query]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategory, priceRange, sortBy]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.search(query);
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
      {/* Search Header */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto mb-6">
          <SearchBar />
        </div>
        
        {query && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-2">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>
        )}
      </div>

      {query ? (
        <>
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
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>

            {/* Results */}
            <div className="flex-1">
              <ProductGrid 
                products={filteredProducts}
                loading={loading}
                error={error}
                onRetry={searchProducts}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <ApperIcon name="Search" className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-secondary mb-2">
            Search for Products
          </h2>
          <p className="text-gray-600">
            Enter a search term to find products across all categories
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;