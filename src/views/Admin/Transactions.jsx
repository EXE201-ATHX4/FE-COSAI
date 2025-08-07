import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Skeleton,
} from "@mui/material";
import {
  TrendingUp,
  CalendarToday,
  DateRange,
  Warning,
  ShoppingCart,
  Phone,
  LocationOn,
  LocalShipping,
  Inventory,
} from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import orderService from "../../service/order";

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders and statistics
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch orders
        const orderData = await orderService.getOrders(1, 10, "desc");
        setOrders(orderData.data.items);
        setTotalOrders(orderData.data.totalItems);

        // Fetch statistics
        const statsData = await orderService.getOrderStatistics();
        setMonthlyRevenue(statsData.data.monthlyRevenue[0]?.totalRevenue || 0);
        setWeeklyRevenue(statsData.data.weeklyRevenue[0]?.totalRevenue || 0);
        setLowStockProducts(statsData.data.lowStockProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Get status color and label
  const getStatusInfo = (status) => {
    const statusMap = {
      PAID: { color: "success", label: "Đã thanh toán" },
      PENDING: { color: "warning", label: "Đang xử lý" },
      CANCELLED: { color: "error", label: "Đã hủy" },
      DELIVERED: { color: "info", label: "Đã giao hàng" },
    };
    return statusMap[status] || { color: "default", label: status };
  };

  // Prepare data for bar chart
  const getPriceRangeData = () => {
    const ranges = [
      { range: "0-50k", min: 0, max: 50000, color: "#8884d8" },
      { range: "50k-100k", min: 50000, max: 100000, color: "#82ca9d" },
      { range: "100k-200k", min: 100000, max: 200000, color: "#ffc658" },
      { range: "Trên 200k", min: 200000, max: Infinity, color: "#ff7c7c" },
    ];

    return ranges.map((range) => ({
      range: range.range,
      count: orders.filter(
        (o) => o.totalPrice >= range.min && o.totalPrice < range.max
      ).length,
      fill: range.color,
    }));
  };

  const chartData = getPriceRangeData();

  // DataGrid columns with improved formatting
  // DataGrid columns với cách truy cập dữ liệu chính xác
  const columns = [
    {
      field: "id",
      headerName: "Mã đơn",
      width: 80,
      renderCell: (params) => (
        <Chip
          label={`#${params.value}`}
          size="small"
          variant="outlined"
          color="primary"
        />
      ),
    },
    {
      field: "totalPrice",
      headerName: "Tổng tiền",
      width: 150,
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
          <Typography variant="body2" fontWeight="bold" color="primary">
            {formatCurrency(params.value)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      renderCell: (params) => {
        const statusInfo = getStatusInfo(params.value);
        return (
          <Chip
            label={statusInfo.label}
            color={statusInfo.color}
            size="small"
          />
        );
      },
    },
    {
      field: "customerName",
      headerName: "Khách hàng",
      width: 160,
      valueGetter: (params) => params?.row?.shippingAddress?.fullName || "N/A",
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1} sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          height: '100%'
        }}>
         
          <Typography variant="body2">
            {params.row?.shippingAddress?.fullName || "N/A"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "shipmentMethod",
      headerName: "Giao hàng",
      width: 150,
      renderCell: (params) => (
        <Chip
          icon={<LocalShipping />}
          label={params.value || "Chưa xác định"}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 130,
      valueGetter: (params) => params?.row?.shippingAddress?.phone || "N/A",
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1} sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          height: '100%'
        }}>
          <Typography variant="body2">
            {params.row?.shippingAddress?.phone || "N/A"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "address",
      headerName: "Địa chỉ giao hàng",
      width: 250,
      valueGetter: (params) => {
        const addr = params?.row?.shippingAddress;
        if (!addr) return "N/A";
        return `${addr.street || ""}, ${addr.ward || ""}, ${
          addr.district || ""
        }, ${addr.city || ""}`;
      },
      renderCell: (params) => {
        const addr = params.row?.shippingAddress;
        const fullAddress = addr
          ? `${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}`
          : "N/A";
        return (
          <Box display="flex" alignItems="center" gap={1} sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          height: '100%'
        }}>
             <Typography variant="body2" noWrap title={fullAddress}>
              {fullAddress}
            </Typography>
          </Box>
        );
      },
    },
  ];

  // Statistics cards data
  const statsCards = [
    {
      title: "Tổng đơn hàng",
      value: totalOrders,
      icon: <ShoppingCart />,
      color: "#1976d2",
      bgColor: "#e3f2fd",
    },
    {
      title: "Doanh thu tháng",
      value: formatCurrency(monthlyRevenue),
      icon: <TrendingUp />,
      color: "#2e7d32",
      bgColor: "#e8f5e8",
    },
    {
      title: "Doanh thu tuần",
      value: formatCurrency(weeklyRevenue),
      icon: <DateRange />,
      color: "#ed6c02",
      bgColor: "#fff3e0",
    },
    {
      title: "Hàng tồn kho thấp",
      value: lowStockProducts.length,
      icon: <Warning />,
      color: "#d32f2f",
      bgColor: "#ffebee",
    },
  ];

  if (loading) {
    return (
      <Box sx={{ padding: 3 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={60}
          sx={{ mb: 3 }}
        />
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} md={3} key={item}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Grid>
          ))}
        </Grid>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ mb: 3 }}
        />
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          mb: 3,
        }}
      >
        Quản lý Giao dịch
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{ mb: 2, width: "20%" }}
          >
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color={card.color}
                    >
                      {card.value}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: card.bgColor,
                      color: card.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {card.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chart Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          📈 Phân tán đơn hàng theo tổng giá
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis tick={{ fontSize: 12 }} axisLine={{ stroke: "#e0e0e0" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />
            <Legend />
            <Bar
              dataKey="count"
              name="Số lượng đơn hàng"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Grid container spacing={3}>
        {/* Orders Table */}
        <Grid item xs={12} lg={8} sx={{ mb: 2, width: "100%" }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              📋 Lịch sử đặt hàng
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <DataGrid
              rows={orders}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              components={{ Toolbar: GridToolbar }}
              autoHeight
              disableSelectionOnClick
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #f0f0f0",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #e0e0e0",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Low Stock Products */}
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              height: "fit-content",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              ⚠️ Sản phẩm tồn kho thấp
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {lowStockProducts.length === 0 ? (
              <Alert severity="success" sx={{ borderRadius: 2 }}>
                🎉 Tất cả sản phẩm đều có đủ hàng trong kho!
              </Alert>
            ) : (
              <List>
                {lowStockProducts.map((product, index) => (
                  <ListItem
                    key={product.productId}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                      borderRadius: 1,
                      mb: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#ffebee", color: "#d32f2f" }}>
                        <Inventory />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" fontWeight="bold">
                          {product.name}
                        </Typography>
                      }
                      secondary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" color="text.secondary">
                            Còn lại:
                          </Typography>
                          <Chip
                            size="small"
                            label={`${product.quantity} sản phẩm`}
                            color={product.quantity === 0 ? "error" : "warning"}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Transactions;
