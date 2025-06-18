import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
} from "@mui/material";
import CancelOrderForm from "./CancelOrderForm";
import OrderDetailView from "./OrderDetailView";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState("list"); // 'list', 'detail', 'cancel'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "#103DDEA",
      date: "10/03/2025",
      status: "Đang xử lý",
      statusColor: "warning",
      items: [
        {
          name: "Bột khử mùi Thiên nhiên",
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
      total: "130.000 đ",
    },
    {
      id: "#123ABCC",
      date: "08/03/2025",
      status: "Đang giao",
      statusColor: "info",
      items: [
        {
          name: "Sữa chống nắng Bi đao",
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
        {
          name: "Tẩy da chết Cà phê Đắk Lắk",
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
      total: "200.000 đ",
    },
    {
      id: "#345CCBA",
      date: "01/02/2025",
      status: "Đã hủy",
      statusColor: "error",
      items: [
        {
          name: "Gel tắm Khuynh Diệp",
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
      total: "230.000 đ",
    },
    {
      id: "#456AABB",
      date: "28/06/2024",
      status: "Đã giao",
      statusColor: "success",
      items: [
        {
          name: "Muối tắm Cà phê Cốt dừa",
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
      total: "110.000 đ",
    },
  ];

  const tabs = [
    "Tất cả",
    "Chờ xác nhận",
    "Đang vận chuyển",
    "Giao thành công",
    "Đã hủy",
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setViewMode("detail");
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setViewMode("cancel");
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
    setViewMode("list");
  };

  // Add the status chip color function
  const getStatusChipProps = (status) => {
    switch (status) {
      case "Đang giao":
        return {
          sx: {
            backgroundColor: "#E3F2FD",
            color: "#1976D2",
            fontWeight: "bold",
          },
        };
      case "Đã hủy":
        return {
          sx: {
            backgroundColor: "#FFEBEE",
            color: "#D32F2F",
            fontWeight: "bold",
          },
        };
      case "Đã giao":
        return {
          sx: {
            backgroundColor: "#E8F5E8",
            color: "#2E7D32",
            fontWeight: "bold",
          },
        };
      case "Đang xử lý":
        return {
          sx: {
            backgroundColor: "#FFF3E0",
            color: "#F57C00",
            fontWeight: "bold",
          },
        };
      default:
        return {
          sx: {
            backgroundColor: "#F5F5F5",
            color: "#757575",
            fontWeight: "bold",
          },
        };
    }
  };

  if (viewMode === "cancel") {
    return (
      <CancelOrderForm order={selectedOrder} onBack={handleBackToOrders} />
    );
  }

  if (viewMode === "detail") {
    return (
      <OrderDetailView order={selectedOrder} onBack={handleBackToOrders} />
    );
  }

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit">
          Tài khoản
        </Link>
        <Typography color="text.primary">Đơn hàng của tôi</Typography>
      </Breadcrumbs>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Đơn hàng của tôi
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} />
            ))}
          </Tabs>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {orders.map((order) => (
              <Card key={order.id} variant="outlined">
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="h6">{order.id}</Typography>
                      <Chip
                        label={order.status}
                        size="small"
                        {...getStatusChipProps(order.status)}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {order.date}
                    </Typography>
                  </Box>

                  {order.items.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{ width: 60, height: 60 }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Số lượng: {item.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  ))}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                      pt: 2,
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="h6">
                      Tổng tiền: {order.total}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {order.status === "Đã giao" && (
                        <>
                          <Button variant="outlined" size="small">
                            Đánh giá
                          </Button>
                          <Button variant="outlined" size="small">
                            Mua lại
                          </Button>
                        </>
                      )}
                      {order.status === "Đang xử lý" && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleCancelOrder(order)}
                        >
                          Hủy đơn
                        </Button>
                      )}
                      {order.status === "Đang giao" && (
                        <Button variant="outlined" size="small">
                          Xem nhận đã giao
                        </Button>
                      )}
                      {order.status === "Đã hủy" && (
                        <Button variant="outlined" size="small">
                          Mua lại
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#4CAF50",
                          "&:hover": {
                            backgroundColor: "#45a049",
                          },
                        }}
                        onClick={() => handleViewDetails(order)}
                      >
                        Chi tiết
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyOrders;
