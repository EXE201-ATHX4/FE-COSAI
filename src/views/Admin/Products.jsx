import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Pagination,
  Stack,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import productService from "../../service/product";

const Products = () => {
  // State cho dữ liệu
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // State cho lọc và tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [saleFilter, setSaleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // State cho dialog
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State cho form
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    originalPrice: 0,
    salePrice: null,
    quantity: 0,
    isOnSale: false,
    description: "",
    shortDescription: "",
    ingredients: "",
    usage: "",
    brandName: "",
    categoryName: "",
    supplierName: "",
    productImages: [],
  });

  // State cho thông báo
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch products với phân trang
  const fetchProducts = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const data = await productService.getProducts(page, size);
      setProducts(data.data.items);
      setTotalProducts(data.data.totalItems);
      setTotalPages(data.data.totalPages);
      setCurrentPage(data.data.currentPage);

      // Tính toán minPrice và maxPrice
      const prices = data.data.items
        .map((p) => p.originalPrice || 0)
        .filter((p) => p > 0);

      if (prices.length > 0) {
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
      }
    } catch (error) {
      showSnackbar(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, [currentPage, pageSize]);

  // Lọc và tìm kiếm
  useEffect(() => {
    let filtered = [...products];

    // Tìm kiếm theo tên
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo giá
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under-500k":
          filtered = filtered.filter((p) => p.originalPrice < 500000);
          break;
        case "500k-1m":
          filtered = filtered.filter(
            (p) => p.originalPrice >= 500000 && p.originalPrice < 1000000
          );
          break;
        case "1m-2m":
          filtered = filtered.filter(
            (p) => p.originalPrice >= 1000000 && p.originalPrice < 2000000
          );
          break;
        case "over-2m":
          filtered = filtered.filter((p) => p.originalPrice >= 2000000);
          break;
      }
    }

    // Lọc theo tồn kho
    if (stockFilter !== "all") {
      switch (stockFilter) {
        case "in-stock":
          filtered = filtered.filter((p) => p.quantity > 0);
          break;
        case "out-of-stock":
          filtered = filtered.filter((p) => p.quantity === 0);
          break;
        case "low-stock":
          filtered = filtered.filter((p) => p.quantity > 0 && p.quantity < 10);
          break;
      }
    }

    // Lọc theo khuyến mãi
    if (saleFilter !== "all") {
      filtered = filtered.filter((p) =>
        saleFilter === "on-sale" ? p.isOnSale : !p.isOnSale
      );
    }

    // Sắp xếp
    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredProducts(filtered);
  }, [
    products,
    searchTerm,
    priceFilter,
    stockFilter,
    saleFilter,
    sortBy,
    sortOrder,
  ]);

  // Hiển thị thông báo
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Chuẩn bị dữ liệu cho biểu đồ
  const getPriceRangeData = () => {
    const ranges = [
      { range: "< 500K", min: 0, max: 500000, color: "#8884d8" },
      { range: "500K - 1M", min: 500000, max: 1000000, color: "#82ca9d" },
      { range: "1M - 2M", min: 1000000, max: 2000000, color: "#ffc658" },
      { range: "> 2M", min: 2000000, max: Infinity, color: "#ff7300" },
    ];

    return ranges.map((range) => ({
      range: range.range,
      count: products.filter(
        (p) => p.originalPrice >= range.min && p.originalPrice < range.max
      ).length,
      color: range.color,
    }));
  };

  const getStockData = () => {
    const inStock = products.filter((p) => p.quantity > 10).length;
    const lowStock = products.filter(
      (p) => p.quantity > 0 && p.quantity <= 10
    ).length;
    const outOfStock = products.filter((p) => p.quantity === 0).length;

    return [
      { name: "Còn hàng", value: inStock, color: "#4caf50" },
      { name: "Sắp hết", value: lowStock, color: "#ff9800" },
      { name: "Hết hàng", value: outOfStock, color: "#f44336" },
    ];
  };

  // Xử lý CRUD
  const handleCreate = async () => {
    try {
      setLoading(true);
      await productService.createProduct(newProduct);
      await fetchProducts(currentPage, pageSize);
      setOpenCreateDialog(false);
      resetNewProduct();
      showSnackbar("Thêm sản phẩm thành công!");
    } catch (error) {
      showSnackbar(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (selectedProduct) {
      try {
        setLoading(true);
        await productService.updateProduct(selectedProduct.id, selectedProduct);
        await fetchProducts(currentPage, pageSize);
        setOpenUpdateDialog(false);
        showSnackbar("Cập nhật sản phẩm thành công!");
      } catch (error) {
        showSnackbar(error.message, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        setLoading(true);
        await productService.deleteProduct(selectedProduct.id);
        await fetchProducts(currentPage, pageSize);
        setOpenDeleteDialog(false);
        showSnackbar("Xóa sản phẩm thành công!");
      } catch (error) {
        showSnackbar(error.message, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetNewProduct = () => {
    setNewProduct({
      name: "",
      sku: "",
      originalPrice: 0,
      salePrice: null,
      quantity: 0,
      isOnSale: false,
      description: "",
      shortDescription: "",
      ingredients: "",
      usage: "",
      brandName: "",
      categoryName: "",
      supplierName: "",
      productImages: [],
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { label: "Hết hàng", color: "error" };
    if (quantity < 10) return { label: "Sắp hết", color: "warning" };
    return { label: "Còn hàng", color: "success" };
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.brandName}
          </Typography>
        </Box>
      ),
    },
    {
      field: "categoryName",
      headerName: "Danh mục",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value || "Chưa phân loại"}
          size="small"
          variant="outlined"
          color={params.value ? "primary" : "default"}
        />
      ),
    },
    {
      field: "originalPrice",
      headerName: "Giá gốc",
      width: 120,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography variant="body2" fontWeight="medium">
            {formatPrice(params.value)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "salePrice",
      headerName: "Giá KM",
      width: 120,
      align: "right",
      headerAlign: "right",
      renderCell: (params) =>
        params.value ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="body2" color="error.main" fontWeight="medium">
              {formatPrice(params.value)}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              -
            </Typography>
          </Box>
        ),
    },
    {
      field: "quantity",
      headerName: "Tồn kho",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const status = getStockStatus(params.value);
        return (
          <Chip
            label={`${params.value} - ${status.label}`}
            size="small"
            color={status.color}
            variant="outlined"
          />
        );
      },
    },
    {
      field: "isOnSale",
      headerName: "Khuyến mãi",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value ? "Có" : "Không"}
          size="small"
          color={params.value ? "success" : "default"}
          variant={params.value ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 180,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Xem chi tiết">
            <IconButton
              size="small"
              color="info"
              onClick={() => {
                setSelectedProduct(params.row);
                setOpenViewDialog(true);
              }}
            >
              <ViewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                setSelectedProduct(params.row);
                setOpenUpdateDialog(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setSelectedProduct(params.row);
                setOpenDeleteDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "primary.main",
          }}
        >
          Quản lý Sản phẩm
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => fetchProducts(currentPage, pageSize)}
            disabled={loading}
          >
            Làm mới
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateDialog(true)}
          >
            Thêm sản phẩm
          </Button>
        </Stack>
      </Box>

      {/* Thống kê tổng quan */}
      <Grid container spacing={3} sx={{ mb: 3, width: "100%" }}>
        <Grid item xs={12} sm={6} md={3} sx={{ mb: 2, width: "20%" }}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {totalProducts}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Tổng sản phẩm
                  </Typography>
                </Box>
                <InventoryIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ mb: 2, width: "20%" }}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {formatPrice(minPrice)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Giá thấp nhất
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ mb: 2, width: "20%" }}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {formatPrice(maxPrice)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Giá cao nhất
                  </Typography>
                </Box>
                <MoneyIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ mb: 2, width: "20%" }}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              color: "white",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {products.filter((p) => p.isOnSale).length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Đang khuyến mãi
                  </Typography>
                </Box>
                <CategoryIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Biểu đồ */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8} sx={{ mb: 2, width: "40%" }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Phân tán sản phẩm theo mức giá
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getPriceRangeData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ mb: 2, width: "40%" }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Tình trạng tồn kho
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getStockData()}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {getStockData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Bộ lọc và tìm kiếm */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <FilterIcon /> Bộ lọc và tìm kiếm
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2} sx={{ width: "15%" }}>
            <FormControl fullWidth>
              <InputLabel>Mức giá</InputLabel>
              <Select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                label="Mức giá"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="under-500k">Dưới 500K</MenuItem>
                <MenuItem value="500k-1m">500K - 1M</MenuItem>
                <MenuItem value="1m-2m">1M - 2M</MenuItem>
                <MenuItem value="over-2m">Trên 2M</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} sx={{ width: "15%" }}>
            <FormControl fullWidth>
              <InputLabel>Tồn kho</InputLabel>
              <Select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                label="Tồn kho"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="in-stock">Còn hàng</MenuItem>
                <MenuItem value="low-stock">Sắp hết</MenuItem>
                <MenuItem value="out-of-stock">Hết hàng</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} sx={{ width: "15%" }}>
            <FormControl fullWidth>
              <InputLabel>Khuyến mãi</InputLabel>
              <Select
                value={saleFilter}
                onChange={(e) => setSaleFilter(e.target.value)}
                label="Khuyến mãi"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="on-sale">Đang KM</MenuItem>
                <MenuItem value="not-on-sale">Không KM</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} sx={{ width: "15%" }}>
            <FormControl fullWidth>
              <InputLabel>Sắp xếp</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sắp xếp"
              >
                <MenuItem value="name">Tên</MenuItem>
                <MenuItem value="originalPrice">Giá</MenuItem>
                <MenuItem value="quantity">Số lượng</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1} sx={{ width: "15%" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={sortOrder === "desc"}
                  onChange={(e) =>
                    setSortOrder(e.target.checked ? "desc" : "asc")
                  }
                />
              }
              label="Giảm dần"
              labelPlacement="top"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Bảng dữ liệu */}
      <Paper sx={{ p: 3, mb: 2, width: "100%" }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Danh sách sản phẩm ({filteredProducts.length} kết quả)
          </Typography>
        </Box>

        <DataGrid
          rows={filteredProducts}
          columns={columns}
          loading={loading}
          autoHeight
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            "& .MuiDataGrid-cell:hover": {
              backgroundColor: "action.hover",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "action.hover",
            },
          }}
        />

        {/* Phân trang */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      </Paper>

      {/* Dialog tạo mới */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Thêm sản phẩm mới
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên sản phẩm *"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SKU"
                value={newProduct.sku}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, sku: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá gốc *"
                type="number"
                value={newProduct.originalPrice}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    originalPrice: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá khuyến mãi"
                type="number"
                value={newProduct.salePrice || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    salePrice: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số lượng *"
                type="number"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newProduct.isOnSale}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        isOnSale: e.target.checked,
                      })
                    }
                  />
                }
                label="Đang khuyến mãi"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Thương hiệu"
                value={newProduct.brandName}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, brandName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Danh mục"
                value={newProduct.categoryName}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, categoryName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả chi tiết"
                multiline
                rows={3}
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenCreateDialog(false)} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            disabled={loading || !newProduct.name}
          >
            Thêm sản phẩm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog cập nhật */}
      <Dialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Cập nhật sản phẩm
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên sản phẩm *"
                value={selectedProduct?.name || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SKU"
                value={selectedProduct?.sku || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    sku: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá gốc *"
                type="number"
                value={selectedProduct?.originalPrice || 0}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    originalPrice: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá khuyến mãi"
                type="number"
                value={selectedProduct?.salePrice || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    salePrice: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số lượng *"
                type="number"
                value={selectedProduct?.quantity || 0}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedProduct?.isOnSale || false}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        isOnSale: e.target.checked,
                      })
                    }
                  />
                }
                label="Đang khuyến mãi"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Thương hiệu"
                value={selectedProduct?.brandName || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    brandName: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Danh mục"
                value={selectedProduct?.categoryName || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    categoryName: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả ngắn"
                multiline
                rows={2}
                value={selectedProduct?.shortDescription || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    shortDescription: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả chi tiết"
                multiline
                rows={3}
                value={selectedProduct?.description || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenUpdateDialog(false)} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            disabled={loading || !selectedProduct?.name}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xem chi tiết */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Chi tiết sản phẩm
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: "primary.main",
                        fontSize: "1.5rem",
                      }}
                    >
                      {selectedProduct.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {selectedProduct.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: {selectedProduct.id} | SKU:{" "}
                        {selectedProduct.sku || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: "right" }}>
                    <Chip
                      label={
                        selectedProduct.isOnSale
                          ? "Đang khuyến mãi"
                          : "Không khuyến mãi"
                      }
                      color={selectedProduct.isOnSale ? "success" : "default"}
                      sx={{ mb: 1 }}
                    />
                    <br />
                    <Chip
                      label={getStockStatus(selectedProduct.quantity).label}
                      color={getStockStatus(selectedProduct.quantity).color}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper
                    sx={{ p: 2, textAlign: "center", bgcolor: "primary.50" }}
                  >
                    <Typography
                      variant="h4"
                      color="primary.main"
                      fontWeight="bold"
                    >
                      {formatPrice(selectedProduct.originalPrice)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Giá gốc
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor: selectedProduct.salePrice
                        ? "error.50"
                        : "grey.50",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color={
                        selectedProduct.salePrice
                          ? "error.main"
                          : "text.secondary"
                      }
                      fontWeight="bold"
                    >
                      {selectedProduct.salePrice
                        ? formatPrice(selectedProduct.salePrice)
                        : "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Giá khuyến mãi
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    sx={{ p: 2, textAlign: "center", bgcolor: "success.50" }}
                  >
                    <Typography
                      variant="h4"
                      color="success.main"
                      fontWeight="bold"
                    >
                      {selectedProduct.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tồn kho
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Thông tin sản phẩm
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="body2">
                      <strong>Thương hiệu:</strong>{" "}
                      {selectedProduct.brandName || "Chưa có"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Danh mục:</strong>{" "}
                      {selectedProduct.categoryName || "Chưa phân loại"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Nhà cung cấp:</strong>{" "}
                      {selectedProduct.supplierName || "Chưa có"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>% Giảm giá:</strong>{" "}
                      {selectedProduct.discountPercent || 0}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Mô tả
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Mô tả ngắn:</strong>{" "}
                    {selectedProduct.shortDescription || "Chưa có mô tả ngắn"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mô tả chi tiết:</strong>{" "}
                    {selectedProduct.description || "Chưa có mô tả chi tiết"}
                  </Typography>
                </Grid>
                {selectedProduct.ingredients && (
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Thành phần
                    </Typography>
                    <Typography variant="body2">
                      {selectedProduct.ingredients}
                    </Typography>
                  </Grid>
                )}
                {selectedProduct.usage && (
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Cách sử dụng
                    </Typography>
                    <Typography variant="body2">
                      {selectedProduct.usage}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenViewDialog(false)} color="inherit">
            Đóng
          </Button>
          <Button
            onClick={() => {
              setOpenViewDialog(false);
              setOpenUpdateDialog(true);
            }}
            variant="contained"
            startIcon={<EditIcon />}
          >
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold" color="error.main">
            Xác nhận xóa sản phẩm
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Hành động này không thể hoàn tác!
          </Alert>
          <Typography>
            Bạn có chắc chắn muốn xóa sản phẩm{" "}
            <strong>"{selectedProduct?.name}"</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Tất cả dữ liệu liên quan đến sản phẩm này sẽ bị xóa vĩnh viễn.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={loading}
            startIcon={<DeleteIcon />}
          >
            Xóa sản phẩm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products;
