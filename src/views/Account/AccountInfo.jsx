import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";

const AccountInfo = () => {
  const [activeAddressTab, setActiveAddressTab] = useState("default");
  const [isEditing, setIsEditing] = useState(false);

  // Address data
  const addresses = {
    default: {
      name: "Nguyễn Văn Tèo",
      email: "teovannguyen@gmail.com",
      phone: "0903783442",
      birthDate: "01/01/2000",
      address: "Số 45 Nguyễn Đình Chiểu\nPhường Đa Kao, Quận 1, TP.HCM",
    },
    address2: {
      name: "Nguyễn Văn Tèo",
      email: "teovannguyen@gmail.com",
      phone: "0903783442",
      birthDate: "01/01/2000",
      address: "Số 123 Lê Lợi\nPhường Bến Thành, Quận 1, TP.HCM",
    },
    new: {
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      address: "",
    },
  };

  const [formData, setFormData] = useState(addresses.default);

  const orders = [
    {
      id: "#123ABCC",
      date: "08/03/2025",
      amount: "200.000 đ",
      status: "Đang giao",
    },
    {
      id: "#345CCBA",
      date: "01/02/2025",
      amount: "230.000 đ",
      status: "Đã hủy",
    },
    {
      id: "#456AABB",
      date: "28/06/2024",
      amount: "110.000 đ",
      status: "Đã giao",
    },
    {
      id: "#789DDCC",
      date: "15/09/2023",
      amount: "150.000 đ",
      status: "Đang xử lý",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressTabChange = (tabType) => {
    setActiveAddressTab(tabType);
    setFormData(addresses[tabType]);
    setIsEditing(false);
  };

  const handleUpdateInfo = () => {
    if (isEditing) {
      // Save changes
      setIsEditing(false);
      alert("Thông tin đã được cập nhật!");
    } else {
      // Enable editing
      setIsEditing(true);
    }
  };

  const getStatusChipProps = (status) => {
    switch (status) {
      case "Đang giao":
        return {
          sx: {
            backgroundColor: "#E3F2FD",
            color: "#1976D2",
            fontWeight: "500",
            fontSize: "0.75rem",
          },
        };
      case "Đã hủy":
        return {
          sx: {
            backgroundColor: "#FFEBEE",
            color: "#D32F2F",
            fontWeight: "500",
            fontSize: "0.75rem",
          },
        };
      case "Đã giao":
        return {
          sx: {
            backgroundColor: "#E8F5E8",
            color: "#2E7D32",
            fontWeight: "500",
            fontSize: "0.75rem",
          },
        };
      case "Đang xử lý":
        return {
          sx: {
            backgroundColor: "#FFF3E0",
            color: "#F57C00",
            fontWeight: "500",
            fontSize: "0.75rem",
          },
        };
      default:
        return {
          sx: {
            backgroundColor: "#F5F5F5",
            color: "#757575",
            fontWeight: "500",
            fontSize: "0.75rem",
          },
        };
    }
  };

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 3, color: "#666" }}>
        <Link underline="hover" color="inherit" sx={{ color: "#666" }}>
          Tài khoản
        </Link>
        <Typography color="#333">Tài khoản của bạn</Typography>
      </Breadcrumbs>

      <Card
        sx={{
          mb: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#333", fontWeight: "600" }}
          >
            Thông tin tài khoản
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Chip
              label="Địa chỉ mặc định"
              onClick={() => handleAddressTabChange("default")}
              sx={{
                backgroundColor:
                  activeAddressTab === "default" ? "#4CAF50" : "transparent",
                color: activeAddressTab === "default" ? "white" : "#4CAF50",
                border:
                  activeAddressTab === "default" ? "none" : "1px solid #4CAF50",
                fontWeight: "500",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    activeAddressTab === "default"
                      ? "#45a049"
                      : "rgba(76, 175, 80, 0.1)",
                },
              }}
              icon={
                activeAddressTab === "default" ? (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "white",
                    }}
                  />
                ) : null
              }
            />
            <Chip
              label="Địa chỉ 2"
              onClick={() => handleAddressTabChange("address2")}
              sx={{
                backgroundColor:
                  activeAddressTab === "address2" ? "#4CAF50" : "transparent",
                color: activeAddressTab === "address2" ? "white" : "#4CAF50",
                border: "1px solid #4CAF50",
                fontWeight: "500",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    activeAddressTab === "address2"
                      ? "#45a049"
                      : "rgba(76, 175, 80, 0.1)",
                },
              }}
            />
            <Chip
              label="Tạo địa chỉ mới"
              onClick={() => handleAddressTabChange("new")}
              sx={{
                backgroundColor:
                  activeAddressTab === "new" ? "#4CAF50" : "transparent",
                color: activeAddressTab === "new" ? "white" : "#4CAF50",
                border: "1px solid #4CAF50",
                fontWeight: "500",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    activeAddressTab === "new"
                      ? "#45a049"
                      : "rgba(76, 175, 80, 0.1)",
                },
              }}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: "#333", fontWeight: "500" }}
              >
                Họ và tên
              </Typography>
              <TextField
                fullWidth
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                variant="outlined"
                size="small"
                disabled={!isEditing}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: isEditing ? "white" : "#F5F5F5",
                  },
                }}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: "#333", fontWeight: "500" }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                variant="outlined"
                size="small"
                disabled={!isEditing}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: isEditing ? "white" : "#F5F5F5",
                  },
                }}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: "#333", fontWeight: "500" }}
              >
                Số điện thoại
              </Typography>
              <TextField
                fullWidth
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                variant="outlined"
                size="small"
                disabled={!isEditing}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: isEditing ? "white" : "#F5F5F5",
                  },
                }}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: "#333", fontWeight: "500" }}
              >
                Ngày sinh
              </Typography>
              <TextField
                fullWidth
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                variant="outlined"
                size="small"
                disabled={!isEditing}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: isEditing ? "white" : "#F5F5F5",
                  },
                }}
              />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: "#333", fontWeight: "500" }}
              >
                Địa chỉ giao hàng
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                variant="outlined"
                disabled={!isEditing}
                placeholder={
                  activeAddressTab === "new" ? "Nhập địa chỉ mới..." : ""
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: isEditing ? "white" : "#F5F5F5",
                  },
                }}
              />
            </Grid>
          </Grid>

          <Typography
            variant="body2"
            sx={{ mt: 1, color: "#f44336", cursor: "pointer" }}
          >
            Xóa tài khoản
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleUpdateInfo}
              sx={{
                backgroundColor: "#4CAF50",
                color: "white",
                fontWeight: "500",
                px: 3,
                "&:hover": {
                  backgroundColor: "#45a049",
                },
              }}
            >
              {isEditing ? "Lưu thông tin" : "Cập nhật thông tin"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: "8px" }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#333", fontWeight: "600" }}
          >
            Đơn hàng gần đây
          </Typography>

          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ borderRadius: "8px" }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F8F9FA" }}>
                  <TableCell sx={{ fontWeight: "600", color: "#333" }}>
                    Mã đơn hàng
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", color: "#333" }}>
                    Ngày đặt
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", color: "#333" }}>
                    Tổng tiền
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", color: "#333" }}>
                    Trạng thái
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ "&:hover": { backgroundColor: "#F8F9FA" } }}
                  >
                    <TableCell sx={{ color: "#333" }}>{order.id}</TableCell>
                    <TableCell sx={{ color: "#666" }}>{order.date}</TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "500" }}>
                      {order.amount}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        {...getStatusChipProps(order.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountInfo;
