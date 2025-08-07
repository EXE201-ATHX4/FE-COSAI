import axios from 'axios';

const API_BASE_URL = 'https://be-cosai.onrender.com/api/order';

const orderService = {
  // Lấy danh sách đơn hàng với phân trang
  getOrders: async (pageNumber = 1, pageSize = 10, sortOrder = 'desc') => {
    try {
      const response = await axios.get(`${API_BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`, {
        headers: {
          'accept': 'text/plain'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  },

  // Lấy thống kê (monthlyRevenue, weeklyRevenue, lowStockProducts)
  getOrderStatistics: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/statistics`, {
        headers: {
          'accept': 'text/plain'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order statistics');
    }
  }
};

export default orderService;