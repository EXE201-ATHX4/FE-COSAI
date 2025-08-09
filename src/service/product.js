import axios from "axios";

const API_BASE_URL = "https://be-cosai.onrender.com/api/product";

const productService = {
  // Lấy danh sách sản phẩm với phân trang
  getProducts: async (pageNumber = 1, pageSize = 10) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          headers: {
            accept: "text/plain",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  },

  // Lấy thông tin sản phẩm theo ID
  getProductById: async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${productId}`, {
        headers: {
          accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  },

  // Thêm mới sản phẩm
  createProduct: async (productData) => {
    try {
      const response = await axios.post(API_BASE_URL, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create product"
      );
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (productId, productData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}?productId=${productId}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (productId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}?productId=${productId}`,
        {
          headers: {
            accept: "text/plain",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  },
};

export default productService;
