import axios from "axios";

const API_BASE_URL = "https://be-cosai.onrender.com/api/user";

// Lấy token từ localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const userService = {
  getUsers: async (pageNumber = 1, pageSize = 10, sortOrder = "desc") => {
    try {
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
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(API_BASE_URL, userData, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create user");
    }
  },

  updateUser: async (userData) => {
    try {
      const response = await axios.put(API_BASE_URL, userData, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  },
};

export default userService;
