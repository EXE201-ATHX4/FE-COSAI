import axios from "axios";
const API_BASE_URL = "https://be-cosai.onrender.com/api/supplier";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken"); // token bạn lưu khi login
  console.log("Token đang dùng:", token); // Debug
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const supplierService = {
  getSuppliers: async (pageNumber = 1, pageSize = 10, sortOrder = "desc") => {
    const response = await axios.get(
      `${API_BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`,
      {
        headers: {
          accept: "application/json",
          ...getAuthHeaders(),
        },
      }
    );
    return response.data;
  },
  createSupplier: async (supplierData) => {
    const response = await axios.post(API_BASE_URL, supplierData, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return response.data;
  },
  // Update supplier
  updateSupplier: async (supplierId, supplierData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}?supplierId=${supplierId}`,
        supplierData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update supplier"
      );
    }
  },

  // Delete supplier
  deleteSupplier: async (supplierId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}?supplierId=${supplierId}`,
        {
          headers: {
            accept: "application/json",
            ...getAuthHeaders(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete supplier"
      );
    }
  },
};

export default supplierService;
