import ordersData from "@/services/mockData/orders.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let orders = [...ordersData];

export const orderService = {
  async create(orderData) {
    await delay(500);
    const newOrder = {
      Id: Math.max(...orders.map(o => o.Id), 0) + 1,
      orderId: `RL${Date.now()}`,
      items: orderData.items,
      total: orderData.total,
      status: "placed",
      shippingAddress: orderData.shippingAddress,
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    orders.push(newOrder);
    return { ...newOrder };
  },

  async getById(id) {
    await delay(300);
    const order = orders.find(o => o.Id === parseInt(id) || o.orderId === id);
    if (!order) {
      throw new Error("Order not found");
    }
    return { ...order };
  },

  async getAll() {
    await delay(400);
    return orders.map(o => ({ ...o })).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  },

  async updateStatus(orderId, status) {
    await delay(300);
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex === -1) {
      throw new Error("Order not found");
    }
    
    orders[orderIndex] = { ...orders[orderIndex], status };
    return { ...orders[orderIndex] };
  }
};