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
  }
};