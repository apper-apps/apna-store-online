import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async getByCategory(category) {
    await delay(300);
    return productsData.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    ).map(p => ({ ...p }));
  },

  async search(query, category = null) {
    await delay(400);
    let filtered = productsData.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );

    if (category && category !== "all") {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    return filtered.map(p => ({ ...p }));
  },

  async getFeatured() {
    await delay(250);
    return productsData
      .filter(p => p.featured)
      .slice(0, 8)
      .map(p => ({ ...p }));
  },

async getCategories() {
    await delay(200);
    const categories = [...new Set(productsData.map(p => p.category))];
    return categories;
  },

  async getBrands() {
    await delay(200);
    const brands = [...new Set(productsData.map(p => p.brand).filter(Boolean))];
    return brands.sort();
  },

  async getSizes() {
    await delay(200);
    const allSizes = productsData.flatMap(p => p.sizes || []);
    const uniqueSizes = [...new Set(allSizes)];
    // Sort sizes in logical order
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12'];
    return uniqueSizes.sort((a, b) => {
      const indexA = sizeOrder.indexOf(a);
      const indexB = sizeOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  },

  async getColors() {
    await delay(200);
    const allColors = productsData.flatMap(p => p.colors || []);
    const uniqueColors = [...new Set(allColors)];
    return uniqueColors.sort();
  },

  async applyAdvancedFilters(filters) {
    await delay(400);
    let filtered = [...productsData];

    // Category filter
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    // Brand filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(p =>
        filters.brands.includes(p.brand)
      );
    }

    // Size filter
    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes && p.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Color filter
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors && p.colors.some(color => filters.colors.includes(color))
      );
    }

    // Rating filter
    if (filters.rating && filters.rating > 0) {
      filtered = filtered.filter(p =>
        p.rating >= filters.rating
      );
    }

    // Search query
    if (filters.query) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
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
    }

    return filtered.map(p => ({ ...p }));
  }
};